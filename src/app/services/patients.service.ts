import { Patient } from './patient.model';
import { Observable, Subject, BehaviorSubject, combineLatest } from 'rxjs';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})

export class PatientsService {

  public patients$: Observable<{ id: string, patient: Patient }[]>;
  public filteredPatients$: Subject<{ id: string, patient: Patient }[]>;
  public patientsChanges$: Observable<DocumentChangeAction<any>[]>;
  private sortBy$: Subject<string | null>;
  private sortOrder$: Subject<string | null>;
  private filterBy$: Subject<string | null>;

  constructor(private auth: AuthService, private db: AngularFirestore) {
    this.sortBy$ = new BehaviorSubject('LastUpdate');
    this.sortOrder$ = new BehaviorSubject('normal');
    this.filterBy$ = new BehaviorSubject(null);
    this.filteredPatients$ = new BehaviorSubject<{ id: string, patient: Patient }[]>([]);
    this.loadPatients();
  }

  public SortBy(term: string) {
    this.sortBy$.next(term);
  }

  public SortOrder(term: string) {
    this.sortOrder$.next(term);
  }

  public FilterBy(term: string) {
    this.filterBy$.next(term.trim().toLocaleLowerCase());
  }

  private loadPatients() {
    this.auth.user$.subscribe(user => {
      if (user) {
        this.patients$ = this.db.collection('doctors').doc(user.uid)
          .collection<Patient>('patients').snapshotChanges().pipe(
            map((actions: DocumentChangeAction<Patient>[]) => {
              return actions.map((a: DocumentChangeAction<Patient>) => {
                const id: string = a.payload.doc.id;
                const patient: Patient = a.payload.doc.data();
                patient.Birthdate = patient.Birthdate ? moment.unix(<number><unknown>patient.Birthdate) : null;
                patient.LastUpdate = patient.LastUpdate ? moment.unix(<number><unknown>patient.LastUpdate) : null;
                return { id, patient };
              });
            })
          );
        combineLatest([
          this.patients$,
          this.filterBy$.pipe(debounceTime(300), distinctUntilChanged()),
          this.sortBy$.pipe(distinctUntilChanged()),
          this.sortOrder$.pipe(distinctUntilChanged())]).subscribe(d => this.updatePatients(d));
      } else {
        this.patients$ = null;
      }
    });
  }

  private updatePatients([patients, filterBy, orderBy, sortBy]: [{ id: string, patient: Patient }[], string, string, string]) {
    if (patients) {
      if (filterBy) {
        patients = patients.filter(patient => this.filter(patient, filterBy));
      }
      if (orderBy) {
        patients = patients.sort((a, b) => (sortBy === 'normal'
          ? this.compare(a.patient, b.patient, orderBy)
          : -this.compare(a.patient, b.patient, orderBy)));
      }
      this.filteredPatients$.next(patients);
    }
  }

  private compare(a: any, b: any, field: string): number {
    if (!field) {
      return 0;
    }

    let valueA = a[field];
    let valueB = b[field];

    if (valueA && typeof valueA['localeCompare'] === 'function') {
      return valueA.toLocaleLowerCase().localeCompare(valueB ? valueB.toLocaleLowerCase() : valueB);
    }

    if (!valueA || typeof valueA === 'undefined') {
      valueA = 0;
    } else if (typeof valueA['toMillis'] === 'function') {
      valueA = valueA.toMillis();
    }

    if (!valueB || typeof valueB === 'undefined') {
      valueB = 0;
    } else if (typeof valueB['toMillis'] === 'function') {
      valueB = valueB.toMillis();
    }

    return -(valueA - valueB);
  }

  private filter(patient: { id: string, patient: Patient }, filterBy: string): boolean {
    const filter = new RegExp(filterBy);
    const fullText: string =
      (patient.patient.LastName + '|' + patient.patient.FirstName + '|' + (patient.patient.Amka ? patient.patient.Amka + '|' : '')
        + (patient.patient.Mobile ? patient.patient.Mobile + '|' : '') + (patient.patient.Telephone ? patient.patient.Telephone + '|' : '')
      ).toLocaleLowerCase();
    return filter.test(fullText);
  }
}
