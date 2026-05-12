import { useState } from 'react';
import * as z from 'zod/v4';
import { toast } from 'react-toastify';
import { useValidation } from '../../utils/useValidation';
import { useAuth } from './Auth';

const validationSchema = z.object({
  email: z.email('Please tell us your email address.'),
  password: z.string().nonempty('Please pick a secure password.').min(6, 'Password should be at least 6 characters long.'),
});

export function Login() {
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  });
  const { errors, isValid } = useValidation(validationSchema);

  const { login } = useAuth()


  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newValues = {...formValues, [e.target.name]: e.target.value};
    setFormValues(newValues);    
    if(errors) {
      isValid(newValues);
    }
  }

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();

    if(!isValid(formValues)) {    
      return;
    }

    const data = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify(formValues),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json());

    if(typeof data === 'string') {
      toast.error(data);
      return;
    }

    login(data);
    toast.success('You have successfully logged in!');
  }

  return (
    <form className="brandForm" onSubmit={handleSubmit}>
      <h1 className="spanFullGrid">Login</h1>

      <label htmlFor="email">Email</label>
      <input
        type="email"
        name="email"
        id="email"
        value={formValues.email}
        onChange={handleInputChange}
      />
      {errors?.email && <p className="fieldError">{errors.email}</p>}

      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        id="password"
        value={formValues.password}
        onChange={handleInputChange}
      />
      {errors?.password && <p className="fieldError">{errors.password}</p>}

      <button type="submit">Login</button>
    </form>
  );
}
