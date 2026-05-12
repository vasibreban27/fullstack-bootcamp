import {Route, Routes} from "react-router";
import { List } from "./List";

export function BoardgamesLayout(){

    return(
        <Routes>
            <Route index element={<List />} path="/" />
        </Routes>
    )
}