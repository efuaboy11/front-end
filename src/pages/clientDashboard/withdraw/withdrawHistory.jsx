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

export const WithdrawHistory = () =>{

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
    withdrawCount,
    withdrawData,
    setWithdrawData,
    withdrawLoader,
    allWithdrawSearch,
    setallWithdrawSearch,
    WithdrawFunction,
    filterWithdraws,


    SuccessWithdrawCount,
    successfulWithdrawData,
    setSuccessfulWithdrawData,
    successfulWithdrawLoader,
    successfulWithdrawSearch,
    setSuccessWithdrawSearch,
    SuccessfulWithdrawFunction,
    filterSuccessfulWithdraws,


    pendingWithdrawCount,
    pendingWithdrawData,
    setPendingWithdrawData,
    pendingWithdrawLoader,
    pendingWithdrawSearch,
    setPendingWithdrawSearch,
    PendingWithdrawFunction,
    filterPendingWithdraws,

    declinedWithdrawCount,
    declinedWithdrawData,
    setDeclinedWithdrawData,
    declinedWithdrawLoader,
    declinedWithdrawSearch,
    setDeclinedWithdrawSearch,
    DeclinedWithdrawFunction,
    filterDeclinedWithdraws,

  } = useContext(AllDataContext)

  useEffect(() =>{
    if(!successfulWithdrawSearch){
      SuccessfulWithdrawFunction()
    }else if(successfulWithdrawSearch){
      filterSuccessfulWithdraws()
    }
  }, [successfulWithdrawSearch])

  useEffect(() =>{
    if(!allWithdrawSearch){
      WithdrawFunction()
    }else if(allWithdrawSearch){
      filterWithdraws()
    }
  }, [allWithdrawSearch])

  useEffect(() =>{
    if(!pendingWithdrawSearch){
      PendingWithdrawFunction()
    }else if(pendingWithdrawSearch){
      filterPendingWithdraws()
    }
  }, [pendingWithdrawSearch])

  useEffect(() =>{
    if(!declinedWithdrawSearch){
      DeclinedWithdrawFunction()
    }else if(declinedWithdrawSearch){
      filterDeclinedWithdraws()
    }
  }, [declinedWithdrawSearch])



  const navigate  = useNavigate()

  const [menu, setMenu] = useState(false)



  const [allWithdraw, setAllWithdraw] = useState(true)
  const [successWithdraw, setSuccessWithdraw] = useState(false)
  const [pendingWithdraw ,setPendingWithdraw] = useState(false)
  const [declinedWithdraw, setDeclinedWithdraw] = useState(false)


  const [currentTab, setCurrentTab] = useState('')
  const [currentTabIcon, setCurrentTabIcon] = useState(null)

  useEffect (() =>{
    const checkCurrentTab = () =>{
      if(allWithdraw){
        setCurrentTab('All Withraw')
        setCurrentTabIcon( <p className='mx-2 dashboard-client-deposit-history-boxes'>{withdrawCount}</p>)
      }
      if(successWithdraw){
        setCurrentTab('Confirmed')
        setCurrentTabIcon (<p className='mx-2 dashboard-client-deposit-history-boxes'>{SuccessWithdrawCount}</p>)
      }
      if(pendingWithdraw){
        setCurrentTab('Pending')
        setCurrentTabIcon( <p className='mx-2 dashboard-client-deposit-history-boxes'>{pendingWithdrawCount}</p>)
      }
      if(declinedWithdraw){
        setCurrentTab('Declined')
        setCurrentTabIcon( <p className='mx-2 dashboard-client-deposit-history-boxes'>{declinedWithdrawCount}</p>)
      }

    }
    checkCurrentTab()
  }, [allWithdraw, successWithdraw, pendingWithdraw, declinedWithdraw])





  const [allWithdrawCurrentPage, setAllWithdrawCurrentPage] = useState(0)
  const allWithdrawdataPerPage = 5;
  const allWithdrawPageCount = Math.ceil(withdrawData.length / allWithdrawdataPerPage)

  const [successfulWithdrawCurrentPage, setSuccessfulWithdrawCurrentPage] = useState(0)
  const successfulWithdrawdataPerPage = 5;
  const successfulWithdrawPageCount = Math.ceil(successfulWithdrawData.length / successfulWithdrawdataPerPage)

  const [pendingWithdrawCurrentPage, setPendingWithdrawCurrentPage] = useState(0)
  const pendingWithdrawdataPerPage = 5
  const pendingWithdrawPageCount = Math.ceil(pendingWithdrawData.length / pendingWithdrawdataPerPage)

  const [declinedWithdrawCurrentPage, setDeclinedWithdrawCurrentPage] = useState(0)
  const declinedWithdrawDataPerPage = 5
  const declinedWithdrawPageCount = Math.ceil(declinedWithdrawData.length / declinedWithdrawDataPerPage)
 


  const toogleMenu = () =>{
    setMenu(!menu)
  }
  const toogleAllWithdraw = () =>{
    if(!allWithdraw){
      setAllWithdraw(!allWithdraw)
    }
    setPendingWithdraw(false)
    setSuccessWithdraw(false)
    setDeclinedWithdraw(false)

  }
  const toogleSuccessfulWithdraw = () =>{
    if(!successWithdraw){
      setSuccessWithdraw(!successWithdraw)
    }
    setAllWithdraw(false)
    setPendingWithdraw(false)
    setDeclinedWithdraw(false)

  }

  const tooglePendingWithdraw = () =>{
    if(!pendingWithdraw){
      setPendingWithdraw(!pendingWithdraw)
    }
    setAllWithdraw(false)
    setSuccessWithdraw(false)
    setDeclinedWithdraw(false)

  }

  const toogleDeclinedWithdraw = () =>{
    if(!declinedWithdraw){
      setDeclinedWithdraw(!declinedWithdraw)
    }
    setAllWithdraw(false)
    setPendingWithdraw(false)
    setSuccessWithdraw(false)

  }



  const allWithdrawCurrentData = withdrawData.slice(
    allWithdrawCurrentPage * allWithdrawdataPerPage,
    (allWithdrawCurrentPage + 1) * allWithdrawdataPerPage
  )
  const allWithdrawhandlePageClick = ({selected}) =>{
    setAllWithdrawCurrentPage(selected)
  }

  const successfulWithdrawCurrentData = successfulWithdrawData.slice(
    successfulWithdrawCurrentPage * successfulWithdrawdataPerPage,
    (successfulWithdrawCurrentPage + 1) * successfulWithdrawdataPerPage
  )
  const SuccessfulWithdrawthandlePageClick = ({selected}) =>{
    setSuccessfulWithdrawCurrentPage(selected)
  }

  const PendingWithdrawCurrentData = pendingWithdrawData.slice(
    pendingWithdrawCurrentPage * pendingWithdrawdataPerPage,
    (pendingWithdrawCurrentPage + 1) * pendingWithdrawdataPerPage

  )

  const PendingWithdrawHandlePageClick = ({selected}) =>{
    setPendingWithdrawCurrentPage(selected)
  }

  const DeclinedCurrentData = declinedWithdrawData.slice(
    declinedWithdrawCurrentPage * declinedWithdrawDataPerPage,
    (declinedWithdrawCurrentPage + 1) * declinedWithdrawDataPerPage
  )

  const DeclinedWithdrawHandlePageClick = ({selected}) =>{
    setDeclinedWithdrawCurrentPage(selected)
  }


  const IndividualWithdraw = async(id) =>{
    setDisablebutton(true)
    let response = await fetch(`http://127.0.0.1:8000/api/withdraw/${id}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens.access}`
      }
      
    })
    const data = await response.json()
    sessionStorage.setItem('IndividualData', JSON.stringify(data))

    if (response.ok){
      navigate(`/dashboard/withdraw/history/${data.transaction_id}`)
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
                  <div>
                    <div>
                      <p className='light-text'>Transactions</p>
                      <p className='dashboard-header'>Withdraw History</p>
                    </div>
                  </div>

                    <div>
                      <div className='pt-3'>
                        <Link to='/dashboard/add-withdraw/'  className='dashboard-btn py-2 px-3'>
                          <i class="bi bi-plus-lg pe-2"></i>
                          Withdraw Spot
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
                              <div className='cursor-pointer' onClick={toogleAllWithdraw}>
                                <div className={`${allWithdraw ? 'active-line-container' : 'd-none'} `}>
                                  <div className='active-line'></div>
                                </div>
                                <div className={`pe-5 d-flex ${allWithdraw ? 'purple-text' : ''}`}>
                                  <p>All Withdraw</p>
                                  <p className='ms-2 dashboard-client-deposit-history-boxes'>{withdrawCount}</p>
                                </div>
                              </div>

                              <div className="cursor-pointer" onClick={toogleSuccessfulWithdraw}>
                                <div className={`${successWithdraw ? 'active-line-container' : 'd-none'}  `}>
                                  <div className='active-line'></div>
                                </div>
                                <div className={`pe-5 d-flex ${successWithdraw ? 'purple-text' : ''}`}>
                                  <p >Confirmed Withdraw</p>
                                  <p className='ms-2 dashboard-client-deposit-history-boxes'>{SuccessWithdrawCount}</p>
                                </div>
                              </div>

                              <div className="cursor-pointer" onClick={tooglePendingWithdraw}>
                                <div className={`${pendingWithdraw ? 'active-line-container' : 'd-none'}  `}>
                                  <div className='active-line'></div>
                                </div>
                                <div className={`pe-5 d-flex ${pendingWithdraw ? 'purple-text' : ''}`}>
                                  <p>Pending Withdraw</p>
                                  <p className='ms-2 dashboard-client-deposit-history-boxes'>{pendingWithdrawCount}</p>
                                </div>
                              </div>
                              <div className="cursor-pointer" onClick={toogleDeclinedWithdraw}>
                                <div className={`${declinedWithdraw ? 'active-line-container' : 'd-none'}  `}>
                                  <div className='active-line'></div>
                                </div>
                                <div className={`pe-5 d-flex ${declinedWithdraw ? 'purple-text' : ''}`}>
                                  <p>Declined Withdraw</p>
                                  <p className='ms-2 dashboard-client-deposit-history-boxes'>{declinedWithdrawCount}</p>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className='user-details-menu-btn'>
                            <i onClick={toogleMenu} class="bi bi-three-dots cursor-pointer"></i>
                            {menu && 
                              <div className={`user-details-table-menu`}>
                                <div>
                                  <p className='dashboard-table-menu-btn cursor-pointer' onClick={toogleAllWithdraw}>
                                    <button disabled={disablebutton} className='Button py-2 d-flex'>
                                      <div className={`d-flex`}>
                                        <p className='me-2 dashboard-client-deposit-history-boxes'>{withdrawCount}</p>
                                        <p>All</p>
                                      </div>
                                    </button>
                                  </p>

                                  <p className='dashboard-table-menu-btn cursor-pointer' onClick={toogleSuccessfulWithdraw}>
                                    <button disabled={disablebutton} className='Button py-2 d-flex'>
                                      <div className={`d-flex`}>
                                        <p className='me-2 dashboard-client-deposit-history-boxes'>{SuccessWithdrawCount}</p>
                                        <p >Confirmed </p>
                                      </div>
                                    </button>
                                  </p>

                                  <p className='dashboard-table-menu-btn cursor-pointer' onClick={tooglePendingWithdraw}>
                                    <button disabled={disablebutton} className='Button py-2 d-flex'>
                                      <div className={`d-flex`}>
                                        <p className='me-2 dashboard-client-deposit-history-boxes'>{pendingWithdrawCount}</p>
                                        <p>Pending </p>
                                      </div>
                                    </button>
                                  </p>

                                  <p className='dashboard-table-menu-btn cursor-pointer' onClick={toogleDeclinedWithdraw}>
                                    <button disabled={disablebutton} className='Button py-2 d-flex'>
                                      <div className={`d-flex`}>
                                        <p className='me-2 dashboard-client-deposit-history-boxes'>{declinedWithdrawCount}</p>
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

                      {allWithdraw && 
                        <section className='py-2 mt-3 px-4'>

                          <div className='pb-3 ps-2'>
                            <h5>All Withdraw</h5>
                            <p className='light-text'>Total {withdrawCount} withdraw made</p>
                          </div>

                          <div className='d-flex justify-content-end'>
                            <div className='pb-3'>
                              <input type="text" className="p-2 dashboard-search-input" placeholder="search..." value={allWithdrawSearch} onChange={(e) => setallWithdrawSearch(e.target.value)} />
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
                                  {allWithdrawCurrentData.length > 0 ? (
                                    allWithdrawCurrentData.map((data) =>(
                                      <tr key={data.id}>
                                        <td className='py-2' >{data.transaction_id} <br /> <span className="sm-text-2">via {data.payment_method_name}</span></td>
                                        <td>{data.payment_method_details.network}</td>
                                        <td>{formatCurrency(data.amount)} USD</td>
                                        <td>{formatDate(data.created_at)}</td>
                                        <td><p p className={`dashboard-status ps-3 ${data.status === "pending" ? "pending" : "sucessfull"} ${data.status === "declined" && "failed"}`}>{formatName(data.status)}</p></td>     
                                        <td>
                                          <div className="d-flex justify-content-end">
                                            <button disabled={disablebutton} className='Button' onClick={() => IndividualWithdraw(data.id)}>
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


                            {withdrawLoader && (
                              <div className="d-flex justify-content-center py-4">
                                <img src={spin} alt="" width='60px'/>
                              </div>  
                                              
                            )}
                          </div>

                          <div className="d-flex justify-content-end py-2">
                            <ReactPaginate
                              previousLabel={<FontAwesomeIcon icon={faChevronLeft}/>}
                              nextLabel={<FontAwesomeIcon icon={faChevronRight}/>}
                              pageCount={allWithdrawPageCount}
                              onPageChange={allWithdrawhandlePageClick}
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
                      {successWithdraw &&              
                        <section className='py-2 mt-3 px-4'>

                          <div className='pb-3 ps-2'>
                            <h5>Confirmed Withdraw</h5>
                            <p className='light-text'>Total {SuccessWithdrawCount} withdraw made</p>
                          </div>

                          <div className='d-flex justify-content-end'>
                            <div className='pb-3'>
                              <input type="text" className="p-2 dashboard-search-input" placeholder="search..." value={successfulWithdrawSearch} onChange={(e) => setSuccessWithdrawSearch(e.target.value)} />
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
                                  {successfulWithdrawCurrentData.length > 0 ? (
                                    successfulWithdrawCurrentData.map((data) =>(
                                      <tr key={data.id}>
                                        <td className='py-2' >{data.transaction_id} <br /> <span className="sm-text-2">via {data.payment_method_name}</span></td>
                                        <td>{data.payment_method_details.network}</td>
                                        <td>{formatCurrency(data.amount)} USD</td>
                                        <td>{formatDate(data.created_at)}</td>
                                        <td><p p className={`dashboard-status ps-3 ${data.status === "pending" ? "pending" : "sucessfull"} ${data.status === "declined" && "failed"}`}>{formatName(data.status)}</p></td>     
                                        <td>
                                          <div className="d-flex justify-content-end">
                                            <button disabled={disablebutton} className='Button' onClick={() => IndividualWithdraw(data.id)}>
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


                            {successfulWithdrawLoader && (
                              <div className="d-flex justify-content-center py-4">
                                <img src={spin} alt="" width='60px'/>
                              </div>  
                                              
                            )}
                          </div>

                          <div className="d-flex justify-content-end py-2">
                            <ReactPaginate
                              previousLabel={<FontAwesomeIcon icon={faChevronLeft}/>}
                              nextLabel={<FontAwesomeIcon icon={faChevronRight}/>}
                              pageCount={successfulWithdrawPageCount}
                              onPageChange={SuccessfulWithdrawthandlePageClick}
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

                      {pendingWithdraw &&              
                        <section className='py-2 mt-3 px-4'>

                          <div className='pb-3 ps-2'>
                            <h5>Pending Withdraw</h5>
                            <p className='light-text'>Total {pendingWithdrawCount} withdraw made</p>
                          </div>

                          <div className='d-flex justify-content-end'>
                            <div className='pb-3'>
                              <input type="text" className="p-2 dashboard-search-input" placeholder="search..." value={pendingWithdrawSearch} onChange={(e) => setPendingWithdrawSearch(e.target.value)} />
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
                                  {PendingWithdrawCurrentData.length > 0 ? (
                                    PendingWithdrawCurrentData.map((data) =>(
                                      <tr key={data.id}>
                                        <td className='py-2' >{data.transaction_id} <br /> <span className="sm-text-2">via {data.payment_method_name}</span></td>
                                        <td>{data.payment_method_details.network}</td>
                                        <td>{formatCurrency(data.amount)} USD</td>
                                        <td>{formatDate(data.created_at)}</td>
                                        <td><p p className={`dashboard-status ps-3 ${data.status === "pending" ? "pending" : "sucessfull"} ${data.status === "declined" && "failed"}`}>{formatName(data.status)}</p></td>     
                                        <td>
                                          <div className="d-flex justify-content-end" onClick={() => IndividualWithdraw(data.id)}>
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


                            {pendingWithdrawLoader && (
                              <div className="d-flex justify-content-center py-4">
                                <img src={spin} alt="" width='60px'/>
                              </div>  
                                              
                            )}
                          </div>

                          <div className="d-flex justify-content-end py-2">
                            <ReactPaginate
                              previousLabel={<FontAwesomeIcon icon={faChevronLeft}/>}
                              nextLabel={<FontAwesomeIcon icon={faChevronRight}/>}
                              pageCount={pendingWithdrawPageCount}
                              onPageChange={PendingWithdrawHandlePageClick}
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

                      {declinedWithdraw &&
                        <section className='py-2 mt-3 px-4'>

                          <div className='pb-3 ps-2'>
                            <h5>Declined Withdraw</h5>
                            <p className='light-text'>Total {declinedWithdrawCount} withdraw made</p>
                          </div>

                          <div className='d-flex justify-content-end'>
                            <div className='pb-3'>
                              <input type="text" className="p-2 dashboard-search-input" placeholder="search..." value={declinedWithdrawSearch} onChange={(e) => setDeclinedWithdrawSearch(e.target.value)} />
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
                                        <td className='py-2' >{data.transaction_id} <br /> <span className="sm-text-2">via {data.payment_method_name}</span></td>
                                        <td>{data.payment_method_details.network}</td>
                                        <td>{formatCurrency(data.amount)} USD</td>
                                        <td>{formatDate(data.created_at)}</td>
                                        <td><p p className={`dashboard-status ps-3 ${data.status === "pending" ? "pending" : "sucessfull"} ${data.status === "declined" && "failed"}`}>{formatName(data.status)}</p></td>     
                                        <td>
                                          <div className="d-flex justify-content-end">
                                            <button disabled={disablebutton} className='Button' onClick={() => IndividualWithdraw(data.id)}>
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


                            {declinedWithdrawLoader && (
                              <div className="d-flex justify-content-center py-4">
                                <img src={spin} alt="" width='60px'/>
                              </div>  
                                              
                            )}
                          </div>

                          <div className="d-flex justify-content-end py-2">
                            <ReactPaginate
                              previousLabel={<FontAwesomeIcon icon={faChevronLeft}/>}
                              nextLabel={<FontAwesomeIcon icon={faChevronRight}/>}
                              pageCount={declinedWithdrawPageCount}
                              onPageChange={DeclinedWithdrawHandlePageClick}
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