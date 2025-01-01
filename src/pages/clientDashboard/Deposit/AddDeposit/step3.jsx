import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faBan, faChartLine, faCircleDollarToSlot, faCreditCard,  faHandHoldingDollar, faMailBulk, faMoneyBillTransfer} from "@fortawesome/free-solid-svg-icons"
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

export const AddDeposit3 = () =>{
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


  } = useContext(AuthContext)


  const navigate  = useNavigate()
  const [details, setDetails] = useState(null)
  const [amount, setAmount] = useState('')
  const [img, setImg] = useState("")
  const [processingText, setProcessingText] = useState('Processing')


  const handleImgFile = (event) => {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      setImg(file); 
    } else {
      setImg(null); 
    }
  };

  const onSubmit = (data, e) =>{
    setDisablebutton(true)
    if(isValid){
      addDeposit(e)
      
    }else{
      setDisablebutton(false)
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();





  useEffect(() =>{
    const data = sessionStorage.getItem('paymentMethod')
    setAmount(sessionStorage.getItem('despositAmount'))
    if(data){
      const parsedData = JSON.parse(data)
      setDetails(parsedData)
    }


  }, [])

  const addDeposit = async(e) =>{
    e.preventDefault()
    setProcessingText('Finalizing Deposit')
    setLoader(true)

    const formData = new FormData()

    formData.append('amount', amount)
    formData.append('payment_method', details.id)
    formData.append('payment_proof', img)

    try{
      const response = await fetch('http://127.0.0.1:8000/api/deposits/', {
        method: 'POST',
        body: formData,
        headers:{
          Authorization: `Bearer ${authTokens.access}`
        }
      })


      if(response.ok){
        showAlert()
        setMessage('Deposit Sucessfully added')
        setIsSuccess(true)
        setLoader(false)
        setDisablebutton(false)
        navigate('/dashboard/deposit/step-4/')

      }else{
        const errorData = await response.json()
        const errorMessages = Object.values(errorData)
        .flat()
        .join(', ');
        setMessage(errorMessages)
        setDisablebutton(false)
        setIsSuccess(false)
        setLoader(false)
        showAlert()
      }

      
    }catch(error){
      console.log(error)
      showAlert()
      setMessage('An unexpected error occurred.');
      setDisablebutton(false)
      setIsSuccess(false)

    }  
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
            {details != null ? (
              <div className="row justify-content-center">
                <div className="col-11 col-sm-10 col-md-8 col-xxl-6 pt-4">
                  <div className='text-center pb-3'>
                    <Link to='/dashboard/deposit/step-2/' className='light-link'><i class="bi bi-arrow-left pe-2"></i> Previous Page</Link>
                    <p className="dashboard-header pb-3">Make Your Payment</p>
                    <p className="small-text-2 light-text">Your order is almost complete. To finalize, please send the exact amount of <span className="font-bold">{formatCurrency(amount)}</span> <br />  to the address below.</p>
                  </div>
                 
                  <div>
                    <div className="row justify-content-center">
                      <div className="col-7 py-4">
                        <img className='border-radius-5px' src={details.qr_code} width='100%' alt="" />
                      </div>
                    </div>

                    <div className='pb-2'>
                      <p className='light-text'>{formatName(details.name)}</p>
                    </div>

                    <div className="row pb-2">
                      <div className="col-12">
                        <div className="width-100">
                          <div className="border1 border-radius-5px">
                            <div className="row">
                              <div className="col-10">
                                <p className='dashboard-secondary-bg p-2 '>
                                  <i class="bi bi-link-45deg"></i> {details.wallet_address}
                                </p>
                              </div>

                              <div className="col-2  cursor-pointer" onClick={() => handleCopy(details.wallet_address)}>
                                <div className="d-flex align-items-center height-100">
                                  {copied ? (
                                    <p className='sucessfull-text'><i class="bi bi-clipboard-check"></i></p>
                                  ): (
                                    <p><i class="bi bi-clipboard pe-1"></i></p>
                                  )}

                                  <div className="dashbboard-referral-link-copy-text">
                                    {copied ? (
                                      <p className='sucessfull-text'>copied</p>
                                    ): (
                                      <p>Copy</p>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="italic-text sm-text-2">
                      <p className='light-text'>Send only {details.type} to this address and only through the {details.network} network. Sending any other asset and through another network will result in a permanent loss of that asset.</p>
                    </div>
                  </div>

                  

                  <div className='pt-4  text-center'>
                    <p className='light-text'>Please upload the transaction receipt for verification purposes.</p>
                  </div>


                  <div className="py-2">
                    <form  onSubmit={handleSubmit(onSubmit)}>
                      <div className="row g-3">
                        <div className="col-12">
                          <label htmlFor="" className="p-2 ">Upload Payment Proof</label>
                          <input className={`dashboard-input ${errors.img ? 'error-input' : ''} form-control-sm`} {...register('img', {required: true})} type="file" onChange={handleImgFile}/>
                          {errors.img && <span style={{color: 'red'}}>This Feild is required</span>} 
                        </div>
                      </div>


                      <div className='col-12 py-3 ms-4'>
                        <p className="light-text">Please upload the correct Tether transaction receipt for proof.</p>
                        <p className="light-text">Account will be credited once we have confirmed your payment.</p>
                      </div> 


                      <div className='mx-4 pt-3'>
                        <button className="dashboard-btn width-100 pt-2 pb-3" type="submit" disabled={disablebutton}>Paid {formatName(details.name)}</button>      
                        <p className='text-center failed-text mt-2'>Cancel Transaction</p>  
                      </div>
                    </form> 
                  </div>          


                </div>
              </div>
            ) : (
              <div>
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

              </div>
            )}

          </div> 

        } 
      </div>

      <div className='py-5'>
        <DashboardFooter />
      </div>



    </div>
      
  )
}