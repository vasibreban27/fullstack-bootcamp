import {useState} from "react";
import * as z from 'zod/v4';
//import {keyof} from "zod/v4";

const validationSchema = z.object({
    email: z.email('Please tell us your email address'),
    password:z.string().min(6,'Password must be at least 6 characters long'),
    confirmPassword: z.string().min(6),
    firstName: z.string().nonempty('Please tell us your first name'),
    lastName: z.string().nonempty('Please tell us your last name'),
});


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

        const res = validationSchema.safeParse(formValues);
        if(!res.success) {
            const newErrors: Errors = {};
            const flattenedErrors = z.flattenError(res.error);
            for(const field in flattenedErrors.fieldErrors) {
                const key = field as keyof Errors;

                const error = flattenedErrors.fieldErrors[field as keyof Errors];
                if(error){
                    newErrors[key] = error[0];
                }

            }
            setErrors(newErrors);
        }


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
                <input type="email" name="email" id="email" value={formValues.email} onChange={handleInputChange}/>
                    {errors.email && <p className="fieldError">{errors.email}</p>}
            </label>

            <label htmlFor="password">Password
                <input type="password" name="password" id="password" value={formValues.password} onChange={handleInputChange}/>
                {errors.password && <p className="fieldError">{errors.password}</p>}
            </label>

            <label htmlFor="confirmPassword">Confirm Password
                <input type="password" name="confirmPassword" id="confirmPassword" value={formValues.confirmPassword} onChange={handleInputChange}/>
                {errors.confirmPassword && <p className="fieldError">{errors.confirmPassword}</p>}
            </label>

            <label htmlFor="firstName">First Name
                <input type="text" name="firstName" id="firstName" value={formValues.firstName} onChange={handleInputChange}/>
                {errors.firstName && <p className="fieldError">{errors.firstName}</p>}
            </label>

            <label htmlFor="lastName">Last Name
                <input type="text" name="lastName" id="lastName" value={formValues.lastName} onChange={handleInputChange}/>
                {errors.lastName && <p className="fieldError">{errors.lastName}</p>}
            </label>

            <button type="submit">Register</button>
        </form>
    )
}