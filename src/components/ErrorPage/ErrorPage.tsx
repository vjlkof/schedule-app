import styles from "./errorPage.module.scss";

function ErrorPage(): JSX.Element {
  return (
    <>
      <h1 className={styles.title}>
        You are not authorized. Please contact your administrator.
      </h1>
    </>
  );
}

export default ErrorPage;
