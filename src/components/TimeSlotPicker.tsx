import { CloudOutlined, SunOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { getDayLabel } from "../utils/dateUtils";
import type { DoctorSchedule, TimeSlot } from "../types/Schedule";

interface TimeSlotPickerProps {
  scheduleItem?: DoctorSchedule;
  selectedDate: number | null;
  setSelectedDate: (idx: number) => void;
  selectedSchedule: TimeSlot | null;
  handleTimeSelect: (date: string, time: string) => void;
}

const TimeSlotPicker = ({
  scheduleItem,
  setSelectedDate,
  selectedDate,
  selectedSchedule,
  handleTimeSelect,
}: TimeSlotPickerProps) => {
  const morningSlot = scheduleItem?.timeSlots.filter((slot) => {
    const [hour, minute] = slot.time.split(":").map(Number);
    return hour <= 12;
  });

  const afternoonSlots = scheduleItem?.timeSlots.filter((slot) => {
    const [hour, minute] = slot.time.split(":").map(Number);
    return hour >= 13;
  });
  return (
    <div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Chọn ngày khám:
        </label>
        <div className="grid grid-cols-4 gap-2">
          {scheduleItem ? (
            scheduleItem.timeSlots.map((slot, idx) => {
              const dayLabel = getDayLabel(slot.date);
              const dayDate = new Date(slot.date).toLocaleDateString("vi-VN", {
                day: "2-digit",
                month: "2-digit",
              });

              return (
                <button
                  key={idx}
                  onClick={() => setSelectedDate(idx)}
                  className={`px-3 py-3 rounded-lg border-2 transition-all ${
                    selectedDate === idx
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-700 border-gray-300 hover:border-blue-500"
                  }`}
                >
                  <div className="text-center">
                    <div className="font-semibold text-sm">{dayLabel}</div>
                    <div className="text-xs mt-1">{dayDate}</div>
                  </div>
                </button>
              );
            })
          ) : (
            <p>Chưa có ngày cụ thể</p>
          )}
        </div>

        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <SunOutlined className="text-yellow-500" />
            <span className="font-semibold">Sáng</span>
          </div>
          <div className="grid grid-cols-5 gap-2">
            {morningSlot ? (
              morningSlot.map((slot) => (
                <Button
                  key={slot.scheduleId + slot.time}
                  type={
                    selectedSchedule?.time === slot.time ? "primary" : "default"
                  }
                  onClick={() => handleTimeSelect(slot.date, slot.time)}
                >
                  {slot.time}
                </Button>
              ))
            ) : (
              <p>Chưa có giờ cụ thể</p>
            )}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <CloudOutlined className="text-blue-500" />
            <span className="font-semibold">Chiều</span>
          </div>
          <div className="grid grid-cols-5 gap-2">
            {afternoonSlots ? (
              afternoonSlots.map((slot) => (
                <Button
                  key={slot.scheduleId + slot.time}
                  type={
                    selectedSchedule?.time === slot.time ? "primary" : "default"
                  }
                  onClick={() => handleTimeSelect(slot.date, slot.time)}
                >
                  {slot.time}
                </Button>
              ))
            ) : (
              <p>Chưa có giờ cụ thể</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeSlotPicker;
