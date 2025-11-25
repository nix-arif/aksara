import { CompanySchema } from "@/db/schema/company";
import { createSlice } from "@reduxjs/toolkit";

type CompanyItem = Pick<CompanySchema, "id" | "newSsmNo">;

interface CompanyState {
  list: CompanyItem[];
}

const initialState: CompanyState = {
  list: [],
};

const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {},
});

export default companySlice.reducer;
