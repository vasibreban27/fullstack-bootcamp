import * as z from "zod/v4";
import {useState} from "react";

export function useValidation<T extends z.ZodObject>(validationSchema: T){
    type Form = z.infer<typeof validationSchema>;
    type Errors = Partial<Record<keyof Form, string>>;


    const [errors,setErrors] = useState<Errors>({});

    function isValid(formValues: Record<string, unknown>) {
        let hasErrors = false;
        const res = validationSchema.safeParse(formValues);
        if(!res.success) {
            const newErrors: Errors = {};
            const flattenedErrors = z.flattenError(res.error);
            for(const field in flattenedErrors.fieldErrors) {
                const key = field as keyof Errors;

                const error = flattenedErrors.fieldErrors[key];
                if(error){
                    newErrors[key] = error[0];
                    hasErrors = true;
                }

            }

        }
        setErrors(newErrors);
        return !hasErrors;

    }
    return {errors, isValid};
}


