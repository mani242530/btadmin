import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Company } from 'src/app/core/models/companys';

@Injectable({
  providedIn: 'root',
})
export class UpdatesService {
  private dbPath = 'companys';

  companysRef: AngularFirestoreCollection<Company>;

  constructor(private db: AngularFirestore) {
    this.companysRef = this.db.collection(this.dbPath);
  }

  update(id: string, data: any): Promise<void> {
    return this.companysRef.ref.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.companysRef.doc(id).delete();
  }
}
