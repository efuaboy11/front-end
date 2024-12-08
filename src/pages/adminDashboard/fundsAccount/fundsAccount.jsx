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
import { selectClasses } from '@mui/material';
import AllDataContext from '../../../context/Alldata';
import '../../../css/dashboardCss/adminDahboardCss/kyc.css'
import { DashboardFooter } from '../../../component/dashbaordFooter';

export const FundsAccount = () =>{
  const {authTokens, 
    OnbodyClick,
    formatName,
    shortName,
    disablebutton, 
    setDisablebutton,
    formatNameAllCaps,
    formatDate,
    formatCurrency,


  } = useContext(AuthContext)


  const {


    usersCount,
    fundsAcountData, 
    fundsAccountLoader,
    fundsAccountSearch, 
    setFundsAccountSearch,
    FundsAccountFunction,
    filterFundsAccount,

  } = useContext(AllDataContext)
  
  useEffect(() =>{
    if(!fundsAccountSearch){
      FundsAccountFunction()
    }else if(fundsAccountSearch){
      filterFundsAccount()
    }
  }, [fundsAccountSearch])




  const [currentPage, setCurrentPage] = useState(0)
  const [selectedDataId, setSelectedDataId] = useState(null);
  
  const navigate  = useNavigate()

  const dataPerPage = 10;
  const pageCount = Math.ceil(fundsAcountData.length / dataPerPage)

  const currentData = fundsAcountData.slice(
    currentPage * dataPerPage,
    (currentPage + 1) * dataPerPage
  )

  const handlePageClick = ({selected}) =>{
    setCurrentPage(selected)
  }

  const IndividualUser = async(id) =>{
    setSelectedDataId(id)
    setDisablebutton(true)

    let response = await fetch(`http://127.0.0.1:8000/api/user-profile/admin/${id}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens.access}`
      }
      
    })
    const data = await response.json()
    sessionStorage.setItem('urlName', 'Users')
    sessionStorage.setItem('urlLink', '/admin/user/list')
    sessionStorage.setItem('IndividualUserData', JSON.stringify(data))

    if(response.ok){
      navigate(`/admin/user/${data.user}`)
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
          <section className='py-4'>
            <div className="d-flex justify-content-between align-items-center height-100">
              <div>
                <div>
                  <p className='dashboard-header'>Account List</p>
                  <p className='light-text'>Total {usersCount} Account</p>
                </div>
              </div>
            </div>
          </section>



          <section className='py-5 mt-3'>
            <div className='d-flex justify-content-end'>
              <div className='pb-3'>
                <input type="text" className="p-2 dashboard-search-input" placeholder="search..." value={fundsAccountSearch} onChange={(e) => setFundsAccountSearch(e.target.value)} />
              </div>
            </div>
            <div className='dashboard-boxes border-radius-5px dahboard-table  dash-scroll-bar non-wrap-text'>
              <div className=''>
                <table>
                  <thead>
                    <tr>
                      <th className='sm-text-2 py-2'>Name/ID</th>
                      <th className='sm-text-2'>User Balance</th>
                      <th className='sm-text-2'>Total Deposit</th>
                      <th className='sm-text-2'>Total Investent</th>
                      <th className='sm-text-2'>Total Bonus</th>
                      <th></th>
                    </tr>
                  </thead>

                  <tbody>
                    {currentData.length > 0 ? (
                      currentData.map((data) =>(
                        <tr key={data.id} className={selectedDataId === data.id ? 'dashboard-active-row' : ''}> 
                          <td className='py-3'>
                            <div className="d-flex">
                              <div>
                                {data.user_details.profile_photo === null ? (
                                  <div className="position-relative1">
                                    <h6 className="admin-home-user-table-icon">{shortName(data.user_details.full_name)}</h6>
                                    <p className={`admin-home-user-table-icon-status ${data.user_details.status === "verified" ? "sucessfull-bg" : "pending"}`}></p>
                                  </div>
                                  ): (
                                    <div className="position-relative1">
                                      <img className='admin-home-user-table-img' src={data.user_details.profile_photo} alt="" />
                                      <p className={`admin-home-user-table-icon-status ${data.user_details.status === "verified" ? "sucessfull-bg" : "pending"}`}></p>
                                    </div>


                                  )
                                } 
                              </div>

                              <div>
                                <p>{formatName(data.user_details.full_name)}</p>
                                <p className="sm-text-2">{data.user_details.email}</p>
                              </div>

                            </div>    
                          </td>
                          <td>{formatCurrency(data.user_balance)} <span className='light-text sm-text-2'>USD</span></td>
                          <td>{formatCurrency(data.total_deposit)} <span className='light-text sm-text-2'>USD</span></td>
                          <td>{formatCurrency(data.total_investment)} <span className='light-text sm-text-2'>USD</span></td>
                          <td>{formatCurrency(data.total_bonus)} <span className='light-text sm-text-2'>USD</span></td>    

                          <td>
                            <div className="d-flex justify-content-end">
                              <button disabled={disablebutton} className='Button' onClick={() => IndividualUser(data.id)}>
                                <p className='dashboard-table-arrow'><i class=" bi bi-chevron-right sm-text"></i></p>
                              </button>
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


              {fundsAccountLoader && (
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
        <DashboardFooter/>
      </div>


    </div>
  )
}