import { Injectable } from '@angular/core';
import PouchDB from 'pouchdb-browser';
import PouchDBUpsert from 'pouchdb-upsert';
// import PouchDBFind from 'pouchdb-find';

PouchDB.plugin(PouchDBUpsert);
// PouchDB.plugin(PouchDBFind);

@Injectable({
  providedIn: 'root'
})
export class PouchDBAdapterService {

  constructor() { }
}
