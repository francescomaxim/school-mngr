export interface Assignment {
  id?: string;
  title: string;
  description: string;
  courseId: string;
  teacherId: string;
  dueDate: string;
  createdAt: string;
  fileUrl?: string;
  submissions?: Submission[];
}

export interface Submission {
  studentId: string;
  fileUrl: string;
  submittedAt: string;
  grade?: number;
}
