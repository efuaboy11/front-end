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
import pic from "../../../img/good-mark.png"
import { Link } from 'react-router-dom';
import { ClientDashFrame } from '../../../component/ClientDashFrame';


export const ClientChangePassowrd3 = () =>{
  const { 
    OnbodyClick,
  } = useContext(AuthContext)





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


          <section className='py-4 row justify-content-center'> 
            <div className='pb-5 '>
              <div className='text-center'>
                <p className='dashboard-header'>Change Password</p>
                <p className="light-text">Make changes to your passowrd</p>
              </div>
            </div>
            <div className="col-lg-7 col-md-9">
              <Box sx={{ width: '100%' }}>
                <Stepper activeStep={2} alternativeLabel>
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
                <div className="row justify-content-center pt-3">
                    <div className="col-4">
                      <img src={pic} alt="" width="80%"/>
                    </div>

                    <div className="col-12 text-center">
                      <h1>SUCCESSFUL</h1>
                      <p>Your password has been updated. <br /> Thank you for choosing for AmanilightEquity </p>
                      <p className='mt-4 mb-2'><Link to="/dashboard/change-password/step-1/" className="py-2 px-3  dashboard-btn"><i class="pe-1 bi bi-arrow-left"></i> Back</Link></p>
                    </div>
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