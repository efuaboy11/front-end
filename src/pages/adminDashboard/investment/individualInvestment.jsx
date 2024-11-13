import '../../../css/dashboardCss/dashboard.css'
import '../../../css/dashboardCss/adminDahboardCss/individualInvestment.css'
import AuthContext from "../../../context/AuthContext";
import { AdminDashFrame } from '../../../component/adminDashFrame';
import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import pic from '../../../img/Spin.gif'


export const IndividualInvestment = () =>{
  const { authTokens, 
    OnbodyClick,
    formatCurrency,
    formatName,
    roundUp,
    formatDate,
    formatDateTime,
    depositCount,


  } = useContext(AuthContext)

  const [details, setDetails] = useState(null)
  const [urlName, setUrlName] = useState('')
  const [urlLink, setUrlLink] = useState('')
  const [showMenu, setShowMenu] = useState(false)

  
  const checkTimeDuration = (duration) =>{
    if (duration == "hourly"){
      return "hours"

    }else if(duration == 'daily'){
      return 'days'

    }else if(duration == 'weekly'){
      return 'weeks'

    }else if(duration == 'monthly'){
      return 'months'
    }else if(duration == 'yearly'){
      return 'years'

    }

  }

  const toogleMenu = () =>{
    setShowMenu(!showMenu)
  }

  useEffect(() =>{
    const data = localStorage.getItem("IndividualData")

    setUrlName(localStorage.getItem('urlName'))
    setUrlLink(localStorage.getItem('urlLink'))
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

        {details != null ? 
          (
            <div className="container-xl">
            <section>
              <div className="investment-header-container">
                <div>
                  <div  className="pt-4 pb-2">
                    <div>
                      <Link to={`${urlLink}`} className='light-link '><i class="bi bi-arrow-left"></i> {urlName} Investments</Link>
                      <p className='dashboard-header my-2'>{formatName(details.plan_details.plan_name)} Plan {roundUp(details.plan_details.percentage_return)}% - {formatName(details.plan_details.time_rate)}</p>
                      <div className='d-flex'>
                        <p className='me-4'>Last Updated: {details.last_update_time ? formatDateTime(details.last_update_time) : 'null'}</p>
                        <div>
                          <p className={`sucessfull p-1 sm-text-2  border-radius-5px ${details.investment_status === 'awaiting' && 'pending'} ${details.investment_status === 'canceled' && 'failed'} ${details.investment_status === 'active' && 'sucessfull'} ${details.investment_status === 'completed' && 'completed'}`}>{details.investment_status}</p>
                        </div>
                        
                      </div>

                    </div>

                  </div>
                </div>

                <div className='position-relative1'>
                  <div className="d-flex">
                    <div className='me-3'>
                      <button className='dashboard-btn investment-individual-btn'>
                        <div className="d-flex">
                          <i class="bi bi-plus-lg pe-2"></i>
                          <p><span className='d-none d-sm-inline'>Add</span> Interest</p>
                        </div>
                      </button>
                    </div>

                    <div className='investment-individual-menu-bar-container' onClick={toogleMenu}>
                      <button className='p-2 investment-individual-menu-bar'>
                        <i class="bi bi-three-dots-vertical"></i>
                      </button>
                    </div>
                    {showMenu && 
                      <div className="investment-individual-menu width-100">
                        <div>
                          <div className="investment-individual-menu-container">
                            <div>
                              <div className="d-flex py-2 border-bottom1 ps-3">
                                <i class="bi bi-upload"></i>
                                <p className="light-link ms-3">Update Type</p>
                              </div>

                              <div className="d-flex py-2 border-bottom1 ps-3">
                                <i class="bi bi-plus-lg"></i>
                                <p className="light-link ms-3">Add Interest</p>
                              </div>

                              <div className="d-flex py-2  ps-3">
                                <i class="bi bi-trash"></i>
                                <p className="light-link ms-3">Delete Investment</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    }
                  </div>
                </div>
              </div>
            </section>

            <section className='pt-4 mt-2'>
              <div className="dashboard-boxes border-radius-5px">
                <div>
                  <div className="row ps-4 py-4 gy-4">
                    <div className="col-sm-8">
                      <div className="d-flex">
                        <div className='pe-4'>
                          <h4>{formatCurrency(details.amount)} USD <span className='px-3 light-text d-none d-sm-inline-block'> + </span></h4>
                          <p className='light-text'>Invested</p>
                        </div>

                        <div>
                          <h4>{formatCurrency(details.net_profit)} USD</h4>
                          <p className='light-text'>Profit (Approx)</p>
                        </div>
                      </div>
                    </div>

                    <div className="col-sm-4">
                      <div>
                        <h4>{formatCurrency(details.total_intrest_return)} USD</h4>
                        <p className='light-text'>Profit (Approx)</p>
                        </div>
                    </div>
                  </div>
                </div>

                <div className='px-4 pb-4'>
                  <div className="row gx-5 pb-1">

                    
                    <div className="col-xl-4 col-md-6 border-bottom1 py-1">
                      <div className="d-flex justify-content-between">
                        <p className='light-text'>Investor:</p>
                        <p>{formatName(details.user_details.full_name)}</p>
                      </div>
                    </div>

                    <div className="col-xl-4 col-md-6 border-bottom1 py-1">
                      <div className="d-flex justify-content-between">
                        <p className='light-text'>Plan:</p>
                        <p>{formatName(details.plan_details.plan_name)}</p>
                      </div>
                    </div>

                    <div className="col-xl-4 col-md-6 border-bottom1 py-1">
                      <div className="d-flex justify-content-between">
                        <p className='light-text'>Cashout:</p>
                        <p>{details.cashout ? "True" : "False"}</p>
                      </div>
                    </div>

                    <div className="col-xl-4 col-md-6 border-bottom1 py-1">
                      <div className="d-flex justify-content-between">
                        <p className='light-text'>Term Duration:</p>
                        <p>{details.plan_details.duration} {checkTimeDuration(details.plan_details.time_rate)}</p>
                      </div>
                    </div>

                    <div className="col-xl-4 col-md-6 border-bottom1 py-1">
                      <div className="d-flex justify-content-between">
                        <p className='light-text'>Transaction ID:</p>
                        <p>{details.investment_id}</p>
                      </div>
                    </div>

                    <div className="col-xl-4 col-md-6 border-bottom1 py-1">
                      <div className="d-flex justify-content-between">
                        <p className='light-text'>Investment Amount:</p>
                        <p >{formatCurrency(details.amount)} USD </p>
                      </div>
                    </div>

                    <div className="col-xl-4 col-md-6 border-bottom1 py-1">
                      <div className="d-flex justify-content-between">
                        <p className='light-text'>Return Period:</p>
                        <p>{details.plan_details.time_rate}</p>
                      </div>
                    </div>

                    <div className="col-xl-4 col-md-6 border-bottom1 py-1">
                      <div className="d-flex justify-content-between">
                        <p className='light-text'>Capital Return:</p>
                        <p>Capital Included</p>
                      </div>
                    </div>

                    <div className="col-xl-4 col-md-6 border-bottom1 py-1">
                      <div className="d-flex justify-content-between">
                        <p className='light-text'>Return Profit:</p>
                        <p>{details.return_profit} USD</p>
                      </div>
                    </div>

                    <div className="col-xl-4 col-md-6 border-bottom1 py-1">
                      <div className="d-flex justify-content-between">
                        <p className='light-text'>Term Starts At:</p>
                        <p>{details.investment_begins ? formatDate(details.investment_begins) : 'null'}</p>
                      </div>
                    </div>

                    <div className="col-xl-4 col-md-6 border-bottom1 py-1">
                      <div className="d-flex justify-content-between">
                        <p className='light-text'>Date Created:</p>
                        <p>{details.created_at ? formatDate(details.created_at): 'null'}</p>
                      </div>
                    </div>
                    
                    <div className="col-xl-4 col-md-6 border-bottom1 py-1">
                      <div className="d-flex justify-content-between">
                        <p className='light-text'>Net Profit:</p>
                        <p>{formatCurrency(details.net_profit)}USD</p>
                      </div>
                    </div>

                    <div className="col-xl-4 col-md-6 py-1">
                      <div className="d-flex justify-content-between">
                        <p className='light-text'>Term End At:</p>
                        <p>{details.investment_ends ? formatDate(details.investment_ends): 'null'}</p>
                      </div>
                    </div>

                    <div className="col-xl-4 col-md-6 py-1">
                      <div className="d-flex justify-content-between">
                        <p className='light-text'>Last Growth:</p>
                        <p>{details.last_update_time ? formatDate(details.investment_ends): 'null'}</p>
                      </div>
                    </div>

                    <div className="col-xl-4 col-md-6 py-1">
                      <div className="d-flex justify-content-between">
                        <p className='light-text'>Total Intrest Return:</p>
                        <p>{formatCurrency(details.total_intrest_return)} USD</p>
                      </div>
                    </div>
                  </div>

                  
                </div>
              </div>
            </section>


            </div>
          ): (
            <div></div>
          )
        }


      </div>


    </div>
  )
}