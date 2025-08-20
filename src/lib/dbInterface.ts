export interface Memos {
  id: string;
  memoSubject: string;
  memoDetail: string;
  createdAt: Date;
  noteId: string;
}

export interface Notes {
  id: string;
  noteTitle: string;
  content: string;
  status: string;
  appointmentDate: Date | null;
  createdAt: Date;
  prospectId: string;
  memos: Memos[];
}

export interface Prospects {
  id: string;
  prospectName: string;
  prospectSex: string;
  prospectAge: number;
  prospectMarital: string;
  children: number;
  prospectBusiness: string;
  prospectPosition: string;
  prospectLocation: string;
  prospectPhone: string;
  prospectEmail: string;
  prospectHidden: boolean;
  prospectFirstcontact: Date;
  createdAt: Date;
  prospectListId: string;
  notes: Notes[];
}

export interface ProspectList {
  id: string;
  userId: string;
  createdAt: Date;
  prospects: Prospects[];
}

export interface ContentsSetting {
  id: string;
  contentName: string;
  userId: string;
}

export interface StatusSetting {
  id: string;
  statusName: string;
  statusColor: string;
  statusOrder: number;
  userId: string;
}

export interface User {
  id: string;
  username: string;
  useremail: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  prospectList?: ProspectList | null;
  statusSetting: StatusSetting[];
  contentsSetting: ContentsSetting[];
}
