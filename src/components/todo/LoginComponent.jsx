import { useState } from 'react'
import { BrowserRouter, Routes, Route, useNavigate, useParams, Link} from 'react-router-dom'
import  './TodoApp.css'
import { useAuth } from './security/AuthContext'


export default function LoginComponent(){

    const [username, setUsername] = useState('in28mins')
    const [password, setPassword] = useState('')

    const [showErrorMessage, setShowErrorMessage] = useState(false)

    const navigate = useNavigate();

    const authContext = useAuth()

    function handleUsernameChange(event) {
        console.log(event.target.value); // print in console
        setUsername(event.target.value);
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }

    async function handleSubmit() {
        if(await authContext.login(username, password)){
            navigate(`/welcome/${username}`)
        }else{
            setShowErrorMessage(true)
        }
    }

//    function SuccessMessageComponent() {
//       if(showSuccessMessage){
//            return (
//                <div className="successMessage">Authenticated Successfully</div>
//            )
//        }
//        return null
//    }

//    function ErrorMessageComponent() {
//        if(showErrorMessage){
//            return (
//                <div className="errorMessage">Authentication failed. Please check your credentials</div>
//            )
//        }
//       return null
//   }

    return (
        <div className="Login">
            <h1> Login</h1>
            {showErrorMessage && <div className="errorMessage">Authentication failed. Please check your credentials</div>}
            <div className="LoginForm">
                <div>
                    <label>User Name</label>
                    <input type="text" name="username" value={username} onChange={handleUsernameChange}/>
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" name="password" value={password} onChange={handlePasswordChange}/>
                </div>
                <div>
                    <button type="button" name="login" onClick={handleSubmit}>Login </button>
                </div>
            </div>
        </div>
    )
}

