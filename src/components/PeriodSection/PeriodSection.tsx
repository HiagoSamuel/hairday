import type { Appointment } from "../../types/Appointment"
import { AppointmentItem } from "../AppointmentItem/AppointmentItem"

type Props = {
  title: string
  timeRange: string
  icon: React.ReactNode
  appointments: Appointment[]
  onRemove: (id: string) => void
}

export function PeriodSection({ title, timeRange, icon, appointments, onRemove }: Props) {
  const isEmpty = appointments.length === 0

  return (
    <div className="bg-gray700 rounded-xl overflow-hidden border border-gray600">

      {/* Cabeçalho */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray600">
        <div className="flex items-center gap-3">
          <span className="text-yellowLight">{icon}</span>
          <span className="text-gray100 font-bold text-sm">{title}</span>
        </div>
        <span className="text-gray400 text-xs">{timeRange}</span>
      </div>

      {/* Conteúdo */}
      <div className="px-6 py-2">
        {isEmpty ? (
          <p className="text-gray500 text-sm text-center py-6">
            Você ainda não tem agendamentos cadastrados nesse período.
          </p>
        ) : (
          appointments.map((appointment) => (
            <AppointmentItem
              key={appointment.id}
              appointment={appointment}
              onRemove={onRemove}
            />
          ))
        )}
      </div>

    </div>
  )
}