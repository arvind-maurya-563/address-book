import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ContactPage from './pages/ContactPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { HomePage } from './pages/homePage';


const App = () => {
  return (
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/address-book-list" element={<ContactPage/>} />
          <Route path="/" element={<HomePage/>} />
        </Routes>
      </Router>
  );
};

export default App;
