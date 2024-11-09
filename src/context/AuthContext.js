import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext()
export default AuthContext

export const AuthProvider = ({children}) =>{
    const [authTokens, setAuthToken] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')): null)
    const [password, setPassword] = useState("") 
    const [email, setEmail] = useState("") 
    const [otp, setOtp] = useState("")

    const [showAmimaton, setShowAnimation] = useState(false)
    const [messages, setMessage] = useState('')
    const [alertVisible, setAlertVisible] = useState(false);

    const [disablebutton, setDisablebutton] = useState(false)
    const [page, setPage] = useState('')

    const [isSuccess, setIsSuccess] = useState(true)

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
            
            
    const [investmentCount, setInvestmentCount] = useState(0)
    const [activeInvestmentCount, setActiveInvestmentCount] = useState(0)
    const [completedInvestmentCount, setCompletednvestmentCount] = useState(0)
    const [pendingInvestmentCount, setPendingInvestmentCount] = useState(0)
    const [declinedInvestmentCount, setDeclinedInvestmentCount] = useState(0)

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
    
    const [KYCsCount, setKYCsCount] = useState(0)
    const [notUploadKYCsCount, setNotUploadKYCsCount] = useState(0)
    const [verifiedKYCsCount, setVerifiedKYCsCount] = useState(0)
    const [canceledKYCsCount, setCanceledKYCsCount] = useState(0)
    const [pendingKYCsCount, setPendingKYCsCount] = useState(0)

    const [emailCount, setEmailCount] = useState(0)
    const [investmentPlanCount, setInvestmentPlanCount] = useState(0)

    const [paymentOptionsCount, setPaymentOptionsCount] = useState(0)
    const [paymentOptionsData, setPaymentOptionsData] = useState([])
    const [paymentOptionsLoader, setPaymentOptionsLoader] = useState(true)
 
    const [bonusData, setBonusData] = useState([])
    const [totalBonus, setTotalBonus] = useState(0)
    const [bonusCount, setBonusCount] = useState(0)

    const [blackListIPData, setBlackListIPData] = useState([])
    const [blackListCount, setBlackListCount] = useState(0)

    const [newsLetterData, setNewLetterData] = useState([])
    const [newsLetterCount, setNewsLetterCount] = useState(0)

    const [searchValue, setSearchValue] = useState('')



    const navigate = useNavigate()
    //const [user, setUser] = useState(() => localStorage.getItem("authTokens") ? jwtDecode(localStorage.getItem("authTokens")) : null)

    const [showSidebar, setShowSidebar] = useState(null)
    
    const truncateTime = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.toLocaleString('en-US', { month: 'short' });
        const year = date.getFullYear();
        return `${day} ${month} ${year}`;
    };

    const formatCurrency = (amount) => {
        return parseFloat(amount).toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
      };


    const toggleShowSidebar = () =>{
      setShowSidebar(true)
    }
  
    const toggleCloseSidebar = () =>{
      setShowSidebar(false)
    }
  
    const OnbodyClick = () =>{
      if (showSidebar){
        setShowSidebar(false)
      }
    }
    const showAlert = () => {
        setAlertVisible(true);
        setTimeout(() => {
          setAlertVisible(false);
        }, 7000); // Automatically hide the alert after 3 seconds
    };

    const formatName = (name) => {
        return name
          .split(" ") // Split the name by spaces
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
          .join(" "); // Join the words back together
    };

    const shortName = (name) => {
        return name
          .split(" ") // Split the name by spaces
          .map((word) => word.charAt(0).toUpperCase()) // Take the first letter of each word
          .join(""); // Join the letters together
    };
    


    const RequestOTP = async(e) =>{
        e.preventDefault()
        try{
            let response = await fetch('http://127.0.0.1:8000/api/request-otp/', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                })
            })

            if (response.status === 200){
                setDisablebutton(false)
                setShowAnimation(false)
                setIsSuccess(true)
                showAlert()
                localStorage.setItem("email", email);
                localStorage.setItem('password', password)
                console.log('sucees')
                setMessage("An OTP code has been sent to your mail")
                console.log(page)
                navigate(`/${page}`)


            }else{
                const errorData = await response.json()
                const errorMessages = Object.values(errorData)
                .flat()
                .join(', ');
                setMessage(errorMessages)
                setDisablebutton(false)
                setShowAnimation(false)
                setIsSuccess(false)
                showAlert()
            }
            
        }catch(error){
          console.log(error)
          showAlert()
          setMessage('An unexpected error occurred. Please try again later.');
          setDisablebutton(false)
          setIsSuccess(false)
          setShowAnimation(false)
        }
    }

    const LoginUser = async(e) =>{
        e.preventDefault()
        try{
            let response = await fetch('http://127.0.0.1:8000/api/login/', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",

                },

                body: JSON.stringify({
                    email: email,
                    otp: otp,
                    password: password
                })
            })

            const data = await response.json();
            if(response.ok){
                setDisablebutton(false)
                setShowAnimation(false)
                setAuthToken(data)
                localStorage.setItem("authTokens", JSON.stringify(data));
                console.log("Successful");

                setIsSuccess(true)
                localStorage.removeItem("email");
                localStorage.removeItem('password')

            }else{
                const errorData = await response.json()
                const errorMessages = Object.values(errorData)
                .flat()
                .join(', ');
                setMessage(errorMessages)
                setDisablebutton(false)
                setIsSuccess(false)
                setShowAnimation(false)
                showAlert()

            }
        }catch(error){
            console.log(error)
            showAlert()
            setMessage('An unexpected error occurred. Please check your email and password.');
            setDisablebutton(false)
            setShowAnimation(false)
            setIsSuccess(false)

        }
    }

    const ForgotPasssword = async(e) =>{
        e.preventDefault()
        try{
            let response = await fetch('http://127.0.0.1:8000/api/forget-password/', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",

                },

                body: JSON.stringify({
                    email: email,
                    otp: otp,
                    new_password: password
                })


            })
            if(response.ok){
                setDisablebutton(false)
                setShowAnimation(false)
                showAlert()
                setMessage('Your password have been updated')
                localStorage.removeItem("email");
                localStorage.removeItem('password')
                navigate('/login')
                    
            }else{
                const errorData = await response.json()
                const errorMessages = Object.values(errorData)
                .flat()
                .join(', ');
                setMessage(errorMessages)
                setDisablebutton(false)
                setIsSuccess(false)
                setShowAnimation(false)
                showAlert()

            }
        }catch(error){
            console.log(error)
            showAlert()
            setMessage('An unexpected error occurred. Please check your OTP and password.');
            setDisablebutton(false)
            setShowAnimation(false)
            setIsSuccess(false)

        }
    }

    const updateToken = async () =>{
        let response = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({refresh: authTokens?.refresh})
        })
        const data = await response.json()

        if(response.status === 200){
            console.log("token updated")
            setAuthToken(data)
            localStorage.setItem("authTokens", JSON.stringify(data))
        }else{
            LogoutUser()
        }
    }

    const LogoutUser = () =>{
        setAuthToken(null)
        localStorage.removeItem("authTokens")
        navigate("/")
        console.log("sucessfull")

    }


    useEffect(() => {
        const mins = 1000 * 60 * 3
        const interval = setInterval(() => {
            if(authTokens){
                updateToken()
            }
        }, mins)

        return () => clearInterval(interval)
    }, [authTokens])

    const contextData = {
        email,
        setEmail,
        password,
        setPassword,
        authTokens,
        otp,
        setOtp,
        messages,
        setMessage,
        alertVisible,
        setAlertVisible,
        RequestOTP,
        showAlert,
        showAmimaton, 
        setShowAnimation,
        disablebutton, 
        setDisablebutton,
        LoginUser,
        LogoutUser,
        otp,
        setOtp,
        isSuccess,
        setIsSuccess,
        page,
        setPage,
        ForgotPasssword,
        showSidebar, 
        setShowSidebar,
        toggleCloseSidebar,
        toggleShowSidebar,
        OnbodyClick,
        truncateTime,
        formatCurrency,
        formatName,
        shortName,

        
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


        paymentOptionsData,
        setPaymentOptionsData,
        paymentOptionsCount,
        setPaymentOptionsCount,
        paymentOptionsLoader, 
        setPaymentOptionsLoader,

        bonusData,
        setBonusData,
        totalBonus,
        setTotalBonus,
        bonusCount,
        setBonusCount,

        blackListIPData,
        setBlackListIPData,
        blackListCount,
        setBlackListCount,

        newsLetterData,
        setNewLetterData,
        newsLetterCount,
        setNewsLetterCount,

        searchValue,
        setSearchValue,




    }

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )

}