import { data } from './recipes';

export async function seedRecipes() {
  await fetch('https://restapi.fr/api/recipesTest', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}
