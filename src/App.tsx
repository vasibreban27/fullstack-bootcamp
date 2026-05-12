import { Route, Routes } from 'react-router';
import { Counter } from './features/Counter/Counter';
import { Todos } from './features/Todos/Todos';
import { Weather } from './features/Weather/Weather';
import { Register } from './features/Auth/Register';
import { Login } from './features/Auth/Login';
import { Nav } from './componets/Nav/Nav';
import { BrandToastContainer } from './componets/BrandToastContainer/BrandToastContainer';

import './App.css';
import './forms.css';
import {BoardgamesLayout} from "./features/Boardgames";

export function App() {
  return (
    <>
      <BrandToastContainer />
        <Nav />
        <Routes>
          <Route path="/" element={<h1>Homepage</h1>} />
          <Route path="todos" element={<Todos />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="weather" element={<Weather />} />
            <Route path="boardgames/*" element={<BoardgamesLayout />} />
          <Route
            path="counter"
            element={
              <>
                <Counter />
                <Counter initialCount={3} diff={5} />
              </>
            }
          />
        </Routes>
    </>
  );
}
