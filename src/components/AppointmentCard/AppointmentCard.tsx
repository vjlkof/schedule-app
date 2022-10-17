import ClinicComponent from "../Clinic/Clinic";
import ProviderComponent from "../Provider/Provider";
import { Clinic } from "../../zoomcare-api";
import { FormattedAppointment } from "../../interface/interface";

import styles from "./appointmentCard.module.scss";

interface Props {
  appointment: FormattedAppointment;
  clinics: Map<number, Clinic>;
}

function AppointmentCard({ appointment, clinics }: Props): JSX.Element {
  return (
    <div className={styles.card}>
      <div className={styles.container}>
        <div className={styles.clinicWrapper}>
          {clinics.has(appointment.clinicId) ? (
            <ClinicComponent clinic={clinics.get(appointment.clinicId)} />
          ) : (
            <h2>Unknown Clinic</h2>
          )}
        </div>
        <ProviderComponent provider={appointment.providerWithAppointment} />
      </div>
    </div>
  );
}

export default AppointmentCard;
