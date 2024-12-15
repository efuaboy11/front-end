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

export const PaymetntDetailsOptions = () =>{

  const [user, setUser] = useState('')
  const navigate = useNavigate()


  const navigateBankCard = () =>{
    navigate('/admin/individual-payment-method/individual-bank-card/')
  }

  const navigateBankAccount = () =>{
    navigate('/admin/individual-payment-method/individual-bank-account/')
  }

  const navigateWalletAdress = () =>{
    navigate('/admin/individual-payment-method/individual-wallet/')
  }


  const { authTokens, 

    OnbodyClick,
    disablebutton, 
    setDisablebutton,


  } = useContext(AuthContext)


  const {
    usersData,
    UsersFunction

  } = useContext(AllDataContext)

  useEffect(() =>{
    UsersFunction()

  }, [])

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
                  <p className='dashboard-header'>Payment Account</p>
                  <p className="light-text">Select any of the various payment method below.</p>
                </div>
              </div>


              <div className='pt-5'> 
                <div className="dashboard-boxes border-radius-5px p-4 mb-4">

                  <div className="d-flex justify-content-between height-100 align-items-center">
                    <div className="d-flex height-100 align-items-center">
                      <div className='paymentDetailOptions'>
                       <i class="bi bi-currency-bitcoin sm-text"></i>
                      </div>


                      <div>
                        <h6>Crypto Wallet Address</h6>
                      </div>

                    </div>

                    <div>
                      <button disabled={disablebutton} className='Button' onClick={navigateWalletAdress}>
                        <p className='light-text dashboard-table-arrow'><i class=" bi bi-chevron-right sm-text"></i></p>
                      </button>
                    </div>
                    
                  </div>


                </div>


                <div className="dashboard-boxes border-radius-5px p-4 mb-4">

                  <div className="d-flex justify-content-between height-100 align-items-center">
                    <div className="d-flex height-100 align-items-center">
                      <div className='paymentDetailOptions'>
                        <i class="bi bi-bank  sm-text"></i>
                      </div>


                      <div>
                        <h6>Bank Accounts</h6>
                      </div>

                    </div>

                    <div>
                      <button disabled={disablebutton} className='Button' onClick={navigateBankAccount}>
                        <p className='light-text dashboard-table-arrow'><i class=" bi bi-chevron-right sm-text"></i></p>
                      </button>
                    </div>
                    
                  </div>


                </div>
 

                <div className="dashboard-boxes border-radius-5px p-4 mb-4">

                  <div className="d-flex justify-content-between height-100 align-items-center">
                    <div className="d-flex height-100 align-items-center">
                      <div className='paymentDetailOptions'>
                      <i class="bi bi-credit-card-2-back sm-text"></i>
                      </div>


                      <div>
                        <h6>Bank Cards</h6>
                      </div>

                    </div>

                    <div>
                      <button disabled={disablebutton} className='Button' onClick={navigateBankCard}>
                        <p className='light-text dashboard-table-arrow'><i class=" bi bi-chevron-right sm-text"></i></p>
                      </button>
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