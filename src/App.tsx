import { Counter } from "./features/Counter/Counter";
import { Todos } from "./features/Todos/Todos";
import { Weather } from "./features/Weather/Weather";
import {Route, Routes} from "react-router";
import './App.css';


export function App() {
  return (
  <Routes>
      <Route path="todos" element={<Todos />} />
      <Route path="weather" element={<Weather />} />
      <Route
          path="counter"
          element={
      <>
        <Counter initialCount={10} diff={2} />
        <Counter/>
      </>
      }
    />
  </Routes>
  );
}
