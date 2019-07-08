import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';
import { PatientService } from './patient.service';
import { Patient } from './patient.model';

@Injectable({
  providedIn: 'root'
})
export class PatientPreloadService implements Resolve<Patient> {

  constructor(private patientService: PatientService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Patient> | Observable<never> {
    const id = route.paramMap.get('id');

    return this.patientService.loadPatient(id).pipe(
      take(1),
      mergeMap(patient => {
        if (patient) {
          return of(patient);
        } else { // id not found
          this.router.navigate(['/404']);
          return EMPTY;
        }
      })
    );
  }
}
