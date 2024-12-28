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

export const SendBulkEmail = () =>{

  const [details, setDetails] = useState(null)
  const [subject, setSubject] = useState('')
  const [emailMessage, setEmailMessage] = useState('')
  const [emailList, setEmailList] = useState([]);

  const [allUsers, setAllUsers] = useState(null)
  const [verifiedUsers, setVerifiedUser] = useState(null)
  const [unverifiedUsers, setUnverfiedUsers] = useState(null)
  const [unverifiedKYC, setUnverfiedKYC] = useState(null)
  const [verifiedKYCs, setVerifiedKYC] = useState(null)
  const [subscribers, setSubscribers] = useState(null)
  const [error, setError] = useState('')
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

  const handleAllUserCheckboxChange = (event) => {
    setAllUsers(event.target.checked);
    setVerifiedUser(null)
    setUnverfiedUsers(null)
    setUnverfiedKYC(null)
    setVerifiedKYC(null)
    setSubscribers(null)
    
    if (event.target.checked) {
      getAllUsers();
    }
  };

  const handleVerifiedUserCheckboxChange = (event) => {
    setVerifiedUser(event.target.checked)
    setAllUsers(null);
    setUnverfiedUsers(null)
    setUnverfiedKYC(null)
    setVerifiedKYC(null)
    setSubscribers(null)

    if (event.target.checked) {
      getVerifiedUsers();
    }
  };

  const handleUnVerifiedUserCheckboxChange = (event) => {
    setVerifiedUser(null)
    setAllUsers(null);
    setUnverfiedUsers(event.target.checked)
    setUnverfiedKYC(null)
    setVerifiedKYC(null)
    setSubscribers(null)
    if (event.target.checked) {
      getVerifiedUsers();
    }
  };


  const handleUnVerifiedKYCsCheckboxChange = (event) => {
    setVerifiedUser(null)
    setAllUsers(null);
    setUnverfiedUsers(null)
    setUnverfiedKYC(event.target.checked)
    setVerifiedKYC(null)
    setSubscribers(null)
    if (event.target.checked) {
      getVerifiedUsers();
    }
  };
  
  const handleVerifiedKYCsCheckboxChange = (event) => {
    setVerifiedUser(null)
    setAllUsers(null);
    setUnverfiedUsers(null)
    setUnverfiedKYC(null)
    setVerifiedKYC(event.target.checked)
    setSubscribers(null)
    if (event.target.checked) {
      getVerifiedUsers();
    }
  };


  const handleSubscribersCheckboxChange = (event) => {
    setVerifiedUser(null)
    setAllUsers(null);
    setUnverfiedUsers(null)
    setUnverfiedKYC(null)
    setVerifiedKYC(null)
    setSubscribers(event.target.checked)
    if (event.target.checked) {
      getVerifiedUsers();
    }
  };

  
  
  const onSubmit = (data, e) =>{
    setDisablebutton(true)
    if (!allUsers && !verifiedUsers && !unverifiedUsers && !verifiedKYCs && !unverifiedKYC && !subscribers) {
      setError('Please select one of the options before submitting.');
      return;
    }
    if(isValid){
      sendEmail(e)
      
    }else{
      setDisablebutton(false)
    }
  }



  const getAllUsers = async () => {
    try {
      let response = await fetch("http://127.0.0.1:8000/api/list-emails/all-users/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        setEmailList(data.email_addresses);
        console.log("Got All Users Email Successfully");
      } else {
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getVerifiedUsers = async () => {
    try {
      let response = await fetch("http://127.0.0.1:8000/api/list-emails/verified-user/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        setEmailList(data.email_addresses);
        console.log("Got Verified Email Successfully");
      } else {
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const sendEmail = async(e) =>{
    e.preventDefault()
    setLoader(true)

    try{
      const response = await fetch('http://127.0.0.1:8000/api/send-mail/', {
        method: 'POST',
        headers:{
          Authorization: `Bearer ${authTokens.access}`,
          "Content-Type":"application/json"
        },

        body: JSON.stringify({
          to: emailList,
          subject: subject,
          body: emailMessage,
          is_bulk: "true"
        })
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
                  <p className='sm-text light-text'>Broadcast Your message</p>
                </div>
              </div>


              <div className="dashboard-boxes mt-4 p-4 border-radius-5px">
                <div>
 
                  <form  onSubmit={handleSubmit(onSubmit)}>
                    <div className='pb-4'>
                      <div className='row gy-3'>
                        <div className='col-xxl-2 col-md-4 col-6'>
                          <input type="radio" className='cursor-pointer' checked={allUsers ? true : false} onChange={(e) => handleAllUserCheckboxChange(e)}/>
                          <p className='d-inline ps-2'>All Users</p>
                        </div>

                        <div className='col-xxl-2 col-md-4 col-6'>
                          <input type="radio" className='cursor-pointer' checked={verifiedUsers ? true : false} onChange={(e) => handleVerifiedUserCheckboxChange(e)}/>
                          <p className='d-inline ps-2'>Verified Users</p>
                        </div>

                        <div className='col-xxl-2 col-md-4 col-6 '>
                          <input type="radio" className='cursor-pointer' checked={unverifiedUsers ? true : false} onChange={(e) => handleUnVerifiedUserCheckboxChange(e)}/>
                          <p className='d-inline ps-2'>Unverified Users</p>
                        </div>
                        <div className='col-xxl-2 col-md-4 col-6'>
                          <input type="radio" className='cursor-pointer' checked={verifiedKYCs ? true : false} onChange={(e) => handleVerifiedKYCsCheckboxChange(e)}/>
                          <p className='d-inline ps-2'>Verified KYC</p>
                        </div>

                        <div className='col-xxl-2 col-md-4 col-6'>
                          <input type="radio" className='cursor-pointer' checked={unverifiedKYC ? true : false} onChange={(e) => handleUnVerifiedKYCsCheckboxChange(e)}/>
                          <p className='d-inline ps-2'>Unverified KYC</p>
                        </div>

                        <div className='col-xxl-2 col-md-4 col-6'>
                          <input type="radio" className='cursor-pointer' checked={subscribers ? true : false} onChange={(e) => handleSubscribersCheckboxChange(e)}/>
                          <p className='d-inline ps-2'>Subscribers</p>
                        </div>
                      </div>
                      
                    </div>
                    <p style={{color: 'red'}}>{error}</p>
                    <div className="row g-3">
                      {/* <div className="col-lg-2 col-md-3 col-4">
                        <p className='font-bold'>Send To:</p>
                      </div>

                      <div className="col-lg-10 col-md-9 col-8">
                        <input type="text" className={`dashboard-input cursor-not-allowed ${errors.email ? 'error-input' : ''}`} {...register('email')}  value={`${ details && formatName(details.full_name)} <${details?.email}>`} disabled />
                      </div> */}

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