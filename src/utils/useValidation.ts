import { useState } from 'react';
import * as z from 'zod/v4';

export function useValidation<T extends z.ZodObject>(validationSchema: T) {
  type Form = z.infer<T>;
  type Errors = Partial<Record<keyof Form, string>>;

  const [errors, setErrors] = useState<Errors | null>(null);

  function isValid(formValues: Record<string, unknown>) {
    const res = validationSchema.safeParse(formValues);
    let hasErrors = false;

    const newErrors: Errors = {};
    if (!res.success) {
      const flattenedErrors = z.flattenError(res.error);
      for (const field in flattenedErrors.fieldErrors) {
        const key = field as keyof Errors;

        const error = flattenedErrors.fieldErrors[key];
        if (error) {
          newErrors[key] = error[0];
          hasErrors = true;
        }
      }
    }
    if(hasErrors) {
      setErrors(newErrors);
    } else {
      setErrors(null);
    }

    return !hasErrors;
  }

  return { errors, isValid };
}
