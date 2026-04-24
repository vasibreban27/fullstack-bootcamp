import React from "react";

export function Counter(){

    let cnt = 0;

    function handleClick(){
        cnt--;
    }
    return (
        <>
            <h1>Counter</h1>
            <output>{cnt}</output>
            <p>
                <button onClick={handleClick}>+</button>
                <button>-</button>
            </p>
        </>

    )
}

