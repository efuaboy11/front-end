
import "../../css/signUp/signUp.css"
import "../../css/signUp/login.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEye, faEyeSlash, faLock} from "@fortawesome/free-solid-svg-icons"
import { useState, useContext} from "react";
import { useForm } from 'react-hook-form';
import FloatingAlert from "../../component/alert";
import AuthContext from "../../context/AuthContext";

export const ForgotPassWord2 = () =>{
  const {
    password,
    setPassword,
    messages,
    alertVisible,
    setAlertVisible,
    showAmimaton, 
    setShowAnimation,
    disablebutton, 
    setDisablebutton,
    isSuccess,
    otp,
    setOtp,
    ForgotPasssword

  }= useContext(AuthContext)

  const[ showPassword, setShowPassword] = useState(false)

  const toogleShowPassword = () =>{
    setShowPassword(!showPassword)
  }




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
      ForgotPasssword(e)
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
                                  <h1><span className="primary-txt">Step</span>-2</h1>
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
                                  <h1><span className="primary-txt">Step</span>-2</h1>
                                </div>
                                <div>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="row g-3">
                                      <div className="col-12">
                                        <div class="otp-group">
                                          <span class="otp-input-text"><FontAwesomeIcon icon={faLock}/></span>
                                        <input type="text"  className={`otp-input styled-input ${errors.otp ? 'error-input' : ''}`} {...register('otp', {required: true})}  value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="OTP code"/>
                                        </div>
                                        {errors.otp && <span style={{color: 'red'}}>This Feild is required</span>}
                                      </div>

                                      <div className="col-12">
                                        <label className="form-label">New Password</label>
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
                                      <button disabled={disablebutton} type="submit " className={`${disablebutton ? 'disable-btn' : ''}sign-up-btn width-100`}>SUBMIT</button>
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