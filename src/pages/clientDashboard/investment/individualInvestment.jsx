import '../../../css/dashboardCss/dashboard.css'
import '../../../css/dashboardCss/adminDahboardCss/individualInvestment.css'
import AuthContext from "../../../context/AuthContext";
import { AdminDashFrame } from '../../../component/adminDashFrame';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandshakeAngle, faX } from '@fortawesome/free-solid-svg-icons';
import { useForm } from 'react-hook-form';
import FloatingAlert from '../../../component/alert';
import spin from '../../../img/Spin.gif'
import AllDataContext from '../../../context/Alldata';
import { DashboardFooter } from '../../../component/dashbaordFooter';
import { ClientDashFrame } from '../../../component/ClientDashFrame';

export const ClientIndividualInvestment = () =>{
  const { authTokens, 
    OnbodyClick,
    formatCurrency,
    formatName,
    roundUp,
    formatDate,
    formatDateTime,
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
    investmentData,
    setInvestmentData,
  }= useContext(AllDataContext)

  const navigate = useNavigate()

  const [details, setDetails] = useState(null)
  const [urlName, setUrlName] = useState('')
  const [urlLink, setUrlLink] = useState('')
  const [showMenu, setShowMenu] = useState(false)

  const [netProfit, setNetProfit] = useState(null)
  const [currentInterest, setCurrentInterest] = useState(null)
  const [adjustment, setAdjustment] = useState(null)


  const [cashoutModal, setCashoutModal] = useState(false)
  const [increaseInvestmentOverlay, setIncreaseInvestmentOverlay] = useState(false)



  const [investmentAmount, setInvestmentAmount] = useState('')
  const updateType = useRef(null)
  const addIntrest = useRef(null)
  const increaseInvestment = useRef(null)
  const statusModal = useRef(null)
  const [isAnyModalOPen, setIsAnyModalOpen] = useState(false)
  const [investmentInterestData, setInvestmentInterestData] = useState(null)
  const [increaseInvestmentbtnLoader, setIncreaseInvestmentbtnLoader] = useState()
  const [cashoutebtnLoader, setCashoutbtnLoader] = useState(false)



  const hideCashoutModal = () => {
    setCashoutModal(false)
    setIsAnyModalOpen(false)
    setShowMenu(false)

  }

  const showCahoutModal = () => {
    setCashoutModal(true)
    setIsAnyModalOpen(true)
  }


  const showIncreaseInvestment = () =>{
    if(increaseInvestment.current){
      increaseInvestment.current.style.transform = `translateY(${0}px)`
      increaseInvestment.current.style.transition = `all ${1.5}s ease`
    }
    setIncreaseInvestmentOverlay(true)
    setIsAnyModalOpen(true)
  }

  const HideIncreaseInvestment = () =>{
    if(increaseInvestment.current){
      increaseInvestment.current.style.transform = `translateY(${-650}%)`
      increaseInvestment.current.style.transition = `all ${5}s ease`
    }

    setIsAnyModalOpen(false)
    setShowMenu(false)

    

  }



  const {
    register: registerInvestment,
    handleSubmit: handleSubmitInvestment,
    formState: { errors: errorsInvestment, isValid: isValidInvestment },
  } = useForm();


  const {
    register: registerStatus,
    handleSubmit: handleSubmitStatus,
    formState: { errors: errorsStatus, isValid: isValidStatus },
  } = useForm();




  


  const onIncreaseInvestmentSubmit = (data, e) =>{
    setDisablebutton(true)
    setIncreaseInvestmentbtnLoader(true)
    if(isValidInvestment){
      IncreaseInvestmentFunction(e)
      
    }else{
      setDisablebutton(false)
    }

  }








  const IncreaseInvestmentFunction = async () => {
    setDisablebutton(true)

    try{
      let response = await fetch(`http://127.0.0.1:8000/api/user-investment/add-money/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authTokens.access}`,
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          user_id: details.user,
          investment_id: details.investment_id,
          amount_add: investmentAmount
        })
      })

      if (response.ok) {
        setDisablebutton(false)
        HideIncreaseInvestment()
        showAlert()
        setIsSuccess(true)
        setMessage('Money  added successfully')
        setIncreaseInvestmentbtnLoader(false)
        UpdateDetails()
      } else {
        const errorData = await response.json()
        const errorMessages = Object.values(errorData)
        .flat()
        .join(', ');
        setMessage(errorMessages)
        showAlert()
        setIsSuccess(false)
        setDisablebutton(false)
        setIncreaseInvestmentbtnLoader(false)
      }

    }catch{
      showAlert()
      setMessage('An unexpected error occurred.');
      setDisablebutton(false)
      setIsSuccess(false)
      setIncreaseInvestmentbtnLoader(false)

    }
  }



  const CashoutFunction = async () => {
    setDisablebutton(true)
    setCashoutbtnLoader(true)

    try{
      let response = await fetch(`http://127.0.0.1:8000/api/cashout/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authTokens.access}`,
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          user: details.user,
          investment_id: details.investment_id,
        })
      })

      if (response.ok) {
        setCashoutbtnLoader(false)
        setDisablebutton(false)
        setCashoutModal(false)
        showAlert()
        setIsSuccess(true)
        setMessage('Money successfully added to your balance')
        UpdateDetails()
      } else {
        const errorData = await response.json()
        const errorMessages = Object.values(errorData)
        .flat()
        .join(', ');
        setMessage(errorMessages)
        setCashoutbtnLoader(false)
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
      setCashoutbtnLoader(false)

    }
  }


  const UpdateDetails = async() =>{
    let response = await fetch(`http://127.0.0.1:8000/api/user-investment/${details.id}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens.access}`
      }
      
    })
    if(response.ok){
      const data = await response.json()
      sessionStorage.setItem('IndividualData', JSON.stringify(data))
  
    }
    

  }

  const InvestmentIntrest = async() =>{

    let response = await fetch(`http://127.0.0.1:8000/api/investment-intrest/filter/?user=${details?.user}&investment_id=${details?.investment_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens.access}`
      }
      
    })

    if(response.ok){
      const data = await response.json()
      const sortedData = data.sort((a, b) => b.id - a.id);
      sessionStorage.setItem('InvestmentInterestData', JSON.stringify(sortedData))
      console.log(data)

    }
    
  }

    


  
  useEffect(() => {
    if(details){
      setNetProfit(details?.net_profit)
      setCurrentInterest(details?.current_intrest_return)
      setAdjustment(5 - details?.adjustment)
      console.log(adjustment)
    

    }



  }, [details]);

  useEffect(() => {
    let timer;
    if (isAnyModalOPen === false) {
      timer = setTimeout(() => {
        setIncreaseInvestmentOverlay(false)
      }, 1000);
    }

  
    return () => clearTimeout(timer);
  }, [isAnyModalOPen]);


  const radius = 120
  const circumference = 2 * Math.PI * radius
  const progress = (currentInterest/netProfit) * 100
  const strokeDashoffset = circumference - (progress/100) * circumference

  const radius2 = 100
  const circumference2 = 2 * Math.PI * radius2
  const progress2 = (currentInterest/netProfit) * 100
  const strokeDashoffset2 = circumference2 - (progress2/100) * circumference2
  
  const progress3 = ((details?.adjustment) / 5) * 100; // This should be 100 when adjustment is 0
  const strokeDashoffset3 = circumference2 - (progress3 / 100) * circumference2; // Correct offset calculation

  
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

  const toogleMenu = () =>{
    setShowMenu(!showMenu)
  }

  useEffect(() =>{
    const data = sessionStorage.getItem("IndividualData")

    setUrlName(sessionStorage.getItem('urlName'))
    setUrlLink(sessionStorage.getItem('urlLink'))
    if(data){
      const parsedData = JSON.parse(data)
      setDetails(parsedData)

    }
  }, [])


  useEffect(() =>{
    const data = sessionStorage.getItem("InvestmentInterestData")
    if(data !== null){
      const parsedData = JSON.parse(data)
      setInvestmentInterestData(parsedData)
      console.log(investmentInterestData)

    }else{
      setInvestmentInterestData([])
    }
  }, [])



  return(
    <div>
      <div className="position-sticky1">
        <ClientDashFrame />
      </div>



      <div className="main-content pb-5" onClick={OnbodyClick}>
        <section>
          <div>
            <FloatingAlert
              message={messages}
              isVisible={alertVisible}
              onClose={() => setAlertVisible(false)}
              successs={isSuccess}
            />
          </div>

      

          {cashoutModal &&
            <section className="overlay-background">
              <div className="dashboard-modal-container">
                <div className="dashboard-delete-modal-content">
                  <h5>Cashout?</h5>
                  <hr />
                  <p>This will add your interest to your balance.</p>
                  <div className="d-flex justify-content-between py-3">
                    <div></div>
                    <div className='d-flex align-items-center height-100 pe-2'>
                      <button  className="dashboard-submit-btn  dashboard-btn px-4 py-2 me-3" disabled={disablebutton} onClick={CashoutFunction}>    
                        <span class={`${cashoutebtnLoader ? 'dashboard-submit-spinner': ''}`}></span>
                        <span class={`${cashoutebtnLoader ? 'dashboard-submit-btn-visiblity': ''}`}>Cashout</span>
                      </button> 
                      <p className="light-link cursor-pointer" onClick={hideCashoutModal}>Cancel</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          }






          <div className={`${increaseInvestmentOverlay ? 'overlay-background pt-5': ''}`}>
              <div className="dashboard-update-status-container" ref={increaseInvestment}>
                <div className="row justify-content-center">
                  <div className="col-xl-3 col-lg-5 col-md-6 col-sm-9 col-11">
                    <div className="dashboard-update-status-content">
                      <div className="d-flex justify-content-end">
                        <FontAwesomeIcon className='sm-text cursor-pointer' icon={faX} onClick={HideIncreaseInvestment}/>
                      </div>
                      <form onSubmit={handleSubmitInvestment(onIncreaseInvestmentSubmit)}>
                        <div>
                          <label htmlFor="" className="p-2 d-block">Amount</label>
                          <input  className={`${errorsInvestment.investmentAmount ? 'error-input' : ''} d-block dashboard-input dashboard-update-status-input`} {...registerInvestment('investmentAmount', {required: true})} type="text"   value={investmentAmount} onChange={(e) => setInvestmentAmount(e.target.value)} />
                          {errorsInvestment.investmentAmount && <span style={{color: 'red'}}>This Feild is required</span>} 
                        </div>

                        <div className="d-flex justify-content-end">
                          <div className='pt-3'>
                            <button  className="dashboard-submit-btn  dashboard-btn py-2 px-4" type="submit" disabled={disablebutton}>    
                              <span class={`${increaseInvestmentbtnLoader ? 'dashboard-submit-spinner': ''}`}></span>
                              <span class={`${increaseInvestmentbtnLoader ? 'dashboard-submit-btn-visiblity': ''}`}>Submit</span>
                            </button>
                          </div>
                        </div>


                      </form>

                    </div>
                  </div>
                </div>

              </div>
          </div>

        </section>



        {details != null ? 
          (
            <div className="container-xl">
            <section>
              <div className="investment-header-container">
                <div>
                  <div  className="pb-2 pt-5">
                    <div>
                      <Link to={`${urlLink}`} className='light-link '><i class="bi bi-arrow-left"></i> {urlName} Investments</Link>
                      <p className='dashboard-header my-2'>{formatName(details.plan_details.plan_name)} Plan {roundUp(details.plan_details.percentage_return)}% - {formatName(details.plan_details.time_rate)}</p>
                      <div className='d-flex'>
                        <p className='me-4'>Last Updated: {details.last_update_time ? formatDateTime(details.last_update_time) : <i class="bi bi-three-dots"></i>}</p>
                        <div>
                          <p className={`sucessfull p-1 sm-text-2  border-radius-5px ${details.investment_status === 'awaiting' && 'pending'} ${details.investment_status === 'canceled' && 'failed'} ${details.investment_status === 'active' && 'sucessfull'} ${details.investment_status === 'completed' && 'completed'}`}>{details.investment_status}</p>
                        </div>
                        
                      </div>

                    </div>

                  </div>
                </div>

                <div className='position-relative1'>

                    <div className='d-flex '>
                      <div className='pt-3 me-3'>
                        <button onClick={showCahoutModal}  className='dashboard-btn p-3'>
                          <FontAwesomeIcon icon={faHandshakeAngle}/>
                        </button>
                        <p className='sm-text-2 light-text pt-2'>Cashout</p>
                      </div>

                      <div className='pt-3'>
                        <button  onClick={showIncreaseInvestment} className='dashboard-inverse-btn font-bold p-3'>
                          <i class="bi bi-graph-up-arrow"></i>
                        </button>
                        <p className='sm-text-2 text-center light-text pt-2'>Increase <br /> Investment</p>
                      </div>
                    </div>
              
  
                </div>
              </div>
            </section>

            <section className='pt-4 mt-2'>
              <div className="dashboard-boxes border-radius-5px">
                <div>
                  <div className="row ps-4 py-4 gy-4">
                    <div className="col-sm-8">
                      <div className="d-flex">
                        <div className='pe-4'>
                          <h4>{formatCurrency(details.amount)} USD <span className='px-3 light-text d-none d-sm-inline-block'> + </span></h4>
                          <p className='light-text'>Invested</p>
                        </div>

                        <div>
                          <h4>{formatCurrency(details.net_profit)} USD</h4>
                          <p className='light-text'>Profit (Approx)</p>
                        </div>
                      </div>
                    </div>

                    <div className="col-sm-4">
                      <div>
                        <h4>{formatCurrency(details.total_intrest_return)} USD</h4>
                        <p className='light-text'>Profit (Approx)</p>
                        </div>
                    </div>
                  </div>
                </div>

                <div className='px-4 pb-4'>
                  <div className="row gx-5 pb-1">

                    
                    <div className="col-xl-4 col-md-6 border-bottom1 py-1">
                      <div className="d-flex justify-content-between">
                        <p className='light-text'>Investor:</p>
                        <p>{formatName(details.user_details.full_name)}</p>
                      </div>
                    </div>

                    <div className="col-xl-4 col-md-6 border-bottom1 py-1">
                      <div className="d-flex justify-content-between">
                        <p className='light-text'>Plan:</p>
                        <p>{formatName(details.plan_details.plan_name)}</p>
                      </div>
                    </div>

                    <div className="col-xl-4 col-md-6 border-bottom1 py-1">
                      <div className="d-flex justify-content-between">
                        <p className='light-text'>Adjusted Amount:</p>
                        <p>{details.adjustment}/5 times</p>
                      </div>
                    </div>



                    <div className="col-xl-4 col-md-6 border-bottom1 py-1">
                      <div className="d-flex justify-content-between">
                        <p className='light-text'>Term Duration:</p>
                        <p>{details.plan_details.duration} {checkTimeDuration(details.plan_details.time_rate)}</p>
                      </div>
                    </div>

                    <div className="col-xl-4 col-md-6 border-bottom1 py-1">
                      <div className="d-flex justify-content-between">
                        <p className='light-text'>Transaction ID:</p>
                        <p>{details.investment_id}</p>
                      </div>
                    </div>

                    <div className="col-xl-4 col-md-6 border-bottom1 py-1">
                      <div className="d-flex justify-content-between">
                        <p className='light-text'>Investment Amount:</p>
                        <p >{formatCurrency(details.amount)} USD </p>
                      </div>
                    </div>

                    <div className="col-xl-4 col-md-6 border-bottom1 py-1">
                      <div className="d-flex justify-content-between">
                        <p className='light-text'>Return Period:</p>
                        <p>{details.plan_details.time_rate}</p>
                      </div>
                    </div>

                    <div className="col-xl-4 col-md-6 border-bottom1 py-1">
                      <div className="d-flex justify-content-between">
                        <p className='light-text'>Capital Return:</p>
                        <p>Capital Included</p>
                      </div>
                    </div>

                    <div className="col-xl-4 col-md-6 border-bottom1 py-1">
                      <div className="d-flex justify-content-between">
                        <p className='light-text'>Return Profit:</p>
                        <p>{details.return_profit} USD</p>
                      </div>
                    </div>

                    <div className="col-xl-4 col-md-6 border-bottom1 py-1">
                      <div className="d-flex justify-content-between">
                        <p className='light-text'>Term Starts At:</p>
                        <p>{details.investment_begins ? formatDate(details.investment_begins) : <i class="bi bi-three-dots"></i>}</p>
                      </div>
                    </div>

                    <div className="col-xl-4 col-md-6 border-bottom1 py-1">
                      <div className="d-flex justify-content-between">
                        <p className='light-text'>Date Created:</p>
                        <p>{details.created_at ? formatDate(details.created_at): <i class="bi bi-three-dots"></i>}</p>
                      </div>
                    </div>
                    <div className="col-xl-4 col-md-6 border-bottom1 py-1">
                      <div className="d-flex justify-content-between">
                        <p className='light-text'>Current Profit:</p>
                        <p>{formatCurrency(details.current_intrest_return)}USD</p>
                      </div>
                    </div>

                    <div className="col-xl-4 col-md-6 border-bottom1 py-1">
                      <div className="d-flex justify-content-between">
                        <p className='light-text'>Term End At:</p>
                        <p>{details.investment_ends ? formatDate(details.investment_ends): <i class="bi bi-three-dots"></i>}</p>
                      </div>
                    </div>

                    <div className="col-xl-4 col-md-6 border-bottom1 py-1">
                      <div className="d-flex justify-content-between">
                        <p className='light-text'>Last Growth:</p>
                        <p>{details.last_update_time ? formatDate(details.investment_ends): <i class="bi bi-three-dots"></i>}</p>
                      </div>
                    </div>

                    <div className="col-xl-4 col-md-6 border-bottom1 py-1">
                      <div className="d-flex justify-content-between">
                        <p className='light-text'>Total Intrest Return:</p>
                        <p>{formatCurrency(details.total_intrest_return)} USD</p>
                      </div>
                    </div>

                    <div className="col-xl-4 col-md-6 py-1">
                      <div className="d-flex justify-content-between">
                        <p className='light-text'>Cashout:</p>
                        <p>{details.cashout ? "True" : "False"}</p>
                      </div>
                    </div>

                    <div className="col-xl-4 col-md-6 py-1">
                      <div className="d-flex justify-content-between">
                        <p className='light-text'>Investment Type:</p>
                        <p>{formatName(details.investment_type)}</p>
                      </div>
                    </div>

                    <div className="col-xl-4 col-md-6 py-1">
                      <div className="d-flex justify-content-between">
                        <p className='light-text'>Net Profit:</p>
                        <p>{formatCurrency(details.net_profit)}USD</p>
                      </div>
                    </div>
                  </div>

                  
                </div>
              </div>
            </section>


           {(netProfit && currentInterest) &&
              <section className='pt-4 mt-2'>
                <div className='pb-3'>
                  <p className='sm-text font-bold'>Graph View</p>
                </div>
                <div className="row g-4" >
                  <div className="col-md-6 col-sm-12 col-lg-4">
                    <div className="dashboard-boxes border-radius-5px">
                      <p className='sm-text text-center font-bold pt-3'>Overview</p>
                      <div className="progress-container">
                        <div className="progress-ring">
                          <svg className='progress-ring-svg' width='100%' height='300px'>
                            <circle 
                              className='progress-ring-circle'
                              stroke='#e6e6e6'
                              strokeWidth='20'
                              fill='transparent'
                              r={radius}
                              cx='50%'
                              cy='150'
                            
                            
                            />

                            <circle 
                              className='progress-ring-fill'
                              stroke='#4caf50'
                              strokeWidth='20'
                              fill='transparent'
                              r={radius}
                              cx='50%'
                              cy='150'
                              strokeDasharray={circumference}
                              strokeDashoffset={strokeDashoffset}
                            
                            />
                          </svg>

                          <div className="progress-text">
                            <p className="current-amount">{roundUp(progress)}%</p>
                            <p className="light-text">Investment progress</p>

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6 col-sm-12 col-lg-4">
                    <div className="dashboard-boxes border-radius-5px">
                      <p className='sm-text text-center font-bold pt-3'>Interest</p>
                      <p className="light-text text-center">Earn so far {details.current_intrest_return} USD</p>
                      <div className="progress-container">
                        <div className="progress-ring">
                          <svg className='progress-ring-svg' width='100%' height='280px'>
                            <circle 
                              className='progress-ring-circle'
                              stroke='#e6e6e6'
                              strokeWidth='20'
                              fill='transparent'
                              r={radius2}
                              cx='50%'
                              cy='140'
                            
                            
                            />

                            <circle 
                              className='progress-ring-fill-1'
                              stroke='#6482AD'
                              strokeWidth='20'
                              fill='transparent'
                              r={radius2}
                              cx='50%'
                              cy='140'
                              strokeDasharray={circumference2}
                              strokeDashoffset={strokeDashoffset2}
                            
                            />
                          </svg>

                          <div className="progress-text">
                            <p className="current-amount">{roundUp(details.plan_details.percentage_return)}%</p>
                            <p className="light-text sm-text-2">Profit Earned {formatName(details.investment_time_rate)}</p>

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>


                  <div className="col-md-6 col-sm-12 col-lg-4">
                    <div className="dashboard-boxes border-radius-5px">
                      <p className='sm-text text-center font-bold pt-3'>Adjustment</p>
                      <p className="light-text text-center">Ajusted so far {details.adjustment} times</p>
                      <div className="progress-container">
                        <div className="progress-ring">
                          <svg className='progress-ring-svg' width='100%' height='280px'>
                            <circle 
                              className='progress-ring-circle'
                              stroke='#e6e6e6'
                              strokeWidth='20'
                              fill='transparent'
                              r={radius2}
                              cx='50%'
                              cy='140'
                            
                            
                            />

                            <circle 
                              className='progress-ring-fill-1'
                              stroke='#6482AD'
                              strokeWidth='20'
                              fill='transparent'
                              r={radius2}
                              cx='50%'
                              cy='140'
                              strokeDasharray={circumference2}
                              strokeDashoffset={strokeDashoffset3}
                            
                            />
                          </svg>

                          <div className="progress-text">
                            <p className="current-amount">{roundUp(5 - details.adjustment)}</p>
                            <p className="light-text sm-text-2">Remaining to Adjust</p>

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            }


            <section className='pt-4 pb-5 mb-3 mt-2'>
              <div className='pb-3'>
                <p className='sm-text font-bold'>Interest Record</p>
              </div>

              <div className='width-100'>
                <table className='border-radius-5px dahboard-table'>
                  <thead className='blue-bg'>
                    <tr>
                      <th className='py-2'>Date & Time</th>               
                      <th>Amount</th>

                    </tr>
                  </thead>

                  <tbody className='dashboard-boxes'>
                    {investmentInterestData && investmentInterestData.length > 0 ? (
                      investmentInterestData.map((data) => (
                        <tr key={data.id}>
                          <td className='py-2'>{formatDateTime(data.created_at)}</td>
                          <td>{formatCurrency(data.amount)} USD</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="2">No details available</td>
                      </tr>
                    )}
                  </tbody>

                </table>
              </div>





            </section>




            </div>
          ): (
            <div>
              <div className="d-flex justify-content-center  align-items-center height-90vh">
                <img src={spin} alt="" width='60px'/>
              </div>                         
            </div>
          )
        }


      </div>

      <div>
        <DashboardFooter />
      </div>


    </div>
  )
}