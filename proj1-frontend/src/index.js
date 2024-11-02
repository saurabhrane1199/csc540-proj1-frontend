import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login';
import AdminLandingPage from './components/admin/AdminLandingPage';
import FacultyLandingPage from './components/faculty/FacultyLandingPage';
import TALandingPage from './components/ta/TALandingPage';
import StudentLandingPage from './components/student/StudentLandingPage'
import AddNewChapter from './components/create-chapters/AddNewChapter';
import AddNewSection from './components/create-section/AddNewSection'
import CreateCourseForm from './components/create-course/CreateCourseForm'
import CreateEvaluationCourseForm from './components/create-course/CreateEvaluationCourseForm'
import AddNewContentBlock from './components/create-content/AddNewContentBlock';
import ActivityForm from './components/create-activity/Activity';
import AddQuestionForm from './components/create-activity/AddQuestion';
import AddText from './components/create-content/AddText';
import AddPicture from './components/create-content/AddPicture'
import ActiveCoursePage from './components/faculty/active-course/ActiveCoursePage';
import ViewCoursesPage from './components/faculty/view-course/ViewCoursePage';
import ChangePasswordPage from './components/ChangePassword'
import AddTAPage from './components/faculty/AddTAPage';
import ViewStudentsPage from './components/faculty/ViewStudentsPage';
import ApproveEnrollmentPage from './components/faculty/ApproveEnrollmentPage';
import ViewWorklistPage from './components/faculty/ViewWorklistPage';





const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/admin" element={<AdminLandingPage />}></Route>
        <Route path="/create/chapter" element={<AddNewChapter />}></Route>
        <Route path="/create/section" element={<AddNewSection />}></Route>
        <Route path="/create/course" element={<CreateCourseForm />}></Route>
        <Route path="/create/evalcourse" element={<CreateEvaluationCourseForm />}></Route>
        <Route path="/create/content" element={<AddNewContentBlock />}></Route>
        <Route path="/create/content/image" element={<AddPicture />}></Route>
        <Route path="/create/content/activity" element={<ActivityForm />}></Route>
        <Route path="/create/content/activity/question" element={<AddQuestionForm />}></Route>
        <Route path="/create/content/text" element={<AddText />}></Route>
        <Route path="/faculty" element={<FacultyLandingPage />}></Route>
        <Route path="/faculty/active/course" element={<ActiveCoursePage />}></Route>
        <Route path="/faculty/courses" element={<ViewCoursesPage />}></Route>
        <Route path="/faculty/worklist" element={<ViewWorklistPage />}></Route >
        <Route path="/faculty/approve-enrollment" element={<ApproveEnrollmentPage />}></Route >
        <Route path="/faculty/view-students" element={<ViewStudentsPage />}></Route >
        <Route path="/faculty/add-ta" element={<AddTAPage />}></Route >
        <Route path="/ta" element={<TALandingPage />}></Route>
        <Route path="/student" element={<StudentLandingPage />}></Route>
        <Route path="/change-password" element={<ChangePasswordPage />}></Route>
      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
