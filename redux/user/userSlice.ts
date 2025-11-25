import type { UserSchema } from "@/db/schema/user";
import { createSlice } from "@reduxjs/toolkit";

// const initialState: UserSchema = {
//   id: "",
//   email: "",
//   hashedPassword: "",
//   username: "",
//   fullname: "",
//   gender: "male",
//   nric: "",
//   position: "",
//   department: "",
//   employmentType: "full-time",
//   passportNo: "",
//   dob: "",
//   maritalStatus: "single",
//   nationality: "",
//   bankName: "",
//   bankAccNo: "",
//   accountHolderName: "",
//   address: "",
//   phone: "",
//   epfNo: "",
//   socsoNo: "",
//   tinNo: "",
//   previousEmployer: "",
//   highestEdu: "degree",
//   fieldOfStudy: "",
//   institution: "",
//   certificate: "",
//   emergencyContactName: "",
//   relationship: "",
//   emergencyContactPhone: "",
//   emergencyContactAddress: "",

//   dateJoin: "",
//   dateResign: "",
// };

const initialState: Pick<
  UserSchema,
  "id" | "email" | "username" | "position" | "department"
> = {
  id: "",
  email: "",
  username: "",
  position: "",
  department: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
});
