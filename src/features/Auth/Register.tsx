import {useState} from "react";

export function Register() {

    const [formValues,setFormValues] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
    })

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const inputValue  = e.target.value;
        const inputName = e.target.name;
        setFormValues({...formValues, [inputName]:inputValue})

    }

    async function handleSumbit(e: React.SubmitEvent) {
        e.preventDefault();

        const {confirmPassword, ...forServer} = formValues;

         const data = await fetch('/api/register', {
            method: 'POST',
            body: JSON.stringify(forServer),
            headers: {
                'Content-Type': 'application/json'
            }
         }).then(res => res.json());
         console.log(data);
    }

    return (
        <form className="brandForm" onSubmit={handleSumbit}>
            <h1 className="spanFullGrid">Register</h1>

            <label htmlFor="email">Email
                <input type="email" name="email" id="email" value={formValues.email} onChange={handleInputChange}></input>
            </label>

            <label htmlFor="password">Password
                <input type="password" name="password" id="password" value={formValues.password} onChange={handleInputChange}></input>
            </label>

            <label htmlFor="confirmPassword">Confirm Password
                <input type="password" name="confirmPassword" id="confirmPassword" value={formValues.confirmPassword} onChange={handleInputChange}></input>
            </label>

            <label htmlFor="firstName">First Name
                <input type="text" name="firstName" id="firstName" value={formValues.firstName} onChange={handleInputChange}></input>
            </label>

            <label htmlFor="lastName">Last Name
                <input type="text" name="lastName" id="lastName" value={formValues.lastName} onChange={handleInputChange}></input>
            </label>

            <button type="submit">Register</button>
        </form>
    )
}