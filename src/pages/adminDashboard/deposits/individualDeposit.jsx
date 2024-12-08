import '../../../css/dashboardCss/dashboard.css'
import AuthContext from "../../../context/AuthContext";
import { AdminDashFrame } from '../../../component/adminDashFrame';
import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import pic from '../../../img/Spin.gif'
import { DashboardFooter } from '../../../component/dashbaordFooter';


export const IndividualDeposit = () =>{
  const { authTokens, 
    OnbodyClick,
    formatDate,
    formatCurrency,
    formatName,


  } = useContext(AuthContext)

  const [details, setDetails] = useState(null)
  const [typeOfDeposit, setTypeOfDeposit] = useState('')
  const [typeOfDepositUrl, setTypeOfDepositUrl] = useState('')

  useEffect(() =>{
    const data = sessionStorage.getItem("IndividualDepsoit")

    setTypeOfDeposit(sessionStorage.getItem('TypeOfDeposit'))
    setTypeOfDepositUrl(sessionStorage.getItem('TypeOfDepositUrl'))
    if(data){
      const parsedData = JSON.parse(data)
      setDetails(parsedData)

    }
  }, [])

  return(
    <div>
      <div className="position-sticky1">
        <AdminDashFrame />
      </div>

      <div className="main-content" onClick={OnbodyClick}>

        <div className="container-xl pb-5 mb-5">
          <div className="row justify-content-center">
            <div className="col-md-11 col-xl-10">
              <div className="pt-4 pb-2">
                <div>
                  <Link to={`${typeOfDepositUrl}`} className='light-link'><i class="bi bi-arrow-left"></i> {typeOfDeposit} Deposits</Link>
                  <p className='dashboard-header'>Deposit Details</p>
                </div>
              </div>
              <div className="py-4">
              <section className='py-2 px-3 dashboard-boxes border-radius-5px'>

                {details != null ? 
                  (               
                    <div>
                      <div className='border-bottom1 pb-3'>
                        <p className='md-text pb-5'>Transaction <span className='sm-text blue-text'>#{details.transaction_id}</span></p>
                        <div className="d-flex justify-content-between">
                          <div className="d-flex align-items-center height-100">
                            <div className='dahboard-table-arrow-icon'>
                              <i class="bi bi-arrow-down-left sm-text-3"></i>
                            </div>
                            <div>
                              <p className='sm-text'>{formatCurrency(details.amount)} <span className='sm-text-3'>USD</span></p>
                              <p className='sm-text-2'>{formatDate(details.created_at)}</p>
                            </div>

                          </div>

                          <div>
                            <p className={`${details.status === "pending" ? "pending" : "sucessfull"} ${details.status === "declined" && "failed"} py-2 px-3 border-radius-5px`}>{formatName(details.status)}</p>
                          </div>
                        </div>
                      </div>

                      <div className='pt-5 pb-3 border-bottom1'>
                        <p className='font-bold sm-text-2 pb-4'>IN TRANSACTION</p>

                        <div className="row">
                          <div className="col-sm-6">
                            <div className='pb-3'>
                              <p className="sm-text-2 light-text">Transaction ID</p>
                              <p>{details.transaction_id}</p>
                            </div>

                            <div className='pb-3'>
                              <p className="sm-text-2 light-text">Amount</p>
                              <p>{formatCurrency(details.amount)}USD</p>
                            </div>

                            <div className='pb-3'>
                              <p className="sm-text-2 light-text">Payment To</p>
                              <p>{details.payment_method_details.wallet_address}</p>
                            </div>
                          </div>

                          <div className="col-sm-6">
                            <div className='pb-3'>
                              <p className="sm-text-2 light-text">Transaction Type</p>
                              <p>Deposit</p>
                            </div>

                            <div className='pb-3'>
                              <p className="sm-text-2 light-text pb-1">Payment Method</p>
                              <p><span className='bg-yellow sm-text-2 py-1 px-2'><i class="bi bi-currency-bitcoin"></i> {formatName(details.payment_method_details.name)}</span></p>
                            </div>
                          </div>

                          
                        </div>
                      </div>

                      <div className='pt-5 pb-3 border-bottom1'>
                        <p className='font-bold sm-text-2 pb-4'>IN ACCOUNT</p>

                        <div className="row">
                          <div className="col-sm-6">
                            <div className='pb-3'>
                              <p className="sm-text-2 light-text">User ID</p>
                              <p>{details.user}</p>
                            </div>
                          </div>

                          <div className="col-sm-6">
                            <div className='pb-3'>
                              <p className="sm-text-2 light-text">User Account</p>
                              <p>{formatName(details.user_details.full_name)}</p>
                            </div>
                          </div>

                          
                        </div>
                      </div>

                      <div className='pt-5 pb-3'>
                        <p className='font-bold sm-text-2 pb-4'>TRANSACTION PROOF</p>

                        <div className="row">
                          <div className="col-lg-6 col-md-8 col-sm-12">
                            <img src={details.payment_proof} alt="" width='100%' />
                          </div>
                        </div>

                      </div>
                    </div>
                  ):      
                  (
                    <div className='d-flex justify-content-center py-5'>
                      <img src={pic} alt="" width='50px'/>

                    </div>
                  )
                }
                
              </section>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div>
        <DashboardFooter />
      </div>


    </div>
  )
}