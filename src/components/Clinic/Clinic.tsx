import styles from "./clinic.module.scss";
import { Clinic } from "../../zoomcare-api";

interface Props {
  clinic: Clinic | undefined;
}

function ClinicComponent({ clinic }: Props) {
  return (
    <>
      <h2 className={styles.title}>{clinic?.name}</h2>
      <p className={styles.address}>{clinic?.address}</p>
      <p className={styles.address}>
        {`${clinic?.city}, ${clinic?.state} ${clinic?.zipcode}`}
      </p>
    </>
  );
}

export default ClinicComponent;
