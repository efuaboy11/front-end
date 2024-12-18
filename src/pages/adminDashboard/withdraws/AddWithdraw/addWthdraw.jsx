import '../../../../css/dashboardCss/dashboard.css'
import AuthContext from "../../../../context/AuthContext";
import { useContext, useEffect, useState } from 'react';
import { AdminDashFrame } from '../../../../component/adminDashFrame';
import FloatingAlert from '../../../../component/alert';
import { useForm } from 'react-hook-form';
import { LoadingSpiner } from '../../../../component/spin';
import AllDataContext from '../../../../context/Alldata';
import { DashboardFooter } from '../../../../component/dashbaordFooter';
import { useNavigate } from 'react-router-dom';

export const AddWithdraw = () =>{

  const [user, setUser] = useState('')
  const [paymentMethodType, setPaymentMethodType] = useState('')
  const [paymentMethodId, setPaymentMethodId] = useState('')
  const [amount, setAmount] = useState('')
  const [date, setDate] = useState('')
  const [status, setStatus] = useState('')
  const [loader, setLoader] = useState(false)
 	const navigate = useNavigate()

  const { authTokens, 
    messages,
    alertVisible,
    setAlertVisible,
    isSuccess,
    showAlert,
    setMessage,
    setIsSuccess,


    OnbodyClick,
    disablebutton, 
    setDisablebutton,



  } = useContext(AuthContext)

  const {
    usersData,
    UsersFunction

  } = useContext(AllDataContext)

  useEffect(() =>{
    UsersFunction()

  }, [])
  
  
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
    setDisablebutton(true)

    const formData = new FormData()

    formData.append('user', user)
    formData.append('amount', amount)
		formData.append('payment_method_type', paymentMethodType)
		formData.append('payment_method_id', paymentMethodId)
    formData.append('status', status)
    formData.append('created_at', date)

    try{
      const response = await fetch('http://127.0.0.1:8000/api/withdraw/', {
        method: 'POST',
        body: formData,
        headers:{
          Authorization: `Bearer ${authTokens.access}`
        }
      })


      if(response.ok){
        showAlert()
        setIsSuccess(true)
        setMessage('Withdraw Sucessful')
        setLoader(false)
        setDisablebutton(false)
        setUser('')
				navigate('/admin/withdraw/select-user')
        // setWalletAddress('')
        // setWalletName('')
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
        showAlert()
        setLoader(false)
      }

      
    }catch(error){
      console.log(error)
      showAlert()
      setMessage('An unexpected error occurred.');
      setDisablebutton(false)
      setIsSuccess(false)

    }    
  }

  const ClearInput = () =>{
    setAmount('')
    setDate('')
    setStatus('')

  }

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();

   
  useEffect(() =>{
		setUser(sessionStorage.getItem('userID'))
		setPaymentMethodType(sessionStorage.getItem('paymentTypeID'))
		setPaymentMethodId(sessionStorage.getItem('paymentMethodID'))

	}, [])
  

  
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
                  <p className='dashboard-header'>Add New Withdraw</p>
                </div>
              </div>


              <div className="dashboard-boxes mt-4 p-4 border-radius-5px">
                <div>
                  <form  onSubmit={handleSubmit(onSubmit)}>
                    <div className='row g-3'>

                      <div className="col-sm-6">
                        <label htmlFor="" className="p-2 ">Amount</label>
                        <input type="text" className={`dashboard-input ${errors.amount ? 'error-input' : ''}`} {...register('amount', {required: true})}  value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.00" />
                        {errors.amount && <span style={{color: 'red'}}>This Feild is required</span>} 
                      </div>


                      <div className="col-sm-6">
                        <label htmlFor="" className="p-2 ">Created <span className='light-text'>(Optional)</span></label>
                        <input type="date" className={`dashboard-input ${errors.amount ? 'error-input' : ''}`} {...register('date')}  value={date} onChange={(e) => setDate(e.target.value)}/>
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
                      
                      <div className='col-12 pt-4'>
                        <div className="d-flex height-100 align-items-center">
                          <div className='pe-4'>
                            <button className="dashboard-btn py-2 px-4" type="submit" disabled={disablebutton}>Add Withdraw</button> 
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
      
      <div className='mt-5 py-3'>
        <DashboardFooter />
      </div>


    </div>
  )
}