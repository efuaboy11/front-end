import { faAngleDown, faArrowLeft, faBan, faBars, faCoins, faCube, faEnvelope, faEnvelopesBulk, faHandHoldingDollar, faL, faLock, faMoneyBillTransfer, faPercent, faRightLeft, faSackDollar, faShield } from '@fortawesome/free-solid-svg-icons'
import '../css/componentCss/dashboardFrame.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext, useEffect, useState } from 'react'
import AuthContext from '../context/AuthContext'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import userIcon from '../img/user-icon.png'





export const AdminDashFrame = () =>{
  const { authTokens, 
    showSidebar, 
    toggleCloseSidebar,
    toggleShowSidebar,
    OnbodyClick,
    LogoutUser,

  } = useContext(AuthContext)

  const [navDropdown, setNavDropdown] = useState(false)


  const [depositDropdown, setDepositDropdown] = useState(false)
  const [withdrawDropdown, setWithdrawDropdown] = useState(false)
  const [investmentDropdown, setInvestmentDropdown] = useState(false)
  const [paymentDetailsDropdown, setPaymentDetailsDropdown] = useState(false)
  const [usersDropdown, setUserDropdown] = useState(false)
  const [kycDropdown, setKycDopdown] = useState(false)
  const [paymentOptions, setPaymentOptions] = useState(false)
  const [investmentPlanDropdown, setinvestmentPlanDropdown] = useState(false)
  const [emailDropdown, setEmailDropdown] = useState(false)

  const [depositCount, setDepositCount] = useState(0);
  const [successDespositCount, setSucessDepositCount] = useState(0)
  const [pendingDespositCount, setPendingDespositCount] = useState(0)
  const [declinedDepositCount, setDeclinedDepositCount] = useState(0)

  const [withdrawCount, setWithdrawCount] = useState(0)
  const [SuccessWithdrawCount, setSuccessWithdrawCount] = useState(0)
  const [pendingWithdrawCount, setPendingWithdrawCount] = useState(0)
  const [declinedWithdrawCount, setDeclinedWithdrawCount] = useState(0)

  const [walletAddressCount, setWalletAddressCount] = useState(0)
  const [bankAccountCount, setBankAccountCount] = useState(0)
  const [bankCardCount, setBankCardCount] = useState(0)

  const [investmentCount, setInvestmentCount] = useState(0)
  const [activeInvestmentCount, setActiveInvestmentCount] = useState(0)
  const [completedInvestmentCount, setCompletednvestmentCount] = useState(0)
  const [pendingInvestmentCount, setPendingInvestmentCount] = useState(0)
  const [declinedInvestmentCount, setDeclinedInvestmentCount] = useState(0)


  const [usersCount, setUserCount] = useState(0)
  const [disableUserCount, setDisableUserCount] = useState(0)
  const [userVerificationCount, setUserVerificationCount] = useState(0)
  const [pendingUserVerificationCount, setPendingUserVerificationCount] = useState(0)
  const [canceledUserVerificationCount, setCanceledUserVerificationCount] = useState(0)
  const [unverifiedUserCount, setUnverfiedUserCount] = useState(0)
  const [verifiedUserCount, setVerifiedUserCount] = useState(0)


  const [KYCsCount, setKYCsCount] = useState(0)
  const [notUploadKYCsCount, setNotUploadKYCsCount] = useState(0)
  const [verifiedKYCsCount, setVerifiedKYCsCount] = useState(0)
  const [canceledKYCsCount, setCanceledKYCsCount] = useState(0)
  const [pendingKYCsCount, setPendingKYCsCount] = useState(0)

  const [emailCount, setEmailCount] = useState(0)
  const [investmentPlanCount, setInvestmentPlanCount] = useState(0)
  const [paymentOptionsCount, setPaymentOptionsCount] = useState(0)


  useEffect(() => {
    setDepositCount(sessionStorage.getItem('depositCount') || "0");
    setSucessDepositCount(sessionStorage.getItem('successDespositCount') || "0");
    setDeclinedDepositCount(sessionStorage.getItem('declinedDeposit') || "0");
    setPendingDespositCount(sessionStorage.getItem('pendingDespositCount') || "0");

    setWithdrawCount(sessionStorage.getItem('withdrawCount') || "0");
    setSuccessWithdrawCount(sessionStorage.getItem('SuccessWithdrawCount') || "0");
    setPendingWithdrawCount(sessionStorage.getItem('pendingWithdrawCount') || "0");
    setDeclinedWithdrawCount(sessionStorage.getItem('declinedWithdrawCount') || "0");


    setWalletAddressCount(sessionStorage.getItem('WalletCount') || "0");
    setBankAccountCount(sessionStorage.getItem('BankAccountCount') || "0");
    setBankCardCount(sessionStorage.getItem('BanKCardCount') || "0");

    setInvestmentCount(sessionStorage.getItem('investmentCount') || "0");
    setActiveInvestmentCount(sessionStorage.getItem('activeInvestmentCount') || "0");
    setCompletednvestmentCount(sessionStorage.getItem('completedInvestmentCount') || "0");
    setPendingInvestmentCount(sessionStorage.getItem('pendingInvestmentCount') || "0");
    setDeclinedInvestmentCount(sessionStorage.getItem('declinedInvestmentCount') || "0");

    setUserCount(sessionStorage.getItem('usersCount') || "0");
    setDisableUserCount(sessionStorage.getItem('disableUserCount') || "0");
    setUserVerificationCount(sessionStorage.getItem('userVerificationCount') || "0");
    setPendingUserVerificationCount(sessionStorage.getItem('pendingUserVerificationCount') || "0");
    setCanceledUserVerificationCount(sessionStorage.getItem('canceledUserVerificationCount') || "0");
    setUnverfiedUserCount(sessionStorage.getItem('unverifiedUserCount') || "0");
    setVerifiedUserCount(sessionStorage.getItem('verifiedUserCount') || "0");

    setKYCsCount(sessionStorage.getItem('KYCsCount') || "0");
    setNotUploadKYCsCount(sessionStorage.getItem('notUploadKYCsCount') || "0");
    setVerifiedKYCsCount(sessionStorage.getItem('verifiedKYCsCount') || "0");
    setCanceledKYCsCount(sessionStorage.getItem('canceledKYCsCount') || "0");
    setPendingKYCsCount(sessionStorage.getItem('pendingKYCsCount') || "0");

    setEmailCount(sessionStorage.getItem('emailCount') || "0");
    setInvestmentPlanCount(sessionStorage.getItem('investmentPlanCount') || "0");
    setPaymentOptionsCount(sessionStorage.getItem('paymentOptionsCount') || "0");
}, []);

  







  const location = useLocation();
  const isActiveDashLink = (path) =>{
    return location.pathname === path

  }


  const toggleDeposit = () =>{
    setDepositDropdown(!depositDropdown)
  }

  const toggleWithdraw = () =>{
    setWithdrawDropdown(!withdrawDropdown)
  }

  const togglePaymentDetails = () =>{
    setPaymentDetailsDropdown(!paymentDetailsDropdown)
  }

  const toggleInvestment = () =>{
    setInvestmentDropdown(!investmentDropdown)
  }

  const toggleUser = () =>{
    setUserDropdown(!usersDropdown)
  }
  const toggleKyc = () =>{
    setKycDopdown(!kycDropdown)
  }

  const toggleEmail = () =>{
    setEmailDropdown(!emailDropdown)
  }

  const toggleInvestmentPlan = () =>{
    setinvestmentPlanDropdown(!investmentPlanDropdown)
  }
  const togglePaymentOptions = () =>{
    setPaymentOptions(!paymentOptions)
  }
  const toggleNavDropdown = () =>{
    setNavDropdown(!navDropdown)
  }

  


  useEffect(() =>{
    document.body.style.backgroundColor = "#161616"

    return() =>{
      document.body.style.backgroundColor = "#f4f4f4"
    }
  }) 

  

  return(
    <div>
      <div className="dashboard-bg">
        <div>
          <div className={`dashboard-sidebar ${showSidebar ? 'show-sidebar': 'close-sidebar'}`}>
            <div className="dashboard-sidebar-head pt-3 mx-4 "><h4>ADMIN PANEL</h4><FontAwesomeIcon icon={faArrowLeft} onClick={toggleCloseSidebar} className="close-sidebar-btn pt-1 sm-text cursor-pointer"/></div>
            <hr />
            <ul className="scroll-bar-y dashboard-sidebar-height">
              <li className='mt-3 py-3'>
                <Link to='/admin/home' className='dashboard-link' onClick={OnbodyClick}>
                  <div className="d-flex ps-3">
                    <i class="bi bi-speedometer2 sm-text me-3"></i>
                    <p className='pt-1'>Dashboard</p>
                  </div>
                </Link>
              </li>
              <li className={`pb-2 ${isActiveDashLink("/admin") ?"active-dash-link": ""}  cursor-pointer`}>
                <div className='row mb-2 dashboard-sidebar-list' onClick={toggleDeposit}>
                  <div className='col-8 ps-4 y'>
                    <div className="d-flex">
                      <FontAwesomeIcon className='me-3  sm-text' icon={faHandHoldingDollar}/>
                      <p className='pt-1'>Deposit</p>
                    </div>

                  </div>
                  <div className="col-4 ">
                    <div className="d-flex me-2 justify-content-end mt-1" >
                      <p className='me-1 dahboard-sidebar-count'>{depositCount}</p>
                      <p className={`${depositDropdown ? 'rotate-90deg': ''}`}><i class="bi bi-chevron-right xsm-text" ></i></p>
                    </div>
                  </div>
                </div>
                

                <div>
                  <ul className={` dropdown-bg ${depositDropdown ? "slide-in" : "slide-out"}`}>
                    <li className={`dashboard-sidebar-dropdown-link ps-5 ${isActiveDashLink("/admin/addStudent") ?"active-dash-link": ""}`}>
                      <Link  className='dashboard-link' to="/admin/successful-deposits" onClick={OnbodyClick}>
                        <div className="d-flex">
                          <p>Confirmed</p> 
                          <p className='ps-3'>({successDespositCount})</p>
                        </div>
                      </Link>
                    </li>

                    <li className={`dashboard-sidebar-dropdown-link ps-5 pt-2 ${isActiveDashLink("/admin/addStudent") ?"active-dash-link": ""}`}>
                      <Link  className='dashboard-link' to="/admin/declined-deposits" onClick={OnbodyClick}>
                        <div className="d-flex">
                          <p>Declined</p> 
                          <p className='ps-3'>({declinedDepositCount})</p>
                        </div>
                      </Link>
                    </li>

                    <li className={`dashboard-sidebar-dropdown-link ps-5 pt-2 ${isActiveDashLink("/admin/addStudent") ?"active-dash-link": ""}`}>
                      <Link  className='dashboard-link' to="/admin/pending-deposits" onClick={OnbodyClick}>
                        <div className="d-flex">
                          <p>Pending</p> 
                          <p className='ps-3'>({pendingDespositCount})</p>
                        </div>
                      </Link>               
                    </li>

                    <li className={`dashboard-sidebar-dropdown-link ps-5 pt-2 ${isActiveDashLink("/admin/addStudent") ?"active-dash-link": ""}`}>
                      <Link  className='dashboard-link' to="/admin/all-deposits" onClick={OnbodyClick}>
                        <div className="d-flex">
                          <p>All Deposit</p> 
                          <p className='ps-3'>({depositCount})</p>
                        </div>
                      </Link>   
                    </li>

                    <li className={`pb-2 dashboard-sidebar-dropdown-link ps-5 pt-2 ${isActiveDashLink("/admin/add-deposits") ?"active-dash-link": ""}`}>
                      <Link className='dashboard-link' to="/admin/add-deposits" onClick={OnbodyClick}>
                        <div className="d-flex">
                          <p>Add New</p>
                        </div>
                      </Link> 
                    </li>
                    
                  </ul>
                </div>


     
              </li>

              <li className={`pb-2 ${isActiveDashLink("/admin") ?"active-dash-link": ""}  cursor-pointer`}>
                <div className='row mb-2 dashboard-sidebar-list' onClick={toggleWithdraw}>
                  <div className='col-8 ps-4 '>
                    <div className="d-flex">
                      <FontAwesomeIcon className='me-3 pt-1 sm-text' icon={faMoneyBillTransfer}/>
                      <p className='pt-1'>Withdraw</p>
                    </div>

                  </div>
                  <div className="col-4 ">
                    <div className="d-flex me-2 justify-content-end mt-1" >
                      <p className='me-1 dahboard-sidebar-count'>{withdrawCount}</p>
                      <p className={`${withdrawDropdown ? 'rotate-90deg': ''}`}><i class="bi bi-chevron-right xsm-text" ></i></p>
                    </div>
                  </div>
                </div>
                

                <div>
                  <ul className={` dropdown-bg ${withdrawDropdown ? "slide-in" : "slide-out"}`}>
                    <li className={`dashboard-sidebar-dropdown-link ps-5 ${isActiveDashLink("/admin/successful-withdraws") ?"active-dash-link": ""}`}>
                      <Link  className='dashboard-link' to="/admin/successful-withdraws" onClick={OnbodyClick}>
                        <div className="d-flex">
                          <p>Confirmed</p> 
                          <p className='ps-3'>({SuccessWithdrawCount})</p>
                        </div>
                      </Link>   
                    </li>

                    <li className={`dashboard-sidebar-dropdown-link ps-5 pt-2 ${isActiveDashLink("/admin/declined-withdraws") ?"active-dash-link": ""}`}>
                      <Link  className='dashboard-link' to="/admin/declined-withdraws" onClick={OnbodyClick}>
                        <div className="d-flex">
                          <p>Declined</p> 
                          <p className='ps-3'>({declinedWithdrawCount})</p>
                        </div>
                      </Link>  
                    </li>

                    <li className={`dashboard-sidebar-dropdown-link ps-5 pt-2 ${isActiveDashLink("/admin/pending-withdraws") ?"active-dash-link": ""}`}>
                      <Link  className='dashboard-link' to="/admin/pending-withdraws" onClick={OnbodyClick}>
                        <div className="d-flex">
                          <p>Pending</p> 
                          <p className='ps-3'>({pendingWithdrawCount})</p>
                        </div>
                      </Link>  
                     
                    </li>

                    <li className={`dashboard-sidebar-dropdown-link ps-5 pt-2 ${isActiveDashLink("/admin/all-withdraws") ?"active-dash-link": ""}`}>
                      <Link  className='dashboard-link' to="/admin/all-withdraws" onClick={OnbodyClick}>
                        <div className="d-flex">
                          <p>All Withdraw</p> 
                          <p className='ps-3'>({withdrawCount})</p>
                        </div>
                      </Link>  
                      
                    </li>

                    <li className={`pb-2 dashboard-sidebar-dropdown-link ps-5 pt-2 ${isActiveDashLink("/admin/withdraw/select-user") ?"active-dash-link": ""}`}>
                      <Link className='dashboard-link' to="/admin/withdraw/select-user" onClick={OnbodyClick}>
                        <div className="d-flex">
                          <p>Add New</p>
                        </div>
                      </Link> 
                    </li>
                    
                  </ul>
                </div>


     
              </li>

              <li className={`pb-2 ${isActiveDashLink("/admin") ?"active-dash-link": ""}  cursor-pointer`}>
                <div className='row mb-2 dashboard-sidebar-list' onClick={toggleInvestment}>
                  <div className='col-8 ps-4 '>
                    <div className="d-flex">
                      <i class="bi bi-bar-chart me-3 sm-text"></i>
                      <p className='pt-1'>Investment</p>
                    </div>

                  </div>
                  <div className="col-4 ">
                    <div className="d-flex me-2 justify-content-end mt-1" >
                      <p className='me-1 dahboard-sidebar-count'>{investmentCount}</p>
                      <p className={`${investmentDropdown ? 'rotate-90deg': ''}`}><i class="bi bi-chevron-right xsm-text" ></i></p>
                    </div>
                  </div>
                </div>
                

                <div>
                  <ul className={` dropdown-bg ${investmentDropdown ? "slide-in" : "slide-out"}`}>
                    <li className={`dashboard-sidebar-dropdown-link ps-5 ${isActiveDashLink("/admin/active-investment") ?"active-dash-link": ""}`}>
                      <Link  className='dashboard-link' to="/admin/active-investment" onClick={OnbodyClick}>
                        <div className="d-flex">
                          <p>Active</p> 
                          <p className='ps-3'>({activeInvestmentCount})</p>
                        </div>
                      </Link>  
                    </li>

                    <li className={`dashboard-sidebar-dropdown-link ps-5 pt-2 ${isActiveDashLink("") ?"active-dash-link": ""}`}>
                      <Link  className='dashboard-link' to="/admin/compeleted-investment" onClick={OnbodyClick}>
                        <div className="d-flex">
                          <p>Completed</p> 
                          <p className='ps-3'>({completedInvestmentCount})</p>
                        </div>
                      </Link> 
                    </li>

                    <li className={`dashboard-sidebar-dropdown-link ps-5 pt-2 ${isActiveDashLink("/admin/canceled-investment") ?"active-dash-link": ""}`}>
                      <Link  className='dashboard-link' to="/admin/canceled-investment" onClick={OnbodyClick}>
                        <div className="d-flex">
                          <p>Canceled</p> 
                          <p className='ps-3'>({declinedInvestmentCount})</p>
                        </div>
                      </Link> 
                     
                    </li>

                    <li className={`dashboard-sidebar-dropdown-link ps-5 pt-2 ${isActiveDashLink("/admin/pending-investment") ?"active-dash-link": ""}`}>
                      <Link  className='dashboard-link' to="/admin/pending-investment" onClick={OnbodyClick}>
                        <div className="d-flex">
                          <p>Pending</p> 
                          <p className='ps-3'>({pendingInvestmentCount})</p>
                        </div>
                      </Link> 
                     
                    </li>

                    <li className={`dashboard-sidebar-dropdown-link ps-5 pt-2 ${isActiveDashLink("/admin/all-investment") ?"active-dash-link": ""}`}>
                      <Link  className='dashboard-link' to="/admin/all-investment" onClick={OnbodyClick}>
                        <div className="d-flex">
                          <p>All Investment</p> 
                          <p className='ps-3'>({investmentCount})</p>
                        </div>
                      </Link> 
                    </li>


                    <li className={`pb-2 dashboard-sidebar-dropdown-link ps-5 pt-2 ${isActiveDashLink("/admin/add-investment") ?"active-dash-link": ""}`}>
                      <Link className='dashboard-link' to="/admin/add-investment" onClick={OnbodyClick}>
                        <div className="d-flex">
                          <p>Add New</p>
                        </div>
                      </Link> 
                    </li>
                    
                  </ul>
                </div>


     
              </li>


              <li className={`pb-2 ${isActiveDashLink("/admin") ?"active-dash-link": ""}  cursor-pointer`}>
                <div className='row mb-2 dashboard-sidebar-list' onClick={togglePaymentDetails}>
                  <div className='col-9 ps-4 '>
                    <div className="d-flex">
                      <i class="bi  bi-wallet2 me-3 sm-text"></i>
                      <p className='pt-1'>Payment Details</p>
                    </div>

                  </div>
                  <div className="col-3 ">
                    <div className="d-flex me-2 justify-content-end mt-1" >
                      <p className='me-1 dahboard-sidebar-count'>4</p>
                      <p className={`${paymentDetailsDropdown ? 'rotate-90deg': ''}`}><i class="bi bi-chevron-right xsm-text" ></i></p>
                    </div>
                  </div>
                </div>
                

                <div>
                  <ul className={` dropdown-bg ${paymentDetailsDropdown ? "slide-in" : "slide-out"}`}>
                    <li className={`dashboard-sidebar-dropdown-link ps-5 ${isActiveDashLink("/admin/payment-account/wallet-address") ?"active-dash-link": ""}`}>
                      <Link  className='dashboard-link' to="/admin/payment-account/wallet-address" onClick={OnbodyClick}>
                        <div className="d-flex">
                          <p>Crypto Wallet</p> 
                          <p className='ps-3'>({walletAddressCount})</p>
                        </div>
                      </Link> 
                    </li>

                    <li className={`dashboard-sidebar-dropdown-link ps-5 pt-2 ${isActiveDashLink("/admin/payment-account/bank-account") ?"active-dash-link": ""}`}>
                      <Link  className='dashboard-link' to="/admin/payment-account/bank-account" onClick={OnbodyClick}>
                        <div className="d-flex">
                          <p>Bank Account</p> 
                          <p className='ps-3'>({bankAccountCount})</p>
                        </div>
                      </Link> 
                    </li>

                    <li className={`dashboard-sidebar-dropdown-link ps-5 pt-2 ${isActiveDashLink("/admin/payment-account/bank-card/") ?"active-dash-link": ""}`}>
                      <Link  className='dashboard-link' to="/admin/payment-account/bank-card/" onClick={OnbodyClick}>
                        <div className="d-flex">
                          <p>Bank Card</p> 
                          <p className='ps-3'>({bankCardCount})</p>
                        </div>
                      </Link> 
                     
                    </li>

                    <li className={`dashboard-sidebar-dropdown-link ps-5 pt-2 ${isActiveDashLink("/admin/individual-payment-method/select-user/") ?"active-dash-link": ""}`}>
                      <Link  className='dashboard-link' to="/admin/individual-payment-method/select-user/" onClick={OnbodyClick}>
                        <div className="d-flex">
                          <p>Individual Details</p> 
                        </div>
                      </Link> 
                     
                    </li>

                    <li className={`pb-2 dashboard-sidebar-dropdown-link ps-5 pt-2 ${isActiveDashLink("/admin/add-investment") ?"active-dash-link": ""}`}>
                      <Link  className='dashboard-link' to="/admin/add-investment" onClick={OnbodyClick}>
                        <div className="d-flex">
                          <p>Add New</p> 
                        </div>
                      </Link> 
                    </li>
                    
                  </ul>
                </div>


     
              </li>
              <li className='pb-3'>
                <Link to='/admin/all-interest' className='dashboard-link' onClick={OnbodyClick}>
                  <div className="d-flex ps-3">
                    <i class="bi bi-coin sm-text me-3"></i>
                    <p className='pt-1'>Interest log</p>
                  </div>
                </Link>
              </li>

              <li className='pb-3'>
                <Link to='/admin/all-bonus' className='dashboard-link' onClick={OnbodyClick}>
                  <div className="d-flex ps-3">
                    <FontAwesomeIcon className='sm-text pt-1 me-3' icon={faCoins}/>
                    <p className='pt-1'>Bonus log</p>
                  </div>
                </Link>
              </li>

              <li className='pb-2'>
                <Link to='/admin/all-commission' className='dashboard-link ' onClick={OnbodyClick}>
                  <div className="d-flex ps-3">
                    <FontAwesomeIcon className='sm-text pt-1 me-3' icon={faPercent}/>
                    <p className='pt-1'>Comission</p>
                  </div>
                </Link>
              </li>

              <li className={`pb-2 ${isActiveDashLink("/admin") ?"active-dash-link": ""}  cursor-pointer`}>
                <div className='row mb-2 dashboard-sidebar-list' onClick={toggleUser}>
                  <div className='col-8 ps-4 '>
                    <div className="d-flex">
                      <i class="bi bi-people-fill me-3 sm-text"></i>
                      <p className='pt-1'>Users</p>
                    </div>

                  </div>
                  <div className="col-4 ">
                    <div className="d-flex me-2 justify-content-end mt-1" >
                      <p className='me-1 dahboard-sidebar-count'>{usersCount}</p>
                      <p className={`${usersDropdown ? 'rotate-90deg': ''}`}><i class="bi bi-chevron-right xsm-text" ></i></p>
                    </div>
                  </div>
                </div>
                

                <div>
                  <ul className={` dropdown-bg ${usersDropdown ? "slide-in" : "slide-out"}`}>
                    <li className={`dashboard-sidebar-dropdown-link ps-5 ${isActiveDashLink("/admin/user/disable") ?"active-dash-link": ""}`}>
                      <Link  className='dashboard-link' to="/admin/user/disable" onClick={OnbodyClick}>
                        <div className="d-flex">
                          <p>Disable</p> 
                          <p className='ps-3'>({disableUserCount})</p>
                        </div>
                      </Link> 
                    </li>

                    <li className={`dashboard-sidebar-dropdown-link ps-5 pt-2 ${isActiveDashLink("/admin/user-verification") ?"active-dash-link": ""}`}>
                      <div className="d-flex">
                      <Link className='dashboard-link' to="/admin/user-verification" onClick={OnbodyClick}>Users Verifiaction</Link> 
                        <p className='ps-3'>({userVerificationCount})</p>
                      </div>
                    </li>

                    <li className={`dashboard-sidebar-dropdown-link ps-5 pt-2 ${isActiveDashLink("/admin/user-verification/pending") ?"active-dash-link": ""}`}>
                      <Link  className='dashboard-link' to="/admin/user-verification/pending" onClick={OnbodyClick}>
                        <div className="d-flex">
                          <p>Pending</p> 
                          <p className='ps-3'>({pendingUserVerificationCount})</p>
                        </div>
                      </Link> 
                    </li>

                    <li className={`dashboard-sidebar-dropdown-link ps-5 pt-2 ${isActiveDashLink("/admin/user-verification/verified") ?"active-dash-link": ""}`}>
                      <Link  className='dashboard-link' to="/admin/user-verification/verified" onClick={OnbodyClick}>
                        <div className="d-flex">
                          <p>Verified Users</p> 
                          <p className='ps-3'>({verifiedUserCount})</p>
                        </div>
                      </Link>     
                    </li>

                    <li className={`dashboard-sidebar-dropdown-link ps-5 pt-2 ${isActiveDashLink("/admin/user-verification/canceled") ?"active-dash-link": ""}`}>
                      <Link  className='dashboard-link' to="/admin/user-verification/canceled" onClick={OnbodyClick}>
                        <div className="d-flex">
                          <p>Canceled Verification</p> 
                          <p className='ps-3'>({canceledUserVerificationCount})</p>
                        </div>
                      </Link>      
                    </li>

                    <li className={`dashboard-sidebar-dropdown-link ps-5 pt-2 ${isActiveDashLink("/admin/user-verification/unverified") ?"active-dash-link": ""}`}>
                      <Link  className='dashboard-link' to="/admin/user-verification/unverified" onClick={OnbodyClick}>
                        <div className="d-flex">
                          <p>Unverified Users</p> 
                          <p className='ps-3'>({unverifiedUserCount})</p>
                        </div>
                      </Link>
                     
                    </li>
                    <li className={`pb-2 dashboard-sidebar-dropdown-link ps-5 pt-2 ${isActiveDashLink("/admin/user-verification/add") ?"active-dash-link": ""}`}>
                      <Link  className='dashboard-link' to="/admin/user-verification/add" onClick={OnbodyClick}>
                        <div className="d-flex">
                          <p>Upload Verification</p> 
                        </div>
                      </Link>
                    </li>

                    <li className={`dashboard-sidebar-dropdown-link ps-5 pt-2 ${isActiveDashLink("/admin/user/list") ?"active-dash-link": ""}`}>
                      <Link  className='dashboard-link' to="/admin/user/list" onClick={OnbodyClick}>
                        <div className="d-flex">
                          <p>Users List</p> 
                        </div>
                      </Link>
                    </li>

                    <li className={`pb-2 dashboard-sidebar-dropdown-link ps-5 pt-2 ${isActiveDashLink("/admin/user/add") ?"active-dash-link": ""}`}>
                      <Link  className='dashboard-link' to="/admin/user/add" onClick={OnbodyClick}>
                        <div className="d-flex">
                          <p>Add New</p> 
                        </div>
                      </Link>
                    </li>
                    
                  </ul>
                </div>


     
              </li>

              <li className={`pb-2 ${isActiveDashLink("/admin") ?"active-dash-link": ""}  cursor-pointer`}>
                <div className='row mb-2 dashboard-sidebar-list' onClick={toggleKyc}>
                  <div className='col-8 ps-4 '>
                    <div className="d-flex">
                      <FontAwesomeIcon className='me-3 pt-1 sm-text' icon={faShield}/>
                      <p className='pt-1'>KYCs</p>
                    </div>

                  </div>
                  <div className="col-4 ">
                    <div className="d-flex me-2 justify-content-end mt-1" >
                      <p className='me-1 dahboard-sidebar-count'>{KYCsCount}</p>
                      <p className={`${kycDropdown ? 'rotate-90deg': ''}`}><i class="bi bi-chevron-right xsm-text" ></i></p>
                    </div>
                  </div>
                </div>
                

                <div>
                  <ul className={` dropdown-bg ${kycDropdown ? "slide-in" : "slide-out"}`}>
                    <li className={`dashboard-sidebar-dropdown-link ps-5 ${isActiveDashLink("/admin/KYC/not-uploaded") ?"active-dash-link": ""}`}>
                      <Link  className='dashboard-link' to="/admin/KYC/not-uploaded" onClick={OnbodyClick}>
                        <div className="d-flex">
                          <p>Not Uploaded</p> 
                          <p className='ps-3'>({notUploadKYCsCount})</p>
                        </div>
                      </Link>
                    </li>

                    <li className={`dashboard-sidebar-dropdown-link ps-5 pt-2 ${isActiveDashLink("/admin/KYC/verified") ?"active-dash-link": ""}`}>
                      <Link  className='dashboard-link' to="/admin/KYC/verified" onClick={OnbodyClick}>
                        <div className="d-flex">
                          <p>Verified</p> 
                          <p className='ps-3'>({verifiedKYCsCount})</p>
                        </div>
                      </Link>
                    </li>

                    <li className={`dashboard-sidebar-dropdown-link ps-5 pt-2 ${isActiveDashLink("/admin/KYC/rejected") ?"active-dash-link": ""}`}>
                      <Link  className='dashboard-link' to="/admin/KYC/rejected" onClick={OnbodyClick}>
                        <div className="d-flex">
                          <p>Rejected</p> 
                          <p className='ps-3'>({canceledKYCsCount})</p>
                        </div>
                      </Link>
                     
                    </li>

                    <li className={`dashboard-sidebar-dropdown-link ps-5 pt-2 ${isActiveDashLink("/admin/KYC/pending") ?"active-dash-link": ""}`}>
                      <Link  className='dashboard-link' to="/admin/KYC/pending" onClick={OnbodyClick}>
                        <div className="d-flex">
                          <p>Pending</p> 
                          <p className='ps-3'>({pendingKYCsCount})</p>
                        </div>
                      </Link>
                     
                    </li>

                    <li className={`dashboard-sidebar-dropdown-link ps-5 pt-2 ${isActiveDashLink("/admin/KYC/list") ?"active-dash-link": ""}`}>
                      <Link  className='dashboard-link' to="/admin/KYC/list" onClick={OnbodyClick}>
                        <div className="d-flex">
                          <p>KYCs List</p> 
                        </div>
                      </Link>
                    </li>

                    <li className={`pb-2 dashboard-sidebar-dropdown-link ps-5 pt-2 ${isActiveDashLink("/admin/KYC/add") ?"active-dash-link": ""}`}>
                      <Link  className='dashboard-link' to="/admin/KYC/add" onClick={OnbodyClick}>
                        <div className="d-flex">
                          <p>Add New</p> 
                        </div>
                      </Link>
                    </li>
                    
                  </ul>
                </div>


     
              </li>

              <li className='pb-3'>
                <Link to='/admin/funds-account/' className='dashboard-link'>
                  <div className="d-flex ps-3">
                    <FontAwesomeIcon className='sm-text pt-1 me-3' icon={faSackDollar}/>
                    <p className='pt-1'>Funds Account</p>
                  </div>
                </Link>
              </li>

              <li className={`pb-2 ${isActiveDashLink("/admin") ?"active-dash-link": ""}  cursor-pointer`}>
                <div className='row mb-2 dashboard-sidebar-list' onClick={toggleEmail}>
                  <div className='col-8 ps-4 '>
                    <div className="d-flex">
                      <FontAwesomeIcon className='sm-text pt-1 me-3' icon={faEnvelope}/>
                      <p className='pt-1'>Email</p>
                    </div>

                  </div>
                  <div className="col-4 ">
                    <div className="d-flex me-2 justify-content-end mt-1" >
                      <p className='me-1 dahboard-sidebar-count'>{emailCount}</p>
                      <p className={`${emailDropdown ? 'rotate-90deg': ''}`}><i class="bi bi-chevron-right xsm-text" ></i></p>
                    </div>
                  </div>
                </div>
                

                <div>
                  <ul className={` dropdown-bg ${emailDropdown ? "slide-in" : "slide-out"}`}>
                    <li className={`dashboard-sidebar-dropdown-link ps-5 pt-2 ${isActiveDashLink("/admin/send-email/") ?"active-dash-link": ""}`}>
                      <Link  className='dashboard-link' to="/admin/send-email/" onClick={OnbodyClick}>
                        <div className="d-flex">
                          <p>Send Email</p> 
                        </div>
                      </Link>
                    </li>


                    <li className={`dashboard-sidebar-dropdown-link ps-5 pt-2 ${isActiveDashLink("/admin/send-bulk-email/") ?"active-dash-link": ""}`}>
                      <Link  className='dashboard-link' to="/admin/send-bulk-email/" onClick={OnbodyClick}>
                        <div className="d-flex">
                          <p>Bulk Email</p> 
                        </div>
                      </Link>
                    </li>

                    <li className={`dashboard-sidebar-dropdown-link ps-5 pt-2 ${isActiveDashLink("/admin/all-email/") ?"active-dash-link": ""}`}>
                      <Link  className='dashboard-link' to="/admin/all-email/" onClick={OnbodyClick}>
                        <div className="d-flex">
                          <p>Users Email</p> 
                        </div>
                      </Link>
                    </li>

                    <li className={`pb-2 dashboard-sidebar-dropdown-link ps-5 pt-2 ${isActiveDashLink("/admin/email-messages/") ?"active-dash-link": ""}`}>
                      <Link  className='dashboard-link' to="/admin/email-messages/" onClick={OnbodyClick}>
                        <div className="d-flex">
                          <p>All Email</p> 
                          <p className='ps-3'>({emailCount})</p>
                        </div>
                      </Link>                   
                    </li>
                    
                  </ul>
                </div>


     
              </li>

              <li className='pb-3'>
                <Link to='/admin/blackList-ip/' className='dashboard-link' onClick={OnbodyClick}>
                  <div className="d-flex ps-3">
                    <FontAwesomeIcon className='sm-text pt-1 me-3' icon={faBan}/>
                    <p className='pt-1'>Blacklist IP</p>
                  </div>
                </Link>
              </li>

              <li className='pb-3'>
                <Link to='/admin/news-letter/' className='dashboard-link' onClick={OnbodyClick}>
                  <div className="d-flex ps-3">
                    <FontAwesomeIcon className='sm-text pt-1 me-3' icon={faEnvelopesBulk}/>
                    <p className='pt-1'>Newsletter Subscribers</p>
                  </div>
                </Link>
              </li>

              <li className={`pb-2 ${isActiveDashLink("/admin") ?"active-dash-link": ""}  cursor-pointer`}>
                <div className='row mb-2 dashboard-sidebar-list' onClick={toggleInvestmentPlan}>
                  <div className='col-8 ps-4 '>
                    <div className="d-flex">
                      <FontAwesomeIcon className='me-3 pt-1 sm-text' icon={faCube}/>
                      <p className='pt-1'>Investment Plans</p>
                    </div>

                  </div>
                  <div className="col-4 ">
                    <div className="d-flex me-2 justify-content-end mt-1" >
                      <p className='me-1 dahboard-sidebar-count'>{investmentPlanCount}</p>
                      <p className={`${investmentPlanDropdown ? 'rotate-90deg': ''}`}><i class="bi bi-chevron-right xsm-text" ></i></p>
                    </div>
                  </div>
                </div>
                

                <div>
                  <ul className={` dropdown-bg ${investmentPlanDropdown ? "slide-in" : "slide-out"}`}>
                    <li className={`dashboard-sidebar-dropdown-link ps-5 ${isActiveDashLink("/admin/investment-plan/") ?"active-dash-link": ""}`}>
                      <Link  className='dashboard-link' to="/admin/investment-plan/" onClick={OnbodyClick}>
                        <div className="d-flex">
                          <p>All plans</p> 
                          <p className='ps-3'>({investmentPlanCount})</p>
                        </div>
                      </Link>    
                    </li>

                    <li className={`pb-2 dashboard-sidebar-dropdown-link ps-5 pt-2 ${isActiveDashLink("/admin/investment-plan/add") ?"active-dash-link": ""}`}>
                      <Link  className='dashboard-link' to="/admin/investment-plan/add" onClick={OnbodyClick}>
                        <div className="d-flex">
                          <p>Add New</p> 
                        </div>
                      </Link>    
                    </li>
                    
                  </ul>
                </div>


     
              </li>

              <li className={`mb-5 pb-2 ${isActiveDashLink("/admin") ?"active-dash-link": ""}  cursor-pointer`}>
                <div className='row mb-2 dashboard-sidebar-list' onClick={togglePaymentOptions}>
                  <div className='col-8 ps-4 '>
                    <div className="d-flex">
                      <FontAwesomeIcon className='me-3 pt-1 sm-text' icon={faRightLeft}/>
                      <p className='pt-1'>Payment Options</p>
                    </div>

                  </div>
                  <div className="col-4 ">
                    <div className="d-flex me-2 justify-content-end mt-1" >
                      <p className='me-1 dahboard-sidebar-count'>{paymentOptionsCount}</p>
                      <p className={`${paymentOptions ? 'rotate-90deg': ''}`}><i class="bi bi-chevron-right xsm-text" ></i></p>
                    </div>
                  </div>
                </div>
                

                <div>
                  <ul className={` dropdown-bg ${paymentOptions ? "slide-in" : "slide-out"}`}>
                    <li className={`dashboard-sidebar-dropdown-link ps-5 ${isActiveDashLink("/admin/payment-method/") ?"active-dash-link": ""}`}>
                      <Link  className='dashboard-link' to="/admin/payment-method/" onClick={OnbodyClick}>
                        <div className="d-flex">
                          <p>All Payment Options</p> 
                          <p className='ps-3'>({paymentOptionsCount})</p>
                        </div>
                      </Link> 
                    </li>

                    <li className={`pb-2 dashboard-sidebar-dropdown-link ps-5 pt-2 ${isActiveDashLink("/admin/payment-method/add") ?"active-dash-link": ""}`}>
                      <Link  className='dashboard-link' to="/admin/payment-method/add" onClick={OnbodyClick}>
                        <div className="d-flex">
                          <p>Add New</p> 
                        </div>
                      </Link> 
                    </li>
                    
                  </ul>
                </div>


     
              </li>



            </ul>

          </div>

          <div className="dashboard-content">
            <nav className="text-light d-flex align-items-center justify-content-between position-sticky">
              <div className="mx-3"><FontAwesomeIcon icon={faBars} onClick={toggleShowSidebar} className=" dashboard-menu-bar cursor-pointer"/></div>
              <div className="d-flex align-items-center">
                <Link className='light-link dashboard-content-site-link'>
                  <div className='d-flex pe-5 me-5'>
                    <div>
                      <FontAwesomeIcon icon={faLock}/>
                    </div>
                    <p className='mx-2'>Visit website</p>
                    <i class="bi bi-box-arrow-in-up-right"></i>
                  </div>
                </Link>
                <div className="dashboard-content-user-link cursor-pointer">
                  <div className="d-flex dashboard-content-user-link-hover" onClick={toggleNavDropdown}>
                    <img src={userIcon} width='35px' alt="" />
                    <p className='px-2 pt-1'>AmanilightEquity</p>
                    <p className='pt-1'><FontAwesomeIcon className='xsm-text' icon={faAngleDown}/></p>
                  </div>
                  {navDropdown &&
                    <div className="dashboard-content-user-drop-down">
                      <ul className=''>
                        <li className='pb-2'>
                          <Link to='/admin/change-password/step-1/' className='light-link'>
                            <div className="d-flex">
                              <i class="bi bi-gear pe-2"></i>
                              <p className=''>Change password </p>
                            </div>
                          </Link>
                        </li>
                        <li className='pb-2'>
                          <Link to='/admin/user-login-details/' className='light-link'>
                            <div className="d-flex">
                              <i class="bi bi-person-fill pe-2"></i>
                              <p className=''>User details</p>
                            </div>
                          </Link>
                        </li>
                        <li className='pb-2'>
                          <button className='light-link Button' onClick={LogoutUser}>
                            <div className="d-flex">
                              <i class="bi bi-box-arrow-in-up-right pe-2"></i>
                              <p className=''>Logout</p>
                            </div>
                          </button>
                        </li>
                      </ul>
                    </div>
                  }
                </div>
              </div>
            </nav>

          </div>
        </div>
      </div>

    </div>

  )

}