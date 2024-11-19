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

  } = useContext(AuthContext)

  const [navDropdown, setNavDropdown] = useState(false)


  const [depositDropdown, setDepositDropdown] = useState(false)
  const [withdrawDropdown, setWithdrawDropdown] = useState(false)
  const [investmentDropdown, setInvestmentDropdown] = useState(false)
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


  useEffect(()=>{
    setDepositCount(localStorage.getItem('depositCount'))
    setSucessDepositCount(localStorage.getItem('successDespositCount'))
    setDeclinedDepositCount(localStorage.getItem('declinedDeposit'))
    setPendingDespositCount(localStorage.getItem('pendingDespositCount'))

    setWithdrawCount(localStorage.getItem('withdrawCount'))
    setSuccessWithdrawCount(localStorage.getItem('SuccessWithdrawCount'))
    setPendingWithdrawCount(localStorage.getItem('pendingWithdrawCount'))
    setDeclinedWithdrawCount(localStorage.getItem('declinedWithdrawCount'))
    
    setInvestmentCount(localStorage.getItem('investmentCount'))
    setActiveInvestmentCount(localStorage.getItem('activeInvestmentCount'))
    setCompletednvestmentCount(localStorage.getItem('completedInvestmentCount'))
    setPendingInvestmentCount(localStorage.getItem('pendingInvestmentCount'))
    setDeclinedInvestmentCount(localStorage.getItem('declinedInvestmentCount'))
    
    
    setUserCount(localStorage.getItem('usersCount'))
    setDisableUserCount(localStorage.getItem('disableUserCount'))
    setUserVerificationCount(localStorage.getItem('userVerificationCount'))
    setPendingUserVerificationCount(localStorage.getItem('pendingUserVerificationCount'))
    setCanceledUserVerificationCount(localStorage.getItem('canceledUserVerificationCount'))
    setUnverfiedUserCount(localStorage.getItem('unverifiedUserCount'))
    setVerifiedUserCount(localStorage.getItem('verifiedUserCount'))
    
    setKYCsCount(localStorage.getItem('KYCsCount'))
    setNotUploadKYCsCount(localStorage.getItem('notUploadKYCsCount'))
    setVerifiedKYCsCount(localStorage.getItem('verifiedKYCsCount'))
    setCanceledKYCsCount(localStorage.getItem('canceledKYCsCount'))
    setPendingKYCsCount(localStorage.getItem('pendingKYCsCount'))
    
    setEmailCount(localStorage.getItem('emailCount'))
    setInvestmentPlanCount(localStorage.getItem('investmentPlanCount'))
    setPaymentOptionsCount(localStorage.getItem('paymentOptionsCount'))

  }, [])

  







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
    console.log('clicked')
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
                      <div className="d-flex">
                        <Link className='dashboard-link' to="/admin/successful-deposits" onClick={OnbodyClick}>Confirmed</Link> 
                        <p className='ps-3'>({successDespositCount})</p>
                      </div>
                    </li>

                    <li className={`dashboard-sidebar-dropdown-link ps-5 pt-2 ${isActiveDashLink("/admin/addStudent") ?"active-dash-link": ""}`}>
                      <div className="d-flex">
                      <Link className='dashboard-link' to="/admin/declined-deposits" onClick={OnbodyClick}>Declined</Link> 
                        <p className='ps-3'>({declinedDepositCount})</p>
                      </div>
                    </li>

                    <li className={`dashboard-sidebar-dropdown-link ps-5 pt-2 ${isActiveDashLink("/admin/addStudent") ?"active-dash-link": ""}`}>
                      <div className="d-flex">
                        <Link className='dashboard-link' to="/admin/pending-deposits" onClick={OnbodyClick}>Pending</Link> 
                        <p className='ps-3'>({pendingDespositCount})</p>
                      </div>
                     
                    </li>

                    <li className={`dashboard-sidebar-dropdown-link ps-5 pt-2 ${isActiveDashLink("/admin/addStudent") ?"active-dash-link": ""}`}>
                      <div className="d-flex">
                      <Link className='dashboard-link' to="/admin/all-deposits" onClick={OnbodyClick}>All Deposit</Link> 
                        <p className='ps-3'>({depositCount})</p>
                      </div>
                    </li>

                    <li className={`pb-2 dashboard-sidebar-dropdown-link ps-5 pt-2 ${isActiveDashLink("/admin/addStudent") ?"active-dash-link": ""}`}>
                      <Link className='dashboard-link' to="/admin/add-deposits" onClick={OnbodyClick}>Add New</Link> 
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
                    <li className={`dashboard-sidebar-dropdown-link ps-5 ${isActiveDashLink("/admin/addStudent") ?"active-dash-link": ""}`}>
                      <div className="d-flex">
                        <Link className='dashboard-link' to="/admin/successful-withdraws" onClick={OnbodyClick}>Confirmed</Link> 
                        <p className='ps-3'>({SuccessWithdrawCount})</p>
                      </div>
                    </li>

                    <li className={`dashboard-sidebar-dropdown-link ps-5 pt-2 ${isActiveDashLink("/admin/addStudent") ?"active-dash-link": ""}`}>
                      <div className="d-flex">
                      <Link className='dashboard-link' to="/admin/declined-withdraws" onClick={OnbodyClick}>Declined</Link> 
                        <p className='ps-3'>({declinedWithdrawCount})</p>
                      </div>
                    </li>

                    <li className={`dashboard-sidebar-dropdown-link ps-5 pt-2 ${isActiveDashLink("/admin/addStudent") ?"active-dash-link": ""}`}>
                      <div className="d-flex">
                        <Link className='dashboard-link' to="/admin/pending-withdraws" onClick={OnbodyClick}>Pending</Link> 
                        <p className='ps-3'>({pendingWithdrawCount})</p>
                      </div>
                     
                    </li>

                    <li className={`dashboard-sidebar-dropdown-link ps-5 pt-2 ${isActiveDashLink("/admin/addStudent") ?"active-dash-link": ""}`}>
                      <div className="d-flex">
                      <Link className='dashboard-link' to="/admin/all-withdraws" onClick={OnbodyClick}>All Withdraw</Link> 
                        <p className='ps-3'>({withdrawCount})</p>
                      </div>
                    </li>

                    <li className={`pb-2 dashboard-sidebar-dropdown-link ps-5 pt-2 ${isActiveDashLink("/admin/addStudent") ?"active-dash-link": ""}`}>
                      <Link className='dashboard-link' to="/admin/add-withdraw" onClick={OnbodyClick}>Add New</Link> 
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
                      <div className="d-flex">
                        <Link className='dashboard-link' to="/admin/active-investment" onClick={OnbodyClick}>Active</Link> 
                        <p className='ps-3'>({activeInvestmentCount})</p>
                      </div>
                    </li>

                    <li className={`dashboard-sidebar-dropdown-link ps-5 pt-2 ${isActiveDashLink("/admin/compeleted-investment") ?"active-dash-link": ""}`}>
                      <div className="d-flex">
                      <Link className='dashboard-link' to="/admin/compeleted-investment" onClick={OnbodyClick}>Completed</Link> 
                        <p className='ps-3'>({completedInvestmentCount})</p>
                      </div>
                    </li>

                    <li className={`dashboard-sidebar-dropdown-link ps-5 pt-2 ${isActiveDashLink("/admin/canceled-investment") ?"active-dash-link": ""}`}>
                      <div className="d-flex">
                        <Link className='dashboard-link' to="/admin/canceled-investment" onClick={OnbodyClick}>Canceled</Link> 
                        <p className='ps-3'>({declinedInvestmentCount})</p>
                      </div>
                     
                    </li>

                    <li className={`dashboard-sidebar-dropdown-link ps-5 pt-2 ${isActiveDashLink("/admin/pending-investment") ?"active-dash-link": ""}`}>
                      <div className="d-flex">
                        <Link className='dashboard-link' to="/admin/pending-investment" onClick={OnbodyClick}>Pending</Link> 
                        <p className='ps-3'>({pendingInvestmentCount})</p>
                      </div>
                     
                    </li>

                    <li className={`dashboard-sidebar-dropdown-link ps-5 pt-2 ${isActiveDashLink("/admin/all-investment") ?"active-dash-link": ""}`}>
                      <div className="d-flex">
                      <Link className='dashboard-link' to="/admin/all-investment">All Investment</Link> 
                        <p className='ps-3'>({investmentCount})</p>
                      </div>
                    </li>

                    <li className={`pb-2 dashboard-sidebar-dropdown-link ps-5 pt-2 ${isActiveDashLink("/admin/add-investment") ?"active-dash-link": ""}`}>
                      <Link className='dashboard-link' to="/admin/add-investment" onClick={OnbodyClick}>Add New</Link> 
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
                <Link className='dashboard-link' onClick={OnbodyClick}>
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
                    <li className={`dashboard-sidebar-dropdown-link ps-5 ${isActiveDashLink("/admin/addStudent") ?"active-dash-link": ""}`}>
                      <div className="d-flex">
                        <Link className='dashboard-link' to="/admin/addStudent" onClick={OnbodyClick}>Disable</Link> 
                        <p className='ps-3'>({disableUserCount})</p>
                      </div>
                    </li>

                    <li className={`dashboard-sidebar-dropdown-link ps-5 pt-2 ${isActiveDashLink("/admin/addStudent") ?"active-dash-link": ""}`}>
                      <div className="d-flex">
                      <Link className='dashboard-link' to="/admin/addStudent" onClick={OnbodyClick}>Users Verifiaction</Link> 
                        <p className='ps-3'>({userVerificationCount})</p>
                      </div>
                    </li>

                    <li className={`dashboard-sidebar-dropdown-link ps-5 pt-2 ${isActiveDashLink("/admin/addStudent") ?"active-dash-link": ""}`}>
                      <div className="d-flex">
                      <Link className='dashboard-link' to="/admin/addStudent" onClick={OnbodyClick}>Pending</Link> 
                        <p className='ps-3'>({pendingUserVerificationCount})</p>
                      </div>
                    </li>

                    <li className={`dashboard-sidebar-dropdown-link ps-5 pt-2 ${isActiveDashLink("/admin/addStudent") ?"active-dash-link": ""}`}>
                      <div className="d-flex">
                        <Link className='dashboard-link' to="/admin/addStudent" onClick={OnbodyClick}>Verified Users</Link> 
                        <p className='ps-3'>({verifiedUserCount})</p>
                      </div>       
                    </li>

                    <li className={`dashboard-sidebar-dropdown-link ps-5 pt-2 ${isActiveDashLink("/admin/addStudent") ?"active-dash-link": ""}`}>
                      <div className="d-flex">
                        <Link className='dashboard-link' to="/admin/addStudent" onClick={OnbodyClick}>Canceled Verification</Link> 
                        <p className='ps-3'>({canceledUserVerificationCount})</p>
                      </div>       
                    </li>

                    <li className={`dashboard-sidebar-dropdown-link ps-5 pt-2 ${isActiveDashLink("/admin/addStudent") ?"active-dash-link": ""}`}>
                      <div className="d-flex">
                        <Link className='dashboard-link' to="/admin/addStudent" onClick={OnbodyClick}>Unverified</Link> 
                        <p className='ps-3'>({unverifiedUserCount})</p>
                      </div>
                     
                    </li>

                    <li className={`dashboard-sidebar-dropdown-link ps-5 pt-2 ${isActiveDashLink("/admin/addStudent") ?"active-dash-link": ""}`}>
                      <Link className='dashboard-link' to="/admin/addStudent" onClick={OnbodyClick}>Users List</Link> 
                    </li>

                    <li className={`pb-2 dashboard-sidebar-dropdown-link ps-5 pt-2 ${isActiveDashLink("/admin/addStudent") ?"active-dash-link": ""}`}>
                      <Link className='dashboard-link' to="/admin/addStudent" onClick={OnbodyClick}>Add New</Link> 
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
                    <li className={`dashboard-sidebar-dropdown-link ps-5 ${isActiveDashLink("/admin/addStudent") ?"active-dash-link": ""}`}>
                      <div className="d-flex">
                        <Link className='dashboard-link' to="/admin/addStudent" onClick={OnbodyClick}>Not Uploaded</Link> 
                        <p className='ps-3'>({notUploadKYCsCount})</p>
                      </div>
                    </li>

                    <li className={`dashboard-sidebar-dropdown-link ps-5 pt-2 ${isActiveDashLink("/admin/addStudent") ?"active-dash-link": ""}`}>
                      <div className="d-flex">
                      <Link className='dashboard-link' to="/admin/addStudent" onClick={OnbodyClick}>Verified</Link> 
                        <p className='ps-3'>({verifiedKYCsCount})</p>
                      </div>
                    </li>

                    <li className={`dashboard-sidebar-dropdown-link ps-5 pt-2 ${isActiveDashLink("/admin/addStudent") ?"active-dash-link": ""}`}>
                      <div className="d-flex">
                        <Link className='dashboard-link' to="/admin/addStudent" onClick={OnbodyClick}>Rejected</Link> 
                        <p className='ps-3'>({canceledKYCsCount})</p>
                      </div>
                     
                    </li>

                    <li className={`dashboard-sidebar-dropdown-link ps-5 pt-2 ${isActiveDashLink("/admin/addStudent") ?"active-dash-link": ""}`}>
                      <div className="d-flex">
                        <Link className='dashboard-link' to="/admin/addStudent" onClick={OnbodyClick}>Pending</Link> 
                        <p className='ps-3'>({pendingKYCsCount})</p>
                      </div>
                     
                    </li>

                    <li className={`dashboard-sidebar-dropdown-link ps-5 pt-2 ${isActiveDashLink("/admin/addStudent") ?"active-dash-link": ""}`}>
                      <Link className='dashboard-link' to="/admin/addStudent" onClick={OnbodyClick}>KYCs List</Link> 
                    </li>

                    <li className={`pb-2 dashboard-sidebar-dropdown-link ps-5 pt-2 ${isActiveDashLink("/admin/addStudent") ?"active-dash-link": ""}`}>
                      <Link className='dashboard-link' to="/admin/addStudent" onClick={OnbodyClick}>Add New</Link> 
                    </li>
                    
                  </ul>
                </div>


     
              </li>

              <li className='pb-3'>
                <Link className='dashboard-link'>
                  <div className="d-flex ps-3">
                    <FontAwesomeIcon className='sm-text pt-1 me-3' icon={faSackDollar}/>
                    <p className='pt-1'>Fund Account</p>
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

                    <li className={`dashboard-sidebar-dropdown-link ps-5 pt-2 ${isActiveDashLink("/admin/addStudent") ?"active-dash-link": ""}`}>
                      <Link className='dashboard-link' to="/admin/addStudent" onClick={OnbodyClick}>Send Email</Link> 
                    </li>

                    <li className={`dashboard-sidebar-dropdown-link ps-5 pt-2 ${isActiveDashLink("/admin/addStudent") ?"active-dash-link": ""}`}>
                      <Link className='dashboard-link' to="/admin/addStudent" onClick={OnbodyClick}>Bulk Email</Link> 
                    </li>

                    <li className={`pb-2 dashboard-sidebar-dropdown-link ps-5 pt-2 ${isActiveDashLink("/admin/addStudent") ?"active-dash-link": ""}`}>
                      <div className="d-flex">
                        <Link className='dashboard-link' to="/admin/addStudent" onClick={OnbodyClick}>All Email</Link> 
                        <p className='ps-3'>({emailCount})</p>
                      </div>
                     
                    </li>
                    
                  </ul>
                </div>


     
              </li>

              <li className='pb-3'>
                <Link className='dashboard-link' onClick={OnbodyClick}>
                  <div className="d-flex ps-3">
                    <FontAwesomeIcon className='sm-text pt-1 me-3' icon={faBan}/>
                    <p className='pt-1'>Blacklist IP</p>
                  </div>
                </Link>
              </li>

              <li className='pb-3'>
                <Link className='dashboard-link' onClick={OnbodyClick}>
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
                    <li className={`dashboard-sidebar-dropdown-link ps-5 ${isActiveDashLink("/admin/addStudent") ?"active-dash-link": ""}`}>
                      <div className="d-flex">
                        <Link className='dashboard-link' to="/admin/addStudent" onClick={OnbodyClick}>All plans</Link> 
                        <p className='ps-3'>({investmentPlanCount})</p>
                      </div>
                    </li>

                    <li className={`pb-2 dashboard-sidebar-dropdown-link ps-5 pt-2 ${isActiveDashLink("/admin/addStudent") ?"active-dash-link": ""}`}>
                      <Link className='dashboard-link' to="/admin/addStudent" onClick={OnbodyClick}>Add New</Link> 
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
                    <li className={`dashboard-sidebar-dropdown-link ps-5 ${isActiveDashLink("/admin/addStudent") ?"active-dash-link": ""}`}>
                      <div className="d-flex">
                        <Link className='dashboard-link' to="/admin/addStudent" onClick={OnbodyClick}>All Payment Options</Link> 
                        <p className='ps-3'>({paymentOptionsCount})</p>
                      </div>
                    </li>

                    <li className={`pb-2 dashboard-sidebar-dropdown-link ps-5 pt-2 ${isActiveDashLink("/admin/addStudent") ?"active-dash-link": ""}`}>
                      <Link className='dashboard-link' to="/admin/addStudent" onClick={OnbodyClick}>Add New</Link> 
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
                  <div className="d-flex " onClick={toggleNavDropdown}>
                    <img src={userIcon} width='35px' alt="" />
                    <p className='px-2 pt-1'>AmanilightEquity</p>
                    <p className='pt-1'><FontAwesomeIcon className='xsm-text' icon={faAngleDown}/></p>
                  </div>
                  {navDropdown &&
                    <div className="dashboard-content-user-drop-down">
                      <ul className=''>
                        <li className='pb-2'>
                          <Link className='light-link'>
                            <div className="d-flex">
                              <i class="bi bi-gear pe-2"></i>
                              <p className=''>Change password </p>
                            </div>
                          </Link>
                        </li>
                        <li className='pb-2'>
                          <Link className='light-link'>
                            <div className="d-flex">
                              <i class="bi bi-person-fill pe-2"></i>
                              <p className=''>User details</p>
                            </div>
                          </Link>
                        </li>
                        <li className='pb-2'>
                          <Link className='light-link'>
                            <div className="d-flex">
                              <i class="bi bi-box-arrow-in-up-right pe-2"></i>
                              <p className=''>Logout</p>
                            </div>
                          </Link>
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