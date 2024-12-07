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

export const EditPaymentMethod = () =>{

  const [name, setName] = useState('')
  const [walletAddress, setWalletAddress] = useState('')
  const [img, setImg] = useState(null)
  const [loader, setLoader] = useState(false)
  const [deleteModal, setDeletedModal] = useState(false)
  const [deletebtnLoader, setDeletebtnLoader] = useState(false)


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



  const hideDeleteModal = () => {
    setDeletedModal(false)

  }

  const showDeleteModal = (id) => {
    setDeletedModal(true)
  }
  
  const onSubmit = (data, e) =>{
    setDisablebutton(true)
    if(isValid){
      editPaymentMethod(e)
      
    }else{
      setDisablebutton(false)
    }
  }

  const editPaymentMethod = async(e) =>{
    e.preventDefault()
    setLoader(true)

    const formData = new FormData()

    formData.append('name', name)
    formData.append('wallet_address', walletAddress)

    try{
      const response = await fetch(`http://127.0.0.1:8000/api/payment-method/${details.id}/`, {
        method: 'PATCH',
        body: formData,
        headers:{
          Authorization: `Bearer ${authTokens.access}`
        }
      })


      if(response.ok){
        showAlert()
        setMessage('Payment method successfully edited')
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

  const deleteItem = async (id) => {
    
    setDisablebutton(true)
    setDeletebtnLoader(true)

    try{
      let response = await fetch(`http://127.0.0.1:8000/api/payment-method/${details.id}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${authTokens.access}`
        }
      })

      if (response.ok) {
        setDeletebtnLoader(false)
        setDisablebutton(false)
        navigate('/admin/payment-method/')
        setDeletedModal(false)
        showAlert()
        setIsSuccess(true)
        setMessage('Payment Method deleted')
      } else {
        const errorData = await response.json()
        const errorMessages = Object.values(errorData)
        .flat()
        .join(', ');
        setMessage(errorMessages)
        setDeletebtnLoader(false)
        setDisablebutton(false)
        showAlert()
        setIsSuccess(false)
        setIsSuccess(true)
        setDisablebutton(false)
      }

    }catch{
      showAlert()
      setMessage('An unexpected error occurred.');
      setDisablebutton(false)
      setIsSuccess(false)
      setDeletebtnLoader(false)
      setLoader(false)

    }
  }


  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();


  useEffect(() => {
    const data = localStorage.getItem("IndividualData");
    if (data) {
      const parsedData = JSON.parse(data);
      setDetails(parsedData)
      setName(parsedData.name || '');
      setWalletAddress(parsedData.wallet_address || '');
    }
  }, []);

   
  
  

  
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

          {deleteModal &&
            <section className="overlay-background">
              <div className="dashboard-modal-container">
                <div className="dashboard-delete-modal-content">
                  <h5>Delete Item?</h5>
                  <hr />
                  <p>This will delete the Item.</p>
                  <div className="d-flex justify-content-between py-3">
                    <div></div>
                    <div className='d-flex align-items-center height-100 pe-2'>
                      <button  className="dashboard-submit-btn  dashboard-btn px-4 py-2 me-3" disabled={disablebutton} onClick={deleteItem}>    
                        <span class={`${deletebtnLoader ? 'dashboard-submit-spinner': ''}`}></span>
                        <span class={`${deletebtnLoader ? 'dashboard-submit-btn-visiblity': ''}`}>Delete</span>
                      </button> 
                      <p className="light-link cursor-pointer" onClick={hideDeleteModal}>Cancel</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
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
                    <p className='dashboard-header'>Edit Payment Method</p>
                  </div>
                </div>
                <div>

                <div className='pt-3'>
                  <div className="d-flex">
                    <div className=''>
                      <button onClick={showDeleteModal} className='investment-kYC-btn'>
                        <div className="d-flex">
                          <i class="bi bi-trash  pe-2"></i>
                          <p className=''>Delete Payment Method</p>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              </div>
              </section>

              <div className="row g-4">
                <div className="col-md-8">
                  <div className="dashboard-boxes mt-4 p-4 border-radius-5px">
                    <div>
                      <form  onSubmit={handleSubmit(onSubmit)}>
                        <div className='row g-3'>
                          <div className="col-12">
                            <label htmlFor="" className="p-2 ">Name</label>
                            <input type="text" className={`dashboard-input ${errors.name ? 'error-input' : ''}`} {...register('name', {required: true})}  value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g Etherum" />
                            {errors.name && <span style={{color: 'red'}}>This Feild is required</span>} 
                          </div>

                          <div className="col-12">
                            <label htmlFor="" className="p-2 ">Wallet Address</label>
                            <input type="text" className={`dashboard-input ${errors.walletAddress ? 'error-input' : ''}`} {...register('walletAddress', {required: true})}  value={walletAddress} onChange={(e) => setWalletAddress(e.target.value)} placeholder="e.g 1DC9GBTv9JNb8K58EdFsg1PAeYRCsVi7Rq" />
                            {errors.walletAddress && <span style={{color: 'red'}}>This Feild is required</span>} 
                          </div>

                          
                          <div className='col-12 pt-4'>
                            <div className="d-flex height-100 align-items-center">
                              <div className='pe-4'>

                                <button className="dashboard-btn py-2 px-4" type="submit" disabled={disablebutton}>Edit Payment Method</button> 
                              </div>
                            </div>
                            
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                  {details != null ? (
                    <div className="col-md-4">
                      <div className='pt-4'>
                        <img width='100%' src={details.qr_code} alt="" />
                      </div>

                    </div>
                  ) : (
                    <div className='d-flex justify-content-center py-5'>
                      <img src={pic} alt="" width='50px'/>

                    </div>

                  )}

              </div>



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