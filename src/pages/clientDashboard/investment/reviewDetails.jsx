import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faBan, faChartLine, faCircleDollarToSlot, faCreditCard,  faHandHoldingDollar, faMailBulk, faMoneyBillTransfer, faTriangleExclamation, faWallet} from "@fortawesome/free-solid-svg-icons"
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
import { set, useForm } from 'react-hook-form';
import { ProcessingSpiner } from '../../../component/spin';
import pic from '../../../img/error.png'

export const ClientInvestmentReviewDetails = () =>{
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
    roundUp


  } = useContext(AuthContext)


  const navigate  = useNavigate()
  const [details, setDetails] = useState(null)
  const [amount, setAmount] = useState('')
  const [investPlan, setInvestPlan] = useState('')
  const [processingText, setProcessingText] = useState('Processing')

  useEffect(() =>{
    updateDateTime()

  }, [])


  const Cancel = () =>{
    setProcessingText('Canceling')
    setLoader(true)
    const timer = setTimeout(() => {
      navigate('/dashboard/investment/plan/')
      setLoader(false)
    }, 3000); // Reset after 1 second

    return () => clearTimeout(timer);
  }




  useEffect(() =>{
    const data = sessionStorage.getItem('IndividualData')
    setInvestPlan(sessionStorage.getItem('dataID'))
    setAmount(sessionStorage.getItem('amount'))
    if(data){
      const parsedData = JSON.parse(data)
      setDetails(parsedData)
    }

  }, [])

  const addInvestment = async(e) =>{
    e.preventDefault()
    setLoader(true)

    const formData = new FormData()

    formData.append('user', userProfile.user_details.id)
    formData.append('amount', amount)
    formData.append('investment_plan', investPlan)
    // formData.append('investment_type', investmentType)
    // formData.append('approval_status', status)
    // formData.append('created_at', date)

    try{
      const response = await fetch('http://127.0.0.1:8000/api/user-investment/', {
        method: 'POST',
        body: formData,
        headers:{
          Authorization: `Bearer ${authTokens.access}`
        }
      })


      if(response.ok){
        showAlert()
        setMessage('Investment Sucessfully added')
        navigate('/dashboard/investment/successful/')
        setIsSuccess(true)
        setLoader(false)
        setDisablebutton(false)


      }else{
        const errorData = await response.json()
        const errorMessages = Object.values(errorData)
        .flat()
        .join(', ');
        setMessage(errorMessages)
        setDisablebutton(false)
        setIsSuccess(false)
        setLoader(false)
        showAlert()
      }

      
    }catch(error){
      console.log(error)
      showAlert()
      setMessage('An unexpected error occurred.');
      setDisablebutton(false)
      setIsSuccess(false)
      setLoader(false)

    }  
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
              <div>
                {details != null ? (
                  <div className="row justify-content-center">
                    <div className="col-11 col-sm-10 col-md-8 col-xxl-6 pt-4">
                      <div className='text-center pb-3'>
                        <Link to='/dashboard/investment/buy-plan-amount/' className='light-link'><i class="bi bi-arrow-left pe-2"></i> Previous Page</Link>
                        <p className="dashboard-header pb-3">Review Investment Details</p>
                        <h5 className='pb-2'>You are about to purchase {formatName(details.plan_name)} plan with amount off {formatCurrency(amount)} USD</h5>
                        <p className="small-text-2 light-text">Please review and confirm the Investment details..</p>
                      </div>

                      <div className="dashboard-boxes px-5 pt-4 pb-5 border-radius-5px">
                        <div className="row g-4 pb-3">

                          <div className='col-6'>
                            <p className='light-text'>Transaction Date:</p>
                            <p>{currentDateTime}</p>
                          </div>

                          <div className='col-6'>
                            <p className='light-text'>Plan:</p>
                            <p>{formatName(details.plan_name)} Plan</p>
                          </div>

                          <div className='col-6'>
                            <p className='light-text'>Percentage Return:</p>
                            <p>{roundUp(details.percentage_return)}%</p>
                          </div>

                          <div className='col-6'>
                            <p className='light-text'>Investment Amount:</p>
                            <p>{formatCurrency(amount)} USD</p>
                          </div>
                        </div>
                      </div>

                      <div className="dashboard-boxes border-radius-5px p-3 mx-3 mt-3">
                        <div className="d-flex justify-content-between">
                          <p className="light-text">You'll Invest</p>
                          <p>{formatCurrency(amount)} USD</p>
                        </div>
                        
                      </div>

                      <div className='pt-4 text-center'>
                        <p className='light-text'>Click the button below to confirm the investment</p>
                      </div>

                      <div className='mx-5 pt-3'>
                        <button onClick={addInvestment} className="dashboard-btn width-100 pt-2 pb-3" type="submit" disabled={disablebutton}>Confirm & Pay</button>      
                        <div className="d-flex justify-content-center pt-2"> 
                          <button onClick={Cancel}  className='text-center py-2 px-4 dashboard-red-btn mt-2 '>Cancel Transaction</button>  
                        </div>   
                      </div>


                    </div>
                  </div>
                ) : (
                  <div className="d-flex justify-content-center py-4">
                    <img src={spin} alt="" width='60px'/>
                  </div> 
                )}
              </div>

          </div> 

        } 
      </div>

      <div className='py-5'>
        <DashboardFooter />
      </div>


    </div>
      
  )
}