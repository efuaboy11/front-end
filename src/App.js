import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Register } from './pages/signUp/register';
import ScrollToTop from './component/scrollToTop';// assuming you're using useLocation here
import { Login } from './pages/signUp/login';
import { AuthProvider } from './context/AuthContext';
import { OTP } from './pages/signUp/otp';
import { ForgotPasssword } from './pages/signUp/forgetPassword';
import { ForgotPassWord2 } from './pages/signUp/forgetPassword2';
import { AdminDashFrame } from './component/adminDashFrame';

function App() {
  return (
    <Router>
      <AuthProvider>
        <ScrollToTop />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/otp-page" element={<OTP />} />
          <Route path="/forgot-password" element={<ForgotPasssword />} />
          <Route path="/forgot-password-2" element={<ForgotPassWord2 />} />


          {/* -----------------------------------DASHBOARD ---------------------------------- */}
          <Route path="/dahframe" element={< AdminDashFrame/>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
