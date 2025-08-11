import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  DocumentData,
  QueryConstraint,
  DocumentReference,
  CollectionReference,
} from "firebase/firestore";
import { db } from "./config";

export class FirestoreService {
  // Generic CRUD operations
  static async getDocument<T = DocumentData>(
    collectionName: string,
    documentId: string
  ): Promise<T | null> {
    try {
      const docRef = doc(db, collectionName, documentId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as T;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error getting document:", error);
      throw error;
    }
  }

  static async getDocuments<T = DocumentData>(
    collectionName: string,
    constraints: QueryConstraint[] = []
  ): Promise<T[]> {
    try {
      const collectionRef = collection(db, collectionName);
      const q = query(collectionRef, ...constraints);
      const querySnapshot = await getDocs(q);

      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as T[];
    } catch (error) {
      console.error("Error getting documents:", error);
      throw error;
    }
  }

  static async addDocument<T = DocumentData>(
    collectionName: string,
    data: Omit<T, "id">
  ): Promise<string> {
    try {
      const collectionRef = collection(db, collectionName);
      const docRef = await addDoc(collectionRef, data);
      return docRef.id;
    } catch (error) {
      console.error("Error adding document:", error);
      throw error;
    }
  }

  static async updateDocument<T = DocumentData>(
    collectionName: string,
    documentId: string,
    data: Partial<T>
  ): Promise<void> {
    try {
      const docRef = doc(db, collectionName, documentId);
      await updateDoc(docRef, data);
    } catch (error) {
      console.error("Error updating document:", error);
      throw error;
    }
  }

  static async deleteDocument(
    collectionName: string,
    documentId: string
  ): Promise<void> {
    try {
      const docRef = doc(db, collectionName, documentId);
      await deleteDoc(docRef);
    } catch (error) {
      console.error("Error deleting document:", error);
      throw error;
    }
  }

  // Helper methods for common queries
  static async getDocumentsWhere<T = DocumentData>(
    collectionName: string,
    field: string,
    operator: any,
    value: any
  ): Promise<T[]> {
    return this.getDocuments<T>(collectionName, [
      where(field, operator, value),
    ]);
  }

  static async getDocumentsOrdered<T = DocumentData>(
    collectionName: string,
    field: string,
    direction: "asc" | "desc" = "asc"
  ): Promise<T[]> {
    return this.getDocuments<T>(collectionName, [orderBy(field, direction)]);
  }

  static async getDocumentsLimited<T = DocumentData>(
    collectionName: string,
    limitCount: number
  ): Promise<T[]> {
    return this.getDocuments<T>(collectionName, [limit(limitCount)]);
  }
}
