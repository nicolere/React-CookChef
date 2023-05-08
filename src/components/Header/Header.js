import styles from './Header.module.scss';
import cookchef from '../../assets/images/cookchef.png';
import { useState } from 'react';
import Menu from './components/HeaderMenu/Menu';

function Header({ setPage }) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header className={` ${styles.header} d-flex flex-row align-items-center`}>
      <div className="flex-fill">
        <img
          onClick={() => setPage('homepage')}
          src={cookchef}
          alt="logo cookchef"
        />
      </div>
      <ul className={styles.headerList}>
        <button
          onClick={() => setPage('admin')}
          className="mr-10 btn btn-reverse-primary"
        >
          <i className="fas fa-plus mr-5"></i>
          <span>Ajouter recette</span>
        </button>
        <button className="mr-10 btn btn-reverse-primary">
          <i className="fas fa-heart mr-5"></i>
          <span>Wishlist</span>
        </button>
        <button className="btn btn-primary">Connexion</button>
      </ul>
      <i
        onClick={() => setShowMenu(true)}
        className={`fas fa-bars ${styles.headerXs}`}
      ></i>
      {showMenu && (
        <>
          <div onClick={() => setShowMenu(false)} className="calc"></div>
          <Menu setPage={setPage} />
        </>
      )}
    </header>
  );
}

export default Header;
