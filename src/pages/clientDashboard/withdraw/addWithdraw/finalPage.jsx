import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faBan, faChartLine, faCircleDollarToSlot, faCreditCard,  faHandHoldingDollar, faMailBulk, faMoneyBillTransfer} from "@fortawesome/free-solid-svg-icons"
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect} from "react";
import AuthContext from "../../../../context/AuthContext";
import '../../../../css/dashboardCss/dashboard.css'
import '../../../../css/dashboardCss/adminDahboardCss/adminHome.css'
import { AdminDashFrame } from "../../../../component/adminDashFrame";
import '../../../../css/style.css'
import spin from '../../../../img/Spin.gif'
import AllDataContext from '../../../../context/Alldata';
import { DashboardFooter } from '../../../../component/dashbaordFooter';
import FloatingAlert from '../../../../component/alert';
import { ClientDashFrame } from '../../../../component/ClientDashFrame';
import { set, useForm } from 'react-hook-form';
import { ProcessingSpiner } from '../../../../component/spin';
import pic from '../../../../img/good-mark.png'

export const WithdrawFinalPage = () =>{
  const {authTokens,
    OnbodyClick,
  } = useContext(AuthContext)




  return(
    <div>
      <div className="position-sticky1">
        <ClientDashFrame />
      </div>



      <div className="main-content pb-5" onClick={OnbodyClick}>
        <div className="row justify-content-center">
          <div className='text-center col-11 col-sm-10 col-md-8 col-xxl-6 pt-5'>
            <img src={pic} alt="" width='150px'/>
            <p className="dashboard-header">Successful</p>
            <p className='light-text pb-3'>Your withdraw has been received. We will review the details you provided, and your payment gateway account will be funded upon verification of authenticity. Thank you for investing with AmaniLightEquity! </p>
            <Link to='/dashboard/home/' className="Link">
              <p className='dashboard-btn width-100 pt-2 pb-3'><i class="bi bi-house-door-fill pe-2"></i>Home</p>   
            </Link>  
            <div  className='pt-3'>
              <Link to='/dashboard/add-withdraw/' className='light-link'>Withdraw Funds</Link>
            </div>   

          </div>
        </div>
      </div>

      <div className='py-4'>
        <DashboardFooter />
      </div>



    </div>
      
  )
} 