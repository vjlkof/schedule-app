export interface StartTimeAppointment {
  id: number;
  startTime: string;
  durationInMinutes: number;
}

export interface ProviderWithAppointment {
  id: number;
  name: string;
  credentials?: string;
  language?: string;
  phoneNumber?: string;
  startTimeAppointments?: StartTimeAppointment[];
}

export interface FormattedAppointment {
  clinicId: number;
  providerWithAppointment: ProviderWithAppointment;
}
