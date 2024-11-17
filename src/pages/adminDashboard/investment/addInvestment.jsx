import '../../../css/dashboardCss/dashboard.css'
import AuthContext from "../../../context/AuthContext";
import { useContext, useEffect, useState } from 'react';
import { AdminDashFrame } from '../../../component/adminDashFrame';
import FloatingAlert from '../../../component/alert';
import { useForm } from 'react-hook-form';
import { LoadingSpiner } from '../../../component/spin';

export const AddInvestment = () =>{

  const [user, setUser] = useState('')
  const [investPlan, setInvestPlan] = useState('')
  const [amount, setAmount] = useState('')
  const [date, setDate] = useState('')
  const [status, setStatus] = useState('')
  const [investmentType, setInvestmentType] = useState("")
  const [loader, setLoader] = useState(false)


  const { authTokens, 
    messages,
    alertVisible,
    setAlertVisible,
    isSuccess,
    showAlert,
    setMessage,
    setIsSuccess,


    OnbodyClick,
    formatDate,
    formatCurrency,
    formatName,
    disablebutton, 
    setDisablebutton,

    usersData,
    investmentPlanData, 



  } = useContext(AuthContext)
  
  const onSubmit = (data, e) =>{
    setDisablebutton(true)
    if(isValid){
      addDeposit(e)
      
    }else{
      setDisablebutton(false)
    }
  }

  const addDeposit = async(e) =>{
    e.preventDefault()
    setLoader(true)

    const formData = new FormData()

    formData.append('user', user)
    formData.append('amount', amount)
    formData.append('investment_plan', investPlan)
    formData.append('investment_type', investmentType)
    formData.append('approval_status', status)
    formData.append('created_at', date)

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
        setIsSuccess(true)
        setLoader(false)
        setDisablebutton(false)
        setUser('')
        setInvestPlan('')
        setInvestmentType('')
        setAmount('')
        setDate('')
        setStatus('')

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

  const ClearInput = () =>{
    setUser('')
    setInvestPlan('')
    setAmount('')
    setDate('')
    setInvestmentType('')
    setStatus('')

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

          {loader &&
            < LoadingSpiner/>
          } 
          <div>
            <FloatingAlert
              message={messages}
              isVisible={alertVisible}
              onClose={() => setAlertVisible(false)}
              successs={isSuccess}
            />
          </div>


          <section className='py-4 row justify-content-center'> 
            <div className="col-md-11 col-xl-10">
              <div>
                <div>
                  <p className='dashboard-header'>Add New Investment</p>
                </div>
              </div>


              <div className="dashboard-boxes mt-4 p-4 border-radius-5px">
                <div>
                  <form  onSubmit={handleSubmit(onSubmit)}>
                    <div className='row g-3'>
                      <div className="col-sm-6">
                        <label htmlFor="" className="p-2">Add to Account</label>
                        <select className={`${errors.user ? 'error-input' : ''} dashboard-input`} {...register('user', {required: true})} type="text"   value={user} onChange={(e) => setUser(e.target.value)}>
                          <option></option>
                          {usersData.map((data) =>(

                            <option value={data.id} key={data.id}>{formatName(data.full_name)}</option>
                          ))}
                        </select>
                        {errors.user && <span style={{color: 'red'}}>This Feild is required</span>} 
                      </div>

                      <div className="col-sm-6">
                        <label htmlFor="" className="p-2 ">Amount</label>
                        <input type="text" className={`dashboard-input ${errors.amount ? 'error-input' : ''}`} {...register('amount', {required: true})}  value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.00" />
                        {errors.amount && <span style={{color: 'red'}}>This Feild is required</span>} 
                      </div>

                      <div className="col-sm-6">
                        <label htmlFor="" className="p-2">Investment Plan</label>
                        <select className={`${errors.investPlan ? 'error-input' : ''} dashboard-input`} {...register('investPlan', {required: true})} type="text"   value={investPlan} onChange={(e) => setInvestPlan(e.target.value)}>
                          <option></option>
                          {investmentPlanData.map((data) =>(

                            <option value={data.id} key={data.id}>{formatName(data.plan_name)} Plan  ({formatCurrency(data.min_amount)} USD  - {formatCurrency(data.max_amount)} USD)</option>
                          ))}
                        </select>
                        {errors.investPlan && <span style={{color: 'red'}}>This Feild is required</span>} 
                      </div>

                      <div className="col-sm-6">
                        <label htmlFor="" className="p-2">Investment Type</label>
                        <select className={`${errors.investmentType ? 'error-input' : ''} dashboard-input`} {...register('investmentType', {required: true})} type="text"   value={investmentType} onChange={(e) => setInvestmentType(e.target.value)}>
                          <option></option>
                          <option value='manual'>Manual</option>
                          <option value='automatic'>Automatic</option>
                        </select>
                        {errors.investmentType && <span style={{color: 'red'}}>This Feild is required</span>} 
                      </div>



                      <div className="col-sm-6">
                        <label htmlFor="" className="p-2">Status</label>
                        <select className={`${errors.status ? 'error-input' : ''} dashboard-input`} {...register('status', {required: true})} type="text"   value={status} onChange={(e) => setStatus(e.target.value)}>
                          <option></option>
                          <option value='pending'>Pending</option>
                          <option value='declined'>Declined</option>
                          <option value='successful'>Successful</option>
                        </select>
                        {errors.status && <span style={{color: 'red'}}>This Feild is required</span>} 
                      </div>


                      <div className="col-sm-6">
                        <label htmlFor="" className="p-2 ">Created <span className='light-text'>(Optional)</span></label>
                        <input type="date" className={`dashboard-input ${errors.amount ? 'error-input' : ''}`} {...register('date')}  value={date} onChange={(e) => setDate(e.target.value)}/>
                      </div>
                      
                      <div className='col-12 pt-4'>
                        <div className="d-flex height-100 align-items-center">
                          <div className='pe-4'>
                            
                            <button className="dashboard-btn py-2 px-4" type="submit" disabled={disablebutton}>Add Investment</button> 
                          </div>
                          <p onClick={ClearInput} className='light-link cursor-pointer'>Cancel</p>
                        </div>
                        
                      </div>
                    </div>
                  </form>
                </div>

              </div>
            </div>
          </section>


        </div>
      </div>


    </div>
  )
}