import * as moment from 'moment';

export interface Patient {
    id: string;
    LastUpdate?: moment.Moment | number;

    FirstName?: string;
    LastName: string;
    Birthdate?: moment.Moment | number;
    Sex?: boolean;
    Amka?: string;
    Telephone?: string;
    Mobile?: string;
    Address?: string;

    Diagnoses?: string[];

    Allergies?: string[];

    Surgeries?: {Name: string, Date?: moment.Moment | number}[];

    Drugs?: {Name: string, Type?: string, Concentration?: string, Dosage?: string}[];

    Reminders?: {Name: string, Date: moment.Moment | number}[];

    Notes?: string;
}
