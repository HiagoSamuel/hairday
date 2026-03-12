import type { Appointment } from "../../types/Appointment"

type Props = {
  appointment: Appointment
  onRemove: (id: string) => void
}

export function AppointmentItem({ appointment, onRemove }: Props) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-gray600 last:border-0">

      {/* Horário + Nome */}
      <div className="flex items-center gap-4">
        <span className="text-gray100 font-bold text-sm w-12 shrink-0">
          {appointment.time}
        </span>
        <span className="text-gray300 text-sm">
          {appointment.name}
        </span>
      </div>

      {/* Botão de remover */}
      <button
        onClick={() => onRemove(appointment.id)}
        className="text-gray500 hover:text-red-400 transition-colors p-1 rounded"
        aria-label="Remover agendamento"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256">
          <path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z"/>
        </svg>
      </button>

    </div>
  )
}