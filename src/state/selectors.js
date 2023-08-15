import { selector, selectorFamily } from 'recoil';
import { getRecipe$ } from '../apis/recipe';
import { recipesState } from './atoms';

export const selectFilteredRecipes = selectorFamily({
  key: 'selectFilteredRecipes',
  get:
    (filter) =>
    ({ get }) => {
      const allRecipes = get(recipesState);
      return (
        allRecipes.length &&
        allRecipes.filter((r) => r.title.toLocaleLowerCase().startsWith(filter))
      );
    },
});

export const selectActiveRecipe = selectorFamily({
  key: 'selectActiveRecipe',
  get: (recipeId) => async () => {
    return recipeId && (await getRecipe$(recipeId));
  },
});

export const selectWishedRecipe = selector({
  key: 'selectWishedRecipe',
  get: ({ get }) => get(recipesState)?.filter((r) => r.liked),
});
