import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faBan, faChartLine, faCircleDollarToSlot, faCreditCard,  faHandHoldingDollar, faMailBulk, faMoneyBillTransfer, faShieldHalved, faTriangleExclamation} from "@fortawesome/free-solid-svg-icons"
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect} from "react";
import AuthContext from "../../../context/AuthContext";
import '../../../css/dashboardCss/dashboard.css'
import '../../../css/dashboardCss/adminDahboardCss/adminHome.css'
import { AdminDashFrame } from "../../../component/adminDashFrame";
import '../../../css/style.css'
import spin from '../../../img/Spin.gif'
import AllDataContext from '../../../context/Alldata';
import { DashboardFooter } from '../../../component/dashbaordFooter';
import FloatingAlert from '../../../component/alert';
import { ClientDashFrame } from '../../../component/ClientDashFrame';
import { useForm } from 'react-hook-form';


export const ClientUserVerification = () =>{
  const {authTokens,
    OnbodyClick,
    formatDate,
    formatCurrency,
    formatName,
    shortName,
    disablebutton, 
    setDisablebutton,

    messages,
    alertVisible,
    setAlertVisible,
    isSuccess,
    showAlert,
    setMessage,
    setIsSuccess,
    userProfile,
    formatFirstName,
    handleCopy,
    copied,
    setLoader,
    


  } = useContext(AuthContext)


  const navigate  = useNavigate()



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
      <div>
        <FloatingAlert
          message={messages}
          isVisible={alertVisible}
          onClose={() => setAlertVisible(false)}
          successs={isSuccess}
        />
      </div>


      <div className="main-content pb-5" onClick={OnbodyClick}>
        <div className="container-lg">
          <div className="row justify-content-center">
            {userProfile?.user_verification.length === 0 ? (
              <div className="col-11 col-sm-10 col-md-8 col-xxl-7 pt-4">
                <div className='text-center pb-3'>
                  <p className="dashboard-header pb-3">User Verification</p>
                  <p className="small-text-2 light-text">To comply with regulation each participant will have to go through indentity verification (User Details) to prevent fraud causes.</p>
                </div>

                <div className=" dashboard-boxes border-radius-5px p-4">
                  <div className='text-center'>
                    <div>
                      <div className='pb-4'>
                        <FontAwesomeIcon className='p-3 dashboard-purple-bg xl-text border-radius-50' icon={faShieldHalved}/>
                      </div>

                      <div>
                        <p className='sm-text text-center' >User verification is needed in other to proceed. Please note that once you submit your documents the User verification process will automatically begin. Please ensure your details are correct.</p>
                      </div>

                      <div className='pt-5 pb-4'>
                        <Link to='/dashboard/user-verification/upload/' className='Link dashboard-btn p-3 font-bold '><span className='d-none d-sm-inline-block'>Click here to </span> complete your verification</Link>
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            ): (
              <div>
                {userProfile?.user_verification[0].status === 'verified' &&
                  <div className="row justify-content-center pt-5 mt-3">
                  <div className='text-center col-11 col-sm-10 col-md-8 col-xxl-6 pt-4'>
                    <div>
                      <div className='pb-4'>
                        <FontAwesomeIcon className='p-3 dashboard-green-bg xl-text border-radius-50' icon={faShieldHalved}/>
                      </div>
                      <div>
                        <p className='dashboard-header'>User Verification Accepted</p>
                      </div>
                      <div>
                        <p className='sm-text text-center light-text' >Your details has been reviwed and accepted. Thanks for choosing AmaniLightEquity </p>
                      </div>

                      <div className='pt-5 pb-4'>
                        <Link to='/dashboard/home/' className='Link '>
                          <p className='dashboard-green-btn pt-2 pb-3 font-bold width-100'>Close</p>
                        </Link>
                      </div>
                    </div>
                  </div>
                  </div>
                }

                {userProfile?.user_verification[0].status === 'pending' &&
                  <div className="row justify-content-center pt-5 mt-3">
                    <div className='text-center col-11 col-sm-10 col-md-8 col-xxl-6 pt-4'>
                      <div>
                        <div className='pb-4'>
                          <FontAwesomeIcon className='p-3 dashboard-yellow-bg xl-text border-radius-50' icon={faShieldHalved}/>
                        </div>
                        <div>
                          <p className='dashboard-header'>User Verification Pending</p>
                        </div>
                        <div>
                          <p className='sm-text text-center light-text' >Your details is still pending and under review, you will receive an email once verification is complete.</p>
                        </div>

                        <div className='pt-5 pb-4'>
                          <Link to='/dashboard/home/' className='Link '>
                            <p className='dashboard-yellow-btn pt-2 pb-3 font-bold width-100'>Close</p>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                }

                {userProfile?.user_verification[0].status === 'canceled' &&
                  <div className="row justify-content-center pt-5 mt-3">
                    <div className='text-center col-11 col-sm-10 col-md-8 col-xxl-6 pt-4'>
                      <div>
                        <div className='pb-4'>
                          <FontAwesomeIcon className='p-3 dashboard-red-bg lg-text border-radius-50' icon={faShieldHalved}/>
                        </div>
                        <div>
                          <p className='dashboard-header'>User Verification Rejected</p>
                        </div>
                        <div>
                          <p className='sm-text text-center light-text' >Your details has been reviwed and rejected. Please wait 2-3 days to <br /> re-upload </p>
                        </div>
      
                        <div className='pt-5 pb-4'>
                          <Link to='/dashboard/home/' className='Link '>
                            <p className='dashboard-red-btn pt-2 pb-3 font-bold width-100'>Close</p>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                }



              </div>
            )}
          </div>
        </div>
      </div>

      <div className='py-5'>
        <DashboardFooter />
      </div>


 
    </div>
      
  )
}