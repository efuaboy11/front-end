import '../../../css/dashboardCss/dashboard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AuthContext from "../../../context/AuthContext";
import { useContext, useEffect, useState } from 'react';
import { AdminDashFrame } from '../../../component/adminDashFrame';
import ReactPaginate  from "react-paginate"
import { Link, useNavigate } from 'react-router-dom';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import CircularProgress from '@mui/material/CircularProgress';
import FloatingAlert from '../../../component/alert';
import spin from '../../../img/Spin.gif'
import AllDataContext from '../../../context/Alldata';
import { DashboardFooter } from '../../../component/dashbaordFooter';
import { ClientDashFrame } from '../../../component/ClientDashFrame';

export const ClientPaymentOptions = () =>{
  const { authTokens, 
    messages,
    alertVisible,
    setAlertVisible,
    isSuccess,
    showAlert,
    setMessage,
    setIsSuccess,


    OnbodyClick,
    formatDate,
    formatCurrency,
    formatName,
    disablebutton, 
    setDisablebutton,
    roundUp,

  } = useContext(AuthContext)

  const {

    paymentOptionsCount,
    paymentOptionsData,
    paymentOptionsLoader,
    paymentOptionSearch,
    setPaymentOptionSearch,
    PaymentOptionsFunction,
    filterPaymentOptions,

  } = useContext(AllDataContext)
  


  useEffect(() =>{
    if(!paymentOptionSearch){
      PaymentOptionsFunction()
    }else if(paymentOptionSearch){
      filterPaymentOptions()
    }
  }, [paymentOptionSearch])


  const [currentPage, setCurrentPage] = useState(0)

  const navigate  = useNavigate()

  const dataPerPage = 10;
  const pageCount = Math.ceil(paymentOptionsData.length / dataPerPage)

  const currentData = paymentOptionsData.slice(
    currentPage * dataPerPage,
    (currentPage + 1) * dataPerPage
  )

  const handlePageClick = ({selected}) =>{
    setCurrentPage(selected)
  }


  
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


          <section className='py-4'>
            <div className="d-flex justify-content-between align-items-center height-100">
              <div>
                <div>
                  <p className='dashboard-header'>Payment Method</p>
                  <p className='light-text'>Total {paymentOptionsCount} Payment Method</p>
                </div>
              </div>
            </div>
          </section>



          <section className='py-5 mt-3'>
            <div className='d-flex justify-content-end'>
              <div className='pb-3'>
                <input type="text" className="p-2 dashboard-search-input" placeholder="search..." value={paymentOptionSearch} onChange={(e) => setPaymentOptionSearch(e.target.value)} />
              </div>
            </div>
            <div className='dashboard-boxes border-radius-5px dahboard-table  dash-scroll-bar non-wrap-text'>
              <div className=''>
                <table>
                  <thead>
                    <tr>
                      <th className='sm-text-2 py-2'>Name</th>
                      <th className='sm-text-2'>Wallet Address</th>
                      <th className='sm-text-2'>Network</th>
                      <th className='sm-text-2'>Wallet Type</th>
                    </tr>
                  </thead>

                  <tbody>
                    {currentData.length > 0 ? (
                      currentData.map((data) =>(
                        <tr key={data.id}> 
                          <td className='py-3'>{formatName(data.name)}</td>
                          <td>{data.wallet_address}</td>
                          <td>{data.network}</td>
                          <td>{data.type}</td>
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


              {paymentOptionsLoader && (
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

          </section>
        </div>
      </div>

      <div>
        <DashboardFooter />
      </div>


    </div>
  )
}