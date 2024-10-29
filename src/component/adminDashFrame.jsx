import { faAngleDown, faArrowLeft, faBan, faBars, faCoins, faCube, faEnvelope, faEnvelopesBulk, faHandHoldingDollar, faL, faLock, faMoneyBillTransfer, faPercent, faRightLeft, faSackDollar, faShield } from '@fortawesome/free-solid-svg-icons'
import '../css/componentCss/dashboardFrame.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext, useEffect, useState } from 'react'
import AuthContext from '../context/AuthContext'
import { Link, useLocation } from 'react-router-dom'
import userIcon from '../img/user-icon.png'
import existIcon from '../img/box-arrow-in-up-right.svg'




export const AdminDashFrame = () =>{
  const { authTokens } = useContext(AuthContext)
  const {
    showSidebar, 
    toggleCloseSidebar,
    toggleShowSidebar,

  }= useContext(AuthContext)
  const [navDropdown, setNavDropdown] = useState(false)


  const [depositDropdown, setDepositDropdown] = useState(false)
  const [withdrawDropdown, setWithdrawDropdown] = useState(false)
  const [investmentDropdown, setInvestmentDropdown] = useState(false)
  const [usersDropdown, setUserDropdown] = useState(false)
  const [kycDropdown, setKycDopdown] = useState(false)
  const [paymentOptions, setPaymentOptions] = useState(false)
  const [investmentPlanDropdown, setinvestmentPlanDropdown] = useState(false)
  const [emailDropdown, setEmailDropdown] = useState(false)

  const [depositCount, setDepositCount] = useState(0)
  const [successDespositCount, setSuccessDepositCount] = useState(0)
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

  useEffect(() => {
    const Deposit = async() =>{
      let response = await fetch('http://127.0.0.1:8000/api/deposits/', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens.access}`
        },
      })
  
      const data = await response.json()
      if(response.ok){
        if(Array.isArray(data) && data.length > 0){
          setDepositCount(data.length)
        }
  
      }
  
  
  
    }

    const SuccessfulDeposit = async() =>{
      let response = await fetch('http://127.0.0.1:8000/api/deposits/successful/', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens.access}`
        },
      })
  
      const data = await response.json()
      if(response.ok){
        if(Array.isArray(data) && data.length > 0){
          setSuccessDepositCount(data.length)
        }
  
      }
  
    }

    const DeclinedDeposit = async() =>{
      let response = await fetch('http://127.0.0.1:8000/api/deposits/declined/', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens.access}`
        },
      })
  
      const data = await response.json()
      if(response.ok){
        if(Array.isArray(data) && data.length > 0){
          setDeclinedDepositCount(data.length)
        }
  
      }
  
  
  
    }

    const PendingDeposit = async() =>{
      let response = await fetch('http://127.0.0.1:8000/api/deposits/pending/', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens.access}`
        },
      })
  
      const data = await response.json()
      if(response.ok){
        if(Array.isArray(data) && data.length > 0){
          setPendingDespositCount(data.length)
        }
  
      }
  
    }

    const Withdraw = async() =>{
      let response = await fetch('http://127.0.0.1:8000/api/withdraw/', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens.access}`
        },
      })
  
      const data = await response.json()
      if(response.ok){
        if(Array.isArray(data) && data.length > 0){
          setWithdrawCount(data.length)
        }
  
      }
  
  
  
    }

    const SuccessfulWithdraw = async() =>{
      let response = await fetch('http://127.0.0.1:8000/api/withdraw/successful/', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens.access}`
        },
      })
  
      const data = await response.json()
      if(response.ok){
        if(Array.isArray(data) && data.length > 0){
          setSuccessWithdrawCount(data.length)
        }
  
      }
  
  
  
    }

    const PendingWithdraw = async() =>{
      let response = await fetch('http://127.0.0.1:8000/api/withdraw/pending/', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens.access}`
        },
      })
  
      const data = await response.json()
      if(response.ok){
        if(Array.isArray(data) && data.length > 0){
          setPendingWithdrawCount(data.length)
        }
  
      }
  
  
  
    }

    const DeclinedWithdraw = async() =>{
      let response = await fetch('http://127.0.0.1:8000/api/withdraw/declined/', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens.access}`
        },
      })
  
      const data = await response.json()
      if(response.ok){
        if(Array.isArray(data) && data.length > 0){
          setDeclinedWithdrawCount(data.length)
        }
  
      }
  
  
  
    }

    const Investment = async() =>{
      let response = await fetch('http://127.0.0.1:8000/api/user-investment/', {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens.access}`
        },
      })
  
      const data = await response.json()
      if(response.ok){
        if(Array.isArray(data) && data.length > 0){
          setInvestmentCount(data.length)
        }
      }
    }
  
    const ActiveInvestment = async() =>{
      let response = await fetch('http://127.0.0.1:8000/api/user-investment/active/', {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens.access}`
        },
      })
  
      const data = await response.json()
      if(response.ok){
        if(Array.isArray(data) && data.length > 0){
          setActiveInvestmentCount(data.length)
        }
      }
    }
  
    const PendingInvestment = async() =>{
      let response = await fetch('http://127.0.0.1:8000/api/user-investment/pending/', {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens.access}`
        },
      })
  
      const data = await response.json()
      if(response.ok){
        if(Array.isArray(data) && data.length > 0){
          setPendingInvestmentCount(data.length)
        }
      }
    }
  
    const CompletedInvestment = async() =>{
      let response = await fetch('http://127.0.0.1:8000/api/user-investment/completed/', {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens.access}`
        },
      })
  
      const data = await response.json()
      if(response.ok){
        if(Array.isArray(data) && data.length > 0){
          setCompletednvestmentCount(data.length)
        }
      }
    }
  
    const DeclinedInvestment = async() =>{
      let response = await fetch('http://127.0.0.1:8000/api/user-investment/declined/', {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens.access}`
        },
      })
  
      const data = await response.json()
      if(response.ok){
        if(Array.isArray(data) && data.length > 0){
          setDeclinedInvestmentCount(data.length)
        }
      }
    }

    const Users = async() =>{
      let response = await fetch('http://127.0.0.1:8000/api/users/', {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens.access}`
        },
      })
  
      const data = await response.json()
      if(response.ok){
        if(Array.isArray(data) && data.length > 0){
          setUserCount(data.length)
        }
      }
    }

    const DisableUsers = async() =>{
      let response = await fetch('http://127.0.0.1:8000/api/disable-account/', {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens.access}`
        },
      })
  
      const data = await response.json()
      if(response.ok){
        if(Array.isArray(data) && data.length > 0){
          setDisableUserCount(data.length)
        }
      }
    }

    const UserVerification = async() =>{
      let response = await fetch('http://127.0.0.1:8000/api/user/verification/', {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens.access}`
        },
      })
  
      const data = await response.json()
      if(response.ok){
        if(Array.isArray(data) && data.length > 0){
          setUserVerificationCount(data.length)
        }
      }
    }

    const PendingUserVerfication = async() =>{
      let response = await fetch('http://127.0.0.1:8000/api/users/verification/pending/', {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens.access}`
        },
      })
  
      const data = await response.json()
      if(response.ok){
        if(Array.isArray(data) && data.length > 0){
          setPendingUserVerificationCount(data.length)
        }
      }
    }


    const CanceledUserVerification = async() =>{
      let response = await fetch('http://127.0.0.1:8000/api/users/verification/canceled/', {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens.access}`
        },
      })
  
      const data = await response.json()
      if(response.ok){
        if(Array.isArray(data) && data.length > 0){
          setCanceledUserVerificationCount(data.length)
        }
      }
    }

    const UnverifiedUser = async() =>{
      let response = await fetch('http://127.0.0.1:8000/api/users/without-verification/', {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens.access}`
        },
      })
  
      const data = await response.json()
      if(response.ok){
        if(Array.isArray(data) && data.length > 0){
          setUnverfiedUserCount(data.length)
        }
      }
    }

    const verifiedUser = async() =>{
      let response = await fetch('http://127.0.0.1:8000/api/users/verification/verified/', {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens.access}`
        },
      })
  
      const data = await response.json()
      if(response.ok){
        if(Array.isArray(data) && data.length > 0){
          setVerifiedUserCount(data.length)
        }
      }
    }


    if(!depositCount){
      Deposit()
    }

    if(!successDespositCount){
      SuccessfulDeposit()
    }

    if(!pendingDespositCount){
      PendingDeposit()
    }
    if(!declinedDepositCount){
      DeclinedDeposit()
    }

    if(!withdrawCount){
      Withdraw()
    }

    if(!SuccessWithdrawCount){
      SuccessfulWithdraw()
    }

    if(!pendingWithdrawCount){
      PendingWithdraw()
    }

    if(!declinedWithdrawCount){
      DeclinedWithdraw()
    }

    if(!investmentCount){
      Investment()
    }

    if(!activeInvestmentCount){
      ActiveInvestment()
    }

    if(!pendingInvestmentCount){
      PendingInvestment()
    }

    if(!completedInvestmentCount){
      CompletedInvestment()
    }

    if(!declinedInvestmentCount){
      DeclinedInvestment()
    }

    if(!usersCount){
      Users()
    }

    if(!disableUserCount){
      DisableUsers()

    }

    if(!userVerificationCount){
      UserVerification()
    }
    if(!pendingUserVerificationCount){
      PendingUserVerfication()
      
    }
    if(!canceledUserVerificationCount){
      CanceledUserVerification()
      
    }
    if(!unverifiedUserCount){
      UnverifiedUser()
      
    }
    if(!verifiedUserCount){
      verifiedUser()
    }

  }, [depositCount, successDespositCount, declinedDepositCount, pendingDespositCount, 
      withdrawCount, SuccessWithdrawCount, pendingWithdrawCount, declinedWithdrawCount, 
      investmentCount, activeInvestmentCount, pendingInvestmentCount, completedInvestmentCount, declinedInvestmentCount,
      verifiedUserCount, unverifiedUserCount, canceledUserVerificationCount, pendingUserVerificationCount, userVerificationCount, disableUserCount, usersCount ])

  

  return(
    <div>
      <div className="dashboard-bg">
        <div>
          <div className={`dashboard-sidebar ${showSidebar ? 'show-sidebar': 'close-sidebar'}`}>
            <div className="dashboard-sidebar-head pt-3 mx-4 "><h4>ADMIN PANEL</h4><FontAwesomeIcon icon={faArrowLeft} onClick={toggleCloseSidebar} className="close-sidebar-btn pt-1 sm-text cursor-pointer"/></div>
            <hr />
            <ul className="scroll-bar-y dashboard-sidebar-height">
              <li className='mt-3 py-3'>
                <Link className='dashboard-link'>
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
                        <Link className='dashboard-link' to="/admin/addStudent">Confirmed</Link> 
                        <p className='ps-3'>({successDespositCount})</p>
                      </div>
                    </li>

                    <li className={`dashboard-sidebar-dropdown-link ps-5 pt-2 ${isActiveDashLink("/admin/addStudent") ?"active-dash-link": ""}`}>
                      <div className="d-flex">
                      <Link className='dashboard-link' to="/admin/addStudent">Declined</Link> 
                        <p className='ps-3'>({declinedDepositCount})</p>
                      </div>
                    </li>

                    <li className={`dashboard-sidebar-dropdown-link ps-5 pt-2 ${isActiveDashLink("/admin/addStudent") ?"active-dash-link": ""}`}>
                      <div className="d-flex">
                        <Link className='dashboard-link' to="/admin/addStudent">Pending</Link> 
                        <p className='ps-3'>({pendingDespositCount})</p>
                      </div>
                     
                    </li>

                    <li className={`dashboard-sidebar-dropdown-link ps-5 pt-2 ${isActiveDashLink("/admin/addStudent") ?"active-dash-link": ""}`}>
                      <div className="d-flex">
                      <Link className='dashboard-link' to="/admin/addStudent">All Deposit</Link> 
                        <p className='ps-3'>({depositCount})</p>
                      </div>
                    </li>

                    <li className={`pb-2 dashboard-sidebar-dropdown-link ps-5 pt-2 ${isActiveDashLink("/admin/addStudent") ?"active-dash-link": ""}`}>
                      <Link className='dashboard-link' to="/admin/addStudent">Add New</Link> 
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
                        <Link className='dashboard-link' to="/admin/addStudent">Confirmed</Link> 
                        <p className='ps-3'>({SuccessWithdrawCount})</p>
                      </div>
                    </li>

                    <li className={`dashboard-sidebar-dropdown-link ps-5 pt-2 ${isActiveDashLink("/admin/addStudent") ?"active-dash-link": ""}`}>
                      <div className="d-flex">
                      <Link className='dashboard-link' to="/admin/addStudent">Declined</Link> 
                        <p className='ps-3'>({declinedWithdrawCount})</p>
                      </div>
                    </li>

                    <li className={`dashboard-sidebar-dropdown-link ps-5 pt-2 ${isActiveDashLink("/admin/addStudent") ?"active-dash-link": ""}`}>
                      <div className="d-flex">
                        <Link className='dashboard-link' to="/admin/addStudent">Pending</Link> 
                        <p className='ps-3'>({pendingWithdrawCount})</p>
                      </div>
                     
                    </li>

                    <li className={`dashboard-sidebar-dropdown-link ps-5 pt-2 ${isActiveDashLink("/admin/addStudent") ?"active-dash-link": ""}`}>
                      <div className="d-flex">
                      <Link className='dashboard-link' to="/admin/addStudent">All Withdraw</Link> 
                        <p className='ps-3'>({withdrawCount})</p>
                      </div>
                    </li>

                    <li className={`pb-2 dashboard-sidebar-dropdown-link ps-5 pt-2 ${isActiveDashLink("/admin/addStudent") ?"active-dash-link": ""}`}>
                      <Link className='dashboard-link' to="/admin/addStudent">Add New</Link> 
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
                    <li className={`dashboard-sidebar-dropdown-link ps-5 ${isActiveDashLink("/admin/addStudent") ?"active-dash-link": ""}`}>
                      <div className="d-flex">
                        <Link className='dashboard-link' to="/admin/addStudent">Active</Link> 
                        <p className='ps-3'>({activeInvestmentCount})</p>
                      </div>
                    </li>

                    <li className={`dashboard-sidebar-dropdown-link ps-5 pt-2 ${isActiveDashLink("/admin/addStudent") ?"active-dash-link": ""}`}>
                      <div className="d-flex">
                      <Link className='dashboard-link' to="/admin/addStudent">Completed</Link> 
                        <p className='ps-3'>({completedInvestmentCount})</p>
                      </div>
                    </li>

                    <li className={`dashboard-sidebar-dropdown-link ps-5 pt-2 ${isActiveDashLink("/admin/addStudent") ?"active-dash-link": ""}`}>
                      <div className="d-flex">
                        <Link className='dashboard-link' to="/admin/addStudent">Canceled</Link> 
                        <p className='ps-3'>({declinedInvestmentCount})</p>
                      </div>
                     
                    </li>

                    <li className={`dashboard-sidebar-dropdown-link ps-5 pt-2 ${isActiveDashLink("/admin/addStudent") ?"active-dash-link": ""}`}>
                      <div className="d-flex">
                        <Link className='dashboard-link' to="/admin/addStudent">Pending</Link> 
                        <p className='ps-3'>({pendingInvestmentCount})</p>
                      </div>
                     
                    </li>

                    <li className={`dashboard-sidebar-dropdown-link ps-5 pt-2 ${isActiveDashLink("/admin/addStudent") ?"active-dash-link": ""}`}>
                      <div className="d-flex">
                      <Link className='dashboard-link' to="/admin/addStudent">All Investment</Link> 
                        <p className='ps-3'>({investmentCount})</p>
                      </div>
                    </li>

                    <li className={`pb-2 dashboard-sidebar-dropdown-link ps-5 pt-2 ${isActiveDashLink("/admin/addStudent") ?"active-dash-link": ""}`}>
                      <Link className='dashboard-link' to="/admin/addStudent">Add New</Link> 
                    </li>
                    
                  </ul>
                </div>


     
              </li>
              <li className='pb-3'>
                <Link className='dashboard-link'>
                  <div className="d-flex ps-3">
                    <i class="bi bi-coin sm-text me-3"></i>
                    <p className='pt-1'>Interest log</p>
                  </div>
                </Link>
              </li>

              <li className='pb-3'>
                <Link className='dashboard-link'>
                  <div className="d-flex ps-3">
                    <FontAwesomeIcon className='sm-text pt-1 me-3' icon={faCoins}/>
                    <p className='pt-1'>Bonus log</p>
                  </div>
                </Link>
              </li>

              <li className='pb-2'>
                <Link className='dashboard-link'>
                  <div className="d-flex ps-3">
                    <FontAwesomeIcon className='sm-text pt-1 me-3' icon={faPercent}/>
                    <p className='pt-1'>Comission log</p>
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
                        <Link className='dashboard-link' to="/admin/addStudent">Disable</Link> 
                        <p className='ps-3'>({disableUserCount})</p>
                      </div>
                    </li>

                    <li className={`dashboard-sidebar-dropdown-link ps-5 pt-2 ${isActiveDashLink("/admin/addStudent") ?"active-dash-link": ""}`}>
                      <div className="d-flex">
                      <Link className='dashboard-link' to="/admin/addStudent">Users Verifiaction</Link> 
                        <p className='ps-3'>({userVerificationCount})</p>
                      </div>
                    </li>

                    <li className={`dashboard-sidebar-dropdown-link ps-5 pt-2 ${isActiveDashLink("/admin/addStudent") ?"active-dash-link": ""}`}>
                      <div className="d-flex">
                      <Link className='dashboard-link' to="/admin/addStudent">Pending</Link> 
                        <p className='ps-3'>({pendingUserVerificationCount})</p>
                      </div>
                    </li>

                    <li className={`dashboard-sidebar-dropdown-link ps-5 pt-2 ${isActiveDashLink("/admin/addStudent") ?"active-dash-link": ""}`}>
                      <div className="d-flex">
                        <Link className='dashboard-link' to="/admin/addStudent">Verified Users</Link> 
                        <p className='ps-3'>({verifiedUserCount})</p>
                      </div>       
                    </li>

                    <li className={`dashboard-sidebar-dropdown-link ps-5 pt-2 ${isActiveDashLink("/admin/addStudent") ?"active-dash-link": ""}`}>
                      <div className="d-flex">
                        <Link className='dashboard-link' to="/admin/addStudent">Canceled Verification</Link> 
                        <p className='ps-3'>({canceledUserVerificationCount})</p>
                      </div>       
                    </li>

                    <li className={`dashboard-sidebar-dropdown-link ps-5 pt-2 ${isActiveDashLink("/admin/addStudent") ?"active-dash-link": ""}`}>
                      <div className="d-flex">
                        <Link className='dashboard-link' to="/admin/addStudent">Unverified</Link> 
                        <p className='ps-3'>({unverifiedUserCount})</p>
                      </div>
                     
                    </li>

                    <li className={`dashboard-sidebar-dropdown-link ps-5 pt-2 ${isActiveDashLink("/admin/addStudent") ?"active-dash-link": ""}`}>
                      <Link className='dashboard-link' to="/admin/addStudent">Users List</Link> 
                    </li>

                    <li className={`pb-2 dashboard-sidebar-dropdown-link ps-5 pt-2 ${isActiveDashLink("/admin/addStudent") ?"active-dash-link": ""}`}>
                      <Link className='dashboard-link' to="/admin/addStudent">Add New</Link> 
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
                      <p className='me-1 dahboard-sidebar-count'>0</p>
                      <p className={`${kycDropdown ? 'rotate-90deg': ''}`}><i class="bi bi-chevron-right xsm-text" ></i></p>
                    </div>
                  </div>
                </div>
                

                <div>
                  <ul className={` dropdown-bg ${kycDropdown ? "slide-in" : "slide-out"}`}>
                    <li className={`dashboard-sidebar-dropdown-link ps-5 ${isActiveDashLink("/admin/addStudent") ?"active-dash-link": ""}`}>
                      <div className="d-flex">
                        <Link className='dashboard-link' to="/admin/addStudent">Not Uploaded</Link> 
                        <p className='ps-3'>(0)</p>
                      </div>
                    </li>

                    <li className={`dashboard-sidebar-dropdown-link ps-5 pt-2 ${isActiveDashLink("/admin/addStudent") ?"active-dash-link": ""}`}>
                      <div className="d-flex">
                      <Link className='dashboard-link' to="/admin/addStudent">Verified</Link> 
                        <p className='ps-3'>(0)</p>
                      </div>
                    </li>

                    <li className={`dashboard-sidebar-dropdown-link ps-5 pt-2 ${isActiveDashLink("/admin/addStudent") ?"active-dash-link": ""}`}>
                      <div className="d-flex">
                        <Link className='dashboard-link' to="/admin/addStudent">Rejected</Link> 
                        <p className='ps-3'>(0)</p>
                      </div>
                     
                    </li>

                    <li className={`dashboard-sidebar-dropdown-link ps-5 pt-2 ${isActiveDashLink("/admin/addStudent") ?"active-dash-link": ""}`}>
                      <div className="d-flex">
                        <Link className='dashboard-link' to="/admin/addStudent">Pending</Link> 
                        <p className='ps-3'>(0)</p>
                      </div>
                     
                    </li>

                    <li className={`dashboard-sidebar-dropdown-link ps-5 pt-2 ${isActiveDashLink("/admin/addStudent") ?"active-dash-link": ""}`}>
                      <Link className='dashboard-link' to="/admin/addStudent">KYCs List</Link> 
                    </li>

                    <li className={`pb-2 dashboard-sidebar-dropdown-link ps-5 pt-2 ${isActiveDashLink("/admin/addStudent") ?"active-dash-link": ""}`}>
                      <Link className='dashboard-link' to="/admin/addStudent">Add New</Link> 
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
                      <p className='me-1 dahboard-sidebar-count'>0</p>
                      <p className={`${emailDropdown ? 'rotate-90deg': ''}`}><i class="bi bi-chevron-right xsm-text" ></i></p>
                    </div>
                  </div>
                </div>
                

                <div>
                  <ul className={` dropdown-bg ${emailDropdown ? "slide-in" : "slide-out"}`}>

                    <li className={`dashboard-sidebar-dropdown-link ps-5 pt-2 ${isActiveDashLink("/admin/addStudent") ?"active-dash-link": ""}`}>
                      <Link className='dashboard-link' to="/admin/addStudent">Send Email</Link> 
                    </li>

                    <li className={`dashboard-sidebar-dropdown-link ps-5 pt-2 ${isActiveDashLink("/admin/addStudent") ?"active-dash-link": ""}`}>
                      <Link className='dashboard-link' to="/admin/addStudent">Bulk Email</Link> 
                    </li>

                    <li className={`pb-2 dashboard-sidebar-dropdown-link ps-5 pt-2 ${isActiveDashLink("/admin/addStudent") ?"active-dash-link": ""}`}>
                      <div className="d-flex">
                        <Link className='dashboard-link' to="/admin/addStudent">All Email</Link> 
                        <p className='ps-3'>(0)</p>
                      </div>
                     
                    </li>
                    
                  </ul>
                </div>


     
              </li>

              <li className='pb-3'>
                <Link className='dashboard-link'>
                  <div className="d-flex ps-3">
                    <FontAwesomeIcon className='sm-text pt-1 me-3' icon={faBan}/>
                    <p className='pt-1'>Blacklist IP</p>
                  </div>
                </Link>
              </li>

              <li className='pb-3'>
                <Link className='dashboard-link'>
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
                      <p className='me-1 dahboard-sidebar-count'>0</p>
                      <p className={`${investmentPlanDropdown ? 'rotate-90deg': ''}`}><i class="bi bi-chevron-right xsm-text" ></i></p>
                    </div>
                  </div>
                </div>
                

                <div>
                  <ul className={` dropdown-bg ${investmentPlanDropdown ? "slide-in" : "slide-out"}`}>
                    <li className={`dashboard-sidebar-dropdown-link ps-5 ${isActiveDashLink("/admin/addStudent") ?"active-dash-link": ""}`}>
                      <div className="d-flex">
                        <Link className='dashboard-link' to="/admin/addStudent">All plans</Link> 
                        <p className='ps-3'>(0)</p>
                      </div>
                    </li>

                    <li className={`pb-2 dashboard-sidebar-dropdown-link ps-5 pt-2 ${isActiveDashLink("/admin/addStudent") ?"active-dash-link": ""}`}>
                      <Link className='dashboard-link' to="/admin/addStudent">Add New</Link> 
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
                      <p className='me-1 dahboard-sidebar-count'>0</p>
                      <p className={`${paymentOptions ? 'rotate-90deg': ''}`}><i class="bi bi-chevron-right xsm-text" ></i></p>
                    </div>
                  </div>
                </div>
                

                <div>
                  <ul className={` dropdown-bg ${paymentOptions ? "slide-in" : "slide-out"}`}>
                    <li className={`dashboard-sidebar-dropdown-link ps-5 ${isActiveDashLink("/admin/addStudent") ?"active-dash-link": ""}`}>
                      <div className="d-flex">
                        <Link className='dashboard-link' to="/admin/addStudent">All Payment Options</Link> 
                        <p className='ps-3'>(0)</p>
                      </div>
                    </li>

                    <li className={`pb-2 dashboard-sidebar-dropdown-link ps-5 pt-2 ${isActiveDashLink("/admin/addStudent") ?"active-dash-link": ""}`}>
                      <Link className='dashboard-link' to="/admin/addStudent">Add New</Link> 
                    </li>
                    
                  </ul>
                </div>


     
              </li>



            </ul>

          </div>

          <div className="dashboard-content">
            <nav className="text-light d-flex align-items-center justify-content-between">
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