import '../../../css/dashboardCss/dashboard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AuthContext from "../../../context/AuthContext";
import { useContext, useEffect, useState } from 'react';
import { AdminDashFrame } from '../../../component/adminDashFrame';
import ReactPaginate  from "react-paginate"
import { Link, useNavigate } from 'react-router-dom';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import CircularProgress from '@mui/material/CircularProgress';
import FloatingAlert from '../../../component/alert';
import { useForm } from 'react-hook-form';
import { LoadingSpiner } from '../../../component/spin';

export const AddDeposit = () =>{

  const [user, setUser] = useState('')
  const [paymentOption, setPaymentOption] = useState('')
  const [amount, setAmount] = useState('')
  const [date, setDate] = useState('')
  const [status, setStatus] = useState('')
  const [img, setImg] = useState("")
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
    truncateTime,
    formatCurrency,
    formatName,
    disablebutton, 
    setDisablebutton,

    usersData,
    paymentOptionsData,



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
    formData.append('payment_method', paymentOption)
    formData.append('payment_proof', img)
    formData.append('status', status)
    formData.append('created_at', date)

    try{
      const response = await fetch('http://127.0.0.1:8000/api/deposits/admin/', {
        method: 'POST',
        body: formData,
        headers:{
          Authorization: `Bearer ${authTokens.access}`
        }
      })


      if(response.ok){
        showAlert()
        setMessage('Deposit Sucessfully added')
        setLoader(false)
        setDisablebutton(false)
        setUser('')
        setPaymentOption('')
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
      }

      
    }catch(error){
      console.log(error)
      showAlert()
      setMessage('An unexpected error occurred.');
      setDisablebutton(false)
      setIsSuccess(false)

  }


    
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();


  const handleImgFile = (event) => {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      setImg(file); 
    } else {
      setImg(null); 
    }
  };
   
  
  

  
  return(
    <div>
      <div className="position-sticky">
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
                  <p className='lg-text'>Add New Deposit</p>
                </div>
              </div>


              <div className="dashboard-boxes mt-4 p-4 border-radius-5px">
                <div>
                  <form  onSubmit={handleSubmit(onSubmit)}>
                    <div className='row g-3'>
                      <div className="col-6">
                        <label htmlFor="" className="p-2">Add to Account</label>
                        <select className={`${errors.user ? 'error-input' : ''} dashboard-input`} {...register('user', {required: true})} type="text"   value={user} onChange={(e) => setUser(e.target.value)}>
                          <option></option>
                          {usersData.map((data) =>(

                            <option value={data.id} key={data.id}>{data.full_name}</option>
                          ))}
                        </select>
                        {errors.user && <span style={{color: 'red'}}>This Feild is required</span>} 
                      </div>

                      <div className="col-6">
                        <label htmlFor="" className="p-2 ">Amount</label>
                        <input type="text" className={`dashboard-input ${errors.amount ? 'error-input' : ''}`} {...register('amount', {required: true})}  value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.00" />
                        {errors.amount && <span style={{color: 'red'}}>This Feild is required</span>} 
                      </div>

                      <div className="col-6">
                        <label htmlFor="" className="p-2">Payment Method</label>
                        <select className={`${errors.paymentOption ? 'error-input' : ''} dashboard-input`} {...register('paymentOption', {required: true})} type="text"   value={paymentOption} onChange={(e) => setPaymentOption(e.target.value)}>
                          <option></option>
                          {paymentOptionsData.map((data) =>(

                            <option value={data.id} key={data.id}>{data.name}</option>
                          ))}
                        </select>
                        {errors.user && <span style={{color: 'red'}}>This Feild is required</span>} 
                      </div>

                      <div className="col-6">
                        <label htmlFor="" className="p-2 ">Payment Proof</label>
                        <input className={`dashboard-input ${errors.img ? 'error-input' : ''} form-control-sm`} {...register('img', {required: true})} type="file" onChange={handleImgFile}/>
                        {errors.amount && <span style={{color: 'red'}}>This Feild is required</span>} 
                      </div>

                      <div className="col-6">
                        <label htmlFor="" className="p-2 ">Created <span className='light-text'>(Optional)</span></label>
                        <input type="date" className={`dashboard-input ${errors.amount ? 'error-input' : ''}`} {...register('date')}  value={date} onChange={(e) => setDate(e.target.value)}/>
                      </div>

                      <div className="col-6">
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
                        <button className="dashboard-btn py-2 px-4" type="submit" disabled={disablebutton}>Add Deposit</button> 
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