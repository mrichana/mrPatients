import { Injectable } from '@angular/core';
import { Adapter } from '../adapter';
import { Patient } from '../patient.model';
import * as moment from 'moment';

@Injectable({
    providedIn: 'root'
})
export class PatientAdapter implements Adapter<Patient> {
    private dateExport(date) {
        return (
            date ? (typeof date['unix'] === 'function' ? (<moment.Moment>date).unix() : date) : null
        );
    }

    export(item: Patient): any {
        return {
            id: item.id,
            LastUpdate: moment().unix(),

            FirstName: item.FirstName || null,
            LastName: item.LastName,
            Birthdate: this.dateExport(item.Birthdate),
            Sex: !((typeof item.Sex === 'undefined') || item.Sex === null) ? item.Sex : null,
            Amka: item.Amka || null,
            Telephone: item.Telephone || null,
            Mobile: item.Mobile || null,
            Address: item.Address || null,

            Diagnoses: item.Diagnoses || null,
            Allergies: item.Allergies || null,
            Surgeries: item.Surgeries ? item.Surgeries.map(surgery => {
                return { Name: surgery.Name, Date: this.dateExport(surgery.Date) };
            }) : null,
            Drugs: item.Drugs || null,

            Notes: item.Notes || null,
        };
    }

    private dateImport(date) {
        return (date ? (typeof date['unix'] === 'function' ? date : moment.unix(<number>date)) : null);
    }

    import(item: any): Patient {
        return {
            id: item.value.id,
            LastUpdate: this.dateImport(item.value.LastUpdate),

            FirstName: item.value.FirstName,
            LastName: item.value.LastName,
            Birthdate: this.dateImport(item.value.Birthdate),
            Sex: item.value.Sex,
            Amka: item.value.Amka,
            Telephone: item.value.Telephone,
            Mobile: item.value.Mobile,
            Address: item.value.Address,

            Diagnoses: item.value.Diagnoses,
            Allergies: item.value.Allergies,
            Surgeries: item.value.Surgeries ? item.value.Surgeries.map( surgery => {
                return {Name: surgery.Name, Date: this.dateImport(surgery.Date)};
            }) : null,
            Drugs: item.value.Drugs,

            Notes: item.value.Notes,

            _rev: item._rev
        } as Patient;
    }
}
