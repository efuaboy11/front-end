
import "../../css/signUp/signUp.css"
import "../../css/signUp/login.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom";
import { useState, useContext} from "react";
import { useForm } from 'react-hook-form';
import FloatingAlert from "../../component/alert";
import AuthContext from "../../context/AuthContext";

export const Login = () =>{
  const {
    email, 
    setEmail,
    password,
    setPassword,
    messages,
    alertVisible,
    setAlertVisible,
    RequestOTP,
    showAmimaton, 
    setShowAnimation,
    disablebutton, 
    setDisablebutton,
    isSuccess,
    setPage,

  }= useContext(AuthContext)

  const[ showPassword, setShowPassword] = useState(false)

  const toogleShowPassword = () =>{
    setShowPassword(!showPassword)
  }

  setPage('otp-page')


  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();

  const onSubmit = (data, e) =>{
    setDisablebutton(true)
    setShowAnimation(true)
    if (isValid){
      console.log(data)

      RequestOTP(e)
    }else{
      console.log('error')
      setDisablebutton(false)
    }
  }

  


  return(
    <div className="sign-up-bg">
      <section className="container-lg">
        <div>
          <FloatingAlert
            message={messages}
            isVisible={alertVisible}
            onClose={() => setAlertVisible(false)}
            successs={isSuccess}
          />
        </div>
        <div className=''>
          <div>
            <div className="row">
              <div className="col-xl-1"></div>
              <div className="col-xl-10">
                <div className="login-page">
                  <div className="login-box">
                    {showAmimaton &&
                      <div className="sign-up-animation"></div>            
                    }

                    <div className="login-box-margin">
                      <div className="row">
                        <div className="col-md-4 ">
                          <div className="sign-up-texts">
                            <div class="d-none d-md-block ">
                              <div>
                                <img src="" alt="" />
                              </div>
                              <div className="">
                                <div className="">
                                  <h1><span className="primary-txt">Login</span></h1>
                                  <p>Login right away and start investing</p>
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
                                  <h1><span className="primary-txt">Login</span></h1>
                                </div>
                                <div>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="row g-3">
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
                                      <button disabled={disablebutton} type="submit " className={`${disablebutton ? 'disable-btn' : ''}sign-up-btn width-100`}>Login</button>

                                      <div className="d-block d-sm-flex justify-content-between py-2">
                                        <p className="">Don't have an account? <Link to='/register'>Sign up</Link> </p>
                                        <p className=""><Link to='/forgot-password'>Forgot password?</Link></p>

                                      </div>
                                      
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