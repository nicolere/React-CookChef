import styles from './Header.module.scss';
import cookchef from '../../assets/images/cookchef.png';
import { useState } from 'react';
import Menu from './components/HeaderMenu/Menu';

function Header() {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header className={` ${styles.header} d-flex flex-row align-items-center`}>
      <div className="flex-fill">
        <img src={cookchef} alt="logo cookchef" />
      </div>
      <ul className={styles.headerList}>
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
