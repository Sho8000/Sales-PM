import { Notes, Prospects } from "./dbInterface";

export interface NextAppointmentWithProspect {
  prospect: Prospects;
  note: Notes;
}

export function getNextAppointmentDateFromNotes(notes: Notes[]): Notes | null {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // normalize to midnight

  return notes
    .filter(note => new Date(note.appointmentDate) >= today)
    .sort((a, b) =>
      new Date(a.appointmentDate).getTime() - new Date(b.appointmentDate).getTime()
    )[0] || null;
}

export function getNextAppointmentDateFromAllData(prospects: Prospects[]): NextAppointmentWithProspect | null {
  let earliestAppointment: NextAppointmentWithProspect | null = null;

  prospects.forEach(prospect => {
    const nextNote = getNextAppointmentDateFromNotes(prospect.notes || []);

    if(nextNote && (!earliestAppointment || new Date(nextNote.appointmentDate)< new Date(earliestAppointment.note.appointmentDate))){
      earliestAppointment = {
        prospect: prospect,
        note: nextNote,
      };
    }
  });

  return earliestAppointment
}
