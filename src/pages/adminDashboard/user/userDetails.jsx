import '../../../css/dashboardCss/dashboard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AuthContext from "../../../context/AuthContext";
import { useContext, useEffect, useState } from 'react';
import { AdminDashFrame } from '../../../component/adminDashFrame';
import ReactPaginate  from "react-paginate"
import { Link, useNavigate } from 'react-router-dom';
import { faChartLine, faChevronLeft, faChevronRight, faHandHoldingDollar, faMoneyBillTransfer, faShieldHalved } from '@fortawesome/free-solid-svg-icons';
import CircularProgress from '@mui/material/CircularProgress';
import FloatingAlert from '../../../component/alert';
import pic from '../../../img/pexels-andrea-piacquadio-762041 (2).jpg'
import { Menu, selectClasses } from '@mui/material';
import AllDataContext from '../../../context/Alldata';
import './../../../css/dashboardCss/adminDahboardCss/userDetails.css'
import spin from '../../../img/Spin.gif'
import { useAccess } from '../../../context/accessContext';

export const UserDetails = () =>{
  const { markRouteAsVisited } = useAccess();

  useEffect(() => {
    markRouteAsVisited("/admin/user/:id");
  }, [markRouteAsVisited]);

  const {authTokens, 

    messages,
    alertVisible,
    setAlertVisible,
    isSuccess,
    showAlert,
    setMessage,
    setIsSuccess,


    OnbodyClick,
    formatName,
    shortName,
    disablebutton, 
    setDisablebutton,
    formatNameAllCaps,
    formatDate,
    formatFirstName,
    formatCurrency,


  } = useContext(AuthContext)

  const {
    depositData,
    setDepositData,

    withdrawData,
    setWithdrawData,

  } = useContext(AllDataContext)


  const navigate  = useNavigate()

  const [details, setDetails] = useState(null)
  const [urlName, setUrlName] = useState('')
  const [urlLink, setUrlLink] = useState('')

  const [selectedDataId, setSelectedDataId] = useState(null);
  const [menu, setMenu] = useState(false)

  const [depositShowModal, setDepositShowModal] = useState(false)
  const [depositShowDropdownMenu, setDepositShowDropdownMenu] = useState(false)
  const [depsoitLoader, setDepositLoader] = useState(false)


  const [withdrawShowModal, setWithdrawShowModal] = useState(false)
  const [withdrawShowDropdownMenu, setWithdrawShowDropdownMenu] = useState(false)
  const [withdrawLoader, setWithdrawLoader] = useState(false)

  const [userInformation, setUserInformation] = useState(true)
  const [depositInformation, setDepositInformation] = useState(false)
  const [withdrawInformation ,setWithdrawInformation] = useState(false)
  const [KYCInformation, setKYCInformation] = useState(false)
  const [investmentInformation, setInvestmentInformation] = useState(false)


  const [currentTab, setCurrentTab] = useState('')
  const [currentTabIcon, setCurrentTabIcon] = useState(null)

  useEffect (() =>{
    const checkCurrentTab = () =>{
      if(userInformation){
        setCurrentTab('Profile Information')
        setCurrentTabIcon(<i class="bi bi-person-circle me-2"></i>)
      }
      if(depositInformation){
        setCurrentTab('Deposit')
        setCurrentTabIcon(<FontAwesomeIcon className='me-2 pt-1' icon={faHandHoldingDollar}/>)
      }
      if(withdrawInformation){
        setCurrentTab('Withdraw')
        setCurrentTabIcon(<FontAwesomeIcon className='me-2 pt-1' icon={faMoneyBillTransfer}/>)
      }
      if(KYCInformation){
        setCurrentTab('KYC')
        setCurrentTabIcon( <FontAwesomeIcon className='me-2 pt-1' icon={faShieldHalved}/>)
      }
      if(investmentInformation){
        setCurrentTab('Investment')
        setCurrentTabIcon(<FontAwesomeIcon className='me-2 pt-1' icon={faChartLine}/>)
      }

    }
    checkCurrentTab()
  }, [userInformation, depositInformation, withdrawInformation, KYCInformation])



  const [deposit, setDeposit] = useState([])
  const [withdraw, setWithdraw] = useState([])
  const [investment, setInvestment] = useState([])

  const [depositCount, setDepositCount] = useState(0)
  const [withdrawCount, setWithdrawCount] = useState(0)
  const [investmentCount, setInvestmentCount] = useState(0)


  const [depositCurrentPage, setDepositCurrentPage] = useState(0)
  const depositdataPerPage = 10;
  const depositPageCount = Math.ceil(deposit.length / depositdataPerPage)

  const [withdrawCurrentPage, setWithdrawCurrentPage] = useState(0)
  const withdrawdataPerPage = 10
  const withdrawPageCount = Math.ceil(withdraw.length / withdrawdataPerPage)

  const [investmentCurrentPage, setInvestmentCurrentPage] = useState(0)
  const investemtDataPerPage = 10
  const investmentPageCount = Math.ceil(investment.length / investemtDataPerPage)

  const toogleMenu = () =>{
    setMenu(!menu)
  }
  const toogleUserDetails = () =>{
    if(!userInformation){
      setUserInformation(!userInformation)
    }
    setWithdrawInformation(false)
    setDepositInformation(false)
    setInvestmentInformation(false)
    setKYCInformation(false)

  }
  const toogleDeposit = () =>{
    if(!depositInformation){
      setDepositInformation(!depositInformation)
    }
    setUserInformation(false)
    setWithdrawInformation(false)
    setInvestmentInformation(false)
    setKYCInformation(false)

  }

  const toogleWithdraw = () =>{
    if(!withdrawInformation){
      setWithdrawInformation(!withdrawInformation)
    }
    setUserInformation(false)
    setDepositInformation(false)
    setInvestmentInformation(false)
    setKYCInformation(false)

  }

  const toogleInvestment = () =>{
    if(!investmentInformation){
      setInvestmentInformation(!investmentInformation)
    }
    setUserInformation(false)
    setWithdrawInformation(false)
    setDepositInformation(false)
    setKYCInformation(false)

  }

  const toogleKYC = () =>{
    if(!KYCInformation){
      setKYCInformation(!KYCInformation)
    }
    setUserInformation(false)
    setWithdrawInformation(false)
    setDepositInformation(false)
    setInvestmentInformation(false)

  }



  const depositCurrentData = deposit.slice(
    depositCurrentPage * depositdataPerPage,
    (depositCurrentPage + 1) * depositdataPerPage
  )
  const DeposithandlePageClick = ({selected}) =>{
    setDepositCurrentPage(selected)
  }

  const WithdrawCurrentData = withdraw.slice(
    withdrawCurrentPage * withdrawdataPerPage,
    (withdrawCurrentPage + 1) * withdrawdataPerPage

  )

  const WithdrawHandlePageClick = ({selected}) =>{
    setWithdrawCurrentPage(selected)
  }

  const InvestmentCurrentData = investment.slice(
    investmentCurrentPage * investemtDataPerPage,
    (investmentCurrentPage + 1) * investemtDataPerPage
  )

  const InvestmentHandlePageClick = ({selected}) =>{
    setInvestmentCurrentPage(selected)
  }




  useEffect(() =>{
    const data = sessionStorage
.getItem("IndividualUserData")

    setUrlName(sessionStorage
.getItem('urlName'))
    setUrlLink(sessionStorage
.getItem('urlLink'))
    if(data){
      const parsedData = JSON.parse(data)
      setDetails(parsedData)
      sortedDeposit(parsedData.all_deposit)
      sortedWithdraw(parsedData.all_withdraw)
      sortedInvestment(parsedData.user_investment)
      setDepositCount(deposit.length)
      setWithdrawCount(withdraw.length)
      setInvestmentCount(investment.length)

    }
  }, [deposit])

  const sortedDeposit = (data) =>{
    const sortedData = data.sort((a, b) => b.id - a.id);
    setDeposit(sortedData)

  }

  const sortedWithdraw = (data) =>{
    const sortedData = data.sort((a, b) => b.id - a.id);
    setWithdraw(sortedData)
  }

  const sortedInvestment = (data) =>{
    const sortedData = data.sort((a, b) => b.id - a.id);
    setInvestment(sortedData)
  }

  const checkVerification = (status) =>{
    if(status == 'verified'){
      return 'Yes'
    }else if(status == 'pending' || status == 'canceled'){
      return 'No'
    }
  }

  const checkCanceled = (name) =>{
    if(name === "canceled"){
      return "rejected"
    }else{
      return name
    }
  }

  const toggleDepositDropdown = (id) => {
    // Toggle the dropdown for the selected ID
    setSelectedDataId(selectedDataId === id ? null : id);
    setDepositShowDropdownMenu(true)
  };

  const showDepositDeleteModal = () => {
    setDepositShowModal(true)
    setDepositShowDropdownMenu(false)
  }

  const hideDepositDeleteModal = () => {
    setDepositShowModal(false)
    setSelectedDataId(null)
    setDepositShowDropdownMenu(true)

  }

  const toggleWithdrawDropdown = (id) => {
    // Toggle the dropdown for the selected ID
    setSelectedDataId(selectedDataId === id ? null : id);
    setWithdrawShowDropdownMenu(true)
  };

  const showWithdrawDeleteModal = () => {
    setWithdrawShowModal(true)
    setWithdrawShowDropdownMenu(false)
  }

  const hideWithdrawDeleteModal = () => {
    setWithdrawShowModal(false)
    setSelectedDataId(null)
    setWithdrawShowDropdownMenu(true)

  }


  const IndividualUser = async(id) =>{
    let response = await fetch(`http://127.0.0.1:8000/api/user-profile/admin/${details.user}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens.access}`
      }
      
    })
    const data = await response.json()
    sessionStorage.setItem('IndividualUserData', JSON.stringify(data))

  }



  const IndividualDeposit = async() =>{
    setDisablebutton(true)
    let response = await fetch(`http://127.0.0.1:8000/api/deposits/${selectedDataId}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens.access}`
      }
      
    })
    const data = await response.json()
    sessionStorage.setItem('TypeOfDeposit', 'All')
    sessionStorage.setItem('TypeOfDepositUrl', '/admin/all-deposits')
    sessionStorage.setItem('IndividualDepsoit', JSON.stringify(data))

    if (response.ok){
      navigate(`/admin/all-deposits/${data.id}`)
      setDisablebutton(false)
    }else{
      setDisablebutton(false)
    }

  }

  const IndividualWithdraw = async() =>{
    setDisablebutton(true)
    let response = await fetch(`http://127.0.0.1:8000/api/withdraw/${selectedDataId}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens.access}`
      }
      
    })
    const data = await response.json()
    sessionStorage.setItem('TypeOfWithdraw', 'All')
    sessionStorage.setItem('TypeOfWithdrawUrl', '/admin/all-withdraws')
    sessionStorage.setItem('IndividualData', JSON.stringify(data))

    if (response.ok){
      navigate(`/admin/all-withdraws/${data.id}`)
      setDisablebutton(false)
    }else{
      setDisablebutton(false)
    }

  }



  const InvestmentIntrest = async(user, investment_id) =>{

    let response = await fetch(`http://127.0.0.1:8000/api/investment-intrest/filter/?user=${user}&investment_id=${investment_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens.access}`
      }
      
    })

    if(response.ok){
      const data = await response.json()
      const sortedData = data.sort((a, b) => b.id - a.id);
      sessionStorage.setItem('InvestmentInterestData', JSON.stringify(sortedData))
      console.log(data)

    }else{
      sessionStorage.setItem('InvestmentInterestData', null)

    }

    
  }



  const IndividualInvestment = async(id) =>{
    setSelectedDataId(id)
    setDisablebutton(true)
    let response = await fetch(`http://127.0.0.1:8000/api/user-investment/${id}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens.access}`
      }
      
    })
    const data = await response.json()
    sessionStorage.setItem('urlName', 'All')
    sessionStorage.setItem('urlLink', '/admin/all-investment')
    sessionStorage.setItem('IndividualData', JSON.stringify(data))

    if (response.ok){
      const interestData = await InvestmentIntrest(data.user, data.investment_id);
      navigate(`/admin/all-investment/${data.id}`)
      setDisablebutton(false)

    }else{
      setDisablebutton(false)
    }

    
  }

  const deleteDeposit = async () => {
    setDisablebutton(true)
    setDepositLoader(true)
    setSelectedDataId(null)

    try{
      let response = await fetch(`http://127.0.0.1:8000/api/deposits/${selectedDataId}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${authTokens.access}`
        }
      })

      if (response.ok) {
        setDepositLoader(false)
        setDisablebutton(false)
        setDepositData(depositData.filter(dat => dat.id !== selectedDataId))
        setDepositShowModal(false)
        showAlert()
        setIsSuccess(true)
        IndividualUser()
        setMessage('Deposit successfully deleted')
      } else {
        const errorData = await response.json()
        const errorMessages = Object.values(errorData)
        .flat()
        .join(', ');
        setMessage(errorMessages)
        setDepositLoader(false)
        setDisablebutton(false)
        showAlert()
        setIsSuccess(false)
        setDisablebutton(false)
      }

    }catch{
      showAlert()
      setMessage('An unexpected error occurred.');
      setDisablebutton(false)
      setIsSuccess(false)
      setDepositLoader(false)

    }
  }

  const deleteWithdraw = async () => {
    setDisablebutton(true)
    setWithdrawLoader(true)
    setSelectedDataId(null)

    try{
      let response = await fetch(`http://127.0.0.1:8000/api/withdraw/${selectedDataId}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${authTokens.access}`
        }
      })

      if (response.ok) {
        setWithdrawLoader(false)
        setDisablebutton(false)
        setWithdrawData(withdrawData.filter(dat => dat.id !== selectedDataId))
        setWithdrawShowModal(false)
        showAlert()
        setIsSuccess(true)
        IndividualUser()
        setMessage('Withdraw successfully deleted')
      } else {
        const errorData = await response.json()
        const errorMessages = Object.values(errorData)
        .flat()
        .join(', ');
        setMessage(errorMessages)
        setWithdrawLoader(false)
        setDisablebutton(false)
        showAlert()
        setIsSuccess(false)
        setDisablebutton(false)
      }

    }catch{
      showAlert()
      setMessage('An unexpected error occurred.');
      setDisablebutton(false)
      setIsSuccess(false)
      setWithdrawLoader(false)

    }
  }







  
  return(
    <div>
      <div className="position-sticky1">
        <AdminDashFrame />
      </div>

      <div>
        <FloatingAlert
          message={messages}
          isVisible={alertVisible}
          onClose={() => setAlertVisible(false)}
          successs={isSuccess}
        />
      </div>

        {depositShowModal &&
          <section className="overlay-background">
            <div className="dashboard-modal-container">
              <div className="dashboard-delete-modal-content">
                <h5>Delete Item?</h5>
                <hr />
                <p>This will delete the Item.</p>
                <div className="d-flex justify-content-between py-3">
                  <div></div>
                  <div className='d-flex align-items-center height-100 pe-2'>
                    <button  className="dashboard-submit-btn  dashboard-btn px-4 py-2 me-3" disabled={disablebutton} onClick={deleteDeposit}>    
                      <span class={`${depsoitLoader ? 'dashboard-submit-spinner': ''}`}></span>
                      <span class={`${depsoitLoader ? 'dashboard-submit-btn-visiblity': ''}`}>Delete</span>
                    </button> 
                    <p className="light-link cursor-pointer" onClick={hideDepositDeleteModal}>Cancel</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        }

        {withdrawShowModal &&
            <section className="overlay-background">
              <div className="dashboard-modal-container">
                <div className="dashboard-delete-modal-content">
                  <h5>Delete Item?</h5>
                  <hr />
                  <p>This will delete the Item.</p>
                  <div className="d-flex justify-content-between py-3">
                    <div></div>
                    <div className='d-flex align-items-center height-100 pe-2'>
                      <button  className="dashboard-submit-btn  dashboard-btn px-4 py-2 me-3" disabled={disablebutton} onClick={deleteWithdraw}>    
                        <span class={`${withdrawLoader ? 'dashboard-submit-spinner': ''}`}></span>
                        <span class={`${withdrawLoader ? 'dashboard-submit-btn-visiblity': ''}`}>Delete</span>
                      </button> 
                      <p className="light-link cursor-pointer" onClick={hideWithdrawDeleteModal}>Cancel</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          }

      <div className="main-content" onClick={OnbodyClick}>
        <div className="container-xl">
          {details !== null ? (
            <div>
              <div className="pt-4 pb-4">
                <div>
                  <Link to={`${urlLink}`} className='light-link'><i class="bi bi-arrow-left"></i> {urlName} List</Link>
                  <p className='dashboard-header'>Profile Info - <span className="purple-text">{formatFirstName(details.user_details.full_name)}</span></p>
                </div>
              </div>

              <section className='pb-5 '>
                <div className="dashboard-boxes border-radius-5px">
                  <div className="user-details-container">
                    <section>

                      <div>
                        <div className="user-details-menu-tabs-container py-3 px-4 border-bottom1">


                          <div className='user-details-menu-responsive-tab'>
                            <div className={`active-line-container`}>
                              <div className='active-line'></div>
                            </div>
                            <div className={`pe-5 d-flex purple-text`}>                        
                              <div>{currentTabIcon}</div>
                              <p>{currentTab}</p>
                            </div>
                          </div>


                          <div className="user-details-menu-tabs">
                            <div className="d-flex">
                              <div className='cursor-pointer' onClick={toogleUserDetails}>
                                <div className={`${userInformation ? 'active-line-container' : 'd-none'} `}>
                                  <div className='active-line'></div>
                                </div>
                                <div className={`pe-5 d-flex ${userInformation ? 'purple-text' : ''}`}>
                                  <i class="bi bi-person-circle me-2"></i>
                                  <p>Profile Information</p>
                                </div>
                              </div>

                              <div className="cursor-pointer" onClick={toogleDeposit}>
                                <div className={`${depositInformation ? 'active-line-container' : 'd-none'}  `}>
                                  <div className='active-line'></div>
                                </div>
                                <div className={`pe-5 d-flex ${depositInformation ? 'purple-text' : ''}`}>
                                  <FontAwesomeIcon className='me-2 pt-1' icon={faHandHoldingDollar}/>
                                  <p >Deposit</p>
                                </div>
                              </div>

                              <div className="cursor-pointer" onClick={toogleWithdraw}>
                                <div className={`${withdrawInformation ? 'active-line-container' : 'd-none'}  `}>
                                  <div className='active-line'></div>
                                </div>
                                <div className={`pe-5 d-flex ${withdrawInformation ? 'purple-text' : ''}`}>
                                  <FontAwesomeIcon className='me-2 pt-1' icon={faMoneyBillTransfer}/>
                                  <p>Withdraws</p>
                                </div>
                              </div>
                              <div className="cursor-pointer" onClick={toogleInvestment}>
                                <div className={`${investmentInformation ? 'active-line-container' : 'd-none'}  `}>
                                  <div className='active-line'></div>
                                </div>
                                <div className={`pe-5 d-flex ${investmentInformation ? 'purple-text' : ''}`}>
                                  <FontAwesomeIcon className='me-2 pt-1' icon={faChartLine}/>
                                  <p>Investment</p>
                                </div>
                              </div>
                              

                              <div className="cursor-pointer" onClick={toogleKYC}>
                                <div className={`${KYCInformation ? 'active-line-container' : 'd-none'}  `}>
                                  <div className='active-line'></div>
                                </div>
                                <div className={`pe-5 d-flex ${KYCInformation ? 'purple-text' : ''}`}>
                                  <FontAwesomeIcon className='me-2 pt-1' icon={faShieldHalved}/>
                                  <p>KYC</p>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className='user-details-menu-btn'>
                            <i onClick={toogleMenu} class="bi bi-three-dots cursor-pointer"></i>
                            {menu && 
                              <div className={`user-details-table-menu`}>
                                <div>
                                  <p className='dashboard-table-menu-btn cursor-pointer' onClick={toogleUserDetails}>
                                    <button disabled={disablebutton} className='Button py-2 d-flex'>
                                      <div className={`d-flex`}>
                                        <i class="bi bi-person-circle me-2"></i>
                                        <p>Profile</p>
                                      </div>
                                    </button>
                                  </p>

                                  <p className='dashboard-table-menu-btn cursor-pointer' onClick={toogleDeposit}>
                                    <button disabled={disablebutton} className='Button py-2 d-flex'>
                                      <div className={`d-flex`}>
                                        <FontAwesomeIcon className='me-2 pt-1' icon={faHandHoldingDollar}/>
                                        <p >Deposit</p>
                                      </div>
                                    </button>
                                  </p>

                                  <p className='dashboard-table-menu-btn cursor-pointer' onClick={toogleWithdraw}>
                                    <button disabled={disablebutton} className='Button py-2 d-flex'>
                                      <div className={`d-flex`}>
                                        <FontAwesomeIcon className='me-2 pt-1' icon={faMoneyBillTransfer}/>
                                        <p>Withdraws</p>
                                      </div>
                                    </button>
                                  </p>

                                  <p className='dashboard-table-menu-btn cursor-pointer' onClick={toogleInvestment}>
                                    <button disabled={disablebutton} className='Button py-2 d-flex'>
                                      <div className={`d-flex`}>
                                        <FontAwesomeIcon className='me-2 pt-1' icon={faChartLine}/>
                                        <p>Investment</p>
                                      </div>
                                    </button>
                                  </p>


                                  <p className='dashboard-table-menu-btn cursor-pointer' onClick={toogleKYC}>
                                    <button disabled={disablebutton} className='Button py-2 d-flex'>
                                      <div className={`d-flex`}>
                                      <FontAwesomeIcon className='me-2 pt-1' icon={faShieldHalved}/>
                                      <p>KYC</p>
                                      </div>
                                    </button>
                                  </p>
                                </div>
                              </div>
                            }

                          </div>
                        </div>
                      </div>

                      {userInformation && 
                        <div>
                          <div className="d-flex justify-content-end me-4 mt-3">
                            <div className={`dashboard-boxes user-details-img-container ${details.user_details.profile_photo === null ? 'user-details-no-img': ''}`}>
                              {details.user_details.profile_photo !== null ? (
                                <img className='user-details-img' src={details.user_details.profile_photo} alt="" />
                              ) : (
                                <div className='sm-text text-center '>
                                  <p>No</p>
                                  <p>Image</p>
                                </div>
                              )
                              
                              }

                            </div>
                          </div>

                          <section className='py-3 px-4 border-bottom1'>
                            <h5>Login Details</h5>

                            <div className="row pt-4 gx-5">
                              <div className="col-lg-5 col-md-6 ">
                                <div className="d-flex justify-content-between pb-3">
                                  <p className='light-text'>User Name:</p>
                                  <p>{details.user_details.user_name}</p>
                                </div>

                                <div className="d-flex justify-content-between pb-3">
                                  <p className='light-text'>Full Name:</p>
                                  <p>{formatName(details.user_details.full_name)}</p>
                                </div>                 

                              </div>

                              <div className="col-lg-5 col-md-6 ">
                                <div className="d-flex justify-content-between pb-3">
                                  <p className='light-text'>Email </p>
                                  <p>{details.user_details.email}</p>
                                </div>
                              </div>
                            </div>
                          </section>

                          <section className='py-3 px-4 border-bottom1'>
                            <h5>Personal Information</h5>
                            {details.user_verification.length !== 0 ? (
                              <div className="row pt-4 gx-5">
                                <div className="col-lg-5 col-md-6 ">
                                  <div className="d-flex justify-content-between pb-3">
                                    <p className='light-text'>User ID:</p>
                                    <p>{details.user_verification[0].user}</p>
                                  </div>
          
                                  <div className="d-flex justify-content-between pb-3">
                                    <p className='light-text'>Full Name:</p>
                                    <p>{formatName(details.user_verification[0].user_details.full_name)}</p>
                                  </div>
                                  <div className="d-flex justify-content-between pb-3">
                                    <p className='light-text'>Email</p>
                                    <p>{details.user_verification[0].user_details.email}</p>
                                  </div>
                                  <div className="d-flex justify-content-between pb-3">
                                    <p className='light-text'>Gender</p>
                                    <p>{formatName(details.user_verification[0].gender)}</p>
                                  </div>
          
                                  <div className="d-flex justify-content-between pb-3">
                                    <p className='light-text'>Verified</p>
                                    <div className='d-flex align-items-center height-100'>
                                      <p className={`dashboard-dot me-2 ${details.user_verification[0].status === "verified" ? "sucessfull-bg" : "pending"}`}></p>
                                      <p className={`d-inline py-2 sm-text ${details.user_verification[0].status === "verified" ? "sucessfull-text" : "pending-text"} font-bold`}>{checkVerification(details.user_verification[0].status)}</p>
                                    </div>
                                  </div>
          
                                  
          
                                </div>
          
                                <div className="col-lg-5 col-md-6 ">
                                  <div className="d-flex justify-content-between pb-3">
                                    <p className='light-text'>Phone Number</p>
                                    <p>{details.user_verification[0].phone_number}</p>
                                  </div>
          
                                  <div className="d-flex justify-content-between pb-3">
                                    <p className='light-text'>Date of Birth</p>
                                    <p>{formatDate(details.user_verification[0].date_of_birth)}</p>
                                  </div>
          
                                  <div className="d-flex justify-content-between pb-3">
                                    <p className='light-text'>SSN</p>
                                    <p>{details.user_verification[0].ssn}</p>
                                  </div>
          
                                  <div className="d-flex justify-content-between pb-3">
                                    <p className='light-text'>Verification Status</p>
                                    <p className={`d-inline py-2 px-3 border-radius-5px  ${details.user_verification[0].status === "verified" ? "verified-kyc-1": ""} ${details.user_verification[0].status === "pending" ? "pending-kyc": ""}  ${details.user_verification[0].status === "canceled" ? "canceled-kyc": ""}`}> {formatName(checkCanceled(details.user_verification[0].status))}</p>
                                    
                                  </div>
                                </div>
                              </div>
                            ) :(
                              <div className='user-details-No-details'>
                                <div>
                                  <p className='dashboard-header light-text'>No Details Yet</p>
                                  <p>User have not submited Verification form </p>
                                </div>
        
                              </div>
                            )}

                          </section>

                          <section className='py-3 px-4'>
                            <h5>Contact Information</h5>
                            {details.user_verification.length !== 0 ? (
                              <div className="row pt-4 gx-5">
                                <div className="col-lg-5 col-md-6 ">
                                  <div className="d-flex justify-content-between pb-3">
                                    <p className='light-text'>Address:</p>
                                    <p>{formatName(details.user_verification[0].address)}</p>
                                  </div>
                                  <div className="d-flex justify-content-between pb-3">
                                    <p className='light-text'>State</p>
                                    <p>{formatName(details.user_verification[0].state)}</p>
                                  </div>


                                  <div className="d-flex justify-content-between pb-3">
                                    <p className='light-text'>Zip code</p>
                                    <p>{details.user_verification[0].zip_code}</p>
                                  </div>

                                  

                                </div>

                                <div className="col-lg-5 col-md-6 ">
                                  <div className="d-flex justify-content-between pb-3">
                                    <p className='light-text'>City:</p>
                                    <p>{formatName(details.user_verification[0].city_town)}</p>
                                  </div>

                                  <div className="d-flex justify-content-between pb-3">
                                    <p className='light-text'>Country</p>
                                    <p>{formatName(details.user_verification[0].country)}</p>
                                  </div>
                                </div>
                              </div>
                            ): (
                              <div className='user-details-No-details'>
                                <div>
                                  <p className='dashboard-header light-text'>No Details Yet</p>
                                  <p>User have not submited Verification form </p>
                                </div>
                              </div>
                            )}

                          </section>

                        </div>
                      }
                      {depositInformation &&              
                        <div className='p-4'>
                          <div className='pb-3 ps-2'>
                            <h5>All Deposit</h5>
                            <p className='light-text'>Total {depositCount} deposits made</p>
                          </div>
                          <div className='dashboard-boxes border-radius-5px dahboard-table  dash-scroll-bar non-wrap-text'>
                            <div className=''>
                              <table>
                                <thead> 
                                  <tr>
                                    <th className='sm-text-2 py-2'>Name</th>
                                    <th className='sm-text-2'>Trnx/Coin</th>
                                    <th className='sm-text-2'>Amount</th>
                                    <th className='sm-text-2'>Date</th>
                                    <th className='sm-text-2'>Status</th>
                                    <th></th>
                                  </tr>
                                </thead>

                                <tbody>
                                  {depositCurrentData.length > 0 ? (
                                    depositCurrentData.map((data) =>(
                                      <tr key={data.id}  className={selectedDataId === data.id ? 'dashboard-active-row' : ''}> 
                                        <td className='py-2'>
                                          <div className="d-flex">
                                            <div className='dahboard-table-arrow-icon'>
                                              <i class="bi bi-arrow-down-left sm-text-3"></i>
                                            </div>


                                            <div>
                                              {formatName(data.user_details.full_name)} <br /> <span className="sm-text-2">{data.user_details.email}</span>
                                            </div>

                                          </div>
                                          
                                          
                                        </td>
                                        <td >{data.transaction_id} <br /> <span className="sm-text-2">via {data.payment_method_details.name}</span></td>
                                        <td>{formatCurrency(data.amount)} USD</td>
                                        <td>{formatDate(data.created_at)}</td>
                                        <td><p p className={`dashboard-status ps-3 ${data.status === "pending" ? "pending" : "sucessfull"} ${data.status === "declined" && "failed"}`}>{formatName(data.status)}</p></td> 

                                        <td>
                                          <div className='dashboard-table-btn'>
                                            <i onClick={() => toggleDepositDropdown(data.id)} class="bi bi-three-dots cursor-pointer"></i>

                                            {(selectedDataId === data.id && depositShowDropdownMenu) && (
                                              <div className={`dashboard-table-menu dashboard-table-menu-down`}>
                                                <div>
                                                  <p onClick={IndividualDeposit} className='dashboard-table-menu-btn cursor-pointer'>
                                                    <button disabled={disablebutton} className='Button py-2 '>
                                                      <i class="bi bi-eye-fill pe-1"></i> View Details
                                                    </button>

                                                  </p>
                                                  <p className='py-2 dashboard-table-menu-btn cursor-pointer' onClick={showDepositDeleteModal}>
                                                  <i class="bi bi-trash pe-1" ></i> Delete
                                                  </p>
                                                </div>
                                              </div>
                                            )}
                                          </div>
                                        </td>
                                      </tr>
                                    ))
                                  ): (
                                      <tr>
                                        <td>No details available</td>
                                      </tr>
                                  )}
                                </tbody>
                              </table>


                            </div>
                          </div>

                          <div className="d-flex justify-content-end py-2">
                            <ReactPaginate
                              previousLabel={<FontAwesomeIcon icon={faChevronLeft}/>}
                              nextLabel={<FontAwesomeIcon icon={faChevronRight}/>}
                              pageCount={depositPageCount}
                              onPageChange={DeposithandlePageClick}
                              containerClassName={"pagination"}
                              previousLinkClassName={"pagination__link"}
                              nextLinkClassName={"pagination__link"}
                              disabledClassName={"pagination__link--disabled"}
                              activeClassName={"pagination__link--active"}
                              pageRangeDisplayed={5}
                              marginPagesDisplayed={1} 
                            />
                          </div>
                        </div>
                      }

                      {withdrawInformation &&              
                        <div className='p-4'>
                          <div className='pb-3 ps-2'>
                            <h5>All Withdraw</h5>
                            <p className='light-text'>Total {withdrawCount} withdrawals made</p>
                          </div>
                          <div className='dashboard-boxes border-radius-5px dahboard-table  dash-scroll-bar non-wrap-text'>
                            <div className=''>
                              <table>
                                <thead>
                                  <tr>
                                    <th className='sm-text-2 py-2'>Name</th>
                                    <th className='sm-text-2'>Trnx/Coin</th>
                                    <th className='sm-text-2'>Amount</th>
                                    <th className='sm-text-2'>Date</th>
                                    <th className='sm-text-2'>Status</th>
                                    <th></th>
                                  </tr>
                                </thead>

                                <tbody>
                                  {WithdrawCurrentData.length > 0 ? (
                                    WithdrawCurrentData.map((data) =>(
                                      <tr key={data.id}> 
                                        <td className='py-2'>
                                          <div className="d-flex">
                                            <div className='dahboard-table-arrow-icon'>
                                              <i class="bi bi-arrow-up-right sm-text-3"></i>
                                            </div>


                                            <div>
                                              {formatName(data.user_details.full_name)} <br /> <span className="sm-text-2">{data.user_details.email}</span>
                                            </div>

                                          </div>
                                          
                                          
                                        </td>
                                        <td >{data.transaction_id} <br /> <span className="sm-text-2">via {data.wallet_name}</span></td>
                                        <td>{formatCurrency(data.amount)} USD</td>
                                        <td>{formatDate(data.created_at)}</td>
                                        <td><p p className={`dashboard-status ps-3 ${data.status === "pending" ? "pending" : "sucessfull"} ${data.status === "declined" && "failed"}`}>{formatName(data.status)}</p></td> 
                                        <td>
                                          <div className='dashboard-table-btn'>
                                            <i onClick={() => toggleWithdrawDropdown(data.id)} class="bi bi-three-dots cursor-pointer"></i>

                                            {(selectedDataId === data.id && withdrawShowDropdownMenu) && (
                                              <div className={`dashboard-table-menu dashboard-table-menu-down`}>
                                                <div>
                                                  <p onClick={IndividualWithdraw} className='dashboard-table-menu-btn cursor-pointer'>
                                                    <button disabled={disablebutton} className='Button py-2 '>
                                                      <i class="bi bi-eye-fill pe-1"></i> View Details
                                                    </button>

                                                  </p>
                                                  <p className='py-2 dashboard-table-menu-btn cursor-pointer' onClick={showWithdrawDeleteModal}>
                                                  <i class="bi bi-trash pe-1" ></i> Delete
                                                  </p>
                                                </div>
                                              </div>
                                            )}
                                          </div>
                                        </td>
                                      </tr>
                                    ))
                                  ): (
                                      <tr>
                                        <td>No details available</td>
                                      </tr>
                                  )}
                                </tbody>
                              </table>


                            </div>
                          </div>

                          <div className="d-flex justify-content-end py-2">
                            <ReactPaginate
                              previousLabel={<FontAwesomeIcon icon={faChevronLeft}/>}
                              nextLabel={<FontAwesomeIcon icon={faChevronRight}/>}
                              pageCount={withdrawPageCount}
                              onPageChange={WithdrawHandlePageClick}
                              containerClassName={"pagination"}
                              previousLinkClassName={"pagination__link"}
                              nextLinkClassName={"pagination__link"}
                              disabledClassName={"pagination__link--disabled"}
                              activeClassName={"pagination__link--active"}
                              pageRangeDisplayed={5}
                              marginPagesDisplayed={1} 
                            />
                          </div>
                        </div>
                      }

                      {KYCInformation && 
                        <div>
                          {details.kyc_verification.length !== 0 ? (
                            <div>
                              <section className='py-5'>
                                <div className="row gx-4 gy-5 justify-content-center">
                                  <div className="col-md-5 col-11">
                                    <div>
                                      <p className='font-bold sm-text pb-3'>Document Info</p>
                                      <div className="dashboard-boxes border-radius-5px px-2">
                                        <div className="row align-items-center height-100  gx-3 border-bottom1 py-2">
                                          <div className="col-6 ps-4">
                                            <p>Submitted By:</p>
                                          </div>
                
                                          <div className="col-6">
                                            <div className='d-flex align-items-center height-100'>
                                              <h6 className="admin-home-user-icon me-2">{shortName(details.kyc_verification.users_details.full_name)}</h6>
                                              <p className='font-bold'>{formatName(details.kyc_verification.users_details.full_name)}</p>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="row align-items-center height-100 gx-3  border-bottom1 py-2">
                                          <div className="col-6 ps-4">
                                            <p>Submitted At:</p>
                                          </div>
                
                                          <div className="col-6">
                                            <p>{formatDate(details.kyc_verification.created_at)}</p>
                                          </div>
                                        </div>
                
                                        <div className="row align-items-center height-100 gx-3  border-bottom1 py-2">
                                          <div className="col-6 ps-4">
                                            <p>Status:</p>
                                          </div>
                
                                          <div className="col-6">
                                            <p className={`${details.kyc_verification.status === "verified" ? "sucessfull-text": ""} ${details.status === "pending" ? "pending-text": ""}  ${details.status === "canceled" ? "failed-text": ""} font-bold`}>{formatNameAllCaps(checkCanceled(details.kyc_verification.status))}</p>
                                          </div>
                                        </div>
                
                                        <div className="row align-items-center height-100 gx-3  border-bottom1 py-2">
                                          <div className="col-6 ps-4">
                                            <p>Document Type:</p>
                                          </div>
                
                                          <div className="col-6">
                                            <p>{formatName(details.kyc_verification.document_type)}</p>
                                          </div>
                                        </div>
                
                                        <div className="row align-items-center height-100 gx-3  py-2">
                                          <div className="col-6 ps-4">
                                            <p>Country of Issuance:</p>
                                          </div>
                
                                          <div className="col-6">
                                            <p>{formatName(details.kyc_verification.country)}</p>
                                          </div>
                                        </div>
                
                                      </div>
                                    </div>
                                  </div>
                
                                  <div className="col-md-5 col-11">
                                  <p className='font-bold sm-text pb-3'>Proof / Selfie</p>
                                    <div className="dashboard-boxes border-radius-5px">
                                      <div className="p-3">
                                        <img width="100%" src={details.kyc_verification.proof_selfie} alt="" />
                                      </div>
                                    </div>
                                  </div>
                
                                  <div className="col-md-5 col-11">
                                    <p className='font-bold sm-text pb-3'>Front Side</p>
                                    <div className="dashboard-boxes border-radius-5px">
                                      <div className="p-3">
                                        <img width="100%" height='100%' src={details.kyc_verification.font_side} alt="" />
                                      </div>
                                    </div>
                                  </div>
                
                                  <div className="col-md-5 col-11">
                                    <p className='font-bold sm-text pb-3'>Back Side</p>
                                    <div className="dashboard-boxes border-radius-5px">
                                      <div className="p-3">
                                        <img width="100%" height='100%' src={details.kyc_verification.back_side} alt="" />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </section>

                            </div>
                          ):(
                            <div className='user-details-No-details'>
                              <div>
                                <p className='dashboard-header light-text'>No Details Yet</p>
                                <p>User have not uploaded KYCs details</p>
                              </div>
      
                            </div>
                          )}
                        </div>
                      
                      }

                      {investmentInformation &&
                        <div className='p-4'>
                          <div className='pb-3 ps-2'>
                            <h5>All Investment</h5>
                            <p className='light-text'>Total {investmentCount} investment made</p>
                          </div>
                          <div className='dashboard-boxes border-radius-5px dahboard-table  dash-scroll-bar non-wrap-text'>
                            <div className=''>
                              <table>
                                <thead>
                                  <tr>
                                    <th className='sm-text-2 py-2'>Details</th>
                                    <th className='sm-text-2'>Name</th>
                                    <th className='sm-text-2'>Invested Amount</th>
                                    <th className='sm-text-2'>Investment Type</th>
                                    <th className='sm-text-2'>Start Date</th>
                                    <th className='sm-text-2'>Status</th>
                                    <th></th>
                                  </tr>
                                </thead>

                                <tbody>
                                  {InvestmentCurrentData.length > 0 ? (
                                    InvestmentCurrentData.map((data) =>(
                                      <tr key={data.id} className={selectedDataId === data.id ? 'dashboard-active-row' : ''}> 
                                        <td className='py-2'>
                                          <div className="d-flex">
                                            <div className='dahboard-table-arrow-icon'>
                                              <i class="bi bi-arrow-down-left sm-text-3"></i>
                                            </div>


                                            <div>
                                              {formatName(data.plan_details.plan_name)} <br /> <span className="sm-text-2">{data.investment_id}</span>
                                            </div>

                                          </div>
                                          
                                          
                                        </td>
                                        <td>{formatName(data.user_details.full_name)}</td>
                                        <td>{formatCurrency(data.amount)} USD</td>
                                        <td>{formatName(data.investment_type)}</td>            
                                        <td>{data.investment_begins !== null ? formatDate(data.investment_begins) : <i class="bi bi-three-dots"></i>}</td>
                                        <td><p className={`dashboard-status ps-3 ${data.investment_status === 'awaiting' && 'pending'} ${data.investment_status === 'canceled' && 'failed'} ${data.investment_status === 'active' && 'sucessfull'} ${data.investment_status === 'completed' && 'completed'}`}>{formatName(data.investment_status)}</p></td>
                                        <td>
                                          <button disabled={disablebutton} className='Button' onClick={() => IndividualInvestment(data.id)}>
                                            <p className='dashboard-table-arrow'><i class=" bi bi-chevron-right sm-text"></i></p>
                                          </button>                    
                                        </td>
                                      </tr>
                                    ))
                                  ): (
                                      <tr>
                                        <td>No details available</td>
                                      </tr>
                                  )}
                                </tbody>
                              </table>


                            </div>
                          </div>
                          <div className="d-flex justify-content-end py-2">
                            <ReactPaginate
                              previousLabel={<FontAwesomeIcon icon={faChevronLeft}/>}
                              nextLabel={<FontAwesomeIcon icon={faChevronRight}/>}
                              pageCount={investmentPageCount}
                              onPageChange={InvestmentHandlePageClick}
                              containerClassName={"pagination"}
                              previousLinkClassName={"pagination__link"}
                              nextLinkClassName={"pagination__link"}
                              disabledClassName={"pagination__link--disabled"}
                              activeClassName={"pagination__link--active"}
                              pageRangeDisplayed={5}
                              marginPagesDisplayed={1} 
                            />
                          </div>
                        </div>
                      
                      }
                    </section>


                  </div>
                </div>
              </section>
            </div>
          ) : (
            <div>
              <div className="d-flex justify-content-center  align-items-center height-90vh">
                <img src={spin} alt="" width='60px'/>
              </div>                         
            </div>
          )}

        </div>
      </div>


    </div>
  )
}