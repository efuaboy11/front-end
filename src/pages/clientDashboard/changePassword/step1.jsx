import '../../../css/dashboardCss/dashboard.css'
import AuthContext from "../../../context/AuthContext";
import { useContext, useEffect, useState } from 'react';
import { AdminDashFrame } from '../../../component/adminDashFrame';
import FloatingAlert from '../../../component/alert';
import { useForm } from 'react-hook-form';
import { LoadingSpiner } from '../../../component/spin';
import AllDataContext from '../../../context/Alldata';
import { DashboardFooter } from '../../../component/dashbaordFooter';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { useAccess } from '../../../context/accessContext';
import { ClientDashFrame } from '../../../component/ClientDashFrame';

export const ClientChangePassowrd1 = () =>{

  const { authTokens, 
    messages,
    alertVisible,
    setAlertVisible,
    isSuccess,


    email,
    setEmail,
    RequestOTP,
    setPage,


    OnbodyClick,
    disablebutton, 
    setDisablebutton,

    loader,
    setLoader,





  } = useContext(AuthContext)

  setPage('dashboard/change-password/step-2/')


  
  const onSubmit = (data, e) =>{
    setDisablebutton(true)
    if(isValid){
      RequestOTP(e)
      
    }else{
      setDisablebutton(false)
    }
  }


  const ClearInput = () =>{
    setEmail('')

  }

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();



  const steps = [
    'Enter Your Email',
    'Enter OTP & Password',
    'Successfull',
  ];

  return(
    <div>
      <div className="position-sticky1">
        <ClientDashFrame />
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
            <div className='pb-5 mb-2'>
              <div className='text-center'>
                <p className='dashboard-header'>Change Password</p>
                <p className="light-text">Make changes to your passowrd</p>
              </div>
            </div>
            <div className="col-lg-7 col-md-9">
              <Box sx={{ width: '100%' }}>
                <Stepper activeStep={0} alternativeLabel>
                  {steps.map((label) => (
                    <Step key={label}>
                      <StepLabel
                        StepIconProps={{
                          sx: {
                            '&.Mui-active, &.Mui-completed': {
                              color: '#4A249D', // Active and completed step circle color
                            },
                            '&': {
                              color: 'black', // Default step circle color
                            },
                          },
                        }}
                      
                      >
                        <span className='light-text'>{label}</span>                     
                      </StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </Box>

              <div className="dashboard-boxes mt-4 p-4 border-radius-5px">
                <div>
                  <form  onSubmit={handleSubmit(onSubmit)}>
                    <div className='row g-3'>

                      <div className="col-12">
                        <label htmlFor="" className="p-2 ">email</label>
                        <input type="text" className={`dashboard-input ${errors.email ? 'error-input' : ''}`} {...register('email', {required: true})}  value={email} onChange={(e) => setEmail(e.target.value)} placeholder="e.g johnDoe223@gmail.com" />
                        {errors.email && <span style={{color: 'red'}}>This Feild is required</span>} 
                      </div>
                      
                      <div className='col-12 pt-4'>
                        <div className="d-flex height-100 align-items-center">
                          <div className='pe-4'>

                            <button className="dashboard-btn py-2 px-4" type="submit" disabled={disablebutton}>Next <i class="ps-1 bi bi-arrow-right"></i></button> 
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