export function Counter() {
  let count = 0;

  function handleClick() {
    count--;
  }

  return (
    <>
      <h1>Counter</h1>
      <output>
        {count}
      </output>
      <p>
        <button onClick={handleClick}>-</button>
        <button>+</button>
      </p>
    </>
  )
}

// return createElement(React.Fragment, null, createElement('h1'), createElement('output'));
