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
import { AllDeposit } from './pages/adminDashboard/deposits/allDesposit';
import { IndividualDeposit } from './pages/adminDashboard/deposits/individualDeposit';
import { PendingDeposit } from './pages/adminDashboard/deposits/pendingDeposit';
import { AddDeposit } from './pages/adminDashboard/deposits/addDeposit';
import { DeclinedDeposit } from './pages/adminDashboard/deposits/declinedDeposit';
import { SuccessfulDeposit } from './pages/adminDashboard/deposits/confirmedDeposit';
import { AdminHome } from './pages/adminDashboard/adminHome';



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
          <Route path="/admin/successful-deposits" element={< SuccessfulDeposit/>} /> 
          <Route path="/admin/pending-deposits" element={< PendingDeposit/>} /> 
          <Route path="/admin/declined-deposits" element={< DeclinedDeposit/>} /> 
          <Route path="/admin/add-deposits" element={< AddDeposit/>} /> 
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
