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

export const InvestmentPlan = () =>{
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

    investmentPlanCount,
    investmentPlanData,
    investemmentPlanLoder,
    investmentPlanSearch,
    setInvestmentPlanSearch,
    InvestmentPlanFunction,
    filterInvestmentPlan,

  } = useContext(AllDataContext)
  


  useEffect(() =>{
    if(!investmentPlanSearch){
      InvestmentPlanFunction()
    }else if(investmentPlanSearch){
      filterInvestmentPlan()
    }
  }, [investmentPlanSearch])


  const [currentPage, setCurrentPage] = useState(0)
  const [selectedDataId, setSelectedDataId] = useState(null);

  const navigate  = useNavigate()

  const dataPerPage = 10;
  const pageCount = Math.ceil(investmentPlanData.length / dataPerPage)

  const currentData = investmentPlanData.slice(
    currentPage * dataPerPage,
    (currentPage + 1) * dataPerPage
  )

  const handlePageClick = ({selected}) =>{
    setCurrentPage(selected)
  }

  const checkTimeDuration = (duration) =>{
    if (duration === "hourly"){
      return "hours"

    }else if(duration === 'daily'){
      return 'days'

    }else if(duration === 'weekly'){
      return 'weeks'

    }else if(duration === 'monthly'){
      return 'months'
    }else if(duration === 'yearly'){
      return 'years'

    }

  }





  const IndvividualPlan = async(id) =>{
    setSelectedDataId(id)
    setDisablebutton(true)
    let response = await fetch(`http://127.0.0.1:8000/api/investment-plan/${id}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens.access}`
      }
      
    })
    const data = await response.json()
    localStorage.setItem('IndividualData', JSON.stringify(data))

    if (response.ok){
      navigate(`/admin/investment-plan/${data.plan_id}`)
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
                  <p className='dashboard-header'>Investment Plans</p>
                  <p className='light-text'>Total {investmentPlanCount} Investement Plan</p>
                </div>
              </div>
            </div>
          </section>



          <section className='py-5 mt-3'>
            <div className='d-flex justify-content-end'>
              <div className='pb-3'>
                <input type="text" className="p-2 dashboard-search-input" placeholder="search..." value={investmentPlanSearch} onChange={(e) => setInvestmentPlanSearch(e.target.value)} />
              </div>
            </div>
            <div className='dashboard-boxes border-radius-5px dahboard-table  dash-scroll-bar non-wrap-text'>
              <div className=''>
                <table>
                  <thead>
                    <tr>
                      <th className='sm-text-2 py-2'>Name</th>
                      <th className='sm-text-2'>Min Amount</th>
                      <th className='sm-text-2'>Max Amount</th>
                      <th className='sm-text-2'>Percentage  Return</th>
                      <th className='sm-text-2'>Duration</th>
                      <th className='sm-text-2'>Time Rate</th>
                      <th></th>
                    </tr>
                  </thead>

                  <tbody>
                    {currentData.length > 0 ? (
                      currentData.map((data) =>(
                        <tr key={data.id} className={selectedDataId === data.id ? 'dashboard-active-row' : ''}> 
                          <td className='py-3'>{formatName(data.plan_name)} Plan </td>
                          <td>{formatCurrency(data.min_amount)} USD</td>
                          <td>{formatCurrency(data.max_amount)} USD</td>
                          <td>{roundUp(data.percentage_return)}%</td>            
                          <td>{data.duration} {checkTimeDuration(data.time_rate)}</td>
                          <td>{formatName(data.time_rate)}</td>
                          <td>
                            <button disabled={disablebutton} className='Button' onClick={() => IndvividualPlan(data.id)}>
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


              {investemmentPlanLoder && (
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