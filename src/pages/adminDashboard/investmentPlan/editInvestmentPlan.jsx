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

export const EditInvestmentPlan = () =>{

  const [planName, setPlanName] = useState('')
  const [minAmount, setMinAmount] = useState('')
  const [maxAmount, setMaxAmount] = useState('')
  const [percentage, setPercentage] = useState('')
  const [duration, setDuration] = useState('')
  const [timeRate, setTimeRate] = useState('')
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
      editPlan(e)
      
    }else{
      setDisablebutton(false)
    }
  }

  const editPlan = async(e) =>{
    e.preventDefault()
    setLoader(true)

    const formData = new FormData()

    formData.append('plan_name', planName)
    formData.append('min_amount', minAmount)
    formData.append('max_amount', maxAmount)
    formData.append('percentage_return', percentage)
    formData.append('duration', duration)
    formData.append('time_rate', timeRate)

    try{
      const response = await fetch(`http://127.0.0.1:8000/api/investment-plan/${details.id}/`, {
        method: 'PATCH',
        body: formData,
        headers:{
          Authorization: `Bearer ${authTokens.access}`
        }
      })


      if(response.ok){
        showAlert()
        setMessage('Investment plan successfully edited')
        setIsSuccess(true)
        setLoader(false)
        setDisablebutton(false)
        navigate('/admin/investment-plan/')

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
      let response = await fetch(`http://127.0.0.1:8000/api/investment-plan/${details.id}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${authTokens.access}`
        }
      })

      if (response.ok) {
        setDeletebtnLoader(false)
        setDisablebutton(false)
        navigate('/admin/investment-plan/')
        setDeletedModal(false)
        showAlert()
        setIsSuccess(true)
        setMessage('Plan deleted')
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
    const data = sessionStorage
.getItem("IndividualData");
    if (data) {
      const parsedData = JSON.parse(data);
      setDetails(parsedData)
      setPlanName(parsedData.plan_name || '');
      setMinAmount(parsedData.min_amount || '');
      setMaxAmount(parsedData.max_amount || '');
      setPercentage(parsedData.percentage_return || '');
      setDuration(parsedData.duration || '');
      setTimeRate(parsedData.time_rate || '');
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
                    <p className='dashboard-header'>Edit Investment Plan</p>
                  </div>
                </div>
                <div>

                <div className='pt-3'>
                  <div className="d-flex">
                    <div className=''>
                      <button onClick={showDeleteModal} className='investment-kYC-btn'>
                        <div className="d-flex">
                          <i class="bi bi-trash  pe-2"></i>
                          <p className=''>Delete Plan</p>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              </div>
              </section>


              <div className="dashboard-boxes mt-4 p-4 border-radius-5px">
                <div>
                  <form  onSubmit={handleSubmit(onSubmit)}>
                    <div className='row g-3'>
                      <div className="col-sm-6">
                        <label htmlFor="" className="p-2 ">Plan Name</label>
                        <input type="text" className={`dashboard-input ${errors.planName ? 'error-input' : ''}`} {...register('planName', {required: true})}  value={planName} onChange={(e) => setPlanName(e.target.value)} placeholder="e.g Executive" />
                        {errors.planName && <span style={{color: 'red'}}>This Feild is required</span>} 
                      </div>

                      <div className="col-sm-6">
                        <label htmlFor="" className="p-2 ">Min Amount</label>
                        <input type="text" className={`dashboard-input ${errors.minAmount ? 'error-input' : ''}`} {...register('minAmount', {required: true})}  value={minAmount} onChange={(e) => setMinAmount(e.target.value)} placeholder="e.g 2000" />
                        {errors.amount && <span style={{color: 'red'}}>This Feild is required</span>} 
                      </div>

                      <div className="col-sm-6">
                        <label htmlFor="" className="p-2 ">Max Amount</label>
                        <input type="text" className={`dashboard-input ${errors.maxAmount ? 'error-input' : ''}`} {...register('maxAmount', {required: true})}  value={maxAmount} onChange={(e) => setMaxAmount(e.target.value)} placeholder="e.g 10000" />
                        {errors.maxAmount && <span style={{color: 'red'}}>This Feild is required</span>} 
                      </div>


                      <div className="col-sm-6">
                        <label htmlFor="" className="p-2 ">Percentage  Return</label>
                        <input type="text" className={`dashboard-input ${errors.percentage ? 'error-input' : ''}`} {...register('percentage', {required: true})}  value={percentage} onChange={(e) => setPercentage(e.target.value)} placeholder="e.g 20" />
                        {errors.percentage && <span style={{color: 'red'}}>This Feild is required</span>} 
                      </div>

                      <div className="col-sm-6">
                        <label htmlFor="" className="p-2 ">Duration</label>
                        <input type="text" className={`dashboard-input ${errors.duration ? 'error-input' : ''}`} {...register('duration', {required: true})}  value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="e.g 12" />
                        {errors.duration && <span style={{color: 'red'}}>This Feild is required</span>} 
                      </div>

                      <div className="col-sm-6">
                        <label htmlFor="" className="p-2">Time Rate</label>
                        <select className={`${errors.timeRate ? 'error-input' : ''} dashboard-input cursor-pointer`} {...register('timeRate', {required: true})} type="text"   value={timeRate} onChange={(e) => setTimeRate(e.target.value)}>
                          <option></option>
                          <option value='hourly'>Hourly</option>
                          <option value='daily'>Daily</option>
                          <option value='weekly'>Weekly</option>
                          <option value='monthly'>Monthly</option>
                          <option value='yearly'>Yearly</option>
                        </select>
                        {errors.timeRate && <span style={{color: 'red'}}>This Feild is required</span>} 
                      </div>
                      
                      <div className='col-12 pt-4'>
                        <div className="d-flex height-100 align-items-center">
                          <div className='pe-4'>

                            <button className="dashboard-btn py-2 px-4" type="submit" disabled={disablebutton}>Edit Investment Plan</button> 
                          </div>
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

      <div>
        <DashboardFooter />
      </div>


    </div>
  )
}