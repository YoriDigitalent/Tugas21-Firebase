import admin, { firestore } from 'firebase-admin';
import { serviceAccountCredentials } from '../serviceAccountKey';
const serviceAccount = serviceAccountCredentials as admin.ServiceAccount;

export type Account = {
  account_number: number;
  balance: number;
  firstname: string;
  lastname: string;
  age: number;
  gender: string;
  address: string;
  employer: string;
  email: string;
  city: string;
  state: string;
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://digitalent-be-21-master.firebaseio.com',
});

const db = admin.firestore();
const accountRef = db.collection('accounts');

export class FirebaseClient {
  private db: FirebaseFirestore.Firestore;
  private accountRef: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>;

  constructor() {
    this.db = db;
    this.accountRef = accountRef;
  }

  async addData(account: Object) {
    
    try {
      await this.accountRef.add({});
    } catch (error) {
      throw error;
    }

    return
  }

  async getData() {
    let snapshot;
    try {
      snapshot = await this.accountRef.get();
    } catch (error) {
      throw error;
    }

    console.log(snapshot);
    return snapshot.docs.map(doc => doc.data());
  }

  async getDataById(id: string) {
    let snapshot;
    try {
      snapshot = await accountRef.doc(id).get();
    } catch (error) {
      throw error;
    }

    return snapshot.data();
  }

  async updateData(id: string, update: Object) {
    let snapshot;
    try {
      snapshot = await accountRef.doc(id).update({
        ...update
      });
      snapshot = await accountRef.doc(id).get();
    } catch (error) {
      throw error;
    }

    return snapshot.data();
  }

  async deleteData(id: string) {

    try {
      await accountRef.doc(id).delete();
    } catch (error) {
      throw error;
    }

    return;
  }

  async getDataByAccountNumber(accountNumber: number) {
    let snapshot;
    try {
      snapshot = await accountRef.where('account_number', '==', accountNumber).get();
    } catch (error) {
      throw error;
    }

    return snapshot.docs.map(doc => doc.data());
  }

  async getDataByAge(age: number) {
    let snapshot;
    try {
      snapshot = await accountRef.where('accounts', '==', age).get();
    } catch (error) {
      throw error
    }

    return snapshot.docs.map(doc => doc.data());
  }
}