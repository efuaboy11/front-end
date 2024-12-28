import '../../../css/dashboardCss/dashboard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AuthContext from "../../../context/AuthContext";
import { useContext, useEffect, useRef, useState } from 'react';
import { AdminDashFrame } from '../../../component/adminDashFrame';
import ReactPaginate  from "react-paginate"
import { Link, useNavigate } from 'react-router-dom';
import { faChevronLeft, faChevronRight, faEnvelopesBulk, faX } from '@fortawesome/free-solid-svg-icons';
import CircularProgress from '@mui/material/CircularProgress';
import FloatingAlert from '../../../component/alert';
import spin from '../../../img/Spin.gif'
import { selectClasses } from '@mui/material';
import AllDataContext from '../../../context/Alldata';
import '../../../css/dashboardCss/adminDahboardCss/kyc.css'
import { useForm } from 'react-hook-form';
import { DashboardFooter } from '../../../component/dashbaordFooter';

export const AllEmail = () =>{
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


  const {


    usersCount,
    usersData, 
    usersDataLoader,
    userSearch, 
    setUserSearch,
    UsersFunction,
    filterUser,


  } = useContext(AllDataContext)



  const [currentPage, setCurrentPage] = useState(0)
  const [selectedDataId, setSelectedDataId] = useState(null);
  const [showDropdownMenu, setShowDropdownMenu] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [loader, setLoader] = useState(false)
  const [lastData, setLastData] = useState(null)
  const [secondToLastData, setSecondToLastData] = useState(null);
  


  const [statusOverlay, setStatusOverlay] = useState(false)
  const [statusLoader, setStatusLoader] = useState(false)
  const [statusValue, setStatusValue] = useState('')
  const statusModal = useRef(null)
  const [showStatus, setShowStatus] = useState(true)
  

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


  const checkCanceled = (name) =>{
    if(name === "canceled"){
      return "rejected"
    }else{
      return name
    }
  }

  const toggleDropdown = (id) => {
    // Toggle the dropdown for the selected ID
    setSelectedDataId(selectedDataId === id ? null : id);
    setShowDropdownMenu(true)
  };




  const {
    register: registerStatus,
    handleSubmit: handleSubmitStatus,
    formState: { errors: errorsStatus, isValid: isValidStatus },
  } = useForm();






  
  useEffect(() =>{
    if(!userSearch){
      UsersFunction()
    }else if(userSearch){
      filterUser()
    }
  }, [userSearch])

  useEffect(() => {
    let timer;
    if (showStatus == false) {
      timer = setTimeout(() => {
        setStatusOverlay(false);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [showStatus]);

  useEffect(() =>{
    if(currentData.length > 2){
      setLastData(currentData[currentData.length - 1])
      setSecondToLastData(currentData[currentData.length -2])


      
    }else{
      setLastData(null)
      setSecondToLastData(null)
    }
  }, [currentData])

  const IndividualUser = async(id) =>{
    setSelectedDataId(id)
    setDisablebutton(true)

    let response = await fetch(`http://127.0.0.1:8000/api/users/${id}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens.access}`
      }
      
    })
    const data = await response.json()
    sessionStorage.setItem('IndividualData', JSON.stringify(data))

    if(response.ok){
      console.log(data)
      navigate(`/admin/send-email-user/${data.id}`)
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
                  <p className='dashboard-header'>Email Address</p>
                  <p className='light-text'>Total {usersCount} email address</p>
                </div>
              </div>

              <div>
                <div className='d-none d-sm-block'>
                  <Link to='/admin/send-bulk-email/' className='dashboard-btn py-2 px-3'>
                    <FontAwesomeIcon className='pe-3' icon={faEnvelopesBulk}/>
                    Send Bulk Email
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
                      <th className='sm-text-2 py-2'>Name</th>
                      <th className='sm-text-2 py-2'>Email</th>
                      <th className='sm-text-2'>Registered</th>
                      <th className='sm-text-2'>Status</th>
                      <th></th>
                    </tr>
                  </thead>

                  <tbody>
                    {currentData.length > 0 ? (
                      currentData.map((data) =>(
                        <tr key={data.id} className={selectedDataId === data.id ? 'dashboard-active-row' : ''}> 
                          <td className='py-3'>
                            <div className="d-flex align-items-center height-100">
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
  
                              
                              <div className='ms-1'>
                                {formatName(data.full_name)} 
                              </div>

                            </div>    
                          </td>

                          <td>
                            <p className='d-inline py-2 '>{data.email}</p>
                          </td>

                          <td>
                            <p className='d-inline py-2 '>{formatDate(data.date_joined)}</p>
                          </td>

                          <td>
                            <p className={`d-inline py-2 px-3 border-radius-5px  ${data.status === "verified" ? "verified-kyc-1": ""} ${data.status === "pending" ? "pending-kyc": ""}  ${data.status === "canceled" ? "canceled-kyc": ""}`}>{formatName(checkCanceled(data.status))}</p>
                          </td>

                          <td>
                            <button disabled={disablebutton} className='Button' onClick={() => IndividualUser(data.id)}>
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
        <DashboardFooter />
      </div>


    </div>
  )
}