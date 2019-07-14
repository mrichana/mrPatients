import { Injectable } from '@angular/core';
import { Adapter } from '../adapter';
import { Patient } from '../patient.model';
import * as moment from 'moment';

@Injectable({
    providedIn: 'root'
})
export class PatientAdapter implements Adapter<Patient> {
    export(item: Patient): Patient {
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

            Notes: item.Notes || null
        };
    }
    import(item: Patient) {
        return {
            id: item.id,
            LastUpdate: typeof item.LastUpdate['unix'] === 'function' ? item.LastUpdate : moment.unix(<number>item.LastUpdate),

            FirstName: item.FirstName,
            LastName: item.LastName,
            Birthdate: item.Birthdate ? (
                typeof item.Birthdate['unix'] === 'function' ? item.Birthdate : moment.unix(<number>item.Birthdate)
            ) : null,
            Sex: item.Sex,
            Amka: item.Amka,
            Telephone: item.Telephone,
            Mobile: item.Mobile,
            Address: item.Address,

            Diagnoses: item.Diagnoses,

            Notes: item.Notes
        } as Patient;
    }
}
