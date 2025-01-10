import '../../../css/dashboardCss/dashboard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AuthContext from "../../../context/AuthContext";
import { useContext, useEffect, useState } from 'react';
import { AdminDashFrame } from '../../../component/adminDashFrame';
import ReactPaginate  from "react-paginate"
import { Link, useNavigate } from 'react-router-dom';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import FloatingAlert from '../../../component/alert';
import spin from '../../../img/Spin.gif'
import AllDataContext from '../../../context/Alldata';
import { useForm } from 'react-hook-form';
import { ClientDashFrame } from '../../../component/ClientDashFrame';
import { DashboardFooter } from '../../../component/dashbaordFooter';
import monitor from '../../.../../../img/mointor-removebg-preview.png'
import { ProcessingSpiner } from '../../../component/spin';
export const Supports = () =>{
  const { authTokens, 
    messages,
    alertVisible,
    setAlertVisible,
    isSuccess,
    showAlert,
    setMessage,
    setIsSuccess,


    OnbodyClick,
    formatDateTime,
    formatCurrency,
    formatName,
    disablebutton, 
    setDisablebutton,


  } = useContext(AuthContext)

  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [emailMessage, setEmailMessage] = useState('')
  const [processingText, setProcessingText] = useState('Processing')

  const [loader, setLoader] = useState(false)


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
    setProcessingText('Sending')

    const formData = new FormData()

    formData.append('to', 'iseghohimhene@gmail.com')
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
        setEmail('')

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
    setEmail('')

  }

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();

  return(
    <div>
      <div className="position-sticky1">
        <ClientDashFrame />
      </div>

      {loader &&
          <ProcessingSpiner text={processingText}/>
        }

      <div className="main-content" onClick={OnbodyClick}>
        <div className="container-xl">
          <div>
            <FloatingAlert
              message={messages}
              isVisible={alertVisible}
              onClose={() => setAlertVisible(false)}
              successs={isSuccess}
            />
          </div>
          <section>
            {!loader &&
              <div className="row justify-content-center">
                <div className="col-md-11 col-xl-7 pt-4">
                  <div className="text-center">
                    <p className='dashboard-header'>Support Center</p>
                    <p className='sm-text'>Send us a direct email and our support team will get back to you <br /> shortly.</p>
                  </div>

                  <div className="dashboard-boxes mt-4 p-4 border-radius-5px">
                    <div>
                      <form  onSubmit={handleSubmit(onSubmit)}>
                        <div className="row g-4">
                          <div className="col-lg-3 col-md-3 col-4">
                            <p className='font-bold'>Send To:</p>
                          </div>

                          <div className="col-lg-9 col-md-9 col-8">
                            <input  type="text" className={`cursor-not-allowed dashboard-input ${errors.email ? 'error-input' : ''}`} {...register('email', {required: true})}      value="<iseghohimhene@gmail.com>"/>
                            {errors.email && <span style={{color: 'red'}}>This Feild is required</span>} 
                          </div>

                          <div className="col-lg-3 col-md-3 col-4">
                            <p className='font-bold'>Email Subject:</p>
                          </div>

                          <div className="col-lg-9 col-md-9 col-8">
                            <input  type="text" className={`dashboard-input ${errors.subject ? 'error-input' : ''}`} {...register('subject', {required: true})}  value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Email Subject:" />
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
              </div>
            }
          </section>


        </div>
      </div>

      <div className='mt-5 pt-5'>
        <DashboardFooter/>
      </div>


    </div>
  )
}