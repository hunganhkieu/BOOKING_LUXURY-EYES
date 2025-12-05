import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ScheduleResponse } from "../../types/Schedule";

export const scheduleApi = createApi({
  reducerPath: "scheduleApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api-class-o1lo.onrender.com/api/luxury_eyes/",
  }),
  tagTypes: ["Schedule"],
  endpoints: (builder) => ({
    getScheduleDoctorId: builder.query<ScheduleResponse, string>({
      query: (doctorId) => `schedule?doctorId=${doctorId}`,
      providesTags: ["Schedule"],
    }),
  }),
});

export const { useGetScheduleDoctorIdQuery } = scheduleApi;
