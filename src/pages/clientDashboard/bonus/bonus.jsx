import '../../../css/dashboardCss/dashboard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AuthContext from "../../../context/AuthContext";
import { useContext, useEffect, useState } from 'react';
import { AdminDashFrame } from '../../../component/adminDashFrame';
import ReactPaginate  from "react-paginate"
import { Link, useNavigate } from 'react-router-dom';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import FloatingAlert from '../../../component/alert';
import spin from '../../../img/Spin.gif'
import AllDataContext from '../../../context/Alldata';
import { useForm } from 'react-hook-form';
import { ClientDashFrame } from '../../../component/ClientDashFrame';
import { DashboardFooter } from '../../../component/dashbaordFooter';

export const ClientBonus = () =>{
  const { authTokens, 
    messages,
    alertVisible,
    setAlertVisible,
    isSuccess,
    showAlert,
    setMessage,
    setIsSuccess,


    OnbodyClick,
    formatDateTime,
    formatCurrency,
    formatName,
    disablebutton, 
    setDisablebutton,


  } = useContext(AuthContext)


  const {

    bonusData,
    bonusLoader,
    BonusFunction,
    totalBonus,

  } = useContext(AllDataContext)

  useEffect(() =>{

    BonusFunction()
   
  }, [])


  const [currentPage, setCurrentPage] = useState(0)
  
  const navigate  = useNavigate()

  const dataPerPage = 10;
  const pageCount = Math.ceil(bonusData.length / dataPerPage)

  const currentData = bonusData.slice(
    currentPage * dataPerPage,
    (currentPage + 1) * dataPerPage
  )

  const handlePageClick = ({selected}) =>{
    setCurrentPage(selected)
  }




  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();
  
  return(
    <div>
      <div className="position-sticky1">
        <ClientDashFrame />
      </div>

      <div className="main-content" onClick={OnbodyClick}>
        <div className="container-xl">
          <div>
            <FloatingAlert
              message={messages}
              isVisible={alertVisible}
              onClose={() => setAlertVisible(false)}
              successs={isSuccess}
            />
          </div>

          <section className='py-4'>
            <div className="d-block d-md-flex justify-content-between align-items-center height-100">
              <div>
                <div>
                  <p className='dashboard-header'>All Bonus</p>
                  <p className='light-text'>Total of {totalBonus} Bonus Recieved</p>
                </div>
              </div>
            </div>
          </section>



          <section className='py-2'>
            <div className='d-flex justify-content-end'>
            </div>
            <div className='dashboard-boxes border-radius-5px dahboard-table  dash-scroll-bar non-wrap-text'>
              <div className=''>
                <table>
                  <thead>
                    <tr>
                      <th className='sm-text-2  py-2'>Transaction ID</th>
                      <th className='sm-text-2'>Amount</th>
                      <th className='sm-text-2'>Date</th>
                      <th></th>
                    </tr>
                  </thead>

                  <tbody>
                    {currentData.length > 0 ? (
                      currentData.map((data) =>(
                        <tr key={data.id}> 
                          <td className='py-3'>{data.transaction_id}</td>
                          <td>{formatCurrency(data.amount)} USD</td>
                          <td>{formatDateTime(data.created_at)}</td>
                        </tr>
                      ))
                    ): (
                        <tr>
                          <td className='py-3'>No details available</td>
                        </tr>
                    )}
                  </tbody>
                </table>


              </div>


              {bonusLoader && (
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

      <div className='mt-5 py-3'>
        <DashboardFooter />
      </div>


    </div>
  )
}