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


    const navigate = useNavigate()
    //const [user, setUser] = useState(() => localStorage.getItem("authTokens") ? jwtDecode(localStorage.getItem("authTokens")) : null)

    const [showSidebar, setShowSidebar] = useState(null)
  
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



    }

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )

}