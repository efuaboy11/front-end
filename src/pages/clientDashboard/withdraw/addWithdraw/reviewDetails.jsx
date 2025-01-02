import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faBan, faChartLine, faCircleDollarToSlot, faCreditCard,  faHandHoldingDollar, faMailBulk, faMoneyBillTransfer, faTriangleExclamation} from "@fortawesome/free-solid-svg-icons"
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect} from "react";
import AuthContext from "../../../../context/AuthContext";
import '../../../../css/dashboardCss/dashboard.css'
import '../../../../css/dashboardCss/adminDahboardCss/adminHome.css'
import { AdminDashFrame } from "../../../../component/adminDashFrame";
import '../../../../css/style.css'
import spin from '../../../../img/Spin.gif'
import AllDataContext from '../../../../context/Alldata';
import { DashboardFooter } from '../../../../component/dashbaordFooter';
import FloatingAlert from '../../../../component/alert';
import { ClientDashFrame } from '../../../../component/ClientDashFrame';
import { set, useForm } from 'react-hook-form';
import { ProcessingSpiner } from '../../../../component/spin';
import pic from '../../../../img/error.png'

export const WithdrawReviewDetails = () =>{
  const {authTokens,
    OnbodyClick,
    formatDate,
    formatCurrency,
    formatName,
    shortName,
    disablebutton, 
    setDisablebutton,

    messages,
    alertVisible,
    setAlertVisible,
    isSuccess,
    showAlert,
    setMessage,
    setIsSuccess,
    userProfile,
    formatFirstName,
    handleCopy,
    copied,
    loader,
    setLoader,
    updateDateTime,
    currentDateTime,


  } = useContext(AuthContext)


  const navigate  = useNavigate()
  const [details, setDetails] = useState(null)


  const [amount, setAmount] = useState('')
  const [paymentTypeID, setPaymentTypeID] = useState('')
  const [paymentTypeName, setPaymentTypeName] = useState('')
  const [paymentMethodID, setPaymentMethodID] = useState('')
  const [urlLink, setUrlLink] = useState('')

  const [bankCardData, setBankCardData] = useState(null)
  const [bankCardLoader, setBankCardLoader] = useState(true)
  const [bankAccountData, setBankAccountData] = useState(null)
  const [bankAccountLoader, setBankAccountLoader] = useState(true)
  const [walletAddressData, setWalletAddressData] = useState(null)
  const [WalletAddressLoader, setWalletAddressLoader] = useState(true)




  const [processingText, setProcessingText] = useState('Processing')

  const [showWalletDetails, setShowWalletDetails] = useState(false)
  const [showBankAccountDetails, setShowBankAccountDetails] = useState(false)
  const [showBankCardDetails, setShowBankCardDetails] = useState(false)
  useEffect(() =>{
    updateDateTime()

  }, [])

  const BankCardFunction = async() =>{   

    let response = await fetch(`http://127.0.0.1:8000/api/bank-card/${sessionStorage.getItem('paymentMethodID')}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens.access}`
      },
    })


    const data = await response.json()
    if(response.ok){
      setBankCardData(data)
      setBankCardLoader(false)

    }else{
      setBankCardLoader(false)
    }

  }

  const BankAccountFunction = async() =>{
    let response = await fetch(`http://127.0.0.1:8000/api/bank-account/${sessionStorage.getItem('paymentMethodID')}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens.access}`
      },
    })

    const data = await response.json()
    if(response.ok){
      setBankAccountData(data)
      setBankAccountLoader(false)

    }else{
      setBankAccountLoader(false)
    }
            
  }

  const WalletAddressFunction = async() =>{
      let response = await fetch(`http://127.0.0.1:8000/api/wallet-address/${sessionStorage.getItem('paymentMethodID')}/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens.access}`
        },
      })

      const data = await response.json()
      if(response.ok){
        setWalletAddressData(data)
        setWalletAddressLoader(false)

      }else{
        setWalletAddressLoader(false)
      }





  }

  const addWithdraw = async(e) =>{
    e.preventDefault()
    setLoader(true)
    setDisablebutton(true)

    const formData = new FormData()

    formData.append('user', userProfile.user_details.id)
    formData.append('amount', amount)
		formData.append('payment_method_type', paymentTypeID)
		formData.append('payment_method_id', paymentMethodID)
    formData.append('status', 'pending')


    try{
      const response = await fetch('http://127.0.0.1:8000/api/withdraw/', {
        method: 'POST',
        body: formData,
        headers:{
          Authorization: `Bearer ${authTokens.access}`
        }
      })


      if(response.ok){
        showAlert()
        setIsSuccess(true)
        setMessage('Withdraw Sucessful')
        setLoader(false)
        setDisablebutton(false)
				navigate('/dashboard/withdraw/successful/')

      }else{
        const errorData = await response.json()
        const errorMessages = Object.values(errorData)
        .flat()
        .join(', ');
        setMessage(errorMessages)
        setDisablebutton(false)
        setIsSuccess(false)
        showAlert()
        setLoader(false)
      }

      
    }catch(error){
      console.log(error)
      showAlert()
      setMessage('An unexpected error occurred.');
      setDisablebutton(false)
      setIsSuccess(false)

    }    
  }



  useEffect(() =>{
    setPaymentTypeID(sessionStorage.getItem('paymentTypeID'))
    setPaymentTypeName(sessionStorage.getItem('PaymentTypeName'))
    setPaymentMethodID(sessionStorage.getItem('paymentMethodID'))
    setUrlLink( sessionStorage.getItem('urlLink'))
    setAmount(sessionStorage.getItem('amount'))

    if(sessionStorage.getItem('PaymentTypeName') === 'Bank Card'){
      BankCardFunction()
      setShowBankCardDetails(true)
    }

    if(sessionStorage.getItem('PaymentTypeName') === 'Bank Account'){
      BankAccountFunction()
      setShowBankAccountDetails(true)
    }

    if(sessionStorage.getItem('PaymentTypeName') === 'Wallet Address'){
      WalletAddressFunction()
      console.log(sessionStorage.getItem('PaymentTypeName') === 'Wallet Address')
      setShowWalletDetails(true)
    }

    




  }, [])

  const NavigateToStep3 = () =>{
    setProcessingText("Reviewing")
    setLoader(true)
    const timer = setTimeout(() => {
      navigate('/dashboard/deposit/step-3/')
      setLoader(false)
    }, 4000); 

    return () => clearTimeout(timer);
 
  }


  return(
    <div>
      <div className="position-sticky1">
        <ClientDashFrame />
      </div>
      <div>
        <FloatingAlert
          message={messages}
          isVisible={alertVisible}
          onClose={() => setAlertVisible(false)}
          successs={isSuccess}
        />
      </div>
 

      {loader &&
        <ProcessingSpiner text={processingText}/>
      }


      <div className="main-content pb-5" onClick={OnbodyClick}>
        {(!loader) &&     
          <div className="container-lg">

              <div className="row justify-content-center">
                <div className="col-11 col-sm-10 col-md-8 col-xxl-7 pt-4">
                  <div className='text-center pb-3'>
                    <Link to={`${urlLink}`} className='light-link'><i class="bi bi-arrow-left pe-2"></i> Previous Page</Link>
                    <p className="dashboard-header pb-3">Review Withdraw Details</p>
                    <h5 className='pb-2'>You are about to withdraw <span className="font-bold">{formatCurrency(amount)}</span>  USD into your payment gateway.</h5>
                    <p className="small-text-2 light-text">Please review and confirm the withdraw details..</p>
                  </div>

                  <div className="dashboard-boxes px-5 pt-4 pb-5 border-radius-5px">
                    <div className="row g-4 pb-3">

                      <div className='col-6'>
                        <p className='light-text'>Transaction Date:</p>
                        <p>{currentDateTime}</p>
                      </div>

                      <div className='col-6'>
                        <p className='light-text'>Withraw Amount:</p>
                        <p>{formatCurrency(amount)} USD</p>
                      </div>
                    </div>
                    <div className='pb-4'>
                      <hr />
                      <div>
                        <p className='font-bold'>Payment Gateway Details</p>
                      </div>
                    </div>
                    {showWalletDetails &&
                      <div>
                        {walletAddressData ? (
                          <div className="row g-3">                       
                            <div className="col-md-4 col-sm-6">
                              <div>
                                <p>Payment Gateway:</p>
                                <p>Wallet Address</p>
                              </div>



                            </div>

                            <div className="col-md-4 col-sm-6">
                              <div>
                                <p>Label:</p>
                                <p>{walletAddressData.label}</p>
                              </div>
                            </div>

                            <div className="col-md-4 col-sm-6">
                              <div>
                                <p>Wallet Address:</p>
                                <p>{walletAddressData.walletAddress}</p>
                              </div>
                            </div>


                            <div className="col-md-4 col-sm-6">
                            <div>
                                <p>Payment Coin:</p>
                                <p>{walletAddressData.coin}</p>
                              </div>
                            </div>

                            
                            <div className="col-md-4 col-sm-6">
                              <div>
                                <p>Network:</p>
                                <p>{walletAddressData.network}</p>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div>
                            {WalletAddressLoader ? (
                              <div className="d-flex justify-content-center py-5 my-5">
                                <img src={spin} alt="" width='60px'/>
                              </div> 
                            ): (
                              <div >
                                {/* <img src={pic} alt="" width='200px'/>
                                <p>There is an error in your withdrawal transaction</p> */}
                              </div>
                            )}
                          </div>
                        )}

                      </div>
                    }
                    {showBankAccountDetails &&
                      <div>
                        {bankAccountData ? (
                          <div className="row g-3">
                            <div className="col-md-4 col-sm-6">
                              <div>
                                <p>Payment Gateway:</p>
                                <p>Bank Account</p>
                              </div>



                            </div>

                            <div className="col-md-4 col-sm-6">
                              <div>
                                <p>Label:</p>
                                <p>{bankAccountData.label}</p>
                              </div>
                            </div>

                            <div className="col-md-4 col-sm-6">
                              <div>
                                <p>Bank Name:</p>
                                <p>{bankAccountData.bank_name}</p>
                              </div>
                            </div>

                            <div className="col-md-4 col-sm-6">
                              <div>
                                <p>Account Name:</p>
                                <p>{bankAccountData.account_name}</p>
                              </div>
                            </div>

                            <div className="col-md-4 col-sm-6">
                            <div>
                                <p>Account Number:</p>
                                <p>{bankAccountData.account_number}</p>
                              </div>
                            </div>

                            
                            <div className="col-md-4 col-sm-6">
                              <div>
                                <p>Currency:</p>
                                <p>{bankAccountData.currency}</p>
                              </div>
                            </div>
                          </div>
                        ): (
                          <div>
                            {bankAccountLoader ? (
                              <div className="d-flex justify-content-center py-5 my-5">
                                <img src={spin} alt="" width='60px'/>
                              </div> 
                            ): (
                              <div >
                                <img src={pic} alt="" width='200px'/>
                                <p>There is an error in your withdrawal transaction</p>
                              </div>
                            )}
                          </div>
                        )}

                      </div>
                    }

                    {showBankCardDetails &&
                      <div>
                        {bankCardData ? (
                          <div className="row g-3">
                            <div className="col-md-4 col-sm-6">
                              <div>
                                <p>Payment Gateway:</p>
                                <p>Bank Card</p>
                              </div>



                            </div>

                            <div className="col-md-4 col-sm-6">
                              <div>
                                <p>Label:</p>
                                <p>{bankCardData.label}</p>
                              </div>
                            </div>

                            <div className="col-md-4 col-sm-6">
                              <div>
                                <p>Card Number:</p>
                                <p>{bankCardData.card_number}</p>
                              </div>
                            </div>

                            <div className="col-md-4 col-sm-6">
                              <div>
                                <p>Name on Card:</p>
                                <p>{bankCardData.name_on_card}</p>
                              </div>
                            </div>

                            <div className="col-md-4 col-sm-6">
                            <div>
                                <p>Expiration Date:</p>
                                <p>{bankCardData.expiration_date}</p>
                              </div>
                            </div>

                            
                            <div className="col-md-4 col-sm-6">
                              <div>
                                <p>Cvv:</p>
                                <p>{bankCardData.cvv}</p>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div>
                            {bankCardLoader ? (
                              <div className="d-flex justify-content-center py-5 my-5">
                                <img src={spin} alt="" width='60px'/>
                              </div> 
                            ): (
                              <div >
                                <img src={pic} alt="" width='200px'/>
                                <p>There is an error in your withdrawal transaction</p>
                              </div>
                            )}
                          </div>
                        )}

                      </div>
                    }


                  </div>

                  <div className="dashboard-boxes border-radius-5px p-3 mx-3 mt-3">
                    <div className="d-flex justify-content-between">
                      <p className="light-text">You'll Send</p>
                      <p>{formatCurrency(amount)} USD</p>
                    </div>
                    
                  </div>

                  <div className='mx-5 pt-3'>
                    <button onClick={addWithdraw} className="dashboard-btn width-100 pt-2 pb-3" type="submit" disabled={disablebutton}>Confirm & Pay</button>      
                    <p className='text-center failed-text mt-2'>Cancel Transaction</p>  
                  </div>


                </div>
              </div>
              {/* <div>
                <div className="row justify-content-center">
                  <div className='text-center col-11 col-sm-10 col-md-8 col-xxl-6 pt-5'>
                    <img src={pic} alt="" width='150px'/>
                    <p className="dashboard-header">Error</p>
                    <p className='light-text pb-3'>There was an error processing your request. Please go back and <br /> restart the process</p>
                    <Link to='/dashboard/deposit/step-1/' className="Link">
                      <p className='dashboard-btn width-100 pt-2 pb-3'><i class="bi bi-arrow-left pe-2"></i>Back</p>   
                    </Link>      
                  </div>
                </div>

              </div> */}
            

          </div> 

        } 
      </div>

      <div className='py-5'>
        <DashboardFooter />
      </div>


    </div>
      
  )
}