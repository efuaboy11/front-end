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
import { AllDeposit } from './pages/adminDashboard/allDesposit';
import { AdminHome } from './pages/adminDashboard/adminHome';
import { IndividualDeposit } from './pages/adminDashboard/individualDeposit';

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


          {/* -----------------------------------ADMIN DASHBOARD ---------------------------------- */}
          <Route path="/dahframe" element={< AdminDashFrame/>} />
          <Route path="/admin/home" element={< AdminHome/>} />  
          <Route path="/admin/all-deposits" element={< AllDeposit/>} /> 
          <Route path="/admin/all-deposits/:id" element={< IndividualDeposit/>} /> 
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
