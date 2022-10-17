import React, { useEffect, useState } from "react";

import ErrorPage from "../ErrorPage/ErrorPage";
import AppointmentCard from "../AppointmentCard/AppointmentCard";
import { Clinic } from "../../zoomcare-api";
import { AppointmentSlot } from "../../zoomcare-api";
import {
  StartTimeAppointment,
  FormattedAppointment,
} from "../../interface/interface";

interface Props {
  token: string;
}

interface partialFormattedAppointment {
  [index: string]: FormattedAppointment;
}

const AppointmentPage: Function = ({
  token,
}: Props): JSX.Element[] | JSX.Element => {
  const [clinics, setClinics] = useState(new Map<number, Clinic>());
  const [formattedAppointments, setFormattedAppointments] = useState<
    Array<FormattedAppointment>
  >([]);
  const [error, setError] = useState<boolean>(false);

  const formatAppointment: Function = (
    appointments: AppointmentSlot[]
  ): FormattedAppointment[] => {
    let index: string = "";
    const partialFormatAppointments = appointments.reduce(
      (result, appointment) => {
        let startTimeData: StartTimeAppointment = {
          id: appointment.id,
          startTime: appointment.startTime,
          durationInMinutes: appointment.durationInMinutes,
        };
        index = `${String(appointment.clinicId)}-${String(
          appointment.provider.id
        )}`;
        if (result[index]) {
          result[index].providerWithAppointment.startTimeAppointments?.push(
            startTimeData
          );
        } else {
          let clinicProvider: FormattedAppointment = {
            clinicId: appointment.clinicId,
            providerWithAppointment: appointment.provider,
          };
          clinicProvider.providerWithAppointment.startTimeAppointments = [
            startTimeData,
          ];
          result[index] = clinicProvider;
        }
        ////////////////////////////////////////////////////////////////////////////////////////////////
        // Assuming that the data is sorted, we don't need to review 2 times the array 1 for the assignment and another one to get the array of values as in the another version.
        ////////////////////////////////////////////////////////////////////////////////////////////////
        // if (
        //   result.length === 0 ||
        //   result[result.length - 1].clinicId !== appointment.clinicId ||
        //   result[result.length - 1].providerWithAppointment.id !==
        //     appointment.provider.id
        // ) {
        //   let clinicProvider: FormattedAppointment = {
        //     clinicId: appointment.clinicId,
        //     providerWithAppointment: appointment.provider,
        //   };
        //   clinicProvider.providerWithAppointment.startTimeAppointments = [
        //     startTimeData,
        //   ];
        //   result[result.length] = clinicProvider;
        // } else {
        //   result[
        //     result.length - 1
        //   ].providerWithAppointment.startTimeAppointments?.push(startTimeData);
        // }
        // return result;
        // }, [] as FormattedAppointment );
        return result;
      },
      {} as partialFormattedAppointment
    );
    return Object.values(partialFormatAppointments);
  };

  useEffect(() => {
    fetch(`/api/clinics`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((response) => {
        if (!response.ok) {
          setError(true);
        } else {
          return response.json();
        }
      })
      .then((data) => {
        const clinicsMap = new Map();
        data.clinics.map((clinic: Clinic) => clinicsMap.set(clinic.id, clinic));
        setClinics(clinicsMap);
      });
  }, []);

  useEffect(() => {
    fetch(`/api/appointments`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((response: any) => {
        if (!response.ok) {
          setError(true);
        } else {
          return response.json();
        }
      })
      .then((data) => {
        setFormattedAppointments(formatAppointment(data.appointmentSlots));
      });
  }, []);

  return error ? (
    <ErrorPage />
  ) : formattedAppointments.length > 0 && clinics.size > 0 ? (
    <React.Fragment>
      {formattedAppointments.map((formattedAppointment, index) => (
        <AppointmentCard
          key={index}
          appointment={formattedAppointment}
          clinics={clinics}
        />
      ))}
    </React.Fragment>
  ) : (
    <h1>Loading...</h1>
  );
};

export default AppointmentPage;
