import { faAngleDown, faArrowLeft, faBan, faBars, faCoins, faCube, faEnvelope, faEnvelopesBulk, faHandHoldingDollar, faL, faLock, faMoneyBillTransfer, faPercent, faRightLeft, faSackDollar, faShield } from '@fortawesome/free-solid-svg-icons'
import '../css/componentCss/dashboardFrame.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext, useEffect, useState } from 'react'
import AuthContext from '../context/AuthContext'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import userIcon from '../img/user-icon.png'
import existIcon from '../img/box-arrow-in-up-right.svg'




export const AdminDashFrame = () =>{
  const { authTokens, 
    showSidebar, 
    toggleCloseSidebar,
    toggleShowSidebar,
    OnbodyClick,


    depositCount,
    setDepositCount,
    successDespositCount,
    setSuccessDepositCount,
    pendingDespositCount,
    setPendingDespositCount,
    declinedDepositCount,
    setDeclinedDepositCount,
    setRecentDeposit,
    setDepositData,
    setTotalDeposit,
    setRecentPendingDeposit,
    setPendingDepositData,
    setRecentSuccessDeposit,
    setSuccessfulDepositData,
    setRecentDeclinedDeposit,
    setDeclinedDepositData,
    setDepositLoader,
    setPendingDepositLoader,
    setDeclinedDepositLoader, 
    setSuccessfulDepositLoader,    


    withdrawCount,
    setWithdrawCount,
    SuccessWithdrawCount,
    setSuccessWithdrawCount,
    pendingWithdrawCount,
    setPendingWithdrawCount,
    declinedWithdrawCount,
    setDeclinedWithdrawCount,
    setRecentWithdraw,
    setWithdrawData,
    setTotalWithdraw,
    setRecentPendingWithdraw, 
    setPendingWithdrawData, 
    setRecentSuccessWithdraw,
    setSuccessfulWithdrawData,
    setRecentDeclinedWithdraw, 
    setDeclinedWithdrawData,
    setWithdrawLoader, 
    setPendingWithdrawLoader, 
    setDeclinedWithdrawLoader, 
    setSuccessWithdrawLoader,

    investmentCount,
    setInvestmentCount,
    activeInvestmentCount,
    setActiveInvestmentCount,
    completedInvestmentCount,
    setCompletednvestmentCount,
    pendingInvestmentCount,
    setPendingInvestmentCount,
    declinedInvestmentCount,
    setDeclinedInvestmentCount,
    setInvestmentData,
    setPendingInvestment,
    setActiveInvestment,
    setCompletedInvestment,
    setCompletedInvestmentLoader,
    setDecinedInvestment,
    setInvestmentLoader,
    setPendingInvestmentLoader,
    setActiveInvestmentLoader,
    setDeclinedInvestmentLoader,


    usersCount,
    setUserCount,
    disableUserCount,
    setDisableUserCount,
    userVerificationCount,
    setUserVerificationCount,
    pendingUserVerificationCount,
    setPendingUserVerificationCount,
    canceledUserVerificationCount,
    setCanceledUserVerificationCount,
    unverifiedUserCount,
    setUnverfiedUserCount,
    verifiedUserCount,
    setVerifiedUserCount,
    setUsersData,
    setRecentUserData,
    setUsersDataLoader,

    KYCsCount,
    setKYCsCount,
    notUploadKYCsCount,
    setNotUploadKYCsCount,
    verifiedKYCsCount,
    setVerifiedKYCsCount,
    canceledKYCsCount,
    setCanceledKYCsCount,
    pendingKYCsCount,
    setPendingKYCsCount,


    emailCount,
    setEmailCount,

    investmentPlanCount,
    setInvestmentPlanCount,

    setInvestPlanData,


    paymentOptionsCount,
    setPaymentOptionsCount,
    setPaymentOptionsData,
    setPaymentOptionsLoader,


    bonusData,
    setBonusData,
    setTotalBonus,
    setBonusCount,

    setBlackListIPData,
    setBlackListCount,

    setNewLetterData,
    setNewsLetterCount,

    searchValue,



  } = useContext(AuthContext)
  const [navDropdown, setNavDropdown] = useState(false)


  const [depositDropdown, setDepositDropdown] = useState(false)
  const [withdrawDropdown, setWithdrawDropdown] = useState(false)
  const [investmentDropdown, setInvestmentDropdown] = useState(false)
  const [usersDropdown, setUserDropdown] = useState(false)
  const [kycDropdown, setKycDopdown] = useState(false)
  const [paymentOptions, setPaymentOptions] = useState(false)
  const [investmentPlanDropdown, setinvestmentPlanDropdown] = useState(false)
  const [emailDropdown, setEmailDropdown] = useState(false)







  const location = useLocation();
  const isActiveDashLink = (path) =>{
    return location.pathname === path

  }


  const toggleDeposit = () =>{
    setDepositDropdown(!depositDropdown)
  }

  const toggleWithdraw = () =>{
    setWithdrawDropdown(!withdrawDropdown)
  }

  const toggleInvestment = () =>{
    setInvestmentDropdown(!investmentDropdown)
  }

  const toggleUser = () =>{
    setUserDropdown(!usersDropdown)
  }
  const toggleKyc = () =>{
    setKycDopdown(!kycDropdown)
  }

  const toggleEmail = () =>{
    setEmailDropdown(!emailDropdown)
  }

  const toggleInvestmentPlan = () =>{
    setinvestmentPlanDropdown(!investmentPlanDropdown)
    console.log('clicked')
  }
  const togglePaymentOptions = () =>{
    setPaymentOptions(!paymentOptions)
  }
  const toggleNavDropdown = () =>{
    setNavDropdown(!navDropdown)
  }

  useEffect(() => {
    const Deposit = async() =>{
      let response = await fetch('http://127.0.0.1:8000/api/deposits/', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens.access}`
        },
      })
  
      const data = await response.json()
      if(response.ok){
        if(Array.isArray(data) && data.length > 0){
          setDepositCount(data.length)
        }

        const sortedData = data.sort((a, b) => b.id - a.id);
        // Get the 5 most recent entries
        const recentData = sortedData.slice(0, 4);
        setRecentDeposit(recentData)
        setDepositData(sortedData)
        setDepositLoader(false)

  
      }else{
        setDepositLoader(false)
      }
  
  
  
    }


    const filterDeposits = async() =>{
      let url;
  
      if(searchValue.length !== 0){
        url = `http://127.0.0.1:8000/api/deposits/?search=${searchValue}`
      }
  
  
      let response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type":"application/json",
          Authorization: `Bearer ${authTokens.access}`
        }
  
      })
  
      const data = await response.json()
  
      if(response.ok){
        setDepositData(data)
      }
    }

    const SuccessfulDeposit = async() =>{
      let response = await fetch('http://127.0.0.1:8000/api/deposits/successful/', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens.access}`
        },
      })
  
      const data = await response.json()
      if(response.ok){
        if(Array.isArray(data) && data.length > 0){
          setSuccessDepositCount(data.length)
        }

        const totalAmount = data.reduce((acc, item) => acc + parseFloat(item.amount), 0)
        setTotalDeposit(totalAmount)


        const sortedData = data.sort((a, b) => b.id - a.id);
        // Get the 5 most recent entries
        const recentData = sortedData.slice(0, 4);
        setRecentSuccessDeposit(recentData)
        setSuccessfulDepositData(sortedData)
        setSuccessfulDepositLoader(false)


  
      }else{
        setSuccessfulDepositLoader(false)
      }
  
    }


    const filterSuccessfulDeposits = async() =>{
      let url;
  
      if(searchValue.length !== 0){
        url = `http://127.0.0.1:8000/api/deposits/successful/?search=${searchValue}`
      }
  
  
      let response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type":"application/json",
          Authorization: `Bearer ${authTokens.access}`
        }
  
      })
  
      const data = await response.json()
  
      if(response.ok){
        setSuccessfulDepositData(data)
      }
    }

    const DeclinedDeposit = async() =>{
      let response = await fetch('http://127.0.0.1:8000/api/deposits/declined/', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens.access}`
        },
      })
  
      const data = await response.json()
      if(response.ok){
        if(Array.isArray(data) && data.length > 0){
          setDeclinedDepositCount(data.length)
        }

        const sortedData = data.sort((a, b) => b.id - a.id);
        // Get the 5 most recent entries
        const recentData = sortedData.slice(0, 4);
        setRecentDeclinedDeposit(recentData)
        setDeclinedDepositData(sortedData)
        setDeclinedDepositLoader(false)
  
      }else{
        setDeclinedDepositLoader(false)
      }

  
  
  
    }

    const filterDeclinedDeposits = async() =>{
      let url;
  
      if(searchValue.length !== 0){
        url = `http://127.0.0.1:8000/api/deposits/declined/?search=${searchValue}`
      }
  
  
      let response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type":"application/json",
          Authorization: `Bearer ${authTokens.access}`
        }
  
      })
  
      const data = await response.json()
  
      if(response.ok){
        setDeclinedDepositData(data)
      }
    }

    const PendingDeposit = async() =>{
      let response = await fetch('http://127.0.0.1:8000/api/deposits/pending/', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens.access}`
        },
      })
  
      const data = await response.json()
      if(response.ok){
        if(Array.isArray(data) && data.length > 0){
          setPendingDespositCount(data.length)
        }

        const sortedData = data.sort((a, b) => b.id - a.id);
        // Get the 5 most recent entries
        const recentData = sortedData.slice(0, 4);
        setRecentPendingDeposit(recentData)
        setPendingDepositData(sortedData)
        setPendingDepositLoader(false)
  
      }else{
        setPendingDepositLoader(false)
      }
  
    }

    const filterPendingDeposits = async() =>{
      let url;
  
      if(searchValue.length !== 0){
        url = `http://127.0.0.1:8000/api/deposits/pending/?search=${searchValue}`
      }
  
  
      let response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type":"application/json",
          Authorization: `Bearer ${authTokens.access}`
        }
  
      })
  
      const data = await response.json()
  
      if(response.ok){
        setPendingDepositData(data)
      }
    }



    const Withdraw = async() =>{
      let response = await fetch('http://127.0.0.1:8000/api/withdraw/', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens.access}`
        },
      })
  
      const data = await response.json()
      if(response.ok){
        if(Array.isArray(data) && data.length > 0){
          setWithdrawCount(data.length)
        }

        const sortedData = data.sort((a, b) => b.id - a.id);
        // Get the 5 most recent entries
        const recentData = sortedData.slice(0, 4);
        setRecentWithdraw(recentData)
        setWithdrawData(sortedData)
        setWithdrawLoader(false)
  
      }else{
        setWithdrawLoader(false)
      }
  
  
  
    }

    const filterWithdraws = async() =>{
      let url;
  
      if(searchValue.length !== 0){
        url = `http://127.0.0.1:8000/api/withdraw/?search=${searchValue}`
      }
  
  
      let response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type":"application/json",
          Authorization: `Bearer ${authTokens.access}`
        }
  
      })
  
      const data = await response.json()
  
      if(response.ok){
        setWithdrawData(data)
      }
    }

    const SuccessfulWithdraw = async() =>{ 
      let response = await fetch('http://127.0.0.1:8000/api/withdraw/successful/', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens.access}`
        },
      })
  
      const data = await response.json()
      if(response.ok){
        if(Array.isArray(data) && data.length > 0){
          setSuccessWithdrawCount(data.length)
        }

        const totalAmount = data.reduce((acc, item) => acc + parseFloat(item.amount), 0)
        setTotalWithdraw(totalAmount)

        const sortedData = data.sort((a, b) => b.id - a.id);
        // Get the 5 most recent entries
        const recentData = sortedData.slice(0, 4);
        setRecentSuccessWithdraw(recentData)
        setSuccessfulWithdrawData(sortedData)
        setSuccessWithdrawLoader(false)
  
      }else{
        setSuccessWithdrawLoader(false)
      }
  
  
  
    }

    const filterSuccessfulWithdraws = async() =>{
      let url;
  
      if(searchValue.length !== 0){
        url = `http://127.0.0.1:8000/api/withdraw/successful/?search=${searchValue}`
      }
  
  
      let response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type":"application/json",
          Authorization: `Bearer ${authTokens.access}`
        }
  
      })
  
      const data = await response.json()
  
      if(response.ok){
        setSuccessfulWithdrawData(data)
      }
    }

    const PendingWithdraw = async() =>{
      let response = await fetch('http://127.0.0.1:8000/api/withdraw/pending/', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens.access}`
        },
      })
  
      const data = await response.json()
      if(response.ok){
        if(Array.isArray(data) && data.length > 0){
          setPendingWithdrawCount(data.length)
        }
        const sortedData = data.sort((a, b) => b.id - a.id);
        // Get the 5 most recent entries
        const recentData = sortedData.slice(0, 4);
        setRecentPendingWithdraw(recentData)
        setPendingWithdrawData(sortedData)
        setPendingWithdrawLoader(false)
  
      }else{
        setPendingWithdrawLoader(false)
      }


  
    }


    const filterPendingWithdraws = async() =>{
      let url;
  
      if(searchValue.length !== 0){
        url = `http://127.0.0.1:8000/api/withdraw/pending/?search=${searchValue}`
      }
  
  
      let response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type":"application/json",
          Authorization: `Bearer ${authTokens.access}`
        }
  
      })
  
      const data = await response.json()
  
      if(response.ok){
        setPendingWithdrawData(data)
      }
    }

    const DeclinedWithdraw = async() =>{
      let response = await fetch('http://127.0.0.1:8000/api/withdraw/declined/', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens.access}`
        },
      })
  
      const data = await response.json()
      if(response.ok){
        if(Array.isArray(data) && data.length > 0){
          setDeclinedWithdrawCount(data.length)
        }

        const sortedData = data.sort((a, b) => b.id - a.id);
        // Get the 5 most recent entries
        const recentData = sortedData.slice(0, 4);
        setRecentDeclinedWithdraw(recentData)
        setDeclinedWithdrawData(sortedData)
        setDeclinedWithdrawLoader(false)
  
      }else{
        setDeclinedWithdrawLoader(false)
      }
  
  
  
  
    }

    const filterDeclinedWithdraws = async() =>{
      let url;
  
      if(searchValue.length !== 0){
        url = `http://127.0.0.1:8000/api/withdraw/declined/?search=${searchValue}`
      }
  
  
      let response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type":"application/json",
          Authorization: `Bearer ${authTokens.access}`
        }
  
      })
  
      const data = await response.json()
  
      if(response.ok){
        setDeclinedWithdrawData(data)
      }
    }

    const Investment = async() =>{
      let response = await fetch('http://127.0.0.1:8000/api/user-investment/', {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens.access}`
        },
      })
  
      const data = await response.json()
      if(response.ok){
        if(Array.isArray(data) && data.length > 0){
          setInvestmentCount(data.length)
        }

        const sortedData = data.sort((a, b) => b.id - a.id);
        setInvestmentData(sortedData)
        setInvestmentLoader(false)
      }else{
        setInvestmentLoader(false)
      }
    }

    const filterInvestment = async() =>{
      let url;
  
      if(searchValue.length !== 0){
        url = `http://127.0.0.1:8000/api/user-investment/?search=${searchValue}`
      }
  
  
      let response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type":"application/json",
          Authorization: `Bearer ${authTokens.access}`
        }
  
      })
  
      const data = await response.json()
  
      if(response.ok){
        setInvestmentData(data)
      }
    }
  
    const ActiveInvestment = async() =>{
      let response = await fetch('http://127.0.0.1:8000/api/user-investment/active/', {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens.access}`
        },
      })
  
      const data = await response.json()
      if(response.ok){
        if(Array.isArray(data) && data.length > 0){
          setActiveInvestmentCount(data.length)
        }

        const sortedData = data.sort((a, b) => b.id - a.id);
        setActiveInvestment(sortedData)
        setActiveInvestmentLoader(false)

      }else{
        setActiveInvestmentLoader(false)
      }
    }


    const filterActiveInvestment = async() =>{
      let url;
  
      if(searchValue.length !== 0){
        url = `http://127.0.0.1:8000/api/user-investment/active/?search=${searchValue}`
      }
  
  
      let response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type":"application/json",
          Authorization: `Bearer ${authTokens.access}`
        }
  
      })
  
      const data = await response.json()
  
      if(response.ok){
        setActiveInvestment(data)
      }
    }

  
    const PendingInvestment = async() =>{
      let response = await fetch('http://127.0.0.1:8000/api/user-investment/pending/', {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens.access}`
        },
      })
  
      const data = await response.json()
      if(response.ok){
        if(Array.isArray(data) && data.length > 0){
          setPendingInvestmentCount(data.length)
        }

        const sortedData = data.sort((a, b) => b.id - a.id);
        setPendingInvestment(sortedData)
        setPendingInvestmentLoader(false)
      }else{
        setPendingInvestmentLoader(false)
      }
    }

    const filterPendingInvestment = async() =>{
      let url;
  
      if(searchValue.length !== 0){
        url = `http://127.0.0.1:8000/api/user-investment/pending/?search=${searchValue}`
      }
  
  
      let response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type":"application/json",
          Authorization: `Bearer ${authTokens.access}`
        }
  
      })
  
      const data = await response.json()
  
      if(response.ok){
        setPendingInvestment(data)
      }
    }
  
    const CompletedInvestment = async() =>{
      let response = await fetch('http://127.0.0.1:8000/api/user-investment/completed/', {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens.access}`
        },
      })
  
      const data = await response.json()
      if(response.ok){
        if(Array.isArray(data) && data.length > 0){
          setCompletednvestmentCount(data.length)
        }

        const sortedData = data.sort((a, b) => b.id - a.id);
        setCompletedInvestment(sortedData)
        setCompletedInvestmentLoader(false)
        
      }else{
        setCompletedInvestmentLoader(false)
      }
    }

    const filterCompletedInvestment = async() =>{
      let url;
  
      if(searchValue.length !== 0){
        url = `http://127.0.0.1:8000/api/user-investment/completed/?search=${searchValue}`
      }
  
  
      let response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type":"application/json",
          Authorization: `Bearer ${authTokens.access}`
        }
  
      })
  
      const data = await response.json()
  
      if(response.ok){
        setCompletedInvestment(data)
      }
    }
  
    const DeclinedInvestment = async() =>{
      let response = await fetch('http://127.0.0.1:8000/api/user-investment/declined/', {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens.access}`
        },
      })
  
      const data = await response.json()
      if(response.ok){
        if(Array.isArray(data) && data.length > 0){
          setDeclinedInvestmentCount(data.length)
        }

        const sortedData = data.sort((a, b) => b.id - a.id);
        setDecinedInvestment(sortedData)
        setDeclinedInvestmentLoader(false)
      }else{
        setDeclinedInvestmentLoader(false)
      }
    }

    const filterDeclinedInvestment = async() =>{
      let url;
  
      if(searchValue.length !== 0){
        url = `http://127.0.0.1:8000/api/user-investment/declined/?search=${searchValue}`
      }
  
  
      let response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type":"application/json",
          Authorization: `Bearer ${authTokens.access}`
        }
  
      })
  
      const data = await response.json()
  
      if(response.ok){
        setDecinedInvestment(data)
      }
    }

    const Users = async() =>{
      let response = await fetch('http://127.0.0.1:8000/api/users/', {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens.access}`
        },
      })
  
      const data = await response.json()
      if(response.ok){
        if(Array.isArray(data) && data.length > 0){
          setUserCount(data.length)
        }

        const sortedData = data.sort((a, b) => new Date(b.date_joined) - new Date(a.date_joined));
        // Get the 5 most recent entries
        const recentData = sortedData.slice(0, 5);
        setRecentUserData(recentData)
        setUsersData(sortedData)
        setUsersDataLoader(false)
      }else{
        setUsersDataLoader(false)
      }
    }

    const DisableUsers = async() =>{
      let response = await fetch('http://127.0.0.1:8000/api/disable-account/', {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens.access}`
        },
      })
  
      const data = await response.json()
      if(response.ok){
        if(Array.isArray(data) && data.length > 0){
          setDisableUserCount(data.length)
        }
      }
    }

    const UserVerification = async() =>{
      let response = await fetch('http://127.0.0.1:8000/api/user/verification/', {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens.access}`
        },
      })
  
      const data = await response.json()
      if(response.ok){
        if(Array.isArray(data) && data.length > 0){
          setUserVerificationCount(data.length)
        }
      }
    }

    const PendingUserVerfication = async() =>{
      let response = await fetch('http://127.0.0.1:8000/api/users/verification/pending/', {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens.access}`
        },
      })
  
      const data = await response.json()
      if(response.ok){
        if(Array.isArray(data) && data.length > 0){
          setPendingUserVerificationCount(data.length)
        }
      }
    }


    const CanceledUserVerification = async() =>{
      let response = await fetch('http://127.0.0.1:8000/api/users/verification/canceled/', {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens.access}`
        },
      })
  
      const data = await response.json()
      if(response.ok){
        if(Array.isArray(data) && data.length > 0){
          setCanceledUserVerificationCount(data.length)
        }
      }
    }

    const UnverifiedUser = async() =>{
      let response = await fetch('http://127.0.0.1:8000/api/users/without-verification/', {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens.access}`
        },
      })
  
      const data = await response.json()
      if(response.ok){
        if(Array.isArray(data) && data.length > 0){
          setUnverfiedUserCount(data.length)
        }
      }
    }

    const verifiedUser = async() =>{
      let response = await fetch('http://127.0.0.1:8000/api/users/verification/verified/', {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens.access}`
        },
      })
  
      const data = await response.json()
      if(response.ok){
        if(Array.isArray(data) && data.length > 0){
          setVerifiedUserCount(data.length)
        }
      }
    }

    const KYC = async() =>{
      let response = await fetch('http://127.0.0.1:8000/api/user/kyc-verification/', {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens.access}`
        },
      })
  
      const data = await response.json()
      if(response.ok){
        if(Array.isArray(data) && data.length > 0){
          setKYCsCount(data.length)
        }
      }
    }

    const NotUploadKYC = async() =>{
      let response = await fetch('http://127.0.0.1:8000/api/users/without-KYC-verification/', {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens.access}`
        },
      })
  
      const data = await response.json()
      if(response.ok){
        if(Array.isArray(data) && data.length > 0){
          setNotUploadKYCsCount(data.length)
        }
      }
    }

    const VerifiedKYC = async() =>{
      let response = await fetch('http://127.0.0.1:8000/api/users/kyc-verification/verified/', {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens.access}`
        },
      })
  
      const data = await response.json()
      if(response.ok){
        if(Array.isArray(data) && data.length > 0){
          setVerifiedKYCsCount(data.length)
        }
      }
    }

    const CanceledKYC = async() =>{
      let response = await fetch('http://127.0.0.1:8000/api/users/kyc-verification/canceled/', {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens.access}`
        },
      })
  
      const data = await response.json()
      if(response.ok){
        if(Array.isArray(data) && data.length > 0){
          setCanceledKYCsCount(data.length)
        }
      }
    }

    const PendingKYC = async() =>{
      let response = await fetch('http://127.0.0.1:8000/api/users/kyc-verification/pending/', {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens.access}`
        },
      })
  
      const data = await response.json()
      if(response.ok){
        if(Array.isArray(data) && data.length > 0){
          setPendingKYCsCount(data.length)
        }
      }
    }

    const PaymentOptionsFunction = async() =>{
      let response = await fetch('http://127.0.0.1:8000/api/payment-method/', {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens.access}`
        },
      })
  
      const data = await response.json()
      if(response.ok){
        if(Array.isArray(data) && data.length > 0){
          setPaymentOptionsCount(data.length)
        }
        const sortedData = data.sort((a, b) => b.id - a.id);
        setPaymentOptionsData(sortedData)
        setPaymentOptionsLoader(false)
      }else{
        setPaymentOptionsLoader(false)
      }


    }

    const InvestmentPlan = async() =>{
      let response = await fetch('http://127.0.0.1:8000/api/investment-plan/', {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens.access}`
        },
      })
  
      const data = await response.json()
      if(response.ok){
        if(Array.isArray(data) && data.length > 0){
          setInvestmentPlanCount(data.length)
        }

        const sortedData = data.sort((a, b) => b.id - a.id);
        setInvestPlanData(sortedData)
      }
    }

    const Email = async() =>{
      let response = await fetch('http://127.0.0.1:8000/api/send-mail/', {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens.access}`
        },
      })
  
      const data = await response.json()
      if(response.ok){
        if(Array.isArray(data) && data.length > 0){
          setEmailCount(data.length)
        }
      }
    }

    const Bonus = async () => {
      try {
        let response = await fetch('http://127.0.0.1:8000/api/bonus/', {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authTokens.access}`
          },
        });
    
        const data = await response.json();
    
        if (response.ok) {
          if(Array.isArray(data) && data.length > 0){
            setBonusCount(data.length)
          }


          const totalAmount = data.reduce((acc, item) => acc + parseFloat(item.amount), 0);
          setTotalBonus(totalAmount);
    
          const sortedData = data.sort((a, b) => b.id - a.id);
          setBonusData(sortedData);
        } else {
          console.error("Unexpected response:", response.status, response.statusText);
        }
      } catch (error) {
        console.error("Error fetching bonus data:", error);
      }
    };

    const BlackList = async() =>{
      let response = await fetch('http://127.0.0.1:8000/api/Blacklist-ip/', {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens.access}`
        },
      })
  
      const data = await response.json()
      if(response.ok){
        if(Array.isArray(data) && data.length > 0){
          setBlackListCount(data.length)
        }

        const sortedData = data.sort((a, b) => b.id - a.id);
        setBlackListIPData(sortedData)
      }
    }

    const NewsLetter = async() =>{
      let response = await fetch('http://127.0.0.1:8000/api/news-letter/', {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens.access}`
        },
      })
  
      const data = await response.json()
      if(response.ok){
        if(Array.isArray(data) && data.length > 0){
          setNewsLetterCount(data.length)
        }

        const sortedData = data.sort((a, b) => b.id - a.id);
        setNewLetterData(sortedData)
      }
    }
    



    if(!searchValue){
      Deposit()
    }else if(searchValue){
      filterDeposits()
    }

    if(!searchValue){
      SuccessfulDeposit()
    }else if(searchValue){
      filterSuccessfulDeposits()
    }

    if(!searchValue){
      PendingDeposit()
    }else if(searchValue){
      filterPendingDeposits()
    }


    if(!searchValue){
      DeclinedDeposit()
    }else if(searchValue){
      filterDeclinedDeposits()
    }

    if(!searchValue){
      Withdraw()
    }else if(searchValue){
      filterWithdraws()
    }

    if(!searchValue){
      SuccessfulWithdraw()
    }else if(searchValue){
      filterSuccessfulWithdraws()
    }

    if(!searchValue){
      PendingWithdraw()
    }else if(searchValue){
      filterPendingWithdraws()
    }

    if(!searchValue){
      DeclinedWithdraw()
    }else if(searchValue){
      filterDeclinedWithdraws()
    }

    if(!searchValue){
      Investment()
    }else if(searchValue){
      filterInvestment()
    }

    if(!searchValue){
      ActiveInvestment()
    }else if(searchValue){
      filterActiveInvestment()
    }

    if(!searchValue){
      PendingInvestment()
    }else if(searchValue){
      filterPendingInvestment()
    }

    if(!searchValue){
      CompletedInvestment()
    }else if(searchValue){
      filterCompletedInvestment()
    }

    if(!searchValue){
      DeclinedInvestment()
    }else if(searchValue){
      filterDeclinedInvestment()
    }


    if(!usersCount){
      Users()
    }

    if(!disableUserCount){
      DisableUsers()

    }

    if(!userVerificationCount){
      UserVerification()
    }
    if(!pendingUserVerificationCount){
      PendingUserVerfication()
      
    }
    if(!canceledUserVerificationCount){
      CanceledUserVerification()
      
    }
    if(!unverifiedUserCount){
      UnverifiedUser()
      
    }
    if(!verifiedUserCount){
      verifiedUser()
    }

    if(!KYCsCount){
      KYC()
    }

    if(!notUploadKYCsCount){
      NotUploadKYC()
    }

    if(!verifiedKYCsCount){
      VerifiedKYC()
    }

    if(!canceledKYCsCount){
      CanceledKYC()
    }

    if(!pendingKYCsCount){
      PendingKYC()
    }

    if(!emailCount){
      Email()
    }

    if(!investmentPlanCount){
      InvestmentPlan()
    }

    if(!paymentOptionsCount){
      PaymentOptionsFunction()
    }

    if(bonusData){
      Bonus()
    }
    BlackList()
    NewsLetter()

  }, [searchValue,   
      verifiedUserCount, unverifiedUserCount, canceledUserVerificationCount, pendingUserVerificationCount, userVerificationCount, disableUserCount, usersCount, 
      KYCsCount,  notUploadKYCsCount, verifiedKYCsCount, canceledKYCsCount, pendingKYCsCount,
      emailCount, 
      investmentCount, paymentOptionsCount,
    ])

  useEffect(() =>{
    document.body.style.backgroundColor = "#161616"

    return() =>{
      document.body.style.backgroundColor = "#f4f4f4"
    }
  }) 

  

  return(
    <div>
      <div className="dashboard-bg">
        <div>
          <div className={`dashboard-sidebar ${showSidebar ? 'show-sidebar': 'close-sidebar'}`}>
            <div className="dashboard-sidebar-head pt-3 mx-4 "><h4>ADMIN PANEL</h4><FontAwesomeIcon icon={faArrowLeft} onClick={toggleCloseSidebar} className="close-sidebar-btn pt-1 sm-text cursor-pointer"/></div>
            <hr />
            <ul className="scroll-bar-y dashboard-sidebar-height">
              <li className='mt-3 py-3'>
                <Link to='/admin/home' className='dashboard-link' onClick={OnbodyClick}>
                  <div className="d-flex ps-3">
                    <i class="bi bi-speedometer2 sm-text me-3"></i>
                    <p className='pt-1'>Dashboard</p>
                  </div>
                </Link>
              </li>
              <li className={`pb-2 ${isActiveDashLink("/admin") ?"active-dash-link": ""}  cursor-pointer`}>
                <div className='row mb-2 dashboard-sidebar-list' onClick={toggleDeposit}>
                  <div className='col-8 ps-4 y'>
                    <div className="d-flex">
                      <FontAwesomeIcon className='me-3  sm-text' icon={faHandHoldingDollar}/>
                      <p className='pt-1'>Deposit</p>
                    </div>

                  </div>
                  <div className="col-4 ">
                    <div className="d-flex me-2 justify-content-end mt-1" >
                      <p className='me-1 dahboard-sidebar-count'>{depositCount}</p>
                      <p className={`${depositDropdown ? 'rotate-90deg': ''}`}><i class="bi bi-chevron-right xsm-text" ></i></p>
                    </div>
                  </div>
                </div>
                

                <div>
                  <ul className={` dropdown-bg ${depositDropdown ? "slide-in" : "slide-out"}`}>
                    <li className={`dashboard-sidebar-dropdown-link ps-5 ${isActiveDashLink("/admin/addStudent") ?"active-dash-link": ""}`}>
                      <div className="d-flex">
                        <Link className='dashboard-link' to="/admin/successful-deposits" onClick={OnbodyClick}>Confirmed</Link> 
                        <p className='ps-3'>({successDespositCount})</p>
                      </div>
                    </li>

                    <li className={`dashboard-sidebar-dropdown-link ps-5 pt-2 ${isActiveDashLink("/admin/addStudent") ?"active-dash-link": ""}`}>
                      <div className="d-flex">
                      <Link className='dashboard-link' to="/admin/declined-deposits" onClick={OnbodyClick}>Declined</Link> 
                        <p className='ps-3'>({declinedDepositCount})</p>
                      </div>
                    </li>

                    <li className={`dashboard-sidebar-dropdown-link ps-5 pt-2 ${isActiveDashLink("/admin/addStudent") ?"active-dash-link": ""}`}>
                      <div className="d-flex">
                        <Link className='dashboard-link' to="/admin/pending-deposits" onClick={OnbodyClick}>Pending</Link> 
                        <p className='ps-3'>({pendingDespositCount})</p>
                      </div>
                     
                    </li>

                    <li className={`dashboard-sidebar-dropdown-link ps-5 pt-2 ${isActiveDashLink("/admin/addStudent") ?"active-dash-link": ""}`}>
                      <div className="d-flex">
                      <Link className='dashboard-link' to="/admin/all-deposits" onClick={OnbodyClick}>All Deposit</Link> 
                        <p className='ps-3'>({depositCount})</p>
                      </div>
                    </li>

                    <li className={`pb-2 dashboard-sidebar-dropdown-link ps-5 pt-2 ${isActiveDashLink("/admin/addStudent") ?"active-dash-link": ""}`}>
                      <Link className='dashboard-link' to="/admin/add-deposits" onClick={OnbodyClick}>Add New</Link> 
                    </li>
                    
                  </ul>
                </div>


     
              </li>

              <li className={`pb-2 ${isActiveDashLink("/admin") ?"active-dash-link": ""}  cursor-pointer`}>
                <div className='row mb-2 dashboard-sidebar-list' onClick={toggleWithdraw}>
                  <div className='col-8 ps-4 '>
                    <div className="d-flex">
                      <FontAwesomeIcon className='me-3 pt-1 sm-text' icon={faMoneyBillTransfer}/>
                      <p className='pt-1'>Withdraw</p>
                    </div>

                  </div>
                  <div className="col-4 ">
                    <div className="d-flex me-2 justify-content-end mt-1" >
                      <p className='me-1 dahboard-sidebar-count'>{withdrawCount}</p>
                      <p className={`${withdrawDropdown ? 'rotate-90deg': ''}`}><i class="bi bi-chevron-right xsm-text" ></i></p>
                    </div>
                  </div>
                </div>
                

                <div>
                  <ul className={` dropdown-bg ${withdrawDropdown ? "slide-in" : "slide-out"}`}>
                    <li className={`dashboard-sidebar-dropdown-link ps-5 ${isActiveDashLink("/admin/addStudent") ?"active-dash-link": ""}`}>
                      <div className="d-flex">
                        <Link className='dashboard-link' to="/admin/successful-withdraws" onClick={OnbodyClick}>Confirmed</Link> 
                        <p className='ps-3'>({SuccessWithdrawCount})</p>
                      </div>
                    </li>

                    <li className={`dashboard-sidebar-dropdown-link ps-5 pt-2 ${isActiveDashLink("/admin/addStudent") ?"active-dash-link": ""}`}>
                      <div className="d-flex">
                      <Link className='dashboard-link' to="/admin/declined-withdraws" onClick={OnbodyClick}>Declined</Link> 
                        <p className='ps-3'>({declinedWithdrawCount})</p>
                      </div>
                    </li>

                    <li className={`dashboard-sidebar-dropdown-link ps-5 pt-2 ${isActiveDashLink("/admin/addStudent") ?"active-dash-link": ""}`}>
                      <div className="d-flex">
                        <Link className='dashboard-link' to="/admin/pending-withdraws" onClick={OnbodyClick}>Pending</Link> 
                        <p className='ps-3'>({pendingWithdrawCount})</p>
                      </div>
                     
                    </li>

                    <li className={`dashboard-sidebar-dropdown-link ps-5 pt-2 ${isActiveDashLink("/admin/addStudent") ?"active-dash-link": ""}`}>
                      <div className="d-flex">
                      <Link className='dashboard-link' to="/admin/all-withdraws" onClick={OnbodyClick}>All Withdraw</Link> 
                        <p className='ps-3'>({withdrawCount})</p>
                      </div>
                    </li>

                    <li className={`pb-2 dashboard-sidebar-dropdown-link ps-5 pt-2 ${isActiveDashLink("/admin/addStudent") ?"active-dash-link": ""}`}>
                      <Link className='dashboard-link' to="/admin/add-withdraw" onClick={OnbodyClick}>Add New</Link> 
                    </li>
                    
                  </ul>
                </div>


     
              </li>

              <li className={`pb-2 ${isActiveDashLink("/admin") ?"active-dash-link": ""}  cursor-pointer`}>
                <div className='row mb-2 dashboard-sidebar-list' onClick={toggleInvestment}>
                  <div className='col-8 ps-4 '>
                    <div className="d-flex">
                      <i class="bi bi-bar-chart me-3 sm-text"></i>
                      <p className='pt-1'>Investment</p>
                    </div>

                  </div>
                  <div className="col-4 ">
                    <div className="d-flex me-2 justify-content-end mt-1" >
                      <p className='me-1 dahboard-sidebar-count'>{investmentCount}</p>
                      <p className={`${investmentDropdown ? 'rotate-90deg': ''}`}><i class="bi bi-chevron-right xsm-text" ></i></p>
                    </div>
                  </div>
                </div>
                

                <div>
                  <ul className={` dropdown-bg ${investmentDropdown ? "slide-in" : "slide-out"}`}>
                    <li className={`dashboard-sidebar-dropdown-link ps-5 ${isActiveDashLink("/admin/active-investment") ?"active-dash-link": ""}`}>
                      <div className="d-flex">
                        <Link className='dashboard-link' to="/admin/active-investment" onClick={OnbodyClick}>Active</Link> 
                        <p className='ps-3'>({activeInvestmentCount})</p>
                      </div>
                    </li>

                    <li className={`dashboard-sidebar-dropdown-link ps-5 pt-2 ${isActiveDashLink("/admin/compeleted-investment") ?"active-dash-link": ""}`}>
                      <div className="d-flex">
                      <Link className='dashboard-link' to="/admin/compeleted-investment" onClick={OnbodyClick}>Completed</Link> 
                        <p className='ps-3'>({completedInvestmentCount})</p>
                      </div>
                    </li>

                    <li className={`dashboard-sidebar-dropdown-link ps-5 pt-2 ${isActiveDashLink("/admin/canceled-investment") ?"active-dash-link": ""}`}>
                      <div className="d-flex">
                        <Link className='dashboard-link' to="/admin/canceled-investment" onClick={OnbodyClick}>Canceled</Link> 
                        <p className='ps-3'>({declinedInvestmentCount})</p>
                      </div>
                     
                    </li>

                    <li className={`dashboard-sidebar-dropdown-link ps-5 pt-2 ${isActiveDashLink("/admin/pending-investment") ?"active-dash-link": ""}`}>
                      <div className="d-flex">
                        <Link className='dashboard-link' to="/admin/pending-investment" onClick={OnbodyClick}>Pending</Link> 
                        <p className='ps-3'>({pendingInvestmentCount})</p>
                      </div>
                     
                    </li>

                    <li className={`dashboard-sidebar-dropdown-link ps-5 pt-2 ${isActiveDashLink("/admin/all-investment") ?"active-dash-link": ""}`}>
                      <div className="d-flex">
                      <Link className='dashboard-link' to="/admin/all-investment">All Investment</Link> 
                        <p className='ps-3'>({investmentCount})</p>
                      </div>
                    </li>

                    <li className={`pb-2 dashboard-sidebar-dropdown-link ps-5 pt-2 ${isActiveDashLink("/admin/add-investment") ?"active-dash-link": ""}`}>
                      <Link className='dashboard-link' to="/admin/add-investment" onClick={OnbodyClick}>Add New</Link> 
                    </li>
                    
                  </ul>
                </div>


     
              </li>
              <li className='pb-3'>
                <Link className='dashboard-link' onClick={OnbodyClick}>
                  <div className="d-flex ps-3">
                    <i class="bi bi-coin sm-text me-3"></i>
                    <p className='pt-1'>Interest log</p>
                  </div>
                </Link>
              </li>

              <li className='pb-3'>
                <Link className='dashboard-link' onClick={OnbodyClick}>
                  <div className="d-flex ps-3">
                    <FontAwesomeIcon className='sm-text pt-1 me-3' icon={faCoins}/>
                    <p className='pt-1'>Bonus log</p>
                  </div>
                </Link>
              </li>

              <li className='pb-2'>
                <Link className='dashboard-link' onClick={OnbodyClick}>
                  <div className="d-flex ps-3">
                    <FontAwesomeIcon className='sm-text pt-1 me-3' icon={faPercent}/>
                    <p className='pt-1'>Comission log</p>
                  </div>
                </Link>
              </li>

              <li className={`pb-2 ${isActiveDashLink("/admin") ?"active-dash-link": ""}  cursor-pointer`}>
                <div className='row mb-2 dashboard-sidebar-list' onClick={toggleUser}>
                  <div className='col-8 ps-4 '>
                    <div className="d-flex">
                      <i class="bi bi-people-fill me-3 sm-text"></i>
                      <p className='pt-1'>Users</p>
                    </div>

                  </div>
                  <div className="col-4 ">
                    <div className="d-flex me-2 justify-content-end mt-1" >
                      <p className='me-1 dahboard-sidebar-count'>{usersCount}</p>
                      <p className={`${usersDropdown ? 'rotate-90deg': ''}`}><i class="bi bi-chevron-right xsm-text" ></i></p>
                    </div>
                  </div>
                </div>
                

                <div>
                  <ul className={` dropdown-bg ${usersDropdown ? "slide-in" : "slide-out"}`}>
                    <li className={`dashboard-sidebar-dropdown-link ps-5 ${isActiveDashLink("/admin/addStudent") ?"active-dash-link": ""}`}>
                      <div className="d-flex">
                        <Link className='dashboard-link' to="/admin/addStudent" onClick={OnbodyClick}>Disable</Link> 
                        <p className='ps-3'>({disableUserCount})</p>
                      </div>
                    </li>

                    <li className={`dashboard-sidebar-dropdown-link ps-5 pt-2 ${isActiveDashLink("/admin/addStudent") ?"active-dash-link": ""}`}>
                      <div className="d-flex">
                      <Link className='dashboard-link' to="/admin/addStudent" onClick={OnbodyClick}>Users Verifiaction</Link> 
                        <p className='ps-3'>({userVerificationCount})</p>
                      </div>
                    </li>

                    <li className={`dashboard-sidebar-dropdown-link ps-5 pt-2 ${isActiveDashLink("/admin/addStudent") ?"active-dash-link": ""}`}>
                      <div className="d-flex">
                      <Link className='dashboard-link' to="/admin/addStudent" onClick={OnbodyClick}>Pending</Link> 
                        <p className='ps-3'>({pendingUserVerificationCount})</p>
                      </div>
                    </li>

                    <li className={`dashboard-sidebar-dropdown-link ps-5 pt-2 ${isActiveDashLink("/admin/addStudent") ?"active-dash-link": ""}`}>
                      <div className="d-flex">
                        <Link className='dashboard-link' to="/admin/addStudent" onClick={OnbodyClick}>Verified Users</Link> 
                        <p className='ps-3'>({verifiedUserCount})</p>
                      </div>       
                    </li>

                    <li className={`dashboard-sidebar-dropdown-link ps-5 pt-2 ${isActiveDashLink("/admin/addStudent") ?"active-dash-link": ""}`}>
                      <div className="d-flex">
                        <Link className='dashboard-link' to="/admin/addStudent" onClick={OnbodyClick}>Canceled Verification</Link> 
                        <p className='ps-3'>({canceledUserVerificationCount})</p>
                      </div>       
                    </li>

                    <li className={`dashboard-sidebar-dropdown-link ps-5 pt-2 ${isActiveDashLink("/admin/addStudent") ?"active-dash-link": ""}`}>
                      <div className="d-flex">
                        <Link className='dashboard-link' to="/admin/addStudent" onClick={OnbodyClick}>Unverified</Link> 
                        <p className='ps-3'>({unverifiedUserCount})</p>
                      </div>
                     
                    </li>

                    <li className={`dashboard-sidebar-dropdown-link ps-5 pt-2 ${isActiveDashLink("/admin/addStudent") ?"active-dash-link": ""}`}>
                      <Link className='dashboard-link' to="/admin/addStudent" onClick={OnbodyClick}>Users List</Link> 
                    </li>

                    <li className={`pb-2 dashboard-sidebar-dropdown-link ps-5 pt-2 ${isActiveDashLink("/admin/addStudent") ?"active-dash-link": ""}`}>
                      <Link className='dashboard-link' to="/admin/addStudent" onClick={OnbodyClick}>Add New</Link> 
                    </li>
                    
                  </ul>
                </div>


     
              </li>

              <li className={`pb-2 ${isActiveDashLink("/admin") ?"active-dash-link": ""}  cursor-pointer`}>
                <div className='row mb-2 dashboard-sidebar-list' onClick={toggleKyc}>
                  <div className='col-8 ps-4 '>
                    <div className="d-flex">
                      <FontAwesomeIcon className='me-3 pt-1 sm-text' icon={faShield}/>
                      <p className='pt-1'>KYCs</p>
                    </div>

                  </div>
                  <div className="col-4 ">
                    <div className="d-flex me-2 justify-content-end mt-1" >
                      <p className='me-1 dahboard-sidebar-count'>{KYCsCount}</p>
                      <p className={`${kycDropdown ? 'rotate-90deg': ''}`}><i class="bi bi-chevron-right xsm-text" ></i></p>
                    </div>
                  </div>
                </div>
                

                <div>
                  <ul className={` dropdown-bg ${kycDropdown ? "slide-in" : "slide-out"}`}>
                    <li className={`dashboard-sidebar-dropdown-link ps-5 ${isActiveDashLink("/admin/addStudent") ?"active-dash-link": ""}`}>
                      <div className="d-flex">
                        <Link className='dashboard-link' to="/admin/addStudent" onClick={OnbodyClick}>Not Uploaded</Link> 
                        <p className='ps-3'>({notUploadKYCsCount})</p>
                      </div>
                    </li>

                    <li className={`dashboard-sidebar-dropdown-link ps-5 pt-2 ${isActiveDashLink("/admin/addStudent") ?"active-dash-link": ""}`}>
                      <div className="d-flex">
                      <Link className='dashboard-link' to="/admin/addStudent" onClick={OnbodyClick}>Verified</Link> 
                        <p className='ps-3'>({verifiedKYCsCount})</p>
                      </div>
                    </li>

                    <li className={`dashboard-sidebar-dropdown-link ps-5 pt-2 ${isActiveDashLink("/admin/addStudent") ?"active-dash-link": ""}`}>
                      <div className="d-flex">
                        <Link className='dashboard-link' to="/admin/addStudent" onClick={OnbodyClick}>Rejected</Link> 
                        <p className='ps-3'>({canceledKYCsCount})</p>
                      </div>
                     
                    </li>

                    <li className={`dashboard-sidebar-dropdown-link ps-5 pt-2 ${isActiveDashLink("/admin/addStudent") ?"active-dash-link": ""}`}>
                      <div className="d-flex">
                        <Link className='dashboard-link' to="/admin/addStudent" onClick={OnbodyClick}>Pending</Link> 
                        <p className='ps-3'>({pendingKYCsCount})</p>
                      </div>
                     
                    </li>

                    <li className={`dashboard-sidebar-dropdown-link ps-5 pt-2 ${isActiveDashLink("/admin/addStudent") ?"active-dash-link": ""}`}>
                      <Link className='dashboard-link' to="/admin/addStudent" onClick={OnbodyClick}>KYCs List</Link> 
                    </li>

                    <li className={`pb-2 dashboard-sidebar-dropdown-link ps-5 pt-2 ${isActiveDashLink("/admin/addStudent") ?"active-dash-link": ""}`}>
                      <Link className='dashboard-link' to="/admin/addStudent" onClick={OnbodyClick}>Add New</Link> 
                    </li>
                    
                  </ul>
                </div>


     
              </li>

              <li className='pb-3'>
                <Link className='dashboard-link'>
                  <div className="d-flex ps-3">
                    <FontAwesomeIcon className='sm-text pt-1 me-3' icon={faSackDollar}/>
                    <p className='pt-1'>Fund Account</p>
                  </div>
                </Link>
              </li>

              <li className={`pb-2 ${isActiveDashLink("/admin") ?"active-dash-link": ""}  cursor-pointer`}>
                <div className='row mb-2 dashboard-sidebar-list' onClick={toggleEmail}>
                  <div className='col-8 ps-4 '>
                    <div className="d-flex">
                      <FontAwesomeIcon className='sm-text pt-1 me-3' icon={faEnvelope}/>
                      <p className='pt-1'>Email</p>
                    </div>

                  </div>
                  <div className="col-4 ">
                    <div className="d-flex me-2 justify-content-end mt-1" >
                      <p className='me-1 dahboard-sidebar-count'>{emailCount}</p>
                      <p className={`${emailDropdown ? 'rotate-90deg': ''}`}><i class="bi bi-chevron-right xsm-text" ></i></p>
                    </div>
                  </div>
                </div>
                

                <div>
                  <ul className={` dropdown-bg ${emailDropdown ? "slide-in" : "slide-out"}`}>

                    <li className={`dashboard-sidebar-dropdown-link ps-5 pt-2 ${isActiveDashLink("/admin/addStudent") ?"active-dash-link": ""}`}>
                      <Link className='dashboard-link' to="/admin/addStudent" onClick={OnbodyClick}>Send Email</Link> 
                    </li>

                    <li className={`dashboard-sidebar-dropdown-link ps-5 pt-2 ${isActiveDashLink("/admin/addStudent") ?"active-dash-link": ""}`}>
                      <Link className='dashboard-link' to="/admin/addStudent" onClick={OnbodyClick}>Bulk Email</Link> 
                    </li>

                    <li className={`pb-2 dashboard-sidebar-dropdown-link ps-5 pt-2 ${isActiveDashLink("/admin/addStudent") ?"active-dash-link": ""}`}>
                      <div className="d-flex">
                        <Link className='dashboard-link' to="/admin/addStudent" onClick={OnbodyClick}>All Email</Link> 
                        <p className='ps-3'>({emailCount})</p>
                      </div>
                     
                    </li>
                    
                  </ul>
                </div>


     
              </li>

              <li className='pb-3'>
                <Link className='dashboard-link' onClick={OnbodyClick}>
                  <div className="d-flex ps-3">
                    <FontAwesomeIcon className='sm-text pt-1 me-3' icon={faBan}/>
                    <p className='pt-1'>Blacklist IP</p>
                  </div>
                </Link>
              </li>

              <li className='pb-3'>
                <Link className='dashboard-link' onClick={OnbodyClick}>
                  <div className="d-flex ps-3">
                    <FontAwesomeIcon className='sm-text pt-1 me-3' icon={faEnvelopesBulk}/>
                    <p className='pt-1'>Newsletter Subscribers</p>
                  </div>
                </Link>
              </li>

              <li className={`pb-2 ${isActiveDashLink("/admin") ?"active-dash-link": ""}  cursor-pointer`}>
                <div className='row mb-2 dashboard-sidebar-list' onClick={toggleInvestmentPlan}>
                  <div className='col-8 ps-4 '>
                    <div className="d-flex">
                      <FontAwesomeIcon className='me-3 pt-1 sm-text' icon={faCube}/>
                      <p className='pt-1'>Investment Plans</p>
                    </div>

                  </div>
                  <div className="col-4 ">
                    <div className="d-flex me-2 justify-content-end mt-1" >
                      <p className='me-1 dahboard-sidebar-count'>{investmentPlanCount}</p>
                      <p className={`${investmentPlanDropdown ? 'rotate-90deg': ''}`}><i class="bi bi-chevron-right xsm-text" ></i></p>
                    </div>
                  </div>
                </div>
                

                <div>
                  <ul className={` dropdown-bg ${investmentPlanDropdown ? "slide-in" : "slide-out"}`}>
                    <li className={`dashboard-sidebar-dropdown-link ps-5 ${isActiveDashLink("/admin/addStudent") ?"active-dash-link": ""}`}>
                      <div className="d-flex">
                        <Link className='dashboard-link' to="/admin/addStudent" onClick={OnbodyClick}>All plans</Link> 
                        <p className='ps-3'>({investmentPlanCount})</p>
                      </div>
                    </li>

                    <li className={`pb-2 dashboard-sidebar-dropdown-link ps-5 pt-2 ${isActiveDashLink("/admin/addStudent") ?"active-dash-link": ""}`}>
                      <Link className='dashboard-link' to="/admin/addStudent" onClick={OnbodyClick}>Add New</Link> 
                    </li>
                    
                  </ul>
                </div>


     
              </li>

              <li className={`mb-5 pb-2 ${isActiveDashLink("/admin") ?"active-dash-link": ""}  cursor-pointer`}>
                <div className='row mb-2 dashboard-sidebar-list' onClick={togglePaymentOptions}>
                  <div className='col-8 ps-4 '>
                    <div className="d-flex">
                      <FontAwesomeIcon className='me-3 pt-1 sm-text' icon={faRightLeft}/>
                      <p className='pt-1'>Payment Options</p>
                    </div>

                  </div>
                  <div className="col-4 ">
                    <div className="d-flex me-2 justify-content-end mt-1" >
                      <p className='me-1 dahboard-sidebar-count'>{paymentOptionsCount}</p>
                      <p className={`${paymentOptions ? 'rotate-90deg': ''}`}><i class="bi bi-chevron-right xsm-text" ></i></p>
                    </div>
                  </div>
                </div>
                

                <div>
                  <ul className={` dropdown-bg ${paymentOptions ? "slide-in" : "slide-out"}`}>
                    <li className={`dashboard-sidebar-dropdown-link ps-5 ${isActiveDashLink("/admin/addStudent") ?"active-dash-link": ""}`}>
                      <div className="d-flex">
                        <Link className='dashboard-link' to="/admin/addStudent" onClick={OnbodyClick}>All Payment Options</Link> 
                        <p className='ps-3'>({paymentOptionsCount})</p>
                      </div>
                    </li>

                    <li className={`pb-2 dashboard-sidebar-dropdown-link ps-5 pt-2 ${isActiveDashLink("/admin/addStudent") ?"active-dash-link": ""}`}>
                      <Link className='dashboard-link' to="/admin/addStudent" onClick={OnbodyClick}>Add New</Link> 
                    </li>
                    
                  </ul>
                </div>


     
              </li>



            </ul>

          </div>

          <div className="dashboard-content">
            <nav className="text-light d-flex align-items-center justify-content-between position-sticky">
              <div className="mx-3"><FontAwesomeIcon icon={faBars} onClick={toggleShowSidebar} className=" dashboard-menu-bar cursor-pointer"/></div>
              <div className="d-flex align-items-center">
                <Link className='light-link dashboard-content-site-link'>
                  <div className='d-flex pe-5 me-5'>
                    <div>
                      <FontAwesomeIcon icon={faLock}/>
                    </div>
                    <p className='mx-2'>Visit website</p>
                    <i class="bi bi-box-arrow-in-up-right"></i>
                  </div>
                </Link>
                <div className="dashboard-content-user-link cursor-pointer">
                  <div className="d-flex " onClick={toggleNavDropdown}>
                    <img src={userIcon} width='35px' alt="" />
                    <p className='px-2 pt-1'>AmanilightEquity</p>
                    <p className='pt-1'><FontAwesomeIcon className='xsm-text' icon={faAngleDown}/></p>
                  </div>
                  {navDropdown &&
                    <div className="dashboard-content-user-drop-down">
                      <ul className=''>
                        <li className='pb-2'>
                          <Link className='light-link'>
                            <div className="d-flex">
                              <i class="bi bi-gear pe-2"></i>
                              <p className=''>Change password </p>
                            </div>
                          </Link>
                        </li>
                        <li className='pb-2'>
                          <Link className='light-link'>
                            <div className="d-flex">
                              <i class="bi bi-person-fill pe-2"></i>
                              <p className=''>User details</p>
                            </div>
                          </Link>
                        </li>
                        <li className='pb-2'>
                          <Link className='light-link'>
                            <div className="d-flex">
                              <i class="bi bi-box-arrow-in-up-right pe-2"></i>
                              <p className=''>Logout</p>
                            </div>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  }
                </div>
              </div>
            </nav>

          </div>
        </div>
      </div>

    </div>

  )

}