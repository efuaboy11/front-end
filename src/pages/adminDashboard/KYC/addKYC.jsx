import '../../../css/dashboardCss/dashboard.css'
import AuthContext from "../../../context/AuthContext";
import { useContext, useEffect, useState } from 'react';
import { AdminDashFrame } from '../../../component/adminDashFrame';
import FloatingAlert from '../../../component/alert';
import { useForm } from 'react-hook-form';
import { LoadingSpiner } from '../../../component/spin';
import AllDataContext from '../../../context/Alldata';

export const AddKYC = () =>{

  const [user, setUser] = useState('')
  const [documentType, setDocumentType] = useState('')
  const [country, setCountry] = useState('')
  const [status, setStatus] = useState('')
  const [selfieImg, setselfieImg] = useState("")
  const [frontimg, setFrontImg] = useState("")
  const [backimg, setBackImg] = useState("")
  const [loader, setLoader] = useState(false)


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


  const {
    usersData,
    UsersFunction,

  } = useContext(AllDataContext)

  useEffect(() =>{
    UsersFunction()
  }, [])
  
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
    setLoader(true)

    const formData = new FormData()

    formData.append('user', user)
    formData.append('document_type', documentType)
    formData.append('country', country)
    formData.append('proof_selfie', selfieImg)
    formData.append('font_side', frontimg)
    formData.append('back_side', backimg)
    formData.append('status', status)

    try{
      const response = await fetch('http://127.0.0.1:8000/api/user/kyc-verification/admin/', {
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
        setUser('')
        setDocumentType('')
        setCountry('')
        setStatus('')

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

  const ClearInput = () =>{
    setUser('')
    setDocumentType('')
    setCountry('')
    setStatus('')

  }

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();


  const handleSelfieImgFile = (event) => {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      setselfieImg(file); 
    } else {
      setselfieImg(null); 
    }
  };

  const handleFrontImgFile = (event) => {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      setFrontImg(file); 
    } else {
      setFrontImg(null); 
    }
  };

  const handleBackImgFile = (event) => {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      setBackImg(file); 
    } else {
      setBackImg(null); 
    }
  };
   
  
  

  
  return(
    <div>
      <div className="position-sticky1">
        <AdminDashFrame />
      </div>

      <div className="main-content" onClick={OnbodyClick}>
        <div className="container-xl">

          {loader &&
            < LoadingSpiner/>
          } 
          <div>
            <FloatingAlert
              message={messages}
              isVisible={alertVisible}
              onClose={() => setAlertVisible(false)}
              successs={isSuccess}
            />
          </div>


          <section className='py-4 row justify-content-center'> 
            <div className="col-md-11 col-xl-10">
              <div>
                <div>
                  <p className='dashboard-header'>Add New KYCs</p>
                </div>
              </div>


              <div className="dashboard-boxes mt-4 p-4 border-radius-5px">
                <div>
                  <form  onSubmit={handleSubmit(onSubmit)}>
                    <div className='row g-3'>
                      <div className="col-sm-6">
                        <label htmlFor="" className="p-2">Add to Account</label>
                        <select className={`${errors.user ? 'error-input' : ''} dashboard-input`} {...register('user', {required: true})} type="text"   value={user} onChange={(e) => setUser(e.target.value)}>
                          <option></option>
                          {usersData.map((data) =>(

                            <option value={data.id} key={data.id}>{data.full_name}</option>
                          ))}
                        </select>
                        {errors.user && <span style={{color: 'red'}}>This Feild is required</span>} 
                      </div>

                      <div className="col-sm-6">
                        <label htmlFor="" className="p-2 ">Document Type</label>
                        <input type="text" className={`dashboard-input ${errors.documentType ? 'error-input' : ''}`} {...register('documentType', {required: true})}  value={documentType} onChange={(e) => setDocumentType(e.target.value)} placeholder="e.g Driver License" />
                        {errors.documentType && <span style={{color: 'red'}}>This Feild is required</span>} 
                      </div>

                      <div className="col-sm-6">
                        <label htmlFor="" className="p-2">Country of Issuance</label>
                        <select className={`${errors.country ? 'error-input' : ''} dashboard-input`} {...register('country', {required: true})} type="text"   value={country} onChange={(e) => setCountry(e.target.value)}>
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
                        <label htmlFor="" className="p-2 ">Selfie with ID</label>
                        <input className={`dashboard-input ${errors.selfieImg ? 'error-input' : ''} form-control-sm`} {...register('selfieImg', {required: true})} type="file" onChange={handleSelfieImgFile}/>
                        {errors.selfieImg && <span style={{color: 'red'}}>This Feild is required</span>} 
                      </div>

                      <div className="col-sm-6">
                        <label htmlFor="" className="p-2 ">Front Image ID</label>
                        <input className={`dashboard-input ${errors.frontimg ? 'error-input' : ''} form-control-sm`} {...register('frontimg', {required: true})} type="file" onChange={handleFrontImgFile}/>
                        {errors.frontimg && <span style={{color: 'red'}}>This Feild is required</span>} 
                      </div>

                      <div className="col-sm-6">
                        <label htmlFor="" className="p-2 ">Back Image ID</label>
                        <input className={`dashboard-input ${errors.backimg ? 'error-input' : ''} form-control-sm`} {...register('backimg', {required: true})} type="file" onChange={handleBackImgFile}/>
                        {errors.backimg && <span style={{color: 'red'}}>This Feild is required</span>} 
                      </div>

                      <div className="col-sm-6">
                        <label htmlFor="" className="p-2">Status</label>
                        <select className={`${errors.status ? 'error-input' : ''} dashboard-input`} {...register('status', {required: true})} type="text"   value={status} onChange={(e) => setStatus(e.target.value)}>
                          <option></option>
                          <option value='pending'>Pending</option>
                          <option value='declined'>Declined</option>
                          <option value='successful'>Successful</option>
                        </select>
                        {errors.status && <span style={{color: 'red'}}>This Feild is required</span>} 
                      </div>
                      
                      <div className='col-12 pt-4'>
                        <div className="d-flex height-100 align-items-center">
                          <div className='pe-4'>

                            <button className="dashboard-btn py-2 px-4" type="submit" disabled={disablebutton}>Add KYCs</button> 
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


        </div>
      </div>


    </div>
  )
}