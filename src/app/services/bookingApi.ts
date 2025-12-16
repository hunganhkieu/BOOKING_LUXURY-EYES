import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";
import type { BookingPayload, BookingResponse } from "../../types/Booking";

export const bookingApi = createApi({
  reducerPath: "bookingApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api-class-o1lo.onrender.com/api/luxury_eyes/",
  }),
  tagTypes: ["Bookings"],
  endpoints: (builder) => ({
    getBookingByScheduleId: builder.query<BookingResponse, string>({
      query: (scheduleId) => `appointments?scheduleId=${scheduleId}`,
      providesTags: ["Bookings"],
    }),
    createBooking: builder.mutation<void, BookingPayload>({
      query: (bookingData) => ({
        url: "/appointments",
        method: "POST",
        body: bookingData,
      }),
      invalidatesTags: ["Bookings"],
    }),
  }),
});

export const { useGetBookingByScheduleIdQuery, useCreateBookingMutation } =
  bookingApi;
