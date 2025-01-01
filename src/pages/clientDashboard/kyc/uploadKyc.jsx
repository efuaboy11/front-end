import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faBan, faChartLine, faCircleDollarToSlot, faCreditCard,  faHandHoldingDollar, faMailBulk, faMoneyBillTransfer} from "@fortawesome/free-solid-svg-icons"
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect} from "react";
import AuthContext from "../../../context/AuthContext";
import '../../../css/dashboardCss/dashboard.css'
import '../../../css/dashboardCss/adminDahboardCss/adminHome.css'
import { AdminDashFrame } from "../../../component/adminDashFrame";
import '../../../css/style.css'
import spin from '../../../img/Spin.gif'
import AllDataContext from '../../../context/Alldata';
import { DashboardFooter } from '../../../component/dashbaordFooter';
import FloatingAlert from '../../../component/alert';
import { ClientDashFrame } from '../../../component/ClientDashFrame';
import { useForm } from 'react-hook-form';
import { ProcessingSpiner } from '../../../component/spin';


export const ClientUploadKYC = () =>{
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
    ImageHandler,
    errorMessages, 


  } = useContext(AuthContext)


  const navigate  = useNavigate()
  const [documentType, setDocumentType] = useState('')
  const [country, setCountry] = useState('')
  const [status, setStatus] = useState('')
  const [selfieImg, setselfieImg] = useState("")
  const [frontimg, setFrontImg] = useState("")
  const [backimg, setBackImg] = useState("")
  const [loader, setLoader] = useState(false)
  const [processingText, setProcessingText] = useState('Processing')

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();



  const handleSelfieImgFile = (event) => {
    const status = ImageHandler(event)
    if(status){
      if (event.target.files.length > 0) {
        const file = event.target.files[0];
        setselfieImg(file); 
      } else {
        setselfieImg(null); 
      }
    }
  };

  const handleFrontImgFile = (event) => {
    const status = ImageHandler(event)
    if(status){
      if (event.target.files.length > 0) {
        const file = event.target.files[0];
        setFrontImg(file); 
      } else {
        setFrontImg(null); 
      }
    }

  };

  const handleBackImgFile = (event) => {
    const status = ImageHandler(event)
    if(status){
      if (event.target.files.length > 0) {
        const file = event.target.files[0];
        setBackImg(file); 
      } else {
        setBackImg(null); 
      }
    }
  };


  const onSubmit = (data, e) =>{
    setDisablebutton(true)
    if(isValid){
      addKYC(e)     
    }else{
      setDisablebutton(false)
    }
  }
  const addKYC = async(e) =>{
    e.preventDefault()
    setProcessingText('Uploading')
    setLoader(true)

    const formData = new FormData()
    formData.append('document_type', documentType)
    formData.append('country', country)
    formData.append('proof_selfie', selfieImg)
    formData.append('font_side', frontimg)
    formData.append('back_side', backimg)
    formData.append('status', status)

    try{
      const response = await fetch('http://127.0.0.1:8000/api/user/kyc-verification/', {
        method: 'POST',
        body: formData,
        headers:{
          Authorization: `Bearer ${authTokens.access}`
        }
      })


      if(response.ok){
        showAlert()
        setMessage('KYCs Sucessfully added')
        setIsSuccess(true)
        setLoader(false)
        setDisablebutton(false)
        setDocumentType('')
        setCountry('')
        setStatus('')
        navigate('/dashboard/kyc-aml/')

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
          <div className="container-lg">
            {!loader && 
              <div className="row justify-content-center">
                <div className="col-11 col-sm-10 col-md-8 col-xxl-7 pt-4">
                  <div className='text-center pb-3'>
                    <Link to='/dashboard/kyc-aml/' className='light-link'><i class="bi bi-arrow-left pe-2"></i> Back</Link>
                    <p className="dashboard-header pb-3">Begin your ID-Verification</p>
                    <p className="small-text-2 light-text">To comply with regulation you will have to go through indentity verification (KYC/AML) to prevent fraud causes.</p>
                  </div>
                  <div className="dashboard-boxes mt-4 p-4 border-radius-5px">
                    <div>
                      <form  onSubmit={handleSubmit(onSubmit)}>
                        <div className='row g-3'>
                          <div className="col-12">
                            <label htmlFor="" className="p-2">Country of Issuance</label>
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

                          <div className="col-12">
                            <label htmlFor="" className="p-2 ">Document Type</label>
                            <select  className={`dashboard-input ${errors.documentType ? 'error-input' : ''} cursor-pointer`} {...register('documentType', {required: true})}  value={documentType} onChange={(e) => setDocumentType(e.target.value)}>
                              <option value=''>Select document type </option>
                                <option value='goverment-issued ID card'>Government-Issued ID Card</option>
                                <option value='drivers license'>Driver's License</option>
                                <option value='passport'>Passport</option>
                              </select>
                            <p className='italic-text light-text'>Only the following documents listed in the dropdown will be accepted, all other documents will be rejected.</p>
                            {errors.documentType && <span style={{color: 'red'}}>{errorMessages}</span>} 
                          </div>

                          <div className="col-12">
                            <label htmlFor="" className="p-2 ">Upload Front of ID</label>
                            <input className={`dashboard-input ${errors.frontimg ? 'error-input' : ''} form-control-sm`} {...register('frontimg', {required: true})} type="file" onChange={handleFrontImgFile}/>
                            <p className='italic-text light-text'>File size must be between 10KB and 5120KB in jpg/jpeg/png format.</p>
                            {errors.frontimg && <span style={{color: 'red'}}>{errorMessages}</span>} 
                          </div>

                          <div className="col-12">
                            <label htmlFor="" className="p-2 ">Upload Back of ID</label>
                            <input className={`dashboard-input ${errors.backimg ? 'error-input' : ''} form-control-sm`} {...register('backimg', {required: true})} type="file" onChange={handleBackImgFile}/>
                            <p className='italic-text light-text'>File size must be between 10KB and 5120KB in jpg/jpeg/png format.</p>
                            {errors.backimg && <span style={{color: 'red'}}>{errorMessages}</span>} 
                          </div>

                          <div className="col-12">
                            <label htmlFor="" className="p-2 ">Upload Selfie with ID</label>
                            <input className={`dashboard-input ${errors.selfieImg ? 'error-input' : ''} form-control-sm`} {...register('selfieImg', {required: true})} type="file" onChange={handleSelfieImgFile}/>
                            <p className='italic-text light-text'>File size must be between 10KB and 5120KB in jpg/jpeg/png format.</p>
                            {errors.selfieImg && <span style={{color: 'red'}}>{errorMessages}</span>} 
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
                          
                          <div className='col-12 pt-4'>
                            <div className="d-flex height-100 align-items-center">
                              <div className='pe-4'>

                                <button className="dashboard-btn py-2 px-4" type="submit" disabled={disablebutton}>Upload <span className='d-none d-sm-inline-block'>Document </span></button> 
                              </div>
                              <Link to='/dashboard/kyc-aml/' className='Link light-link cursor-pointer'>Cancel</Link>
                            </div>
                            
                          </div>
                        </div>
                      </form>
                    </div>

                  </div>

                </div>
              </div>
            }
          </div>
        </div>

        <div className='py-5'>
          <DashboardFooter />
        </div>



    </div>
      
  )
}