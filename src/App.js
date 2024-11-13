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
import { AllWithdraw } from './pages/adminDashboard/withdraws/allWithdraw';
import { IndividualWithdraw } from './pages/adminDashboard/withdraws/individualWithdraw';
import { SuccessfulWithdraw } from './pages/adminDashboard/withdraws/confirmedWithdraw';
import { DeclinedWithdraw } from './pages/adminDashboard/withdraws/declinedWithdraw';
import { PendingWithdraw } from './pages/adminDashboard/withdraws/pendingWithdraw';
import { AddWithdraw } from './pages/adminDashboard/withdraws/addWithdraw';
import { AllInvestment } from './pages/adminDashboard/investment/allInvestment';
import { IndividualInvestment } from './pages/adminDashboard/investment/individualInvestment';


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

           {/*deposits  */}
          <Route path="/admin/all-deposits" element={< AllDeposit/>} /> 
          <Route path="/admin/all-deposits/:id" element={< IndividualDeposit/>} /> 
          <Route path="/admin/successful-deposits" element={< SuccessfulDeposit/>} /> 
          <Route path="/admin/pending-deposits" element={< PendingDeposit/>} /> 
          <Route path="/admin/declined-deposits" element={< DeclinedDeposit/>} /> 
          <Route path="/admin/add-deposits" element={< AddDeposit/>} /> \

          {/* withdraws */}
          <Route path="/admin/all-withdraws" element={< AllWithdraw/>} /> 
          <Route path="/admin/all-withdraws/:id" element={< IndividualWithdraw/>} /> 
          <Route path="/admin/successful-withdraws" element={< SuccessfulWithdraw/>} />
          <Route path="/admin/declined-withdraws" element={< DeclinedWithdraw/>} />
          <Route path="/admin/pending-withdraws" element={<PendingWithdraw/>} />
          <Route path="/admin/add-withdraw" element={<AddWithdraw/>} />

          {/* Investment */}
          <Route path="/admin/all-investment" element={<AllInvestment/>} />
          <Route path="/admin/all-investment/:1d" element={<IndividualInvestment/>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
