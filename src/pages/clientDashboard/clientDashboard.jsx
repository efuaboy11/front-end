import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faBan, faChartLine, faCircleDollarToSlot, faCreditCard,  faHandHoldingDollar, faMailBulk, faMoneyBillTransfer} from "@fortawesome/free-solid-svg-icons"
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect} from "react";
import AuthContext from "../../context/AuthContext";
import '../../css/dashboardCss/dashboard.css'
import '../../css/dashboardCss/adminDahboardCss/adminHome.css'
import { AdminDashFrame } from "../../component/adminDashFrame";
import '../../css/style.css'
import headerPic from '../../img/user.png'
import monitor from '../../img/mointor-removebg-preview.png'
import { DepositBarChart, KYCDoughnutChart, UserChart, WithdrawtBarChart } from "../../component/chatFrame";
import spin from '../../img/Spin.gif'
import AllDataContext from '../../context/Alldata';
import { DashboardFooter } from '../../component/dashbaordFooter';
import FloatingAlert from '../../component/alert';
import { ClientDashFrame } from '../../component/ClientDashFrame';


export const ClientDashboard = () =>{
  const [timeofDay, setTimeOfDay] = useState('')

  const [showDeposit, setShowDeposit] = useState(true)
  const [showPendingDeposit, setShowPendingDeposit] = useState(false)
  const [showDeclinedDeposit, setShowDeclinedDeposit] = useState(false)
  const [showSuccessfulDeposit, setShowSuccessfulDeposit] = useState(false) 

  const [showWithdraw, setShowWithdraw] = useState(true)
  const [showPendingWithdraw, setShowPendingWithdraw] = useState(false)
  const [showDeclinedWithdraw, setShowDeclinedWithdraw] = useState(false)
  const [showSuccessfulWithdraw, setShowSuccessfulWithdraw] = useState(false) 


  const navigate  = useNavigate()
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


  

  





  const {authTokens,
    OnbodyClick,
    formatDate,
    formatCurrency,
    formatName,
    shortName,
    disablebutton, 
    setDisablebutton,

    messages,
    alertVisible,
    setAlertVisible,
    isSuccess,
    showAlert,
    setMessage,
    setIsSuccess,
    userProfile,
    formatFirstName,
    handleCopy,
    copied,


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

    totalInterest,

 
    recentInvestemnt,
    activeInvestmentCount,

  
    totalBonus,



    DepositFunction,
    SuccessfulDepositFunction,
    DeclinedDepositFunction,
    PendingDepositFunction,


    WithdrawFunction,
    SuccessfulWithdrawFunction,
    PendingWithdrawFunction,
    DeclinedWithdrawFunction,

    ActiveInvestmentFunction,

    totalUserCommission,
    UserCommissionFunction,
    userReferralCount,
    UserReferralFunction,






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


    ActiveInvestmentFunction()

    UserCommissionFunction()
    UserReferralFunction()

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
        <ClientDashFrame />
      </div>

      {/* <div>
        <FloatingAlert
          message={messages}
          isVisible={alertVisible}
          onClose={() => setAlertVisible(false)}
          successs={isSuccess}
        />
      </div> */}
      {userProfile && 
        <div>
          <div className="main-content" onClick={OnbodyClick}>
            <div className="container-xl pb-5 mb-3">
              <section className='pb-5'>
                <div className="d-flex justify-content-between align-items-center admin-home-header">
                  <div className='d-md-flex align-items-center height-100 '>
                    <div className='me-4'>
                      <p className='light-text'>Welcome !</p>
                      <h2 className="pb-3">Good {timeofDay}, {formatFirstName(userProfile?.user_details.full_name)}!</h2>
                      <p className="pb-1 light-text">"Plant wealth, reap success."</p>      
                      <p className="light-text">-Unknown</p>
                    </div> 

                    <div className='pt-3'>
                      <Link className='Link'>
                        <div className="d-flex investment-kYC-btn">
                          <p className=''>My Investment</p>
                          <i class="bi bi-arrow-right  ps-2"></i>
                        </div>
                      </Link>
                    </div>
                  </div>   

                  <div className="d-none d-lg-block">
                    <img src={headerPic} alt="" width='270px' className="pt-5"/>
                  </div>        
                </div>
              </section>



              <section>
                <div className="row g-4">
                  <div className="col-12">
                    <div className="d-flex justify-content-between dashboard-boxes border-radius-5px p-3">
                        <div className="">
                          <p className="pt-1">Account Balance</p>
                          <p className="pt-1 pb-2 sm-text"><span className="h1">{formatCurrency(userProfile.user_balance.balance)}</span> USD</p>
                        </div>
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
                          <p className="pt-1">Total Interest</p>
                          <p className="pt-4 pb-2 sm-text"><span className="md-text">{formatCurrency(totalInterest)}</span> USD</p>
                        </div>
                        <FontAwesomeIcon className='lg-text' icon={faMoneyBillTransfer}/>
                    </div>      
                  </div>

                  <div className="col-md-4">
                    <div className="d-flex justify-content-between dashboard-boxes border-radius-5px p-3">
                        <div className="">
                          <p className="pt-1">Total Bonus</p>
                          <p className="pt-4 pb-2 sm-text"><span className="md-text">{formatCurrency(totalBonus)}</span> USD</p>
                        </div>
                        <i class="bi bi-gift lg-text"></i>
                    </div>      
                  </div>

                  <div className="col-lg-4  col-md-6">
                    <div className='dashboard-boxes border-radius-5px'>
                      <div className="py-4 px-3">
                        <div className='purple-border-bottom pb-3'>
                          <p className='pb-2'>Transactions in Account</p>
                          <p className='md-text'>0.00 USD</p>
                        </div>

                        <div>
                          <div className='pt-2 border-bottom1'>
                            <div className="d-flex justify-content-between py-2">
                              <p className='light-text'>Deposited:</p>
                              <p className='sm-text-3'>0.00 USD</p>
                            </div>

                            <div className="d-flex justify-content-between pb-2">
                              <p className='light-text'>Invested:</p>
                              <p className='sm-text-3'>0.00 USD</p>
                            </div>

                            <div className="d-flex justify-content-between pb-2">
                              <p className='light-text'>Withdrawed:</p>
                              <p className='sm-text-3'>0.00 USD</p>
                            </div>
                          </div>
                          <div className="d-flex justify-content-between py-2">
                              <p className='light-text'>Total:</p>
                              <p className='sm-text-3'>0.00 USD</p>
                          </div>
                        </div>

                        <div className='pt-4 pb-2 mt-2'>
                          <Link className='Link'>
                            <p className='dashboard-btn py-2 width-100 text-center'>Withdraw Funds</p>
                          </Link>

                          <div className='pt-2'>
                            <Link className='light-link'>
                              <p className='text-center sm-text-2'>Deposit Funds</p>
                            </Link>
                          </div>

                        </div>

                      </div>
                    </div>

                  </div>

                  <div className="col-lg-4 col-md-6">
                    <div className='dashboard-boxes border-radius-5px'>
                      <div className="py-4 px-3">
                        <div className='purple-border-bottom pb-3'>
                          <p className='pb-2'>Funds Earned</p>
                          <p className='md-text'>0.00 USD</p>
                        </div>

                        <div>
                          <div className='pt-2 border-bottom1'>
                            <div className="d-flex justify-content-between py-2">
                              <p className='light-text'>Interest:</p>
                              <p className='sm-text-3'>0.00 USD</p>
                            </div>

                            <div className="d-flex justify-content-between pb-2">
                              <p className='light-text'>Commision:</p>
                              <p className='sm-text-3'>0.00 USD</p>
                            </div>

                            <div className="d-flex justify-content-between pb-2">
                              <p className='light-text'>Bonuses:</p>
                              <p className='sm-text-3'>0.00 USD</p>
                            </div>
                          </div>
                          <div className="d-flex justify-content-between py-2">
                              <p className='light-text'>Total:</p>
                              <p className='sm-text-3'>0.00 USD</p>
                          </div>
                        </div>

                        <div className='pt-4 pb-2 mt-2'>
                          <Link className='Link'>
                            <p className='dashboard-btn py-2 width-100 text-center'>Invest & Earn</p>
                          </Link>

                          <div className='pt-2 d-flex justify-content-center'>
                            <p>Earn Cash by</p>
                            <div className="pt-1 ps-1">
                              <Link className='light-link '>
                                <p className='text-center sm-text-2'>Referring somebody</p>
                              </Link>
                            </div>
                          </div>

                        </div>

                      </div>
                    </div>

                  </div>

                  <div className="col-lg-4  col-md-6">
                    <div className='dashboard-boxes border-radius-5px'>
                      <div className="py-4 px-3">
                        <div className='purple-border-bottom pb-3'>
                          <p className='pb-2'>My Investment Plans</p>
                          <div className='d-flex'>
                            <p className='md-text'>{activeInvestmentCount}</p>

                            <div  className='ps-3 d-flex'>
                              <p className='pt-3'>({activeInvestmentCount})</p>
                              <p className='md-text ps-1'>Active</p>

                            </div>
                          </div>
                        </div>
                        
                        {recentInvestemnt.length > 0 ? (
                          recentInvestemnt.map((data) =>(
                            <div>
                              <div className='pt-2 border-bottom1'>
                                <div className="d-flex justify-content-between py-2">
                                  <p className='light-text'>Plan:</p>
                                  <p className='sm-text-3'>S{formatName(data.plan_details.plan_name)}</p>
                                </div>
    
                                <div className="d-flex justify-content-between pb-2">
                                  <p className='light-text'>Amount Invested:</p>
                                  <p className='sm-text-3'>{formatCurrency(data.amount)} USD</p>
                                </div>
    
                                <div className="d-flex justify-content-between pb-2">
                                  <p className='light-text'>Current Profit:</p>
                                  <p className='sm-text-3'>{formatCurrency(data.current_intrest_return)} USD</p>
                                </div>
                              </div>
                              <div className="d-flex justify-content-between py-2">
                                  <p className='light-text'>Return Profit:</p>
                                  <p className='sm-text-3'>{formatCurrency(data.return_profit)} USD</p>
                              </div>
                            </div>
                          ))

                        ): (
                          <div className='pb-3'>
                            <p className='pt-3 pb-5 mb-5'>No data available</p>
                          </div>
                        )}


                        <div className='pt-4 pb-2 mt-2'>
                          <Link className='Link'>
                            <p className='dashboard-inverse-btn py-2 width-100 text-center font-bold'>See all Investment</p>
                          </Link>

                          <div className='pt-2 d-flex justify-content-center'>
                            <p>Earn More by</p>
                            <div className="pt-1 ps-1">
                              <Link className='light-link '>
                                <p className='text-center sm-text-2'>Investing Now!</p>
                              </Link>
                            </div>
                          </div>

                        </div>

                      </div>
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
                                <Link to='/admin/all-deposits' className="Link d-none d-sm-block dashboard-boxes ms-1 px-2  border-radius-10px">
                                  <p>See All</p>
                                </Link>

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
                                <Link to='/admin/all-withdraws' className="Link d-none d-sm-block dashboard-boxes ms-1 px-2  border-radius-10px">
                                  <p>See All</p>
                                </Link>

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
                  <section className='col-12'>
                    <div className='border1 border-radius-5px'>
                      <div className="row g-0">
                        <div className="col-sm-6 ">
                          <div className="border-right1">
                            <div className="p-3">
                              <div className="d-flex justify-content-between pb-4">
                                <div>
                                  <p className='sm-text pb-2'>Refer Us & Earn</p>
                                  <p>The Link below is your Referral Link</p>
                                </div>

                                <div>
                                  <Link className='Link'>
                                    <p className='dashboard-btn py-2 px-4'>View</p>
                                  
                                  </Link>
                                </div>
                              </div>

                              <div className="row pb-2">
                                <div className="col-12">
                                  <div className="width-100">
                                    <div className="border1 border-radius-5px">
                                      <div className="row">
                                        <div className="col-10">
                                          <p className='dashboard-secondary-bg p-2 '>
                                            <i class="bi bi-link-45deg"></i> {userProfile.user_details.id}
                                          </p>
                                        </div>

                                        <div className="col-2  cursor-pointer" onClick={() => handleCopy(userProfile.user_details.id)}>
                                          <div className="d-flex align-items-center height-100">
                                            {copied ? (
                                              <p className='sucessfull-text'><i class="bi bi-clipboard-check"></i></p>
                                            ): (
                                              <p><i class="bi bi-clipboard pe-1"></i></p>
                                            )}

                                            <div className="dashbboard-referral-link-copy-text">
                                              {copied ? (
                                                <p className='sucessfull-text'>copied</p>
                                              ): (
                                                <p>Copy</p>
                                              )}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-sm-6">
                          <div className="dashboard-secondary-bg height-100 p-3">
                            <p className="light-text">My Referral</p>
                            <div className="d-flex justify-content-center">
                              <div className="d-flex">
                                <div className='me-5 text-center'>
                                  <p className='sm-text'>{userReferralCount}</p>
                                  <p className='light-text'>Total Joined</p>
                                </div>

                                <div className='text-center'>
                                  < p className='sm-text'>{formatCurrency(totalUserCommission)} USD</p>
                                  <p className='light-text'>Referral Commission</p>
                                </div>
                              </div>
                            </div>

                            <div className='mt-4'>
                             <button className='dashboard-btn py-2 px-3'>View Commission</button>
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>
                  </section>

                  <section className="col-12">
                    <div className="dashboard-boxes border-radius-5px p-3">
                      <div className="row g-3">
                        <div className="col-md-2">
                          <img src={monitor} alt="" width='150px' />
                        </div>
                        <div className='col-md-7'>
                          <div className="d-flex align-items-center height-100">
                            <div>
                              <h4>We’re here to help you!</h4>
                              <p className='light-text pt-3'>Ask a question or file a support ticket, manage request, report an issues. Our team support team will get back to you by email.</p>
                            </div>
                          </div>
                        </div>

                        <div className='col-md-3'>
                          <div className="d-flex align-items-center height-100">
                            <Link className="dashboard-btn-2 px-4 py-2">Get Support Now</Link>
                          </div>
                          
                        </div>
                      </div>
                    </div>
                  </section>

                </div>

              </section>


      
            </div>   
          </div>

          <div className='py-5'>
            <DashboardFooter />
          </div>

        </div>

      }

      
    
    </div> 
  )
}