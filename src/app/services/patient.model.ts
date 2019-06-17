import * as moment from 'moment';
import * as firebase from 'firebase/app';
import 'firebase/firestore';


export interface Patient {
    id: string;
    LastUpdate?: firebase.firestore.Timestamp | firebase.firestore.FieldValue;

    FirstName?: string;
    LastName: string;
    Birthdate?: moment.Moment | Date | firebase.firestore.Timestamp;
    Sex?: boolean;
    Amka?: string;
    Telephone?: string;
    Mobile?: string;
    Address?: string;

}
