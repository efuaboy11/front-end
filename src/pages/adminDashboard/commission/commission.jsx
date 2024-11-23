import '../../../css/dashboardCss/dashboard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AuthContext from "../../../context/AuthContext";
import { useContext, useEffect, useRef, useState } from 'react';
import { AdminDashFrame } from '../../../component/adminDashFrame';
import ReactPaginate  from "react-paginate"
import { Link, useNavigate } from 'react-router-dom';
import { faChevronLeft, faChevronRight, faX } from '@fortawesome/free-solid-svg-icons';
import FloatingAlert from '../../../component/alert';
import spin from '../../../img/Spin.gif'
import AllDataContext from '../../../context/Alldata';
import { useForm } from 'react-hook-form';

export const Commission = () =>{
  const { authTokens,
    messages,
    alertVisible,
    setAlertVisible,
    isSuccess,
    showAlert,
    setMessage,
    setIsSuccess,


    OnbodyClick,
    formatCurrency,
    formatName,
    disablebutton, 
    setDisablebutton,


  } = useContext(AuthContext)
  const {
    commission,
    comissionLoader,
    CommissionFunction,
  } = useContext(AllDataContext)


  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')
  const [statusOverlay, setStatusOverlay] = useState(false)
  const statusModal = useRef(null)
  const [showStatus, setShowStatus] = useState(true)
  const [statusLoader, setStatusLoader] = useState(false)
  const comissionData = commission[0]




  const showStatusModal = () =>{
    if(statusModal.current){
      statusModal.current.style.transform = `translateY(${0}px)`
      statusModal.current.style.transition = `all ${1.5}s ease`
    }
    setStatusOverlay(true)
    setShowStatus(true)
  }

  const hideStatusModal = () => {
    if(statusModal.current){
      statusModal.current.style.transform = `translateY(${-650}%)`
      statusModal.current.style.transition = `all ${5}s ease`
    }
    setShowStatus(false)

  }


  useEffect(() =>{
    CommissionFunction()

    setName(comissionData?.name || '')
    setAmount(comissionData?.amount || '')
  }, [!comissionData])

  useEffect(() => {
    let timer;
    if (showStatus == false) {
      timer = setTimeout(() => {
        setStatusOverlay(false);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [showStatus]);
  const onSubmit = (data, e) =>{
    setDisablebutton(true)
    setStatusLoader(true)
    if(isValid){
      UpdateCommission(e)
    }else{
      setDisablebutton(false)
    }

  }

  const UpdateCommission = async(e) =>{
    e.preventDefault()
    try{
      const response = await fetch('http://127.0.0.1:8000/api/commission/1/', {
        method: 'PATCH',
        body: JSON.stringify({
          name: name,
          amount: amount,
        }),
        headers:{
          Authorization: `Bearer ${authTokens.access}`,
          "Content-Type": "application/json"
        }
      })

      if(response.ok){
        showAlert()
        setMessage('Commission update Sucessfully')
        setDisablebutton(false)
        hideStatusModal()
        setIsSuccess(true)
      }else{
        const errorData = await response.json()
        const errorMessages = Object.values(errorData)
        .flat()
        .join(', ');
        setMessage(errorMessages)
        setDisablebutton(false)
        setStatusLoader(false)
        setIsSuccess(false)
        showAlert()
      }
    }catch(error){
      console.log(error)
      showAlert()
      setMessage('An unexpected error occurred.');
      setDisablebutton(false)
      setIsSuccess(false)
      setStatusLoader(false)

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
        <AdminDashFrame />
      </div>

      <div className="main-content" onClick={OnbodyClick}>
        <div className="container-xl">

        <div className={` ${statusOverlay ? 'overlay-background pt-5': ''}`}>
            <div className="dashboard-update-status-container" ref={statusModal}>
              <div className="row justify-content-center">
                <div className="col-xl-3 col-lg-5 col-md-6 col-sm-9 col-11">
                  <div className="dashboard-update-status-content">
                    <div className="d-flex justify-content-end">
                      <FontAwesomeIcon className='sm-text cursor-pointer' icon={faX} onClick={hideStatusModal}/>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div>
                        <label htmlFor="" className="p-2 ">Name</label>
                          <input type="text" className={`dashboard-input ${errors.name ? 'error-input' : ''}`} {...register('name', {required: true})}  value={name} onChange={(e) => setName(e.target.value)} placeholder="0.00" />
                          {errors.name && <span style={{color: 'red'}}>This Feild is required</span>} 
                      </div>

                      <div>
                        <label htmlFor="" className="p-2 ">Amount</label>
                          <input type="text" className={`dashboard-input ${errors.amount ? 'error-input' : ''}`} {...register('amount', {required: true})}  value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.00" />
                          {errors.amount && <span style={{color: 'red'}}>This Feild is required</span>} 
                      </div>

                      <div className="d-flex justify-content-end">
                        <div className='pt-3'>
                          <button  className="dashboard-submit-btn  dashboard-btn py-2 px-4" type="submit" disabled={disablebutton}>    
                            <span class={`${statusLoader ? 'dashboard-submit-spinner': ''}`}></span>
                            <span class={`${statusLoader ? 'dashboard-submit-btn-visiblity': ''}`}>Submit</span>
                          </button> 
                        </div>
                      </div>


                    </form>

                  </div>
                </div>
              </div>

            </div>
          </div>

          <div>
            <FloatingAlert
              message={messages}
              isVisible={alertVisible}
              onClose={() => setAlertVisible(false)}
              successs={isSuccess}
            />
          </div>

          <section className='py-4'>
            <div className="d-flex justify-content-between align-items-center height-100">
              <div>
                <div>
                  <p className='dashboard-header'>Commission</p>
                </div>
              </div>
            </div>
          </section>



          <section className=''>
            <div className='dashboard-boxes border-radius-5px dahboard-table  dash-scroll-bar non-wrap-text'>
              <div className=''>
                <table>
                  <thead>
                    <tr>
                      <th className='sm-text-2 py-2'>Name</th>
                      <th className='sm-text-2'>Amount</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {commission.length > 0 ? (
                      commission.map((data) =>(
                        <tr key={data.id}> 
                          <td className='py-2'>{formatName(data.name)}</td>
                          <td>{formatCurrency(data.amount)} USD</td>
                          <td onClick={showStatusModal}><i class="bi bi-pencil-square cursor-pointer"></i></td>
                        </tr>
                      ))
                    ): (
                        <tr>
                          <td>No details available</td>
                        </tr>
                    )}
                  </tbody>
                </table>


              </div>


              {comissionLoader && (
                <div className="d-flex justify-content-center py-4">
                  <img src={spin} alt="" width='60px'/>
                </div>  
                                
              )}
            </div>
          </section>
        </div>
      </div>


    </div>
  )
}