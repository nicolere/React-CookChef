import styles from './Loader.module.scss';

export default function Loader() {
  return (
    <div
      className={`d-flex justify-content-center align-items-center ${styles.loadingScreen}`}
    >
      <div className={`d-flex flex-wrap ${styles.loading}`}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
}
