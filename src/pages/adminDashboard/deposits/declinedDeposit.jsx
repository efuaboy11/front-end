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

export const DeclinedDeposit = () =>{
  const { authTokens, 
    messages,
    alertVisible,
    setAlertVisible,
    isSuccess,
    showAlert,
    setMessage,
    setIsSuccess,


    OnbodyClick,
    truncateTime,
    formatCurrency,
    formatName,
    disablebutton, 
    setDisablebutton,


    declinedDepositCount,
    declinedDepositData,
    setDeclinedDepositData,
    declinedDepositLoader,

    searchValue,
    setSearchValue,

  } = useContext(AuthContext)


  const [currentPage, setCurrentPage] = useState(0)
  const [selectedDataId, setSelectedDataId] = useState(null);
  const [lastData, setLastData] = useState(null)
  const [secondToLastData, setSecondToLastData] = useState(null);
  const [showModal, setShowModal] = useState(false)
  const [showDropdownMenu, setShowDropdownMenu] = useState(false)
  const [loader, setLoader] = useState(false)
  
  const navigate  = useNavigate()

  const dataPerPage = 10;
  const pageCount = Math.ceil(declinedDepositData.length / dataPerPage)

  const currentData = declinedDepositData.slice(
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

  const IndividualDeposit = async() =>{
    let response = await fetch(`http://127.0.0.1:8000/api/deposits/${selectedDataId}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens.access}`
      }
      
    })
    const data = await response.json()
    localStorage.setItem('TypeOfDeposit', 'Declined')
    localStorage.setItem('TypeOfDepositUrl', '/admin/declined-deposits')
    localStorage.setItem('IndividualDepsoit', JSON.stringify(data))

    if (response.ok){
      navigate(`/admin/all-deposits/${data.id}`)
    }

  }

  const showDeleteModal = () => {
    setShowModal(true)
    setShowDropdownMenu(false)
  }

  const deleteItem = async () => {
    setDisablebutton(true)
    setLoader(true)

    try{
      let response = await fetch(`http://127.0.0.1:8000/api/deposits/${selectedDataId}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${authTokens.access}`
        }
      })

      if (response.ok) {
        setLoader(false)
        setDisablebutton(false)
        setDeclinedDepositData(declinedDepositData.filter(dat => dat.id !== selectedDataId))
        setShowModal(false)
        showAlert()
        setMessage('Deposit successfully deleted')
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
      <div className="position-sticky">
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
                <div className="dashboard-modal-content">
                  <h5>Delete Item?</h5>
                  <hr />
                  <p>This will delete the Item.</p>
                  <div className="d-flex justify-content-between py-3">
                    <div></div>
                    <div>
                      <button className="dashboard-modal-close mx-3" onClick={hideDeleteModal}>Cancel</button>
                      <button className="dashboard-modal-delete" disabled={disablebutton} onClick={deleteItem}>{loader ? <CircularProgress color="inherit" size={20} /> : "Delete"}</button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          }


          <section className='py-4'>
            <div className="d-flex justify-content-between align-items-center height-100">
              <div>
                <div>
                  <p className='lg-text'>Declined Deposits</p>
                  <p className='light-text'>Total {declinedDepositCount} declined deposit</p>
                </div>
              </div>

              <div>
                <div className='d-none d-sm-block'>
                  <Link className='dashboard-btn p-3'>
                    <i class="bi bi-plus-circle pe-2"></i>
                    Add deposit
                  </Link>
                </div>
              </div>
            </div>
          </section>



          <section className='py-5 mt-3'>
            <div className='d-flex justify-content-end'>
              <div className='pb-3'>
                <input type="text" className="p-2 dashboard-search-input" placeholder="search..." value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
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
                          <td >{data.transaction_id} <br /> <span className="sm-text-2">via {data.payment_method_details.name}</span></td>
                          <td>{formatCurrency(data.amount)} USD</td>
                          <td>{truncateTime(data.created_at)}</td>
                          <td><p p className={`dashboard-status ps-3 ${data.status === "pending" ? "pending" : "sucessfull"} ${data.status === "declined" && "failed"}`}>{formatName(data.status)}</p></td>                         
                          <td>
                            <div className='dashboard-table-btn'>
                              <i onClick={() => toggleDropdown(data.id)} class="bi bi-three-dots cursor-pointer"></i>

                              {(selectedDataId === data.id && showDropdownMenu) && (
                                <div className={`dashboard-table-menu ${(data.id === lastData?.id || data.id === secondToLastData?.id)? 'dashboard-table-menu-up': 'dashboard-table-menu-down'}`}>
                                  <div>
                                    <p onClick={IndividualDeposit} className='py-2 dashboard-table-menu-btn cursor-pointer'>
                                      <i class="bi bi-eye-fill pe-1"></i> View Details
                                    </p>
                                    <p className='py-2 dashboard-table-menu-btn cursor-pointer'>
                                      <i class="bi bi-person pe-1"></i> User Profile
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


              {declinedDepositLoader && (
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