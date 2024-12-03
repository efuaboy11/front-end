import '../../../css/dashboardCss/dashboard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AuthContext from "../../../context/AuthContext";
import { useContext, useEffect, useRef, useState } from 'react';
import { AdminDashFrame } from '../../../component/adminDashFrame';
import ReactPaginate  from "react-paginate"
import { Link, useNavigate } from 'react-router-dom';
import { faChevronLeft, faChevronRight, faX } from '@fortawesome/free-solid-svg-icons';
import FloatingAlert from '../../../component/alert';
import spin from '../../../img/Spin.gif'
import AllDataContext from '../../../context/Alldata';
import { useForm } from 'react-hook-form';

export const BlackListIp = () =>{
  const { authTokens,
    messages,
    alertVisible,
    setAlertVisible,
    isSuccess,
    showAlert,
    setMessage,
    setIsSuccess,


    OnbodyClick,
    formatCurrency,
    formatName,
    disablebutton, 
    setDisablebutton,


  } = useContext(AuthContext)


  const {
    blackListIPData,
    setBlackListIPData,
    blackListCount,
    blackListIPLoader,
    BlackListFunction,
  } = useContext(AllDataContext)


  const [IpAddress, setIpAddress] = useState('')
  const [reason, setReason] = useState('')
  const [statusOverlay, setStatusOverlay] = useState(false)
  const statusModal = useRef(null)
  const [showStatus, setShowStatus] = useState(true)
  const [statusLoader, setStatusLoader] = useState(false)

  const [deleteModal, setDeletedModal] = useState(false)
  const [deletebtnLoader, setDeletebtnLoader] = useState(false)

  const [selectedDataId, setSelectedDataId] = useState(null);



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

  const hideDeleteModal = () => {
    setDeletedModal(false)
    setSelectedDataId(null)

  }

  const showDeleteModal = (id) => {
    setDeletedModal(true)
    setSelectedDataId(id)
  }


  useEffect(() =>{
    BlackListFunction()
  }, [!blackListIPData])

  useEffect(() => {
    let timer;
    if (showStatus == false) {
      timer = setTimeout(() => {
        setStatusOverlay(false);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [showStatus]);


  const onSubmit = (data, e) =>{
    setDisablebutton(true)
    setStatusLoader(true)
    if(isValid){
      AddIP(e)
    }else{
      setDisablebutton(false)
    }

  }

  const AddIP = async(e) =>{
    e.preventDefault()
    try{
      const response = await fetch('http://127.0.0.1:8000/api/Blacklist-ip/', {
        method: 'POST',
        body: JSON.stringify({
          ip_address: IpAddress,
          reason: reason,
        }),
        headers:{
          Authorization: `Bearer ${authTokens.access}`,
          "Content-Type": "application/json"
        }
      })

      if(response.ok){
        showAlert()
        setMessage('IP bLacklisted sucessfully ')
        setDisablebutton(false)
        hideStatusModal()
        setIsSuccess(true)
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

  const deleteItem = async (id) => {
    
    setDisablebutton(true)
    setDeletebtnLoader(true)

    try{
      let response = await fetch(`http://127.0.0.1:8000/api/Blacklist-ip/${selectedDataId}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${authTokens.access}`
        }
      })

      if (response.ok) {
        setDeletebtnLoader(false)
        setDisablebutton(false)
        setBlackListIPData(blackListIPData.filter(dat => dat.id !== selectedDataId))
        setDeletedModal(false)
        showAlert()
        setIsSuccess(true)
        setMessage('IP Address Removed')
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


  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();
  
  return(
    <div>
      <div className="position-sticky1">
        <AdminDashFrame />
      </div>

      <div className="main-content" onClick={OnbodyClick}>
        <div className="container-xl">

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

        <div className={` ${statusOverlay ? 'overlay-background pt-5': ''}`}>
            <div className="dashboard-update-status-container" ref={statusModal}>
              <div className="row justify-content-center">
                <div className="col-xl-3 col-lg-5 col-md-6 col-sm-9 col-11">
                  <div className="dashboard-update-status-content">
                    <div className="d-flex justify-content-end">
                      <FontAwesomeIcon className='sm-text cursor-pointer' icon={faX} onClick={hideStatusModal}/>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div>
                        <label htmlFor="" className="p-2 ">IP Address</label>
                          <input type="text" className={`dashboard-input ${errors.IpAddress ? 'error-input' : ''}`} {...register('IpAddress', {required: true})}  value={IpAddress} onChange={(e) => setIpAddress(e.target.value)} placeholder="e.g, 192.168.0.0" />
                          {errors.IpAddress && <span style={{color: 'red'}}>This Feild is required</span>} 
                      </div>

                      <div>
                        <label htmlFor="" className="p-2 ">Reasons</label>
                          <input type="text" className={`dashboard-input ${errors.reason ? 'error-input' : ''}`} {...register('reason', {required: true})}  value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Too much login" />
                          {errors.reason && <span style={{color: 'red'}}>This Feild is required</span>} 
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
                  <p className='dashboard-header'>BlackListed IP</p>
                  <p className='light-text'>Total {blackListCount} IP Address</p>
                </div>
              </div>

              <div>
                <div className='pt-3'>
                  <button onClick={showStatusModal}  className='dashboard-btn py-2 px-3'>
                    <i class="bi bi-ban pe-2"></i>
                    BlackList IP
                  </button>
                </div>
              </div>
            </div>
          </section>



          <section className=''>
            <div className='dashboard-boxes border-radius-5px dahboard-table  dash-scroll-bar non-wrap-text'>
              <div className=''>
                <table>
                  <thead>
                    <tr>
                      <th className='sm-text-2 py-2'>Name</th>
                      <th className='sm-text-2'>Amount</th>
                      <th className='sm-text-2'>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {blackListIPData.length > 0 ? (
                      blackListIPData.map((data) =>(
                        <tr key={data.id}> 
                          <td className='py-2'>{data.ip_address}</td>
                          <td>{formatName(data.reason)}</td>
                          <td onClick={() => showDeleteModal(data.id)}><i class="bi bi-trash cursor-pointer"></i></td>
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


              {blackListIPLoader && (
                <div className="d-flex justify-content-center py-4">
                  <img src={spin} alt="" width='60px'/>
                </div>  
                                
              )}
            </div>
          </section>
        </div>
      </div>


    </div>
  )
}