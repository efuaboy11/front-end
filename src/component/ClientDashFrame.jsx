import { faAngleDown, faArrowLeft, faBan, faBars, faCoins, faCube, faEnvelope, faEnvelopesBulk, faHandHoldingDollar, faL, faLock, faMoneyBillTransfer, faPercent, faRightLeft, faSackDollar, faShield } from '@fortawesome/free-solid-svg-icons'
import '../css/componentCss/dashboardFrame.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext, useEffect, useState } from 'react'
import AuthContext from '../context/AuthContext'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import userIcon from '../img/user-icon.png'





export const ClientDashFrame = () =>{
  const { authTokens, 
    showSidebar, 
    toggleCloseSidebar,
    toggleShowSidebar,
    OnbodyClick,
    LogoutUser,
    shortName,
    formatName,
    userProfile,
    formatCurrency

  } = useContext(AuthContext)
  console.log(userProfile)

  const [navDropdown, setNavDropdown] = useState(false)


  const [tradeDropdown, setTradeDropdown] = useState(false)
  const [FinanceDropdown, setFinanceDropdown] = useState(false)
  const [historyDropdown, setHistoryDropdown] = useState(false)
  const [paymentGatewayDropdown, setPaymentGatewayDropdown] = useState(false)
  const [verificationDropdown, setVerificationDopdown] = useState(false)
  const [paymentOptions, setPaymentOptions] = useState(false)
  const [supportDropdown, setSupportDropdown] = useState(false)

  const [depositTotal, setDepositTotal] = useState(0);
  const [interestTotal, setInterestTotal] = useState(0);

  useEffect(() => {
    setDepositTotal(sessionStorage.getItem('depositTotal') || "0");
    setInterestTotal(sessionStorage.getItem('InterestTotal') || "0");
}, []);

  







  const location = useLocation();
  const isActiveDashLink = (path) =>{
    return location.pathname === path

  }


  const toggleTrade = () =>{
    setTradeDropdown(!tradeDropdown)
  }

  const toggleFinance = () =>{
    setFinanceDropdown(!FinanceDropdown)
  }

  const togglePaymentGateway = () =>{
    setPaymentGatewayDropdown(!paymentGatewayDropdown)
  }

  const toggleHistory = () =>{
    setHistoryDropdown(!historyDropdown)
  }

  const toggleVerification = () =>{
    setVerificationDopdown(!verificationDropdown)
  }

  const toggleSupport = () =>{
    setSupportDropdown(!supportDropdown)
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
      {userProfile && 
        <div className="dashboard-bg">
          <div>
            <div className={`dashboard-sidebar ${showSidebar ? 'show-sidebar': 'close-sidebar'}`}>
              <div className="dashboard-sidebar-head pt-3 mx-4 "><h4>DASHBOARD </h4><FontAwesomeIcon icon={faArrowLeft} onClick={toggleCloseSidebar} className="close-sidebar-btn pt-1 sm-text cursor-pointer"/></div>
              <hr />
              <div className="ps-3 pt-3">
                      <div className="d-flex">
                        <div>
                          {userProfile.user_details.profile_photo === null ? (
                            <div className="position-relative1">
                              <h6 className="admin-home-user-table-icon">{shortName(userProfile.user_details.full_name)}</h6>
                              <p className={`admin-home-user-table-icon-status ${userProfile.user_details.status === "verified" ? "sucessfull-bg" : "pending"}`}></p>
                            </div>
                            ): (
                              <div className="position-relative1">
                                <img className='admin-home-user-table-img' src={userProfile.user_details.profile_photo} alt="" />
                                <p className={`admin-home-user-table-icon-status ${userProfile.user_details.status === "verified" ? "sucessfull-bg" : "pending"}`}></p>
                              </div>


                            )
                          } 
                        </div>

                        <div>
                          <p>{formatName(userProfile.user_details.full_name)}</p>
                          <p className="sm-text-2">{userProfile.user_details.email}</p>
                        </div>
                      </div> 

                <div className="mt-3">
                  <div className=' dashboard-deposit-interest '>
                    <p>DEPOSIT WALLET</p>
                    <p className="sm-text">{formatCurrency(depositTotal)} USD</p>
                  </div>

                  <div className=' dashboard-deposit-interest'>
                    <p>INTEREST WALLET</p>
                    <p className="sm-text">{formatCurrency(interestTotal)} USD</p>
                  </div>
                </div> 

              </div>

              <ul className="scroll-bar-y client-dashboard-sidebar-height">
                <li className='mt-3 py-3'>
                  <Link to='/dashboard/home/' className='dashboard-link' onClick={OnbodyClick}>
                    <div className="d-flex ps-3">
                      <i class="bi bi-speedometer2 sm-text me-3"></i>
                      <p className='pt-1'>Dashboard</p>
                    </div>
                  </Link>
                </li>
                <li className={`pb-2 ${isActiveDashLink("/admin") ?"active-dash-link": ""}  cursor-pointer`}>
                  <div className='row mb-2 dashboard-sidebar-list' onClick={toggleTrade}>
                    <div className='col-8 ps-4 y'>
                      <div className="d-flex">
                        <FontAwesomeIcon className='me-3  sm-text' icon={faHandHoldingDollar}/>
                        <p className='pt-1'>Trade</p>
                      </div>

                    </div>
                    <div className="col-4 ">
                      <div className="d-flex me-2 justify-content-end mt-1" >
                        <p className={`${tradeDropdown ? 'rotate-90deg': ''}`}><i class="bi bi-chevron-right xsm-text" ></i></p>
                      </div>
                    </div>
                  </div>
                  

                  <div>
                    <ul className={` dropdown-bg ${tradeDropdown ? "slide-in" : "slide-out"}`}>
                      <li className={`dashboard-sidebar-dropdown-link ${isActiveDashLink("/admin/KYC/verified") ?"active-dash-link": ""}`}>
                        <Link className='dashboard-link' to="/admin/KYC/verified" onClick={OnbodyClick}>
                          <div className="d-flex ps-5 py-2">
                            <p>Buy Plan</p> 
                          </div>
                        </Link>
                      </li>


                      <li className={`dashboard-sidebar-dropdown-link ${isActiveDashLink("/admin/KYC/verified") ?"active-dash-link": ""}`}>
                        <Link className='dashboard-link' to="/admin/KYC/verified" onClick={OnbodyClick}>
                          <div className="d-flex ps-5 pb-2">
                            <p>My Investment</p> 
                          </div>
                        </Link>
                      </li>


                      <li className={`dashboard-sidebar-dropdown-link ${isActiveDashLink("/admin/KYC/verified") ?"active-dash-link": ""}`}>
                        <Link className='dashboard-link' to="/admin/KYC/verified" onClick={OnbodyClick}>
                          <div className="d-flex ps-5 pb-2">
                            <p>Market Chart</p> 
                          </div>
                        </Link>
                      </li>

                      
                    </ul>
                  </div>


      
                </li>

                <li className={`pb-2 ${isActiveDashLink("/admin") ?"active-dash-link": ""}  cursor-pointer`}>
                  <div className='row mb-2 dashboard-sidebar-list' onClick={toggleFinance}>
                    <div className='col-8 ps-4 '>
                      <div className="d-flex">
                        <FontAwesomeIcon className='me-3 pt-1 sm-text' icon={faMoneyBillTransfer}/>
                        <p className='pt-1'>Finance</p>
                      </div>

                    </div>
                    <div className="col-4 ">
                      <div className="d-flex me-2 justify-content-end mt-1" >
                        <p className={`${FinanceDropdown ? 'rotate-90deg': ''}`}><i class="bi bi-chevron-right xsm-text" ></i></p>
                      </div>
                    </div>
                  </div>
                  

                  <div>
                    <ul className={` dropdown-bg ${FinanceDropdown ? "slide-in" : "slide-out"}`}>
                    <li className={`dashboard-sidebar-dropdown-link ${isActiveDashLink("/dashboard/deposit/step-1/") ?"active-dash-link": ""}`}>
                        <Link className='dashboard-link' to="/dashboard/deposit/step-1/" onClick={OnbodyClick}>
                          <div className="d-flex ps-5 py-2">
                            <p>Deposit Funds</p> 
                          </div>
                        </Link>
                      </li>


                      <li className={`dashboard-sidebar-dropdown-link ${isActiveDashLink("/dashboard/add-withdraw/") ?"active-dash-link": ""}`}>
                        <Link className='dashboard-link' to="/dashboard/add-withdraw/" onClick={OnbodyClick}>
                          <div className="d-flex ps-5 pb-2">
                            <p>Withdraw Spot</p> 
                          </div>
                        </Link>
                      </li>


                      <li className={`dashboard-sidebar-dropdown-link ${isActiveDashLink("/admin/KYC/verified") ?"active-dash-link": ""}`}>
                        <Link className='dashboard-link' to="/admin/KYC/verified" onClick={OnbodyClick}>
                          <div className="d-flex ps-5 pb-2">
                            <p>Add Referral</p> 
                          </div>
                        </Link>
                      </li>

                      
                    </ul>
                  </div>


      
                </li>

                <li className={`pb-2 ${isActiveDashLink("/admin") ?"active-dash-link": ""}  cursor-pointer`}>
                  <div className='row mb-2 dashboard-sidebar-list' onClick={toggleHistory}>
                    <div className='col-8 ps-4 '>
                      <div className="d-flex">
                        <i class="bi bi-bar-chart me-3 sm-text"></i>
                        <p className='pt-1'>History</p>
                      </div>

                    </div>
                    <div className="col-4 ">
                      <div className="d-flex me-2 justify-content-end mt-1" >
                        <p className={`${historyDropdown ? 'rotate-90deg': ''}`}><i class="bi bi-chevron-right xsm-text" ></i></p>
                      </div>
                    </div>
                  </div>
                  

                  <div>
                    <ul className={` dropdown-bg ${historyDropdown ? "slide-in" : "slide-out"}`}>
                      <li className={`dashboard-sidebar-dropdown-link ${isActiveDashLink("/dashboard/deposit/history/") ?"active-dash-link": ""}`}>
                        <Link className='dashboard-link' to="/dashboard/deposit/history/" onClick={OnbodyClick}>
                          <div className="d-flex ps-5 py-2">
                            <p>Deposit History</p> 
                          </div>
                        </Link>
                      </li>


                      <li className={`dashboard-sidebar-dropdown-link ${isActiveDashLink("/dashboard/withdraw/history/") ?"active-dash-link": ""}`}>
                        <Link className='dashboard-link' to="/dashboard/withdraw/history/" onClick={OnbodyClick}>
                          <div className="d-flex ps-5 pb-2">
                            <p>Withdraw History</p> 
                          </div>
                        </Link>
                      </li>


                      <li className={`dashboard-sidebar-dropdown-link ${isActiveDashLink("/admin/KYC/verified") ?"active-dash-link": ""}`}>
                        <Link className='dashboard-link' to="/admin/KYC/verified" onClick={OnbodyClick}>
                          <div className="d-flex ps-5 pb-2">
                            <p>Gift Bonus</p> 
                          </div>
                        </Link>
                      </li>


                      <li className={`dashboard-sidebar-dropdown-link ${isActiveDashLink("/admin/KYC/verified") ?"active-dash-link": ""}`}>
                        <Link className='dashboard-link' to="/admin/KYC/verified" onClick={OnbodyClick}>
                          <div className="d-flex ps-5 pb-2">
                            <p>Interest Log</p> 
                          </div>
                        </Link>
                      </li>


                      <li className={`dashboard-sidebar-dropdown-link ${isActiveDashLink("/admin/KYC/verified") ?"active-dash-link": ""}`}>
                        <Link className='dashboard-link' to="/admin/KYC/verified" onClick={OnbodyClick}>
                          <div className="d-flex ps-5 pb-2">
                            <p>Referal Link</p> 
                          </div>
                        </Link>
                      </li>

                      
                    </ul>
                  </div>


      
                </li>


                <li className={`pb-2 ${isActiveDashLink("/admin") ?"active-dash-link": ""}  cursor-pointer`}>
                  <div className='row mb-2 dashboard-sidebar-list' onClick={togglePaymentOptions}>
                    <div className='col-8 ps-4 '>
                      <div className="d-flex">
                        <FontAwesomeIcon className='me-3 pt-1 sm-text' icon={faRightLeft}/>
                        <p className='pt-1'>Payment Options</p>
                      </div>

                    </div>
                    <div className="col-4 ">
                      <div className="d-flex me-2 justify-content-end mt-1" >
                        <p className={`${paymentOptions ? 'rotate-90deg': ''}`}><i class="bi bi-chevron-right xsm-text" ></i></p>
                      </div>
                    </div>
                  </div>
                  

                  <div>
                    <ul className={` dropdown-bg ${paymentOptions ? "slide-in" : "slide-out"}`}>
                      <li className={`dashboard-sidebar-dropdown-link ps-5 ${isActiveDashLink("/admin/payment-method/") ?"active-dash-link": ""}`}>
                        <div className="d-flex">
                          <Link className='dashboard-link' to="/admin/payment-method/" onClick={OnbodyClick}>All Payment Options</Link> 
                        </div>
                      </li>

                      <li className={`pb-2 dashboard-sidebar-dropdown-link ps-5 pt-2 ${isActiveDashLink("/admin/payment-method/add") ?"active-dash-link": ""}`}>
                        <Link className='dashboard-link' to="/admin/payment-method/add" onClick={OnbodyClick}>Add New</Link> 
                      </li>
                      
                    </ul>
                  </div>


      
                </li>

                <li className={`pb-2 ${isActiveDashLink("/admin") ?"active-dash-link": ""}  cursor-pointer`}>
                  <div className='row mb-2 dashboard-sidebar-list' onClick={togglePaymentGateway}>
                    <div className='col-9 ps-4 '>
                      <div className="d-flex">
                        <i class="bi  bi-wallet2 me-3 sm-text"></i>
                        <p className='pt-1'>Payment GateWay</p>
                      </div>

                    </div>
                    <div className="col-3 ">
                      <div className="d-flex me-2 justify-content-end mt-1" >
                        <p className={`${paymentGatewayDropdown ? 'rotate-90deg': ''}`}><i class="bi bi-chevron-right xsm-text" ></i></p>
                      </div>
                    </div>
                  </div>
                  

                  <div>
                    <ul className={` dropdown-bg ${paymentGatewayDropdown ? "slide-in" : "slide-out"}`}>
                    <li className={`dashboard-sidebar-dropdown-link ${isActiveDashLink("/admin/KYC/verified") ?"active-dash-link": ""}`}>
                        <Link className='dashboard-link' to="/admin/KYC/verified" onClick={OnbodyClick}>
                          <div className="d-flex ps-5 py-2">
                            <p>Crypto Wallet</p> 
                          </div>
                        </Link>
                      </li>


                      <li className={`dashboard-sidebar-dropdown-link ${isActiveDashLink("/admin/KYC/verified") ?"active-dash-link": ""}`}>
                        <Link className='dashboard-link' to="/admin/KYC/verified" onClick={OnbodyClick}>
                          <div className="d-flex ps-5 pb-2">
                            <p>Bank Account </p> 
                          </div>
                        </Link>
                      </li>


                      <li className={`dashboard-sidebar-dropdown-link ${isActiveDashLink("/admin/KYC/verified") ?"active-dash-link": ""}`}>
                        <Link className='dashboard-link' to="/admin/KYC/verified" onClick={OnbodyClick}>
                          <div className="d-flex ps-5 pb-2">
                            <p>Bank Card</p> 
                          </div>
                        </Link>
                      </li>


                      <li className={`pb-2 dashboard-sidebar-dropdown-link ps-5 pt-2 ${isActiveDashLink("/admin/add-investment") ?"active-dash-link": ""}`}>
                        <Link className='dashboard-link' to="/admin/add-investment" onClick={OnbodyClick}>Add New</Link> 
                      </li>
                      
                    </ul>
                  </div>


      
                </li>



                <li className={`pb-2 ${isActiveDashLink("/admin") ?"active-dash-link": ""}  cursor-pointer`}>
                  <div className='row mb-2 dashboard-sidebar-list' onClick={toggleVerification}>
                    <div className='col-10 ps-4 '>
                      <div className="d-flex">
                        <FontAwesomeIcon className='me-3 pt-1 sm-text' icon={faShield}/>
                        <p className='pt-1'>Account Verification</p>
                      </div>

                    </div>
                    <div className="col-2">
                      <div className="d-flex me-2 justify-content-end mt-1" >
                        <p className={`${verificationDropdown ? 'rotate-90deg': ''}`}><i class="bi bi-chevron-right xsm-text" ></i></p>
                      </div>
                    </div>
                  </div>
                  

                  <div>
                    <ul className={` dropdown-bg ${verificationDropdown ? "slide-in" : "slide-out"}`}>
                      <li className={`dashboard-sidebar-dropdown-link ${isActiveDashLink("/dashboard/user-verification/") ?"active-dash-link": ""}`}>
                        <Link className='dashboard-link' to="/dashboard/user-verification/" onClick={OnbodyClick}>
                          <div className="d-flex ps-5 py-2">
                            <p>User verification</p> 
                          </div>
                        </Link>
                      </li>

                      <li className={`dashboard-sidebar-dropdown-link  ${isActiveDashLink("/dashboard/kyc-aml/") ?"active-dash-link": ""}`}>
                        <Link className='dashboard-link' to="/dashboard/kyc-aml/" onClick={OnbodyClick}>
                          <div className="d-flex ps-5 pb-2">
                            <p>KYC verification</p> 
                          </div>
                        </Link>
                      </li>
                      
                    </ul>
                  </div>


      
                </li>

                <li className={`mb-5 pb-2 ${isActiveDashLink("/admin") ?"active-dash-link": ""}  cursor-pointer`}>
                  <div className='row mb-2 dashboard-sidebar-list' onClick={toggleSupport}>
                    <div className='col-8 ps-4 '>
                      <div className="d-flex">
                        <FontAwesomeIcon className='me-3 pt-1 sm-text' icon={faShield}/>
                        <p className='pt-1'>Support</p>
                      </div>

                    </div>
                    <div className="col-4 ">
                      <div className="d-flex me-2 justify-content-end mt-1" >
                        <p className={`${supportDropdown ? 'rotate-90deg': ''}`}><i class="bi bi-chevron-right xsm-text" ></i></p>
                      </div>
                    </div>
                  </div>
                  

                  <div>
                    <ul className={` dropdown-bg ${supportDropdown ? "slide-in" : "slide-out"}`}>
                      <li className={`dashboard-sidebar-dropdown-link ${isActiveDashLink("/admin/KYC/verified") ?"active-dash-link": ""}`}>
                        <Link className='dashboard-link' to="/admin/KYC/verified" onClick={OnbodyClick}>
                          <div className="d-flex ps-5 py-2">
                            <p>FAQs</p> 
                          </div>
                        </Link>
                      </li>

                      <li className={`dashboard-sidebar-dropdown-link  ${isActiveDashLink("/admin/KYC/verified") ?"active-dash-link": ""}`}>
                        <Link className='dashboard-link' to="/admin/KYC/verified" onClick={OnbodyClick}>
                          <div className="d-flex ps-5 pb-2">
                            <p>Help</p> 
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
                  <div className="dashboard-content-user-link ">
                    <div className="d-flex dashboard-content-user-link-hover cursor-pointer" onClick={toggleNavDropdown}>
                      <div className="d-flex">
                        <div>
                          {userProfile.user_details.profile_photo === null ? (
                            <div className="position-relative1">
                              <h6 className="admin-home-user-table-icon">{shortName(userProfile.user_details.full_name)}</h6>
                              <p className={`admin-home-user-table-icon-status ${userProfile.user_details.status === "verified" ? "sucessfull-bg" : "pending"}`}></p>
                            </div>
                            ): (
                              <div className="position-relative1">
                                <img className='admin-home-user-table-img' src={userProfile.user_details.profile_photo} alt="" />
                                <p className={`admin-home-user-table-icon-status ${userProfile.user_details.status === "verified" ? "sucessfull-bg" : "pending"}`}></p>
                              </div>


                            )
                          } 
                        </div>

                        <div className='d-none d-md-block'>
                          <p className="sm-text-2 light-text">ID: {userProfile.user_details.id}</p>
                          <div className="d-flex">
                            <p>{formatName(userProfile.user_details.full_name)}</p>
                            <p className='ps-3'><FontAwesomeIcon className='xsm-text' icon={faAngleDown}/></p>
                          </div>

                        </div>
                      </div> 
                      
                    </div>
                    {navDropdown &&
                      <div className="client-dashboard-content-user-drop-down border1">


                        <div className="d-flex grey-background py-3 px-4">
                          <div>
                            {userProfile.user_details.profile_photo === null ? (
                              <div className="position-relative1">
                                <h6 className="admin-home-user-table-icon">{shortName(userProfile.user_details.full_name)}</h6>
                                <p className={`admin-home-user-table-icon-status ${userProfile.user_details.status === "verified" ? "sucessfull-bg" : "pending"}`}></p>
                              </div>
                              ): (
                                <div className="position-relative1">
                                  <img className='admin-home-user-table-img' src={userProfile.user_details.profile_photo} alt="" />
                                  <p className={`admin-home-user-table-icon-status ${userProfile.user_details.status === "verified" ? "sucessfull-bg" : "pending"}`}></p>
                                </div>


                              )
                            } 
                          </div>

                          <div>
                            <p>{formatName(userProfile.user_details.full_name)}</p>
                            <p className="sm-text-2">{userProfile.user_details.email}</p>
                          </div>
                        </div> 

                        <div className='px-4 py-3 border-bottom1'> 
                          <p className='sm-text-3 light-text'>ACCOUNT BALANCE</p>
                          <p className='sm-text'>{formatCurrency(userProfile.user_balance.balance)} USD</p>
                          <p><span className='light-text'>Interest: </span> {formatCurrency(interestTotal)} USD</p>

                          <div className="pt-2">
                            <Link className='light-link'>Withdraw <i class="ps-2 bi bi-box-arrow-right"></i></Link>
                          </div>
                        </div>
                        

                        <ul className='px-4 py-3 border-bottom1'>
                          <li className='pb-3'>
                            <Link to='/admin/change-password/step-1/' className='light-link'>
                              <div className="d-flex">
                                <i class="bi bi-person pe-2"></i>
                                <p className=''>My Profile </p>
                              </div>
                            </Link>
                          </li>
                          <li className='pb-3'>
                            <Link to='/dashboard/kyc-aml/' className='light-link'>
                              <div className="d-flex">
                                <i class="bi bi-shield-shaded pe-2"></i>
                                <p className=''>KYC Verification</p>
                              </div>
                            </Link>
                          </li>

                          <li className='pb-3'>
                            <Link to='/admin/user-login-details/' className='light-link'>
                              <div className="d-flex">
                                <i class="bi  bi-wallet2 pe-2"></i>
                                <p className=''>Payment Accounts</p>
                              </div>
                            </Link>
                          </li>

                          <li className='pb-3'>
                            <Link to='/admin/change-password/step-1/' className='light-link'>
                              <div className="d-flex">
                                <i class="bi bi-link-45deg pe-2"></i>
                                <p className=''>Referral Link </p>
                              </div>
                            </Link>
                          </li>

                          <li className='pb-3'>
                            <Link to='/admin/change-password/step-1/' className='light-link'>
                              <div className="d-flex">
                                <i class="bi bi-gear pe-2"></i>
                                <p className=''>Change Password </p>
                              </div>
                            </Link>
                          </li>
                        </ul>

                        <button className='py-4 px-4 light-link Button' onClick={LogoutUser}>
                          <div className="d-flex">
                            <i class="bi bi-box-arrow-in-up-right pe-2"></i>
                            <p className=''>Logout</p>
                          </div>
                        </button>
                      </div>
                    }
                  </div>
                </div>
              </nav>

            </div>
          </div>
        </div>
      }

    </div>

  )

}