import '../../../css/dashboardCss/dashboard.css'
import AuthContext from "../../../context/AuthContext";
import { useContext, useEffect, useState } from 'react';
import { AdminDashFrame } from '../../../component/adminDashFrame';
import FloatingAlert from '../../../component/alert';
import { useForm } from 'react-hook-form';
import { LoadingSpiner } from '../../../component/spin';
import AllDataContext from '../../../context/Alldata';
import { DashboardFooter } from '../../../component/dashbaordFooter';
import { useNavigate } from 'react-router-dom';
import pic from '../../../img/Spin.gif'

export const UserLoginDetails = () =>{

  const [email, setEmail] = useState('')
  const [username, setUserName] = useState('')
  const [fullname, setFullName] = useState('')
  const [img, setImg] = useState(null)
  const [loader, setLoader] = useState(false)


  const navigate = useNavigate()

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
      editUserLoginDetails(e)
      
    }else{
      setDisablebutton(false)
    }
  }

  const handleImgFile = (event) => {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      setImg(file); 
    } else {
      setImg(null); 
    }
  };
   


  const UserDetails = async() =>{
    let response = await fetch('http://127.0.0.1:8000/api/users/details/', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens.access}`
      },
    })

    const data = await response.json()
    if(response.ok){
      setDetails(data[0])
      console.log(details)
    }



  }






  const editUserLoginDetails = async(e) =>{
    e.preventDefault()
    setLoader(true)

    const formData = new FormData()

    formData.append('email', email)
    formData.append('user_name', username)
    formData.append('full_name', fullname)
    if(img){
      formData.append('profile_photo', img)
    }



    try{
      const response = await fetch(`http://127.0.0.1:8000/api/users/${details.id}/`, {
        method: 'PATCH',
        body: formData,
        headers:{
          Authorization: `Bearer ${authTokens.access}`
        }
      })


      if(response.ok){
        showAlert()
        setMessage('Details successfully edited')
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
    UserDetails()
  }, []);


  useEffect(() => {
    // This useEffect will run whenever `details` changes
    if (details) {
      setEmail(details.email || '');
      setFullName(details.full_name || '');
      setUserName(details.user_name || '');
    }
  }, [details]);


  console.log(email)

   
  
  

  
  return(
    <div>
      <div className="position-sticky1">
        <AdminDashFrame />
      </div>

      <div className="main-content" onClick={OnbodyClick}>
        <div className="container-xl pb-5 mb-5">

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
              <section className='pb-4'>
              <div className="d-sm-flex justify-content-between align-items-center height-100">
                <div>
                  <div>
                    <p className='dashboard-header'>User Login Details</p>
                  </div>
                </div>
                <div>
              </div>
              </div>
              </section>

              <section>
                <div className="dashboard-boxes mt-4 p-4 border-radius-5px">
                  <div>
                    <form  onSubmit={handleSubmit(onSubmit)}>
                      <div className='row g-3'>
                        <div className="col-12">
                          <label htmlFor="" className="p-2 ">Email</label>
                          <input type="text" className={`dashboard-input ${errors.email ? 'error-input' : ''}`} {...register('email', {required: true})}  value={email} onChange={(e) => setEmail(e.target.value)} placeholder="e.g johnDoe@gail.com" />
                          {errors.email && <span style={{color: 'red'}}>This Feild is required</span>} 
                        </div>
                        
                        <div className="col-12">
                          <label htmlFor="" className="p-2 ">Full Name</label>
                          <input type="text" className={`dashboard-input ${errors.fullname ? 'error-input' : ''}`} {...register('fullname', {required: true})}  value={fullname} onChange={(e) => setFullName(e.target.value)} placeholder="e.g John Doe" />
                          {errors.fullname && <span style={{color: 'red'}}>This Feild is required</span>} 
                        </div>

                        <div className="col-12">
                          <label htmlFor="" className="p-2 ">Username</label>
                          <input type="text" className={`dashboard-input ${errors.username ? 'error-input' : ''}`} {...register('username', {required: true})}  value={username} onChange={(e) => setUserName(e.target.value)} placeholder="e.g johnDoe234" />
                          {errors.username && <span style={{color: 'red'}}>This Feild is required</span>} 
                        </div>

                        <div className="col-sm-6">
                          <label htmlFor="" className="p-2 ">Profile Img <span className='light-text'>(Optional)</span></label>
                          <input className={`dashboard-input ${errors.img ? 'error-input' : ''} form-control-sm`} {...register('img')} type="file" onChange={handleImgFile}/>
                        </div>

                        
                        <div className='col-12 pt-4'>
                          <div className="d-flex height-100 align-items-center">
                            <div className='pe-4'>

                              <button className="dashboard-btn py-2 px-4" type="submit" disabled={disablebutton}>Edit Details</button> 
                            </div>
                          </div>
                          
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </section>




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
