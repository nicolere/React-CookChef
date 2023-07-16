import styles from './Header.module.scss';
import cookchef from '../../assets/images/cookchef.png';
import { useState } from 'react';
import Menu from './components/HeaderMenu/Menu';
import { NavLink } from 'react-router-dom';

function Header() {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header className={` ${styles.header} d-flex flex-row align-items-center`}>
      <div className="flex-fill">
        <NavLink to="/">
          <img src={cookchef} alt="logo cookchef" />
        </NavLink>
      </div>
      <ul className={styles.headerList}>
        <NavLink to="/admin">
          <button className="mr-10 btn btn-reverse-primary">
            <i className="fas fa-plus mr-5"></i>
            <span>Admin</span>
          </button>
        </NavLink>
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
          <Menu />
        </>
      )}
    </header>
  );
}

export default Header;
