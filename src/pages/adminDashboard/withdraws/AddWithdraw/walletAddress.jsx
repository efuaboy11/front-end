import '../../../../css/dashboardCss/dashboard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AuthContext from "../../../../context/AuthContext";
import { useContext, useEffect, useState } from 'react';
import { AdminDashFrame } from '../../../../component/adminDashFrame';
import ReactPaginate  from "react-paginate"
import { Link, useNavigate } from 'react-router-dom';
import { faChevronLeft, faChevronRight, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import CircularProgress from '@mui/material/CircularProgress';
import FloatingAlert from '../../../../component/alert';
import spin from '../../../../img/Spin.gif'
import { selectClasses } from '@mui/material';
import AllDataContext from '../../../../context/Alldata';
import '../../../../css/dashboardCss/adminDahboardCss/kyc.css'
import { useForm } from 'react-hook-form';
import { DashboardFooter } from '../../../../component/dashbaordFooter';

export const WalletWithdraw = () =>{
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
    formatDate,
    formatFirstName,
    formatNameAllCaps,


  } = useContext(AuthContext)



  const [walletAddressData, setWalletAddressData] = useState([])
  const [walletAddressLoader, setWalletAddressLoader] = useState(true)
  const [walletAddressCount, setWalletAddressCount] = useState(0)
  const [userID, setUserID] = useState(null)







  const [currentPage, setCurrentPage] = useState(0)
  const [selectedDataId, setSelectedDataId] = useState(null);
  const [lastData, setLastData] = useState(null)
  const [secondToLastData, setSecondToLastData] = useState(null);
  const [showDropdownMenu, setShowDropdownMenu] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [loader, setLoader] = useState(false)

  

  const navigate  = useNavigate()

  const dataPerPage = 10;
  const pageCount = Math.ceil(walletAddressData.length / dataPerPage)

  const currentData = walletAddressData.slice(
    currentPage * dataPerPage,
    (currentPage + 1) * dataPerPage
  )

  const handlePageClick = ({selected}) =>{
    setCurrentPage(selected)
  }
  const selectDetails = (id) =>{
    setSelectedDataId(selectedDataId === id ? null : id);
    sessionStorage.setItem('paymentMethodID', id)

  }



  const WalletAddressFunction = async() =>{
    let response = await fetch(`http://127.0.0.1:8000/api/wallet-address/filter/?user=${userID}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens.access}`
      },
    })

    const data = await response.json()
    if(response.ok){
      if(Array.isArray(data) && data.length > 0){
        setWalletAddressCount(data.length)
      }
      const sortedData = data.sort((a, b) => b.id - a.id);
      setWalletAddressData(sortedData)
      setWalletAddressLoader(false)

    }else{
      setWalletAddressLoader(false)
    }



  }

  useEffect(() =>{
    WalletAddressFunction()
  }, [!userID])

  useEffect(() =>{
    setUserID(sessionStorage.getItem('userID'))
  }, [])


  useEffect(() =>{
    if(currentData.length > 2){
      setLastData(currentData[currentData.length - 1])
      setSecondToLastData(currentData[currentData.length -2])

      
    }else{
      setLastData(null)
      setSecondToLastData(null)
    }
  }, [currentData]) 



  
  return(
    <div>
      <div className="position-sticky1">
        <AdminDashFrame />
      </div>

      <div className="main-content" onClick={OnbodyClick}>
        <div className="container-xl pb-5">
        <div>
            <FloatingAlert
              message={messages}
              isVisible={alertVisible}
              onClose={() => setAlertVisible(false)}
              successs={isSuccess}
            />
          </div>
          <section className='py-4'>
            <div className="d-block d-md-flex  justify-content-between align-items-center height-100">
              <div>
                <div>
                  <p className='dashboard-header'>Wallet Address</p>
                  <p className='light-text'>Total {walletAddressCount} wallet address  for funds withdrawal.</p>
                </div>
              </div>
            </div>
          </section>

        
          {currentData.length > 0 ? (
            <section className='py-5 mt-3'>
              <div className='dashboard-boxes border-radius-5px dahboard-table  dash-scroll-bar non-wrap-text'>
                <div className=''>
                  <table>
                    <thead>
                      <tr>
                        <th className='sm-text-2 py-2'>Name</th>
                        <th className='sm-text-2 py-2'>Label</th>
                        <th className='sm-text-2'>Wallet Address</th>
                        <th className='sm-text-2'>Coin</th>
                        <th className='sm-text-2'>Network</th>
                        <th className='sm-text-2'>Added</th>
                        <th></th>
                      </tr>
                    </thead>

                    <tbody>
                      {currentData.length > 0 ? (
                        currentData.map((data) =>(
                          <tr key={data.id} className={selectedDataId === data.id ? 'dashboard-active-row' : ''}> 
                            <td className='py-2'>
                              <div className="d-flex">
                                {data.users_details.profile_photo === null ? (
                                  <div className="position-relative1">
                                    <h6 className="admin-home-user-table-icon">{shortName(data.users_details.full_name)}</h6>
                                    <p className={`admin-home-user-table-icon-status ${data.users_details.status === "verified" ? "sucessfull-bg" : "pending"}`}></p>
                                  </div>
                                  ): (
                                    <div className="position-relative1">
                                      <img className='admin-home-user-table-img' src={data.users_details.profile_photo} alt="" />
                                      <p className={`admin-home-user-table-icon-status ${data.users_details.status === "verified" ? "sucessfull-bg" : "pending"}`}></p>
                                    </div>


                                  )
                                }
    
                                
                                <div className='ms-1'>
                                  {formatName(data.users_details.full_name)} <br /> <span className="sm-text-2">{data.users_details.email}</span>
                                </div>

                              </div>    
                            </td>

                            <td>{formatName(data.label)}</td>
                            <td>{data.walletAddress}</td>
                            <td>{formatName(data.coin)}</td>
                            <td>{formatName(data.network)}</td>               
                            <td>{formatDate(data.created_at)}</td>
                            <td><input className='cursor-pointer' type="checkbox" checked={selectedDataId === data.id ? true : false} onClick={() => selectDetails(data.id)}/></td>
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


                {walletAddressLoader && (
                  <div className="d-flex justify-content-center py-4">
                    <img src={spin} alt="" width='60px'/>
                  </div>  
                                  
                )}
              </div>

              <div className="d-flex justify-content-end py-2">
                <ReactPaginate
                  previousLabel={<FontAwesomeIcon icon={faChevronLeft}/>}
                  nextLabel={<FontAwesomeIcon icon={faChevronRight}/>}
                  pageCount={pageCount}
                  onPageChange={handlePageClick}
                  containerClassName={"pagination"}
                  previousLinkClassName={"pagination__link"}
                  nextLinkClassName={"pagination__link"}
                  disabledClassName={"pagination__link--disabled"}
                  activeClassName={"pagination__link--active"}
                  pageRangeDisplayed={5}
                  marginPagesDisplayed={1} 
                />
              </div>

              <div className='d-flex justify-content-end'>
                <div className='pt-3'>
                  <Link className='Link' to='/admin/add-withdraw' >
                    <button className='Button' disabled={selectedDataId ? false :  true}>
                      <div className={`${selectedDataId ? 'dashboard-btn' : 'disable-btn'} d-inline-block py-2 px-3`}>


                        <div className="d-flex px-3">
                          <p>Next</p>
                          <i class="bi bi-arrow-right ps-2"></i>
                        </div>
                      </div>
                    </button>
                  </Link>
                </div>
              </div>

            </section>
          ) : (
            <div className='dashboard-boxes border-radius-5px'>
              {walletAddressLoader ? (
                <div className="d-flex justify-content-center py-5 my-5">
                  <img src={spin} alt="" width='60px'/>
                </div>  
              ) : (
                <div className="row justify-content-center py-5">
                  <div className="col-11 col-md-6">
                    <div className='text-center'>
                      <div className="d-inline-block border-radius-50 red-background p-3 mb-4">
                        <FontAwesomeIcon className='xl-text' icon={faTriangleExclamation}/>   
                      </div>                 
                      <h2>No Avaliable Card </h2>
                      <p className='light-text sm-text'>You have yet to add any card. Click on the button to <br /> add card details</p>
                    </div>

                    <div>
                      <div className='pt-3'>
                        <Link className='Link' to='/admin/payment-account/wallet-address/add' >
                          <div className='dashboard-btn width-100 py-2 px-3'>


                            <div className="py-1 d-flex justify-content-center">
                              <i class="bi bi-plus-lg pe-2"></i>
                              <p>Add Wallet</p>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              
            </div>
          )}


        </div>
      </div>

      <div>
        <DashboardFooter />
      </div>


    </div>
  )
}