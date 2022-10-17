import StartTimeButton from "../StartTimeButton/StartTimeButton";
import { ProviderWithAppointment } from "../../interface/interface";
import doctor from "./doctor.png";

import styles from "./provider.module.scss";

interface Props {
  provider: ProviderWithAppointment;
}

function ProviderComponent({ provider }: Props): JSX.Element {
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img src={doctor} className={styles.image} alt="stethoscope"></img>
      </div>
      <div className={styles.providerContainer}>
        <h2
          className={styles.title}
        >{`${provider.name}, ${provider.credentials}`}</h2>
        <p className={styles.phone}>{provider.phoneNumber}</p>
        <div className={styles.startTimeContainer}>
          {provider.startTimeAppointments?.map((startTime) => {
            return <StartTimeButton startTime={startTime} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default ProviderComponent;
