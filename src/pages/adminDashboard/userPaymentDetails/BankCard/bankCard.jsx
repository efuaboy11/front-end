import '../../../../css/dashboardCss/dashboard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AuthContext from "../../../../context/AuthContext";
import { useContext, useEffect, useState } from 'react';
import { AdminDashFrame } from '../../../../component/adminDashFrame';
import ReactPaginate  from "react-paginate"
import { Link, useNavigate } from 'react-router-dom';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import CircularProgress from '@mui/material/CircularProgress';
import FloatingAlert from '../../../../component/alert';
import spin from '../../../../img/Spin.gif'
import { selectClasses } from '@mui/material';
import AllDataContext from '../../../../context/Alldata';
import '../../../../css/dashboardCss/adminDahboardCss/kyc.css'
import { useForm } from 'react-hook-form';
import { DashboardFooter } from '../../../../component/dashbaordFooter';

export const BankCard = () =>{
  const {authTokens, 
    messages,
    alertVisible,
    setAlertVisible,
    isSuccess,
    showAlert,
    setMessage,
    setIsSuccess,


    OnbodyClick,
    formatName,
    shortName,
    disablebutton, 
    setDisablebutton,
    formatDate,
    formatFirstName,
    formatNameAllCaps,


  } = useContext(AuthContext)


  const {


    bankCardCount,
    bankCardData,
    setBankCardData,
    bankCardLoader,
    bankCardSearch,
    setBankCardSearch,
    BankCardFunction,
    filterBankCard,


  } = useContext(AllDataContext)



  const [currentPage, setCurrentPage] = useState(0)
  const [selectedDataId, setSelectedDataId] = useState(null);
  const [lastData, setLastData] = useState(null)
  const [secondToLastData, setSecondToLastData] = useState(null);
  const [showDropdownMenu, setShowDropdownMenu] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [loader, setLoader] = useState(false)

  

  const navigate  = useNavigate()

  const dataPerPage = 10;
  const pageCount = Math.ceil(bankCardData.length / dataPerPage)

  const currentData = bankCardData.slice(
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

  const showDeleteModal = () => {
    setShowModal(true)
    setShowDropdownMenu(false)
  }


  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();


  const IndividualBankCard = async(id) =>{
    setSelectedDataId(id)
    setDisablebutton(true)
    let response = await fetch(`http://127.0.0.1:8000/api/bank-card/${id}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens.access}`
      }
      
    })
    const data = await response.json()
    sessionStorage
.setItem('IndividualData', JSON.stringify(data))

    if (response.ok){
      navigate(`/admin/payment-account/bank-card/${data.bank_card_id}`)
      setDisablebutton(false)

    }else{
      setDisablebutton(false)
    }

  }


  
 


  const deleteItem = async () => {
    setDisablebutton(true)
    setLoader(true)

    try{
      let response = await fetch(`http://127.0.0.1:8000/api/bank-card/${selectedDataId}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${authTokens.access}`
        }
      })

      if (response.ok) {
        setLoader(false)
        setDisablebutton(false)
        setBankCardData(bankCardData.filter(dat => dat.id !== selectedDataId))
        setShowModal(false)
        showAlert()
        setMessage('Bank card deleted')
        setIsSuccess(true)
      } else {
        const errorData = await response.json()
        const errorMessages = Object.values(errorData)
        .flat()
        .join(', ');
        setMessage(errorMessages)
        setLoader(false)
        setDisablebutton(false)
        showAlert()
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

  const IndividualUser = async(id) =>{
    setSelectedDataId(id)
    setDisablebutton(true)

    let response = await fetch(`http://127.0.0.1:8000/api/user-profile/admin/${id}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens.access}`
      }
      
    })
    const data = await response.json()
    sessionStorage.setItem('urlName', 'Users')
    sessionStorage.setItem('urlLink', '/admin/user/list')
    sessionStorage.setItem('IndividualUserData', JSON.stringify(data))

    if(response.ok){
      navigate(`/admin/user/${data.user}`)
      setDisablebutton(false)
    }else{
      setDisablebutton(false)
    }
  }

  useEffect(() =>{
    if(!bankCardSearch){
      BankCardFunction()
    }else if(bankCardSearch){
      filterBankCard()
    }
  }, [bankCardSearch])


  useEffect(() =>{
    if(currentData.length > 2){
      setLastData(currentData[currentData.length - 1])
      setSecondToLastData(currentData[currentData.length -2])

      
    }else{
      setLastData(null)
      setSecondToLastData(null)
    }
  }, [currentData]) 



  
  return(
    <div>
      <div className="position-sticky1">
        <AdminDashFrame />
      </div>

      <div className="main-content" onClick={OnbodyClick}>
        <div className="container-xl pb-5">
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
                <div className="dashboard-delete-modal-content">
                  <h5>Delete Wallet?</h5>
                  <hr />
                  <p>This wll delete the wallet account.</p>
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

          <section className='py-4'>
            <div className="d-block d-md-flex  justify-content-between align-items-center height-100">
              <div>
                <div>
                  <p className='dashboard-header'>Bank Card</p>
                  <p className='light-text'>Total {bankCardCount} bank card  for funds withdrawal.</p>
                </div>
              </div>

              <div>
                <div className='pt-3'>
                  <Link className='Link' to='/admin/payment-account/bank-card/add' >
                    <div className='dashboard-btn py-2 px-3'>


                      <div className="d-flex">
                        <i class="bi bi-plus-lg pe-2"></i>
                        <p>Add Card</p>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </section>



          <section className='py-5 mt-3'>
            <div className='d-flex justify-content-end'>
              <div className='pb-3'>
                <input type="text" className="p-2 dashboard-search-input" placeholder="search..." value={bankCardSearch} onChange={(e) => setBankCardSearch(e.target.value)} />
              </div>
            </div>
            <div className='dashboard-boxes border-radius-5px dahboard-table  dash-scroll-bar non-wrap-text'>
              <div className=''>
                <table>
                  <thead>
                    <tr>
                      <th className='sm-text-2 py-2'>Name</th>
                      <th className='sm-text-2 py-2'>Label</th>
                      <th className='sm-text-2'>Card Holder</th>
                      <th className='sm-text-2'>Card Number</th>
                      <th className='sm-text-2'>Added</th>
                      <th></th>
                    </tr>
                  </thead>

                  <tbody>
                    {currentData.length > 0 ? (
                      currentData.map((data) =>(
                        <tr key={data.id} className={selectedDataId === data.id ? 'dashboard-active-row' : ''}> 
                          <td className='py-2'>
                            <div className="d-flex">
                              {data.users_details.profile_photo === null ? (
                                <div className="position-relative1">
                                  <h6 className="admin-home-user-table-icon">{shortName(data.users_details.full_name)}</h6>
                                  <p className={`admin-home-user-table-icon-status ${data.users_details.status === "verified" ? "sucessfull-bg" : "pending"}`}></p>
                                </div>
                                ): (
                                  <div className="position-relative1">
                                    <img className='admin-home-user-table-img' src={data.users_details.profile_photo} alt="" />
                                    <p className={`admin-home-user-table-icon-status ${data.users_details.status === "verified" ? "sucessfull-bg" : "pending"}`}></p>
                                  </div>


                                )
                              }
  
                              
                              <div className='ms-1'>
                                {formatName(data.users_details.full_name)} <br /> <span className="sm-text-2">{data.users_details.email}</span>
                              </div>

                            </div>    
                          </td>

                          <td>{formatName(data.label)}</td>
                          <td>{formatName(data.name_on_card)}</td>
                          <td>{data.card_number}</td>               
                          <td>{formatDate(data.created_at)}</td>
                          <td>
                            <div className='dashboard-table-btn'>
                              <i onClick={() => toggleDropdown(data.id)} class="bi bi-three-dots cursor-pointer"></i>

                              {(selectedDataId === data.id && showDropdownMenu) && (
                                <div  className={`dashboard-table-menu ${(data.id === lastData?.id || data.id === secondToLastData?.id)? 'dashboard-table-menu-up': 'dashboard-table-menu-down'}`}>
                                  <div>
                                    <p className='dashboard-table-menu-btn cursor-pointer'>
                                      <button onClick={() => IndividualUser(data.user)} disabled={disablebutton} className='Button py-2'>
                                        <i class="bi bi-person pe-1"></i> User Profile
                                      </button>
                                    </p>
                                    <p className='dashboard-table-menu-btn cursor-pointer'>
                                      <button onClick={() => IndividualBankCard(data.id)} disabled={disablebutton} className='Button py-2'>
                                        <i class="bi bi-pencil pe-1"></i> Update
                                      </button>
                                    </p>
                                    <p className='dashboard-table-menu-btn cursor-pointer'>
                                      <button onClick={showDeleteModal} disabled={disablebutton} className='Button py-2'>
                                        <i class="bi bi-trash pe-1"></i> Delete
                                      </button>
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


              {bankCardLoader && (
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

      <div>
        <DashboardFooter />
      </div>


    </div>
  )
}