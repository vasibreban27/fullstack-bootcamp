import { Routes, Route } from "react-router";
import { List } from "./List";
import { Details } from "./Details";
import { Add } from "./Add";

export function BoardgamesLayout() {
  return (
    <Routes> 
      <Route index element={<List />} />
      <Route path=":id" element={<Details />} />
      <Route path="add" element={<Add />} />

    </Routes>
  )
}
