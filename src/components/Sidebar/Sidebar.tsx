import type { Appointment } from "../../types/Appointment"
import { AppointmentForm } from "../AppointmentForm/AppointmentForm"

type Props = {
  appointments: Appointment[]
  onAdd: (appointment: Appointment) => void
}

export function Sidebar({ appointments, onAdd }: Props) {
  return (
    <aside className="w-[380px] min-h-screen bg-gray800 flex flex-col p-8 shrink-0">

      {/* Logo */}
      <div className="flex items-center gap-2 mb-10">
        <span className="text-yellowLight font-bold text-2xl tracking-tight">
          HairDay
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="#DBC170"
          viewBox="0 0 256 256"
        >
          <path d="M234.67,66.74a8,8,0,0,0-11.31.25L192,99.58V88a32,32,0,0,0-32-32H80A32,32,0,0,0,48,88v80a32,32,0,0,0,32,32h80a32,32,0,0,0,32-32V156.42l31.36,32.59a8,8,0,1,0,11.56-11.06L192,151.92V144h20a8,8,0,0,0,0-16H192V104h20a8,8,0,0,0,0-16H192V80.08l42.92-44.59a8,8,0,0,0-.25-11.31ZM176,168a16,16,0,0,1-16,16H80a16,16,0,0,1-16-16V88A16,16,0,0,1,80,72h80a16,16,0,0,1,16,16Z"/>
        </svg>
      </div>

      {/* Título do formulário */}
      <div className="mb-6">
        <h1 className="text-gray100 text-2xl font-bold leading-tight">
          Agende um atendimento
        </h1>
        <p className="text-gray400 text-sm mt-1">
          Selecione data, horário e informe o nome do cliente para criar o agendamento.
        </p>
      </div>

      {/* Formulário */}
      <AppointmentForm appointments={appointments} onAdd={onAdd} />

    </aside>
  )
}