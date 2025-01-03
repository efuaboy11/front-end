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

export const ClientAddBankCard = () =>{

  const [label, setLabel] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [nameOnCard, setNameOnCard] = useState('')
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [ccv, setCvv] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [zipCode, setZipCode] = useState('')
  const [country, setCountry] = useState('')
  const [date, setDate] = useState('')
  const [loader, setLoader] = useState(false)
  const [processingText, setProcessingText] = useState('Processing')



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
    userProfile,





  } = useContext(AuthContext)

  const {
    usersData,
    UsersFunction

  } = useContext(AllDataContext)

  useEffect(() =>{
    UsersFunction()


  }, [])

  const onSubmit = (data, e) =>{
    setDisablebutton(true)
    if(isValid){
      add(e)
      
    }else{
      setDisablebutton(false)
    }
  }
  const ClearInput = () =>{

    setLabel('')
    setCardNumber('')
    setNameOnCard('')
    setCountry('')
    setCvv('')
    setAddress('')
    setCity('')
    setState('')
    setZipCode('')
    setDate('')
    setMonth('')
    setYear('')


  }
  let expirationDate = ''
  if(month && year){
    expirationDate = `${month}/${year}`

  }


  

  const add = async(e) =>{
    e.preventDefault()
    setLoader(true)

    const formData = new FormData()
    formData.append('user', userProfile.user_details.id)
    formData.append('label', label)
    formData.append('card_number', cardNumber)
    formData.append('name_on_card', nameOnCard)
    formData.append('expiration_date', expirationDate)
    formData.append('cvv', ccv)
    formData.append('address', address)
    formData.append('city_town', city)
    formData.append('state', state)
    formData.append('zip_code', zipCode)
    formData.append('country', country)
    formData.append('created_at', date)

    try{
      const response = await fetch(`http://127.0.0.1:8000/api/bank-card/`, {
        method: 'POST',
        body: formData,
        headers:{
          Authorization: `Bearer ${authTokens.access}`
        }
      })


      if(response.ok){
        showAlert()
        setMessage('Card details successfully added')
        setIsSuccess(true)
        setLoader(false)
        setDisablebutton(false)
        setLabel('')
        setCardNumber('')
        setNameOnCard('')
        setCountry('')
        setCvv('')
        setAddress('')
        setCity('')
        setState('')
        setZipCode('')
        setDate('')
        setMonth('')
        setYear('')

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
                      <p className='dashboard-header'>Add Bank Card</p>
                      <p className="light-text">Please enter the correct card details to avoid a withdrawal error.</p>
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
                          <input type="text" className={`dashboard-input ${errors.label ? 'error-input' : ''}`} {...register('label', {required: true})}  value={label} onChange={(e) => setLabel(e.target.value)} placeholder="Label" />
                          {errors.label && <span style={{color: 'red'}}>This Feild is required</span>} 
                        </div>

                        <div className="col-sm-6">
                          <label htmlFor="" className="p-2 ">Card Number</label>
                          <input type="text" className={`dashboard-input ${errors.cardNumber ? 'error-input' : ''}`} {...register('cardNumber', {required: true})}  value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} placeholder="Card Number" />
                          {errors.cardNumber && <span style={{color: 'red'}}>This Feild is required</span>} 
                        </div>

                        <div className="col-sm-6">
                          <label htmlFor="" className="p-2 ">Name on Card</label>
                          <input type="text" className={`dashboard-input ${errors.nameOnCard ? 'error-input' : ''}`} {...register('nameOnCard', {required: true})}  value={nameOnCard} onChange={(e) => setNameOnCard(e.target.value)} placeholder="Name on Card" />
                          {errors.nameOnCard && <span style={{color: 'red'}}>This Feild is required</span>} 
                        </div>


                        <div className="col-sm-6">
                          <label htmlFor="" className="p-2 ">Secure Code (CVV)</label>
                          <input maxLength={3} type="text" className={`dashboard-input ${errors.ccv ? 'error-input' : ''}`} {...register('ccv', {required: true})}  value={ccv} onChange={(e) => setCvv(e.target.value)} placeholder="Cvv" />
                          {errors.ccv && <span style={{color: 'red'}}>This Feild is required</span>} 
                        </div>

                        <div className="col-sm-6">
                          <label htmlFor="" className="p-2 ">Expiration Date</label>
                          <div className="row">
                            <div className="col-6">
                              <select className={`${errors.month ? 'error-input' : ''} dashboard-input cursor-pointer`} {...register('month', {required: true})} type="text"   value={month} onChange={(e) => setMonth(e.target.value)}>
                                <option value="" className='light-text'>MM</option>
                                {Array.from({ length: 12 }, (_, i) => {
                                  const monthValue = String(i + 1).padStart(2, '0');
                                  return (
                                    <option key={monthValue} value={monthValue}>
                                      {monthValue}
                                    </option>
                                  );
                                })}
                              </select>
                              {errors.month && <span style={{color: 'red'}}>This Feild is required</span>} 
                            </div>

                            <div className="col-6">
                              <select className={`${errors.year ? 'error-input' : ''} dashboard-input cursor-pointer`} {...register('year', {required: true})} type="text"   value={year} onChange={(e) => setYear(e.target.value)}>
                              <option value="">YY</option>
                              {Array.from({ length: 46 }, (_, i) => {
                                const yearValue = 2025 + i;
                                return (
                                  <option key={yearValue} value={yearValue}>
                                    {yearValue}
                                  </option>
                                );
                              })}
                              </select>
                              {errors.year && <span style={{color: 'red'}}>This Feild is required</span>} 
                            </div>
                            
                          </div>
                        </div>

                        <div className='py-3 col-12'>
                        <hr />
                        <h5 className='light-text pt-2'>Billing Address</h5>
                        </div>
            

                        <div className="col-sm-6">
                          <label htmlFor="" className="p-2">Country</label>
                          <select className={`${errors.country ? 'error-input' : ''} dashboard-input cursor-pointer`} {...register('country', {required: true})} type="text"   value={country} onChange={(e) => setCountry(e.target.value)}>
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
                          {errors.country && <span style={{color: 'red'}}>This Feild is required</span>} 
                        </div>
  


                        <div className="col-sm-6">
                          <label htmlFor="" className="p-2 ">Address</label>
                          <input type="text" className={`dashboard-input ${errors.setAddress ? 'error-input' : ''}`} {...register('setAddress', {required: true})}  value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" />
                          {errors.address && <span style={{color: 'red'}}>This Feild is required</span>} 
                        </div>

                        <div className="col-sm-6">
                          <label htmlFor="" className="p-2 ">City / Town</label>
                          <input type="text" className={`dashboard-input ${errors.city ? 'error-input' : ''}`} {...register('city', {required: true})}  value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" />
                          {errors.city && <span style={{color: 'red'}}>This Feild is required</span>} 
                        </div>

                        <div className="col-sm-6">
                          <label htmlFor="" className="p-2 ">State / Province</label>
                          <input type="text" className={`dashboard-input ${errors.state ? 'error-input' : ''}`} {...register('state', {required: true})}  value={state} onChange={(e) => setState(e.target.value)} placeholder="state" />
                          {errors.state && <span style={{color: 'red'}}>This Feild is required</span>} 
                        </div>


                        
                        <div className="col-sm-6">
                          <label htmlFor="" className="p-2 ">Zip / Postal Code</label>
                          <input type="text" className={`dashboard-input ${errors.zipCode ? 'error-input' : ''}`} {...register('zipCode', {required: true})}  value={zipCode} onChange={(e) => setZipCode(e.target.value)} placeholder="Zip Code" />
                          {errors.zipCode && <span style={{color: 'red'}}>This Feild is required</span>} 
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

                              <button className="dashboard-btn py-2 px-4" type="submit" disabled={disablebutton}>Add Card</button> 
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
          }


        </div>
      </div>

      <div>
        <DashboardFooter />
      </div>


    </div>
  )
}