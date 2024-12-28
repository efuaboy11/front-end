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

export const AddPaymentMethod = () =>{

  const [name, setName] = useState('')
  const [walletAddress, setWalletAddress] = useState('')
  const [walletType, setWalletType] = useState('')
  const [loader, setLoader] = useState(false)
  const [network, setNetwork] = useState('')


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

  const ClearInput = () =>{
    setName('')
    setWalletAddress('')
    setWalletType('')
    setNetwork('')

  }


  
  const onSubmit = (data, e) =>{
    setDisablebutton(true)
    if(isValid){
      addPaymentMethod(e)
      
    }else{
      setDisablebutton(false)
    }
  }

  const addPaymentMethod = async(e) =>{
    e.preventDefault()
    setLoader(true)

    const formData = new FormData()

    formData.append('name', name)
    formData.append('wallet_address', walletAddress)
    formData.append('type', walletType)
    formData.append('network', network)

    try{
      const response = await fetch(`http://127.0.0.1:8000/api/payment-method/`, {
        method: 'POST',
        body: formData,
        headers:{
          Authorization: `Bearer ${authTokens.access}`
        }
      })


      if(response.ok){
        showAlert()
        setMessage('Payment method successfully created')
        setIsSuccess(true)
        setLoader(false)
        setDisablebutton(false)
        setName('')
        setWalletAddress('')
        setWalletType('')
        setNetwork('')
    

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
                    <p className='dashboard-header'>Add Payment Method</p>
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
                          <label htmlFor="" className="p-2 ">Name</label>
                          <input type="text" className={`dashboard-input ${errors.name ? 'error-input' : ''}`} {...register('name', {required: true})}  value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g Etherum" />
                          {errors.name && <span style={{color: 'red'}}>This Feild is required</span>} 
                        </div>

                        <div className="col-sm-6">
                          <label htmlFor="" className="p-2 ">Wallet Type</label>
                          <input type="text" className={`dashboard-input ${errors.walletType ? 'error-input' : ''}`} {...register('walletType', {required: true})}  value={walletType} onChange={(e) => setWalletType(e.target.value)} placeholder="e.g BTC" />
                          {errors.walletType && <span style={{color: 'red'}}>This Feild is required</span>} 
                        </div>


                        <div className="col-sm-6">
                          <label htmlFor="" className="p-2">Network</label>
                          <select className={`${errors.network ? 'error-input' : ''} dashboard-input cursor-pointer cursor-pointer`} {...register('network', {required: true})} type="text"   value={network} onChange={(e) => setNetwork(e.target.value)}>
                            <option className=''>Select Network</option>
                            <option value='BTC'>BTC</option>
                            <option value='ERC20'>ERC20</option>
                            <option value='DOT'>DOT</option>
                            <option value='BEP20'>BEP20</option>
                            <option value='ERC20'>ERC20</option>
                            <option value='OMNI'>OMNI</option>
                            <option value='TRC20'>TRC20</option>
                          </select>
                          {errors.network && <span style={{color: 'red'}}>This Feild is required</span>} 
                        </div>
                        <div className="col-sm-6">
                          <label htmlFor="" className="p-2 ">Wallet Address</label>
                          <input type="text" className={`dashboard-input ${errors.walletAddress ? 'error-input' : ''}`} {...register('walletAddress', {required: true})}  value={walletAddress} onChange={(e) => setWalletAddress(e.target.value)} placeholder="e.g 1DC9GBTv9JNb8K58EdFsg1PAeYRCsVi7Rq" />
                          {errors.walletAddress && <span style={{color: 'red'}}>This Feild is required</span>} 
                        </div>



                        
                        <div className='col-12 pt-4'>
                        <div className="d-flex height-100 align-items-center">
                          <div className='pe-4'>

                            <button className="dashboard-btn py-2 px-4" type="submit" disabled={disablebutton}>Add Payment Method</button> 
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

      <div>
        <DashboardFooter />
      </div>


    </div>
  )
}