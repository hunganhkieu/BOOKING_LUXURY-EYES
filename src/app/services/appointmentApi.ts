import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";
import type {
  Appointment,
  BookingPayload,
  BookingResponse,
} from "../../types/Booking";

export const appointmentApi = createApi({
  reducerPath: "appointmentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api-class-o1lo.onrender.com/api/luxury_eyes/",
  }),
  tagTypes: ["Appointments", "AppointmentScheduleId"],
  endpoints: (builder) => ({
    getAppointments: builder.query<BookingResponse, void>({
      query: () => "appointments",
      providesTags: ["Appointments"],
    }),
    getBookingByScheduleId: builder.query<BookingResponse, string>({
      query: (scheduleId) => `appointments?scheduleId=${scheduleId}`,
      providesTags: (_result, _error, scheduleId) => [
        { type: "AppointmentScheduleId", id: scheduleId },
      ],
    }),
    createBooking: builder.mutation<void, BookingPayload>({
      query: (bookingData) => ({
        url: "/appointments",
        method: "POST",
        body: bookingData,
      }),
      invalidatesTags: (_result, _error, arg) => [
        "Appointments",
        { type: "AppointmentScheduleId", id: arg.scheduleId },
      ],
    }),

    cancelAppointment: builder.mutation<
      Appointment,
      { id: string; reason: string }
    >({
      query: ({ id, reason }) => ({
        url: `appointments/${id}`,
        method: "PATCH",
        body: { status: "CANCELED", reason },
      }),
      invalidatesTags: ["Appointments"],
    }),

    cancelAppointmentConfirm: builder.mutation<
      Appointment,
      { id: string; reason: string }
    >({
      query: ({ id, reason }) => ({
        url: `appointments/${id}`,
        method: "PATCH",
        body: { status: "REQUEST-CANCELED", reason },
      }),
      invalidatesTags: ["Appointments"],
    }),
  }),
});

export const {
  useGetAppointmentsQuery,
  useGetBookingByScheduleIdQuery,
  useCreateBookingMutation,
  useCancelAppointmentMutation,
  useCancelAppointmentConfirmMutation,
} = appointmentApi;
