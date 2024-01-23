export interface Status {
  status: number;
  message: string;
  data: null | UserData;
}

export interface UserData {
  user: string;
  url?: string;
  contents: Contents[]
}

export interface Contents {
  Link: string;
  URLID: string;
}
