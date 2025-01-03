import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faBan, faChartLine, faCircleDollarToSlot, faCreditCard,  faHandHoldingDollar, faMailBulk, faMoneyBillTransfer, faTriangleExclamation} from "@fortawesome/free-solid-svg-icons"
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


export const ClientInvestmentPlan = () =>{
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

  const {
    investmentPlanData,
    InvestmentPlanFunction,
    investemmentPlanLoder,

  } = useContext(AllDataContext)

  const navigate  = useNavigate()
  const [processingText, setProcessingText] = useState('Processing')

  const checkTimeDuration = (duration) =>{
    if (duration === "hourly"){
      return "hours"

    }else if(duration === 'daily'){
      return 'days'

    }else if(duration === 'weekly'){
      return 'weeks'

    }else if(duration === 'monthly'){
      return 'months'
    }else if(duration === 'yearly'){
      return 'years'

    }

  }

  useEffect(() =>{
    InvestmentPlanFunction()

  }, [])

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();


  useEffect(() => {
    if (loader) {
      const timer = setTimeout(() => {
        setLoader(false);
      }, 3000); // Reset after 1 second

      return () => clearTimeout(timer); // Cleanup the timer to avoid memory leaks
    }
  }, [loader]);


  const NavigateToAddAmount = (id) =>{
    sessionStorage.setItem('dataID', id)
    setLoader(true)
    const timer = setTimeout(() => {
      navigate('/dashboard/investment/buy-plan-amount/')
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
            <div className="container-lg">
              {!loader && 
                <div>
                  <div className='text-center pt-4'>
                    <p className="dashboard-header pb-3">Investment Plans</p>
                    <p className='dashboard-sub-header'>Below are several of our investment plans.</p>
                    <p className="light-text">Choose your favorite plan and start earning now.</p>
                  </div>

                  {investmentPlanData.length > 0 ? (
                    <div className="row g-3 pt-5 mt-3">
                      {investmentPlanData.map((data) => (
                        <div className="col-xl-4  col-lg-6">
                          <div className='dashboard-boxes border-radius-5px'>
                            <div className="">
                              <div className='p-4'>
                                <div className="text-center">
                                  <p className="md-text">{formatName(data.plan_name)}</p>
                                  <p className="sm-text-2 light-text">{data.plan_description}</p>
                                </div>
    
                                <div className="d-flex justify-content-center pt-3 pb-3">
                                  <div className="row width-100 justify-content-between">
                                    <div className='col-6 text-center'>
                                      <div className="d-flex justify-content-center">
                                        <div>
                                          <p className="md-text">{roundUp(data.percentage_return)}%</p>
                                          <p className="light-text">{formatName(data.time_rate)} Interest</p>                                  
                                        </div>
                                      </div>
    
                                    </div>
    
                                    <div className='col-6'>
                                      <div className="d-flex justify-content-center">
                                        <div className=' text-center'>
                                          <p className="md-text">{data.duration}</p>
                                          <p className="light-text">{formatName(checkTimeDuration(data.time_rate))}(s)</p>
                                        </div>
                                      </div>
    
                                    </div>
                                  </div>
                                </div>
                                
                              </div>
                              <hr />
                              <div className="p-3 mx-4">
                                <div className="row g-2 justify-content-between">
                                  <div className="col-5">
                                    <div className="d-flex justify-content-start">
                                      <p className="light-text">Min Amount</p>
                                    </div>
    
                                  </div>
    
                                  <div className="col-2">
                                    <div className="d-flex justify-content-center">
                                      <p>-</p>
                                    </div>
    
                                  </div>
    
                                  <div className="col-5">
                                    <div className="d-flex justify-content-end">
                                      <p>{formatCurrency(data.min_amount)} USD</p>
                                    </div>
                                  </div>
    
    
                                  <div className="col-5">
                                    <div className="d-flex justify-content-start">
                                      <p className="light-text">Max Amount</p>
                                    </div>
                                  </div>
    
                                  <div className="col-2">
                                    <div className="d-flex justify-content-center">
                                      <p>-</p>
                                    </div>
                                  </div>
    
                                  <div className="col-5">
                                    <div className="d-flex justify-content-end">
                                      <p>{formatCurrency(data.max_amount)} USD</p>
                                    </div>
                                  </div>
    
    
                                  <div className="col-5">
                                    <div className="d-flex justify-content-start">
                                      <p className="light-text">Plan Type</p>
                                    </div>
                                  </div>
    
                                  <div className="col-2">
                                    <div className="d-flex justify-content-center">
                                      <p>-</p>
                                    </div>
                                  </div>
    
                                  <div className="col-5">
                                    <div className="d-flex justify-content-end">
                                      <p>{formatName(data.time_rate)}</p>
                                    </div>
                                  </div>
    
                                  <div className="col-5">
                                    <div className="d-flex justify-content-start">
                                      <p className="light-text">Capital Incl.</p>
                                    </div>
                                  </div>
    
                                  <div className="col-2">
                                    <div className="d-flex justify-content-center">
                                      <p>-</p>
                                    </div>
                                  </div>
    
                                  <div className="col-5">
                                    <div className="d-flex justify-content-end">
                                      <p>Yes</p>
                                    </div>
                                  </div>
    
    
    
                                  
                                </div>
    
                                <div className='pt-4 pb-2 mt-3 mb-4'>
                                  <button onClick={() => NavigateToAddAmount(data.id)} className=' dashboard-btn  py-2 width-100 text-center' disabled={disablebutton}>
                                    <p>Invest & Earn</p>
                                  </button>
                                </div>
                              </div>
    
    
                            </div>
                          </div>
    
                        </div>
                      ))} 
                    </div>

                  ) : (
                    <div className='dashboard-boxes border-radius-5px mt-4'>
                      {investemmentPlanLoder ? (
                        <div className="d-flex justify-content-center py-5 my-5">
                          <img src={spin} alt="" width='60px'/>
                        </div>  
                      ) : (
                        <div className="row justify-content-center py-5">
                          <div className="col-11 col-md-6">
                            <div className='text-center'>
                              <div className="d-inline-block border-radius-50 red-background p-3 mb-4">
                                <FontAwesomeIcon className='xl-text' icon={faTriangleExclamation}/>   
                              </div>                 
                              <h2>No Avaliable Plan </h2>
                              <p className='light-text sm-text'>There is no plan avaliable at the moment. Thanks for choosing AmaniLightEquity</p>
                            </div>
                          </div>
                        </div>
                      )}
        
                      
                    </div>
                  )}

                </div>
              }
          </div>
        </div>

        <div className='py-5'>
          <DashboardFooter />
        </div>



    </div>
      
  )
}