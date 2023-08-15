import { Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import AdminRecipesNav from './components/AdminRecipesNav/AdminRecipesNav';

function AdminRecipes() {
  const { key } = useLocation();
  return (
    <>
      <div className="d-flex flex-column">
        <h4 className="mb-10">Gestion des recettes</h4>
        <div className="d-flex flex-column flex-fill">
          <AdminRecipesNav />
          <div className="d-flex flex-column flex-fill">
            <Suspense>
              <Outlet key={key} />
            </Suspense>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminRecipes;
