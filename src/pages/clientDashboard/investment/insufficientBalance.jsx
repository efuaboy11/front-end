import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faBan, faChartLine, faCircleDollarToSlot, faCreditCard,  faHandHoldingDollar, faMailBulk, faMoneyBillTransfer, faTriangleExclamation, faWallet} from "@fortawesome/free-solid-svg-icons"
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect} from "react";
import AuthContext from "../../../context/AuthContext";
import '../../../css/dashboardCss/dashboard.css'
import '../../../css/dashboardCss/adminDahboardCss/adminHome.css'
import { AdminDashFrame } from "../../../component/adminDashFrame";
import '../../../css/style.css'
import spin from '../../../img/Spin.gif'
import AllDataContext from '../../../context/Alldata';
import { DashboardFooter } from '../../../component/dashbaordFooter';
import FloatingAlert from '../../../component/alert';
import { ClientDashFrame } from '../../../component/ClientDashFrame';
import { set, useForm } from 'react-hook-form';
import { ProcessingSpiner } from '../../../component/spin';
import pic from '../../../img/error.png'

export const ClientInsufficientBalance = () =>{
  const {authTokens,
    OnbodyClick,
  } = useContext(AuthContext)

  return(
    <div>
      <div className="position-sticky1">
        <ClientDashFrame />
      </div>
 


      <div className="main-content pb-5" onClick={OnbodyClick}>
        <div className='container-lg'>
          <div className="row justify-content-center pt-5 mt-3">
            <div className='text-center col-11 col-sm-10 col-md-8 col-xxl-6 pt-4'>
              <div>
                <div className='pb-4'>
                  <FontAwesomeIcon className='p-3 dashboard-purple-bg xl-text border-radius-50' icon={faWallet}/>
                </div>
                <div>
                  <p className='dashboard-header'>Insufficient Balance!</p>
                </div>
                <div>
                  <p className='sm-text text-center light-text' >Sorry you do not a have sufficient balance in your account for this transaction. Please make a deposit and try again once you have sufficient balance.</p>
                </div>

                <div className='pt-5 pb-4'>
                  <Link to='/dashboard/deposit/step-1/' className='Link '>
                    <p className='dashboard-btn pt-2 pb-3 font-bold width-100'>Make a Deposit</p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='py-5'>
        <DashboardFooter />
      </div>


    </div>
      
  )
}