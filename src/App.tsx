import { Counter } from "./features/Counter/Counter";
import { Todos } from "./features/Todos/Todos";
import { Weather } from "./features/Weather/Weather";

export function App() {
  return (
  <>
    <Todos />
    <Weather />
    <Counter />
    <Counter initialCount={3} diff={5} />
  </>
  );
}
