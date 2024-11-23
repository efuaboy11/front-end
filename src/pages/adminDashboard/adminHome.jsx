import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faBan, faChartLine, faCircleDollarToSlot, faCreditCard,  faHandHoldingDollar, faMailBulk, faMoneyBillTransfer} from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom";
import { useState, useContext, useEffect} from "react";
import AuthContext from "../../context/AuthContext";
import '../../css/dashboardCss/dashboard.css'
import '../../css/dashboardCss/adminDahboardCss/adminHome.css'
import { AdminDashFrame } from "../../component/adminDashFrame";
import '../../css/style.css'
import headerPic from '../../img/headerPic.png'
import { DepositBarChart, KYCDoughnutChart, UserChart, WithdrawtBarChart } from "../../component/chatFrame";
import spin from '../../img/Spin.gif'
import AllDataContext from '../../context/Alldata';
export const AdminHome = () =>{
  const [timeofDay, setTimeOfDay] = useState('')

  const [showDeposit, setShowDeposit] = useState(true)
  const [showPendingDeposit, setShowPendingDeposit] = useState(false)
  const [showDeclinedDeposit, setShowDeclinedDeposit] = useState(false)
  const [showSuccessfulDeposit, setShowSuccessfulDeposit] = useState(false) 

  const [showWithdraw, setShowWithdraw] = useState(true)
  const [showPendingWithdraw, setShowPendingWithdraw] = useState(false)
  const [showDeclinedWithdraw, setShowDeclinedWithdraw] = useState(false)
  const [showSuccessfulWithdraw, setShowSuccessfulWithdraw] = useState(false) 

  const toggleShowDeposit = () =>{
    if(!showDeposit){
      setShowDeposit(!showDeposit)
    }
    setShowPendingDeposit(false)
    setShowDeclinedDeposit(false)
    setShowSuccessfulDeposit(false)


  }

  const toggleShowPendingDeposit = () =>{
    if(!showPendingDeposit){
      setShowPendingDeposit(!showPendingDeposit)
    }
    setShowDeposit(false)
    setShowDeclinedDeposit(false)
    setShowSuccessfulDeposit(false)


  }

  const toggleShowDeclinedDeposit = () =>{
    if(!showDeclinedDeposit){
      setShowDeclinedDeposit(!showDeclinedDeposit)
    }
    setShowDeposit(false)
    setShowPendingDeposit(false)
    setShowSuccessfulDeposit(false)


  }

  const toggleShowSuccessfulDeposit = () =>{
    if(!showSuccessfulDeposit){
      setShowSuccessfulDeposit(!showSuccessfulDeposit)
    }
    setShowDeposit(false)
    setShowPendingDeposit(false)
    setShowDeclinedDeposit(false)


  }



  const toggleShowWithdraw = () =>{
    if(!showWithdraw){
      setShowWithdraw(!showWithdraw)
    }
    setShowPendingWithdraw(false)
    setShowDeclinedWithdraw(false)
    setShowSuccessfulWithdraw(false)


  }

  const toggleShowPendingWithdraw = () =>{
    if(!showPendingWithdraw){
      setShowPendingWithdraw(!showPendingWithdraw)
    }
    setShowWithdraw(false)
    setShowDeclinedWithdraw(false)
    setShowSuccessfulWithdraw(false)


  }

  const toggleShowDeclinedWithdraw = () =>{
    if(!showDeclinedWithdraw){
      setShowDeclinedWithdraw(!showDeclinedWithdraw)
    }
    setShowWithdraw(false)
    setShowPendingWithdraw(false)
    setShowSuccessfulWithdraw(false)


  }

  const toggleShowSuccessfulWithdraw = () =>{
    if(!showSuccessfulWithdraw){
      setShowSuccessfulWithdraw(!showSuccessfulWithdraw)
    }
    setShowWithdraw(false)
    setShowPendingWithdraw(false)
    setShowDeclinedWithdraw(false)


  }


  

  





  const {  
    OnbodyClick,
    formatDate,
    formatCurrency,
    formatName,
    shortName,


  } = useContext(AuthContext)



  const {
    depositCount,
    successDespositCount,
    pendingDespositCount,
    declinedDepositCount,
    recentDeposit,
    totalDeposit,
    recentPendingDeposit,
    recentSuccessfulDeposit,
    recentDeclinedDeposit,
    depositLoader,
    pendingDepositLoader,
    declinedDepositLoader,
    successfulDepositLoader,


    withdrawCount,
    SuccessWithdrawCount,
    pendingWithdrawCount,
    declinedWithdrawCount,
    recentWithdraw,
    recentPendingWithdraw,
    recentSuccessfulWithdraw,
    recentDeclinedWithdraw,
    withdrawLoader,
    pendingWithdrawLoader,
    declinedWithdrawLoader,
    successfulWithdrawLoader,
    totalWithdraw,


    investmentCount,
    activeInvestmentCount,
    completedInvestmentCount,
    pendingInvestmentCount,
    declinedInvestmentCount,

    recentUserData,
    usersDataLoader,
    usersCount,
    disableUserCount,
    userVerificationCount,
    pendingUserVerificationCount,
    canceledUserVerificationCount,
    unverifiedUserCount,
    verifiedUserCount,

    KYCsCount,
    notUploadKYCsCount,
    verifiedKYCsCount,
    canceledKYCsCount,
    pendingKYCsCount,


    emailCount,
    investmentPlanCount,
    paymentOptionsCount,

    totalBonus,
    bonusData,


    blackListCount,
    newsLetterCount,

    DepositFunction,
    SuccessfulDepositFunction,
    DeclinedDepositFunction,
    PendingDepositFunction,


    WithdrawFunction,
    SuccessfulWithdrawFunction,
    PendingWithdrawFunction,
    DeclinedWithdrawFunction,

    InvestmentFunction,
    ActiveInvestmentFunction,
    PendingInvestmentFunction,
    CompletedInvestmentFunction,
    DeclinedInvestmentFunction,

    UsersFunction,
    DisableUsersFunction,
    PendingUserVerficationFunction,
    CanceledUserVerificationFunction,
    UnverifiedUserFunction,
    verifiedUserFunction,
    UserVerificationFunction,

    KYCFunction,
    NotUploadKYCFunction,
    VerifiedKYCFunction,
    CanceledKYCFunction,
    PendingKYCFunction,

    PaymentOptionsFunction,

    InvestmentPlanFunction,
    EmailFunction,
    BonusFunction,
    BlackListFunction,
    NewsLetterFunction,






  } = useContext(AllDataContext)


  useEffect(() =>{
    DepositFunction()
    SuccessfulDepositFunction()
    DeclinedDepositFunction()
    PendingDepositFunction()


    WithdrawFunction()
    SuccessfulWithdrawFunction()
    PendingWithdrawFunction()
    DeclinedWithdrawFunction()


    InvestmentFunction()
    ActiveInvestmentFunction()
    PendingInvestmentFunction()
    CompletedInvestmentFunction()
    DeclinedInvestmentFunction()

    UsersFunction()
    DisableUsersFunction()
    PendingUserVerficationFunction()
    CanceledUserVerificationFunction()
    UnverifiedUserFunction()
    verifiedUserFunction()
    UserVerificationFunction()

    KYCFunction()
    NotUploadKYCFunction()
    VerifiedKYCFunction()
    CanceledKYCFunction()
    PendingKYCFunction()

    PaymentOptionsFunction()

    InvestmentPlanFunction()
    EmailFunction()
    BonusFunction()
    BlackListFunction()
    NewsLetterFunction()

  }, [

  ])

  useEffect(() =>{
    const updateGreeting = () =>{
      const currentHour = new Date().getHours()
      console.log(currentHour)

      if(currentHour >=0 && currentHour < 12){
        setTimeOfDay('Morning')
      }else if(currentHour >= 12 && currentHour < 16){
        setTimeOfDay('Afternoon')
      }else if(currentHour >= 16 && currentHour < 24){
        setTimeOfDay('Evening')
      }
    }

    updateGreeting()

    const interval = setInterval(updateGreeting, 60 * 60 * 1000)

    return () => clearInterval(interval)
  }, [])


  return(
    <div>
      <div className="position-sticky1">
        <AdminDashFrame />
      </div>
      <div className="main-content" onClick={OnbodyClick}>
        <div className="container-xl">
          <section>
            <div className="d-flex justify-content-between align-items-center admin-home-header">
              <div>
                <h2 className="pb-3">Good {timeofDay}, AmanlightEquity!</h2>
                <p className="pb-1 light-text">"Dream big and dare to fail."</p>      
                <p className="light-text">-Unknown</p> 
              </div>   

              <div className="d-none d-lg-block">
                <img src={headerPic} alt="" width='270px' className="pt-5"/>
              </div>        
            </div>
          </section>



          <section>
            <div className="row g-4">
              <div className="col-md-4 col-sm-6 col-xxl-3">
                <div className="d-flex justify-content-between dashboard-boxes border-radius-5px p-3">
                  <div className="">
                    <p className="pt-1">Total Users</p>
                    <h1 className="pt-4 pb-2">{usersCount}</h1>
                  </div>
                  <i class="bi bi-people-fill lg-text"></i>
                </div>
              </div>

              <div className="col-md-4 col-sm-6 col-xxl-3">
                <div className="d-flex justify-content-between dashboard-boxes border-radius-5px p-3">
                  <div className="">
                    <p className="pt-1">Verified Users</p>
                    <h1 className="pt-4 pb-2">{verifiedUserCount}</h1>
                  </div>
                  <i class="bi bi-person-check-fill lg-text"></i>
                </div>
              </div>

              <div className="col-md-4 col-sm-6 col-xxl-3">
                <div className="d-flex justify-content-between dashboard-boxes border-radius-5px p-3">
                  <div className="">
                    <p className="pt-1">Unverified Users</p>
                    <h1 className="pt-4 pb-2">{unverifiedUserCount}</h1>
                  </div>
                  <i class="bi bi-person-fill-exclamation lg-text"></i>
                </div>
              </div>

              <div className="col-md-4 col-sm-6 col-xxl-3">
                <div className="d-flex justify-content-between dashboard-boxes border-radius-5px p-3">
                  <div className="">
                    <p className="pt-1">Blocked Users</p>
                    <h1 className="pt-4 pb-2">{disableUserCount}</h1>
                  </div>
                  <i class="bi bi-person-x-fill lg-text"></i>
                </div>
              </div>

              <div className="col-md-4 col-sm-6 col-xxl-3">
                <div className="d-flex justify-content-between dashboard-boxes border-radius-5px p-3">
                  <div className="">
                    <p className="pt-1">Active Investments</p>
                    <h1 className="pt-4 pb-2">{activeInvestmentCount}</h1>
                  </div>
                  <FontAwesomeIcon icon={faChartLine} className="lg-text"/>
                </div>
              </div>

              <div className="col-md-4 col-sm-6 col-xxl-3">
                <div className="d-flex justify-content-between dashboard-boxes border-radius-5px p-3">
                  <div className="">
                    <p className="pt-1">Pending Investments</p>
                    <h1 className="pt-4 pb-2">{pendingInvestmentCount}</h1>
                  </div>
                  <i class="bi bi-coin lg-text"></i>
                </div>
              </div>

              <div className="col-md-4 col-sm-6 col-xxl-3">
                <div className="d-flex justify-content-between dashboard-boxes border-radius-5px p-3">
                  <div className="">
                    <p className="pt-1">Completed Investment</p>
                    <h1 className="pt-4 pb-2">{completedInvestmentCount}</h1>
                  </div>
                  <i class="bi bi-check2-square lg-text"></i>
                </div>
              </div>

              <div className="col-md-4 col-sm-6 col-xxl-3">
                <div className="d-flex justify-content-between dashboard-boxes border-radius-5px p-3">
                  <div className="">
                    <p className="pt-1">Canceled Investment</p>
                    <h1 className="pt-4 pb-2">{declinedInvestmentCount}</h1>
                  </div>
                  <i class="bi bi-x-square lg-text"></i>
                </div>
              </div>


              <div className="col-md-4 col-sm-6">
                <div className="d-flex justify-content-between dashboard-boxes border-radius-5px p-3">
                    <div className="">
                      <p className="pt-1">Total Deposit</p>
                      <p className="pt-4 pb-2 sm-text"><span className="md-text">{formatCurrency(totalDeposit)}</span> USD</p>
                    </div>
                    <FontAwesomeIcon className='lg-text' icon={faHandHoldingDollar}/>
                </div>      
              </div>

              <div className="col-md-4 col-sm-6">
                <div className="d-flex justify-content-between dashboard-boxes border-radius-5px p-3">
                    <div className="">
                      <p className="pt-1">Total Withdraw</p>
                      <p className="pt-4 pb-2 sm-text"><span className="md-text">{formatCurrency(totalWithdraw)}</span> USD</p>
                    </div>
                    <FontAwesomeIcon className='lg-text' icon={faMoneyBillTransfer}/>
                </div>      
              </div>

              <div className="col-md-4 col-sm-6">
                <div className="d-flex justify-content-between dashboard-boxes border-radius-5px p-3">
                    <div className="">
                      <p className="pt-1">Total Bonus</p>
                      <p className="pt-4 pb-2 sm-text"><span className="md-text">{formatCurrency(totalBonus)}</span> USD</p>
                    </div>
                    <i class="bi bi-gift lg-text"></i>
                </div>      
              </div>




              <section className="col-md-6 ">
                <div className="dashboard-boxes border-radius-5px ps-3">
                  <div className="py-4">
                    <h6>Deposit Transactions</h6>
                    <p className="sm-text-2">All deposit transactions made by your users</p>
                  </div>
                  <div className="d-flex">
                    <div>
                      <h3 className="pb-1 pe-5">{depositCount}</h3>
                      <p className="sm-text-2">Total</p>
                    </div>

                    <div>
                      <h3 className="pb-1 pe-5 me-4">{pendingDespositCount}</h3>
                      <p className="sm-text-2">Pending</p>
                    </div>

                    <div>
                      <h3 className="pb-1 pe-5 me-4">{successDespositCount}</h3>
                      <p className="sm-text-2">Confirm</p>
                    </div>

                    <div>
                      <h3 className="pb-1 pe-5">{declinedDepositCount}</h3>
                      <p className="sm-text-2">Declined</p>
                    </div>
                  </div>
                  <div className="py-3">
                    <DepositBarChart
                      declinedDepositCount={declinedDepositCount} 
                      pendingDespositCount={pendingDespositCount} 
                      successDespositCount={successDespositCount} 
                      depositCount={depositCount} 
                    />
                  </div>

                </div>
              </section>

              <section className="col-md-6">
                <div className=" dashboard-boxes  border-radius-5px ps-3">
                  <div className="py-4">
                    <h6>Withdrawal Transactions</h6>
                    <p className="sm-text-2">All withdrawal transactions made by your users</p>
                  </div>
                  <div className="d-flex">
                    <div>
                      <h3 className="pb-1 pe-5">{withdrawCount}</h3>
                      <p className="sm-text-2">Total</p>
                    </div>

                    <div>
                      <h3 className="pb-1 pe-5 me-4">{pendingWithdrawCount}</h3>
                      <p className="sm-text-2">Pending</p>
                    </div>

                    <div>
                      <h3 className="pb-1 pe-5 me-4">{SuccessWithdrawCount}</h3>
                      <p className="sm-text-2">Confirm</p>
                    </div>

                    <div>
                      <h3 className="pb-1 pe-5">{declinedWithdrawCount}</h3>
                      <p className="sm-text-2">Declined</p>
                    </div>
                  </div>
                  <div className="py-3">
                    <WithdrawtBarChart
                      declinedWithdrawCount={declinedWithdrawCount} 
                      pendingWithdrawCount={pendingWithdrawCount} 
                      successWithdrawCount={SuccessWithdrawCount} 
                      withdrawCount={withdrawCount} 
                    />
                  </div>

                </div>
              </section>

              <section className="col-lg-6 ">
                <div className="admin-home-dahboard-table non-wrap-text dashboard-boxes border-radius-5px">
                  <div className="p-3 py-4">
                    <div className="row">
                      <div className="col-sm-3">
                        <div className="py-2">
                          <h6>Recent Deposit</h6>
                        </div>
                      </div>

                      <div className="col-sm-9">
                        <div className="d-sm-flex d-block justify-content-end">
                          <div className="d-sm-flex d-block">
                            <div className="overflow-auto scroll-bar dashboard-boxes  border-radius-10px">
                              <div className="d-flex ">
                                <p onClick={toggleShowDeposit} className={`ps-3 pe-2 me-2 ${showDeposit? "blue-background": ""} border-radius-10px cursor-pointer`}>All</p>
                                <p onClick={toggleShowPendingDeposit} className={`ps-3 pe-2 me-2 ${showPendingDeposit ? "blue-background": ""} border-radius-10px cursor-pointer`}>Pending</p>
                                <p onClick={toggleShowDeclinedDeposit} className={`ps-3 pe-2 me-2 ${showDeclinedDeposit ? "blue-background": ""} border-radius-10px cursor-pointer`}>Declined</p>
                                <p onClick={toggleShowSuccessfulDeposit} className={`ps-3 pe-2  ${showSuccessfulDeposit ? "blue-background": ""} border-radius-10px cursor-pointer`}>Sucessful</p>
                              </div>
                            </div>
                            <div className="d-none d-sm-block dashboard-boxes ms-1 px-2  border-radius-10px">
                              <p>See All</p>
                            </div>

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="scroll-bar">
                    <table className="overflow-auto ">
                      <thead>
                        <tr>
                          <th className="sm-text-2 ps-4">Name</th>
                          <th className="sm-text-2">Amount</th>
                          <th className="sm-text-2">Date Created</th>
                        </tr>
                      </thead>
                
                      {showDeposit &&
                        <>    
                          <tbody>
                            {recentDeposit.length > 0 ? (
                              recentDeposit.map((deposit) =>(
                                <tr key={deposit.id}>
                                  <td className="ps-4 py-2">{deposit.user_details.full_name}<br /> <span className="sm-text-2">{deposit.user_details.email}</span></td>
                                  <td>+{deposit.amount}<span className="sm-text-2">USD</span></td>
                                  <td>{formatDate(deposit.created_at)}</td>
                                </tr>
                              ))
                            ): (
                                <tr>
                                  <td className="ps-4 py-2">No details available</td>
                                </tr>
                            )}
                          </tbody>      
                        </>               
                      } 


                      {showPendingDeposit &&          
                        <tbody>
                          {recentPendingDeposit.length > 0 ? (
                            recentPendingDeposit.map((deposit) =>(
                              <tr key={deposit.id}>
                                <td className="ps-4 py-2">{deposit.user_details.full_name}<br /> <span className="sm-text-2">{deposit.user_details.email}</span></td>
                                <td>+{deposit.amount}<span className="sm-text-2">USD</span></td>
                                <td>{formatDate(deposit.created_at)}</td>
                              </tr>
                            ))
                          ): (
                              <tr>
                                <td className="ps-4 py-2">No details available</td>
                              </tr>
                          )}


                        </tbody>                 
                      } 


                      {showDeclinedDeposit &&          
                        <tbody>
                          {recentDeclinedDeposit.length > 0 ? (
                            recentDeclinedDeposit.map((deposit) =>(
                              <tr key={deposit.id}>
                                <td className="ps-4 py-2">{deposit.user_details.full_name}<br /> <span className="sm-text-2">{deposit.user_details.email}</span></td>
                                <td>+{deposit.amount}<span className="sm-text-2">USD</span></td>
                                <td>{formatDate(deposit.created_at)}</td>
                              </tr>
                            ))
                          ): (
                              <tr>
                                <td className="ps-4 py-2">No details available</td>
                              </tr>
                          )}


                        </tbody>                 
                      } 

                      {showSuccessfulDeposit &&          
                        <tbody>
                          {recentSuccessfulDeposit.length > 0 ? (
                            recentSuccessfulDeposit.map((deposit) =>(
                              <tr key={deposit.id}>
                                <td className="ps-4 py-2">{deposit.user_details.full_name}<br /> <span className="sm-text-2">{deposit.user_details.email}</span></td>
                                <td>+{deposit.amount}<span className="sm-text-2">USD</span></td>
                                <td>{formatDate(deposit.created_at)}</td>
                              </tr>
                            ))
                          ): (
                              <tr>
                                <td className="ps-4 py-2">No details available</td>
                              </tr>
                          )}


                        </tbody>                 
                      } 



                    </table>
                  </div>
                  {(depositLoader || pendingDepositLoader || declinedDepositLoader || successfulDepositLoader) && (
                    <div className="d-flex justify-content-center pt-4">
                      <img src={spin} alt="" width='60px'/>
                    </div>  
                                
                  )}
                </div>
              </section>


              <section className="col-lg-6 ">
                <div className="admin-home-dahboard-table non-wrap-text dashboard-boxes border-radius-5px">

                  <div className="p-3 py-4">
                    <div className="row">
                      <div className="col-sm-3">
                        <div className="py-2">
                          <h6>Recent Withdraw</h6>
                        </div>
                      </div>

                      <div className="col-sm-9">
                        <div className="d-sm-flex d-block justify-content-end">
                          <div className="d-sm-flex d-block">
                            <div className="overflow-auto scroll-bar dashboard-boxes  border-radius-10px">
                              <div className="d-flex ">
                                <p onClick={toggleShowWithdraw} className={`ps-3 pe-2 me-2 ${showWithdraw? "red-background": ""} border-radius-10px cursor-pointer`}>All</p>
                                <p onClick={toggleShowPendingWithdraw} className={`ps-3 pe-2 me-2 ${showPendingWithdraw ? "red-background": ""} border-radius-10px cursor-pointer`}>Pending</p>
                                <p onClick={toggleShowDeclinedWithdraw} className={`ps-3 pe-2 me-2 ${showDeclinedWithdraw ? "red-background": ""} border-radius-10px cursor-pointer`}>Declined</p>
                                <p onClick={toggleShowSuccessfulWithdraw} className={`ps-3 pe-2  ${showSuccessfulWithdraw ? "red-background": ""} border-radius-10px cursor-pointer`}>Sucessful</p>
                              </div>
                            </div>
                            <div className="d-none d-sm-block dashboard-boxes ms-1 px-2  border-radius-10px">
                              <p>See All</p>
                            </div>

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="scroll-bar">
                    <table className="overflow-auto ">
                      <thead>
                        <tr>
                          <th className="sm-text-2 ps-4">Name</th>
                          <th className="sm-text-2">Amount</th>
                          <th className="sm-text-2">Date Created</th>
                        </tr>
                      </thead>
                
                      {showWithdraw &&          
                        <tbody>
                          {recentWithdraw.length > 0 ? (
                            recentWithdraw.map((withdraw) =>(
                              <tr key={withdraw.id}>
                                <td className="ps-4 py-2">{withdraw.user_details.full_name}<br /> <span className="sm-text-2">{withdraw.user_details.email}</span></td>
                                <td>-{withdraw.amount}<span className="sm-text-2">USD</span></td>
                                <td>{formatDate(withdraw.created_at)}</td>
                              </tr>
                            ))
                          ): (
                              <tr>
                                <td className="ps-4 py-2">No details available</td>
                              </tr>
                          )}
                        </tbody>                 
                      } 


                      {showPendingWithdraw &&          
                        <tbody>
                          {recentPendingWithdraw.length > 0 ? (
                            recentPendingWithdraw.map((withdraw) =>(
                              <tr key={withdraw.id}>
                                <td className="ps-4 py-2">{withdraw.user_details.full_name}<br /> <span className="sm-text-2">{withdraw.user_details.email}</span></td>
                                <td>-{withdraw.amount}<span className="sm-text-2">USD</span></td>
                                <td>{formatDate(withdraw.created_at)}</td>
                              </tr>
                            ))
                          ): (
                              <tr>
                                <td className="ps-4 py-2">No details available</td>
                              </tr>
                          )}


                        </tbody>                 
                      } 


                      {showDeclinedWithdraw &&          
                        <tbody>
                          {recentDeclinedWithdraw.length > 0 ? (
                            recentDeclinedWithdraw.map((withdraw) =>(
                              <tr key={withdraw.id}>
                                <td className="ps-4 py-2">{withdraw.user_details.full_name}<br /> <span className="sm-text-2">{withdraw.user_details.email}</span></td>
                                <td>-{withdraw.amount}<span className="sm-text-2">USD</span></td>
                                <td>{formatDate(withdraw.created_at)}</td>
                              </tr>
                            ))
                          ): (
                              <tr>
                                <td className="ps-4 py-2">No details available</td>
                              </tr>
                          )}


                        </tbody>                 
                      } 

                      {showSuccessfulWithdraw &&          
                        <tbody>
                          {recentSuccessfulWithdraw.length > 0 ? (
                            recentSuccessfulWithdraw.map((withdraw) =>(
                              <tr key={withdraw.id}>
                                <td className="ps-4 py-2">{withdraw.user_details.full_name}<br /> <span className="sm-text-2">{withdraw.user_details.email}</span></td>
                                <td>-{withdraw.amount}<span className="sm-text-2">USD</span></td>
                                <td>{formatDate(withdraw.created_at)}</td>
                              </tr>
                            ))
                          ): (
                              <tr>
                                <td className="ps-4 py-2">No details available</td>
                              </tr>
                          )}


                        </tbody>                 
                      } 



                    </table>
                  </div>

                  {(withdrawLoader || pendingWithdrawLoader || declinedWithdrawLoader || successfulWithdrawLoader) && (
                    <div className="d-flex justify-content-center pt-4">
                      <img src={spin} alt="" width='60px'/>
                    </div>  
                                
                  )}

                </div>
              </section>

              <section className="col-md-6">
              <div className="row g-4 pb-4">
                  <div className="col-sm-6">
                    <div className="d-flex justify-content-between dashboard-boxes border-radius-5px p-3">
                        <div className="">
                          <p className="pt-1">Investment Plans</p>
                          <p className="pt-4 pb-2 sm-text"><span className="md-text">{investmentPlanCount}</span></p>
                        </div>
                        <FontAwesomeIcon className='lg-text' icon={faCircleDollarToSlot}/>
                    </div>      
                  </div>

                  <div className="col-sm-6">
                    <div className="d-flex justify-content-between dashboard-boxes border-radius-5px p-3">
                        <div className="">
                          <p className="pt-1">Payment Options</p>
                          <p className="pt-4 pb-2 sm-text"><span className="md-text">{paymentOptionsCount}</span></p>
                        </div>
                        <FontAwesomeIcon className='lg-text' icon={faCreditCard}/>
                    </div>      
                  </div>

                  <div className="col-sm-6">
                    <div className="d-flex justify-content-between dashboard-boxes border-radius-5px p-3">
                        <div className="">
                          <p className="pt-1">Blacklisted IP</p>
                          <p className="pt-4 pb-2 sm-text"><span className="md-text">{blackListCount}</span> </p>
                        </div>
                        <FontAwesomeIcon className='lg-text' icon={faBan}/>
                    </div>      
                  </div>

                  <div className="col-sm-6">
                    <div className="d-flex justify-content-between dashboard-boxes border-radius-5px p-3">
                        <div className="">
                          <p className="pt-1">Subscribers</p>
                          <p className="pt-4 pb-2 sm-text"><span className="md-text">{newsLetterCount}</span></p>
                        </div>
                        <FontAwesomeIcon className='lg-text' icon={faMailBulk}/>
                    </div>      
                  </div>
                </div>
                <div className="dashboard-boxes border-radius-5px">
                  <div className="d-flex justify-content-between border-bottom1 py-3 px-3">
                    <h6>Latest Users</h6>
                    <Link className="light-link">User List</Link>
                  </div>
                  {recentUserData.length > 0 ? (
                    recentUserData.map((user) =>(
                      <div key={user.id}>
                        <div className="d-flex justify-content-between py-3 px-3 border-bottom1">
                          <div className="d-flex">
                            <div>
                              {user.profile_photo === null ? (
                                <div className="position-relative1">
                                  <h6 className="admin-home-user-table-icon">{shortName(user.full_name)}</h6>
                                  <p className={`admin-home-user-table-icon-status ${user.status === "verified" ? "sucessfull-bg" : "pending"}`}></p>
                                </div>
                                ): (
                                  <div className="position-relative1">
                                    <img className='admin-home-user-table-img' src={user.profile_photo} alt="" />
                                    <p className={`admin-home-user-table-icon-status ${user.status === "verified" ? "sucessfull-bg" : "pending"}`}></p>
                                  </div>


                                )
                              } 
                            </div>
                            <div>
                              <p>{formatName(user.full_name)}</p>
                              <p className="sm-text-2">{user.email}</p>
                            </div>
  
                          </div>
                          <div className="admin-home-user-table-arrow pt-1 cursor-pointer">
                            <i class="bi bi-chevron-right sm-text"></i>
                          </div>
                        </div>
                      </div>
                    ))


                  ): (
                    <p className=" border-bottom1 py-3 px-3">No data available</p>
                  )}

                  {usersDataLoader && (
                    <div className="d-flex justify-content-center pt-4">
                      <img src={spin} alt="" width='60px'/>
                    </div>  
                                
                  )}

                </div>
              </section>

              <section className="col-md-6 mb-5">
              <div className="dashboard-boxes border-radius-5px ps-3 mb-4">
                  <div className="py-4">
                    <h6 className="pb-3">User Verification chat</h6>
                    <div className="admin-home-verification-chart">
                      <div>
                        <KYCDoughnutChart
                          KYCsCount={KYCsCount} 
                          notUploadKYCsCount={notUploadKYCsCount} 
                          verifiedKYCsCount={verifiedKYCsCount} 
                          canceledKYCsCount={canceledKYCsCount} 
                        />
                      </div>
                    </div>

                    
                  </div>
                </div>
                <div className="dashboard-boxes border-radius-5px p-3">
                  <div className="py-4">
                    <h6>User Verification chat</h6>
                    <div className="d-flex justify-content-center">
                      <UserChart
                        verifiedUserCount={verifiedUserCount} 
                        unverifiedUserCount={unverifiedUserCount} 
                        canceledUserVerificationCount={canceledUserVerificationCount} 
                        userVerificationCount={userVerificationCount} 
                      />
                    </div>


                    
                  </div>
                </div>
              </section>
            </div>

          </section>


  
        </div>

        
      </div>
    
    </div> 
  )
}