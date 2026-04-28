import { Counter } from "./features/Counter/Counter";
import {Weather} from "./features/Weather/Weather.tsx";

export function App() {
  return (
      <>
          <Weather/>
          <Counter/>
          <Counter initialCount={3} diff={5}/>
      </>
  )
}
