import '../../../css/dashboardCss/dashboard.css'
import AuthContext from "../../../context/AuthContext";
import { AdminDashFrame } from '../../../component/adminDashFrame';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useRef, useState } from 'react';
import pic from '../../../img/pexels-andrea-piacquadio-762041 (2).jpg'
import '../../../css/dashboardCss/adminDahboardCss/kyc.css'
import spin from '../../../img/Spin.gif'
import AllDataContext from '../../../context/Alldata';
import FloatingAlert from '../../../component/alert';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useForm } from 'react-hook-form';
import { DashboardFooter } from '../../../component/dashbaordFooter';


export const IndividualKYC = () =>{
  const { authTokens, 
    OnbodyClick,
    formatDate,
    formatName,
    formatFirstName,
    shortName,
    formatNameAllCaps,
    disablebutton, 
    setDisablebutton,



    messages,
    alertVisible,
    setAlertVisible,
    isSuccess,
    showAlert,
    setMessage,
    setIsSuccess,


  } = useContext(AuthContext)

  const {
    KYCData, 
    setKYCData,
  }= useContext(AllDataContext)

  const [details, setDetails] = useState(null)

  const [urlName, setUrlName] = useState('')
  const [urlLink, setUrlLink] = useState('')

  const [deleteModal, setDeletedModal] = useState(false)
  const [deletebtnLoader, setDeletebtnLoader] = useState(false)

  const [statusOverlay, setStatusOverlay] = useState(false)
  const [statusLoader, setStatusLoader] = useState(false)
  const [statusValue, setStatusValue] = useState('')
  const statusModal = useRef(null)
  const [showStatus, setShowStatus] = useState(true)

  const navigate = useNavigate()

  const checkCanceled = (name) =>{
    if(name === "canceled"){
      return "rejected"
    }else{
      return name
    }
  }

  const hideDeleteModal = () => {
    setDeletedModal(false)

  }

  const showDeleteModal = () => {
    setDeletedModal(true)
  }



  const showStatusModal = () =>{
    if(statusModal.current){
      statusModal.current.style.transform = `translateY(${0}px)`
      statusModal.current.style.transition = `all ${1.5}s ease`
    }

    setStatusOverlay(true)
    setShowStatus(true)
  }

  const hideStatusModal = () => {
    if(statusModal.current){
      statusModal.current.style.transform = `translateY(${-650}%)`
      statusModal.current.style.transition = `all ${5}s ease`
    }

    setShowStatus(false)

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



  const deleteItem = async () => {
    setDisablebutton(true)
    setDeletebtnLoader(true)

    try{
      let response = await fetch(`http://127.0.0.1:8000/api/user/kyc-verification/${details.id}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${authTokens.access}`
        }
      })

      if (response.ok) {
        setDeletebtnLoader(false)
        setDisablebutton(false)
        setKYCData(KYCData.filter(dat => dat.id !== details.id))
        setDeletedModal(false)
        showAlert()
        setIsSuccess(true)
        setMessage('KYC successfully deleted')
        console.log('KYC successfully deleted')
        navigate(`${urlLink}`)
      } else {
        const errorData = await response.json()
        const errorMessages = Object.values(errorData)
        .flat()
        .join(', ');
        setMessage(errorMessages)
        setDeletebtnLoader(false)
        setDisablebutton(false)
        showAlert()
        setIsSuccess(false)
        setIsSuccess(true)
        setDisablebutton(false)
      }

    }catch{
      showAlert()
      setMessage('An unexpected error occurred.');
      setDisablebutton(false)
      setIsSuccess(false)
      setDeletebtnLoader(false)

    }
  }

  const UpdateStatus = async(e) =>{
    e.preventDefault()
    setDisablebutton(true)
    console.log('yes')

    try{
      const response = await fetch(`http://127.0.0.1:8000/api/user/kyc-verification/${details.id}/update-status/`, {
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
  useEffect(() =>{
    const data = sessionStorage.getItem("IndividualData")

    setUrlName(sessionStorage.getItem('urlName'))
    setUrlLink(sessionStorage.getItem('urlLink'))
    if(data){
      const parsedData = JSON.parse(data)
      setDetails(parsedData)
      console.log(details)

    }
  }, [])

  useEffect(() => {
    let timer;
    if (showStatus == false) {
      timer = setTimeout(() => {
        setStatusOverlay(false);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [showStatus]);

  return(
    <div>
      <div className="position-sticky1">
        <AdminDashFrame />
      </div>

      <div className="main-content pb-5" onClick={OnbodyClick}>
        <div>
          <FloatingAlert
            message={messages}
            isVisible={alertVisible}
            onClose={() => setAlertVisible(false)}
            successs={isSuccess}
          />
        </div>
          {deleteModal &&
            <section className="overlay-background">
              <div className="dashboard-modal-container">
                <div className="dashboard-delete-modal-content">
                  <h5>Delete Item?</h5>
                  <hr />
                  <p>This will delete the Item.</p>
                  <div className="d-flex justify-content-between py-3">
                    <div></div>
                    <div className='d-flex align-items-center height-100 pe-2'>
                      <button  className="dashboard-submit-btn  dashboard-btn px-4 py-2 me-3" disabled={disablebutton} onClick={deleteItem}>    
                        <span class={`${deletebtnLoader ? 'dashboard-submit-spinner': ''}`}></span>
                        <span class={`${deletebtnLoader ? 'dashboard-submit-btn-visiblity': ''}`}>Delete</span>
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


        {details !== null ? (
          <div className="container-xl">
            <div className="row justify-content-center pb-5">
              <div className="col-md-11 col-xl-9">
  
                <section>
                  <div className="d-block d-md-flex justify-content-between align-items-center height-100 pt-4">
                    <div>
                      <Link to={`${urlLink}`} className='light-link'><i class="bi bi-arrow-left"></i> {urlName} List</Link>
                      <p className='dashboard-header'>KYC Document - <span className="light-text">{formatFirstName(details.users_details.full_name)}</span></p>
                    </div>
  
                    <div className='mt-3'>
                      <div className="d-flex">
                        <div className='me-5'>
                          <button className='investment-kYC-btn' onClick={showDeleteModal}>
                            <div className="d-flex">
                              <i class="bi bi-trash  pe-2"></i>
                              <p className=''>Delete KYCs</p>
                            </div>
                          </button>
                        </div>
                      </div>
                      {details?.status === 'pending' &&
                        <div className="d-flex pt-3">
                          <div className='me-5'>
                            <button className='investment-kYC-btn' onClick={showStatusModal}>
                              <div className="d-flex">
                                <i class="bi bi-send pe-2"></i>
                                <p className=''>Update Status</p>
                              </div>
                            </button>
                          </div>
                        </div>
                      }

                    </div>
                  </div>
                </section>
  
                <section className='pt-5'>
                  <div className="row gx-4 gy-5">
                    <div className="col-md-6">
                      <div>
                        <p className='font-bold sm-text pb-3'>Document Info</p>
                        <div className="dashboard-boxes border-radius-5px px-2">
                          <div className="row align-items-center height-100  gx-3 border-bottom1 py-2">
                            <div className="col-6 ps-4">
                              <p>Submitted By:</p>
                            </div>
  
                            <div className="col-6">
                              <div className='d-flex align-items-center height-100'>
                                <h6 className="admin-home-user-icon me-2">{shortName(details.users_details.full_name)}</h6>
                                <p className='font-bold'>{formatName(details.users_details.full_name)}</p>
                              </div>
                            </div>
                          </div>
                          <div className="row align-items-center height-100 gx-3  border-bottom1 py-2">
                            <div className="col-6 ps-4">
                              <p>Submitted At:</p>
                            </div>
  
                            <div className="col-6">
                              <p>{formatDate(details.created_at)}</p>
                            </div>
                          </div>
  
                          <div className="row align-items-center height-100 gx-3  border-bottom1 py-2">
                            <div className="col-6 ps-4">
                              <p>Status:</p>
                            </div>
  
                            <div className="col-6">
                              <p className={`${details.status === "verified" ? "sucessfull-text": ""} ${details.status === "pending" ? "pending-text": ""}  ${details.status === "canceled" ? "failed-text": ""} font-bold`}>{formatNameAllCaps(checkCanceled(details.status))}</p>
                            </div>
                          </div>
  
                          <div className="row align-items-center height-100 gx-3  border-bottom1 py-2">
                            <div className="col-6 ps-4">
                              <p>Document Type:</p>
                            </div>
  
                            <div className="col-6">
                              <p>{formatName(details.document_type)}</p>
                            </div>
                          </div>
  
                          <div className="row align-items-center height-100 gx-3  py-2">
                            <div className="col-6 ps-4">
                              <p>Country of Issuance:</p>
                            </div>
  
                            <div className="col-6">
                              <p>{formatName(details.country)}</p>
                            </div>
                          </div>
  
                        </div>
                      </div>
                    </div>
  
                    <div className="col-md-6">
                    <p className='font-bold sm-text pb-3'>Proof / Selfie</p>
                      <div className="dashboard-boxes border-radius-5px">
                        <div className="p-3">
                          <img width="100%" src={details.proof_selfie} alt="" />
                        </div>
                      </div>
                    </div>
  
                    <div className="col-md-6">
                      <p className='font-bold sm-text pb-3'>Front Side</p>
                      <div className="dashboard-boxes border-radius-5px">
                        <div className="p-3">
                          <img width="100%" height='100%' src={details.font_side} alt="" />
                        </div>
                      </div>
                    </div>
  
                    <div className="col-md-6">
                      <p className='font-bold sm-text pb-3'>Back Side</p>
                      <div className="dashboard-boxes border-radius-5px">
                        <div className="p-3">
                          <img width="100%" height='100%' src={details.back_side} alt="" />
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="d-flex justify-content-center  align-items-center height-90vh">
              <img src={spin} alt="" width='60px'/>
            </div>                         
          </div>
        )}

      </div>

      <div>
        <DashboardFooter />
      </div>


    </div>
  )
}