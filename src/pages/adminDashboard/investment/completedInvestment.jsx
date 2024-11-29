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

export const CompeletedInvestment = () =>{
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

  } = useContext(AuthContext)


  const {

    completedInvestmentCount,
    completedInvestment,
    completedInvestmentLoader,
    completedInvestmentSearch,
    setCompletedInvestmentSearch,
    CompletedInvestmentFunction,
    filterCompletedInvestment,

  } = useContext(AllDataContext)

  useEffect(() =>{
    if(!completedInvestmentSearch){
      CompletedInvestmentFunction()
    }else if(completedInvestmentSearch){
      filterCompletedInvestment()
    }
  }, [completedInvestmentSearch])


  const [currentPage, setCurrentPage] = useState(0)
  const [selectedDataId, setSelectedDataId] = useState(null);
  const [showModal, setShowModal] = useState(false)
  const [loader, setLoader] = useState(false)
  
  const navigate  = useNavigate()

  const dataPerPage = 10;
  const pageCount = Math.ceil(completedInvestment.length / dataPerPage)

  const currentData = completedInvestment.slice(
    currentPage * dataPerPage,
    (currentPage + 1) * dataPerPage
  )

  const handlePageClick = ({selected}) =>{
    setCurrentPage(selected)
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
      localStorage.setItem('InvestmentInterestData', JSON.stringify(sortedData))
      console.log(data)

    }else{
      localStorage.setItem('InvestmentInterestData', null)

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
    localStorage.setItem('urlName', 'Completed')
    localStorage.setItem('urlLink', '/admin/compeleted-investment')
    localStorage.setItem('IndividualData', JSON.stringify(data))

    if (response.ok){
      const interestData = await InvestmentIntrest(data.user, data.investment_id);
      navigate(`/admin/all-investment/${data.id}`)
      setDisablebutton(false)

    }else{
      setDisablebutton(false)
    }

  }



  
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
            <div className="d-flex justify-content-between align-items-center height-100">
              <div>
                <div>
                  <p className='dashboard-header'>Completed Investment</p>
                  <p className='light-text'>Total {completedInvestmentCount} Compeleted Investment</p>
                </div>
              </div>

              <div>
                <div className='d-none d-sm-block'>
                  <Link to='/admin/add-deposits' className='dashboard-btn p-3'>
                    <i class="bi bi-plus-circle pe-2"></i>
                    Add investment
                  </Link>
                </div>
              </div>
            </div>
          </section>



          <section className='py-5 mt-3'>
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
                    {currentData.length > 0 ? (
                      currentData.map((data) =>(
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
                          <td><p p className={`dashboard-status ps-3 ${data.investment_status === 'awaiting' && 'pending'} ${data.investment_status === 'canceled' && 'failed'} ${data.investment_status === 'active' && 'sucessfull'} ${data.investment_status === 'completed' && 'completed'}`}>{formatName(data.investment_status)}</p></td>
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