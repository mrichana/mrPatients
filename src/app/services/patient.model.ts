import * as moment from 'moment';

export interface Patient {
    id: string;
    LastUpdate?: moment.Moment;

    FirstName?: string;
    LastName: string;
    Birthdate?: moment.Moment;
    Sex?: boolean;
    Amka?: string;
    Telephone?: string;
    Mobile?: string;
    Address?: string;

    Diagnoses?: string[];

    Notes?: string;
}
