import { useState } from "react"

import { Header } from "./components/Header/Header"
import { ScheduleList } from "./components/ScheduleList/ScheduleList"
import { AppointmentForm } from "./components/AppointmentForm/AppointmentForm"

type Appointment = {
  id: string
  name: string
  date: string
  time: string
}

export default function App() {
  const [appointments, setAppointments] = useState<Appointment[]>([])

  const addAppointment = (appointment: Appointment) => {
    setAppointments((prev) => [...prev, appointment])
  }

  return (
    <div className="flex">
      <main className="flex-1 p-8">
        <Header />

        <AppointmentForm onAdd={addAppointment} />

        <ScheduleList appointments={appointments} />
      </main>
    </div>
  )
}