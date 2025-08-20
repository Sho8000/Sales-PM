import { Notes, Prospects } from "./dbInterface";

export interface NextAppointmentWithProspect {
  prospect: Prospects;
  note: Notes;
}

export function getNextAppointmentDateFromNotes(notes: Notes[]): Notes | null {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // normalize to midnight

  const notesWithAppointment = notes.filter((note)=>{return note.appointmentDate !== null});

  if(notesWithAppointment.length===0){
    return null
  } else{
    return notesWithAppointment
      .filter(note => new Date(note.appointmentDate!) >= today)
      .sort((a, b) =>
        new Date(a.appointmentDate!).getTime() - new Date(b.appointmentDate!).getTime()
      )[0];
  }
}

export function getNextAppointmentDateFromAllData(prospects: Prospects[]): NextAppointmentWithProspect | null {
  let earliestAppointment: NextAppointmentWithProspect | null = null;

  prospects.forEach(prospect => {
    const nextNote = getNextAppointmentDateFromNotes(prospect.notes || []);

    if(nextNote && nextNote.appointmentDate !== null && earliestAppointment?.note.appointmentDate !== null && (!earliestAppointment || nextNote.appointmentDate < earliestAppointment.note.appointmentDate)){
      earliestAppointment = {
        prospect: prospect,
        note: nextNote,
      };
    }
  });

  return earliestAppointment
}
