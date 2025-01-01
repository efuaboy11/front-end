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
import { ClientDashFrame } from '../../../../component/ClientDashFrame';
import { ProcessingSpiner } from '../../../../component/spin';

export const ClientBankCardWithdraw = () =>{
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




  const [bankCardCount, setBankCardCount] = useState(0)
  const [bankCardData, setBankCardData] = useState([])
  const [bankCardLoader, setBankCardLoader] = useState(true)
  const [userID, setUserID] = useState(null)
  const [loader, setLoader] = useState(false)
  const [processingText, setProcessingText] = useState('Processing')







  const [currentPage, setCurrentPage] = useState(0)
  const [selectedDataId, setSelectedDataId] = useState(null);


  

  const navigate  = useNavigate()

  const dataPerPage = 10;
  const pageCount = Math.ceil(bankCardData.length / dataPerPage)

  const currentData = bankCardData.slice(
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


  const BankCardFunction = async() =>{


      let response = await fetch(`http://127.0.0.1:8000/api/bank-card/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens.access}`
        },
      })


      const data = await response.json()
      if(response.ok){
        if(Array.isArray(data) && data.length > 0){
          setBankCardCount(data.length)
        }
        const sortedData = data.sort((a, b) => b.id - a.id);
        setBankCardData(sortedData)
        setBankCardLoader(false)

      }else{
        setBankCardLoader(false)
      }




  }

  const navigateReviewDetails = () =>{
    setProcessingText("Evaluating")
    sessionStorage.setItem('urlLink', '/dashboard/withdraw/bank-card/')
    setLoader(true)
    const timer = setTimeout(() => {
      navigate('/dashboard/withdraw/review-details/')
      setLoader(false)
    }, 3000);
    return () => clearTimeout(timer);
  }

  useEffect(() => {
    if (loader) {
      const timer = setTimeout(() => {
        setLoader(false);
      }, 3000); // Reset after 1 second

      return () => clearTimeout(timer); // Cleanup the timer to avoid memory leaks
    }
  }, [loader]);

  useEffect(() =>{
    BankCardFunction()
  }, [])


 



  
  return(
    <div>
      <div className="position-sticky1">
        <ClientDashFrame />
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

          {loader &&
            <ProcessingSpiner text={processingText}/>
          }

          <section className='py-4'>
            <div className="d-block d-md-flex  justify-content-between align-items-center height-100">
              <div>
                <div>
                  <Link to='/dashboard/withdraw/payment-options/' className='light-link'><i class="bi bi-arrow-left pe-2"></i> Previous Page</Link>
                  <p className='dashboard-header'>Bank Card</p>
                  <p className='light-text'>Total {bankCardCount} bank card  for funds withdrawal.</p>
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
                        <th className='sm-text-2'>Card Holder</th>
                        <th className='sm-text-2'>Card Number</th>
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
                            <td>{formatName(data.name_on_card)}</td>
                            <td>{data.card_number}</td>               
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


                {bankCardLoader && (
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
                  <button onClick={navigateReviewDetails} className='Button' disabled={selectedDataId ? false :  true}>
                    <div className={`${selectedDataId ? 'dashboard-btn' : 'disable-btn'} d-inline-block py-2 px-3`}>


                      <div className="d-flex px-3">
                        <p>Next</p>
                        <i class="bi bi-arrow-right ps-2"></i>
                      </div>
                    </div>
                  </button>
                </div>
              </div>

            </section>
          ) : (
            
            <div className='dashboard-boxes border-radius-5px'>
              {bankCardLoader ? (
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
                        <Link className='Link' to='/admin/payment-account/bank-card/add' >
                          <div className='dashboard-btn width-100 py-2 px-3'>


                            <div className="py-1 d-flex justify-content-center">
                              <i class="bi bi-plus-lg pe-2"></i>
                              <p>Add Card</p>
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