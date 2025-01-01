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
import { useForm } from 'react-hook-form';


export const AddDeposit1 = () =>{
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
    setLoader,


  } = useContext(AuthContext)

  const {
    paymentOptionsData,
    PaymentOptionsFunction,

  } = useContext(AllDataContext)

  const navigate  = useNavigate()
  const [paymentOption, setPaymentOption] = useState('')
  const [amount, setAmount] = useState('')

  useEffect(() =>{
    PaymentOptionsFunction()

  }, [])

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();


  const onSubmit = (data, e) =>{
    setDisablebutton(true)
    if(isValid){
      sessionStorage.setItem('despositAmount', amount)
      IndvividualPaymentMethod()     
    }else{
      setDisablebutton(false)
    }
  }
  const IndvividualPaymentMethod = async() =>{
    setDisablebutton(true)
    let response = await fetch(`http://127.0.0.1:8000/api/payment-method/${paymentOption}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens.access}`
      }
      
    })
    const data = await response.json()
    sessionStorage.setItem('paymentMethod', JSON.stringify(data))
    if (response.ok){
      setLoader(true)
      navigate('/dashboard/deposit/step-2/')
      setDisablebutton(false)
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


        <div className="main-content pb-5" onClick={OnbodyClick}>
          <div className="container-lg">
            <div className="row justify-content-center">
              <div className="col-11 col-sm-10 col-md-8 col-xxl-6 pt-4">
                <div className='text-center pb-3'>
                  <p className="dashboard-header pb-3">Deposit Funds</p>
                  <h5 className='pb-2'>Top up your account via our payment system.</h5>
                  <p className="small-text-2 light-text">The deposited amount will reflect on both your account balance and deposit wallet after approval.</p>
                </div>

                <form  onSubmit={handleSubmit(onSubmit)}>
                  <div className="row g-3">
                    <div className="col-12">
                      <label htmlFor="" className="p-2">Payment Method</label>
                      <select className={`${errors.paymentOption ? 'error-input' : ''} dashboard-input cursor-pointer p-2`} {...register('paymentOption', {required: true})} type="text"   value={paymentOption} onChange={(e) => setPaymentOption(e.target.value)}>
                        <option value=''>Select one</option>
                        {paymentOptionsData.map((data) =>(

                          <option value={data.id} key={data.id}>{formatName(data.name)} ({data.type}) - {data.network}</option>
                        ))}
                      </select>
                      {errors.paymentOption && <span style={{color: 'red'}}>This Feild is required</span>} 
                    </div>

                    <div className="col-12">
                      <label htmlFor="" className="p-2 ">Amount</label>
                      <input type="text" className={`dashboard-input ${errors.amount ? 'error-input' : ''} p-2`} {...register('amount', {required: true})}  value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.00" />
                      {errors.amount && <span style={{color: 'red'}}>This Feild is required</span>} 
                    </div>

                    <div className='col-12 pt-3 '>
                      <button className="dashboard-btn width-100 pt-2 pb-3" type="submit" disabled={disablebutton}>Continue</button>        
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className='py-5'>
          <DashboardFooter />
        </div>



    </div>
      
  )
}