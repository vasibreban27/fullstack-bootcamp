import {useEffect, useState} from "react";

export function List() {
    const [games,setGames] = useState([]);

    useEffect(() => {
        fetch('/api/boardgames?_limit=10&_page=1')
            .then(res => res.json())
            .then;
    },[]);

    return(
        <>
            <h1>Boardgames</h1>
        </>
    )
}