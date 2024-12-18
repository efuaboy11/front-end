import '../../../css/dashboardCss/dashboard.css'
import AuthContext from "../../../context/AuthContext";
import { useContext, useEffect, useState } from 'react';
import { AdminDashFrame } from '../../../component/adminDashFrame';
import FloatingAlert from '../../../component/alert';
import { useForm } from 'react-hook-form';
import { LoadingSpiner } from '../../../component/spin';
import AllDataContext from '../../../context/Alldata';
import { DashboardFooter } from '../../../component/dashbaordFooter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

export const AddUserAdmin = () =>{
 
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [fullName, setFullName] = useState('')
  const [password, setPassword] = useState('')
  const [date, setDate] = useState('')
  const [loader, setLoader] = useState(false)
  const[ showPassword, setShowPassword] = useState(false)


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

  const toogleShowPassword = () =>{
    setShowPassword(!showPassword)
  }


  
  const onSubmit = (data, e) =>{
    setDisablebutton(true)
    if(isValid){
      addUser(e)
      
    }else{
      setDisablebutton(false)
    }
  }


  const ClearInput = () =>{
    setEmail('')
    setUsername('')
    setFullName('')
    setPassword('')

  }

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();


  const addUser = async(e) =>{
    e.preventDefault()
    setLoader(true)
    const formData = new FormData()
    formData.append('user_name', username);
    formData.append('full_name', fullName);
    formData.append('email', email)
    formData.append('password', password)
    console.log(formData)
    

    try{
      const response = await fetch('http://127.0.0.1:8000/api/users/', {
        method: 'POST',
        body: formData,
      })
      if(response.status === 201){
        showAlert()
      setIsSuccess(true)
      setMessage('User Added Successfully');
        setDisablebutton(false)
        setFullName('')
        setUsername('')
        setIsSuccess(true)
        setEmail('')
        setPassword('')
        setLoader(false)
      }else{
        const errorData = await response.json()
        const errorMessages = Object.values(errorData)
        .flat()
        .join(', ');
        setDisablebutton(false)
        setIsSuccess(false)
        showAlert()
        setMessage(errorMessages)
        setLoader(false)
      }
    }catch(error){
      console.log(error)
      showAlert()
      setIsSuccess(false)
      setMessage('An unexpected error occurred. Please try again later.');
    }
  }
   
  
  

  
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
                  <p className='dashboard-header'>Add New User</p>
                </div>
              </div>


              <div className="dashboard-boxes mt-4 p-4 border-radius-5px">
                <div>
                  <form  onSubmit={handleSubmit(onSubmit)}>
                    <div className='row g-3'>
                      <div className="col-sm-6">
                        <label htmlFor="" className="p-2 ">Email</label>
                        <input type="text" className={`dashboard-input ${errors.email ? 'error-input' : ''}`} {...register('email', {required: true})}  value={email} onChange={(e) => setEmail(e.target.value)} placeholder="e.g johndoe23@gmail.com" />
                        {errors.email && <span style={{color: 'red'}}>This Feild is required</span>} 
                      </div>


                      <div className="col-sm-6">
                        <label htmlFor="" className="p-2 ">Username</label>
                        <input type="text" className={`dashboard-input ${errors.username ? 'error-input' : ''}`} {...register('username', {required: true})}  value={username} onChange={(e) => setUsername(e.target.value)} placeholder="e.g johndoe55" />
                        {<errors className="username"></errors> && <span style={{color: 'red'}}>This Feild is required</span>} 
                      </div>


                      <div className="col-sm-6">
                        <label htmlFor="" className="p-2 ">Full Name</label>
                        <input type="text" className={`dashboard-input ${errors.fullName ? 'error-input' : ''}`} {...register('fullName', {required: true})}  value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="John Mark" />
                        {errors.fullName && <span style={{color: 'red'}}>This Feild is required</span>} 
                      </div>

                      <div className="col-sm-6">
                        <label className="form-label">Password</label>
                        <div className="password-container">
                          <input type={`${showPassword ? "text": 'password'}`}  className={`dashboard-input password-input ${errors.password ? 'error-input' : ''}`} {...register('password', {required: true})}  value={password} onChange={(e) => setPassword(e.target.value)}  placeholder="Enter your password" />
                          <span className="password-icon">
                            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} onClick={toogleShowPassword}/>
                          </span>
                        </div>
                        {errors.password && <span style={{color: 'red'}}>This Feild is required</span>}
                      </div>

                      <div className="col-sm-6">
                        <label htmlFor="" className="p-2 ">Date Joined <span className='light-text'>(Optional)</span></label>
                        <input type="date" className={`dashboard-input ${errors.amount ? 'error-input' : ''}`} {...register('date')}  value={date} onChange={(e) => setDate(e.target.value)}/>
                      </div>

                      <div className='col-12 pt-4'>
                        <div className="d-flex height-100 align-items-center">
                          <div className='pe-4'>

                            <button className="dashboard-btn py-2 px-4" type="submit" disabled={disablebutton}>Add User</button> 
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