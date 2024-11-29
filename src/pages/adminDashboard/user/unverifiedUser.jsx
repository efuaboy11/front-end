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
import { DashboardFooter } from '../../../component/dashbaordFooter';

export const UnverifiedUser = () =>{
  const { 
    OnbodyClick,
    formatName,
    shortName,


  } = useContext(AuthContext)


  const {


    unverifiedUserCount,
    unverifiedUserData,
    unverifiedUserLoader,
    unverifiedUserSearch, 
    setUnverfiedUserSearch,
    UnverifiedUserFunction,
    filterUnverifiedUser,

  } = useContext(AllDataContext)
  
  useEffect(() =>{
    if(!unverifiedUserSearch){
      UnverifiedUserFunction()
    }else if(unverifiedUserSearch){
      filterUnverifiedUser()
    }
  }, [unverifiedUserSearch])

  const [currentPage, setCurrentPage] = useState(0)
  
  const navigate  = useNavigate()

  const dataPerPage = 10;
  const pageCount = Math.ceil(unverifiedUserData.length / dataPerPage)

  const currentData = unverifiedUserData.slice(
    currentPage * dataPerPage,
    (currentPage + 1) * dataPerPage
  )

  const handlePageClick = ({selected}) =>{
    setCurrentPage(selected)
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
                  <p className='dashboard-header'>Users Yet to Verify</p>
                  <p className='light-text'>Total {unverifiedUserCount} users not uploaded Verification</p>
                </div>
              </div>

              <div>
                <div className='d-none d-sm-block'>
                  <Link to='/admin/KYC/add' className='dashboard-btn py-2 px-3'>
                    <i class="bi bi-person  pe-3"></i>
                    Add Users
                  </Link>
                </div>
              </div>
            </div>
          </section>



          <section className='py-5 mt-3'>
            <div className='d-flex justify-content-end'>
              <div className='pb-3'>
                <input type="text" className="p-2 dashboard-search-input" placeholder="search..." value={unverifiedUserSearch} onChange={(e) => setUnverfiedUserSearch(e.target.value)} />
              </div>
            </div>
            <div className='dashboard-boxes border-radius-5px dahboard-table  dash-scroll-bar non-wrap-text'>
              <div className=''>
                <table>
                  <thead>
                    <tr>
                      <th className='sm-text-2 py-2'>Name/ID</th>
                      <th className='sm-text-2'> Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {currentData.length > 0 ? (
                      currentData.map((data) =>(
                        <tr key={data.id}> 
                          <td className='py-2'>
                            <div className="d-flex">
                              <h6 className="admin-home-user-table-icon">{shortName(data.full_name)}</h6>
                              <div className='ms-1'>
                                {formatName(data.full_name)} <br /> <span className="sm-text-2">{data.email}</span>
                              </div>

                            </div>    
                          </td>
                          <td>
                            <p className='d-inline py-1 px-3 border-radius-5px dashboard-boxes-2'>Null</p>


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


              {unverifiedUserLoader && (
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