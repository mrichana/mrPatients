import * as moment from 'moment';
import { Injectable } from '@angular/core';
import { Adapter } from './adapter';

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

    Drugs?: string[];

    Notes?: string;
}
