import { Schema, Document, model } from "mongoose";

interface IContents {
  Link: string;
  URLID: string;
}
interface UserDocument extends Document {
  User: string;
  Contents: IContents[];
  Date: Date;
  Language: string;
}
const User = new Schema({
  User: {
    type: String,
  },
  Contents: {
    type: Array,
  },
  Date: {
    type: Date,
    default: Date,
  },
  Language: {
    type: String,
    default: 'en'
  }
});

export = model<UserDocument>("users", User);
