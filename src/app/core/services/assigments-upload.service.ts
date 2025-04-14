import { Injectable } from '@angular/core';
import {
  Storage,
  ref,
  uploadBytes,
  getDownloadURL,
} from '@angular/fire/storage';

@Injectable({ providedIn: 'root' })
export class AssignmentUploadService {
  constructor(private storage: Storage) {}

  async uploadAssignmentFile(
    file: File,
    assignmentId: string
  ): Promise<string> {
    const path = `assignments/${assignmentId}/${file.name}`;
    const storageRef = ref(this.storage, path);
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
  }
}
