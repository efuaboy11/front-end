import '../../../../css/dashboardCss/dashboard.css'
import AuthContext from "../../../../context/AuthContext";
import { useContext, useEffect, useState } from 'react';
import { AdminDashFrame } from '../../../../component/adminDashFrame';
import FloatingAlert from '../../../../component/alert';
import { useForm } from 'react-hook-form';
import { LoadingSpiner, ProcessingSpiner } from '../../../../component/spin';
import AllDataContext from '../../../../context/Alldata';
import { DashboardFooter } from '../../../../component/dashbaordFooter';
import { useNavigate } from 'react-router-dom';
import { ClientDashFrame } from '../../../../component/ClientDashFrame';

export const ClientEditBankAccount = () =>{

  const [label, setLabel] = useState('')
  const [bankName, setBankName] = useState('')
  const [bankBranch, setBankBranch] = useState('')
  const [bankCountry, setBankCountry] = useState('')
  const [accountName, setAccountName] = useState('')
  const [accountNumber, setAccountNumber] = useState('')
  const [routingNumber, setRoutingNumber] = useState('')
  const [swiftCode, setSwiftCode] = useState('')
  const [currency, setCurrency] = useState('')
  const [loader, setLoader] = useState(false)

  const [processingText, setProcessingText] = useState('Processing')

  const [details, setDetails] = useState(null)


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



  const onSubmit = (data, e) =>{
    setDisablebutton(true)
    if(isValid){
      edit(e)
      
    }else{
      setDisablebutton(false)
    }
  }

  

  const edit = async(e) =>{
    e.preventDefault()
    setLoader(true)

    const formData = new FormData()

    formData.append('label', label)
    formData.append('bank_name', bankName)
    formData.append('bank_branch', bankBranch)
    formData.append('bank_country', bankCountry)
    formData.append('account_name', accountName)
    formData.append('account_number', accountNumber)
    formData.append('routing_number', routingNumber)
    formData.append('swift_code', swiftCode)
    formData.append('currency', currency)

    try{
      const response = await fetch(`http://127.0.0.1:8000/api/bank-account/${details.id}/`, {
        method: 'PATCH',
        body: formData,
        headers:{
          Authorization: `Bearer ${authTokens.access}`
        }
      })


      if(response.ok){
        showAlert()
        setMessage('Bank details successfully edited')
        setIsSuccess(true)
        setLoader(false)
        setDisablebutton(false)

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
      setLoader(false)

    }  
  }


  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();


  useEffect(() => {
    const data = sessionStorage.getItem("IndividualData");
    if (data) {
      const parsedData = JSON.parse(data);
      setDetails(parsedData)
      setLabel(parsedData.label || '');
      setBankName(parsedData.bank_name || '');
      setBankBranch(parsedData.bank_branch || '');
      setBankCountry(parsedData.bank_country || '');
      setAccountName(parsedData.account_name || '');
      setAccountNumber(parsedData.account_number || '');
      setRoutingNumber(parsedData.routing_number || '');
      setSwiftCode(parsedData.swift_code || '');
      setCurrency(parsedData.currency || '');
    }
  }, []);

   
  
  

  
  return(
    <div>
      <div className="position-sticky1">
        <ClientDashFrame />
      </div>

      <div className="main-content" onClick={OnbodyClick}>
        <div className="container-xl pb-5 mb-5">
         {loader &&
            <ProcessingSpiner text={processingText}/>
          }


          <div>
            <FloatingAlert
              message={messages}
              isVisible={alertVisible}
              onClose={() => setAlertVisible(false)}
              successs={isSuccess}
            />
          </div>

          {!loader && 
            <section className='py-4 row justify-content-center'> 
              <div className="col-md-11 col-xl-10">
                <section className='pb-4'>
                <div className="d-sm-flex justify-content-between align-items-center height-100">
                  <div>
                    <div>
                      <p className='dashboard-header'>Edit Bank Account</p>
                    </div>
                  </div>
                  <div>
                </div>
                </div>
                </section>


                <div className="dashboard-boxes mt-4 p-4 border-radius-5px">
                  <div>
                    <form  onSubmit={handleSubmit(onSubmit)}>
                      <div className='row g-3'>
                        <div className="col-sm-6">
                          <label htmlFor="" className="p-2 ">Label</label>
                          <input type="text" className={`dashboard-input ${errors.label ? 'error-input' : ''}`} {...register('label', {required: true})}  value={label} onChange={(e) => setLabel(e.target.value)} placeholder="Lable" />
                          {errors.label && <span style={{color: 'red'}}>This Feild is required</span>} 
                        </div>

                        <div className="col-sm-6">
                          <label htmlFor="" className="p-2 ">Bank Name</label>
                          <input type="text" className={`dashboard-input ${errors.bankName ? 'error-input' : ''}`} {...register('bankName', {required: true})}  value={bankName} onChange={(e) => setBankName(e.target.value)} placeholder="Bank Name" />
                          {errors.bankName && <span style={{color: 'red'}}>This Feild is required</span>} 
                        </div>

                        <div className="col-sm-6">
                          <label htmlFor="" className="p-2 ">Bank Branch</label>
                          <input type="text" className={`dashboard-input ${errors.bankBranch ? 'error-input' : ''}`} {...register('bankBranch', {required: true})}  value={bankBranch} onChange={(e) => setBankBranch(e.target.value)} placeholder="Bank Branch" />
                          {errors.bankBranch && <span style={{color: 'red'}}>This Feild is required</span>} 
                        </div>

                        <div className="col-sm-6">
                          <label htmlFor="" className="p-2">Bank Country</label>
                          <select className={`${errors.bankCountry ? 'error-input' : ''} dashboard-input cursor-pointer`} {...register('bankCountry', {required: true})} type="text"   value={bankCountry} onChange={(e) => setBankCountry(e.target.value)}>
                            <option value="">Select a country</option>
                            <option value="australia">Australia</option>
                            <option value="brazil">Brazil</option>
                            <option value="canada">Canada</option>
                            <option value="china">China</option>
                            <option value="egypt">Egypt</option>
                            <option value="france">France</option>
                            <option value="germany">Germany</option>
                            <option value="india">India</option>
                            <option value="indonesia">Indonesia</option>
                            <option value="italy">Italy</option>
                            <option value="japan">Japan</option>
                            <option value="kenya">Kenya</option>
                            <option value="mexico">Mexico</option>
                            <option value="netherlands">Netherlands</option>
                            <option value="nigeria">Nigeria</option>
                            <option value="pakistan">Pakistan</option>
                            <option value="philippines">Philippines</option>
                            <option value="russia">Russia</option>
                            <option value="saudi-arabia">Saudi Arabia</option>
                            <option value="singapore">Singapore</option>
                            <option value="south-africa">South Africa</option>
                            <option value="south-korea">South Korea</option>
                            <option value="spain">Spain</option>
                            <option value="sweden">Sweden</option>
                            <option value="switzerland">Switzerland</option>
                            <option value="turkey">Turkey</option>
                            <option value="uae">United Arab Emirates</option>
                            <option value="uk">United Kingdom</option>
                            <option value="usa">United States</option>
                            <option value="vietnam">Vietnam</option>
                          </select>
                          {errors.bankCountry && <span style={{color: 'red'}}>This Feild is required</span>} 
                        </div>

                        <div className="col-sm-6">
                          <label htmlFor="" className="p-2 ">Account Owner</label>
                          <input type="text" className={`dashboard-input ${errors.accountName ? 'error-input' : ''}`} {...register('accountName', {required: true})}  value={accountName} onChange={(e) => setAccountName(e.target.value)} placeholder="Account Owner" />
                          {errors.accountName && <span style={{color: 'red'}}>This Feild is required</span>} 
                        </div>

                        <div className="col-sm-6">
                          <label htmlFor="" className="p-2 ">Account Number</label>
                          <input type="text" className={`dashboard-input ${errors.setAccountNumber ? 'error-input' : ''}`} {...register('setAccountNumber', {required: true})}  value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} placeholder="Account Number" />
                          {errors.accountNumber && <span style={{color: 'red'}}>This Feild is required</span>} 
                        </div>

                        <div className="col-sm-6">
                          <label htmlFor="" className="p-2 ">Routing Number</label>
                          <input type="text" className={`dashboard-input ${errors.routingNumber ? 'error-input' : ''}`} {...register('routingNumber', {required: true})}  value={routingNumber} onChange={(e) => setRoutingNumber(e.target.value)} placeholder="Routing Number" />
                          {errors.routingNumber && <span style={{color: 'red'}}>This Feild is required</span>} 
                        </div>

                        <div className="col-sm-6">
                          <label htmlFor="" className="p-2 ">Swift Code / BIC</label>
                          <input type="text" className={`dashboard-input ${errors.swiftCode ? 'error-input' : ''}`} {...register('swiftCode', {required: true})}  value={swiftCode} onChange={(e) => setSwiftCode(e.target.value)} placeholder="Swift Code / BIC" />
                          {errors.swiftCode && <span style={{color: 'red'}}>This Feild is required</span>} 
                        </div>

                        


                        <div className="col-sm-6">
                          <label htmlFor="" className="p-2">Currency</label>
                          <select className={`${errors.currency ? 'error-input' : ''} dashboard-input cursor-pointer`} {...register('currency', {required: true})} type="text"   value={currency} onChange={(e) => setCurrency(e.target.value)}>
                            <option value="">Select Currency</option>
                            <option value="united states dollar">United States Dollar</option>
                            <option value="euro">Euro</option>
                            <option value="british pound">British Pound</option>
                            <option value="japanese yen">Japanese Yen</option>
                            <option value="canadian dollar">Canadian Dollar</option>
                            <option value="australian dollar">Australian Dollar</option>
                            <option value="swiss franc">Swiss Franc</option>
                            <option value="chinese yuan">Chinese Yuan</option>
                            <option value="swedish krona">Swedish Krona</option>
                            <option value="new zealand dollar">New Zealand Dollar</option>
                            <option value="mexican peso">Mexican Peso</option>
                            <option value="singapore dollar">Singapore Dollar</option>
                            <option value="hong kong dollar">Hong Kong Dollar</option>
                            <option value="norwegian krone">Norwegian Krone</option>
                            <option value="south korean won">South Korean Won</option>
                            <option value="russian ruble">Russian Ruble</option>
                            <option value="indian rupee">Indian Rupee</option>
                            <option value="brazilian real">Brazilian Real</option>
                            <option value="south african rand">South African Rand</option>
                            <option value="turkish lira">Turkish Lira</option>
                          </select>
                          {errors.currency && <span style={{color: 'red'}}>This Feild is required</span>} 
                        </div>

                        <div className="col-12 mt-5">
                            <div className="dashboard-boxes-2 border-radius-5px p-3">
                              <div className="d-flex">
                                <div className="pe-2">
                                  <i class="bi bi-check2-circle"></i>
                                </div>
                                <div className="pt-1">
                                  <p className='light-text sm-text-2'>You will be receiving your payment on this bank card.</p>
                                </div>
                              </div>

                              <div className="d-flex pt-2">
                                <div className="pe-2">
                                  <i class="bi bi-check2-circle"></i>
                                </div>
                                <div className="">
                                  <p className='light-text sm-text-2'>Please ensure that you have provided the correct bank card details.</p>
                                </div>
                              </div>

                              <div className="d-flex pt-2">
                                <div className="pe-2">
                                  <i class="bi bi-check2-circle"></i>
                                </div>
                                <div className="">
                                  <p className='light-text sm-text-2'>Funds will not be credited to  this account if the details are wrong.</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        
                        <div className='col-12 pt-4'>
                          <div className="d-flex height-100 align-items-center">
                            <div className='pe-4'>

                              <button className="dashboard-btn py-2 px-4" type="submit" disabled={disablebutton}>Edit Bank Account</button> 
                            </div>
                          </div>
                          
                        </div>
                      </div>
                    </form>
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