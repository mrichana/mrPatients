export interface Patient {
    FirstName: string;
    LastName: string;
    Birthdate?: firebase.firestore.Timestamp;
    Amka?: number;
    Telephone?: string;
    Mobile?: string;
    Address?: string;

    LastUpdate: firebase.firestore.Timestamp;
}
