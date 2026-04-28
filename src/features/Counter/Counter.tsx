import {useState} from "react";
import styles from './Counter.module.css'
import clsx from "clsx";

export function Counter({initialCount = 0, diff=1}) {
  const [count,setCount] = useState(initialCount);

  function handleClick(sign=1) {
    setCount(count+diff*sign);
  }

  //   let cls=''
  // if(count<0) cls='negative';
  // if(count>0) cls='positive';

  return (
    <>
      <h1>Counter</h1>
      <output className={clsx({[styles.positive]: count>0, [styles.negative]: count<0})}>
        {count}
      </output>
      <p>
        <button onClick={()=>{handleClick(-diff)}}>-</button>
          <button onClick={()=>{setCount(initialCount)}}>Reset</button>
        <button onClick={()=>{handleClick(diff)}}>+</button>
      </p>
    </>
  )
}

// return createElement(React.Fragment, null, createElement('h1'), createElement('output'));
// let state;
// function dummyUseState(initialState){
//     if(state === undefined)
//         state = initialState;
//
//     function updateState(newState){
//         state = newState;
//         Counter();
//     }
//    return [state,updateState];
// }