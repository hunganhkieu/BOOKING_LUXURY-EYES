import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { DoctorResponse } from "../../types/Doctor";

export const doctorApi = createApi({
  reducerPath: "doctorApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api-class-o1lo.onrender.com/api/luxury_eyes/",
  }),
  tagTypes: ["Doctors"], // khai báo danh sách các tag sẽ dùng
  endpoints: (builder) => ({
    // builder là object chứa các hàm để tạo endpoint
    getDoctors: builder.query<DoctorResponse, { inputSearch?: string } | void>({
      query: (params) =>
        params?.inputSearch
          ? `doctors/?name=${params.inputSearch}`
          : `doctors/`,
      providesTags: ["Doctors"],
    }),
  }),
});

export const { useGetDoctorsQuery } = doctorApi;
