import '../../../../css/dashboardCss/dashboard.css'
import AuthContext from "../../../../context/AuthContext";
import { useContext, useEffect, useState } from 'react';
import { AdminDashFrame } from '../../../../component/adminDashFrame';
import FloatingAlert from '../../../../component/alert';
import { useForm } from 'react-hook-form';
import { LoadingSpiner, ProcessingSpiner } from '../../../../component/spin';
import AllDataContext from '../../../../context/Alldata';
import { DashboardFooter } from '../../../../component/dashbaordFooter';
import { Link, useNavigate } from 'react-router-dom';
import { ClientDashFrame } from '../../../../component/ClientDashFrame';

export const ClientPaymetntDetailsOptionsWithdraw = () =>{

  const navigate = useNavigate()

  const [processingText, setProcessingText] = useState('Processing')
  const navigateBankCard = () =>{
    sessionStorage.setItem('paymentTypeID', 31)
    sessionStorage.setItem('PaymentTypeName', 'Bank Card')
    setProcessingText("Retrieving")
    setLoader(true)
    const timer = setTimeout(() => {
      navigate('/dashboard/withdraw/bank-card/')
      setLoader(false)
    }, 6000);
    return () => clearTimeout(timer);
  }

  const navigateBankAccount = () =>{
    sessionStorage.setItem('paymentTypeID', 30)
    sessionStorage.setItem('PaymentTypeName', 'Bank Account')
    setProcessingText("Retrieving")
    setLoader(true)
    const timer = setTimeout(() => {
      navigate('/dashboard/withdraw/bank-account/')
      setLoader(false)
    }, 3000);
    return () => clearTimeout(timer);
  }

  const navigateWalletAdress = () =>{
    sessionStorage.setItem('paymentTypeID', 29)
    sessionStorage.setItem('PaymentTypeName', 'Wallet Address')
    setProcessingText("Retrieving")
    setLoader(true)
    const timer = setTimeout(() => {
      navigate('/dashboard/withdraw/wallet-address/')
      setLoader(false)
    }, 3000);
    return () => clearTimeout(timer);
  }


  const { authTokens, 

    OnbodyClick,
    disablebutton, 
    setDisablebutton,
    loader,
    setLoader


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

  useEffect(() => {
    if (loader) {
      const timer = setTimeout(() => {
        setLoader(false);
      }, 3000); // Reset after 1 second

      return () => clearTimeout(timer); // Cleanup the timer to avoid memory leaks
    }
  }, [loader]);

   
  
  

  
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
          {!loader &&
            <section className='py-4 row justify-content-center'> 
              <div className="col-md-11 col-xl-10">
                <div className='d-flex justify-content-center text-center'>
                  <div>
                  <Link to='/dashboard/add-withdraw/' className='light-link'><i class="bi bi-arrow-left pe-2"></i> Previous Page</Link>
                    <p className='dashboard-header'>Payment Account</p>
                    <p className="light-text">Select the paymnent You want to use in performing the transaction</p>
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
          }
        </div>
      </div>

      <div>
        <DashboardFooter />
      </div>


    </div>
  )
}