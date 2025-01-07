import '../../../css/dashboardCss/dashboard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AuthContext from "../../../context/AuthContext";
import { useContext, useEffect, useState } from 'react';
import { AdminDashFrame } from '../../../component/adminDashFrame';
import ReactPaginate  from "react-paginate"
import { Link, useNavigate } from 'react-router-dom';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import FloatingAlert from '../../../component/alert';
import spin from '../../../img/Spin.gif'
import AllDataContext from '../../../context/Alldata';
import { useForm } from 'react-hook-form';
import { DashboardFooter } from '../../../component/dashbaordFooter';

export const AllInterest = () =>{
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


  } = useContext(AuthContext)


  const {

    interestCount,
    interestData,
    interestLoader,
    interestSearch,
    setInterestSearch,
    InterestFunction,
    filterInterest,

  } = useContext(AllDataContext)

  useEffect(() =>{
    if(!interestSearch){
      InterestFunction()
    }else if(interestSearch){
      filterInterest()
    }
  }, [interestSearch])


  const [currentPage, setCurrentPage] = useState(0)
  const [loader, setLoader] = useState(false)
  const [addInterestModal, setAddInterestModal] = useState(false)
  const [user, setUser] = useState('')
  const [investmentID, setInvestmentID] = useState('')
  const [amount, setAmount] = useState('')
  const [interestbtnLoder, setInterestbtnLoder] = useState(false)
  
  const navigate  = useNavigate()

  const dataPerPage = 10;
  const pageCount = Math.ceil(interestData.length / dataPerPage)

  const currentData = interestData.slice(
    currentPage * dataPerPage,
    (currentPage + 1) * dataPerPage
  )

  const handlePageClick = ({selected}) =>{
    setCurrentPage(selected)
  }

  const showAddIntrest = () =>{
    setAddInterestModal(true)
  }

  const HideAddIntrest = () =>{
    setAddInterestModal(false)

  }


  const AddInterestFunction = async () => {
    setDisablebutton(true)

    try{
      let response = await fetch(`http://127.0.0.1:8000/api/investment-intrest/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authTokens.access}`,
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          user: user,
          investment_id: investmentID,
          amount: amount
        })
      })

      if (response.ok) {
        setDisablebutton(false)
        HideAddIntrest()
        showAlert()
        setIsSuccess(true)
        setMessage('Interest  added successfully')
        setInterestbtnLoder(false)
      } else {
        const errorData = await response.json()
        const errorMessages = Object.values(errorData)
        .flat()
        .join(', ');
        setMessage(errorMessages)
        showAlert()
        setIsSuccess(false)
        setDisablebutton(false)
        setInterestbtnLoder(false)
      }

    }catch{
      showAlert()
      setMessage('An unexpected error occurred.');
      setDisablebutton(false)
      setIsSuccess(false)
      setInterestbtnLoder(false)

    }
  }

  const {
    usersData,
    UsersFunction

  } = useContext(AllDataContext)


  useEffect(() =>{
    UsersFunction()

  }, [])
  const onSubmit = (data, e) =>{
    setDisablebutton(true)
    setInterestbtnLoder(true)
    if(isValid){
      AddInterestFunction(e)
    }else{
      setDisablebutton(false)
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
        {addInterestModal &&
            <section className="overlay-background">
              <div className="dashboard-modal-conatiner">
                <div className="dashboard-modal-content">
                  <div>
                    <p className='dashboard-header'> Add Interest</p>
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
                          <label htmlFor="" className="p-2 ">Investment ID</label>
                          <input type="text" className={`dashboard-input ${errors.investmentID ? 'error-input' : ''}`} {...register('investmentID', {required: true})}  value={investmentID} onChange={(e) => setInvestmentID(e.target.value)} placeholder="EE2A3D4001E9291C" />
                          {errors.investmentID && <span style={{color: 'red'}}>This Feild is required</span>} 
                        </div>

                        <div className="col-sm-6">
                          <label htmlFor="" className="p-2 ">Amount</label>
                          <input type="text" className={`dashboard-input ${errors.amount ? 'error-input' : ''}`} {...register('amount', {required: true})}  value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.00" />
                          {errors.amount && <span style={{color: 'red'}}>This Feild is required</span>} 
                        </div>

                        <div className='col-12 pt-4 mt-1'>
                          <div className="d-flex height-100 align-items-center">
                            <div className='pe-4'>
                            <button  className="dashboard-submit-btn  dashboard-btn py-2 px-4" type="submit" disabled={disablebutton}>    
                              <span class={`${interestbtnLoder ? 'dashboard-submit-spinner': ''}`}></span>
                              <span class={`${interestbtnLoder ? 'dashboard-submit-btn-visiblity': ''}`}>Add Investment</span>
                            </button>
                            </div>
                            <p onClick={HideAddIntrest}  className='light-link cursor-pointer'>Cancel</p>
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
            <div className="d-block d-md-flex justify-content-between align-items-center height-100">
              <div>
                <div>
                  <p className='dashboard-header'>All Interest</p>
                  <p className='light-text'>Total {interestCount} all interest</p>
                </div>
              </div>

              <div>
                <div className='pt-3'>
                  <button onClick={showAddIntrest} className='dashboard-btn py-2 px-3'>
                    <i class="bi bi-plus-lg pe-2"></i>
                    Add Interest
                  </button>
                </div>
              </div>
            </div>
          </section>



          <section className='py-5 mt-3'>
            <div className='d-flex justify-content-end'>
              <div className='pb-3'>
                <input type="text" className="p-2 dashboard-search-input" placeholder="search..." value={interestSearch} onChange={(e) => setInterestSearch(e.target.value)} />
              </div>
            </div>
            <div className='dashboard-boxes border-radius-5px dahboard-table  dash-scroll-bar non-wrap-text'>
              <div className=''>
                <table>
                  <thead>
                    <tr>
                      <th className='sm-text-2 py-2'>Name</th>
                      <th className='sm-text-2'>Investment ID</th>
                      <th className='sm-text-2'>Amount</th>
                      <th className='sm-text-2'>Date</th>
                      <th></th>
                    </tr>
                  </thead>

                  <tbody>
                    {currentData.length > 0 ? (
                      currentData.map((data) =>(
                        <tr key={data.id}> 
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
                          <td >{data.investment_id}</td>
                          <td>{formatCurrency(data.amount)} USD</td>
                          <td>{formatDateTime(data.created_at)}</td>
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


              {interestLoader && (
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

      <div className='mt-5 py-3'>
        <DashboardFooter/>
      </div>


    </div>
  )
}