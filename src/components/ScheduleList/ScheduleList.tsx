import { AppointmentItem } from "../AppointmentItem/AppointmentItem"
import { Appointment } from "../../types/Appointment"

type Props = {
  appointments: Appointment[]
}

export function ScheduleList({ appointments }: Props) {
  return (
    <div className="flex flex-col gap-4">
      {appointments.map((appointment) => (
        <AppointmentItem
          key={appointment.id}
          appointment={appointment}
        />
      ))}
    </div>
  )
}