import { useContext, useState } from 'react'
import { createContext } from "react";
import { executeBasicAuthenticationService } from '../api/HelloWorldApiService';
import { apiClient } from '../api/ApiClient';

// Create a Context
export const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

// Share the created context with other component

export default function AuthProvider({ children }){

    // Put some state in the context
    const [isAuthenticated, setAuthenticated] = useState(false)

    const [username, setUsername] = useState(null)

    const[token, setToken] = useState(null)

    //setInterval(
    //  () => setNumber(number + 1), 10000
        // increase number by 1 each 10 seconds
    //)

    // const valueToBeShared = {number, isAuthenticated, SetAuthenticated}

    // function login(username, password){
    //     if(username === 'in28mins' && password === 'dummy'){
    //         setAuthenticated(true)
    //         setUsername(username)
    //         return true
    //     }else{
    //         setAuthenticated(false)
    //         setUsername(null)
    //         return false
    //     }
    // }

    async function login(username, password){
        const baToken = 'Basic ' + window.btoa( username + ":" + password ) //btoa change to the base64 encoding

        try{

            const response = await executeBasicAuthenticationService(baToken)
        
            if(response.status == 200){
                setAuthenticated(true)
                setUsername(username)
                setToken(baToken)

                apiClient.interceptors.request.use(
                    (config) => {
                        console.log('intercepting and adding a token')
                        config.headers.Authorization = baToken
                        return config
                    }
                )
                return true
            }else{
                logout()
                return false
            }
        } catch(error){
            logout()
            return false
        }
    }

    function logout(){
        setAuthenticated(false)
        setToken(null)
        setUsername(null)
    }

    return (
        <AuthContext.Provider value={ {isAuthenticated, login, logout, username, token} }>
            {children}
        </AuthContext.Provider>
    )
}

