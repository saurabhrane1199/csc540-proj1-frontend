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
        <Route path="/faculty" element={<FacultyLandingPage />}></Route>
        <Route path="/ta" element={<TALandingPage />}></Route>
        <Route path="/student" element={<StudentLandingPage />}></Route>
      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
