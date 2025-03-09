import React, { memo } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { EventClickArg, DateSelectArg } from "@fullcalendar/core";
interface CalendarViewProps {
  events: Array<{
    id: string;
    title: string;
    start: string;
    end: string;
    type: string;
    status: string;
  }>;
  onEventClick: (event: EventClickArg) => void;
  onSelectSlot: (selectInfo: DateSelectArg) => void;
}
const CalendarView: React.FC<CalendarViewProps> = ({
  events,
  onEventClick,
  onSelectSlot
}) => {
  const eventClassNames = (arg: any) => {
    const classes = ["p-2", "rounded-lg", "border"];
    switch (arg.event.extendedProps.type) {
      case "funeral":
        classes.push("bg-blue-100 border-blue-200 text-blue-800");
        break;
      case "memorial":
        classes.push("bg-purple-100 border-purple-200 text-purple-800");
        break;
      case "viewing":
        classes.push("bg-green-100 border-green-200 text-green-800");
        break;
      default:
        classes.push("bg-gray-100 border-gray-200 text-gray-800");
    }
    if (arg.event.extendedProps.status === "confirmed") {
      classes.push("border-l-4");
    }
    return classes;
  };
  return <div className="bg-white rounded-lg shadow-sm p-4">
      <FullCalendar plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]} initialView="timeGridWeek" headerToolbar={{
      left: "prev,next today",
      center: "title",
      right: "dayGridMonth,timeGridWeek,timeGridDay"
    }} events={events} eventClick={onEventClick} select={onSelectSlot} selectable={true} selectMirror={true} dayMaxEvents={true} weekends={true} businessHours={{
      daysOfWeek: [1, 2, 3, 4, 5, 6],
      startTime: "08:00",
      endTime: "18:00"
    }} slotMinTime="08:00:00" slotMaxTime="18:00:00" eventClassNames={eventClassNames} height="auto" expandRows={true} stickyHeaderDates={true} allDaySlot={false} slotDuration="01:00:00" slotLabelInterval="01:00" slotLabelFormat={{
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    }} />
    </div>;
};
export default CalendarView;