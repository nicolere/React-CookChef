import styles from './RecipeForm.module.scss';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useContext } from 'react';
import { ApiContext } from '../../../../context/ApiContext';

function RecipeForm() {
  const BASE_URL_API = useContext(ApiContext);
  const defaultvalues = {
    title: '',
    image: '',
  };

  const recipeSchema = yup.object({
    title: yup
      .string()
      .required('Le titre de la recette est obligatoire')
      .min(10, 'Titre trop court !')
      .max(30, 'Titre trop long !'),
    image: yup
      .string()
      .required("L'image doit être renseignée")
      .url("L'image doit être un lien valide"),
  });

  const {
    formState: { errors, isSubmitting },
    register,
    handleSubmit,
    reset,
    clearErrors,
  } = useForm({ defaultvalues, resolver: yupResolver(recipeSchema) });

  async function submit(values) {
    try {
      clearErrors();
      const response = await fetch(BASE_URL_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        reset(defaultvalues);
      }
    } catch (e) {
      throw new Error('Erreur durant la création de recette');
    }
  }

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className={`d-flex flex-column align-items-center card p-20 ${styles.form}`}
    >
      <h2>Ajouter une recette</h2>
      <div className="d-flex flex-column mb-20">
        <label>Titre de la recette</label>
        <input {...register('title')} type="text" />
        {errors.title && <p className="form-error">{errors.title.message}</p>}
      </div>
      <div className="d-flex flex-column mb-20">
        <label>Image pour la recette</label>
        <input {...register('image')} type="text" />
        {errors.image && <p className="form-error">{errors.image.message}</p>}
      </div>
      <div>
        <button disabled={isSubmitting} className="btn btn-primary mb-10">
          Sauvegarder
        </button>
      </div>
    </form>
  );
}

export default RecipeForm;
