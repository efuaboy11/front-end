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
import { ClientDashFrame } from '../../../component/ClientDashFrame';
import { DashboardFooter } from '../../../component/dashbaordFooter';
import monitor from '../../.../../../img/mointor-removebg-preview.png'
export const FAQs = () =>{
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

  const [step1Dropdown, setStep1Dropdown] = useState(false)
  const [step2Dropdown, setStep2Dropdown] = useState(false)
  const [step3Dropdown, setStep3Dropdown] = useState(false)
  const [step4Dropdown, setStep4Dropdown] = useState(false)
  const [step5Dropdown, setStep5Dropdown] = useState(false)
  const [step6Dropdown, setStep6Dropdown] = useState(false)
  const [step7Dropdown, setStep7Dropdown] = useState(false)
  const [step8Dropdown, setStep8Dropdown] = useState(false)
  const [step9Dropdown, setStep9Dropdown] = useState(false)

  const toggleStep1 = () =>{
    setStep1Dropdown(!step1Dropdown)
    setStep2Dropdown(false)
    setStep3Dropdown(false)
    setStep4Dropdown(false)
    setStep5Dropdown(false)
    setStep6Dropdown(false)
    setStep7Dropdown(false)
    
  }

  const toggleStep2 = () =>{
    setStep2Dropdown(!step2Dropdown)
    setStep1Dropdown(false)
    setStep3Dropdown(false)
    setStep4Dropdown(false)
    setStep5Dropdown(false)
    setStep6Dropdown(false)
    setStep7Dropdown(false)

  }

  const toggleStep3 = () =>{
    setStep3Dropdown(!step3Dropdown)
    setStep1Dropdown(false)
    setStep2Dropdown(false)
    setStep4Dropdown(false)
    setStep5Dropdown(false)
    setStep6Dropdown(false)
    setStep7Dropdown(false)

  }

  const toggleStep4 = () =>{
    setStep4Dropdown(!step4Dropdown)
    setStep1Dropdown(false)
    setStep2Dropdown(false)
    setStep3Dropdown(false)
    setStep5Dropdown(false)
    setStep6Dropdown(false)
    setStep7Dropdown(false)

  }
  

  const toggleStep5 = () =>{
    setStep5Dropdown(!step5Dropdown)
    setStep1Dropdown(false)
    setStep2Dropdown(false)
    setStep3Dropdown(false)
    setStep4Dropdown(false)
    setStep6Dropdown(false)
    setStep7Dropdown(false)

  }

  const toggleStep6 = () =>{
    setStep6Dropdown(!step6Dropdown)
    setStep1Dropdown(false)
    setStep2Dropdown(false)
    setStep3Dropdown(false)
    setStep4Dropdown(false)
    setStep5Dropdown(false)
    setStep7Dropdown(false)

  }

  const toggleStep7 = () =>{
    setStep7Dropdown(!step7Dropdown)
    setStep1Dropdown(false)
    setStep2Dropdown(false)
    setStep3Dropdown(false)
    setStep4Dropdown(false)
    setStep5Dropdown(false)
    setStep6Dropdown(false)

  }


  const toggleStep8 = () =>{
    setStep8Dropdown(!step8Dropdown)
    setStep1Dropdown(false)
    setStep2Dropdown(false)
    setStep3Dropdown(false)
    setStep4Dropdown(false)
    setStep5Dropdown(false)
    setStep6Dropdown(false)
    setStep7Dropdown(false)

  }


  const toggleStep9 = () =>{
    setStep9Dropdown(!step9Dropdown)
    setStep1Dropdown(false)
    setStep2Dropdown(false)
    setStep3Dropdown(false)
    setStep4Dropdown(false)
    setStep5Dropdown(false)
    setStep6Dropdown(false)
    setStep7Dropdown(false)
    setStep8Dropdown(false)

  }
  return(
    <div>
      <div className="position-sticky1">
        <ClientDashFrame />
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
          <section>
            <div className="row justify-content-center">
              <div className="col-md-11 col-xl-8 pt-4">
                <div className="text-center">
                  <p className='light-text'>FAQs</p>
                  <p className="dashboard-header">Frequently Asked Questions</p>
                  <p className='sm-text'>Got a question? Can't find the answer you're looking for?<br />  Don't worry,  send us an email on our <Link to='/dashboard/support-center/'>Support Center.</Link></p>
                </div>

                <div className="dashboard-boxes mt-5">
                  <div className='cursor-pointer' onClick={toggleStep1}>
                    <div className="d-flex justify-content-between border-bottom1 p-3">
                      <p>What Is Our Wire Transfer Charge</p>
                      <p  className={`cursor-pointer ${step1Dropdown ? 'rotate-180deg': ''}`}><i class="bi bi-chevron-down xsm-text font-bold" ></i></p>
                    </div>
                    
                    <div className={`border-bottom1  dropdown-content  ${step1Dropdown ? "slide-in" : "slide-out"}`}>
                      <p className='p-3'>We take a percentage as low as .2 percentage during any form of transfer you make with us.</p>
                    </div>
                  </div>

                  <div className='cursor-pointer' onClick={toggleStep2}>
                    <div className="d-flex justify-content-between border-bottom1 p-3">
                      <p>What Are The Objectives Of This Service?</p>
                      <p   className={`cursor-pointer ${step2Dropdown ? 'rotate-180deg': ''}`}><i class="bi bi-chevron-down xsm-text font-bold" ></i></p>
                    </div>
                    
                    <div className={`border-bottom1  dropdown-content  ${step2Dropdown ? "slide-in" : "slide-out"}`}>
                      <p className='p-3'>Our goal is to empower individuals to grow their wealth through secure and transparent crypto investment opportunities. We aim to provide tailored investment plans, high returns, and excellent support while ensuring simplicity and safety in the crypto market.</p>
                    </div>
                  </div>

                  <div className='cursor-pointer' onClick={toggleStep3}>
                    <div className="d-flex justify-content-between border-bottom1 p-3">
                      <p>What Is The Best Features And Services We Deliver?</p>
                      <p   className={`cursor-pointer ${step3Dropdown ? 'rotate-180deg': ''}`}><i class="bi bi-chevron-down xsm-text font-bold" ></i></p>
                    </div>
                    
                    <div className={`border-bottom1  dropdown-content  ${step3Dropdown ? "slide-in" : "slide-out"}`}>
                      <ul className='p-3'>
                        <li className='li-disc ms-3'><span className='font-bold'> Flexible Investment Plans:</span>  Ranging from beginner to advanced levels.</li>
                        <li className='li-disc ms-3'><span className='font-bold'>High Returns:</span>   Competitive ROI tailored to your investment plan.</li>
                        <li className='li-disc ms-3'><span className='font-bold'>Real-Time Tracking:</span>   Monitor your investments anytime.</li>
                        <li className='li-disc ms-3'><span className='font-bold'>Secure Transactions:</span>   Industry-standard encryption for safety.</li>
                        <li className='li-disc ms-3'><span className='font-bold'>24/7 Support:</span>   Dedicated assistance whenever you need it.</li>
                        <li className='li-disc ms-3'><span className='font-bold'>Transparency:</span>   Clear terms and no hidden fees.</li>
                      </ul>
                    </div>
                  </div>

                  <div className='cursor-pointer' onClick={toggleStep4}>
                    <div className="d-flex justify-content-between border-bottom1 p-3">
                      <p>What Happened To The Borderless Account?</p>
                      <p   className={`cursor-pointer ${step4Dropdown ? 'rotate-180deg': ''}`}><i class="bi bi-chevron-down xsm-text font-bold" ></i></p>
                    </div>
                    
                    <div className={`border-bottom1  dropdown-content  ${step4Dropdown ? "slide-in" : "slide-out"}`}>
                      <p className='p-3'>The Borderless Account has been transitioned to better align with evolving financial services. Existing users can still manage their accounts seamlessly, while new features and services now cater to a more streamlined and advanced investment experience. For further details, feel free to contact our support team.</p>
                    </div>
                  </div>

                  <div className='cursor-pointer' onClick={toggleStep5}>
                    <div className="d-flex justify-content-between border-bottom1 p-3">
                      <p>How Successful Is Our Business Model?</p>
                      <p   className={`cursor-pointer ${step5Dropdown ? 'rotate-180deg': ''}`}><i class="bi bi-chevron-down xsm-text font-bold" ></i></p>
                    </div>
                    
                    <div className={`border-bottom1  dropdown-content  ${step5Dropdown ? "slide-in" : "slide-out"}`}>
                      <p className='p-3'>Our business model is built on transparency, security, and user satisfaction. With a growing user base, high client retention, and consistent returns on investments, we have established a track record of trust and success in the crypto investment market.</p>
                    </div>
                  </div>

                  <div className='cursor-pointer'  onClick={toggleStep6}>
                    <div className="d-flex justify-content-between border-bottom1 p-3">
                      <p>Are Our Details Kept Confidential?</p>
                      <p  className={`cursor-pointer ${step6Dropdown ? 'rotate-180deg': ''}`}><i class="bi bi-chevron-down xsm-text font-bold" ></i></p>
                    </div>
                    
                    <div className={`border-bottom1  dropdown-content  ${step6Dropdown ? "slide-in" : "slide-out"}`}>
                      <p className='p-3'>Absolutely! We prioritize your privacy and security. All personal and financial information is encrypted and safeguarded using advanced security protocols, ensuring complete confidentiality and protection against unauthorized access.</p>
                    </div>
                  </div>

                  <div className='cursor-pointer' onClick={toggleStep7}>
                    <div className="d-flex justify-content-between border-bottom1 p-3">
                      <p>Is There Any Bonus or Commission in Our Investment?</p>
                      <p   className={`cursor-pointer ${step7Dropdown ? 'rotate-180deg': ''}`}><i class="bi bi-chevron-down xsm-text font-bold" ></i></p>
                    </div>
                    
                    <div className={`border-bottom1  dropdown-content  ${step7Dropdown ? "slide-in" : "slide-out"}`}>
                      <p className='p-3'>Yes! We offer referral bonuses and commission incentives to reward you for bringing new investors on board. Additionally, special promotions and bonuses may be available based on your investment plan. Stay tuned for updates to maximize your benefits!</p>
                    </div>
                  </div>

                  <div className='cursor-pointer' onClick={toggleStep8}>
                    <div className="d-flex justify-content-between border-bottom1 p-3">
                      <p>What Is A Multi-Currency Account And How Does It Work?</p>
                      <p   className={`cursor-pointer ${step8Dropdown ? 'rotate-180deg': ''}`}><i class="bi bi-chevron-down xsm-text font-bold" ></i></p>
                    </div>
                    
                    <div className={`border-bottom1  dropdown-content  ${step8Dropdown ? "slide-in" : "slide-out"}`}>
                      <p className='p-3'>A multi-currency account allows you to hold, send, and receive funds in multiple currencies. It works like a digital wallet, enabling you to manage transactions in various currencies without the need for separate accounts. This is ideal for global investments, saving on conversion fees, and supporting seamless cross-border transactions.</p>
                    </div>
                  </div>

                  <div className='cursor-pointer' onClick={toggleStep9}>
                    <div className="d-flex justify-content-between border-bottom1 p-3">
                      <p>
                      What Are Our Best Online Platforms?</p>
                      <p   className={`cursor-pointer ${step9Dropdown ? 'rotate-180deg': ''}`}><i class="bi bi-chevron-down xsm-text font-bold" ></i></p>
                    </div>
                    
                    <div className={`dropdown-content  ${step9Dropdown ? "slide-in" : "slide-out"}`}>
                      <p className='p-3'>Our services are accessible through a user-friendly website and a dedicated mobile app. Both platforms offer secure transactions, real-time tracking, and 24/7 support to ensure a seamless investment experience.</p>
                    </div>
                  </div>
                </div>

                <section className='pt-5'>
                    <div className="dashboard-boxes border-radius-5px p-3">
                      <div className="row g-3">
                        <div className="col-md-2">
                          <img src={monitor} alt="" width='100px' />
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
                            <Link to='/dashboard/support-center/' className="dashboard-btn-2 px-4 py-2">Get Support Now</Link>
                          </div>
                          
                        </div>
                      </div>
                    </div>
                  </section>
              </div>
            </div>
          </section>


        </div>
      </div>

      <div className='mt-5 pt-5'>
        <DashboardFooter/>
      </div>


    </div>
  )
}