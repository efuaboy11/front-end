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
  const [totalDeposit, setTotalDeposit] = useState(0.00)
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
  const [totalWithdraw, setTotalWithdraw] = useState(0.00)
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
   
  const [walletAddressData, setWalletAddressData] = useState([])
  const [walletAddressLoader, setWalletAddressLoader] = useState(true)
  const [walletAddressCount, setWalletAddressCount] = useState(0)
  const [walletAddressSearch, setWalletAddressSearch] = useState('')
          
  const [bankAccountData, setBankAccountData] = useState([])
  const [bankAccountLoader, setBankAccountLoader] = useState(true)
  const [bankAccountCount, setBankAccountCount] = useState(0)
  const [bankAccountSearch, setBankAccountSearch] = useState('')

  const [bankCardData, setBankCardData] = useState([])
  const [bankCardLoader, setBankCardLoader] = useState(true)
  const [bankCardCount, setBankCardCount] = useState(0)
  const [bankCardSearch, setBankCardSearch] = useState('')

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
  const [recentInvestemnt, setRecentInvestment] = useState([])

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
  const [totalInterest, setTotalInterest] = useState(0.00)
  const [interestsearchValue, setInterestSearchValue] = useState('')

  const [commission, setCommission] = useState('')
  const [comissionLoader, setCommissionLoader] = useState('')

  const [usersCount, setUserCount] = useState(0)
  const [disableUserCount, setDisableUserCount] = useState(0)
  const [userVerificationCount, setUserVerificationCount] = useState(0)
  const [pendingUserVerificationCount, setPendingUserVerificationCount] = useState(0)
  const [canceledUserVerificationCount, setCanceledUserVerificationCount] = useState(0)
  const [unverifiedUserCount, setUnverfiedUserCount] = useState(0)
  const [verifiedUserCount, setVerifiedUserCount] = useState(0)
  const [usersData, setUsersData] = useState([])
  const [recentUserData, setRecentUserData] = useState([])
  const [disableUserData, setDisableUserData] = useState([])
  const [userVerificationData, setUserVerificationData] = useState([])
  const [pendingUserVerificationData, setPendingUserVerificationData] = useState([])
  const [canaceledUserVerificationData, setCanceledUserVerificationData] = useState([])
  const [verifiedUserData, setVerifiedUserData] = useState([])
  const [unverifiedUserData, setUnverfiedUserData] = useState([])
  const [usersDataLoader, setUsersDataLoader] = useState(true)
  const [userDisableLoader, setUserDisableLoader] = useState(true)
  const [userVerificationLoader, setUserVerificationLoader] = useState(true)
  const [pendingUserVerificationLoader, setPendingUserVerificationLoader] = useState(true)
  const [canceledUserVerificationLoader, setCanceledUserVerificationLoader] = useState(true)
  const [verifiedUserLoader, setVerifiedUserLoader] = useState(true)
  const [unverifiedUserLoader, setUnverfiedUserLoader] = useState(true)

  const [userSearch, setUserSearch] = useState('')
  const [disableUserSeacrh, setDisableUserSearch] = useState('')
  const [userVerificationSearch, setUserVerificationSearch] = useState('')
  const [pendingUserVerificationSearch, setPendingUserVerificationSearch] = useState('')
  const [canceledUserVerificationsearch, setCanceledUserVerificationSearch] = useState('')
  const [verifiedUserSearch, setVerifiedUserSearch] = useState('')
  const [unverifiedUserSearch, setUnverfiedUserSearch] = useState('')
  
  const [KYCsCount, setKYCsCount] = useState(0)
  const [notUploadKYCsCount, setNotUploadKYCsCount] = useState(0)
  const [verifiedKYCsCount, setVerifiedKYCsCount] = useState(0)
  const [canceledKYCsCount, setCanceledKYCsCount] = useState(0)
  const [pendingKYCsCount, setPendingKYCsCount] = useState(0)

  const [KYCData, setKYCData] = useState([])
  const [notUploadKYCData, setNotUploadKYCData] = useState([])
  const [verifiedKYCData, setVerifiedKYCData] = useState([])
  const [canceledKYCData, setCanceledKYCData] = useState([])
  const [pendingKYCData, setPendingKYCData] = useState([])

  const [KYCloader, setKYCLoader] = useState(true)
  const [notUploadKYCLoader, setNotUploadKYCLoader] = useState(true)
  const [verifiedKYCLoader, setVerifiedKYCLoader] = useState(true)
  const [canceledKYCLoader, setCanceledKYCLoader] = useState(true)
  const [pendingKYCLoader, setPendingKYCLoader] = useState(true)

  const [KYCSeacrh, setKYCSearch] = useState('')
  const [notUploadKYCSearch, setNotUploadKYCSearch] = useState('')
  const [verifiedKYCSearch, setVerifiedKYCSearch] = useState('')
  const [canceledKYCSearch, setCanceledKYCSearch] = useState('')
  const [pendingKYCSearch, setPendingKYCSearch] = useState('')

  const [fundsAcountData, setFundsAccountData] = useState([])
  const [fundsAccountLoader, setFundsAccountloader] = useState(true)
  const [fundsAccountSearch, setFundsAccountSearch] = useState('')


  const [emailCount, setEmailCount] = useState(0)
  const [emailData, setEmailData] = useState([])
  const [emailLoader, setEmailLoader] = useState(true)
  const [emailSearch, setEmailSearch] = useState("")


  const [investmentPlanCount, setInvestmentPlanCount] = useState(0)
  const [investmentPlanData, setInvestPlanData] = useState([])
  const [investemmentPlanLoder, setInvestmentPlanLoader] = useState(true)
  const [investmentPlanSearch, setInvestmentPlanSearch] = useState('')

  const [paymentOptionsCount, setPaymentOptionsCount] = useState(0)
  const [paymentOptionsData, setPaymentOptionsData] = useState([])
  const [paymentOptionsLoader, setPaymentOptionsLoader] = useState(true)
  const [paymentOptionSearch, setPaymentOptionSearch] = useState('')

  const [bonusData, setBonusData] = useState([])
  const [totalBonus, setTotalBonus] = useState(0)
  const [bonusCount, setBonusCount] = useState(0)
  const [bonusLoader, setBonusLoader] = useState(true)
  const [bonusSearch, setBonusSearch] = useState('')


  const [blackListIPData, setBlackListIPData] = useState([])
  const [blackListCount, setBlackListCount] = useState(0)
  const [blackListIPLoader, setBlackListLoader] = useState(true)

  const [newsLetterData, setNewLetterData] = useState([])
  const [newsLetterCount, setNewsLetterCount] = useState(0) 
  const [newsLetterLoader, setNewsLetterLoader] = useState(true)

  const [interestSearch, setInterestSearch] = useState('')

  const [userCommissionData, setUserCommissionData] = useState([])
  const [userCommissionLoader, setUserCommissionLoader] = useState(true)
  const [userCommissionCount, setUserCommissionCount] = useState(0)
  const [totalUserCommission, setTotalUserCommission] = useState(0.00)

 
  const [userReferralData, setUserReferralData] = useState([])
  const [userReferralLoader, setUserReferralLoader] = useState(true)
  const [userReferralCount, setUserReferralCount] = useState(0)







 
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
      }
      sessionStorage.setItem("depositCount", data.length);



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
      const sortedData = data.sort((a, b) => b.id - a.id);
      setDepositData(sortedData)
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
      }
      sessionStorage.setItem('successDespositCount', data.length)

      const totalAmount = data.reduce((acc, item) => acc + parseFloat(item.amount), 0)
      setTotalDeposit(totalAmount)
      sessionStorage.setItem('depositTotal', totalAmount)


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
      const sortedData = data.sort((a, b) => b.id - a.id);
      setSuccessfulDepositData(sortedData)
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
      }
      sessionStorage.setItem("declinedDeposit", data.length);

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
      const sortedData = data.sort((a, b) => b.id - a.id);
      setDeclinedDepositData(sortedData)
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
      }
      sessionStorage.setItem("pendingDespositCount", data.length);

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
      const sortedData = data.sort((a, b) => b.id - a.id);
      setPendingDepositData(sortedData)
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

      }
      sessionStorage.setItem("withdrawCount", data.length);

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
      const sortedData = data.sort((a, b) => b.id - a.id);
      setWithdrawData(sortedData)
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
        
      }
      sessionStorage.setItem("SuccessWithdrawCount", data.length);

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
      const sortedData = data.sort((a, b) => b.id - a.id);
      setSuccessfulWithdrawData(sortedData)
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
        
      }
      sessionStorage
.setItem("pendingWithdrawCount", data.length);
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
      const sortedData = data.sort((a, b) => b.id - a.id);
      setPendingWithdrawData(sortedData)
      
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
      }
      sessionStorage.setItem("declinedWithdrawCount", data.length);

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
      const sortedData = data.sort((a, b) => b.id - a.id);
      setDeclinedWithdrawData(sortedData)
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

      const totalInterest = data.reduce((acc, item) => acc + parseFloat(item.amount), 0)
      setTotalInterest(totalInterest)
      sessionStorage.setItem('InterestTotal', totalInterest)

    }else{
      setInterestLoader(false)
    }



  }

  const WalletAddressFunction = async() =>{
    let response = await fetch('http://127.0.0.1:8000/api/wallet-address/', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens.access}`
      },
    })

    const data = await response.json()
    if(response.ok){
      if(Array.isArray(data) && data.length > 0){
        setWalletAddressCount(data.length)
      }
      sessionStorage.setItem("WalletCount", data.length);
      const sortedData = data.sort((a, b) => b.id - a.id);
      setWalletAddressData(sortedData)
      setWalletAddressLoader(false)

    }else{
      setWalletAddressLoader(false)
    }



  }

  const filterWalletAddress = async() =>{
    let url;

    if(walletAddressSearch.length !== 0){
      url = `http://127.0.0.1:8000/api/wallet-address/?search=${walletAddressSearch}`
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
      const sortedData = data.sort((a, b) => b.id - a.id);
      setWalletAddressData(sortedData)
    }
  }

  const BankAccountFunction = async() =>{
    let response = await fetch('http://127.0.0.1:8000/api/bank-account/', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens.access}`
      },
    })

    const data = await response.json()
    if(response.ok){
      if(Array.isArray(data) && data.length > 0){
        setBankAccountCount(data.length)
      }
      sessionStorage.setItem("BankAccountCount", data.length);
      const sortedData = data.sort((a, b) => b.id - a.id);
      setBankAccountData(sortedData)
      setBankAccountLoader(false)

    }else{
      setBankAccountLoader(false)
    }



  }

  const filterBankAccount = async() =>{
    let url;

    if(bankAccountSearch.length !== 0){
      url = `http://127.0.0.1:8000/api/bank-account/?search=${bankAccountSearch}`
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
      const sortedData = data.sort((a, b) => b.id - a.id);
      setBankAccountData(sortedData)
    }
  }

  const BankCardFunction = async() =>{
    let response = await fetch('http://127.0.0.1:8000/api/bank-card/', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens.access}`
      },
    })

    const data = await response.json()
    if(response.ok){
      if(Array.isArray(data) && data.length > 0){
        setBankCardCount(data.length)
      }
      sessionStorage.setItem("BanKCardCount", data.length);
      const sortedData = data.sort((a, b) => b.id - a.id);
      setBankCardData(sortedData)
      setBankCardLoader(false)

    }else{
      setBankCardLoader(false)
    }



  }


  const filterBankCard = async() =>{
    let url;

    if(bankCardSearch.length !== 0){
      url = `http://127.0.0.1:8000/api/bank-card/?search=${bankCardSearch}`
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
      const sortedData = data.sort((a, b) => b.id - a.id);
      setBankCardData(sortedData)
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
      const sortedData = data.sort((a, b) => b.id - a.id);
      setInterestData(sortedData)
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
 
      }
      sessionStorage.setItem("investmentCount", data.length);

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
      const sortedData = data.sort((a, b) => b.id - a.id);
      setInvestmentData(sortedData)
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

      }
      sessionStorage.setItem("activeInvestmentCount", data.length);

      const sortedData = data.sort((a, b) => b.id - a.id);
      const recentData = sortedData.slice(0, 1);
      setActiveInvestment(sortedData)
      setRecentInvestment(recentData)
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
      const sortedData = data.sort((a, b) => b.id - a.id);
      setActiveInvestment(sortedData)
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
        
      }
      sessionStorage.setItem("pendingInvestmentCount", data.length);

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
      const sortedData = data.sort((a, b) => b.id - a.id);
      setPendingInvestment(sortedData)
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
        
      }
      sessionStorage.setItem("completedInvestmentCount", data.length);

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
      const sortedData = data.sort((a, b) => b.id - a.id);
      setCompletedInvestment(sortedData)
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
        
      }
      sessionStorage.setItem("declinedInvestmentCount", data.length);

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
      const sortedData = data.sort((a, b) => b.id - a.id);
      setDecinedInvestment(sortedData)
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

      }
      sessionStorage.setItem("usersCount", data.length);

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

  const filterUser = async() =>{
    let url;

    if(userSearch.length !== 0){
      url = `http://127.0.0.1:8000/api/users/?search=${userSearch}`
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
      setUsersData(data)
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

      }
      sessionStorage.setItem("disableUserCount", data.length);

      const sortedData = data.sort((a, b) => b.id - a.id);
      setDisableUserData(sortedData)
      setUserDisableLoader(false)
    }else{
      setUserDisableLoader(false)
    }
  }
  
  const filterDisableUsersFunction = async() =>{
    let url;

    if(disableUserSeacrh.length !== 0){
      url = `http://127.0.0.1:8000/api/disable-account/?search=${disableUserSeacrh}`
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
      setDisableUserData(data)
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
       
      }
      const sortedData = data.sort((a, b) => b.id - a.id);
      setUserVerificationData(sortedData)
      setUserVerificationLoader(false)
      sessionStorage.setItem("userVerificationCount", data.length);
    }
  }

  const filterUserVerification = async() =>{
    let url;

    if(userVerificationSearch.length !== 0){
      url = `http://127.0.0.1:8000/api/user/verification/?search=${userVerificationSearch}`
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
      setUserVerificationData(data)
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
        
      }
      const sortedData = data.sort((a, b) => b.id - a.id);
      setPendingUserVerificationData(sortedData)
      setPendingUserVerificationLoader(false)
      sessionStorage.setItem("pendingUserVerificationCount", data.length);
    }else{
      setPendingUserVerificationLoader(false)
    }
  }

  const filterPendingUserVerfication = async() =>{
    let url;

    if(pendingUserVerificationSearch.length !== 0){
      url = `http://127.0.0.1:8000/api/users/verification/pending/?search=${pendingUserVerificationSearch}`
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
      setPendingUserVerificationData(data)
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
        
      }
      const sortedData = data.sort((a, b) => b.id - a.id);
      setCanceledUserVerificationData(sortedData)
      setCanceledUserVerificationLoader(false)
      sessionStorage.setItem("canceledUserVerificationCount", data.length);
    }
  }

  const filterCanceledUserVerification = async() =>{
    let url;

    if(canceledUserVerificationsearch.length !== 0){
      url = `http://127.0.0.1:8000/api/users/verification/canceled/?search=${canceledUserVerificationsearch}`
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
      setCanceledUserVerificationData(data)
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
       
      }
      sessionStorage.setItem("unverifiedUserCount", data.length);
      const sortedData = data.sort((a, b) => b.id - a.id);
      setUnverfiedUserData(sortedData)
      setUnverfiedUserLoader(false)
    }
  }

  const filterUnverifiedUser = async() =>{
    let url;

    if(unverifiedUserSearch.length !== 0){
      url = `http://127.0.0.1:8000/api/users/without-verification/?search=${unverifiedUserSearch}`
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
      setUnverfiedUserData(data)
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
        
      }
      sessionStorage.setItem("verifiedUserCount", data.length);

      const sortedData = data.sort((a, b) => b.id - a.id);
      setVerifiedUserData(sortedData)
      setVerifiedUserLoader(false)
    }
  }

  const filteverifiedUser = async() =>{
    let url;

    if(verifiedUserSearch.length !== 0){
      url = `http://127.0.0.1:8000/api/users/verification/verified/?search=${verifiedUserSearch}`
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
      setVerifiedUserData(data)
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

      }
      sessionStorage.setItem("KYCsCount", data.length);

      const sortedData = data.sort((a, b) => b.id - a.id);
      setKYCData(sortedData)
      setKYCLoader(false)
    }else{
      setKYCLoader(false)
    }
  }

  const filterKYC = async() =>{
    let url;

    if(KYCSeacrh.length !== 0){
      url = `http://127.0.0.1:8000/api/user/kyc-verification/?search=${KYCSeacrh}`
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
      setKYCData(data)
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
        
      }
      sessionStorage.setItem("notUploadKYCsCount", data.length);

      const sortedData = data.sort((a, b) => b.id - a.id);
      setNotUploadKYCData(sortedData)
      setNotUploadKYCLoader(false)
    }else{
      setNotUploadKYCLoader(false)
    }
  }

  const filterNotUploadedKYC = async() =>{
    let url;

    if(notUploadKYCSearch.length !== 0){
      url = `http://127.0.0.1:8000/api/users/without-KYC-verification/?search=${notUploadKYCSearch}`
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
      setNotUploadKYCData(data)
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
       
      }
      sessionStorage.setItem("verifiedKYCsCount", data.length);

      const sortedData = data.sort((a, b) => b.id - a.id);
      setVerifiedKYCData(sortedData)
      setVerifiedKYCLoader(false)
    }else{
      setVerifiedKYCLoader(false)
    }
    
  }

  const filterVerifiedKYC = async() =>{
    let url;

    if(verifiedKYCSearch.length !== 0){
      url = `http://127.0.0.1:8000/api/users/kyc-verification/verified/?search=${verifiedKYCSearch}`
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
      setVerifiedKYCData(data)
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
        
      }

      sessionStorage.setItem("canceledKYCsCount", data.length);

      const sortedData = data.sort((a, b) => b.id - a.id);
      setCanceledKYCData(sortedData)
      setCanceledKYCLoader(false)
    }else{
      setCanceledKYCLoader(false)
    }
  }

  const filterCanceledKYC = async() =>{
    let url;

    if(canceledKYCSearch.length !== 0){
      url = `http://127.0.0.1:8000/api/users/kyc-verification/canceled/?search=${canceledKYCSearch}`
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
      setCanceledKYCData(data)
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
      }
      sessionStorage.setItem("pendingKYCsCount", data.length);

      const sortedData = data.sort((a, b) => b.id - a.id);
      setPendingKYCData(sortedData)
      setPendingKYCLoader(false)
    }else{
      setPendingKYCLoader(false)
    }
    
  }

  const filterPendingKYC = async() =>{
    let url;

    if(pendingKYCSearch.length !== 0){
      url = `http://127.0.0.1:8000/api/users/kyc-verification/pending/?search=${pendingKYCSearch}`
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
      setPendingKYCData(data)
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
      sessionStorage.setItem("paymentOptionsCount", data.length);
      const sortedData = data.sort((a, b) => b.id - a.id);
      setPaymentOptionsData(sortedData)
      setPaymentOptionsLoader(false)
    }else{
      setPaymentOptionsLoader(false)
    }


  }

  const filterPaymentOptions = async() =>{
    let url;

    if(paymentOptionSearch.length !== 0){
      url = `http://127.0.0.1:8000/api/payment-method/?search=${paymentOptionSearch}`
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
      const sortedData = data.sort((a, b) => b.id - a.id);
      setPaymentOptionsData(sortedData)
    }
  }


  const FundsAccountFunction = async() =>{
    let response = await fetch('http://127.0.0.1:8000/api/account/', {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens.access}`
      },
    })

    const data = await response.json()
    if(response.ok){
      const sortedData = data.sort((a, b) => new Date(b.user_details.date_joined) - new Date(a.user_details.date_joined));
      setFundsAccountData(sortedData)
      setFundsAccountloader(false)
    }else{
      setFundsAccountloader(false)
    }


  }

  const filterFundsAccount = async() =>{
    let url;

    if(fundsAccountSearch.length !== 0){
      url = `http://127.0.0.1:8000/api/account/?search=${fundsAccountSearch}`
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
      setFundsAccountData(data)
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
       
      }
      sessionStorage.setItem("investmentPlanCount", data.length);

      // const sortedData = data.sort((a, b) => b.id - a.id);
      setInvestPlanData(data)
      setInvestmentPlanLoader(false)
    }else{
      setInvestmentPlanLoader(false)
    }
  }

  const filterInvestmentPlan = async() =>{
    let url;

    if(investmentPlanSearch.length !== 0){
      url = `http://127.0.0.1:8000/api/investment-plan/?search=${investmentPlanSearch}`
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
      // const sortedData = data.sort((a, b) => b.id - a.id);
      setInvestPlanData(data)
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

      }

      const sortedData = data.sort((a, b) => b.id - a.id);
      setEmailData(sortedData)
      setEmailLoader(false)

      sessionStorage.setItem("emailCount", data.length);
    }
  }

  const filterEmail = async() =>{
    let url;

    if(emailSearch.length !== 0){
      url = `http://127.0.0.1:8000/api/send-mail/?search=${emailSearch}`
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
      const sortedData = data.sort((a, b) => b.id - a.id);
      setEmailData(sortedData)
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
      const sortedData = data.sort((a, b) => b.id - a.id);
      setBonusData(sortedData)
    }
  }


  const CommissionFunction = async () => {
    try {
      let response = await fetch('http://127.0.0.1:8000/api/commission/', {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens.access}`
        },
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setCommissionLoader(false)
        const sortedData = data.sort((a, b) => b.id - a.id);
        setCommission(sortedData);
      } else {
        console.error("Unexpected response:", response.status, response.statusText);
        setCommissionLoader(false)
      }
    } catch (error) {
      console.error("Error fetching bonus data:", error);
      setCommissionLoader(false)
    }
  };

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
      setBlackListLoader(false)
    }else{
      setBlackListLoader(false)
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
      setNewsLetterLoader(false)
    }else{
      setNewsLetterLoader(false)
    }
    
  }


  const UserCommissionFunction = async() =>{
    let response = await fetch('http://127.0.0.1:8000/api/user-commission/', {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens.access}`
      },
    })

    const data = await response.json()
    if(response.ok){
      if(Array.isArray(data) && data.length > 0){
        setUserCommissionCount(data.length)
      }

      const sortedData = data.sort((a, b) => b.id - a.id);
      const totalCommission = data.reduce((acc, item) => acc + parseFloat(item.amount), 0)
      setTotalUserCommission(totalCommission)
      setUserCommissionData(sortedData)
      setUserCommissionLoader(false)
    }else{
      setUserCommissionLoader(false)
    }
    
  }

  const UserReferralFunction = async() =>{
    let response = await fetch('http://127.0.0.1:8000/api/user-referral/', {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens.access}`
      },
    })

    const data = await response.json()
    if(response.ok){
      if(Array.isArray(data) && data.length > 0){
        setUserReferralCount(data.length)
      }

      const sortedData = data.sort((a, b) => b.id - a.id);
      setUserReferralData(sortedData)
      setUserReferralLoader(false)
    }else{
      setUserReferralLoader(false)
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

  // ---------------------------------- WALLET ADDRESS --------------------- //
        walletAddressData,
        setWalletAddressData,
        walletAddressLoader,
        setWalletAddressLoader,
        walletAddressCount,
        setWalletAddressCount,
        walletAddressSearch,
        setWalletAddressSearch,
        WalletAddressFunction,
        filterWalletAddress,


  // ---------------------------------- BANK ACCOUNT --------------------- //
        bankAccountData,
        setBankAccountData,
        bankAccountLoader,
        setBankAccountLoader,
        bankAccountCount,
        setBankAccountCount,
        bankAccountSearch,
        setBankAccountSearch,
        BankAccountFunction,
        filterBankAccount,

  // ------------------------------- BANK CARD ---------------------------- //
        bankCardData,
        setBankCardData,
        bankCardLoader,
        setBankCardLoader,
        bankCardCount,
        setBankCardCount,
        bankCardSearch,
        setBankCardSearch,
        BankCardFunction,
        filterBankCard,



  // ---------------------------- INTEREST ----------------------//
        interestCount,
        setInterestCount,
        interestData,
        setInterestData,
        interestLoader,
        setInterestLoader,

        InterestFunction,
        filterInterest,

        totalInterest,
        setTotalInterest,

        interestSearch,
        setInterestSearch,

  // -------------------------------COMMISSION --------------------//
        commission,
        setCommission,
        comissionLoader,
        setCommissionLoader,
        CommissionFunction,
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
        recentInvestemnt,
        setRecentInvestment,


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
        disableUserData,
        setDisableUserData,
        userVerificationData, 
        setUserVerificationData,
        pendingUserVerificationData, 
        setPendingUserVerificationData,
        canaceledUserVerificationData, 
        setCanceledUserVerificationData,
        verifiedUserData, 
        setVerifiedUserData,
        unverifiedUserData, 
        setUnverfiedUserData,
        

        usersDataLoader,
        setUsersDataLoader,
        userDisableLoader,
        setUserDisableLoader,
        userVerificationLoader, 
        setUserVerificationLoader,
        pendingUserVerificationLoader, 
        setPendingUserVerificationLoader,
        canceledUserVerificationLoader, 
        setCanceledUserVerificationLoader,
        verifiedUserLoader, 
        setVerifiedUserLoader,
        unverifiedUserLoader, 
        setUnverfiedUserLoader,


        userSearch, 
        setUserSearch,
        disableUserSeacrh,
        setDisableUserSearch,
        userVerificationSearch, 
        setUserVerificationSearch,
        pendingUserVerificationSearch, 
        setPendingUserVerificationSearch,
        canceledUserVerificationsearch, 
        setCanceledUserVerificationSearch,
        verifiedUserSearch,
        setVerifiedUserSearch,
        unverifiedUserSearch, 
        setUnverfiedUserSearch,

        UsersFunction,
        filterUser,
        DisableUsersFunction,
        filterDisableUsersFunction,
        UserVerificationFunction,
        filterUserVerification,
        PendingUserVerficationFunction,
        filterPendingUserVerfication,
        CanceledUserVerificationFunction,
        filterCanceledUserVerification,
        UnverifiedUserFunction,
        filterUnverifiedUser,
        verifiedUserFunction,
        filteverifiedUser,



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


        KYCData, 
        setKYCData,
        notUploadKYCData, 
        setNotUploadKYCData,
        verifiedKYCData, 
        setVerifiedKYCData,
        canceledKYCData, 
        setCanceledKYCData,
        pendingKYCData, 
        setPendingKYCData,


        KYCloader, 
        setKYCLoader,
        notUploadKYCLoader, 
        setNotUploadKYCLoader,
        verifiedKYCLoader, 
        setVerifiedKYCLoader,
        canceledKYCLoader, 
        setCanceledKYCLoader,
        pendingKYCLoader, 
        setPendingKYCLoader,

        KYCSeacrh, 
        setKYCSearch,
        notUploadKYCSearch, 
        setNotUploadKYCSearch,
        verifiedKYCSearch, 
        setVerifiedKYCSearch,
        canceledKYCSearch, 
        setCanceledKYCSearch,
        pendingKYCSearch, 
        setPendingKYCSearch,


        KYCFunction,
        filterKYC,
        NotUploadKYCFunction,
        filterNotUploadedKYC,
        VerifiedKYCFunction,
        filterVerifiedKYC,
        CanceledKYCFunction,
        filterCanceledKYC,
        PendingKYCFunction,
        filterPendingKYC,


        // --------------------------------------- FUNDS ACCOUNT ------------------------- //
        fundsAcountData,
        setFundsAccountData,
        fundsAccountLoader,
        setFundsAccountloader,
        fundsAccountSearch,
        setFundsAccountSearch,
        FundsAccountFunction,
        filterFundsAccount,


        


// ---------------------------- EMAIL ----------------------//
        emailCount,
        setEmailCount,
        emailData,
        setEmailData,
        emailLoader,
        setEmailLoader,
        emailSearch,
        setEmailSearch,
        EmailFunction,
        filterEmail,

// ---------------------------- INVESTMENT PLAN ----------------------//
        investmentPlanCount,
        setInvestmentPlanCount,
        investmentPlanData, 
        setInvestPlanData,
        InvestmentPlanFunction,
        filterInvestmentPlan,
        investemmentPlanLoder,
        setInvestmentPlanLoader,
        investmentPlanSearch,
        setInvestmentPlanSearch,

  // ---------------------------- PAYMENT OPTIONS ----------------------//
        paymentOptionsData,
        setPaymentOptionsData,
        paymentOptionsCount,
        setPaymentOptionsCount,
        paymentOptionsLoader, 
        setPaymentOptionsLoader,
        paymentOptionSearch,
        setPaymentOptionSearch,
        PaymentOptionsFunction,
        filterPaymentOptions,


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
        blackListIPLoader,
        setBlackListLoader,

        BlackListFunction,

  // ---------------------------- NEWSLETTER ----------------------//

        newsLetterData,
        setNewLetterData,
        newsLetterCount,
        setNewsLetterCount,
        newsLetterLoader,
        setNewsLetterLoader,
        NewsLetterFunction,

    // ---------------------------- USER COMMISSION ----------------------//
    userCommissionData,
    setUserCommissionData,
    userCommissionLoader,
    setUserCommissionLoader,
    userCommissionCount,
    setUserCommissionCount,
    totalUserCommission,
    setTotalUserCommission,
    UserCommissionFunction,



      // ---------------------------- USER REFERRAL ----------------------//
      userReferralData,
      setUserReferralData,
      userReferralLoader,
      setUserReferralLoader,
      userReferralCount,
      setUserReferralCount,
      UserReferralFunction,
 }

 


 return(
  <AllDataContext.Provider value={contextData}>
    {children}
  </AllDataContext.Provider>
 )


  
  
}



