import { useState } from 'react';

export function Register() {
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
    retypePassword: '',
    firstName: '',
    lastName: '',
  });

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormValues({...formValues, [e.target.name]: e.target.value})    
  }

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();

    const {retypePassword, ...forServer} = formValues;

    const data = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify(forServer),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json());

    if(typeof data === 'string') {
      console.warn(data);
    }
    console.log(data);
  }

  return (
    <form className="brandForm" onSubmit={handleSubmit}>
      <h1 className="spanFullGrid">Register</h1>

      <label htmlFor="email">Email</label>
      <input
        type="email"
        name="email"
        id="email"
        value={formValues.email}
        onChange={handleInputChange}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        id="password"
        value={formValues.password}
        onChange={handleInputChange}
      />
      <label htmlFor="retypePassword">Retype Password</label>
      <input
        type="password"
        name="retypePassword"
        id="retypePassword"
        value={formValues.retypePassword}
        onChange={handleInputChange}
      />
      <label htmlFor="firstName">First Name</label>
      <input
        type="text"
        name="firstName"
        id="firstName"
        value={formValues.firstName}
        onChange={handleInputChange}
      />
      <label htmlFor="lastName">Last Name</label>
      <input
        type="text"
        name="lastName"
        id="lastName"
        value={formValues.lastName}
        onChange={handleInputChange}
      />

      <button type="submit">Register</button>
    </form>
  );
}
