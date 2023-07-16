const RECIPE_API_URL = 'https://restapi.fr/api/recipesTest';

export async function getRecipes$(queryParam) {
  const response = await fetch(
    `${RECIPE_API_URL}${queryParam ? `?${queryParam}` : ''}`
  );

  if (response.ok) {
    const body = await response.json();
    return Array.isArray(body) ? body : [body];
  } else {
    throw new Error('Erreur du fetch de recettes');
  }
}

export async function getRecipe$(_id) {
  const response = await fetch(`${RECIPE_API_URL}/${_id}`);

  if (response.ok) {
    return response.json();
  } else {
    throw new Error("Erreur du fetch d'une recette");
  }
}

export async function deleteRecipe$(_id) {
  const response = await fetch(`${RECIPE_API_URL}/${_id}`, {
    method: 'DELETE',
  });
  if (response.ok) {
    return _id;
  } else {
    throw new Error("Erreur lors du delete d'une recette");
  }
}

export async function updateRecipe$(updatedRecipe) {
  const { _id, ...restRecipe } = updatedRecipe;
  const response = await fetch(`${RECIPE_API_URL}/${_id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(restRecipe),
  });
  if (response.ok) {
    return response.json();
  } else {
    throw new Error('Erreur lors du like de la recette');
  }
}

export async function createRecipe$(newRecipe) {
  const response = await fetch(RECIPE_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newRecipe),
  });

  if (response.ok) {
    return response.json();
  } else {
    throw new Error('Erreur lors de la création de la recette');
  }
}
