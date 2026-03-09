import type { Appointment } from "../../types/Appointment"

type Props = {
  appointment: Appointment
}

export function AppointmentItem({ appointment }: Props) {
  return (
    <div>
      <p>{appointment.name}</p>
      <p>{appointment.date}</p>
      <p>{appointment.time}</p>
    </div>
  )
}