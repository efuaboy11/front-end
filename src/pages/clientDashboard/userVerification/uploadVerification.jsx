import '../../../css/dashboardCss/dashboard.css'
import AuthContext from "../../../context/AuthContext";
import { AdminDashFrame } from '../../../component/adminDashFrame';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import pic from '../../../img/Spin.gif'
import { DashboardFooter } from '../../../component/dashbaordFooter';
import AllDataContext from '../../../context/Alldata';
import { useForm } from 'react-hook-form';
import { LoadingSpiner, ProcessingSpiner } from '../../../component/spin';
import FloatingAlert from '../../../component/alert';
import { ClientDashFrame } from '../../../component/ClientDashFrame';


export const ClientUploadUserVerification = () =>{
  const { authTokens, 
    messages,
    alertVisible,
    setAlertVisible,
    isSuccess,
    showAlert,
    setMessage,
    setIsSuccess,


    OnbodyClick,
    formatDate,
    formatCurrency,
    formatName,
    disablebutton, 
    setDisablebutton,
    ImageHandler,
    userProfile


  } = useContext(AuthContext)


  const navigate  = useNavigate()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [DOB, setDOB] = useState('')
  const [gender, setGender] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [profileImg, setProfileImg] = useState(null)
  const [ssn, setSSN] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [country, setCountry] = useState('')
  const [zipCode, setZipCode] = useState('')
  const [loader, setLoader] = useState(false)
  const [processingText, setProcessingText] = useState('Processing')

  const handleImgFile = (event) => {
    const status = ImageHandler(event)
    if(status){
      if (event.target.files.length > 0) {
        const file = event.target.files[0];
        setProfileImg(file); 
      } else {
        setProfileImg(null); 
      }
    }
  };


  const onSubmit = (data, e) =>{
    setDisablebutton(true)
    setLoader(true)
    if(isValid){
      UploadVerification(e)
      
    }else{
      setDisablebutton(false)
    }
  }



  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();

  const ClearInput = () =>{
    setFirstName('')
    setLastName('')
    setGender('')
    setDOB('')
    setPhoneNumber('')
    setSSN('')
    setAddress('')
    setCity('')
    setState('')
    setCountry('')
    

  }

  const UploadVerification = async(e) =>{
    e.preventDefault()
    setProcessingText('Uploading')
    setLoader(true)

    const formData = new FormData()
    // formData.append('user', userProfile?.user_details.id)
    formData.append('first_name', firstName)
    formData.append('last_name', lastName)
    formData.append('date_of_birth', DOB)
    formData.append('gender', gender)
    formData.append('phone_number', phoneNumber)
    formData.append('profile_photo', profileImg)
    formData.append('address', address)
    formData.append('city_town', city)
    formData.append('state', state)
    formData.append('country', country)
    formData.append('zip_code', zipCode)
    formData.append('ssn', ssn)

    try{
      const response = await fetch('http://127.0.0.1:8000/api/user/verification/', {
        method: 'POST',
        body: formData,
        headers:{
          Authorization: `Bearer ${authTokens.access}`
        }
      })


      if(response.ok){
        showAlert()
        setMessage('Details sucessfully uploded')
        setIsSuccess(true)
        setLoader(false)
        setDisablebutton(false)
        setFirstName('')
        setLastName('')
        setGender('')
        setDOB('')
        setPhoneNumber('')
        setSSN('')
        setAddress('')
        setCity('')
        setState('')
        setCountry('')
        navigate('/dashboard/user-verification/')

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



          <div className="row justify-content-center">
            {!loader &&
              <div className="col-md-11 col-xl-10">
                <div className="py-4">
                  <div className="text-center">
                    <Link to='/dashboard/user-verification/' className='light-link'><i class="bi bi-arrow-left pe-2"></i> Back</Link>
                    <p className="dashboard-header pb-3">Begin your User-Verification</p>
                    <p className="small-text-2 light-text">To comply with regulation you will have to fill in your personal identifiable information <br /> (PII) to prevent fraud causes.</p>
                  </div>
                </div>
                <div className="dashboard-boxes border-radius-5px">
                  <section>
                    <div className="py-4 ps-4  border-bottom1">
                      <div className="d-flex ps-2">
                        <div className='dashboard-number-form'>
                          <p className='light-text sm-text'>01</p>
                        </div>
                        <div>
                          <h5>Personal Information</h5>
                          <p className="light-text">Identity Information</p>
                        </div>
                      </div>
                    </div>

                    <div className=''>
                      <form  onSubmit={handleSubmit(onSubmit)}>
                        <div className='pt-4 pb-5 px-4  border-bottom1'>
                          <div className='row g-3 px-2'>
                            <div className="col-sm-6">
                              <label htmlFor="" className="p-2 ">First Name</label>
                              <input type="text" className={`dashboard-input ${errors.firstName ? 'error-input' : ''}`} {...register('firstName', {required: true})}  value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="John" />
                              {errors.firstName && <span style={{color: 'red'}}>This Feild is required</span>} 
                            </div>

                            <div className="col-sm-6">
                              <label htmlFor="" className="p-2 ">Last Name</label>
                              <input type="text" className={`dashboard-input ${errors.lastName ? 'error-input' : ''}`} {...register('lastName', {required: true})}  value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Doe" />
                              {errors.lastName && <span style={{color: 'red'}}>This Feild is required</span>} 
                            </div>

                            <div className="col-sm-6">
                              <label htmlFor="" className="p-2 ">Gender</label>
                              <select className={`${errors.gender ? 'error-input' : ''} dashboard-input cursor-pointer`} {...register('gender', {required: true})} type="text"   value={gender} onChange={(e) => setGender(e.target.value)}>
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="others">Others</option>

                              </select>
                              {errors.gender && <span style={{color: 'red'}}>This Feild is required</span>} 
                            </div>

                            <div className="col-sm-6">
                              <label htmlFor="" className="p-2 ">Date of Birth</label>
                              <input type="date" className={`dashboard-input ${errors.amount ? 'error-input' : ''}`} {...register('DOB',  {required: true})}  value={DOB} onChange={(e) => setDOB(e.target.value)}/>
                              {errors.DOB && <span style={{color: 'red'}}>This Feild is required</span>}
                            </div>

                            <div className="col-sm-6">
                              <label htmlFor="" className="p-2 ">Phone Number</label>
                              <input type="text" className={`dashboard-input ${errors.phoneNumber ? 'error-input' : ''}`} {...register('phoneNumber', {required: true})}  value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="e.g +123456789" />
                              {errors.lastName && <span style={{color: 'red'}}>This Feild is required</span>} 
                            </div>

                            <div className="col-sm-6">
                              <label htmlFor="" className="p-2 ">SSN/Valid ID Number</label>
                              <input type="text" className={`dashboard-input ${errors.ssn ? 'error-input' : ''}`} {...register('ssn', {required: true})}  value={ssn} onChange={(e) => setSSN(e.target.value)} placeholder="e.g 230032" />
                              {errors.ssn && <span style={{color: 'red'}}>This Feild is required</span>} 
                            </div>

                            <div className="col-sm-6">
                              <label htmlFor="" className="p-2 ">Profile Picture</label>
                              <input className={`dashboard-input ${errors.profileImg ? 'error-input' : ''} form-control-sm`} {...register('profileImg', {required: true})} type="file" onChange={handleImgFile}/>
                              {errors.profileImg && <span style={{color: 'red'}}>This Feild is required</span>} 
                            </div>
                          </div>
                        </div>

                        
                        <div className="py-4 ps-4  border-bottom1">
                          <div className="d-flex ps-2">
                            <div className='dashboard-number-form'>
                              <p className='light-text sm-text'>02</p>
                            </div>
                            <div>
                              <h5>Proof of Address</h5>
                              <p className="light-text">Confirm Residental Address</p>
                            </div>
                          </div>
                        </div>

                        <div className='pt-4 pb-5 px-4  border-bottom1'>
                          <div className='row g-3 px-2'>

                            <div className="col-sm-6">
                              <label htmlFor="" className="p-2 ">Residental Address</label>
                              <input type="text" className={`dashboard-input ${errors.address ? 'error-input' : ''}`} {...register('address', {required: true})}  value={address} onChange={(e) => setAddress(e.target.value)} placeholder="11102 green hills street" />
                              {errors.address && <span style={{color: 'red'}}>This Feild is required</span>} 
                            </div>

                            <div className="col-sm-6">
                              <label htmlFor="" className="p-2 ">City/Town</label>
                              <input type="text" className={`dashboard-input ${errors.city ? 'error-input' : ''}`} {...register('city', {required: true})}  value={city} onChange={(e) => setCity(e.target.value)} placeholder="Enter your city" />
                              {errors.city && <span style={{color: 'red'}}>This Feild is required</span>} 
                            </div>

                            <div className="col-sm-6">
                              <label htmlFor="" className="p-2 ">State/Province</label>
                              <input type="text" className={`dashboard-input ${errors.state ? 'error-input' : ''}`} {...register('state', {required: true})}  value={state} onChange={(e) => setState(e.target.value)} placeholder="Enter your State" />
                              {errors.city && <span style={{color: 'red'}}>This Feild is required</span>} 
                            </div>


                            <div className="col-sm-6">
                              <label htmlFor="" className="p-2 ">Country/Region</label>
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
                              <label htmlFor="" className="p-2 ">ZIP/Postal Code</label>
                              <input type="text" className={`dashboard-input ${errors.zipCode ? 'error-input' : ''}`} {...register('zipCode', {required: true})}  value={zipCode} onChange={(e) => setZipCode(e.target.value)} placeholder="e.g 230032" />
                              {errors.zipCode && <span style={{color: 'red'}}>This Feild is required</span>} 
                            </div>

                            <div className="col-12 mt-5">
                              <div className="dashboard-boxes-2 border-radius-5px p-3">
                                <div className="row">
                                  <div className="col-1">
                                    <i class="bi bi-check2-circle sm-text"></i>
                                  </div>
                                  <div className="col-10">
                                    <p>This information is use for Intermediate Verification only, and is kept private and confidential by AmaniLightEquity</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                        
                          </div>
                        </div>

                        <div className="py-4 ps-4">
                          <div className='pt-4'>
                            <div className="d-flex height-100 align-items-center">
                              <div className='pe-4'>

                                <button className="dashboard-btn py-2 px-4" type="submit" disabled={disablebutton}>Upload Verification</button> 
                              </div>
                              <p onClick={ClearInput} className='light-link cursor-pointer'>Cancel</p>
                            </div>
                            
                          </div>
                          
                        </div>
                        
                      </form>
                    </div>
                  </section>

                </div>
              
              </div>
            }
          </div>

        </div>
      </div>

      <div>
        <DashboardFooter />
      </div>


    </div>
  )
}