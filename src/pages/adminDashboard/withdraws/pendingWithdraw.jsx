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
import { useForm } from 'react-hook-form';
import AllDataContext from '../../../context/Alldata';

export const PendingWithdraw = () =>{
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

  } = useContext(AuthContext)

  const {

    pendingWithdrawCount,
    pendingWithdrawData,
    setPendingWithdrawData,
    pendingWithdrawLoader,
    pendingWithdrawSearch,
    setPendingWithdrawSearch,
    PendingWithdrawFunction,
    filterPendingWithdraws,

  } = useContext(AllDataContext)

  useEffect(() =>{
    if(!pendingWithdrawSearch){
      PendingWithdrawFunction()
    }else if(pendingWithdrawSearch){
      filterPendingWithdraws()
    }
  }, [pendingWithdrawSearch])


  const [currentPage, setCurrentPage] = useState(0)
  const [selectedDataId, setSelectedDataId] = useState(null);
  const [lastData, setLastData] = useState(null)
  const [secondToLastData, setSecondToLastData] = useState(null);
  const [showModal, setShowModal] = useState(false)
  const [showDropdownMenu, setShowDropdownMenu] = useState(false)
  const [loader, setLoader] = useState(false)
  const [status, setStatus] = useState('')
  const [statusLoader, setStatusLoader] = useState(false)
  const statusModal = useRef(null)
  const [statusOverlay, setStatusOverlay] = useState(false)
  


  
  
  const navigate  = useNavigate()

  const dataPerPage = 10;
  const pageCount = Math.ceil(pendingWithdrawData.length / dataPerPage)

  const currentData = pendingWithdrawData.slice(
    currentPage * dataPerPage,
    (currentPage + 1) * dataPerPage
  )

  const handlePageClick = ({selected}) =>{
    setCurrentPage(selected)
  }

  const toggleDropdown = (id) => {
    // Toggle the dropdown for the selected ID
    setSelectedDataId(selectedDataId === id ? null : id);
    setShowDropdownMenu(true)
  };


  const hideDeleteModal = () => {
    setShowModal(false)
    setSelectedDataId(null)
    setShowDropdownMenu(true)

  }

  const IndividualWithdraw = async() =>{
    setDisablebutton(true)
    let response = await fetch(`http://127.0.0.1:8000/api/withdraw/${selectedDataId}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens.access}`
      }
      
    })
    const data = await response.json()
    localStorage.setItem('TypeOfWithdraw', 'Pending')
    localStorage.setItem('TypeOfWithdrawUrl', '/admin/pending-withdraws')
    localStorage.setItem('IndividualData', JSON.stringify(data))

    if (response.ok){
      navigate(`/admin/all-withdraws/${data.id}`)
      setDisablebutton(false)
    }else{
      setDisablebutton(false)
    }

  }

  const showDeleteModal = () => {
    setShowModal(true)
    setShowDropdownMenu(false)
  }

  const showStatusModal = () =>{
    if(statusModal.current){
      statusModal.current.style.transform = `translateY(${0}px)`
      statusModal.current.style.transition = `all ${1.5}s ease`
    }

    setShowDropdownMenu(false)
    setStatusOverlay(true)
  }

  const HideStatusModal = () => {
    if(statusModal.current){
      statusModal.current.style.transform = `translateY(${-650}%)`
      statusModal.current.style.transition = `all ${5}s ease`
    }
    setSelectedDataId(null)


  }




  const deleteItem = async () => {
    setDisablebutton(true)
    setLoader(true)

    try{
      let response = await fetch(`http://127.0.0.1:8000/api/withdraw/${selectedDataId}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${authTokens.access}`
        }
      })

      if (response.ok) {
        setLoader(false)
        setDisablebutton(false)
        setPendingWithdrawData(pendingWithdrawData.filter(dat => dat.id !== selectedDataId))
        setShowModal(false)
        showAlert()
        setMessage('Withdraw successfully deleted')
      } else {
        const errorData = await response.json()
        const errorMessages = Object.values(errorData)
        .flat()
        .join(', ');
        setMessage(errorMessages)
        setLoader(false)
        setDisablebutton(false)
        showAlert()
        setIsSuccess(true)
        setIsSuccess(false)
        setDisablebutton(false)
      }

    }catch{
      showAlert()
      setMessage('An unexpected error occurred.');
      setDisablebutton(false)
      setIsSuccess(false)
      setLoader(false)

    }
  }

  useEffect(() =>{
    if(currentData.length > 2){
      setLastData(currentData[currentData.length - 1])
      setSecondToLastData(currentData[currentData.length -2])


      
    }else{
      setLastData(null)
      setSecondToLastData(null)
    }
  }, [currentData])

  const onSubmit = (data, e) =>{
    setDisablebutton(true)
    setStatusLoader(true)
    if(isValid){
      UpdateStatus(e)
      
    }else{
      setDisablebutton(false)
    }
  }

  const UpdateStatus = async(e) =>{
    e.preventDefault()
    setDisablebutton(true)

    try{
      const response = await fetch(`http://127.0.0.1:8000/api/withdraw/${selectedDataId}/update-status/`, {
        method: 'PATCH',
        body: JSON.stringify({
          status: status,
        }),
        headers:{
          Authorization: `Bearer ${authTokens.access}`,
          "Content-Type": "application/json"
        }
      })

      if(response.ok){
        showAlert()
        setMessage("Status updated sucessfully")
        setDisablebutton(false)
        setStatus('')
        setIsSuccess(true)
        setStatusLoader(false)
        HideStatusModal()
        setPendingWithdrawData(pendingWithdrawData.filter(dat => dat.id !== selectedDataId))
      }else{
        const errorData = await response.json()
        const errorMessages = Object.values(errorData)
        .flat()
        .join(', ');
        setMessage(errorMessages)
        setDisablebutton(false)
        setIsSuccess(false)
        setStatusLoader(false)
        showAlert()

      }
    }catch(error){
      console.log(error)
      showAlert()
      setMessage('An unexpected error occurred.');
      setDisablebutton(false)
      setStatusLoader(false)
      setIsSuccess(false)

    } 
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();

  useEffect(() => {
    let timer;
    if (selectedDataId == null) {
      timer = setTimeout(() => {
        setStatusOverlay(false);
      }, 1000);
    }

  
    return () => clearTimeout(timer);
  }, [selectedDataId]);


  
  return(
    <div>
      <div className="position-sticky1">
        <AdminDashFrame />
      </div>

      <div className="main-content" onClick={OnbodyClick}>
        <div className="container-xl">

          <div>
            <FloatingAlert
              message={messages}
              isVisible={alertVisible}
              onClose={() => setAlertVisible(false)}
              successs={isSuccess}
            />
          </div>

          {showModal &&
            <section className="overlay-background">
              <div className="dashboard-modal-container">
                <div className="dashboard-delete-modal-content

">
                  <h5>Delete Item?</h5>
                  <hr />
                  <p>This will delete the Item.</p>
                  <div className="d-flex justify-content-between py-3">
                    <div></div>
                    <div className='d-flex align-items-center height-100 pe-2'>
                      <button  className="dashboard-submit-btn  dashboard-btn px-4 py-2 me-3" disabled={disablebutton} onClick={deleteItem}>    
                        <span class={`${loader ? 'dashboard-submit-spinner': ''}`}></span>
                        <span class={`${loader ? 'dashboard-submit-btn-visiblity': ''}`}>Delete</span>
                      </button> 
                      <p className="light-link cursor-pointer" onClick={hideDeleteModal}>Cancel</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          }

          <div className={`pt-5 ${statusOverlay ? 'overlay-background': ''}`}>
            <div className="dashboard-update-status-container" ref={statusModal}>
              <div className="row justify-content-center">
                <div className="col-xl-3 col-lg-5 col-md-6 col-sm-9 col-11">
                  <div className="dashboard-update-status-content">
                    <div className="d-flex justify-content-end">
                      <FontAwesomeIcon className='sm-text cursor-pointer' icon={faX} onClick={HideStatusModal}/>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div>
                        <label htmlFor="" className="p-2 d-block">Status</label>
                        <select  className={`${errors.status ? 'error-input' : ''} d-block dashboard-input dashboard-update-status-input`} {...register('status', {required: true})} type="text"   value={status} onChange={(e) => setStatus(e.target.value)}>
                          <option></option>
                          <option value='pending'>Pending</option>
                          <option value='declined'>Declined</option>
                          <option value='successful'>Successful</option>
                        </select>
                        {errors.status && <span style={{color: 'red'}}>This Feild is required</span>} 
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






          <section className='py-4'>
            <div className="d-flex justify-content-between align-items-center height-100">
              <div>
                <div>
                  <p className='dashboard-header'>Pending Withdraws</p>
                  <p className='light-text'>Total {pendingWithdrawCount} pending deposit</p>
                </div>
              </div>

              <div>
                <div className='d-none d-sm-block'>
                  <Link to='/admin/add-withdraw' className='dashboard-btn p-3'>
                    <i class="bi bi-plus-circle pe-2"></i>
                    Add withdraw
                  </Link>
                </div>
              </div>
            </div>
          </section>



          <section className='py-5 mt-3'>
            <div className='d-flex justify-content-end'>
              <div className='pb-3'>
                <input type="text" className="p-2 dashboard-search-input" placeholder="search..." value={pendingWithdrawSearch} onChange={(e) => setPendingWithdrawSearch(e.target.value)} />
              </div>
            </div>
            <div className='dashboard-boxes border-radius-5px dahboard-table  dash-scroll-bar non-wrap-text'>
              <div className=''>
                <table>
                  <thead>
                    <tr>
                      <th className='sm-text-2 py-2'>Name</th>
                      <th className='sm-text-2'>Trnx/Coin</th>
                      <th className='sm-text-2'>Amount</th>
                      <th className='sm-text-2'>Date</th>
                      <th className='sm-text-2'>Status</th>

                      <th></th>
                    </tr>
                  </thead>

                  <tbody>
                    {currentData.length > 0 ? (
                      currentData.map((data) =>(
                        <tr key={data.id} className={selectedDataId === data.id ? 'dashboard-active-row' : ''}> 
                          <td className='py-2'>
                            <div className="d-flex">
                              <div className='dahboard-table-arrow-icon'>
                                <i class="bi bi-arrow-down-left sm-text-3"></i>
                              </div>


                              <div>
                                {formatName(data.user_details.full_name)} <br /> <span className="sm-text-2">{data.user_details.email}</span>
                              </div>

                            </div>
                            
                            
                          </td>
                          <td >{data.transaction_id} <br /> <span className="sm-text-2">via {data.wallet_name}</span></td>
                          <td>{formatCurrency(data.amount)} USD</td>
                          <td>{formatDate(data.created_at)}</td>
                          <td><p p className={`dashboard-status ps-3 ${data.status === "pending" ? "pending" : "sucessfull"} ${data.status === "declined" && "failed"}`}>{formatName(data.status)}</p></td>                         
                          <td>
                            <div className='dashboard-table-btn'>
                              <i onClick={() => toggleDropdown(data.id)} class="bi bi-three-dots cursor-pointer"></i>

                              {(selectedDataId === data.id && showDropdownMenu) && (
                                <div className={`dashboard-table-menu ${(data.id === lastData?.id || data.id === secondToLastData?.id)? 'dashboard-table-menu-up': 'dashboard-table-menu-down'}`}>
                                  <div>
                                    <p onClick={IndividualWithdraw} className='dashboard-table-menu-btn cursor-pointer'>
                                      <button disabled={disablebutton} className='Button py-2 '>
                                        <i class="bi bi-eye-fill pe-1"></i> View Details
                                      </button>

                                    </p>
                                    <p className='dashboard-table-menu-btn cursor-pointer'>
                                      <button disabled={disablebutton} className='Button py-2'>
                                        <i class="bi bi-person pe-1"></i> User Profile
                                      </button>
                                    </p>

                                    <p className='py-2 dashboard-table-menu-btn cursor-pointer' onClick={showStatusModal}>
                                      <i class="bi bi-upload pe-1" ></i> Update status
                                    </p>

                                    <p className='py-2 dashboard-table-menu-btn cursor-pointer' onClick={showDeleteModal}>
                                      <i class="bi bi-trash pe-1" ></i> Delete
                                    </p>
                                  </div>
                                </div>
                              )}
                            </div>
                          </td>
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


              {pendingWithdrawLoader && (
                <div className="d-flex justify-content-center py-4">
                  <img src={spin} alt="" width='60px'/>
                </div>  
                                
              )}
            </div>

            <div className="d-flex justify-content-end py-2">
              <ReactPaginate
                previousLabel={<FontAwesomeIcon icon={faChevronLeft}/>}
                nextLabel={<FontAwesomeIcon icon={faChevronRight}/>}
                pageCount={pageCount}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                previousLinkClassName={"pagination__link"}
                nextLinkClassName={"pagination__link"}
                disabledClassName={"pagination__link--disabled"}
                activeClassName={"pagination__link--active"}
                pageRangeDisplayed={5}
                marginPagesDisplayed={1} 
              />
            </div>

          </section>
        </div>
      </div>


    </div>
  )
}