import styles from './AdminRecipesForm.module.scss';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { createRecipe$, updateRecipe$ } from '../../../../../../apis/recipe';
import { useNavigate, useParams } from 'react-router-dom';
import { selectActiveRecipe } from '../../../../../../state';
import { useRecoilValue } from 'recoil';

function AdminRecipesForm() {
  const { recipeId } = useParams();
  const recipe = useRecoilValue(selectActiveRecipe(recipeId));
  const navigate = useNavigate();

  const defaultValues = {
    title: recipe ? recipe.title : '',
    image: recipe ? recipe.image : '',
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
    setError,
    clearErrors,
  } = useForm({ defaultValues, resolver: yupResolver(recipeSchema) });

  async function submit(values) {
    try {
      clearErrors();
      if (recipe) {
        await updateRecipe$({
          ...values,
          _id: recipe._id,
        });
        navigate('/admin/recipes/list');
      } else {
        await createRecipe$(values);
        reset(defaultValues);
      }
    } catch (e) {
      setError('generic', {
        type: 'generic',
        message: 'Erreur durant la création de recette',
      });
    }
  }

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className={`d-flex flex-column card p-20 ${styles.form}`}
    >
      <h2 className="mb-10">Ajouter une recette</h2>
      <div className="d-flex flex-fill flex-column mb-20">
        <label>Titre de la recette</label>
        <input {...register('title')} type="text" />
        {errors.title && <p className="form-error">{errors.title.message}</p>}
      </div>
      <div className="d-flex flex-fill flex-column mb-20">
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

export default AdminRecipesForm;
