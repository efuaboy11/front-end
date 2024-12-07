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

export const EditCrytoWallet = () =>{

  const [label, setLabel] = useState('')
  const [walletAddress, setWalletAddress] = useState('')
  const [coin, setCoin] = useState('')
  const [network, setNetwork] = useState('')
  const [deleteModal, setDeletedModal] = useState(false)
  const [deletebtnLoader, setDeletebtnLoader] = useState(false)
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



  const hideDeleteModal = () => {
    setDeletedModal(false)

  }

  const showDeleteModal = (id) => {
    setDeletedModal(true)
  }
  
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
    formData.append('walletAddress', walletAddress)
    formData.append('coin', coin)
    formData.append('network', network)

    try{
      const response = await fetch(`http://127.0.0.1:8000/api/wallet-address/${details.id}/`, {
        method: 'PATCH',
        body: formData,
        headers:{
          Authorization: `Bearer ${authTokens.access}`
        }
      })


      if(response.ok){
        showAlert()
        setMessage('Wallet address successfully edited')
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
    const data = localStorage.getItem("IndividualData");
    if (data) {
      const parsedData = JSON.parse(data);
      setDetails(parsedData)
      setLabel(parsedData.label || '');
      setWalletAddress(parsedData.walletAddress || '');
      setCoin(parsedData.coin || '');
      setNetwork(parsedData.network || '');
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
                    <p className='dashboard-header'>Edit Crypto Wallet</p>
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
                        <input type="text" className={`dashboard-input ${errors.label ? 'error-input' : ''}`} {...register('label', {required: true})}  value={label} onChange={(e) => setLabel(e.target.value)} placeholder="e.g Executive" />
                        {errors.label && <span style={{color: 'red'}}>This Feild is required</span>} 
                      </div>

                      <div className="col-sm-6">
                        <label htmlFor="" className="p-2 ">Wallet Address</label>
                        <input type="text" className={`dashboard-input ${errors.walletAddress ? 'error-input' : ''}`} {...register('walletAddress', {required: true})}  value={walletAddress} onChange={(e) => setWalletAddress(e.target.value)} placeholder="e.g 2000" />
                        {errors.walletAddress && <span style={{color: 'red'}}>This Feild is required</span>} 
                      </div>


                      <div className="col-sm-6">
                        <label htmlFor="" className="p-2">Coin</label>
                        <select className={`${errors.coin ? 'error-input' : ''} dashboard-input cursor-pointer`} {...register('coin', {required: true})} type="text"   value={coin} onChange={(e) => setCoin(e.target.value)}>
                          <option></option>
                          <option value='bitcoin'>Bitcoin</option>
                          <option value='ethereum'>Ethereum</option>
                          <option value='tether'>Tether</option>
                          <option value='litecoin'>Litecoin</option>
                          <option value='ripple'>Ripple</option>
                          <option value='cardano'>Cardano</option>
                          <option value='dogecoin'>Dogecoin</option>
                          <option value='stellar'>Stellar</option>
                        </select>
                        {errors.coin && <span style={{color: 'red'}}>This Feild is required</span>} 
                      </div>

                      <div className="col-sm-6">
                        <label htmlFor="" className="p-2">Network</label>
                        <select className={`${errors.network ? 'error-input' : ''} dashboard-input cursor-pointer`} {...register('network', {required: true})} type="text"   value={network} onChange={(e) => setNetwork(e.target.value)}>
                          <option></option>
                          <option value='BEP2'>BEP2</option>
                          <option value='BEP20'>BEP20</option>
                          <option value='ERC20'>ERC20</option>
                          <option value='OMNI'>OMNI</option>
                          <option value='TRC20'>TRC20</option>
                        </select>
                        {errors.network && <span style={{color: 'red'}}>This Feild is required</span>} 
                      </div>
                      
                      <div className='col-12 pt-4'>
                        <div className="d-flex height-100 align-items-center">
                          <div className='pe-4'>

                            <button className="dashboard-btn py-2 px-4" type="submit" disabled={disablebutton}>Edit Crypto Wallet</button> 
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