# 📚 Classter - Smart School Management System

Classter is a modern web application developed with Angular and Firebase, designed to manage school activities for students and teachers, offering advanced artificial intelligence support and real-time functionalities.

---

## ⚙️ Technologies Used

- **Frontend:** Angular, NgRx, Angular Material / TailwindCSS / Bootstrap
- **Backend:** Firebase Realtime Database, Authentication, Storage, Cloud Functions
- **AI & OCR:** Gemini API (Summarization and Virtual Assistant), Google Vision API (OCR and image analysis)

---

## 🚀 Key Features

### 🔒 Authentication & Authorization

- Role-based authentication: **student**, **teacher**, **admin**
- Firebase Authentication

### 📖 Course Management

- Create, edit, and delete courses
- Course materials (documents, images)
- Automatic/manual student enrollment

### 📝 Assignment Management

- Add and manage assignments and projects
- Automated assignment submission and validation via OCR (Google Vision API)

### 📅 Attendance Tracking

- Intuitive attendance system
- Excel report generation (ExcelService)

### 📊 Reports & Statistics

- Export and import academic data in Excel
- Student and teacher performance analytics

### 🤖 Integrated AI Assistant

- Automatic course material summaries
- Intelligent feedback for assignments and projects (Gemini API)
- Integrated virtual assistant (chatbot)

### 📲 Notifications

- Real-time notifications for updates, grades, and deadlines
- Firebase Cloud Messaging

---

## 🗂️ Project Structure

```bash
src
├── app
│   ├── core
│   │   └── services (Firebase, Excel, Gemini, Vision)
│   ├── modules
│   │   ├── auth
│   │   ├── dashboard
│   │   ├── courses
│   │   ├── assignments
│   │   ├── attendance
│   │   └── users
│   ├── shared
│   └── store (NgRx)
│       ├── actions
│       ├── reducers
│       ├── effects
│       └── selectors
└── environments
```

---

## 🔥 Firebase Realtime Database Structure

```json
classter
├── users
├── courses
├── assignments
├── attendance
└── notifications
```

---

## 🛠️ Specific Integrated Services

- **ExcelService**: Generate and import academic data in Excel format
- **GeminiService**: Automatic summaries, intelligent feedback, chatbot
- **GoogleVisionService**: OCR and automatic document validation

---

## 🔄 Data Flow (NgRx)

```plaintext
Component ➜ Action ➜ Effect ➜ Service (Firebase) ➜ Reducer ➜ Store ➜ Selector ➜ Component
```

---

## 📌 Installation and Local Development

1. Clone the repository:

```bash
git clone https://github.com/francescomaxim/school-mngr.git
cd school-mngr
```

2. Install dependencies:

```bash
npm install
```

3. Configure the environment.ts file:

```typescript
export const environment = {
  firebaseConfig: {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
  },
};
```

4. Run the application:

```bash
ng serve
```

---

## 📦 Build and Deploy (Firebase Hosting)

```bash
ng build --prod
firebase deploy
```

---

## 👨‍💻 Author

Built with ❤️ using Angular & Firebase

---
