import { useState } from "react"

type Appointment = {
  id: string
  name: string
  date: string
  time: string
}

type Props = {
  onAdd: (appointment: Appointment) => void
}

export function AppointmentForm({ onAdd }: Props) {
  const [name, setName] = useState("")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newAppointment: Appointment = {
      id: crypto.randomUUID(),
      name,
      date,
      time
    }

    onAdd(newAppointment)

    setName("")
    setDate("")
    setTime("")
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-4 mb-8">
      <input
        type="text"
        placeholder="Nome"
        className="border p-2 rounded"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="date"
        className="border p-2 rounded"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <input
        type="time"
        className="border p-2 rounded"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 rounded"
      >
        Agendar
      </button>
    </form>
  )
}