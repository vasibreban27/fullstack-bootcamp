import { useState } from "react";
import * as z from 'zod/v4';
import { useValidation } from "../../utils/useValidation";
import type { Boardgame } from "./types";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { useAuth } from "../Auth/Auth";

const validationSchema = z.object({
  name: z.string().nonempty('Every boardgame must have a name.'),
  thumbnail: z.url('Please provide the link to a thumbnail.'),
  image: z.url('Please provide the link to an image.'),
});


export function Add() {
  const [formValues, setFormValues] = useState<z.infer<typeof validationSchema>>({
    name: '',
    image: '',
    thumbnail: '',
  });
  const {isValid, errors} = useValidation(validationSchema);

  const navigate = useNavigate();
  const {accessToken, user} = useAuth();

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormValues({...formValues, [e.target.name]: e.target.value});
  }

  async function handleAddGame(e: React.SubmitEvent) {
    e.preventDefault();

    if(!isValid(formValues)) {
      return;
    }

    const data = await fetch('/api/boardgames', {
      method: 'POST',
      body: JSON.stringify({...formValues, userId: user?.id}),
      headers: {
        'Content-Type': 'application/json',
        'Authorization':  `Bearer ${accessToken}`,
      }
    }).then(res => res.json()) as Boardgame | string;

    if(typeof data === 'string') {
      toast.error(data);
      return;
    }

    navigate(-1);
  }

  return (
    <form className="brandForm" onSubmit={handleAddGame}>
      <h1 className="spanFullGrid">Add a New Boardgame</h1>

      <label htmlFor="name">Name</label>
      <input type="text" id="name" name="name" value={formValues.name} onChange={handleInputChange} />
      {errors?.name && <p className="fieldError">{errors.name}</p>}

      <label htmlFor="thumbnail">Thumbnail</label>
      <input type="url" id="thumbnail" name="thumbnail" value={formValues.thumbnail} onChange={handleInputChange} />
      {errors?.thumbnail && <p className="fieldError">{errors.thumbnail}</p>}

      <label htmlFor="image">Image</label>
      <input type="url" id="image" name="image" value={formValues.image} onChange={handleInputChange} />
      {errors?.image && <p className="fieldError">{errors.image}</p>}

      <button type="submit">Add Boardgame</button>
    </form>
  )
}
