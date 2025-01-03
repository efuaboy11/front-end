import '../../../css/dashboardCss/dashboard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AuthContext from "../../../context/AuthContext";
import { useContext, useEffect, useState } from 'react';
import { AdminDashFrame } from '../../../component/adminDashFrame';
import ReactPaginate  from "react-paginate"
import { Link, useNavigate } from 'react-router-dom';
import { faChartLine, faChevronLeft, faChevronRight, faHandHoldingDollar, faL, faMoneyBillTransfer, faShieldHalved } from '@fortawesome/free-solid-svg-icons';
import CircularProgress from '@mui/material/CircularProgress';
import FloatingAlert from '../../../component/alert';
import pic from '../../../img/pexels-andrea-piacquadio-762041 (2).jpg'
import { Menu, selectClasses } from '@mui/material';
import AllDataContext from '../../../context/Alldata';
import './../../../css/dashboardCss/adminDahboardCss/userDetails.css'
import spin from '../../../img/Spin.gif'
import { useAccess } from '../../../context/accessContext';
import { ClientDashFrame } from '../../../component/ClientDashFrame';
import { DashboardFooter } from '../../../component/dashbaordFooter';

export const InvestmentHistory = () =>{

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
    investmentCount,
    investmentData,
    investmentLoader,
    investmentSearch,
    setInvestmentSearch,
    InvestmentFunction,
    filterInvestment,

    activeInvestmentCount,
    activeInvestment,
    activeInvestmentLoader,
    activeInvestmentSearch,
    setActiveInvestmentSearch,
    ActiveInvestmentFunction,
    filterActiveInvestment,


    pendingInvestmentCount,
    pendingInvestment,
    pendingInvestmentLoader,
    pendingInvestmentSearch,
    setPendingInvestmentSearch,
    PendingInvestmentFunction,
    filterPendingInvestment,

    declinedInvestmentCount,
    declinedInvestment,
    declinedInvestmentLoader,
    declinedInvestmentSearch,
    setDeclinedInvestmentSearch,
    DeclinedInvestmentFunction,
    filterDeclinedInvestment,

    
    completedInvestmentCount,
    completedInvestment,
    completedInvestmentLoader,
    completedInvestmentSearch,
    setCompletedInvestmentSearch,
    CompletedInvestmentFunction,
    filterCompletedInvestment,



  } = useContext(AllDataContext)

  useEffect(() =>{
    if(!activeInvestmentSearch){
      ActiveInvestmentFunction()
    }else if(activeInvestmentSearch){
      filterActiveInvestment()
    }
  }, [activeInvestmentSearch])

  useEffect(() =>{
    if(!investmentSearch){
      InvestmentFunction()
    }else if(investmentSearch){
      filterInvestment()
    }
  }, [investmentSearch])

  useEffect(() =>{
    if(!pendingInvestmentSearch){
      PendingInvestmentFunction()
    }else if(pendingInvestmentSearch){
      filterPendingInvestment()
    }
  }, [pendingInvestmentSearch])

  useEffect(() =>{
    if(!declinedInvestmentSearch){
      DeclinedInvestmentFunction()
    }else if(declinedInvestmentSearch){
      filterDeclinedInvestment()
    }
  }, [declinedInvestmentSearch])

  useEffect(() =>{
    if(!completedInvestmentSearch){
      CompletedInvestmentFunction()
    }else if(completedInvestmentSearch){
      filterCompletedInvestment()
    }
  }, [completedInvestmentSearch])



  const navigate  = useNavigate()

  const [menu, setMenu] = useState(false)



  const [allInvestment, setAllInvestment] = useState(true)
  const [activeInvestmentInfo, setActiveInvestmentInfo] = useState(false)
  const [pendingInvestmentInfo ,setPendingInvestmentInfo] = useState(false)
  const [declinedInvestmentInfo, setDeclinedInvestmentInfo] = useState(false)
  const [completedInvestmentInfo, setCompletedInvestmentInfo] = useState(false)


  const [currentTab, setCurrentTab] = useState('')
  const [currentTabIcon, setCurrentTabIcon] = useState(null)

  useEffect (() =>{
    const checkCurrentTab = () =>{
      if(allInvestment){
        setCurrentTab('All')
        setCurrentTabIcon( <p className='mx-2 dashboard-client-deposit-history-boxes'>{investmentCount}</p>)
      }
      if(activeInvestmentInfo){
        setCurrentTab('Active')
        setCurrentTabIcon (<p className='mx-2 dashboard-client-deposit-history-boxes'>{activeInvestmentCount}</p>)
      }
      if(pendingInvestmentInfo){
        setCurrentTab('Pending')
        setCurrentTabIcon( <p className='mx-2 dashboard-client-deposit-history-boxes'>{pendingInvestmentCount}</p>)
      }
      if(declinedInvestmentInfo){
        setCurrentTab('Declined')
        setCurrentTabIcon( <p className='mx-2 dashboard-client-deposit-history-boxes'>{declinedInvestmentCount}</p>)
      }

      if(completedInvestmentInfo){
        setCurrentTab('Completed')
        setCurrentTabIcon( <p className='mx-2 dashboard-client-deposit-history-boxes'>{completedInvestmentCount}</p>)
      }

    }
    checkCurrentTab()
  }, [allInvestment, activeInvestmentInfo, pendingInvestmentInfo, declinedInvestmentInfo, completedInvestmentInfo])





  const [allInvestmentCurrentPage, setAllInvestmentCurrentPage] = useState(0)
  const allInvestmentdataPerPage = 5;
  const allInvestmentPageCount = Math.ceil(investmentData.length / allInvestmentdataPerPage)

  const [activeInvestmentInfoCurrentPage, setActiveInvestmentInfoCurrentPage] = useState(0)
  const activeInvestmentInfodataPerPage = 5;
  const activeInvestmentInfoPageCount = Math.ceil(activeInvestment.length / activeInvestmentInfodataPerPage)

  const [pendingInvestmentInfoCurrentPage, setPendingInvestmentInfoCurrentPage] = useState(0)
  const pendingInvestmentInfodataPerPage = 5
  const pendingInvestmentInfoPageCount = Math.ceil(pendingInvestment.length / pendingInvestmentInfodataPerPage)

  const [declinedInvestmentInfoCurrentPage, setDeclinedInvestmentInfoCurrentPage] = useState(0)
  const declinedInvestmentInfoDataPerPage = 5
  const declinedInvestmentInfoPageCount = Math.ceil(declinedInvestment.length / declinedInvestmentInfoDataPerPage)
 
  const [completedInvestmentInfoCurrentPage, setCompletedInvestmentInfoCurrentPage] = useState(0)
  const completedInvestmentInfoDataPerPage = 5
  const completedInvestmentInfoPageCount = Math.ceil(completedInvestment.length / declinedInvestmentInfoDataPerPage)

  const toogleMenu = () =>{
    setMenu(!menu)
  }
  const toogleAllInvestment = () =>{
    if(!allInvestment){
      setAllInvestment(!allInvestment)
    }
    setPendingInvestmentInfo(false)
    setActiveInvestmentInfo(false)
    setDeclinedInvestmentInfo(false)
    setCompletedInvestmentInfo(false)

  }
  const toogleActiveInvestment = () =>{
    if(!activeInvestmentInfo){
      setActiveInvestmentInfo(!activeInvestmentInfo)
    }
    setAllInvestment(false)
    setPendingInvestmentInfo(false)
    setDeclinedInvestmentInfo(false)
    setCompletedInvestmentInfo(false)

  }

  const tooglePendingInvestmentInfo = () =>{
    if(!pendingInvestmentInfo){
      setPendingInvestmentInfo(!pendingInvestmentInfo)
    }
    setAllInvestment(false)
    setActiveInvestmentInfo(false)
    setDeclinedInvestmentInfo(false)
    setCompletedInvestmentInfo(false)

  }

  const toogleDeclinedInvestmentInfo = () =>{
    if(!declinedInvestmentInfo){
      setDeclinedInvestmentInfo(!declinedInvestmentInfo)
    }
    setAllInvestment(false)
    setPendingInvestmentInfo(false)
    setActiveInvestmentInfo(false)
    setCompletedInvestmentInfo(false)

  }

  const toogleCompletedInvestmentInfo = () =>{
    if(!completedInvestmentInfo){
      setCompletedInvestmentInfo(!completedInvestmentInfo)
    }
    setAllInvestment(false)
    setPendingInvestmentInfo(false)
    setActiveInvestmentInfo(false)
    setDeclinedInvestmentInfo(false)

  }



  const allInvestmentCurrentData = investmentData.slice(
    allInvestmentCurrentPage * allInvestmentdataPerPage,
    (allInvestmentCurrentPage + 1) * allInvestmentdataPerPage
  )
  const allInvestmenthandlePageClick = ({selected}) =>{
    setAllInvestmentCurrentPage(selected)
  }

  const activeInvestmentInfoCurrentData = activeInvestment.slice(
    activeInvestmentInfoCurrentPage * activeInvestmentInfodataPerPage,
    (activeInvestmentInfoCurrentPage + 1) * activeInvestmentInfodataPerPage
  )
  const activeInvestmentInfohandlePageClick = ({selected}) =>{
    setActiveInvestmentInfoCurrentPage(selected)
  }

  const PendingInvestmentInfoCurrentData = pendingInvestment.slice(
    pendingInvestmentInfoCurrentPage * pendingInvestmentInfodataPerPage,
    (pendingInvestmentInfoCurrentPage + 1) * pendingInvestmentInfodataPerPage

  )

  const PendingInvestmentInfoHandlePageClick = ({selected}) =>{
    setPendingInvestmentInfoCurrentPage(selected)
  }

  const DeclinedCurrentData = declinedInvestment.slice(
    declinedInvestmentInfoCurrentPage * declinedInvestmentInfoDataPerPage,
    (declinedInvestmentInfoCurrentPage + 1) * declinedInvestmentInfoDataPerPage
  )

  const DeclinedInvestmentInfoHandlePageClick = ({selected}) =>{
    setDeclinedInvestmentInfoCurrentPage(selected)
  }

  const CompletedCurrentData = completedInvestment.slice(
    completedInvestmentInfoCurrentPage * completedInvestmentInfoDataPerPage,
    (completedInvestmentInfoCurrentPage + 1) * completedInvestmentInfoDataPerPage
  )

  const CompletedInvestmentInfoHandlePageClick = ({selected}) =>{
    setCompletedInvestmentInfoCurrentPage(selected)
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
      sessionStorage
.setItem('InvestmentInterestData', JSON.stringify(sortedData))
      console.log(data)

    }else{
      sessionStorage
.setItem('InvestmentInterestData', null)

    }

    
  }



  const IndividualInvestment = async(id) =>{
    setDisablebutton(true)
    let response = await fetch(`http://127.0.0.1:8000/api/user-investment/${id}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens.access}`
      }
      
    })
    const data = await response.json()
    sessionStorage.setItem('urlName', 'Completed')
    sessionStorage.setItem('urlLink', '/admin/compeleted-investment')
    sessionStorage.setItem('IndividualData', JSON.stringify(data))

    if (response.ok){
      const interestData = await InvestmentIntrest(data.user, data.investment_id);
      navigate(`/dashboard/investment/history/${data.investment_id}`)
      setDisablebutton(false)

    }else{
      setDisablebutton(false)
    }

  }

  
  return(
    <div>
      <div className="position-sticky1">
        <ClientDashFrame />
      </div>

      <div>
        <FloatingAlert
          message={messages}
          isVisible={alertVisible}
          onClose={() => setAlertVisible(false)}
          successs={isSuccess}
        />
      </div>


      <div className="main-content" onClick={OnbodyClick}>
        <div className="container-xl">

            <div>
              <section className='py-5'>
                <div className="d-sm-flex justify-content-between align-items-center height-100">
                  <div className='pb-3'>
                    <div>
                      <p className='dashboard-header'>My Investments</p>
                      <p className='light-text'>Here is your current balance and your active investment plans.</p>
                    </div>
                  </div>

                    <div className='d-flex '>
                      <div className='pt-3 me-3'>
                        <Link to='/dashboard/investment/plan/'  className='dashboard-btn p-3'>
                          <i class="bi bi-coin"></i>
                        </Link>
                        <p className='sm-text-2 light-text pt-3'>Buy Plan</p>
                      </div>

                      <div className='pt-3'>
                        <Link to='/dashboard/add-withdraw/'  className='dashboard-inverse-btn p-3'>
                          <i class="bi bi-wallet"></i>
                        </Link>
                        <p className='sm-text-2 light-text pt-3'>Withdraw</p>
                      </div>
                    </div>
                </div>
              </section>

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
                              <div className='cursor-pointer' onClick={toogleAllInvestment}>
                                <div className={`${allInvestment ? 'active-line-container' : 'd-none'} `}>
                                  <div className='active-line'></div>
                                </div>
                                <div className={`pe-5 d-flex ${allInvestment ? 'purple-text' : ''}`}>
                                  <p>All Investment</p>
                                  <p className='ms-2 dashboard-client-deposit-history-boxes'>{investmentCount}</p>
                                </div>
                              </div>

                              <div className="cursor-pointer" onClick={toogleActiveInvestment}>
                                <div className={`${activeInvestmentInfo ? 'active-line-container' : 'd-none'}  `}>
                                  <div className='active-line'></div>
                                </div>
                                <div className={`pe-5 d-flex ${activeInvestmentInfo ? 'purple-text' : ''}`}>
                                  <p >Active Investment</p>
                                  <p className='ms-2 dashboard-client-deposit-history-boxes'>{activeInvestmentCount}</p>
                                </div>
                              </div>

                              <div className="cursor-pointer" onClick={tooglePendingInvestmentInfo}>
                                <div className={`${pendingInvestmentInfo ? 'active-line-container' : 'd-none'}  `}>
                                  <div className='active-line'></div>
                                </div>
                                <div className={`pe-5 d-flex ${pendingInvestmentInfo ? 'purple-text' : ''}`}>
                                  <p>Pending Investment</p>
                                  <p className='ms-2 dashboard-client-deposit-history-boxes'>{pendingInvestmentCount}</p>
                                </div>
                              </div>
                              <div className="cursor-pointer" onClick={toogleDeclinedInvestmentInfo}>
                                <div className={`${declinedInvestmentInfo ? 'active-line-container' : 'd-none'}  `}>
                                  <div className='active-line'></div>
                                </div>
                                <div className={`pe-5 d-flex ${declinedInvestmentInfo ? 'purple-text' : ''}`}>
                                  <p>Declined Investment</p>
                                  <p className='ms-2 dashboard-client-deposit-history-boxes'>{declinedInvestmentCount}</p>
                                </div>
                              </div>
                              <div className="cursor-pointer" onClick={toogleCompletedInvestmentInfo}>
                                <div className={`${completedInvestmentInfo ? 'active-line-container' : 'd-none'}  `}>
                                  <div className='active-line'></div>
                                </div>
                                <div className={`pe-5 d-flex ${completedInvestmentInfo ? 'purple-text' : ''}`}>
                                  <p>Completed Investment</p>
                                  <p className='ms-2 dashboard-client-deposit-history-boxes'>{completedInvestmentCount}</p>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className='user-details-menu-btn'>
                            <i onClick={toogleMenu} class="bi bi-three-dots cursor-pointer"></i>
                            {menu && 
                              <div className={`user-details-table-menu`}>
                                <div>
                                  <p className='dashboard-table-menu-btn cursor-pointer' onClick={toogleAllInvestment}>
                                    <button disabled={disablebutton} className='Button py-2 d-flex'>
                                      <div className={`d-flex`}>
                                        <p className='me-2 dashboard-client-deposit-history-boxes'>{investmentCount}</p>
                                        <p>All</p>
                                      </div>
                                    </button>
                                  </p>

                                  <p className='dashboard-table-menu-btn cursor-pointer' onClick={toogleActiveInvestment}>
                                    <button disabled={disablebutton} className='Button py-2 d-flex'>
                                      <div className={`d-flex`}>
                                        <p className='me-2 dashboard-client-deposit-history-boxes'>{activeInvestmentCount}</p>
                                        <p >Active </p>
                                      </div>
                                    </button>
                                  </p>

                                  <p className='dashboard-table-menu-btn cursor-pointer' onClick={tooglePendingInvestmentInfo}>
                                    <button disabled={disablebutton} className='Button py-2 d-flex'>
                                      <div className={`d-flex`}>
                                        <p className='me-2 dashboard-client-deposit-history-boxes'>{pendingInvestmentCount}</p>
                                        <p>Pending </p>
                                      </div>
                                    </button>
                                  </p>

                                  <p className='dashboard-table-menu-btn cursor-pointer' onClick={toogleDeclinedInvestmentInfo}>
                                    <button disabled={disablebutton} className='Button py-2 d-flex'>
                                      <div className={`d-flex`}>
                                        <p className='me-2 dashboard-client-deposit-history-boxes'>{declinedInvestmentCount}</p>
                                        <p>Declined </p>
                                      </div>
                                    </button>
                                  </p>

                                  <p className='dashboard-table-menu-btn cursor-pointer' onClick={toogleCompletedInvestmentInfo}>
                                    <button disabled={disablebutton} className='Button py-2 d-flex'>
                                      <div className={`d-flex`}>
                                        <p className='me-2 dashboard-client-deposit-history-boxes'>{completedInvestmentCount}</p>
                                        <p>Completed </p>
                                      </div>
                                    </button>
                                  </p>
                                </div>
                              </div>
                            }

                          </div>
                        </div>
                      </div>

                      {allInvestment && 
                        <section className='py-2 mt-3 px-4'>

                          <div className='pb-3 ps-2'>
                            <h5>All Investment</h5>
                            <p className='light-text'>Total {investmentCount} withdraw made</p>
                          </div>

                          <div className='d-flex justify-content-end'>
                            <div className='pb-3'>
                              <input type="text" className="p-2 dashboard-search-input" placeholder="search..." value={investmentSearch} onChange={(e) => setInvestmentSearch(e.target.value)} />
                            </div>
                          </div>
                          <div className='dashboard-boxes border-radius-5px dahboard-table  dash-scroll-bar non-wrap-text'>
                            <div className=''>
                              <table>
                                <thead>
                                  <tr>
                                    <th className='sm-text-2 py-2'>Plan Name</th>
                                    <th className='sm-text-2'>Invested Amount</th>
                                    <th className='sm-text-2'>Investment Type</th>
                                    <th className='sm-text-2'>Start Date</th>
                                    <th className='sm-text-2'>Status</th>
                                    <th></th>
                                  </tr>
                                </thead>

                                <tbody>
                                  {allInvestmentCurrentData.length > 0 ? (
                                    allInvestmentCurrentData.map((data) =>(
                                      <tr key={data.id}> 
                                        <td className='py-3'>{formatName(data.plan_details.plan_name)}</td>
                                        <td>{formatCurrency(data.amount)} USD</td>
                                        <td>{formatName(data.investment_type)}</td>            
                                        <td>{formatDate(data.investment_begins)}</td>
                                        <td><p  className={`dashboard-status ps-3 ${data.investment_status === 'awaiting' && 'pending'} ${data.investment_status === 'canceled' && 'failed'} ${data.investment_status === 'active' && 'sucessfull'} ${data.investment_status === 'completed' && 'completed'}`}>{formatName(data.investment_status)}</p></td>
                                        <td>
                                          <button disabled={disablebutton} className='Button' onClick={() => IndividualInvestment(data.id)}>
                                            <p className='dashboard-table-arrow'><i class=" bi bi-chevron-right sm-text"></i></p>
                                          </button>                    
                                        </td>
                                      </tr>
                                    ))
                                  ): (
                                      <tr className='py-2'>
                                        <td  className='py-2'>No details available</td>
                                      </tr>
                                  )}
                                </tbody>
                              </table>


                            </div>


                            {investmentLoader && (
                              <div className="d-flex justify-content-center py-4">
                                <img src={spin} alt="" width='60px'/>
                              </div>  
                                              
                            )}
                          </div>

                          <div className="d-flex justify-content-end py-2">
                            <ReactPaginate
                              previousLabel={<FontAwesomeIcon icon={faChevronLeft}/>}
                              nextLabel={<FontAwesomeIcon icon={faChevronRight}/>}
                              pageCount={allInvestmentPageCount}
                              onPageChange={allInvestmenthandlePageClick}
                              containerClassName={"pagination"}
                              previousLinkClassName={"pagination__link"}
                              nextLinkClassName={"pagination__link"}
                              disabledClassName={"pagination__link--disabled"}
                              activeClassName={"pagination__link--active"}
                              pageRangeDisplayed={5}
                              marginPagesDisplayed={1} 
                            />
                          </div>

                        </section>
                      }
                      {activeInvestmentInfo &&              
                        <section className='py-2 mt-3 px-4'>

                          <div className='pb-3 ps-2'>
                            <h5>Active Investment</h5>
                            <p className='light-text'>Total {activeInvestmentCount} active investment made</p>
                          </div>

                          <div className='d-flex justify-content-end'>
                            <div className='pb-3'>
                              <input type="text" className="p-2 dashboard-search-input" placeholder="search..." value={activeInvestmentSearch} onChange={(e) => setActiveInvestmentSearch(e.target.value)} />
                            </div>
                          </div>
                          <div className='dashboard-boxes border-radius-5px dahboard-table  dash-scroll-bar non-wrap-text'>
                            <div className=''>
                              <table>
                                <thead>
                                  <tr>
                                    <th className='sm-text-2 py-2'>Plan Name</th>
                                    <th className='sm-text-2'>Invested Amount</th>
                                    <th className='sm-text-2'>Investment Type</th>
                                    <th className='sm-text-2'>Start Date</th>
                                    <th className='sm-text-2'>Status</th>
                                    <th></th>
                                  </tr>
                                </thead>

                                <tbody>
                                  {activeInvestmentInfoCurrentData.length > 0 ? (
                                    activeInvestmentInfoCurrentData.map((data) =>(
                                      <tr key={data.id}>
                                        <td className='py-3'>{formatName(data.plan_details.plan_name)}</td>
                                        <td>{formatCurrency(data.amount)} USD</td>
                                        <td>{formatName(data.investment_type)}</td>            
                                        <td>{formatDate(data.investment_begins)}</td>
                                        <td><p  className={`dashboard-status ps-3 ${data.investment_status === 'awaiting' && 'pending'} ${data.investment_status === 'canceled' && 'failed'} ${data.investment_status === 'active' && 'sucessfull'} ${data.investment_status === 'completed' && 'completed'}`}>{formatName(data.investment_status)}</p></td>
                                        <td>
                                          <button disabled={disablebutton} className='Button' onClick={() => IndividualInvestment(data.id)}>
                                            <p className='dashboard-table-arrow'><i class=" bi bi-chevron-right sm-text"></i></p>
                                          </button>                    
                                        </td>
                                      </tr>
                                    ))
                                  ): (
                                      <tr>
                                        <td  className='py-2'>No details available</td>
                                      </tr>
                                  )}
                                </tbody>
                              </table>


                            </div>


                            {activeInvestmentLoader && (
                              <div className="d-flex justify-content-center py-4">
                                <img src={spin} alt="" width='60px'/>
                              </div>  
                                              
                            )}
                          </div>

                          <div className="d-flex justify-content-end py-2">
                            <ReactPaginate
                              previousLabel={<FontAwesomeIcon icon={faChevronLeft}/>}
                              nextLabel={<FontAwesomeIcon icon={faChevronRight}/>}
                              pageCount={activeInvestmentInfoPageCount}
                              onPageChange={activeInvestmentInfohandlePageClick}
                              containerClassName={"pagination"}
                              previousLinkClassName={"pagination__link"}
                              nextLinkClassName={"pagination__link"}
                              disabledClassName={"pagination__link--disabled"}
                              activeClassName={"pagination__link--active"}
                              pageRangeDisplayed={5}
                              marginPagesDisplayed={1} 
                            />
                          </div>

                        </section>
                      }

                      {pendingInvestmentInfo &&              
                        <section className='py-2 mt-3 px-4'>

                          <div className='pb-3 ps-2'>
                            <h5>Pending Investment</h5>
                            <p className='light-text'>Total {pendingInvestmentCount} pending investment made</p>
                          </div>

                          <div className='d-flex justify-content-end'>
                            <div className='pb-3'>
                              <input type="text" className="p-2 dashboard-search-input" placeholder="search..." value={pendingInvestmentSearch} onChange={(e) => setPendingInvestmentSearch(e.target.value)} />
                            </div>
                          </div>
                          <div className='dashboard-boxes border-radius-5px dahboard-table  dash-scroll-bar non-wrap-text'>
                            <div className=''>
                              <table>
                                <thead>
                                  <tr>
                                    <th className='sm-text-2 py-2'>Plan Name</th>
                                    <th className='sm-text-2'>Invested Amount</th>
                                    <th className='sm-text-2'>Investment Type</th>
                                    <th className='sm-text-2'>Start Date</th>
                                    <th className='sm-text-2'>Status</th>
                                    <th></th>
                                  </tr>
                                </thead>

                                <tbody>
                                  {PendingInvestmentInfoCurrentData.length > 0 ? (
                                    PendingInvestmentInfoCurrentData.map((data) =>(
                                      <tr key={data.id}>
                                        <td className='py-3'>{formatName(data.plan_details.plan_name)}</td>
                                        <td>{formatCurrency(data.amount)} USD</td>
                                        <td>{formatName(data.investment_type)}</td>            
                                        <td>{formatDate(data.investment_begins)}</td>
                                        <td><p  className={`dashboard-status ps-3 ${data.investment_status === 'awaiting' && 'pending'} ${data.investment_status === 'canceled' && 'failed'} ${data.investment_status === 'active' && 'sucessfull'} ${data.investment_status === 'completed' && 'completed'}`}>{formatName(data.investment_status)}</p></td>
                                        <td>
                                          <button disabled={disablebutton} className='Button' onClick={() => IndividualInvestment(data.id)}>
                                            <p className='dashboard-table-arrow'><i class=" bi bi-chevron-right sm-text"></i></p>
                                          </button>                    
                                        </td>
                                      </tr>
                                    ))
                                  ): (
                                      <tr>
                                        <td  className='py-2'>No details available</td>
                                      </tr>
                                  )}
                                </tbody>
                              </table>


                            </div>


                            {pendingInvestmentLoader && (
                              <div className="d-flex justify-content-center py-4">
                                <img src={spin} alt="" width='60px'/>
                              </div>  
                                              
                            )}
                          </div>

                          <div className="d-flex justify-content-end py-2">
                            <ReactPaginate
                              previousLabel={<FontAwesomeIcon icon={faChevronLeft}/>}
                              nextLabel={<FontAwesomeIcon icon={faChevronRight}/>}
                              pageCount={pendingInvestmentInfoPageCount}
                              onPageChange={PendingInvestmentInfoHandlePageClick}
                              containerClassName={"pagination"}
                              previousLinkClassName={"pagination__link"}
                              nextLinkClassName={"pagination__link"}
                              disabledClassName={"pagination__link--disabled"}
                              activeClassName={"pagination__link--active"}
                              pageRangeDisplayed={5}
                              marginPagesDisplayed={1} 
                            />
                          </div>

                        </section>
                      }

                      {declinedInvestmentInfo &&
                        <section className='py-2 mt-3 px-4'>

                          <div className='pb-3 ps-2'>
                            <h5>Declined Investment</h5>
                            <p className='light-text'>Total {declinedInvestmentCount} declined investment made</p>
                          </div>

                          <div className='d-flex justify-content-end'>
                            <div className='pb-3'>
                              <input type="text" className="p-2 dashboard-search-input" placeholder="search..." value={declinedInvestmentSearch} onChange={(e) => setDeclinedInvestmentSearch(e.target.value)} />
                            </div>
                          </div>
                          <div className='dashboard-boxes border-radius-5px dahboard-table  dash-scroll-bar non-wrap-text'>
                            <div className=''>
                              <table>
                                <thead>
                                  <tr>
                                    <th className='sm-text-2 py-2'>Plan Name</th>
                                    <th className='sm-text-2'>Invested Amount</th>
                                    <th className='sm-text-2'>Investment Type</th>
                                    <th className='sm-text-2'>Start Date</th>
                                    <th className='sm-text-2'>Status</th>
                                    <th></th>
                                  </tr>
                                </thead>

                                <tbody>
                                  {DeclinedCurrentData.length > 0 ? (
                                    DeclinedCurrentData.map((data) =>(
                                      <tr key={data.id}>
                                        <td className='py-3'>{formatName(data.plan_details.plan_name)}</td>
                                        <td>{formatCurrency(data.amount)} USD</td>
                                        <td>{formatName(data.investment_type)}</td>            
                                        <td>{formatDate(data.investment_begins)}</td>
                                        <td><p  className={`dashboard-status ps-3 ${data.investment_status === 'awaiting' && 'pending'} ${data.investment_status === 'canceled' && 'failed'} ${data.investment_status === 'active' && 'sucessfull'} ${data.investment_status === 'completed' && 'completed'}`}>{formatName(data.investment_status)}</p></td>
                                        <td>
                                          <button disabled={disablebutton} className='Button' onClick={() => IndividualInvestment(data.id)}>
                                            <p className='dashboard-table-arrow'><i class=" bi bi-chevron-right sm-text"></i></p>
                                          </button>                    
                                        </td>
                                      </tr>
                                    ))
                                  ): (
                                      <tr>
                                        <td  className='py-2'>No details available</td>
                                      </tr>
                                  )}
                                </tbody>
                              </table>


                            </div>


                            {declinedInvestmentLoader && (
                              <div className="d-flex justify-content-center py-4">
                                <img src={spin} alt="" width='60px'/>
                              </div>  
                                              
                            )}
                          </div>

                          <div className="d-flex justify-content-end py-2">
                            <ReactPaginate
                              previousLabel={<FontAwesomeIcon icon={faChevronLeft}/>}
                              nextLabel={<FontAwesomeIcon icon={faChevronRight}/>}
                              pageCount={declinedInvestmentInfoPageCount}
                              onPageChange={DeclinedInvestmentInfoHandlePageClick}
                              containerClassName={"pagination"}
                              previousLinkClassName={"pagination__link"}
                              nextLinkClassName={"pagination__link"}
                              disabledClassName={"pagination__link--disabled"}
                              activeClassName={"pagination__link--active"}
                              pageRangeDisplayed={5}
                              marginPagesDisplayed={1} 
                            />
                          </div>

                        </section>       
                      }


                      {completedInvestmentInfo &&
                        <section className='py-2 mt-3 px-4'>

                          <div className='pb-3 ps-2'>
                            <h5>Completed Investment</h5>
                            <p className='light-text'>Total {completedInvestmentCount} completed investment made</p>
                          </div>

                          <div className='d-flex justify-content-end'>
                            <div className='pb-3'>
                              <input type="text" className="p-2 dashboard-search-input" placeholder="search..." value={completedInvestmentSearch} onChange={(e) => setCompletedInvestmentSearch(e.target.value)} />
                            </div>
                          </div>
                          <div className='dashboard-boxes border-radius-5px dahboard-table  dash-scroll-bar non-wrap-text'>
                            <div className=''>
                              <table>
                                <thead>
                                  <tr>
                                    <th className='sm-text-2 py-2'>Plan Name</th>
                                    <th className='sm-text-2'>Invested Amount</th>
                                    <th className='sm-text-2'>Investment Type</th>
                                    <th className='sm-text-2'>Start Date</th>
                                    <th className='sm-text-2'>Status</th>
                                    <th></th>
                                  </tr>
                                </thead>

                                <tbody>
                                  {CompletedCurrentData.length > 0 ? (
                                    CompletedCurrentData.map((data) =>(
                                      <tr key={data.id}>
                                        <td className='py-3'>{formatName(data.plan_details.plan_name)}</td>
                                        <td>{formatCurrency(data.amount)} USD</td>
                                        <td>{formatName(data.investment_type)}</td>            
                                        <td>{formatDate(data.investment_begins)}</td>
                                        <td><p  className={`dashboard-status ps-3 ${data.investment_status === 'awaiting' && 'pending'} ${data.investment_status === 'canceled' && 'failed'} ${data.investment_status === 'active' && 'sucessfull'} ${data.investment_status === 'completed' && 'completed'}`}>{formatName(data.investment_status)}</p></td>
                                        <td>
                                          <button disabled={disablebutton} className='Button' onClick={() => IndividualInvestment(data.id)}>
                                            <p className='dashboard-table-arrow'><i class=" bi bi-chevron-right sm-text"></i></p>
                                          </button>                    
                                        </td>
                                      </tr>
                                    ))
                                  ): (
                                      <tr>
                                        <td  className='py-2'>No details available</td>
                                      </tr>
                                  )}
                                </tbody>
                              </table>


                            </div>


                            {completedInvestmentLoader && (
                              <div className="d-flex justify-content-center py-4">
                                <img src={spin} alt="" width='60px'/>
                              </div>  
                                              
                            )}
                          </div>

                          <div className="d-flex justify-content-end py-2">
                            <ReactPaginate
                              previousLabel={<FontAwesomeIcon icon={faChevronLeft}/>}
                              nextLabel={<FontAwesomeIcon icon={faChevronRight}/>}
                              pageCount={completedInvestmentInfoPageCount}
                              onPageChange={CompletedInvestmentInfoHandlePageClick}
                              containerClassName={"pagination"}
                              previousLinkClassName={"pagination__link"}
                              nextLinkClassName={"pagination__link"}
                              disabledClassName={"pagination__link--disabled"}
                              activeClassName={"pagination__link--active"}
                              pageRangeDisplayed={5}
                              marginPagesDisplayed={1} 
                            />
                          </div>

                        </section>       
                      }
                    </section>


                  </div>
                </div>
              </section>
            </div>


        </div>
      </div>

      <div className='py-5'>
        <DashboardFooter />
      </div>



    </div>
  )
}