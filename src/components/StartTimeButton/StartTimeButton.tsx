import { StartTimeAppointment } from "../../interface/interface";

import styles from "./startTimeButton.module.scss";

interface Props {
  startTime: StartTimeAppointment;
}

function StartTimeButton({ startTime }: Props): JSX.Element {
  return (
    <button className={styles.button}>
      {" "}
      {startTime.startTime.slice(11, 16)}
    </button>
  );
}

export default StartTimeButton;
