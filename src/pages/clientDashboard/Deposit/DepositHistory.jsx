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
import { ClientDashFrame } from '../../../component/ClientDashFrame';
import { DashboardFooter } from '../../../component/dashbaordFooter';

export const DepositHistory = () =>{

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
    depositCount,
    depositData,
    setDepositData,
    depositLoader,
    allDepositSearch, 
    setallDepositSearch,
    DepositFunction,
    filterDeposits,


    successDespositCount,
    successfulDepositData,
    setSuccessfulDepositData,
    successfulDepositLoader,
    successfulDepositSearch,
    setSuccessfulDepositSearch,
    SuccessfulDepositFunction,
    filterSuccessfulDeposits,


    pendingDespositCount,
    pendingDepositData,
    setPendingDepositData,
    pendingDepositLoader,
    pendingDepositSearch,
    setPendingDepositSearch,
    PendingDepositFunction,
    filterPendingDeposits,

    declinedDepositCount,
    declinedDepositData,
    setDeclinedDepositData,
    declinedDepositLoader,
    declinedDepositSearch,
    setDeclinedDepositSearch,
    DeclinedDepositFunction,
    filterDeclinedDeposits,

  } = useContext(AllDataContext)

  useEffect(() =>{
    if(!successfulDepositSearch){
      SuccessfulDepositFunction()
    }else if(successfulDepositSearch){
      filterSuccessfulDeposits()
    }
  }, [successfulDepositSearch])

  useEffect(() =>{
    if(!allDepositSearch){
      DepositFunction()
    }else if(allDepositSearch){
      filterDeposits()
    }
  }, [allDepositSearch])

  useEffect(() =>{
    if(!pendingDepositSearch){
      PendingDepositFunction()
    }else if(pendingDepositSearch){
      filterPendingDeposits()
    }
  }, [pendingDepositSearch])

  useEffect(() =>{
    if(!declinedDepositSearch){
      DeclinedDepositFunction()
    }else if(declinedDepositSearch){
      filterDeclinedDeposits()
    }
  }, [declinedDepositSearch])



  const navigate  = useNavigate()

  const [menu, setMenu] = useState(false)



  const [allDeposit, setAllDeposit] = useState(true)
  const [successDepositInformation, setSuccessDepositInformation] = useState(false)
  const [pendingDeposit ,setPendingDeppsit] = useState(false)
  const [declinedDeposit, setDeclinedDeposit] = useState(false)


  const [currentTab, setCurrentTab] = useState('')
  const [currentTabIcon, setCurrentTabIcon] = useState(null)

  useEffect (() =>{
    const checkCurrentTab = () =>{
      if(allDeposit){
        setCurrentTab('All Deposit')
        setCurrentTabIcon(<i class="bi bi-person-circle me-2"></i>)
      }
      if(successDepositInformation){
        setCurrentTab('Confirmed')
        setCurrentTabIcon(<FontAwesomeIcon className='me-2 pt-1' icon={faHandHoldingDollar}/>)
      }
      if(pendingDeposit){
        setCurrentTab('Pending')
        setCurrentTabIcon(<FontAwesomeIcon className='me-2 pt-1' icon={faMoneyBillTransfer}/>)
      }
      if(declinedDeposit){
        setCurrentTab('Declined')
        setCurrentTabIcon(<FontAwesomeIcon className='me-2 pt-1' icon={faChartLine}/>)
      }

    }
    checkCurrentTab()
  }, [allDeposit, successDepositInformation, pendingDeposit])





  const [allDepositCurrentPage, setAllDepositCurrentPage] = useState(0)
  const allDepositdataPerPage = 5;
  const allDepositPageCount = Math.ceil(depositData.length / allDepositdataPerPage)

  const [successfulDepositCurrentPage, setSuccessfulDepositCurrentPage] = useState(0)
  const successfulDepositdataPerPage = 5;
  const successfulDepositPageCount = Math.ceil(successfulDepositData.length / successfulDepositdataPerPage)

  const [pendingDepositCurrentPage, setWPendingDepositCurrentPage] = useState(0)
  const pendingDepositdataPerPage = 5
  const pendingDepositPageCount = Math.ceil(pendingDepositData.length / pendingDepositdataPerPage)

  const [declinedDepositCurrentPage, setDeclinedDepositCurrentPage] = useState(0)
  const declinedDepositDataPerPage = 5
  const declinedDepositPageCount = Math.ceil(declinedDepositData.length / declinedDepositDataPerPage)
 


  const toogleMenu = () =>{
    setMenu(!menu)
  }
  const toogleAllDeposit = () =>{
    if(!allDeposit){
      setAllDeposit(!allDeposit)
    }
    setPendingDeppsit(false)
    setSuccessDepositInformation(false)
    setDeclinedDeposit(false)

  }
  const toogleSuccessfulDeposit = () =>{
    if(!successDepositInformation){
      setSuccessDepositInformation(!successDepositInformation)
    }
    setAllDeposit(false)
    setPendingDeppsit(false)
    setDeclinedDeposit(false)

  }

  const tooglePendingDeposit = () =>{
    if(!pendingDeposit){
      setPendingDeppsit(!pendingDeposit)
    }
    setAllDeposit(false)
    setSuccessDepositInformation(false)
    setDeclinedDeposit(false)

  }

  const toogleDeclinedDeposit = () =>{
    if(!declinedDeposit){
      setDeclinedDeposit(!declinedDeposit)
    }
    setAllDeposit(false)
    setPendingDeppsit(false)
    setSuccessDepositInformation(false)

  }



  const allDepositCurrentData = depositData.slice(
    allDepositCurrentPage * allDepositdataPerPage,
    (allDepositCurrentPage + 1) * allDepositdataPerPage
  )
  const allDeposithandlePageClick = ({selected}) =>{
    setAllDepositCurrentPage(selected)
  }

  const successfulDepositCurrentData = successfulDepositData.slice(
    successfulDepositCurrentPage * successfulDepositdataPerPage,
    (successfulDepositCurrentPage + 1) * successfulDepositdataPerPage
  )
  const SuccessfulDeposithandlePageClick = ({selected}) =>{
    setSuccessfulDepositCurrentPage(selected)
  }

  const PendingDepositCurrentData = pendingDepositData.slice(
    pendingDepositCurrentPage * pendingDepositdataPerPage,
    (pendingDepositCurrentPage + 1) * pendingDepositdataPerPage

  )

  const PendingDepositHandlePageClick = ({selected}) =>{
    setWPendingDepositCurrentPage(selected)
  }

  const DeclinedCurrentData = declinedDepositData.slice(
    declinedDepositCurrentPage * declinedDepositDataPerPage,
    (declinedDepositCurrentPage + 1) * declinedDepositDataPerPage
  )

  const DeclinedDepositHandlePageClick = ({selected}) =>{
    setDeclinedDepositCurrentPage(selected)
  }





  // const IndividualDeposit = async() =>{
  //   setDisablebutton(true)
  //   let response = await fetch(`http://127.0.0.1:8000/api/deposits/${selectedDataId}/`, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${authTokens.access}`
  //     }
      
  //   })
  //   const data = await response.json()
  //   sessionStorage.setItem('TypeOfDeposit', 'All')
  //   sessionStorage.setItem('TypeOfDepositUrl', '/admin/all-deposits')
  //   sessionStorage.setItem('IndividualDepsoit', JSON.stringify(data))

  //   if (response.ok){
  //     navigate(`/admin/all-deposits/${data.id}`)
  //     setDisablebutton(false)
  //   }else{
  //     setDisablebutton(false)
  //   }

  // }






  
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
                  <div>
                    <div>
                      <p className='light-text'>Transactions</p>
                      <p className='dashboard-header'>Deposit History</p>
                    </div>
                  </div>

                    <div>
                      <div className='pt-3'>
                        <Link to='/dashboard/deposit/step-1/'  className='dashboard-btn py-2 px-3'>
                          <i class="bi bi-plus-lg pe-2"></i>
                          Deposit Funds
                        </Link>
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
                              <div className='cursor-pointer' onClick={toogleAllDeposit}>
                                <div className={`${allDeposit ? 'active-line-container' : 'd-none'} `}>
                                  <div className='active-line'></div>
                                </div>
                                <div className={`pe-5 d-flex ${allDeposit ? 'purple-text' : ''}`}>
                                  <p>All Deposit</p>
                                  <p className='ms-2 dashboard-client-deposit-history-boxes'>{depositCount}</p>
                                </div>
                              </div>

                              <div className="cursor-pointer" onClick={toogleSuccessfulDeposit}>
                                <div className={`${successDepositInformation ? 'active-line-container' : 'd-none'}  `}>
                                  <div className='active-line'></div>
                                </div>
                                <div className={`pe-5 d-flex ${successDepositInformation ? 'purple-text' : ''}`}>
                                  <p >Confirmed Deposit</p>
                                  <p className='ms-2 dashboard-client-deposit-history-boxes'>{successDespositCount}</p>
                                </div>
                              </div>

                              <div className="cursor-pointer" onClick={tooglePendingDeposit}>
                                <div className={`${pendingDeposit ? 'active-line-container' : 'd-none'}  `}>
                                  <div className='active-line'></div>
                                </div>
                                <div className={`pe-5 d-flex ${pendingDeposit ? 'purple-text' : ''}`}>
                                  <p>Pending Deposit</p>
                                  <p className='ms-2 dashboard-client-deposit-history-boxes'>{pendingDespositCount}</p>
                                </div>
                              </div>
                              <div className="cursor-pointer" onClick={toogleDeclinedDeposit}>
                                <div className={`${declinedDeposit ? 'active-line-container' : 'd-none'}  `}>
                                  <div className='active-line'></div>
                                </div>
                                <div className={`pe-5 d-flex ${declinedDeposit ? 'purple-text' : ''}`}>
                                  <p>Declined Deposit</p>
                                  <p className='ms-2 dashboard-client-deposit-history-boxes'>{declinedDepositCount}</p>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className='user-details-menu-btn'>
                            <i onClick={toogleMenu} class="bi bi-three-dots cursor-pointer"></i>
                            {menu && 
                              <div className={`user-details-table-menu`}>
                                <div>
                                  <p className='dashboard-table-menu-btn cursor-pointer' onClick={toogleAllDeposit}>
                                    <button disabled={disablebutton} className='Button py-2 d-flex'>
                                      <div className={`d-flex`}>
                                        <i class="bi bi-person-circle me-2"></i>
                                        <p>All Deposit</p>
                                      </div>
                                    </button>
                                  </p>

                                  <p className='dashboard-table-menu-btn cursor-pointer' onClick={toogleSuccessfulDeposit}>
                                    <button disabled={disablebutton} className='Button py-2 d-flex'>
                                      <div className={`d-flex`}>
                                        <FontAwesomeIcon className='me-2 pt-1' icon={faHandHoldingDollar}/>
                                        <p >Confirmed </p>
                                      </div>
                                    </button>
                                  </p>

                                  <p className='dashboard-table-menu-btn cursor-pointer' onClick={tooglePendingDeposit}>
                                    <button disabled={disablebutton} className='Button py-2 d-flex'>
                                      <div className={`d-flex`}>
                                        <FontAwesomeIcon className='me-2 pt-1' icon={faMoneyBillTransfer}/>
                                        <p>Pending </p>
                                      </div>
                                    </button>
                                  </p>

                                  <p className='dashboard-table-menu-btn cursor-pointer' onClick={toogleDeclinedDeposit}>
                                    <button disabled={disablebutton} className='Button py-2 d-flex'>
                                      <div className={`d-flex`}>
                                        <FontAwesomeIcon className='me-2 pt-1' icon={faChartLine}/>
                                        <p>Declined </p>
                                      </div>
                                    </button>
                                  </p>
                                </div>
                              </div>
                            }

                          </div>
                        </div>
                      </div>

                      {allDeposit && 
                        <section className='py-2 mt-3 px-4'>

                          <div className='pb-3 ps-2'>
                            <h5>All Deposit</h5>
                            <p className='light-text'>Total {depositCount} deposit made</p>
                          </div>

                          <div className='d-flex justify-content-end'>
                            <div className='pb-3'>
                              <input type="text" className="p-2 dashboard-search-input" placeholder="search..." value={allDepositSearch} onChange={(e) => setallDepositSearch(e.target.value)} />
                            </div>
                          </div>
                          <div className='dashboard-boxes border-radius-5px dahboard-table  dash-scroll-bar non-wrap-text'>
                            <div className=''>
                              <table>
                                <thead>
                                  <tr>
                                    <th className='sm-text-2 py-2'>Trnx/Coin</th>
                                    <th className='sm-text-2 py-2'>Network</th>
                                    <th className='sm-text-2'>Amount</th>
                                    <th className='sm-text-2'>Date</th>
                                    <th className='sm-text-2'>Status</th>

                                    <th></th>
                                  </tr>
                                </thead>

                                <tbody>
                                  {allDepositCurrentData.length > 0 ? (
                                    allDepositCurrentData.map((data) =>(
                                      <tr key={data.id}>
                                        <td className='py-2' >{data.transaction_id} <br /> <span className="sm-text-2">via {data.payment_method_details.name}</span></td>
                                        <td>{data.payment_method_details.network}</td>
                                        <td>{formatCurrency(data.amount)} USD</td>
                                        <td>{formatDate(data.created_at)}</td>
                                        <td><p p className={`dashboard-status ps-3 ${data.status === "pending" ? "pending" : "sucessfull"} ${data.status === "declined" && "failed"}`}>{formatName(data.status)}</p></td>     
                                        <td>
                                          <div className="d-flex justify-content-end">
                                            <button disabled={disablebutton} className='Button'>
                                              <p className='dashboard-table-arrow'><i class=" bi bi-chevron-right sm-text"></i></p>
                                            </button>
                                          </div>

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


                            {depositLoader && (
                              <div className="d-flex justify-content-center py-4">
                                <img src={spin} alt="" width='60px'/>
                              </div>  
                                              
                            )}
                          </div>

                          <div className="d-flex justify-content-end py-2">
                            <ReactPaginate
                              previousLabel={<FontAwesomeIcon icon={faChevronLeft}/>}
                              nextLabel={<FontAwesomeIcon icon={faChevronRight}/>}
                              pageCount={allDepositPageCount}
                              onPageChange={allDeposithandlePageClick}
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
                      {successDepositInformation &&              
                        <section className='py-2 mt-3 px-4'>

                          <div className='pb-3 ps-2'>
                            <h5>Confirmed Deposit</h5>
                            <p className='light-text'>Total {successDespositCount} deposit made</p>
                          </div>

                          <div className='d-flex justify-content-end'>
                            <div className='pb-3'>
                              <input type="text" className="p-2 dashboard-search-input" placeholder="search..." value={successfulDepositSearch} onChange={(e) => setSuccessfulDepositSearch(e.target.value)} />
                            </div>
                          </div>
                          <div className='dashboard-boxes border-radius-5px dahboard-table  dash-scroll-bar non-wrap-text'>
                            <div className=''>
                              <table>
                                <thead>
                                  <tr>
                                    <th className='sm-text-2 py-2'>Trnx/Coin</th>
                                    <th className='sm-text-2 py-2'>Network</th>
                                    <th className='sm-text-2'>Amount</th>
                                    <th className='sm-text-2'>Date</th>
                                    <th className='sm-text-2'>Status</th>

                                    <th></th>
                                  </tr>
                                </thead>

                                <tbody>
                                  {successfulDepositCurrentData.length > 0 ? (
                                    successfulDepositCurrentData.map((data) =>(
                                      <tr key={data.id}>
                                        <td className='py-2' >{data.transaction_id} <br /> <span className="sm-text-2">via {data.payment_method_details.name}</span></td>
                                        <td>{data.payment_method_details.network}</td>
                                        <td>{formatCurrency(data.amount)} USD</td>
                                        <td>{formatDate(data.created_at)}</td>
                                        <td><p p className={`dashboard-status ps-3 ${data.status === "pending" ? "pending" : "sucessfull"} ${data.status === "declined" && "failed"}`}>{formatName(data.status)}</p></td>     
                                        <td>
                                          <div className="d-flex justify-content-end">
                                            <button disabled={disablebutton} className='Button'>
                                              <p className='dashboard-table-arrow'><i class=" bi bi-chevron-right sm-text"></i></p>
                                            </button>
                                          </div>

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


                            {successfulDepositLoader && (
                              <div className="d-flex justify-content-center py-4">
                                <img src={spin} alt="" width='60px'/>
                              </div>  
                                              
                            )}
                          </div>

                          <div className="d-flex justify-content-end py-2">
                            <ReactPaginate
                              previousLabel={<FontAwesomeIcon icon={faChevronLeft}/>}
                              nextLabel={<FontAwesomeIcon icon={faChevronRight}/>}
                              pageCount={successfulDepositPageCount}
                              onPageChange={SuccessfulDeposithandlePageClick}
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

                      {pendingDeposit &&              
                        <section className='py-2 mt-3 px-4'>

                          <div className='pb-3 ps-2'>
                            <h5>Pending Deposit</h5>
                            <p className='light-text'>Total {pendingDespositCount} deposit made</p>
                          </div>

                          <div className='d-flex justify-content-end'>
                            <div className='pb-3'>
                              <input type="text" className="p-2 dashboard-search-input" placeholder="search..." value={pendingDepositSearch} onChange={(e) => setPendingDepositSearch(e.target.value)} />
                            </div>
                          </div>
                          <div className='dashboard-boxes border-radius-5px dahboard-table  dash-scroll-bar non-wrap-text'>
                            <div className=''>
                              <table>
                                <thead>
                                  <tr>
                                    <th className='sm-text-2 py-2'>Trnx/Coin</th>
                                    <th className='sm-text-2 py-2'>Network</th>
                                    <th className='sm-text-2'>Amount</th>
                                    <th className='sm-text-2'>Date</th>
                                    <th className='sm-text-2'>Status</th>

                                    <th></th>
                                  </tr>
                                </thead>

                                <tbody>
                                  {PendingDepositCurrentData.length > 0 ? (
                                    PendingDepositCurrentData.map((data) =>(
                                      <tr key={data.id}>
                                        <td className='py-2' >{data.transaction_id} <br /> <span className="sm-text-2">via {data.payment_method_details.name}</span></td>
                                        <td>{data.payment_method_details.network}</td>
                                        <td>{formatCurrency(data.amount)} USD</td>
                                        <td>{formatDate(data.created_at)}</td>
                                        <td><p p className={`dashboard-status ps-3 ${data.status === "pending" ? "pending" : "sucessfull"} ${data.status === "declined" && "failed"}`}>{formatName(data.status)}</p></td>     
                                        <td>
                                          <div className="d-flex justify-content-end">
                                            <button disabled={disablebutton} className='Button'>
                                              <p className='dashboard-table-arrow'><i class=" bi bi-chevron-right sm-text"></i></p>
                                            </button>
                                          </div>

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


                            {pendingDepositLoader && (
                              <div className="d-flex justify-content-center py-4">
                                <img src={spin} alt="" width='60px'/>
                              </div>  
                                              
                            )}
                          </div>

                          <div className="d-flex justify-content-end py-2">
                            <ReactPaginate
                              previousLabel={<FontAwesomeIcon icon={faChevronLeft}/>}
                              nextLabel={<FontAwesomeIcon icon={faChevronRight}/>}
                              pageCount={pendingDepositPageCount}
                              onPageChange={PendingDepositHandlePageClick}
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

                      {declinedDeposit &&
                        <section className='py-2 mt-3 px-4'>

                          <div className='pb-3 ps-2'>
                            <h5>Declined Deposit</h5>
                            <p className='light-text'>Total {declinedDepositCount} deposit made</p>
                          </div>

                          <div className='d-flex justify-content-end'>
                            <div className='pb-3'>
                              <input type="text" className="p-2 dashboard-search-input" placeholder="search..." value={declinedDepositSearch} onChange={(e) => setDeclinedDepositSearch(e.target.value)} />
                            </div>
                          </div>
                          <div className='dashboard-boxes border-radius-5px dahboard-table  dash-scroll-bar non-wrap-text'>
                            <div className=''>
                              <table>
                                <thead>
                                  <tr>
                                    <th className='sm-text-2 py-2'>Trnx/Coin</th>
                                    <th className='sm-text-2 py-2'>Network</th>
                                    <th className='sm-text-2'>Amount</th>
                                    <th className='sm-text-2'>Date</th>
                                    <th className='sm-text-2'>Status</th>

                                    <th></th>
                                  </tr>
                                </thead>

                                <tbody>
                                  {DeclinedCurrentData.length > 0 ? (
                                    DeclinedCurrentData.map((data) =>(
                                      <tr key={data.id}>
                                        <td className='py-2' >{data.transaction_id} <br /> <span className="sm-text-2">via {data.payment_method_details.name}</span></td>
                                        <td>{data.payment_method_details.network}</td>
                                        <td>{formatCurrency(data.amount)} USD</td>
                                        <td>{formatDate(data.created_at)}</td>
                                        <td><p p className={`dashboard-status ps-3 ${data.status === "pending" ? "pending" : "sucessfull"} ${data.status === "declined" && "failed"}`}>{formatName(data.status)}</p></td>     
                                        <td>
                                          <div className="d-flex justify-content-end">
                                            <button disabled={disablebutton} className='Button'>
                                              <p className='dashboard-table-arrow'><i class=" bi bi-chevron-right sm-text"></i></p>
                                            </button>
                                          </div>

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


                            {declinedDepositLoader && (
                              <div className="d-flex justify-content-center py-4">
                                <img src={spin} alt="" width='60px'/>
                              </div>  
                                              
                            )}
                          </div>

                          <div className="d-flex justify-content-end py-2">
                            <ReactPaginate
                              previousLabel={<FontAwesomeIcon icon={faChevronLeft}/>}
                              nextLabel={<FontAwesomeIcon icon={faChevronRight}/>}
                              pageCount={declinedDepositPageCount}
                              onPageChange={DeclinedDepositHandlePageClick}
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

            {/* <div>
              <div className="d-flex justify-content-center  align-items-center height-90vh">
                 <img src={spin} alt="" width='60px'/>
               </div>                         
            </div> */}


        </div>
      </div>

      <div className='py-5'>
        <DashboardFooter />
      </div>



    </div>
  )
}