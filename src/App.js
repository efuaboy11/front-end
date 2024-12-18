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
import { AllInvestment } from './pages/adminDashboard/investment/allInvestment';
import { IndividualInvestment } from './pages/adminDashboard/investment/individualInvestment';
import { ActiveInvestment } from './pages/adminDashboard/investment/activeInvestment';
import { CompeletedInvestment } from './pages/adminDashboard/investment/completedInvestment';
import { CanceledInvestment } from './pages/adminDashboard/investment/canceled';
import { PendingInvestment } from './pages/adminDashboard/investment/pendingInvestment';
import { AddInvestment } from './pages/adminDashboard/investment/addInvestment';
import { AllInterest } from './pages/adminDashboard/interest/interest';
import { AllDataProvider } from './context/Alldata';
import { AllBonus } from './pages/adminDashboard/bonus/bonus';
import { Commission } from './pages/adminDashboard/commission/commission';
import { NotUploadedKYC } from './pages/adminDashboard/KYC/notUploadedKYC';
import { VerifiedKYC } from './pages/adminDashboard/KYC/verifiedKYC';
import { IndividualKYC } from './pages/adminDashboard/KYC/individualKYC';
import { RejectedKYC } from './pages/adminDashboard/KYC/rejected';
import { KYCList } from './pages/adminDashboard/KYC/kycList';
import { AddKYC } from './pages/adminDashboard/KYC/addKYC';
import { PendingKYC } from './pages/adminDashboard/KYC/pendingKYC';
import { DisableUser } from './pages/adminDashboard/user/disableUser';
import { UserVerification } from './pages/adminDashboard/user/userVerification';
import { PendingUserVerification } from './pages/adminDashboard/user/pendingUserVerification';
import { CanceledUserVerification } from './pages/adminDashboard/user/canceledUserVerification';
import { VerifiedUser } from './pages/adminDashboard/user/verifiedUser';
import { UnverifiedUser } from './pages/adminDashboard/user/unverifiedUser';
import { UserList } from './pages/adminDashboard/user/userList';
import { UserDetails } from './pages/adminDashboard/user/userDetails';
import { AddUserAdmin } from './pages/adminDashboard/user/addUser';
import { UploadVerification } from './pages/adminDashboard/user/uploadUserVerification';
import { FundsAccount } from './pages/adminDashboard/fundsAccount/fundsAccount';
import { BlackListIp } from './pages/adminDashboard/blackListIP/blackListIP';
import { NewsLetter } from './pages/adminDashboard/newsLetter/newsLetter';
import { InvestmentPlan } from './pages/adminDashboard/investmentPlan/investmentPlan';
import { EditInvestmentPlan } from './pages/adminDashboard/investmentPlan/editInvestmentPlan';
import { AddInvestmentPlan } from './pages/adminDashboard/investmentPlan/addInvestment';
import { PaymentMethod } from './pages/adminDashboard/paymentMethod/paymentMethod';
import { EditPaymentMethod } from './pages/adminDashboard/paymentMethod/editPaymentMethod';
import { AddPaymentMethod } from './pages/adminDashboard/paymentMethod/addNew';
import { CyptoWallet } from './pages/adminDashboard/userPaymentDetails/cyptoWallet';
import { EditCrytoWallet } from './pages/adminDashboard/userPaymentDetails/editCryptoWallet';
import { AddCrytoWallet } from './pages/adminDashboard/userPaymentDetails/addWallet';
import { BankAccount } from './pages/adminDashboard/userPaymentDetails/BankAccount/bankAccount';
import { EditBankAccount } from './pages/adminDashboard/userPaymentDetails/BankAccount/editBankAccount';
import { AddBankAccount } from './pages/adminDashboard/userPaymentDetails/BankAccount/addBankAccount';
import { BankCard } from './pages/adminDashboard/userPaymentDetails/BankCard/bankCard';
import { AddBankCard } from './pages/adminDashboard/userPaymentDetails/BankCard/addBankCard';
import { EditBankCard } from './pages/adminDashboard/userPaymentDetails/BankCard/editBankCard';
import { ChangePassowrd1 } from './pages/adminDashboard/changePassword/step1';
import { ChangePassowrd2 } from './pages/adminDashboard/changePassword/step2';
import { ChangePassowrd3 } from './pages/adminDashboard/changePassword/step3';
import { SelectUser } from './pages/adminDashboard/userPaymentDetails/individualPaymentMethod/selectUser';
import { PaymetntDetailsOptions } from './pages/adminDashboard/userPaymentDetails/individualPaymentMethod/paymentDetailsOptions';
import { IndividualBankCard } from './pages/adminDashboard/userPaymentDetails/individualPaymentMethod/individualbankcard';
import { IndividualBankAccount } from './pages/adminDashboard/userPaymentDetails/individualPaymentMethod/individualbankAccount';
import { IndividualWallet } from './pages/adminDashboard/userPaymentDetails/individualPaymentMethod/individualWalletAddress';
import { SelectUserWithdraw } from './pages/adminDashboard/withdraws/AddWithdraw/selectUser';
import { PaymetntDetailsOptionsWithdraw } from './pages/adminDashboard/withdraws/AddWithdraw/paymentOptions';
import { BankCardWithdraw } from './pages/adminDashboard/withdraws/AddWithdraw/bankCard';
import { BankAccountWithdraw } from './pages/adminDashboard/withdraws/AddWithdraw/bankAccount';
import { WalletWithdraw } from './pages/adminDashboard/withdraws/AddWithdraw/walletAddress';
import { AddWithdraw } from './pages/adminDashboard/withdraws/AddWithdraw/addWthdraw';
import { UserLoginDetails } from './pages/adminDashboard/userLoginDetails/userLoginDetails';
import { AllEmail } from './pages/adminDashboard/email/allEmail';
import { SendEmail } from './pages/adminDashboard/email/sendEmail';


function App() {
  return (
    <Router>
      <AuthProvider>
        <AllDataProvider>


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
          <Route path="/admin/withdraw/select-user" element={<SelectUserWithdraw/>} />
          <Route path="/admin/withdraw/payment-options" element={<PaymetntDetailsOptionsWithdraw/>} />
          <Route path="/admin/withdraw/bank-card" element={<BankCardWithdraw/>} />
          <Route path="/admin/withdraw/bank-account" element={<BankAccountWithdraw/>} />
          <Route path="/admin/withdraw/wallet-address" element={<WalletWithdraw/>} />
          


          {/* Investment */}
          <Route path="/admin/all-investment" element={<AllInvestment/>} />
          <Route path="/admin/all-investment/:1d" element={<IndividualInvestment/>} />
          <Route path="/admin/active-investment" element={<ActiveInvestment/>} />
          <Route path="/admin/compeleted-investment" element={<CompeletedInvestment/>} />
          <Route path="/admin/canceled-investment" element={<CanceledInvestment/>} />
          <Route path="/admin/pending-investment" element={<PendingInvestment/>} />
          <Route path="/admin/add-investment" element={<AddInvestment/>} />

          {/* Interest */}
          <Route path="/admin/all-interest" element={<AllInterest/>} />

          {/* Bonus */}
          <Route path="/admin/all-bonus" element={<AllBonus/>} />

          {/* Commission */}
          <Route path="/admin/all-commission" element={<Commission/>} />

          {/* KYC */}
          <Route path="/admin/KYC/list" element={<KYCList/>} />
          <Route path="/admin/KYC/:id" element={<IndividualKYC/>} />
          <Route path="/admin/KYC/not-uploaded" element={<NotUploadedKYC/>} />
          <Route path="/admin/KYC/verified" element={<VerifiedKYC/>} />
          <Route path="/admin/KYC/rejected" element={<RejectedKYC/>} />
          <Route path="/admin/KYC/pending" element={<PendingKYC/>} />
          <Route path="/admin/KYC/add" element={<AddKYC/>} />

          {/* User */}
          <Route path="/admin/user/list" element={<UserList/>} />
          <Route path="/admin/user/:id" element={<UserDetails/>} />
          <Route path="/admin/user/disable" element={<DisableUser/>} />
          <Route path="/admin/user-verification" element={<UserVerification/>} />
          <Route path="/admin/user-verification/pending" element={<PendingUserVerification/>} />
          <Route path="/admin/user-verification/canceled" element={<CanceledUserVerification/>} />
          <Route path="/admin/user-verification/verified" element={<VerifiedUser/>} />
          <Route path="/admin/user-verification/unverified" element={<UnverifiedUser/>} />
          <Route path="/admin/user-verification/add" element={<UploadVerification/>} />
          <Route path="/admin/user/add" element={<AddUserAdmin/>} />

          {/* Funds account */}
          <Route path="/admin/funds-account/" element={<FundsAccount/>} />

          {/* BlackList Ip */}
          <Route path="/admin/blackList-ip/" element={<BlackListIp/>} />

          {/* NewsLetter */}
          <Route path="/admin/news-letter/" element={<NewsLetter/>} />

          {/* Investment Plan */}
          <Route path="/admin/investment-plan/" element={<InvestmentPlan/>} />
          <Route path="/admin/investment-plan/:id" element={<EditInvestmentPlan/>} />
          <Route path="/admin/investment-plan/add" element={<AddInvestmentPlan/>} />

          {/* Payment Options */}
          <Route path="/admin/payment-method/" element={<PaymentMethod/>} />
          <Route path="/admin/payment-method/:id" element={<EditPaymentMethod/>} />
          <Route path="/admin/payment-method/add" element={<AddPaymentMethod/>} />

          {/* User Payment Details */}
          <Route path="/admin/payment-account/wallet-address/add" element={<AddCrytoWallet/>} />
          <Route path="/admin/payment-account/wallet-address" element={<CyptoWallet/>} />
          <Route path="/admin/payment-account/wallet-address/:id" element={<EditCrytoWallet/>} />

          {/* Bank Account */}
          <Route path="/admin/payment-account/bank-account/add" element={<AddBankAccount/>} />
          <Route path="/admin/payment-account/bank-account" element={<BankAccount/>} />
          <Route path="/admin/payment-account/bank-account/:id" element={<EditBankAccount/>} />

          {/* Bank Card  */}
          <Route path="/admin/payment-account/bank-card/add" element={<AddBankCard/>} />
          <Route path="/admin/payment-account/bank-card/" element={<BankCard/>} />
          <Route path="/admin/payment-account/bank-card/:id" element={<EditBankCard/>} />

          {/* Change Password */}
          <Route path="/admin/change-password/step-1/" element={<ChangePassowrd1/>} />
          <Route path="/admin/change-password/step-2/" element={<ChangePassowrd2/>} />
          <Route path="/admin/change-password/step-3/" element={<ChangePassowrd3/>} />

          {/* User details */}
          <Route path="/admin/user-login-details/" element={<UserLoginDetails/>} />

          {/* Individual Payment Method */}
          <Route path="/admin/individual-payment-method/select-user/" element={<SelectUser/>} />
          <Route path="/admin/individual-payment-method/payment-option/" element={<PaymetntDetailsOptions/>} />
          <Route path="/admin/individual-payment-method/individual-bank-card/" element={<IndividualBankCard/>} />
          <Route path="/admin/individual-payment-method/individual-bank-account/" element={<IndividualBankAccount/>} />
          <Route path="/admin/individual-payment-method/individual-wallet/" element={<IndividualWallet/>} />

          {/* Email */}
          <Route path="/admin/all-email/" element={<AllEmail/>} />
          <Route path="/admin/send-email/:id" element={<SendEmail/>} />
        </Routes>
        </AllDataProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
