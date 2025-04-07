export interface Assignment {
  id?: string; // generat automat
  title: string;
  description: string;
  courseId: string; // asociat cu un curs
  teacherId: string; // cine a creat assignment-ul
  dueDate: string; // data limită (ISO string)
  createdAt: string; // data creării
  submissions?: Submission[]; // opțional, pentru dashboard student/profesor
}

export interface Submission {
  studentId: string;
  fileUrl: string;
  submittedAt: string;
  grade?: number;
}
