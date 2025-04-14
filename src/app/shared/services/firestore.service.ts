// shared/services/firestore.service.ts
import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  getDocs,
  CollectionReference,
  DocumentData,
  query,
  where,
  DocumentReference,
  WithFieldValue,
} from '@angular/fire/firestore';
import { collectionData, docData } from 'rxfire/firestore';
import { from, map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FirestoreService<T extends { id?: string }> {
  constructor(private firestore: Firestore) {}

  private getCollection(path: string): CollectionReference<DocumentData> {
    return collection(
      this.firestore,
      path
    ) as CollectionReference<DocumentData>;
  }

  async set(path: string, data: T): Promise<void> {
    const ref = doc(this.firestore, path);
    await setDoc(ref, data);
  }

  getAll(path: string): Observable<T[]> {
    const colRef = this.getCollection(path);
    return from(getDocs(colRef)).pipe(
      map((snapshot) =>
        snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as T))
      )
    );
  }

  getDocument(path: string): Promise<T | null> {
    const docRef = doc(this.firestore, path);
    return getDoc(docRef).then((snapshot) => {
      return snapshot.exists() ? (snapshot.data() as T) : null;
    });
  }

  getById(path: string, id: string): Observable<T | undefined> {
    const docRef = doc(this.firestore, `${path}/${id}`);
    return from(getDoc(docRef)).pipe(
      map((docSnap) =>
        docSnap.exists()
          ? ({ id: docSnap.id, ...docSnap.data() } as T)
          : undefined
      )
    );
  }

  add(path: string, data: T): Promise<string> {
    const colRef = this.getCollection(path);
    const newDocRef = doc(colRef);
    return setDoc(newDocRef, data).then(() => newDocRef.id);
  }

  update(path: string, id: string, data: Partial<T>): Promise<void> {
    const docRef = doc(this.firestore, path, id) as DocumentReference<
      WithFieldValue<T>
    >;
    return updateDoc(docRef, data as WithFieldValue<T>);
  }

  delete(path: string, id: string): Promise<void> {
    const docRef = doc(this.firestore, `${path}/${id}`);
    return deleteDoc(docRef);
  }

  queryByField(path: string, field: string, value: any): Observable<T[]> {
    const colRef = this.getCollection(path);
    const q = query(colRef, where(field, '==', value));
    return from(getDocs(q)).pipe(
      map((snapshot) =>
        snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as T))
      )
    );
  }
}
