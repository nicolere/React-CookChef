import styles from './Header.module.scss';
import cookchef from '../../assets/images/cookchef.png';
import { useState } from 'react';
import Menu from './components/HeaderMenu/Menu';
import { NavLink, useLocation } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { wishlistDisplayState } from '../../state';

function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const setWishlistDisplay = useSetRecoilState(wishlistDisplayState);
  const location = useLocation();

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
        {!location.pathname.includes('admin') && (
          <button
            onClick={() => setWishlistDisplay(true)}
            className="mr-10 btn btn-reverse-primary"
          >
            <i className="fas fa-heart mr-5"></i>
            <span>Wishlist</span>
          </button>
        )}
      </ul>
      <i
        onClick={() => setShowMenu(true)}
        className={`fas fa-bars ${styles.headerXs}`}
      ></i>
      {showMenu && (
        <>
          <div onClick={() => setShowMenu(false)} className="calc"></div>
          <Menu setWishlistDisplay={setWishlistDisplay} />
        </>
      )}
    </header>
  );
}

export default Header;
