import { useState } from 'react';
import * as z from 'zod/v4';
import { toast } from 'react-toastify';
import { useValidation } from '../../utils/useValidation';
import { useAuth } from './Auth';
import type { Auth } from './types';

const validationSchema = z.object({
  email: z.email('Please tell us your email address.'),
  password: z.string().nonempty('Please pick a secure password.').min(6, 'Password should be at least 6 characters long.'),
  retypePassword: z.string().nonempty('Please retype your password.').min(6, 'Password should be at least 6 characters long.'),
  firstName: z.string().nonempty('Please tell us your first name.'),
  lastName: z.string().nonempty('Please tell us your first name.'),
}).refine((o) => o.password === o.retypePassword, {
  error: 'Passwords did not match.',
  path: ['retypePassword'],
});

export function Register() {
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
    retypePassword: '',
    firstName: '',
    lastName: '',
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

    const {retypePassword, ...forServer} = formValues;

    const data = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify(forServer),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json()) as Auth | string;

    if(typeof data === 'string') {
      toast.error(data);
      return;
    }

    login(data);
    toast.success('You have successfully logged in!');
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

      <label htmlFor="retypePassword">Retype Password</label>
      <input
        type="password"
        name="retypePassword"
        id="retypePassword"
        value={formValues.retypePassword}
        onChange={handleInputChange}
      />
      {errors?.retypePassword && <p className="fieldError">{errors.retypePassword}</p>}

      <label htmlFor="firstName">First Name</label>
      <input
        type="text"
        name="firstName"
        id="firstName"
        value={formValues.firstName}
        onChange={handleInputChange}
      />
      {errors?.firstName && <p className="fieldError">{errors.firstName}</p>}

      <label htmlFor="lastName">Last Name</label>
      <input
        type="text"
        name="lastName"
        id="lastName"
        value={formValues.lastName}
        onChange={handleInputChange}
      />
      {errors?.lastName && <p className="fieldError">{errors.lastName}</p>}

      <button type="submit">Register</button>
    </form>
  );
}
