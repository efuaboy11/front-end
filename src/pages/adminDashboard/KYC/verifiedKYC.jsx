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

export const VerifiedKYC = () =>{
  const { 
    OnbodyClick,
    formatName,
    shortName,
    disablebutton, 
    setDisablebutton,


  } = useContext(AuthContext)


  const {


    verifiedKYCsCount,
    verifiedKYCData,
    verifiedKYCLoader,
    verifiedKYCSearch, 
    setVerifiedKYCSearch,
    VerifiedKYCFunction,
    filterVerifiedKYC,

  } = useContext(AllDataContext)
  
  useEffect(() =>{
    if(!verifiedKYCSearch){
      VerifiedKYCFunction()
    }else if(verifiedKYCSearch){
      filterVerifiedKYC()
    }
  }, [verifiedKYCSearch])

  const [currentPage, setCurrentPage] = useState(0)
  const [selectedDataId, setSelectedDataId] = useState(null);
  
  const navigate  = useNavigate()

  const dataPerPage = 10;
  const pageCount = Math.ceil(verifiedKYCData.length / dataPerPage)

  const currentData = verifiedKYCData.slice(
    currentPage * dataPerPage,
    (currentPage + 1) * dataPerPage
  )

  const handlePageClick = ({selected}) =>{
    setCurrentPage(selected)
  }

  const IndividualKYC = async(id) =>{
    setSelectedDataId(id)
  }


  
  return(
    <div>
      <div className="position-sticky1">
        <AdminDashFrame />
      </div>

      <div className="main-content" onClick={OnbodyClick}>
        <div className="container-xl">
          <section className='py-4'>
            <div className="d-flex justify-content-between align-items-center height-100">
              <div>
                <div>
                  <p className='dashboard-header'>KYCs Verified</p>
                  <p className='light-text'>Total {verifiedKYCsCount} KYCs verified</p>
                </div>
              </div>

              <div>
                <div className='d-none d-sm-block'>
                  <Link to='/admin/add-deposits' className='dashboard-btn p-3'>
                    <i class="bi bi-upload pe-3"></i>
                    Upload KYC
                  </Link>
                </div>
              </div>
            </div>
          </section>



          <section className='py-5 mt-3'>
            <div className='d-flex justify-content-end'>
              <div className='pb-3'>
                <input type="text" className="p-2 dashboard-search-input" placeholder="search..." value={verifiedKYCSearch} onChange={(e) => setVerifiedKYCSearch(e.target.value)} />
              </div>
            </div>
            <div className='dashboard-boxes border-radius-5px dahboard-table  dash-scroll-bar non-wrap-text'>
              <div className=''>
                <table>
                  <thead>
                    <tr>
                      <th className='sm-text-2 py-2'>Name/ID</th>
                      <th className='sm-text-2'>KYC Status</th>
                      <th></th>
                    </tr>
                  </thead>

                  <tbody>
                    {currentData.length > 0 ? (
                      currentData.map((data) =>(
                        <tr key={data.id}> 
                          <td className='py-2'>
                            <div className="d-flex">
                              <h5 className="admin-home-user-table-icon">{shortName(data.users_details.full_name)}</h5>
                              <div className='ms-1'>
                                {formatName(data.users_details.full_name)} <br /> <span className="sm-text-2">{data.users_details.email}</span>
                              </div>

                            </div>    
                          </td>
                          <td>
                            <p className='d-inline py-2 px-3 border-radius-5px verified-kyc-1'>Verified</p>
                          </td>
                          <td>
                            <div className="d-flex justify-content-end">
                              <button disabled={disablebutton} className='Button' onClick={() => IndividualKYC(data.id)}>
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


              {verifiedKYCLoader && (
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


    </div>
  )
}