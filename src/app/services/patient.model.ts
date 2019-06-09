export interface Patient {
    FirstName?: string;
    LastName: string;
    Birthdate?: firebase.firestore.Timestamp;
    Sex?: boolean;
    Amka?: string;
    Telephone?: string;
    Mobile?: string;
    Address?: string;

    LastUpdate?: firebase.firestore.Timestamp;
}
