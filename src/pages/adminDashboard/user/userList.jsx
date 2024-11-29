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

export const UserList = () =>{
  const {authTokens, 
    OnbodyClick,
    formatName,
    shortName,
    disablebutton, 
    setDisablebutton,
    formatNameAllCaps,
    formatDate,


  } = useContext(AuthContext)


  const {


    usersCount,
    usersData, 
    usersDataLoader,
    userSearch, 
    setUserSearch,
    UsersFunction,
    filterUser,

  } = useContext(AllDataContext)
  
  useEffect(() =>{
    if(!userSearch){
      UsersFunction()
    }else if(userSearch){
      filterUser()
    }
  }, [userSearch])


  const checkVerification = (status) =>{
    if(status == 'verified'){
      return 'Yes'
    }else if(status == 'pending' || status == 'canceled'){
      return 'No'
    }
  }

  const [currentPage, setCurrentPage] = useState(0)
  const [selectedDataId, setSelectedDataId] = useState(null);
  
  const navigate  = useNavigate()

  const dataPerPage = 10;
  const pageCount = Math.ceil(usersData.length / dataPerPage)

  const currentData = usersData.slice(
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
    localStorage.setItem('urlName', 'Users')
    localStorage.setItem('urlLink', '/admin/user/list')
    localStorage.setItem('IndividualUserData', JSON.stringify(data))

    if(response.ok){
      navigate(`/admin/user/${data.id}`)
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
                  <p className='dashboard-header'>Users List</p>
                  <p className='light-text'>Total {usersCount} Users List</p>
                </div>
              </div>

              <div>
                <div className='d-none d-sm-block'>
                  <Link to='/admin/KYC/add' className='dashboard-btn py-2 px-3'>
                    <i class="bi bi-person pe-3"></i>
                    Add User
                  </Link>
                </div>
              </div>
            </div>
          </section>



          <section className='py-5 mt-3'>
            <div className='d-flex justify-content-end'>
              <div className='pb-3'>
                <input type="text" className="p-2 dashboard-search-input" placeholder="search..." value={userSearch} onChange={(e) => setUserSearch(e.target.value)} />
              </div>
            </div>
            <div className='dashboard-boxes border-radius-5px dahboard-table  dash-scroll-bar non-wrap-text'>
              <div className=''>
                <table>
                  <thead>
                    <tr>
                      <th className='sm-text-2 py-2'>Name/ID</th>
                      <th className='sm-text-2'>Verified</th>
                      <th className='sm-text-2'>Registered</th>
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
                                {data.profile_photo === null ? (
                                  <div className="position-relative1">
                                    <h6 className="admin-home-user-table-icon">{shortName(data.full_name)}</h6>
                                    <p className={`admin-home-user-table-icon-status ${data.status === "verified" ? "sucessfull-bg" : "pending"}`}></p>
                                  </div>
                                  ): (
                                    <div className="position-relative1">
                                      <img className='admin-home-user-table-img' src={data.profile_photo} alt="" />
                                      <p className={`admin-home-user-table-icon-status ${data.status === "verified" ? "sucessfull-bg" : "pending"}`}></p>
                                    </div>


                                  )
                                } 
                              </div>

                              <div>
                                <p>{formatName(data.full_name)}</p>
                                <p className="sm-text-2">{data.email}</p>
                              </div>

                            </div>    
                          </td>
                          <td>
                            <div className="d-flex align-items-center height-100">
                              <p className={`dashboard-dot me-2 ${data.status === "verified" ? "sucessfull-bg" : "pending"}`}></p>
                              <p className={`d-inline py-2 sm-text ${data.status === "verified" ? "sucessfull-text" : "pending-text"} font-bold`}>{checkVerification(data.status)}</p>
                            </div>

                          </td>

                          <td>
                            <p className='d-inline py-2 '>{formatDate(data.date_joined)}</p>
                          </td>
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


              {usersDataLoader && (
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