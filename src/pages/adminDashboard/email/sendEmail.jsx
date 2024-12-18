import '../../../css/dashboardCss/dashboard.css'
import AuthContext from "../../../context/AuthContext";
import { useContext, useEffect, useState } from 'react';
import { AdminDashFrame } from '../../../component/adminDashFrame';
import FloatingAlert from '../../../component/alert';
import { useForm } from 'react-hook-form';
import { LoadingSpiner } from '../../../component/spin';
import AllDataContext from '../../../context/Alldata';
import { DashboardFooter } from '../../../component/dashbaordFooter';
import { Link } from 'react-router-dom';

export const SendEmail = () =>{

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
    disablebutton, 
    setDisablebutton,





  } = useContext(AuthContext)


  const {
    usersData,
    paymentOptionsData,
    PaymentOptionsFunction,
    UsersFunction

  } = useContext(AllDataContext)

  useEffect(() =>{
    UsersFunction()
    PaymentOptionsFunction()

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
        setIsSuccess(true)
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
        setLoader(false)
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


  

  const ClearInput = () =>{
    setUser('')
    setPaymentOption('')
    setAmount('')
    setDate('')
    setStatus('')

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
                <Link className='light-link' to='/admin/all-email/'><i class="bi bi-arrow-left me-1"></i> Email Addresses</Link>
                <div>
                  <p className='dashboard-header'>Send Email</p>
                </div>
              </div>


              <div className="dashboard-boxes mt-4 p-4 border-radius-5px">
                <div>
                  <form  onSubmit={handleSubmit(onSubmit)}>
                    <div className="row g-3">
                      <div className="col-lg-2 col-md-3 col-4">
                        <p className='font-bold'>Send To:</p>
                      </div>

                      <div className="col-lg-10 col-md-9 col-8">
                        <input type="text" className={`dashboard-input ${errors.amount ? 'error-input' : ''}`} {...register('amount', {required: true})}  value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.00" />
                        {errors.amount && <span style={{color: 'red'}}>This Feild is required</span>} 
                      </div>

                      <div className="col-lg-2 col-md-3 col-4">
                        <p className='font-bold'>Email Subject:</p>
                      </div>

                      <div className="col-lg-10 col-md-9 col-8">
                        <input type="text" className={`dashboard-input ${errors.amount ? 'error-input' : ''}`} {...register('amount', {required: true})}  value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Email Subject:" />
                        {errors.amount && <span style={{color: 'red'}}>This Feild is required</span>} 
                      </div>

                      <div className="col-12">
                        <textarea rows='9' type="text" className={`dashboard-input ${errors.amount ? 'error-input' : ''}`} {...register('amount', {required: true})}  value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Write Your Message" />
                        {errors.amount && <span style={{color: 'red'}}>This Feild is required</span>} 
                      </div>

                      <div className='col-12 pt-2'>
                        <div className="d-flex height-100 align-items-center">
                          <div className='pe-4'>

                            <button className="dashboard-btn py-2 px-4" type="submit" disabled={disablebutton}>Send Email</button> 
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

      <div>
        <DashboardFooter />
      </div>


    </div>
  )
}