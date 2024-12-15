import '../../../../css/dashboardCss/dashboard.css'
import AuthContext from "../../../../context/AuthContext";
import { useContext, useEffect, useState } from 'react';
import { AdminDashFrame } from '../../../../component/adminDashFrame';
import FloatingAlert from '../../../../component/alert';
import { useForm } from 'react-hook-form';
import { LoadingSpiner } from '../../../../component/spin';
import AllDataContext from '../../../../context/Alldata';
import { DashboardFooter } from '../../../../component/dashbaordFooter';
import { useNavigate } from 'react-router-dom';

export const SelectUser = () =>{

  const [user, setUser] = useState('')


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

  const navigate = useNavigate()

  const {
    usersData,
    UsersFunction

  } = useContext(AllDataContext)

  useEffect(() =>{
    UsersFunction()

  }, [])
  
  const onSubmit = () =>{
    sessionStorage.setItem("userID", user)
    navigate('/admin/individual-payment-method/payment-option/')
    
  }

  const ClearInput = () =>{
    setUser('')

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

          <section className='py-4 row justify-content-center'> 
            <div className="col-md-11 col-xl-10">
              <div>
                <div>
                  <p className='dashboard-header'>Individual Payment Method</p>
                  <p className="light-text">Select the user  payment method. </p>
                </div>
              </div>

              <div className="row pt-4">
                <div className="col-md-8">
                  <div className="dashboard-boxes mt-4 p-4 border-radius-5px">
                    <div>
                      <form  onSubmit={handleSubmit(onSubmit)}>
                        <div className='row g-3'>
                          <div className="col-12">
                            <label htmlFor="" className="p-2">Add to Account</label>
                            <select className={`${errors.user ? 'error-input' : ''} dashboard-input cursor-pointer`} {...register('user', {required: true})} type="text"   value={user} onChange={(e) => setUser(e.target.value)}>
                              <option></option>
                              {usersData.map((data) =>(

                                <option value={data.id} key={data.id}>{data.full_name}</option>
                              ))}
                            </select>
                            {errors.user && <span style={{color: 'red'}}>This Feild is required</span>} 
                          </div>
                          
                          <div className='col-12 pt-4'>
                            <div className="d-flex height-100 align-items-center">
                              <div className='pe-4'>

                                <button className="dashboard-btn py-2 px-4" type="submit" disabled={disablebutton}>Select User</button> 
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