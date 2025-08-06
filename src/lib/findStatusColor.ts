import { Notes, Prospects, StatusSetting } from "./dbInterface";

export const getStatusColorFromProspect = (
  prospect:Prospects,
  statusSettings: StatusSetting[]
):string => {
  const prospectStatuses = prospect.notes.map(note => note.status);

  const matchingStatuses = statusSettings.filter(setting =>
    prospectStatuses.includes(setting.statusName)
  );

  if (matchingStatuses.length === 0) return "#000000";

  matchingStatuses.sort((a, b) => a.statusOrder - b.statusOrder);

  return matchingStatuses[0].statusColor;
}

export const getStatusColorFromNote = (
  note:Notes,
  statusSettings: StatusSetting[]
):string => {
  const matchedSetting = statusSettings.find(
    (setting) => setting.statusName === note.status
  );

  return matchedSetting ? matchedSetting.statusColor : "#000000";
}