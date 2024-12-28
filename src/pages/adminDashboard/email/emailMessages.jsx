import '../../../css/dashboardCss/dashboard.css'
import '../../../css/dashboardCss/adminDahboardCss/email.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AuthContext from "../../../context/AuthContext";
import { useContext, useEffect, useState } from 'react';
import { AdminDashFrame } from '../../../component/adminDashFrame';
import ReactPaginate  from "react-paginate"
import { Link, useNavigate } from 'react-router-dom';
import { faChevronLeft, faChevronRight, faLocationArrow, faStarOfLife } from '@fortawesome/free-solid-svg-icons';
import FloatingAlert from '../../../component/alert';
import spin from '../../../img/Spin.gif'
import AllDataContext from '../../../context/Alldata';
import { useForm } from 'react-hook-form';

export const EmailMessage = () =>{
  const { authTokens, 
    messages,
    alertVisible,
    setAlertVisible,
    isSuccess,
    showAlert,
    setMessage,
    setIsSuccess,


    OnbodyClick,
    formatDateTime,
    formatCurrency,
    formatName,
    disablebutton, 
    setDisablebutton,
    truncateText,


  } = useContext(AuthContext)


  const {

    emailCount,
    emailData,
    emailLoader,
    emailSearch,
    setEmailSearch,
    EmailFunction,
    filterEmail,
    setEmailData,

  } = useContext(AllDataContext)

  useEffect(() =>{
    if(!emailSearch){
      EmailFunction()
    }else if(emailSearch){
      filterEmail()
    }
  }, [emailSearch])


  const [currentPage, setCurrentPage] = useState(0)
  const [loader, setLoader] = useState(false)
  const [selectedDataId, setSelectedDataId] = useState(null);

  const [emailDetails, setEmailDetails] = useState([])
  const [selectedEmailID, setSelectedEmailID] = useState("")
  const [showEmailModal, setShowEmailModal] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const dataPerPage = 10;
  const pageCount = Math.ceil(emailData.length / dataPerPage)

  const currentData = emailData.slice(
    currentPage * dataPerPage,
    (currentPage + 1) * dataPerPage
  )

  const handlePageClick = ({selected}) =>{
    setCurrentPage(selected)
  }

  const emailContext = (id, to, subject, body, date, status) => {
    setEmailDetails([{ id, to, subject, body, date , status}]); // Corrected to set an array with a single object
    console.log([{ id, to, subject, body, date, status }]); // Log the new state object
 
    setShowEmailModal(true); // Show the email modal\\
    setSelectedEmailID(id)
    // setShowEmailModal(false)
  }

  const showDeleteModal = (id) => {
    setSelectedEmailID(id)
    console.log(selectedEmailID)
    setShowModal(true)
    
  }

  const hideDeleteModal = () => {
    setShowModal(false)
    setSelectedEmailID(null)
  }

  const closeModal = () => {
    setShowEmailModal(false)
  }




  const deleteEmail = async () => {
    setDisablebutton(true)

    if (loader) {
      setLoader(false)
    } else {
      setLoader(true)
    }
    let response = await fetch(`http://127.0.0.1:8000/api/send-mail/${selectedEmailID}/`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${authTokens.access}`
      }
    })

    if (response.ok) {
      showAlert()
      setMessage('Email Deleted')
      setIsSuccess(true)
      setLoader(false)
      setDisablebutton(false)
      console.log('success')
      setEmailData(emailData.filter(dat => dat.id !== selectedEmailID))
      setShowModal(false)
      setShowEmailModal(false)
    } else{
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
          <div>
            <FloatingAlert
              message={messages}
              isVisible={alertVisible}
              onClose={() => setAlertVisible(false)}
              successs={isSuccess}
            />
          </div>

          {showEmailModal &&
            <section className="overlay-background">
              <div className="admin-email-modal-container">
                <div className="admin-email-modal-content">
                  {emailDetails.length > 0 && (
                    <>
                      <div className="d-flex justify-content-between">
                        <div className="d-flex">
                          <div className="p-1">
                            <FontAwesomeIcon icon={faStarOfLife} />
                          </div>
                          <h4>Email outbox</h4>
                        </div>

                        <div className={`admin-email-modal-content-status ${emailDetails[0].status == 'pending' && 'pending'} ${emailDetails[0].status == 'delivered' ? 'admin-email-success' : 'failed'}`}>
                          <p>{formatName(emailDetails[0].status)}</p>
                        </div>
                      </div>

                      <hr />

                      <div className="row pb-3">
                        <p className="col-1 pt-1">To:</p>
                        <p className="col-8 admin-email-modal-content-input ms-4">{emailDetails[0].to}</p>
                      </div>

                      <div className="row">
                        <p className="col-1 pt-1">Subject:</p>
                        <p className="col-8 admin-email-modal-content-input ms-4">{emailDetails[0].subject}</p>
                      </div>

                      <div className="admin-email-modal-content-message scroll-bar-black">
                        <h6>Message:</h6>
                        <p>{emailDetails[0].body}</p>
                      </div>

                      <div className="mt-3 admin-email-modal-content-date">
                        <p>Date: {emailDetails[0].date}</p>
                      </div>


                      <div className="d-flex justify-content-between py-3">
                        <div></div>
                        <div className='d-flex align-items-center height-100 pe-2'>
                          <button  className="dashboard-submit-btn  admin-email-modal-content-btn me-3" disabled={disablebutton} onClick={deleteEmail}>    
                            <span class={`${loader ? 'dashboard-submit-spinner': ''}`}></span>
                            <span class={`${loader ? 'dashboard-submit-btn-visiblity': ''}`}>Delete</span>
                          </button> 
                          <p className="admin-email-modal-content-btn2 cursor-pointer" onClick={closeModal}>Cancel</p>
                        </div>
                      </div>
                      {/* <div className="d-flex justify-content-between">
                        <div></div>
                        <div>
                          <button onClick={closeModal} className="admin-email-modal-content-btn2">Cancel</button>
                          <button className="admin-email-modal-content-btn" disabled={disablebutton} onClick={deleteEmail}>
                            {loader ? <CircularProgress color="inherit" /> : "Delete"}
                          </button>
                        </div>
                      </div> */}
                      
                    </>
                  )}
                </div>
              </div>
            </section>
          }
          {showModal &&
            <section className="overlay-background">
              <div className="dashboard-modal-container">
                <div className="dashboard-delete-modal-content">
                  <h5>Delete Item?</h5>
                  <hr />
                  <p>This will delete the Item.</p>
                  <div className="d-flex justify-content-between py-3">
                    <div></div>
                    <div className='d-flex align-items-center height-100 pe-2'>
                      <button  className="dashboard-submit-btn  dashboard-btn px-4 py-2 me-3" disabled={disablebutton} onClick={deleteEmail}>    
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
            <div className="d-block d-md-flex justify-content-between align-items-center height-100">
              <div>
                <div>
                  <p className='dashboard-header'>Email Message</p>
                  <p className='light-text'>Total {emailCount} Message Sent</p>
                </div>
              </div>

              <div>
                <div className='d-none d-sm-block'>
                  <Link to='/admin/send-email/' className='dashboard-btn py-2 px-3'>
                    <FontAwesomeIcon className='pe-3' icon={faLocationArrow}/>
                    Send  Email
                  </Link>
                </div>
              </div>
            </div>
          </section>



          <section className='py-5 mt-3'>
            <div className='d-flex justify-content-end'>
              <div className='pb-3'>
                <input type="text" className="p-2 dashboard-search-input" placeholder="search..." value={emailSearch} onChange={(e) => setEmailSearch(e.target.value)} />
              </div>
            </div>
            <div className='dashboard-boxes border-radius-5px dahboard-table  dash-scroll-bar non-wrap-text'>
              <div className=''>
                <table>
                  <thead>
                    <tr>
                      <th className='sm-text-2 py-2'>Email</th>
                      <th className='sm-text-2'>Message</th>
                      <th className='sm-text-2'>Date</th>
                      <th>Status</th>
                      <th></th>
                    </tr>
                  </thead>

                  <tbody>
                    {currentData.length > 0 ? (
                      currentData.map((data) =>(
                        <tr key={data.id} onClick={() => emailContext(data.id, data.to, data.subject, data.body, data.date, data.delivery_status)}  className={`cursor-pointer email-table-row`}> 
                          <td className='py-3'>{data.to}</td>
                          <td><span className='font-bold'>{data.subject} <i class="bi bi-dash-lg"></i></span>{truncateText(data.body, 5)}</td>
                          <td>{formatDateTime(data.date)}</td>
                          <td>
                            <p className={`d-inline py-2 px-3 border-radius-5px  ${data.delivery_status === "delivered" ? "verified-kyc-1": ""} ${data.delivery_status === "pending" ? "pending-kyc": ""}  ${data.delivery_status === "failed" ? "canceled-kyc": ""}`}>{formatName(data.delivery_status)}</p>
                          </td>

                          <td  onClick={(e) => {e.stopPropagation(); showDeleteModal(data.id);}}>
                            <i class="bi bi-trash"></i>
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


              {emailLoader && (
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