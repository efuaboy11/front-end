import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faBan, faChartLine, faCircleDollarToSlot, faCreditCard,  faHandHoldingDollar, faL, faMailBulk, faMoneyBillTransfer, faTriangleExclamation} from "@fortawesome/free-solid-svg-icons"
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
import { ProcessingSpiner } from '../../../component/spin';


export const ClientInvestmentAddAmount = () =>{
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
    roundUp


  } = useContext(AuthContext)



  const navigate  = useNavigate()
  const [amount, setAmount] = useState('')
  const [data, setData] = useState(null)
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
          navigate('/dashboard/investment/review-details/')
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

  const Cancel = () =>{
    setProcessingText('Canceling')
    setLoader(true)
    const timer = setTimeout(() => {
      navigate('/dashboard/investment/plan/')
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

  const IndvividualPlan = async(id) =>{
    setDisablebutton(true)
    let response = await fetch(`http://127.0.0.1:8000/api/investment-plan/${sessionStorage.getItem('dataID')}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens.access}`
      }
      
    })
    const data = await response.json()

    if (response.ok){
      setData(data)
      sessionStorage.setItem('IndividualData', JSON.stringify(data))
      setDisablebutton(false)

    }else{
      setDisablebutton(false)
    }

  }

  useEffect(() =>{
    sessionStorage.getItem('dataID')
    IndvividualPlan()
  }, [])

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

            <div>
              {!loader && 
                <div className="row justify-content-center">
                  <div className="col-11 col-sm-10 col-md-8 col-xxl-6 pt-4">
                    <div className='text-center pb-3'>
                      <Link to='/dashboard/investment/plan/' className='light-link'><i class="bi bi-arrow-left pe-2"></i> Back to Plan</Link> 
                      <p className="dashboard-header pb-3">Ready to get started?</p>
                    </div>


                    <div className="dashboard-boxes p-3 border-radius-5px  mb-3">
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
                          <label htmlFor="" className="p-2 ">Investment Amount</label>
                          <input type="text" className={`dashboard-input  ${errors.amount ? 'error-input' : ''} p-2`} {...register('amount', {required: true})}  value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.00" />
                          <p className='light-text sm-text-2 italic-text'>Note: Minimum amount {formatCurrency(data?.min_amount)} USD and up to {formatCurrency(data?.max_amount)} USD</p>
                          {errors.amount && <span style={{color: 'red'}}>This Feild is required</span>} 
                        </div>

                        <div className='col-12 pt-3 '>
                          <button className="dashboard-btn width-100 pt-2 pb-3" type="submit" disabled={disablebutton}>Continue to Invest</button> 
                          <div className="d-flex justify-content-center pt-2"> 
                            <button onClick={Cancel}  className='text-center py-2 px-4 dashboard-red-btn mt-2 '>Cancel Transaction</button>  
                          </div>       
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              }
            </div>
  

          </div>
        </div>

        <div className='py-5'>
          <DashboardFooter />
        </div>


      </div>
    </div>
      
  )
}