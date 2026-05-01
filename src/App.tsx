import { Counter } from "./features/Counter/Counter";
import {Todos} from "./features/Todos/Todos";


export function App() {
  return (
  <>
      <Todos/>
    <Counter />
    <Counter initialCount={3} diff={5} />
  </>
  );
}
