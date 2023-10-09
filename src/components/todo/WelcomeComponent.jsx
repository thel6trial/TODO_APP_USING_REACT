import {useParams, Link} from 'react-router-dom'
import {useState} from 'react'
import { retrieveHelloWorldPathVariable } from './api/HelloWorldApiService';
import { useAuth } from './security/AuthContext';

export default function WelcomeComponent(){

    const {username} = useParams();

    const authContext = useAuth()

    const[message, setMessage] = useState(null)

    function callHelloWorldRestAPI() {

        retrieveHelloWorldPathVariable('Ranga', authContext.token)
            .then(
                (response) =>  successfulResponse(response)
            )
            .catch(
                (error) => errorResponse(error)
            )
            .finally(
                () => console.log('clean up')
            )
    }

    function successfulResponse(response){
        console.log(response)
        //setMessage(response.data) // data from hello-world page
        setMessage(response.data.message)
    }

    function errorResponse(error){
        console.log(error)
    }

    return (
        <div className='welcomeToDoApp'>
            <h1>Welcome {username}</h1>
            <div className="Welcome">
                Manage your todos - <Link to="/todos">Go here</Link>
            </div>
            <div>
                <button className="btn btn-success m-5" onClick={callHelloWorldRestAPI}>Call Hello World Rest API</button>
            </div>
            <div className="text-info">{message}</div>
        </div>
    )
}