 import { useState } from 'react';
import './counter.css'

export default function Counter(){

    const [count, setCount] = useState(0);

    function incrementCounterParentFunction(by){
        setCount(count + by)
    }

    function someMethodInParent(){
        console.log('parent method called')
    }

    return (
     <>
      <span className='totalCount'>{count}</span>
      <CounterButton by={1} incrementMethod={incrementCounterParentFunction}/>
      <CounterButton by={2} incrementMethod={incrementCounterParentFunction}/>
      <CounterButton by={5} incrementMethod={incrementCounterParentFunction}/>
      </>
    )
}


 function CounterButton({by, incrementCounterParentFunction}){

    //{0, f}
    // setCount is a function to update count
    const [count, setCount] = useState(0);

    console.log(by)

    function incrementCounterFunction(){
        
       setCount(count + by)
       incrementCounterParentFunction()
    
    }

    function decrementCounterFunction(){
        
        setCount(count - by)
        incrementCounterParentFunction()
     
     }

    return(
        <div className="Counter">
            <span className="count">{count}</span>
            <div>
                <button className="counterButton" 
                        onClick={incrementCounterFunction}>
                        +{by}
                </button>
                <button className="counterButton" 
                        onClick={decrementCounterFunction}>
                        -{by}
                </button>
            </div>
        </div>
    )
}
