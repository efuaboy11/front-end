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

  const [details, setDetails] = useState(null)
  const [subject, setSubject] = useState('')
  const [emailMessage, setEmailMessage] = useState('')

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
    formatName,





  } = useContext(AuthContext)

  useEffect(() =>{
    const data = sessionStorage.getItem("IndividualData")

    if(data){
      const parsedData = JSON.parse(data)
      console.log(parsedData)
      setDetails(parsedData)

    }
  }, [])

  
  const onSubmit = (data, e) =>{
    setDisablebutton(true)
    if(isValid){
      sendEmail(e)
      
    }else{
      setDisablebutton(false)
    }
  }

  const sendEmail = async(e) =>{
    e.preventDefault()
    setLoader(true)

    const formData = new FormData()

    formData.append('to', details.email)
    formData.append('subject', subject)
    formData.append('body', emailMessage)

    try{
      const response = await fetch('http://127.0.0.1:8000/api/send-mail/', {
        method: 'POST',
        body: formData,
        headers:{
          Authorization: `Bearer ${authTokens.access}`
        }
      })



      if(response.ok){
        showAlert()
        setMessage('Email Sent')
        setIsSuccess(true)
        setLoader(false)
        setDisablebutton(false)
        setSubject('')
        setEmailMessage('')

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
    setEmailMessage('')
    setSubject('')

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
                        <input type="text" className={`dashboard-input cursor-not-allowed ${errors.email ? 'error-input' : ''}`} {...register('email')}  value={`${ details && formatName(details.full_name)} <${details?.email}>`} disabled />
                      </div>

                      <div className="col-lg-2 col-md-3 col-4">
                        <p className='font-bold'>Email Subject:</p>
                      </div>

                      <div className="col-lg-10 col-md-9 col-8">
                        <input type="text" className={`dashboard-input ${errors.subject ? 'error-input' : ''}`} {...register('subject', {required: true})}  value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Email Subject:" />
                        {errors.subject && <span style={{color: 'red'}}>This Feild is required</span>} 
                      </div>

                      <div className="col-12">
                        <textarea rows='9' type="text" className={`dashboard-input ${errors.emailMessage ? 'error-input' : ''}`} {...register('emailMessage', {required: true})}  value={emailMessage} onChange={(e) => setEmailMessage(e.target.value)} placeholder="Write Your Message" />
                        {errors.emailMessage && <span style={{color: 'red'}}>This Feild is required</span>} 
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

      <div className='mt-5 py-3'>
        <DashboardFooter />
      </div>


    </div>
  )
}