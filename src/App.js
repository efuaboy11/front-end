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
import { SendEmail } from './pages/adminDashboard/email/sendEmailUser';
import { SendBulkEmail } from './pages/adminDashboard/email/sendBulkEmail';
import { EmailMessage } from './pages/adminDashboard/email/emailMessages';
import { SendEmail2 } from './pages/adminDashboard/email/sendEmail';
import PrivateRoute from './utils/PrivateRoute';
import { ClientDashFrame } from './component/ClientDashFrame';
import { ClientDashboard } from './pages/clientDashboard/clientDashboard';
import { AddDeposit1 } from './pages/clientDashboard/Deposit/AddDeposit/step1';
import { AccessProvider } from './context/accessContext';
import { ProtectedRoute } from './utils/ProctectedRoute';
import { AddDeposit2 } from './pages/clientDashboard/Deposit/AddDeposit/step2';
import { AddDeposit3 } from './pages/clientDashboard/Deposit/AddDeposit/step3';
import { AddDeposit4 } from './pages/clientDashboard/Deposit/AddDeposit/step4';
import { DepositHistory } from './pages/clientDashboard/Deposit/DepositHistory';
import { AddWithdraw1 } from './pages/clientDashboard/withdraw/addWithdraw/step1';
import { ClientPaymetntDetailsOptionsWithdraw } from './pages/clientDashboard/withdraw/addWithdraw/paymentOptions';
import { ClientBankCardWithdraw } from './pages/clientDashboard/withdraw/addWithdraw/bankCard';
import { ClientBankAccountWithdraw } from './pages/clientDashboard/withdraw/addWithdraw/bankAccount';
import { ClientWalletWithdraw } from './pages/clientDashboard/withdraw/addWithdraw/walletAddress';
import { WithdrawReviewDetails } from './pages/clientDashboard/withdraw/addWithdraw/reviewDetails';
import { WithdrawFinalPage } from './pages/clientDashboard/withdraw/addWithdraw/finalPage';
import { ClientUploadKYC } from './pages/clientDashboard/kyc/uploadKyc';
import { ClientKYC } from './pages/clientDashboard/kyc/kyc';
import { ClientUserVerification } from './pages/clientDashboard/userVerification/userVerifcation';
import { ClientUploadUserVerification } from './pages/clientDashboard/userVerification/uploadVerification';
import { WithdrawHistory } from './pages/clientDashboard/withdraw/withdrawHistory';
import { ClientIndividualWithdraw } from './pages/clientDashboard/withdraw/individualWithdraw';
import { ClientIndividualDeposit } from './pages/clientDashboard/Deposit/individualDeposit';
import { ClientInvestmentPlan } from './pages/clientDashboard/investment/investmentPlan';
import { ClientInvestmentAddAmount } from './pages/clientDashboard/investment/addAmount';
import { ClientInvestmentReviewDetails } from './pages/clientDashboard/investment/reviewDetails';
import { InvestmentFinalPage } from './pages/clientDashboard/investment/finalPage';
import { ClientInsufficientBalance } from './pages/clientDashboard/investment/insufficientBalance';
import { InvestmentHistory } from './pages/clientDashboard/investment/InvestmentHistory';
import { ClientIndividualInvestment } from './pages/clientDashboard/investment/individualInvestment';
import { ClientPaymetntDetailsOptions } from './pages/clientDashboard/userPaymentDetails/paymentDetailsOptions';
import { ClientCyptoWallet } from './pages/clientDashboard/userPaymentDetails/walletAddress/cyptoWallet';
import { ClientAddCrytoWallet } from './pages/clientDashboard/userPaymentDetails/walletAddress/addWallet';
import { ClientEditCrytoWallet } from './pages/clientDashboard/userPaymentDetails/walletAddress/editCryptoWallet';
import { ClientBankAccount } from './pages/clientDashboard/userPaymentDetails/BankAccount/bankAccount';
import { ClientAddBankAccount, ClientAddBankAccountAdd } from './pages/clientDashboard/userPaymentDetails/BankAccount/addBankAccount';
import { ClientEditBankAccount } from './pages/clientDashboard/userPaymentDetails/BankAccount/editBankAccount';
import { ClientBankCard } from './pages/clientDashboard/userPaymentDetails/BankCard/bankCard';
import { ClientAddBankCard } from './pages/clientDashboard/userPaymentDetails/BankCard/addBankCard';
import { ClientEditBankCard } from './pages/clientDashboard/userPaymentDetails/BankCard/editBankCard';



function App() {
  return (
    <Router>
      <AuthProvider>
        <AllDataProvider>
          <AccessProvider>
            <ScrollToTop />
            <Routes>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/otp-page" element={<OTP />} />
              <Route path="/forgot-password" element={<ForgotPasssword />} />
              <Route path="/forgot-password-2" element={<ForgotPassWord2 />} />


              <Route path="/dahframe/client" element={< ClientDashFrame/>} />
              <Route element={<PrivateRoute />}>

                {/* -----------------------------------CLIENT DASHBOARD ---------------------------------- */}
                
                <Route path="/dashboard/home/" element={< ClientDashboard/>} />

                {/* Deposit */}
                <Route path="/dashboard/deposit/step-1/" element={< AddDeposit1/>} />
                <Route path="/dashboard/deposit/step-2/" element={< AddDeposit2/>} />
                <Route path="/dashboard/deposit/step-3/" element={< AddDeposit3/>} />   
                <Route path="/dashboard/deposit/step-4/" element={< AddDeposit4/>} />
                <Route path="/dashboard/deposit/history/" element={< DepositHistory/>} />
                <Route path="/dashboard/deposit/history/:id" element={< ClientIndividualDeposit/>} />
                {/* Withdraw */}
                <Route path="/dashboard/add-withdraw/" element={< AddWithdraw1/>} />
                <Route path="/dashboard/withdraw/payment-options/" element={< ClientPaymetntDetailsOptionsWithdraw/>} />
                <Route path="/dashboard/withdraw/bank-card/" element={< ClientBankCardWithdraw/>} />
                <Route path="/dashboard/withdraw/bank-account/" element={< ClientBankAccountWithdraw/>} />
                <Route path="/dashboard/withdraw/wallet-address/" element={< ClientWalletWithdraw/>} />
                <Route path="/dashboard/withdraw/review-details/" element={< WithdrawReviewDetails/>} />
                <Route path="/dashboard/withdraw/successful/" element={< WithdrawFinalPage/>} />
                <Route path="/dashboard/withdraw/history/" element={< WithdrawHistory/>} />
                <Route path="/dashboard/withdraw/history/:id" element={< ClientIndividualWithdraw/>} />
                {/* KYC */}
                <Route path="/dashboard/kyc-upload/" element={< ClientUploadKYC/>} />\
                <Route path="/dashboard/kyc-aml/" element={< ClientKYC/>} />
                {/* User Verification */}                 <Route path="/dashboard/user-verification/" element={< ClientUserVerification/>} />
                <Route path="/dashboard/user-verification/upload/" element={< ClientUploadUserVerification/>} />


                {/* Investment */}
                <Route path="/dashboard/investment/plan/" element={< ClientInvestmentPlan/>} />
                <Route path="/dashboard/investment/buy-plan-amount/" element={< ClientInvestmentAddAmount/>} />
                <Route path="/dashboard/investment/review-details/" element={< ClientInvestmentReviewDetails/>} />
                <Route path="/dashboard/investment/successful/" element={< InvestmentFinalPage/>} />
                <Route path="/dashboard/investment/history/" element={< InvestmentHistory/>} />
                <Route path="/dashboard/investment/history/:id" element={< ClientIndividualInvestment/>} />

                {/* Insufficinet Balance */}
                <Route path="/dashboard/insufficient-balance/" element={< ClientInsufficientBalance/>} />

                {/* Payment method */}
                <Route path="/dashboard/payment-gateway/" element={< ClientPaymetntDetailsOptions/>} />
                <Route path="/dashboard/payment-gateway/crypto-wallet/add/" element={< ClientAddCrytoWallet/>} />
                <Route path="/dashboard/payment-gateway/crypto-wallet/:id" element={< ClientEditCrytoWallet/>} />
                <Route path="/dashboard/payment-gateway/crypto-wallet/" element={< ClientCyptoWallet/>} />

                <Route path="/dashboard/payment-gateway/bank-account/" element={< ClientBankAccount/>} />
                <Route path="/dashboard/payment-gateway/bank-account/add/" element={< ClientAddBankAccount/>} />
                <Route path="/dashboard/payment-gateway/bank-account/:id" element={< ClientEditBankAccount/>} />

                <Route path="/dashboard/payment-gateway/bank-card/" element={< ClientBankCard/>} />
                <Route path="/dashboard/payment-gateway/bank-card/add/" element={< ClientAddBankCard/>} />
                <Route path="/dashboard/payment-gateway/bank-card/:id" element={< ClientEditBankCard/>} />
                <Route element={<PrivateRoute requiredRole='ADMIN'/>}>
                  {/* -----------------------------------ADMIN DASHBOARD ---------------------------------- */}
                  <Route path="/dahframe" element={< AdminDashFrame/>} />
                  <Route path="/admin/home" element={< AdminHome/>} /> 

                  {/*deposits  */}
                  <Route path="/admin/all-deposits" element={< AllDeposit/>} /> 
                  <Route
                    path="/admin/all-deposits/:id"
                    element={<ProtectedRoute element={IndividualDeposit} path="/admin/all-deposits/:id" />}
                  />
                  {/* <Route path="/admin/all-deposits/:id" element={< IndividualDeposit/>} />  */}
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
                  <Route path="/admin/change-password/step-2/" element={<ProtectedRoute element={ChangePassowrd2} path="/admin/change-password/step-2/" isMandatory={true}/>}/>
                  <Route path="/admin/change-password/step-1/" element={<ChangePassowrd1/>} />
                  <Route path="/admin/change-password/step-3/" element={<ProtectedRoute element={ChangePassowrd3} path="/admin/change-password/step-3/" isMandatory={true}/>}/>

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
                  <Route path="/admin/send-email-user/:id" element={<SendEmail/>} />
                  <Route path="/admin/send-email/" element={<SendEmail2/>} />
                  <Route path="/admin/send-bulk-email/" element={<SendBulkEmail/>} />
                  <Route path="/admin/email-messages/" element={<EmailMessage/>} />
                </Route>
              </Route>
            </Routes>
          </AccessProvider>
        </AllDataProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
