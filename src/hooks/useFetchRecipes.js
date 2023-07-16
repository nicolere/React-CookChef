import { useEffect, useState } from 'react';
import { getRecipes$ } from '../apis/recipe';

export function useFetchRecipes(page) {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancel = false;
    async function fetchRecipes() {
      try {
        setIsLoading(true);
        const queryParam = new URLSearchParams();
        if (page) {
          queryParam.append('limit', 15);
          queryParam.append('skip', (page - 1) * 15);
          queryParam.append('sort', 'createdAt:-1');
        }
        const fetchedRecipes = await getRecipes$(queryParam);

        if (!cancel) {
          setRecipes((x) => [...x, ...fetchedRecipes]);
        }
      } catch (e) {
        throw new Error('Erreur de chargement de recettes');
      } finally {
        if (!cancel) {
          setIsLoading(false);
        }
      }
    }
    fetchRecipes();
    return () => (cancel = true);
  }, [page]);

  return [[recipes, setRecipes], isLoading];
}
