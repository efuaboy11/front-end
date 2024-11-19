import { createContext, useContext, useEffect, useState } from "react";
import AuthContext from "./AuthContext";

const AllDataContext = createContext()
export default AllDataContext

export const AllDataProvider =  ({ children }) =>{
  const {authTokens} = useContext(AuthContext) 
  const [depositCount, setDepositCount] = useState(0)
  const [successDespositCount, setSuccessDepositCount] = useState(0)
  const [pendingDespositCount, setPendingDespositCount] = useState(0)
  const [declinedDepositCount, setDeclinedDepositCount] = useState(0)

  const [recentDeposit, setRecentDeposit] = useState([])
  const [depositData, setDepositData]  = useState([])
  const [totalDeposit, setTotalDeposit] = useState([])
  const [recentPendingDeposit, setRecentPendingDeposit] = useState([])
  const [pendingDepositData, setPendingDepositData] = useState([])
  const [recentSuccessfulDeposit, setRecentSuccessDeposit] = useState([])
  const [successfulDepositData, setSuccessfulDepositData] = useState([])
  const [recentDeclinedDeposit, setRecentDeclinedDeposit] = useState([])
  const [declinedDepositData, setDeclinedDepositData] = useState([])

  const [depositLoader, setDepositLoader] = useState(true)
  const [pendingDepositLoader, setPendingDepositLoader] = useState(true)
  const [declinedDepositLoader, setDeclinedDepositLoader] = useState(true)
  const [successfulDepositLoader, setSuccessfulDepositLoader] = useState(true)

  const [allDepositSearch, setallDepositSearch] = useState('')
  const [successfulDepositSearch, setSuccessfulDepositSearch] = useState('')
  const [pendingDepositSearch, setPendingDepositSearch] = useState('')
  const [declinedDepositSearch, setDeclinedDepositSearch] = useState('')

  

  const [withdrawCount, setWithdrawCount] = useState(0)
  const [SuccessWithdrawCount, setSuccessWithdrawCount] = useState(0)
  const [pendingWithdrawCount, setPendingWithdrawCount] = useState(0)
  const [declinedWithdrawCount, setDeclinedWithdrawCount] = useState(0)
  const [recentWithdraw, setRecentWithdraw] = useState([])
  const [withdrawData, setWithdrawData] = useState([])
  const [totalWithdraw, setTotalWithdraw] = useState([])
  const [recentPendingWithdraw, setRecentPendingWithdraw] = useState([])
  const [pendingWithdrawData, setPendingWithdrawData] = useState([])
  const [recentSuccessfulWithdraw, setRecentSuccessWithdraw] = useState([])
  const [successfulWithdrawData, setSuccessfulWithdrawData] = useState([])
  const [recentDeclinedWithdraw, setRecentDeclinedWithdraw] = useState([])
  const [declinedWithdrawData, setDeclinedWithdrawData] =  useState([])

  const [withdrawLoader, setWithdrawLoader] = useState(true)
  const [pendingWithdrawLoader, setPendingWithdrawLoader] = useState(true) 
  const [declinedWithdrawLoader, setDeclinedWithdrawLoader] = useState(true)
  const [successfulWithdrawLoader, setSuccessWithdrawLoader] = useState(true)

  const [allWithdrawSearch, setallWithdrawSearch] = useState('')
  const [successfulWithdrawSearch, setSuccessWithdrawSearch] = useState('')
  const [pendingWithdrawSearch, setPendingWithdrawSearch] = useState('')
  const [declinedWithdrawSearch, setDeclinedWithdrawSearch] = useState('')
          
          
  const [investmentCount, setInvestmentCount] = useState(0)
  const [activeInvestmentCount, setActiveInvestmentCount] = useState(0)
  const [completedInvestmentCount, setCompletednvestmentCount] = useState(0)
  const [pendingInvestmentCount, setPendingInvestmentCount] = useState(0)
  const [declinedInvestmentCount, setDeclinedInvestmentCount] = useState(0)

  const [investmentData, setInvestmentData] = useState([])
  const [totalInvestment, setTotalInvestment] = useState([])
  const [pendingInvestment, setPendingInvestment] = useState([])
  const [activeInvestment, setActiveInvestment] = useState([])
  const [completedInvestment, setCompletedInvestment] = useState([])
  const [declinedInvestment, setDecinedInvestment] = useState([])

  const [investmentLoader, setInvestmentLoader] = useState(true)
  const [pendingInvestmentLoader, setPendingInvestmentLoader] = useState(true)
  const [activeInvestmentLoader, setActiveInvestmentLoader] = useState(true)
  const [completedInvestmentLoader, setCompletedInvestmentLoader] = useState(true)
  const [declinedInvestmentLoader, setDeclinedInvestmentLoader] = useState(true)

  const [investmentSearch, setInvestmentSearch] = useState('')
  const [activeInvestmentSearch, setActiveInvestmentSearch] = useState('')
  const [completedInvestmentSearch, setCompletedInvestmentSearch] = useState('')
  const [pendingInvestmentSearch, setPendingInvestmentSearch] = useState('')
  const [declinedInvestmentSearch, setDeclinedInvestmentSearch] = useState('')
  
  const [interestCount, setInterestCount] = useState(0)
  const [interestData, setInterestData] = useState([])
  const [interestLoader, setInterestLoader] = useState(true)
  const [interestsearchValue, setInterestSearchValue] = useState('')

  const [usersCount, setUserCount] = useState(0)
  const [disableUserCount, setDisableUserCount] = useState(0)
  const [userVerificationCount, setUserVerificationCount] = useState(0)
  const [pendingUserVerificationCount, setPendingUserVerificationCount] = useState(0)
  const [canceledUserVerificationCount, setCanceledUserVerificationCount] = useState(0)
  const [unverifiedUserCount, setUnverfiedUserCount] = useState(0)
  const [verifiedUserCount, setVerifiedUserCount] = useState(0)
  const [usersData, setUsersData] = useState([])
  const [recentUserData, setRecentUserData] = useState([])
  const [usersDataLoader, setUsersDataLoader] = useState(true)

  const [userSearch, setUserSearch] = useState('')
  const [disableUserSeacrh, setDisableUserSearch] = useState('')
  const [userVerificationSearch, setUserVerificationSearch] = useState('')
  const [pendingUserVerificationSearch, setPendingUserVerificationSearch] = useState('')
  const [canceledUserVerificationsearch, setCanceledUserVerificationSearch] = useState('')
  const [unverifiedUserSearch, setUnverfiedUserSearch] = useState('')
  
  const [KYCsCount, setKYCsCount] = useState(0)
  const [notUploadKYCsCount, setNotUploadKYCsCount] = useState(0)
  const [verifiedKYCsCount, setVerifiedKYCsCount] = useState(0)
  const [canceledKYCsCount, setCanceledKYCsCount] = useState(0)
  const [pendingKYCsCount, setPendingKYCsCount] = useState(0)

  const [KYCSeacrh, setKYCSearch] = useState('')
  const [notUploadKYCSearch, setNotUploadKYCSearch] = useState('')
  const [verifiedKYCSearch, setVerifiedKYCSearch] = useState('')
  const [canceledKYCSearch, setCanceledKYCSearch] = useState('')
  const [pendingKYCSearch, setPendingKYCSearch] = useState('')

  const [emailCount, setEmailCount] = useState(0)


  const [investmentPlanCount, setInvestmentPlanCount] = useState(0)
  const [investmentPlanData, setInvestPlanData] = useState([])

  const [paymentOptionsCount, setPaymentOptionsCount] = useState(0)
  const [paymentOptionsData, setPaymentOptionsData] = useState([])
  const [paymentOptionsLoader, setPaymentOptionsLoader] = useState(true)

  const [bonusData, setBonusData] = useState([])
  const [totalBonus, setTotalBonus] = useState(0)
  const [bonusCount, setBonusCount] = useState(0)
  const [bonusLoader, setBonusLoader] = useState(true)
  const [bonusSearch, setBonusSearch] = useState('')


  const [blackListIPData, setBlackListIPData] = useState([])
  const [blackListCount, setBlackListCount] = useState(0)

  const [newsLetterData, setNewLetterData] = useState([])
  const [newsLetterCount, setNewsLetterCount] = useState(0) 









  const [interestSearch, setInterestSearch] = useState('')








 
  const DepositFunction = async() =>{
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
        localStorage.setItem("depositCount", data.length);
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

    if(allDepositSearch.length !== 0){
      url = `http://127.0.0.1:8000/api/deposits/?search=${allDepositSearch}`
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

  const SuccessfulDepositFunction = async() =>{
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
        localStorage.setItem('successDespositCount', data.length)
        
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

    if(successfulDepositSearch.length !== 0){
      url = `http://127.0.0.1:8000/api/deposits/successful/?search=${successfulDepositSearch}`
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

  const DeclinedDepositFunction = async() =>{
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
        localStorage.setItem("declinedDeposit", data.length);
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

    if(declinedDepositSearch.length !== 0){
      url = `http://127.0.0.1:8000/api/deposits/declined/?search=${declinedDepositSearch}`
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

  const PendingDepositFunction = async() =>{
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
        localStorage.setItem("pendingDespositCount", data.length);
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

    if(pendingDepositSearch.length !== 0){
      url = `http://127.0.0.1:8000/api/deposits/pending/?search=${pendingDepositSearch}`
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
  

  const WithdrawFunction = async() =>{
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
        localStorage.setItem("withdrawCount", data.length);
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

    if(allWithdrawSearch.length !== 0){
      url = `http://127.0.0.1:8000/api/withdraw/?search=${allWithdrawSearch}`
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

  const SuccessfulWithdrawFunction = async() =>{ 
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
        localStorage.setItem("SuccessWithdrawCount", data.length);
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

    if(successfulWithdrawSearch.length !== 0){
      url = `http://127.0.0.1:8000/api/withdraw/successful/?search=${successfulWithdrawSearch}`
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

  const PendingWithdrawFunction = async() =>{
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
        localStorage.setItem("pendingWithdrawCount", data.length);
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

    if(pendingWithdrawSearch.length !== 0){
      url = `http://127.0.0.1:8000/api/withdraw/pending/?search=${pendingWithdrawSearch}`
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


  const DeclinedWithdrawFunction = async() =>{
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
        localStorage.setItem("declinedWithdrawCount", data.length);
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

    if(declinedWithdrawSearch.length !== 0){
      url = `http://127.0.0.1:8000/api/withdraw/declined/?search=${declinedWithdrawSearch}`
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

  const InterestFunction = async() =>{
    let response = await fetch('http://127.0.0.1:8000/api/investment-intrest/', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens.access}`
      },
    })

    const data = await response.json()
    if(response.ok){
      if(Array.isArray(data) && data.length > 0){
        setInterestCount(data.length)
      }
      const sortedData = data.sort((a, b) => b.id - a.id);
      setInterestData(sortedData)
      setInterestLoader(false)

    }else{
      setInterestLoader(false)
    }



  }


  const filterInterest = async() =>{
    let url;

    if(interestSearch.length !== 0){
      url = `http://127.0.0.1:8000/api/investment-intrest/?search=${interestSearch}`
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
      setInterestData(data)
    }
  }

  const InvestmentFunction = async() =>{
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
        localStorage.setItem("investmentCount", data.length);
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

    if(investmentSearch.length !== 0){
      url = `http://127.0.0.1:8000/api/user-investment/?search=${investmentSearch}`
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

  const ActiveInvestmentFunction = async() =>{
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
        localStorage.setItem("activeInvestmentCount", data.length);
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

    if(activeInvestmentSearch.length !== 0){
      url = `http://127.0.0.1:8000/api/user-investment/active/?search=${activeInvestmentSearch}`
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

  const PendingInvestmentFunction = async() =>{
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
        localStorage.setItem("pendingInvestmentCount", data.length);
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

    if(pendingInvestmentSearch.length !== 0){
      url = `http://127.0.0.1:8000/api/user-investment/pending/?search=${pendingInvestmentSearch}`
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


  const CompletedInvestmentFunction = async() =>{
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
        localStorage.setItem("completedInvestmentCount", data.length);
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

    if(completedInvestmentSearch.length !== 0){
      url = `http://127.0.0.1:8000/api/user-investment/completed/?search=${completedInvestmentSearch}`
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

    
  const DeclinedInvestmentFunction = async() =>{
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
        localStorage.setItem("declinedInvestmentCount", data.length);
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

    if(declinedInvestmentSearch.length !== 0){
      url = `http://127.0.0.1:8000/api/user-investment/declined/?search=${declinedInvestmentSearch}`
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


  const UsersFunction = async() =>{
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
        localStorage.setItem("usersCount", data.length);
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

  const DisableUsersFunction = async() =>{
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
        localStorage.setItem("disableUserCount", data.length);
      }
    }
  }

  const UserVerificationFunction = async() =>{
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
        localStorage.setItem("userVerificationCount", data.length);
      }
    }
  }

  const PendingUserVerficationFunction = async() =>{
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
        localStorage.setItem("pendingUserVerificationCount", data.length);
      }
    }
  }


  const CanceledUserVerificationFunction = async() =>{
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
        localStorage.setItem("canceledUserVerificationCount", data.length);
      }
    }
  }

  const UnverifiedUserFunction = async() =>{
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
        localStorage.setItem("unverifiedUserCount", data.length);
      }
    }
  }

  const verifiedUserFunction = async() =>{
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
        localStorage.setItem("verifiedUserCount", data.length);
      }
    }
  }

  const KYCFunction = async() =>{
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
        localStorage.setItem("KYCsCount", data.length);
      }
    }
  }

  const NotUploadKYCFunction = async() =>{
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
        localStorage.setItem("notUploadKYCsCount", data.length);
      }
    }
  }

  const VerifiedKYCFunction = async() =>{
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
        localStorage.setItem("verifiedKYCsCount", data.length);
      }
    }
  }

  const CanceledKYCFunction = async() =>{
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
        localStorage.setItem("canceledKYCsCount", data.length);
      }
    }
  }

  const PendingKYCFunction = async() =>{
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
        localStorage.setItem("pendingKYCsCount", data.length);
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
        localStorage.setItem("paymentOptionsCount", data.length);
      }
      const sortedData = data.sort((a, b) => b.id - a.id);
      setPaymentOptionsData(sortedData)
      setPaymentOptionsLoader(false)
    }else{
      setPaymentOptionsLoader(false)
    }


  }

  const InvestmentPlanFunction = async() =>{
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
        localStorage.setItem("investmentPlanCount", data.length);
      }

      const sortedData = data.sort((a, b) => b.id - a.id);
      setInvestPlanData(sortedData)
    }
  }

  const EmailFunction = async() =>{
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
        localStorage.setItem("emailCount", data.length);
      }
    }
  }

  const BonusFunction = async () => {
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
        setBonusLoader(false)
        const sortedData = data.sort((a, b) => b.id - a.id);
        setBonusData(sortedData);
      } else {
        console.error("Unexpected response:", response.status, response.statusText);
        setBonusLoader(false)
      }
    } catch (error) {
      console.error("Error fetching bonus data:", error);
      setBonusLoader(false)
    }
  };

  const filterBonus = async() =>{
    let url;

    if(bonusSearch.length !== 0){
      url = `http://127.0.0.1:8000/api/bonus/?search=${bonusSearch}`
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
      setBonusData(data)
    }
  }

  const BlackListFunction = async() =>{
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

  const NewsLetterFunction = async() =>{
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
  




  
 const contextData = {

  // ---------------------------- DEPOSIT ----------------------//
      depositCount, setDepositCount,
        successDespositCount,
        setSuccessDepositCount,
        pendingDespositCount,
        setPendingDespositCount,
        declinedDepositCount,
        setDeclinedDepositCount,


        recentDeposit,
        setRecentDeposit,
        depositData,
        setDepositData,
        totalDeposit,
        setTotalDeposit,
        recentPendingDeposit,
        setRecentPendingDeposit,
        pendingDepositData,
        setPendingDepositData,
        recentSuccessfulDeposit,
        setRecentSuccessDeposit,
        successfulDepositData,
        setSuccessfulDepositData,
        recentDeclinedDeposit,
        setRecentDeclinedDeposit,
        declinedDepositData,
        setDeclinedDepositData,


        depositLoader, 
        setDepositLoader,
        pendingDepositLoader, 
        setPendingDepositLoader,
        declinedDepositLoader, 
        setDeclinedDepositLoader,
        successfulDepositLoader, 
        setSuccessfulDepositLoader,

        DepositFunction,
        filterDeposits,
        SuccessfulDepositFunction,
        filterSuccessfulDeposits,
        DeclinedDepositFunction,
        filterDeclinedDeposits,
        PendingDepositFunction,
        filterPendingDeposits,


        allDepositSearch, 
        setallDepositSearch,
        successfulDepositSearch,
        setSuccessfulDepositSearch,
        pendingDepositSearch,
        setPendingDepositSearch,
        declinedDepositSearch,
        setDeclinedDepositSearch,

  // ----------------------WITHDRAW ------------------------ //
        withdrawCount,
        setWithdrawCount,
        SuccessWithdrawCount,
        setSuccessWithdrawCount,
        pendingWithdrawCount,
        setPendingWithdrawCount,
        declinedWithdrawCount,
        setDeclinedWithdrawCount,


        recentWithdraw,
        setRecentWithdraw,
        withdrawData,
        setWithdrawData,
        totalWithdraw,
        setTotalWithdraw,
        recentPendingWithdraw, 
        setRecentPendingWithdraw,
        pendingWithdrawData, 
        setPendingWithdrawData,
        recentSuccessfulWithdraw, 
        setRecentSuccessWithdraw,
        successfulWithdrawData, 
        setSuccessfulWithdrawData,
        recentDeclinedWithdraw, 
        setRecentDeclinedWithdraw,
        declinedWithdrawData, 
        setDeclinedWithdrawData,


        withdrawLoader, 
        setWithdrawLoader,
        pendingWithdrawLoader, 
        setPendingWithdrawLoader,
        declinedWithdrawLoader, 
        setDeclinedWithdrawLoader,
        successfulWithdrawLoader, 
        setSuccessWithdrawLoader,

        WithdrawFunction,
        filterWithdraws,
        SuccessfulWithdrawFunction,
        filterSuccessfulWithdraws,
        PendingWithdrawFunction,
        filterPendingWithdraws,
        DeclinedWithdrawFunction,
        filterDeclinedWithdraws,

        
        allWithdrawSearch,
        setallWithdrawSearch,
        successfulWithdrawSearch,
        setSuccessWithdrawSearch,
        pendingWithdrawSearch,
        setPendingWithdrawSearch,
        declinedWithdrawSearch,
        setDeclinedWithdrawSearch,



  // ---------------------------- INTEREST ----------------------//
        interestCount,
        setInterestCount,
        interestData,
        setInterestData,
        interestLoader,
        setInterestLoader,

        InterestFunction,
        filterInterest,

        interestSearch,
        setInterestSearch,
  // ---------------------------- INVESTMENT ----------------------//

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


        investmentData,
        setInvestmentData,
        totalInvestment,
        setTotalInvestment,
        pendingInvestment,
        setPendingInvestment,
        activeInvestment,
        setActiveInvestment,
        completedInvestment,
        setCompletedInvestment,
        declinedInvestment,
        setDecinedInvestment,


        investmentLoader,
        setInvestmentLoader,
        pendingInvestmentLoader,
        setPendingInvestmentLoader,
        activeInvestmentLoader,
        setActiveInvestmentLoader,
        completedInvestmentLoader,
        setCompletedInvestmentLoader,
        declinedInvestmentLoader,
        setDeclinedInvestmentLoader,


        InvestmentFunction,
        filterInvestment,
        ActiveInvestmentFunction,
        filterActiveInvestment,
        PendingInvestmentFunction,
        filterPendingInvestment,
        CompletedInvestmentFunction,
        filterCompletedInvestment,
        DeclinedInvestmentFunction,
        filterDeclinedInvestment,


        investmentSearch,
        setInvestmentSearch,
        activeInvestmentSearch,
        setActiveInvestmentSearch,
        completedInvestmentSearch,
        setCompletedInvestmentSearch,
        pendingInvestmentSearch,
        setPendingInvestmentSearch,
        declinedInvestmentSearch,
        setDeclinedInvestmentSearch,





  // ---------------------------- USER ----------------------//
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

        usersData,
        setUsersData,
        recentUserData,
        setRecentUserData,
        usersDataLoader,
        setUsersDataLoader,

        UsersFunction,
        DisableUsersFunction,
        UserVerificationFunction,
        PendingUserVerficationFunction,
        CanceledUserVerificationFunction,
        UnverifiedUserFunction,
        verifiedUserFunction,
        KYCFunction,
        NotUploadKYCFunction,
        VerifiedKYCFunction,
        CanceledKYCFunction,
        PendingKYCFunction,
        PaymentOptionsFunction,

  // ---------------------------- KYC ----------------------//


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

// ---------------------------- EMAIL ----------------------//
        emailCount,
        setEmailCount,

        EmailFunction,

// ---------------------------- INVESTMENT PLAN ----------------------//
        investmentPlanCount,
        setInvestmentPlanCount,
        investmentPlanData, 
        setInvestPlanData,

        InvestmentPlanFunction,

  // ---------------------------- PAYMENT OPTIONS ----------------------//
        paymentOptionsData,
        setPaymentOptionsData,
        paymentOptionsCount,
        setPaymentOptionsCount,
        paymentOptionsLoader, 
        setPaymentOptionsLoader,

  // ---------------------------- BONUS ----------------------//
        bonusData,
        setBonusData,
        totalBonus,
        setTotalBonus,
        bonusCount,
        setBonusCount,
        bonusLoader, 
        setBonusLoader,
        bonusSearch,
        setBonusSearch,
        BonusFunction,
        filterBonus,

  // ---------------------------- BLACKLSIT IP ----------------------//
        blackListIPData,
        setBlackListIPData,
        blackListCount,
        setBlackListCount,

        BlackListFunction,

  // ---------------------------- NEWSLETTER ----------------------//

        newsLetterData,
        setNewLetterData,
        newsLetterCount,
        setNewsLetterCount,

        NewsLetterFunction,
 }


 return(
  <AllDataContext.Provider value={contextData}>
    {children}
  </AllDataContext.Provider>
 )


  
  
}



