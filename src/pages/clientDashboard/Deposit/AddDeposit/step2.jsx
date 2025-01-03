import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faBan, faChartLine, faCircleDollarToSlot, faCreditCard,  faHandHoldingDollar, faMailBulk, faMoneyBillTransfer, faTriangleExclamation} from "@fortawesome/free-solid-svg-icons"
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
import { set, useForm } from 'react-hook-form';
import { ProcessingSpiner } from '../../../../component/spin';
import pic from '../../../../img/error.png'

export const AddDeposit2 = () =>{
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
    updateDateTime,
    currentDateTime,


  } = useContext(AuthContext)


  const navigate  = useNavigate()
  const [details, setDetails] = useState(null)
  const [amount, setAmount] = useState('')
  const [processingText, setProcessingText] = useState('Processing')

  useEffect(() =>{
    updateDateTime()

  }, [])

  const Cancel = () =>{
    setProcessingText('Canceling')
    setLoader(true)
    const timer = setTimeout(() => {
      navigate('/dashboard/deposit/step-1/')
      setLoader(false)
    }, 3000); // Reset after 1 second

    return () => clearTimeout(timer);
  }




  useEffect(() => {
    if (loader) {
      const timer = setTimeout(() => {
        setLoader(false);
      }, 3000); // Reset after 1 second

      return () => clearTimeout(timer); // Cleanup the timer to avoid memory leaks
    }
  }, [loader]);

  useEffect(() =>{
    const data = sessionStorage.getItem('paymentMethod')
    setAmount(sessionStorage.getItem('despositAmount'))
    if(data){
      const parsedData = JSON.parse(data)
      setDetails(parsedData)
    }


  }, [])

  const NavigateToStep3 = () =>{
    setProcessingText("Reviewing")
    setLoader(true)
    const timer = setTimeout(() => {
      navigate('/dashboard/deposit/step-3/')
      setLoader(false)
    }, 3000); // Reset after 1 second

    return () => clearTimeout(timer);
 
  }

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
 

      {loader &&
        <ProcessingSpiner text={processingText}/>
      }


      <div className="main-content pb-5" onClick={OnbodyClick}>
        {(!loader) &&     
          <div className="container-lg">
            {details != null ? (
              <div className="row justify-content-center">
                <div className="col-11 col-sm-10 col-md-8 col-xxl-6 pt-4">
                  <div className='text-center pb-3'>
                    <Link to='/dashboard/deposit/step-1/' className='light-link'><i class="bi bi-arrow-left pe-2"></i> Previous Page</Link>
                    <p className="dashboard-header pb-3">Review Deposit Details</p>
                    <h5 className='pb-2'>You are about to deposit <span className="font-bold">{formatCurrency(amount)}</span>  USD into your account.</h5>
                    <p className="small-text-2 light-text">Please review and confirm the deposit details..</p>
                  </div>

                  <div className="dashboard-boxes px-5 pt-4 pb-5 border-radius-5px">
                    <div className="row g-4 pb-3">

                      <div className='col-6'>
                        <p className='light-text'>Transaction Date:</p>
                        <p>{currentDateTime}</p>
                      </div>

                      <div className='col-6'>
                        <p className='light-text'>Network:</p>
                        <p>{details.network}</p>
                      </div>

                      <div className='col-6'>
                        <p className='light-text'>Payment Method:</p>
                        <p>{formatName(details.name)} ({details.type})</p>
                      </div>

                      <div className='col-6'>
                        <p className='light-text'>Deposit Amount:</p>
                        <p>{formatCurrency(amount)} USD</p>
                      </div>
                    </div>
                  </div>

                  <div className="dashboard-boxes border-radius-5px p-3 mx-3 mt-3">
                    <div className="d-flex justify-content-between">
                      <p className="light-text">You'll Send</p>
                      <p>{formatCurrency(amount)} USD</p>
                    </div>
                    
                  </div>

                  <div className='pt-4 text-center'>
                    <p className='light-text'> Payment info for ({formatName(details.name)} Wallet Address) will be available once you proceed.</p>
                  </div>

                  <div className='mx-5 pt-3'>
                    <button onClick={NavigateToStep3} className="dashboard-btn width-100 pt-2 pb-3" type="submit" disabled={disablebutton}>Confirm & Pay</button>    
                    <div className="d-flex justify-content-center pt-2"> 
                      <button onClick={Cancel}  className='text-center py-2 px-4 dashboard-red-btn mt-2 '>Cancel Transaction</button>  
                    </div> 
                  </div>


                </div>
              </div>
            ) : (
              <div>
                <div className="row justify-content-center">
                  <div className='text-center col-11 col-sm-10 col-md-8 col-xxl-6 pt-5'>
                    <img src={pic} alt="" width='150px'/>
                    <p className="dashboard-header">Error</p>
                    <p className='light-text pb-3'>There was an error processing your request. Please go back and <br /> restart the process</p>
                    <Link to='/dashboard/deposit/step-1/' className="Link">
                      <p className='dashboard-btn width-100 pt-2 pb-3'><i class="bi bi-arrow-left pe-2"></i>Back</p>   
                    </Link>      
                  </div>
                </div>

              </div>
            )}

          </div> 

        } 
      </div>

      <div className='py-5'>
        <DashboardFooter />
      </div>


    </div>
      
  )
}