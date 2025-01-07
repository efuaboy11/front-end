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
import { ClientDashFrame } from '../../../component/ClientDashFrame';

export const ClientUserReferral = () =>{
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
    formatDate,
    userProfile,
    copied,
    handleCopy


  } = useContext(AuthContext)
  const {
    userReferralData,
    userReferralLoader,
    UserReferralFunction,
    userReferralCount,
    totalUserCommission,
    UserCommissionFunction,
  } = useContext(AllDataContext)


  const [link, setLink] = useState('')
  const [statusOverlay, setStatusOverlay] = useState(false)
  const statusModal = useRef(null)
  const [showStatus, setShowStatus] = useState(true)
  const [statusLoader, setStatusLoader] = useState(false)




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


  useEffect(() =>{
    UserReferralFunction()
    UserCommissionFunction()
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
  const onSubmit = (data, e) =>{
    setDisablebutton(true)
    setStatusLoader(true)
    if(isValid){
      addReferral(e)
    }else{
      setDisablebutton(false)
    }

  }

  const addReferral = async(e) =>{
    e.preventDefault()
    try{
      const response = await fetch('http://127.0.0.1:8000/api/referral/', {
        method: 'POST',
        body: JSON.stringify({
          referral_code: link,
        }),
        headers:{
          Authorization: `Bearer ${authTokens.access}`,
          "Content-Type": "application/json"
        }
      })

      if(response.ok){
        showAlert()
        setMessage('Referral code added Sucessfully')
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

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();
  
  return(
    <div>
      <div className="position-sticky1">
        <ClientDashFrame />
      </div>

      <div className="main-content" onClick={OnbodyClick}>
        <div className="container-xl">

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
                        <label htmlFor="" className="p-2 ">Referral Code</label>
                          <input type="text" className={`dashboard-input ${errors.link ? 'error-input' : ''}`} {...register('link', {required: true})}  value={link} onChange={(e) => setLink(e.target.value)} placeholder="a13f3143-b502-472f-8f8d-0e5d02cf86fc" />
                          {errors.name && <span style={{color: 'red'}}>This Feild is required</span>} 
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
                  <p className='dashboard-header'>Referrals</p>
                  <p className='light-text'>Check out your referrals and commissions.</p>
                </div>
              </div>

              <div>
                <div className='pt-3'>
                  <button onClick={showStatusModal} className='dashboard-btn py-2 px-3'>
                    <i class="bi bi-plus-lg pe-2"></i>
                    Add Referral
                  </button>
                </div>
              </div>
            </div>
          </section>


          <section>
            <div className='border1 border-radius-5px'>
              <div className="row g-0">
                <div className="col-sm-6 ">
                  <div className="border-right1">
                    <div className="p-3">
                      <div className="d-flex justify-content-between pb-4">
                        <div>
                          <p className='sm-text pb-2'>Refer Us & Earn</p>
                          <p>The Link below is your Referral Link</p>
                        </div>
                      </div>

                      <div className="row pb-2">
                        <div className="col-12">
                          <div className="width-100">
                            <div className="border1 border-radius-5px">
                              <div className="row">
                                <div className="col-10">
                                  <p className='dashboard-secondary-bg p-2 '>
                                    <i class="bi bi-link-45deg"></i> {userProfile?.user_details.id}
                                  </p>
                                </div>

                                <div className="col-2  cursor-pointer" onClick={() => handleCopy(userProfile?.user_details.id)}>
                                  <div className="d-flex align-items-center height-100">
                                    {copied ? (
                                      <p className='sucessfull-text'><i class="bi bi-clipboard-check"></i></p>
                                    ): (
                                      <p><i class="bi bi-clipboard pe-1"></i></p>
                                    )}

                                    <div className="dashbboard-referral-link-copy-text">
                                      {copied ? (
                                        <p className='sucessfull-text'>copied</p>
                                      ): (
                                        <p>Copy</p>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="dashboard-secondary-bg height-100 p-3">
                    <p className="light-text">My Referral</p>
                    <div className="d-flex justify-content-center">
                      <div className="d-flex">
                        <div className='me-5 text-center'>
                          <p className='sm-text'>{userReferralCount}</p>
                          <p className='light-text'>Total Joined</p>
                        </div>

                        <div className='text-center'>
                          < p className='sm-text'>{formatCurrency(totalUserCommission)} USD</p>
                          <p className='light-text'>Referral Commission</p>
                        </div>
                      </div>
                    </div>

                    <div className='mt-4'>
                      <Link to='/dashboard/comission/' className='dashboard-btn py-2 px-3'>View Commission</Link>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </section>
          <section className=''>
            <p className="sm-text light-text py-4">Referral Table</p>
            <div className='dashboard-boxes border-radius-5px dahboard-table  dash-scroll-bar non-wrap-text'>
              <div className=''>
                <table>
                  <thead>
                    <tr>
                      <th className='sm-text-2 py-2'>Client Name</th>
                      <th className='sm-text-2'>Client ID</th>
                      <th className='sm-text-2'>Date Registered</th>
                    </tr>
                  </thead>

                  <tbody>
                    {userReferralData.length > 0 ? (
                      userReferralData.map((data) =>(
                        <tr key={data.id}> 
                          <td className='py-2'>{formatName(data.referral_user_details.full_name)}</td>
                          <td>{data.referral_user_details.id}</td>
                          <td>{formatDate(data.created_at)}</td>
                        </tr>
                      ))
                    ): (
                        <tr>
                          <td className='py-3'>No details available</td>
                        </tr>
                    )}
                  </tbody>
                </table>


              </div>


              {userReferralLoader && (
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