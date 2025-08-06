import { Notes } from "./dbInterface";

export function getNextAppointmentDateFromNotes(notes: Notes[]): Date | null {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // normalize to midnight

  const futureAppointments = notes
    .filter((note) => new Date(note.appointmentDate) >= today)
    .sort((a, b) =>
      new Date(a.appointmentDate).getTime() - new Date(b.appointmentDate).getTime()
    );

  return futureAppointments.length > 0 ? new Date(futureAppointments[0].appointmentDate) : null;
}

export function getNextAppointmentDateFromAllData(notes: Notes[]): Date | null {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // normalize to midnight

  const futureAppointments = notes
    .filter((note) => new Date(note.appointmentDate) >= today)
    .sort((a, b) =>
      new Date(a.appointmentDate).getTime() - new Date(b.appointmentDate).getTime()
    );

  return futureAppointments.length > 0 ? new Date(futureAppointments[0].appointmentDate) : null;
}
