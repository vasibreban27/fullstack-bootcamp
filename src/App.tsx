import { Route, Routes } from 'react-router';
import { Counter } from './features/Counter/Counter';
import { Todos } from './features/Todos/Todos';
import { Weather } from './features/Weather/Weather';
import { Nav } from './componets/Nav/Nav';
import { Register } from './features/Auth/Register';
import './App.css';
import './forms.css'

export function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<h1>Homepage</h1>} />
        <Route path="todos" element={<Todos />} />
        <Route path="register" element={<Register />}/>
        <Route path="login" element={<Register />}/>
        <Route path="weather" element={<Weather />} />
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
