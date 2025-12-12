import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { DoctorResponse } from "../../types/Doctor";

export interface Doctor {
  id: number;
  user_id: number;
  avatar?: string | null;
  specialty?: string;
  description?: string;
  experience_year?: number;
  created_at: string;
}
export const doctorApi = createApi({
  reducerPath: "doctorApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api-class-o1lo.onrender.com/api/luxury_eyes/",
  }),
  tagTypes: ["Doctors"], // khai báo danh sách các tag sẽ dùng
  endpoints: (builder) => ({
    // builder là object chứa các hàm để tạo endpoint
    getDoctors: builder.query<DoctorResponse, void>({
      // .query là để fetch dữ liệu
      query: () => "doctors", // nối tiếp đường dẫn với baseUrl
      providesTags: ["Doctors"], // đặt tên tag cho từng query
    }),
  }),
});

export const { useGetDoctorsQuery } = doctorApi;
