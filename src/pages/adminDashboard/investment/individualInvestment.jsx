import '../../../css/dashboardCss/dashboard.css'
import '../../../css/dashboardCss/adminDahboardCss/individualInvestment.css'
import AuthContext from "../../../context/AuthContext";
import { AdminDashFrame } from '../../../component/adminDashFrame';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { useForm } from 'react-hook-form';
import FloatingAlert from '../../../component/alert';


export const IndividualInvestment = () =>{
  const { authTokens, 
    OnbodyClick,
    formatCurrency,
    formatName,
    roundUp,
    formatDate,
    formatDateTime,
    disablebutton, 
    setDisablebutton,

    investmentData,
    setInvestmentData,

    messages,
    alertVisible,
    setAlertVisible,
    isSuccess,
    showAlert,
    setMessage,
    setIsSuccess,


  } = useContext(AuthContext)

  const navigate = useNavigate()

  const [details, setDetails] = useState(null)
  const [urlName, setUrlName] = useState('')
  const [urlLink, setUrlLink] = useState('')
  const [showMenu, setShowMenu] = useState(false)

  const [netProfit, setNetProfit] = useState(null)
  const [currentInterest, setCurrentInterest] = useState(null)
  const [adjustment, setAdjustment] = useState(null)

  const [deleteModal, setDeletedModal] = useState(false)


  const [cashoutModal, setCashoutModal] = useState(false)


  
  const [statusOverlay, setStatusOverlay] = useState(false)
  const [UpdateTyeOverlay, setUpdateTyeOverlay] = useState(false)
  const [interestOverlay,setInterestOverlay] = useState(false)
  const [increaseInvestmentOverlay, setIncreaseInvestmentOverlay] = useState(false)
  const [updateTypeValue, setUpdateTypeValue] = useState('')
  const [statusValue, setStatusValue] = useState('')
  const [interestAmount, setInterestAmount] = useState('')
  const [investmentAmount, setInvestmentAmount] = useState('')
  const updateType = useRef(null)
  const addIntrest = useRef(null)
  const increaseInvestment = useRef(null)
  const statusModal = useRef(null)
  const [isAnyModalOPen, setIsAnyModalOpen] = useState(false)
  const [investmentInterestData, setInvestmentInterestData] = useState(null)
  const [updateTypebtnLoader, setUpdateTypebtnLoader] = useState(false)
  const [interestbtnLoder, setInterestbtnLoder] = useState(false)
  const [increaseInvestmentbtnLoader, setIncreaseInvestmentbtnLoader] = useState()
  const [deletebtnLoader, setDeletebtnLoader] = useState(false)
  const [cashoutebtnLoader, setCashoutbtnLoader] = useState(false)
  const [statusLoader, setStatusLoader] = useState(false)


  const hideDeleteModal = () => {
    setDeletedModal(false)
    setIsAnyModalOpen(false)
    setShowMenu(false)

  }

  const showDeleteModal = () => {
    setDeletedModal(true)
    setIsAnyModalOpen(true)
  }


  const hideCashoutModal = () => {
    setCashoutModal(false)
    setIsAnyModalOpen(false)
    setShowMenu(false)

  }

  const showCahoutModal = () => {
    setCashoutModal(true)
    setIsAnyModalOpen(true)
  }

  const showStatusModal = () =>{
    if(statusModal.current){
      statusModal.current.style.transform = `translateY(${0}px)`
      statusModal.current.style.transition = `all ${1.5}s ease`
    }

    setStatusOverlay(true)
    setIsAnyModalOpen(true)
  }

  const hideStatusModal = () => {
    if(statusModal.current){
      statusModal.current.style.transform = `translateY(${-650}%)`
      statusModal.current.style.transition = `all ${5}s ease`
    }
    setIsAnyModalOpen(false)
    setShowMenu(false)

  }


  const showUpdateType = () =>{
    if(updateType.current){
      updateType.current.style.transform = `translateY(${0}px)`
      updateType.current.style.transition = `all ${1.5}s ease`
    }
    setUpdateTyeOverlay(true)
    setIsAnyModalOpen(true)
  }

  const hideUpdateType = () => {
    if(updateType.current){
      updateType.current.style.transform = `translateY(${-650}%)`
      updateType.current.style.transition = `all ${5}s ease`
    }

    setIsAnyModalOpen(false)
    setShowMenu(false)

    

  }



  const showAddIntrest = () =>{
    if(addIntrest.current){
      addIntrest.current.style.transform = `translateY(${0}px)`
      addIntrest.current.style.transition = `all ${1.5}s ease`
    }
    setInterestOverlay(true)
    setIsAnyModalOpen(true)
  }

  const HideAddIntrest = () =>{
    if(addIntrest.current){
      addIntrest.current.style.transform = `translateY(${-650}%)`
      addIntrest.current.style.transition = `all ${5}s ease`
    }

    setIsAnyModalOpen(false)
    setShowMenu(false)

    

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
    register: registerUpdateType,
    handleSubmit: handleSubmitUpdateType,
    formState: { errors: errorsUpdateType, isValid: isValidUpdateType},
  } = useForm();

  const {
    register: registerInterest,
    handleSubmit: handleSubmitInterest,
    formState: { errors: errorsInterest, isValid: isValidInterest },
  } = useForm();

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


  const onStatusSubmit = (data, e) =>{
    setDisablebutton(true)
    setStatusLoader(true)
    if(isValidStatus){
      UpdateStatus(e)
      
    }else{
      setDisablebutton(false)
    }

  }



  const onUpdateSubmit = (data, e) =>{
    setDisablebutton(true)
    setUpdateTypebtnLoader(true)
    if(isValidUpdateType){
      UpdateTypeFunction(e)
      
    }else{
      setDisablebutton(false)
    }

  }
  

  const onInterestSubmit = (data, e) =>{
    setDisablebutton(true)
    setInterestbtnLoder(true)
    if(isValidInterest){
      AddInterestFunction(e)
    }else{
      setDisablebutton(false)
    }




  }

  const onIncreaseInvestmentSubmit = (data, e) =>{
    setDisablebutton(true)
    setIncreaseInvestmentbtnLoader(true)
    if(isValidInvestment){
      IncreaseInvestmentFunction(e)
      
    }else{
      setDisablebutton(false)
    }

  }

  const UpdateStatus = async(e) =>{
    e.preventDefault()
    setDisablebutton(true)
    console.log('yes')

    try{
      const response = await fetch(`http://127.0.0.1:8000/api/user-investment/${details.id}/update-status/`, {
        method: 'PATCH',
        body: JSON.stringify({
          approval_status: statusValue,
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


  const UpdateTypeFunction = async () => {
    setDisablebutton(true)

    try{
      let response = await fetch(`http://127.0.0.1:8000/api/user-investment/${details.id}/update-type/`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${authTokens.access}`,
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          investment_type: updateTypeValue,
        })
      })

      if (response.ok) {
        setDeletebtnLoader(false)
        setDisablebutton(false)
        hideUpdateType()
        showAlert()
        setIsSuccess(true)
        setUpdateTypebtnLoader(false)

        setMessage('Investment type successfully updated')
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
        setUpdateTypebtnLoader(false)
      }

    }catch{
      showAlert()
      setMessage('An unexpected error occurred.');
      setDisablebutton(false)
      setUpdateTypebtnLoader(false)
      setIsSuccess(false)


    }
  }


  const AddInterestFunction = async () => {
    setDisablebutton(true)

    try{
      let response = await fetch(`http://127.0.0.1:8000/api/investment-intrest/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authTokens.access}`,
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          user: details.user,
          investment_id: details.investment_id,
          amount: interestAmount
        })
      })

      if (response.ok) {
        setDisablebutton(false)
        HideAddIntrest()
        showAlert()
        setIsSuccess(true)
        setMessage('Interest  added successfully')
        UpdateDetails()
        InvestmentIntrest()
        setInterestbtnLoder(false)
      } else {
        const errorData = await response.json()
        const errorMessages = Object.values(errorData)
        .flat()
        .join(', ');
        setMessage(errorMessages)
        showAlert()
        setIsSuccess(false)
        setDisablebutton(false)
        setInterestbtnLoder(false)
      }

    }catch{
      showAlert()
      setMessage('An unexpected error occurred.');
      setDisablebutton(false)
      setIsSuccess(false)
      setInterestbtnLoder(false)

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

  const deleteItem = async () => {
    setDisablebutton(true)
    setDeletebtnLoader(true)

    try{
      let response = await fetch(`http://127.0.0.1:8000/api/user-investment/${details.id}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${authTokens.access}`
        }
      })

      if (response.ok) {
        setDeletebtnLoader(false)
        setDisablebutton(false)
        setInvestmentData(investmentData.filter(dat => dat.id !== details.id))
        setDeletedModal(false)
        showAlert()
        setIsSuccess(true)
        setMessage('Investment successfully deleted')
        navigate('/admin/all-investment')
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
      localStorage.setItem('IndividualData', JSON.stringify(data))
  
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
      localStorage.setItem('InvestmentInterestData', JSON.stringify(sortedData))
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
        setStatusOverlay(false);
        setUpdateTyeOverlay(false)
        setInterestOverlay(false)
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
    const data = localStorage.getItem("IndividualData")

    setUrlName(localStorage.getItem('urlName'))
    setUrlLink(localStorage.getItem('urlLink'))
    if(data){
      const parsedData = JSON.parse(data)
      setDetails(parsedData)

    }
  }, [])


  useEffect(() =>{
    const data = localStorage.getItem("InvestmentInterestData")
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
        <AdminDashFrame />
      </div>



      <div className="main-content " onClick={OnbodyClick}>
        <section>
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
                <div className="dashboard-modal-content">
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

          {cashoutModal &&
            <section className="overlay-background">
              <div className="dashboard-modal-container">
                <div className="dashboard-modal-content">
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
                          <option value='declined'>Declined</option>
                          <option value='successful'>Successful</option>
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


          <div className={`${UpdateTyeOverlay ? 'overlay-background pt-5': ''}`}>
              <div className="dashboard-update-status-container" ref={updateType}>
                <div className="row justify-content-center">
                  <div className="col-xl-3 col-lg-5 col-md-6 col-sm-9 col-11">
                    <div className="dashboard-update-status-content">
                      <div className="d-flex justify-content-end">
                        <FontAwesomeIcon className='sm-text cursor-pointer' icon={faX} onClick={hideUpdateType}/>
                      </div>
                      <form onSubmit={handleSubmitUpdateType(onUpdateSubmit)}>
                        <div>
                          <label htmlFor="" className="p-2 d-block">Status</label>
                          <select  className={`${errorsUpdateType.updateTypeValue ? 'error-input' : ''} d-block dashboard-input dashboard-update-status-input`} {...registerUpdateType('updateTypeValue', {required: true})} type="text"   value={updateTypeValue} onChange={(e) => setUpdateTypeValue(e.target.value)}>
                            <option></option>
                            <option value='automatic'>Automatic</option>
                            <option value='manual'>Manual</option>
                          </select>
                          {errorsUpdateType.updateTypeValue && <span style={{color: 'red'}}>This Feild is required</span>} 
                        </div>

                        <div className="d-flex justify-content-end">
                          <div className='pt-3'>
                            <button  className="dashboard-submit-btn  dashboard-btn py-2 px-4" type="submit" disabled={disablebutton}>    
                              <span class={`${updateTypebtnLoader ? 'dashboard-submit-spinner': ''}`}></span>
                              <span class={`${updateTypebtnLoader ? 'dashboard-submit-btn-visiblity': ''}`}>Submit</span>
                            </button> 
                          </div>
                        </div>


                      </form>

                    </div>
                  </div>
                </div>

              </div>
          </div>


          <div className={`${interestOverlay ? 'overlay-background pt-5': ''}`}>
              <div className="dashboard-update-status-container" ref={addIntrest}>
                <div className="row justify-content-center">
                  <div className="col-xl-3 col-lg-5 col-md-6 col-sm-9 col-11">
                    <div className="dashboard-update-status-content">
                      <div className="d-flex justify-content-end">
                        <FontAwesomeIcon className='sm-text cursor-pointer' icon={faX} onClick={HideAddIntrest}/>
                      </div>
                      <form  onSubmit={handleSubmitInterest(onInterestSubmit)}>
                        <div>
                          <label htmlFor="" className="p-2 d-block">Amount</label>
                          <input  className={`${errorsInterest.interestAmount ? 'error-input' : ''} d-block dashboard-input dashboard-update-status-input`} {...registerInterest('interestAmount', {required: true})} type="text"   value={interestAmount} onChange={(e) => setInterestAmount(e.target.value)} />
                          {errorsInterest.interestAmount && <span style={{color: 'red'}}>This Feild is required</span>} 
                        </div>

                        <div className="d-flex justify-content-end">
                          <div className='pt-3'>

                            <button  className="dashboard-submit-btn  dashboard-btn py-2 px-4" type="submit" disabled={disablebutton}>    
                              <span class={`${interestbtnLoder ? 'dashboard-submit-spinner': ''}`}></span>
                              <span class={`${interestbtnLoder ? 'dashboard-submit-btn-visiblity': ''}`}>Submit</span>
                            </button> 
                          </div>
                        </div>


                      </form>

                    </div>
                  </div>
                </div>

              </div>
          </div>

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
                  <div className="d-flex">
                    <div className='me-3'>
                      <button className='dashboard-btn investment-individual-btn'  onClick={showAddIntrest}>
                        <div className="d-flex">
                          <i class="bi bi-plus-lg pe-2"></i>
                          <p><span className='d-none d-sm-inline'>Add</span> Interest</p>
                        </div>
                      </button>
                    </div>

                    <div className='investment-individual-menu-bar-container' onClick={toogleMenu}>
                      <button className='p-2 investment-individual-menu-bar'>
                        <i class="bi bi-three-dots-vertical"></i>
                      </button>
                    </div>
                    {(showMenu && !isAnyModalOPen) &&
                      <div className="investment-individual-menu width-100">
                        <div>
                          <div className="investment-individual-menu-container">
                            <div>
                              {urlName === 'Pending' &&
                                <div className="d-flex py-2 border-bottom1 ps-3 cursor-pointer" onClick={showStatusModal}>
                                  <i class="bi bi-send-arrow-down"></i>
                                  <p className="light-link ms-3">Update Sataus</p>
                                </div>                     
                              }

                              <div className="d-flex py-2 border-bottom1 ps-3 cursor-pointer" onClick={showUpdateType}>
                                <i class="bi bi-upload"></i>
                                <p className="light-link ms-3">Update Type</p>
                              </div>

                              <div className="d-flex py-2 border-bottom1 ps-3 cursor-pointer" onClick={showAddIntrest}>
                                <i class="bi bi-plus-lg"></i>
                                <p className="light-link ms-3">Add Interest</p>
                              </div>

                              <div className="d-flex py-2 border-bottom1 ps-3 cursor-pointer" onClick={showIncreaseInvestment}>
                                <i class="bi bi-graph-up-arrow"></i>
                                <p className="light-link ms-3">Increase Investment</p>
                              </div>

                              <div className="d-flex py-2 border-bottom1 ps-3 cursor-pointer" onClick={showCahoutModal}>
                                <i class="bi bi-cash-coin"></i>
                                <p className="light-link ms-3">Cashout</p>
                              </div>

                              <div className="d-flex py-2  ps-3  cursor-pointer" onClick={showDeleteModal}>
                                <i class="bi bi-trash"></i>
                                <p className="light-link ms-3">Delete Investment</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    }
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
                  <thead className='dashboard-primary-bg'>
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
            <div></div>
          )
        }


      </div>


    </div>
  )
}