import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faBan, faChartLine, faCircleDollarToSlot, faCreditCard,  faHandHoldingDollar, faL, faMailBulk, faMoneyBillTransfer, faTriangleExclamation} from "@fortawesome/free-solid-svg-icons"
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect} from "react";
import AuthContext from "../../../../context/AuthContext";
import '../../../../css/dashboardCss/dashboard.css'
import '../../../../css/dashboardCss/adminDahboardCss/adminHome.css'
import { AdminDashFrame } from "../../../../component/adminDashFrame";
import '../../../../css/style.css'
import spin from '../../../../img/Spin.gif'
import AllDataContext from '../../../../context/Alldata';
import { DashboardFooter } from '../../../../component/dashbaordFooter';
import FloatingAlert from '../../../../component/alert';
import { ClientDashFrame } from '../../../../component/ClientDashFrame';
import { useForm } from 'react-hook-form';
import { ProcessingSpiner } from '../../../../component/spin';


export const AddWithdraw1 = () =>{
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
    loader,
    setLoader,
    roundUp,


  } = useContext(AuthContext)



  const navigate  = useNavigate()
  const [amount, setAmount] = useState('')
  const [processingText, setProcessingText] = useState('Processing')


  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();


  const onSubmit = (data, e) =>{
    setDisablebutton(true)
    if(isValid){
      sessionStorage.setItem('amount', amount)
      setLoader(true)
      const timer = setTimeout(() => {
        if(roundUp(amount) <= roundUp(userProfile.user_balance.balance)){
          navigate('/dashboard/withdraw/payment-options/')
        }else{
          navigate('/dashboard/insufficient-balance/') 
        }
        setLoader(false)
      }, 3000);
      setDisablebutton(false)
      return () => clearTimeout(timer);   
    }else{
      setDisablebutton(false)
    }
  }

  useEffect(() => {
    if (loader) {
      const timer = setTimeout(() => {
        setLoader(false);
      }, 3000); // Reset after 1 second

      return () => clearTimeout(timer); // Cleanup the timer to avoid memory leaks
    }
  }, [loader]);


  return(
    <div>
      <div className="position-sticky1">
        <ClientDashFrame />
        <div>
          <FloatingAlert
            message={messages}
            isVisible={alertVisible}
            onClose={() => setAlertVisible(false)}
            successs={isSuccess}
          />
        </div>

        {loader &&
          <ProcessingSpiner text={processingText}/>
        }


        <div className="main-content pb-5" onClick={OnbodyClick}>

          <div className="container-lg">
            {userProfile?.kyc_verification.status === 'verified' ? (
              <div>
                {!loader && 
                  <div className="row justify-content-center">
                    <div className="col-11 col-sm-10 col-md-8 col-xxl-6 pt-4">
                      <div className='text-center pb-3'>
                        <p className="dashboard-header pb-3">Withdraw Funds</p>
                        <h5 className='pb-2'>Secure and Fast Payouts.</h5>
                        <p className="small-text-2 light-text">Request withdrawals directly from your account. Funds will be processed and sent to your designated payment method after approval.</p>
                      </div>

                      <div className="dashboard-boxes p-3 border-radius-5px  my-3">
                        <div className="d-flex">
                          <div className='ps-2 pe-4 d-flex align-items-center height-100'> 
                            <i class="bi bi-wallet md-text"></i>
                          </div>
                          <div>
                            <p>Current Account Balance</p>
                            <p className="light-text">Total: {formatCurrency(userProfile?.user_balance.balance)} USD</p>
                          </div>
                        </div>
                      </div>

                      <form  onSubmit={handleSubmit(onSubmit)}>
                        <div className="row g-3">

                          <div className="col-12">
                            <label htmlFor="" className="p-2 ">Amount</label>
                            <input type="text" className={`dashboard-input ${errors.amount ? 'error-input' : ''} p-2`} {...register('amount', {required: true})}  value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.00" />
                            {errors.amount && <span style={{color: 'red'}}>This Feild is required</span>} 
                          </div>

                          <div className='col-12 pt-3 '>
                            <button className="dashboard-btn width-100 pt-2 pb-3" type="submit" disabled={disablebutton}>Continue</button>        
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                }
              </div>
            ) : (
              <div className="row justify-content-center py-5">
                <div className="col-11 col-md-6">
                  <div className='text-center'>
                    <div className="d-inline-block border-radius-50 red-background p-3 mb-4">
                      <FontAwesomeIcon className='xl-text' icon={faTriangleExclamation}/>   
                    </div>                 
                    <h2>KYC Verification </h2>
                    <p className='light-text sm-text'>You have not done kyc verififcation. <br />You need to perform all account verification before you can make a withdrawal</p>
                    <p className='sm-text-2 light-text italic-text'>Note: Your KYC/AML and user verification must be verified.</p>
                  </div>

                  <div>
                    <div className='pt-3'>
                      <Link className='Link' to='/dashboard/kyc-aml/' >
                        <div className='dashboard-btn width-100 py-2 px-3'>


                          <div className="py-1 d-flex justify-content-center">
                            <i class="bi bi-plus-lg pe-2"></i>
                            <p>Click here to complete your KYC</p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>

        <div className='py-5'>
          <DashboardFooter />
        </div>


      </div>
    </div>
      
  )
}