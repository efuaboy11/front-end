
import "../../css/signUp/register.css"
import "../../css/signUp/signUp.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEye, faEyeSlash,  faXmark} from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom";
import { useState } from "react";
import pic from "../../img/good-mark.png"
import { useForm } from 'react-hook-form';
import FloatingAlert from "../../component/alert";




export const Register = () =>{
  const [showModal, setShowModal] = useState(false)
  const [showAmimaton, setShowAnimation] = useState(false)

  const [messages, setMessage] = useState('')

  const [fullName, setFullName] = useState('')
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [disablebutton, setDisablebutton] = useState(false)
  

  const[ showPassword, setShowPassword] = useState(false)

  const [Issuccess, setIsSucess] = useState(true)

  const toogleShowPassword = () =>{
    setShowPassword(!showPassword)
  }
  const [alertVisible, setAlertVisible] = useState(false);

  const showAlert = () => {
    setAlertVisible(true);
    setTimeout(() => {
      setAlertVisible(false);
    }, 7000); // Automatically hide the alert after 3 seconds
  };



  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();

  const closeModal = () =>{
    setShowModal(false)
  }

  const onSubmit = (data, e) =>{
    setDisablebutton(true)
    setShowAnimation(true)
    if (isValid){
      console.log(data)
      addUser(e)
    }else{
      console.log('error')
      setDisablebutton(false)
    }
  }

  const addUser = async(e) =>{
    e.preventDefault()
    const formData = new FormData()
    formData.append('user_name', userName);
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
        setShowModal(true)
        setDisablebutton(false)
        setShowAnimation(false)
        setFullName('')
        setUserName('')
        setIsSucess(true)
        setEmail('')
        setPassword('')
      }else{
        const errorData = await response.json()
        const errorMessages = Object.values(errorData)
        .flat()
        .join(', ');
        setDisablebutton(false)
        setShowAnimation(false)
        setIsSucess(false)
        showAlert()
        setMessage(errorMessages)
      }
    }catch(error){
      console.log(error)
      showAlert()
      setIsSucess(false)
      setMessage('An unexpected error occurred. Please try again later.');
    }
  }


  return(
    <div className="sign-up-bg">
      <section className="container-xl">
        <div>
          <FloatingAlert
            message={messages}
            isVisible={alertVisible}
            onClose={() => setAlertVisible(false)}
            successs={Issuccess}
            
          />
        </div>

        {showModal &&
            <section className="overlay-background">
              <div className="modal-container">
                <div className="modal-content">
                  <div className="d-flex justify-content-end cursor-pointer">
                    <FontAwesomeIcon icon={faXmark} size="2x" onClick={closeModal}/>
                  </div>
                  <div className="row justify-content-center pt-3">
                    <div className="col-4">
                      <img src={pic} alt="" width="80%"/>
                    </div>

                    <div className="col-12 text-center">
                      <h1>SUCCESSFUL</h1>
                      <p>Your account has been created. Feel free to login and <br /> start investing</p>
                      <p><Link to="/login" className="py-2 px-3">Login</Link></p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          }
        <div className=''>
          <div>
            <div className="row">
              <div className="col-xl-1"></div>
              <div className="col-xl-10">
                <div className="register-page">
                  <div className="register-box">
                    {showAmimaton &&
                      <div className="sign-up-animation"></div>            
                    }

                    <div className="register-box-margin">
                      <div className="row">
                        <div className="col-md-4 ">
                          <div className="sign-up-texts">
                            <div class="d-none d-md-block ">
                              <div>
                                <img src="" alt="" />
                              </div>
                              <div className="">
                                <div className="">
                                  <h1><span className="primary-txt">Sign</span> Up</h1>
                                  <p>Create An Account With AmanilightEquity Today!!!</p>
                                </div>
                              </div>  
                            </div>
                          </div>


                        </div>

                        <div className="col-md-8">
                          <div className="row">
                            <div className="col-md-2"></div>
                            <div className="col-md-10">
                              <div>
                                <div className="mb-5 pt-3 d-block d-md-none">
                                  <h1><span className="primary-txt">Sign</span> Up</h1>
                                </div>
                                <div>
                                  <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="row g-3">
                                      <div className="col-sm-6">
                                        <label className="form-label">Full Name</label>
                                        <input type="text" className={`styled-input ${errors.fullName ? 'error-input' : ''}`} {...register('fullName', {required: true})}  value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="e.g. John Doe" />
                                        {errors.fullName && <span style={{color: 'red'}}>This Feild is required</span>}
                                      </div>

                                      <div className="col-sm-6">
                                        <label className="form-label">Username</label>
                                        <input type="text" className={`styled-input ${errors.userName ? 'error-input' : ''}`} {...register('userName', {required: true})}  value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="e.g JohnDoe234" />
                                        {errors.userName && <span style={{color: 'red'}}>This Feild is required</span>}
                                      </div>

                                      <div className="col-12">
                                        <label className="form-label">Email</label>
                                        <input type="email" className={`styled-input ${errors.email ? 'error-input' : ''}`} {...register('email', {required: true})}  value={email} onChange={(e) => setEmail(e.target.value)} placeholder="e.g johnDoe23@gmail.com" />
                                        {errors.email && <span style={{color: 'red'}}>This Feild is required</span>}
                                      </div>

                                      <div className="col-12">
                                        <label className="form-label">Password</label>
                                        <div className="password-container">
                                          <input type={`${showPassword ? "text": 'password'}`}  className={`styled-input password-input ${errors.password ? 'error-input' : ''}`} {...register('password', {required: true})}  value={password} onChange={(e) => setPassword(e.target.value)}  placeholder="Enter your password" />
                                          <span className="password-icon">
                                            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} onClick={toogleShowPassword}/>
                                          </span>
                                        </div>
                                        {errors.password && <span style={{color: 'red'}}>This Feild is required</span>}
                                      </div>
                                    </div>
                                    <div className="col-12 mt-4">
                                      <button disabled={disablebutton} type="submit " className={`${disablebutton ? 'disable-btn' : ''} sign-up-btn width-100`}> Create account</button>
                                      <p className="pt-2 pb-4">Already have an account? <Link to='/login'>Login</Link> </p>
                                    </div>


                                  </form>

                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>

                  </div>
                </div>
              </div>
              <div className="col-xl-1"></div>
            </div>

          </div>

        </div>
      </section>
    
    </div> 
  )
}