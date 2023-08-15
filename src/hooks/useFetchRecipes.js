import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { getRecipes$ } from '../apis/recipe';
import { recipesState } from '../state';

export function useFetchRecipes(page) {
  const setRecipes = useSetRecoilState(recipesState);
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
          if (page && page !== 1) {
            setRecipes((x) => [...x, ...fetchedRecipes]);
          } else {
            setRecipes(fetchedRecipes);
          }
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
  }, [page, setRecipes]);

  return [isLoading];
}
