import '../../../css/dashboardCss/dashboard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AuthContext from "../../../context/AuthContext";
import { useContext, useEffect, useState } from 'react';
import { AdminDashFrame } from '../../../component/adminDashFrame';
import ReactPaginate  from "react-paginate"
import { Link, useNavigate } from 'react-router-dom';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import CircularProgress from '@mui/material/CircularProgress';
import FloatingAlert from '../../../component/alert';
import spin from '../../../img/Spin.gif'
import { selectClasses } from '@mui/material';
import AllDataContext from '../../../context/Alldata';
import '../../../css/dashboardCss/adminDahboardCss/kyc.css'
import { useForm } from 'react-hook-form';

export const DisableUser = () =>{
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


    disableUserCount,
    disableUserData,
    setDisableUserData,
    userDisableLoader,
    disableUserSeacrh,
    setDisableUserSearch,
    DisableUsersFunction,
    filterDisableUsersFunction,

    usersData,
    UsersFunction

  } = useContext(AllDataContext)



  const [currentPage, setCurrentPage] = useState(0)
  const [selectedDataId, setSelectedDataId] = useState(null);
  const [showDropdownMenu, setShowDropdownMenu] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [loader, setLoader] = useState(false)

  const [user, setUser] = useState('')
  const [reason, setReason] = useState('')
  const [blockUserbtnLoader, setBlockUserbtnLoader] = useState(false)
  const [blockUserModal, setBlockUserModal] = useState(false)
  

  const navigate  = useNavigate()

  const dataPerPage = 10;
  const pageCount = Math.ceil(disableUserData.length / dataPerPage)

  const currentData = disableUserData.slice(
    currentPage * dataPerPage,
    (currentPage + 1) * dataPerPage
  )

  const handlePageClick = ({selected}) =>{
    setCurrentPage(selected)
  }

  const checkVerification = (status) =>{
    if(status == 'verified'){
      return 'Yes'
    }else if(status == 'pending' || status == 'canceled'){
      return 'No'
    }
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

  const showBlockUser = () =>{
    setBlockUserModal(true)
  }
  
  const HideBlockUser = () =>{
    setBlockUserModal(false)

  }

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();

  const onSubmit = (data, e) =>{
    setDisablebutton(true)
    setBlockUserbtnLoader(true)
    if(isValid){
      BlockUser(e)
    }else{
      setDisablebutton(false)
    }

  }

  const BlockUser = async () => {
    setDisablebutton(true)

    try{
      let response = await fetch(`http://127.0.0.1:8000/api/disable-account/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authTokens.access}`,
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          user: user,
          reason: reason
        })
      })

      if (response.ok) {
        setDisablebutton(false)
        HideBlockUser()
        showAlert()
        setIsSuccess(true)
        setMessage('User account disabled successfully')
        setBlockUserbtnLoader(false)
      } else {
        const errorData = await response.json()
        const errorMessages = Object.values(errorData)
        .flat()
        .join(', ');
        setMessage(errorMessages)
        showAlert()
        setIsSuccess(false)
        setDisablebutton(false)
        setBlockUserbtnLoader(false)
      }

    }catch{
      showAlert()
      setMessage('An unexpected error occurred.');
      setDisablebutton(false)
      setIsSuccess(false)
      setBlockUserbtnLoader(false)

    }
  }



  const deleteItem = async () => {
    setDisablebutton(true)
    setLoader(true)

    try{
      let response = await fetch(`http://127.0.0.1:8000/api/disable-account/${selectedDataId}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${authTokens.access}`
        }
      })

      if (response.ok) {
        setLoader(false)
        setDisablebutton(false)
        setDisableUserData(disableUserData.filter(dat => dat.id !== selectedDataId))
        setShowModal(false)
        showAlert()
        setMessage('Account Activated')
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

  useEffect(() =>{
    UsersFunction()
    console.log(disableUserData)

  }, [])
  
  useEffect(() =>{
    if(!disableUserSeacrh){
      DisableUsersFunction()
    }else if(disableUserSeacrh){
      filterDisableUsersFunction()
    }
  }, [disableUserSeacrh])



  
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
                <div className="dashboard-delete-modal-content">
                  <h5>Activate User Account?</h5>
                  <hr />
                  <p>This remove the user account from disable acount.</p>
                  <div className="d-flex justify-content-between py-3">
                    <div></div>
                    <div className='d-flex align-items-center height-100 pe-2'>
                      <button  className="dashboard-submit-btn  dashboard-btn px-4 py-2 me-3" disabled={disablebutton} onClick={deleteItem}>    
                        <span class={`${loader ? 'dashboard-submit-spinner': ''}`}></span>
                        <span class={`${loader ? 'dashboard-submit-btn-visiblity': ''}`}>Activate</span>
                      </button> 
                      <p className="light-link cursor-pointer" onClick={hideDeleteModal}>Cancel</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          }

          {blockUserModal &&
            <section className="overlay-background">
              <div className="dashboard-modal-conatiner">
                <div className="dashboard-modal-content">
                  <div>
                    <p className='dashboard-header'> Disable Account</p>
                  </div>

                  <div className="width-100 py-4">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="row">
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
                          <label htmlFor="" className="p-2 ">Reason</label>
                          <input type="text" className={`dashboard-input ${errors.reason ? 'error-input' : ''}`} {...register('reason', {required: true})}  value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Many login attempts" />
                          {errors.reason && <span style={{color: 'red'}}>This Feild is required</span>} 
                        </div>

                        <div className='col-12 pt-4 mt-1'>
                          <div className="d-flex height-100 align-items-center">
                            <div className='pe-4'>
                            <button  className="dashboard-submit-btn  dashboard-btn py-2 px-4" type="submit" disabled={disablebutton}>    
                              <span class={`${blockUserbtnLoader ? 'dashboard-submit-spinner': ''}`}></span>
                              <span class={`${blockUserbtnLoader ? 'dashboard-submit-btn-visiblity': ''}`}>Disabe Account</span>
                            </button>
                            </div>
                            <p onClick={HideBlockUser}  className='light-link cursor-pointer'>Cancel</p>
                          </div>
                        
                      </div>


                      </div>
                    </form>
                  </div>
                  
                </div>
              </div>
            </section>
          }
          <section className='py-4'>
            <div className="d-block d-md-flex  justify-content-between align-items-center height-100">
              <div>
                <div>
                  <p className='dashboard-header'>Disable Users</p>
                  <p className='light-text'>Total {disableUserCount} disable users</p>
                </div>
              </div>

              <div>
                <div className='pt-3'>
                  <button className='dashboard-btn py-2 px-3' onClick={showBlockUser}>
                    <div className="d-flex">
                      <i class="bi bi-plus-lg pe-2"></i>
                      <p>Disable Account</p>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </section>



          <section className='py-5 mt-3'>
            <div className='d-flex justify-content-end'>
              <div className='pb-3'>
                <input type="text" className="p-2 dashboard-search-input" placeholder="search..." value={disableUserSeacrh} onChange={(e) => setDisableUserSearch(e.target.value)} />
              </div>
            </div>
            <div className='dashboard-boxes border-radius-5px dahboard-table  dash-scroll-bar non-wrap-text'>
              <div className=''>
                <table>
                  <thead>
                    <tr>
                      <th className='sm-text-2 py-2'>Name</th>
                      <th className='sm-text-2 py-2'>Reason</th>
                      <th className='sm-text-2'>Verified</th>
                      <th className='sm-text-2'>Status</th>
                      <th className='sm-text-2'>Registered</th>
                      <th></th>
                    </tr>
                  </thead>

                  <tbody>
                    {currentData.length > 0 ? (
                      currentData.map((data) =>(
                        <tr key={data.id} className={selectedDataId === data.id ? 'dashboard-active-row' : ''}> 
                          <td className='py-2'>
                            <div className="d-flex">
                              {data.user_details.profile_photo === null ? (
                                <div className="position-relative1">
                                  <h6 className="admin-home-user-table-icon">{shortName(data.user_details.full_name)}</h6>
                                  <p className={`admin-home-user-table-icon-status ${data.user_details.status === "verified" ? "sucessfull-bg" : "pending"}`}></p>
                                </div>
                                ): (
                                  <div className="position-relative1">
                                    <img className='admin-home-user-table-img' src={data.user_details.profile_photo} alt="" />
                                    <p className={`admin-home-user-table-icon-status ${data.user_details.status === "verified" ? "sucessfull-bg" : "pending"}`}></p>
                                  </div>


                                )
                              }
  
                              
                              <div className='ms-1'>
                                {formatName(data.user_details.full_name)} <br /> <span className="sm-text-2">{data.user_details.email}</span>
                              </div>

                            </div>    
                          </td>

                          <td>{formatName(data.reason)}</td>
                          <td>
                            <div className="d-flex align-items-center height-100">
                              <p className={`dashboard-dot me-2 ${data.user_details.status === "verified" ? "sucessfull-bg" : "pending"}`}></p>
                              <p className={`d-inline py-2 sm-text ${data.user_details.status === "verified" ? "sucessfull-text" : "pending-text"} font-bold`}>{checkVerification(data.user_details.status)}</p>
                            </div>

                          </td>

                          <td>
                          <p className='d-inline py-1 px-3 border-radius-5px dashboard-boxes-2'>Blocked</p>
                          </td>

                          <td>
                            <p className='d-inline py-2 '>{formatDate(data.user_details.date_joined)}</p>
                          </td>
                          <td>
                            <div className='dashboard-table-btn'>
                              <i onClick={() => toggleDropdown(data.id)} class="bi bi-three-dots cursor-pointer"></i>

                              {(selectedDataId === data.id && showDropdownMenu) && (
                                <div className={`dashboard-table-menu  dashboard-table-menu-down`}>
                                  <div>
                                    <p className='dashboard-table-menu-btn cursor-pointer'>
                                      <button disabled={disablebutton} className='Button py-2'>
                                        <i class="bi bi-person pe-1"></i> User Profile
                                      </button>
                                    </p>
                                    <p className='py-2 dashboard-table-menu-btn cursor-pointer' onClick={showDeleteModal}>
                                    <i class="bi bi-trash pe-1" ></i> Activate
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


              {userDisableLoader && (
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