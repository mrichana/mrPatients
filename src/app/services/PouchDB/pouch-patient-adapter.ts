import { Injectable } from '@angular/core';
import { Adapter } from '../adapter';
import { Patient } from '../patient.model';
import * as moment from 'moment';

@Injectable({
    providedIn: 'root'
})
export class PatientAdapter implements Adapter<Patient> {
    export(item: Patient): any {
        return {
            id: item.id,
            LastUpdate: moment().unix(),

            FirstName: item.FirstName || null,
            LastName: item.LastName,
            Birthdate: item.Birthdate ? (
                typeof item.Birthdate['unix'] === 'function' ? (<moment.Moment>item.Birthdate).unix() : item.Birthdate
            ) : null,
            Sex: !((typeof item.Sex === 'undefined') || item.Sex === null) ? item.Sex : null,
            Amka: item.Amka || null,
            Telephone: item.Telephone || null,
            Mobile: item.Mobile || null,
            Address: item.Address || null,

            Diagnoses: item.Diagnoses || null,

            Notes: item.Notes || null,
        };
    }
    import(item: any): Patient {
        return {
            id: item.value.id,
            LastUpdate: typeof item.value.LastUpdate['unix'] === 'function' ?
                item.value.LastUpdate : moment.unix(<number>item.value.LastUpdate),

            FirstName: item.value.FirstName,
            LastName: item.value.LastName,
            Birthdate: item.value.Birthdate ? (
                typeof item.value.Birthdate['unix'] === 'function' ? item.value.Birthdate : moment.unix(<number>item.value.Birthdate)
            ) : null,
            Sex: item.value.Sex,
            Amka: item.value.Amka,
            Telephone: item.value.Telephone,
            Mobile: item.value.Mobile,
            Address: item.value.Address,

            Diagnoses: item.value.Diagnoses,

            Notes: item.value.Notes,

            _rev: item._rev
        } as Patient;
    }
}
