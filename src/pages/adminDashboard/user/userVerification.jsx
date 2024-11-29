import '../../../css/dashboardCss/dashboard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AuthContext from "../../../context/AuthContext";
import { useContext, useEffect, useRef, useState } from 'react';
import { AdminDashFrame } from '../../../component/adminDashFrame';
import ReactPaginate  from "react-paginate"
import { Link, useNavigate } from 'react-router-dom';
import { faChevronLeft, faChevronRight, faX } from '@fortawesome/free-solid-svg-icons';
import CircularProgress from '@mui/material/CircularProgress';
import FloatingAlert from '../../../component/alert';
import spin from '../../../img/Spin.gif'
import { selectClasses } from '@mui/material';
import AllDataContext from '../../../context/Alldata';
import '../../../css/dashboardCss/adminDahboardCss/kyc.css'
import { useForm } from 'react-hook-form';
import { DashboardFooter } from '../../../component/dashbaordFooter';

export const UserVerification = () =>{
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


    userVerificationCount,
    userVerificationData,
    setUserVerificationData,
    userVerificationLoader,
    userVerificationSearch,
    setUserVerificationSearch,
    UserVerificationFunction,
    filterUserVerification,


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
  const pageCount = Math.ceil(userVerificationData.length / dataPerPage)

  const currentData = userVerificationData.slice(
    currentPage * dataPerPage,
    (currentPage + 1) * dataPerPage
  )

  const handlePageClick = ({selected}) =>{
    setCurrentPage(selected)
  }

  const checkVerification = (status) =>{
    if(status == 'verified'){
      return 'Yes'
    }else if(status == 'pending' || status == 'canceled'){
      return 'No'
    }
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

  const hideDeleteModal = () => {
    setShowModal(false)
    setSelectedDataId(null)
    setShowDropdownMenu(true)

  }

  const showDeleteModal = () => {
    setShowModal(true)
    setShowDropdownMenu(false)
  }

  const showStatusModal = () =>{
    if(statusModal.current){
      statusModal.current.style.transform = `translateY(${0}px)`
      statusModal.current.style.transition = `all ${1.5}s ease`
    }

    setStatusOverlay(true)
    setShowStatus(true)
    setShowDropdownMenu(false)
  }

  const hideStatusModal = () => {
    if(statusModal.current){
      statusModal.current.style.transform = `translateY(${-650}%)`
      statusModal.current.style.transition = `all ${5}s ease`
    }

    setShowStatus(false)
    setShowDropdownMenu(true)
    setSelectedDataId(null)

  }

  const {
    register: registerStatus,
    handleSubmit: handleSubmitStatus,
    formState: { errors: errorsStatus, isValid: isValidStatus },
  } = useForm();

  const onStatusSubmit = (data, e) =>{
    setDisablebutton(true)
    setStatusLoader(true)
    if(isValidStatus){
      UpdateStatus(e)
      
    }else{
      setDisablebutton(false)
    }

  }


  const UpdateStatus = async(e) =>{
    e.preventDefault()
    setDisablebutton(true)
    console.log('yes')

    try{
      const response = await fetch(`http://127.0.0.1:8000/api/users/verification/${selectedDataId}/update-status/`, {
        method: 'PATCH',
        body: JSON.stringify({
          status: statusValue,
        }),
        headers:{
          Authorization: `Bearer ${authTokens.access}`,
          "Content-Type": "application/json"
        }
      })

      if(response.ok){
        showAlert()
        setMessage("Status updated sucessfully")
        setDisablebutton(false)
        setStatusValue('')
        setIsSuccess(true)
        setStatusLoader(false)
        hideStatusModal()
      }else{
        const errorData = await response.json()
        const errorMessages = Object.values(errorData)
        .flat()
        .join(', ');
        setMessage(errorMessages)
        setDisablebutton(false)
        setStatusLoader(false)
        setIsSuccess(false)
        showAlert()

      }
    }catch(error){
      console.log(error)
      showAlert()
      setMessage('An unexpected error occurred.');
      setDisablebutton(false)
      setIsSuccess(false)
      setStatusLoader(false)

    } 
  }



  const deleteItem = async () => {
    setDisablebutton(true)
    setLoader(true)

    try{
      let response = await fetch(`http://127.0.0.1:8000/api/user/verification/${selectedDataId}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${authTokens.access}`
        }
      })

      if (response.ok) {
        setLoader(false)
        setDisablebutton(false)
        setUserVerificationData(userVerificationData.filter(dat => dat.id !== selectedDataId))
        setShowModal(false)
        showAlert()
        setMessage('User Details Deleted')
        setIsSuccess(true)
      } else {
        const errorData = await response.json()
        const errorMessages = Object.values(errorData)
        .flat()
        .join(', ');
        setMessage(errorMessages)
        setLoader(false)
        setDisablebutton(false)
        showAlert()
        setIsSuccess(false)
        setDisablebutton(false)
      }

    }catch{
      showAlert()
      setMessage('An unexpected error occurred.');
      setDisablebutton(false)
      setIsSuccess(false)
      setLoader(false)

    }
  }

  
  useEffect(() =>{
    if(!userVerificationSearch){
      UserVerificationFunction()
    }else if(userVerificationSearch){
      filterUserVerification()
    }
  }, [userVerificationSearch])

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
          {showModal &&
            <section className="overlay-background">
              <div className="dashboard-modal-container">
                <div className="dashboard-delete-modal-content">
                  <h5>Delete User Details?</h5>
                  <hr />
                  <p>This will delete user verification details.</p>
                  <div className="d-flex justify-content-between py-3">
                    <div></div>
                    <div className='d-flex align-items-center height-100 pe-2'>
                      <button  className="dashboard-submit-btn  dashboard-btn px-4 py-2 me-3" disabled={disablebutton} onClick={deleteItem}>    
                        <span class={`${loader ? 'dashboard-submit-spinner': ''}`}></span>
                        <span class={`${loader ? 'dashboard-submit-btn-visiblity': ''}`}>Delete</span>
                      </button> 
                      <p className="light-link cursor-pointer" onClick={hideDeleteModal}>Cancel</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          }

          <div className={`${statusOverlay ? 'overlay-background pt-5': ''}`}>
            <div className="dashboard-update-status-container" ref={statusModal}>
              <div className="row justify-content-center">
                <div className="col-xl-3 col-lg-5 col-md-6 col-sm-9 col-11">
                  <div className="dashboard-update-status-content">
                    <div className="d-flex justify-content-end">
                      <FontAwesomeIcon className='sm-text cursor-pointer' icon={faX} onClick={hideStatusModal}/>
                    </div>
                    <form onSubmit={handleSubmitStatus(onStatusSubmit)}>
                      <div>
                        <label htmlFor="" className="p-2 d-block">Status</label>
                        <select  className={`${errorsStatus.status ? 'error-input' : ''} d-block dashboard-input dashboard-update-status-input`} {...registerStatus('status', {required: true})} type="text"   value={statusValue} onChange={(e) => setStatusValue(e.target.value)}>
                          <option></option>
                          <option value='pending'>Pending</option>
                          <option value='canceled'>Reject</option>
                          <option value='verified'>Approve</option>
                        </select>
                        {errorsStatus.status && <span style={{color: 'red'}}>This Feild is required</span>} 
                      </div>

                      <div className="d-flex justify-content-end">
                        <div className='pt-3'>
                          <button  className="dashboard-submit-btn  dashboard-btn py-2 px-4" type="submit" disabled={disablebutton}>    
                            <span class={`${statusLoader ? 'dashboard-submit-spinner': ''}`}></span>
                            <span class={`${statusLoader ? 'dashboard-submit-btn-visiblity': ''}`}>Submit</span>
                          </button> 
                        </div>
                      </div>


                    </form>

                  </div>
                </div>
              </div>

            </div>
          </div>
          <section className='py-4'>
            <div className="d-block d-md-flex  justify-content-between align-items-center height-100">
              <div>
                <div>
                  <p className='dashboard-header'>Users Verification</p>
                  <p className='light-text'>Total {userVerificationCount} Users Verifications</p>
                </div>
              </div>
            </div>
          </section>



          <section className='py-5 mt-3'>
            <div className='d-flex justify-content-end'>
              <div className='pb-3'>
                <input type="text" className="p-2 dashboard-search-input" placeholder="search..." value={userVerificationSearch} onChange={(e) => setUserVerificationSearch(e.target.value)} />
              </div>
            </div>
            <div className='dashboard-boxes border-radius-5px dahboard-table  dash-scroll-bar non-wrap-text'>
              <div className=''>
                <table>
                  <thead>
                    <tr>
                      <th className='sm-text-2 py-2'>Name</th>
                      <th className='sm-text-2 py-2'>Country</th>
                      <th className='sm-text-2 py-2'>Phone Number</th>
                      <th className='sm-text-2'>Status</th>
                      <th className='sm-text-2'>Registered</th>
                      <th></th>
                    </tr>
                  </thead>

                  <tbody>
                    {currentData.length > 0 ? (
                      currentData.map((data) =>(
                        <tr key={data.id} className={selectedDataId === data.id ? 'dashboard-active-row' : ''}> 
                          <td className='py-2'>
                            <div className="d-flex">
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
  
                              
                              <div className='ms-1'>
                                {formatName(data.user_details.full_name)} <br /> <span className="sm-text-2">{data.user_details.email}</span>
                              </div>

                            </div>    
                          </td>

                          <td>
                            <p className='d-inline py-2 '>{formatName(data.country)}</p>
                          </td>

                          <td>
                            <p className='d-inline py-2 '>{formatName(data.phone_number)}</p>
                          </td>


                          <td>
                            <p className={`d-inline py-2 px-3 border-radius-5px  ${data.status === "verified" ? "verified-kyc-1": ""} ${data.status === "pending" ? "pending-kyc": ""}  ${data.status === "canceled" ? "canceled-kyc": ""}`}>{formatName(checkCanceled(data.status))}</p>
                          </td>

                          <td>
                            <p className='d-inline py-2 '>{formatDate(data.user_details.date_joined)}</p>
                          </td>
                          <td>
                            <div className='dashboard-table-btn'>
                              <i onClick={() => toggleDropdown(data.id)} class="bi bi-three-dots cursor-pointer"></i>

                              {(selectedDataId === data.id && showDropdownMenu) && (
                                <div className={`dashboard-table-menu   ${(data.id === lastData?.id || data.id === secondToLastData?.id)? 'dashboard-table-menu-up': 'dashboard-table-menu-down'}`}>
                                  <div>
                                    <p className='dashboard-table-menu-btn cursor-pointer'>
                                      <button disabled={disablebutton} className='Button py-2'>
                                        <i class="bi bi-person pe-1"></i> User Profile
                                      </button>
                                    </p>
                                    <p className='py-2 dashboard-table-menu-btn cursor-pointer' onClick={showDeleteModal}>
                                      <i class="bi bi-trash pe-2"></i> Delete details
                                    </p>
                                    <p className='py-2 dashboard-table-menu-btn cursor-pointer' onClick={showStatusModal}>
                                      <i class="bi bi-send pe-2"></i> Update Status
                                    </p>
                                  </div>
                                </div>
                              )}
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


              {userVerificationLoader && (
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