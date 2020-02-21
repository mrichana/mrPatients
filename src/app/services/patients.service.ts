import { Patient } from './patient.model';
import { Subject, BehaviorSubject, combineLatest, Subscription } from 'rxjs';
import { Injectable } from '@angular/core';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { DbAdapterService } from './db-adapter.service';

@Injectable({
  providedIn: 'root'
})

export class PatientsService {

  public filteredPatients$: Subject<{ id: string, patient: Patient }[]>;
  private sortBy$: Subject<string | null>;
  private sortOrder$: Subject<string | null>;
  private filterBy$: Subject<string | null>;

  private subscription: Subscription;

  constructor(private db: DbAdapterService) {
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
    this.subscription = combineLatest([
      this.db.loadPatients(),
      this.filterBy$.pipe(debounceTime(300), distinctUntilChanged()),
      this.sortBy$.pipe(distinctUntilChanged()),
      this.sortOrder$.pipe(distinctUntilChanged())])
      .subscribe(d => {console.log("updated filteredPatients$");this.filteredPatients$.next(this.db.filterAndSortPatients(d));});
  }

  public Unsubscribe() {
    this.subscription.unsubscribe();
  }
}
