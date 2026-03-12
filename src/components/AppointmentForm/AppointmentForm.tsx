import { useState } from "react"
import type { Appointment } from "../../types/Appointment"

type Props = {
  onAdd: (appointment: Appointment) => void
  appointments: Appointment[]
}

const TIME_SLOTS = {
  morning: ["09:00", "10:00", "11:00", "12:00"],
  afternoon: ["13:00", "14:00", "15:00", "16:00", "17:00", "18:00"],
  night: ["19:00", "20:00", "21:00"],
}

// Formato das mensagens de erro por campo
type FormErrors = {
  date?: string
  time?: string
  name?: string
}

export function AppointmentForm({ onAdd, appointments }: Props) {
  const [name, setName] = useState("")
  const [date, setDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [errors, setErrors] = useState<FormErrors>({})

  const bookedTimes = appointments
    .filter((a) => a.date === date)
    .map((a) => a.time)

  // Remove o erro de um campo específico quando o usuário interage com ele
  const clearError = (field: keyof FormErrors) => {
    setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const handleAdd = () => {
    // Monta o objeto de erros verificando cada campo
    const newErrors: FormErrors = {}

    if (!date) {
      newErrors.date = "Selecione uma data para o agendamento."
    }

    if (!selectedTime) {
      newErrors.time = "Selecione um horário disponível."
    }

    if (!name.trim()) {
      newErrors.name = "Informe o nome do cliente."
    }

    // Se houver qualquer erro, atualiza o estado e para a execução
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // Tudo válido — cria e registra o agendamento
    const newAppointment: Appointment = {
      id: crypto.randomUUID(),
      name: name.trim(),
      date,
      time: selectedTime,
    }

    onAdd(newAppointment)

    // Limpa tudo após agendar com sucesso
    setName("")
    setDate("")
    setSelectedTime("")
    setErrors({})
  }

  return (
    <div className="flex flex-col gap-6">

      {/* Campo de Data */}
      <div className="flex flex-col gap-2">
        <label className="text-gray100 text-sm font-bold">Data</label>
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray400 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256">
              <path d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM72,48v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24V80H48V48ZM208,208H48V96H208V208Z"/>
            </svg>
          </div>
          <input
            type="date"
            value={date}
            onChange={(e) => {
              setDate(e.target.value)
              setSelectedTime("")
              clearError("date")
            }}
            className={`
              w-full bg-gray700 border text-gray100 text-sm rounded-lg pl-10 pr-4 py-3
              appearance-none cursor-pointer focus:outline-none transition-colors
              ${errors.date ? "border-red-400" : "border-gray600 focus:border-yellowLight"}
            `}
          />
        </div>
        {/* Mensagem de erro do campo data */}
        {errors.date && (
          <span className="text-red-400 text-xs">{errors.date}</span>
        )}
      </div>

      {/* Time Slots */}
      <div className="flex flex-col gap-3">
        <label className={`text-sm font-bold ${errors.time ? "text-red-400" : "text-gray100"}`}>
          Horários
        </label>

        {/* Manhã */}
        <div className="flex flex-col gap-2">
          <span className="text-gray400 text-xs">Manhã</span>
          <div className="grid grid-cols-4 gap-2">
            {TIME_SLOTS.morning.map((slot) => {
              const isBooked = bookedTimes.includes(slot)
              const isSelected = selectedTime === slot
              return (
                <button
                  key={slot}
                  type="button"
                  disabled={isBooked}
                  onClick={() => {
                    setSelectedTime(slot)
                    clearError("time")
                  }}
                  className={`
                    py-2 rounded-lg text-sm font-bold transition-colors
                    ${isBooked
                      ? "bg-gray700 text-gray500 cursor-not-allowed opacity-40"
                      : isSelected
                        ? "bg-yellowLight text-gray900 border-2 border-yellowLight"
                        : errors.time
                          ? "bg-gray700 text-gray300 border border-red-400 hover:border-yellowLight hover:text-yellowLight"
                          : "bg-gray700 text-gray300 border border-gray600 hover:border-yellowLight hover:text-yellowLight"
                    }
                  `}
                >
                  {slot}
                </button>
              )
            })}
          </div>
        </div>

        {/* Tarde */}
        <div className="flex flex-col gap-2">
          <span className="text-gray400 text-xs">Tarde</span>
          <div className="grid grid-cols-4 gap-2">
            {TIME_SLOTS.afternoon.map((slot) => {
              const isBooked = bookedTimes.includes(slot)
              const isSelected = selectedTime === slot
              return (
                <button
                  key={slot}
                  type="button"
                  disabled={isBooked}
                  onClick={() => {
                    setSelectedTime(slot)
                    clearError("time")
                  }}
                  className={`
                    py-2 rounded-lg text-sm font-bold transition-colors
                    ${isBooked
                      ? "bg-gray700 text-gray500 cursor-not-allowed opacity-40"
                      : isSelected
                        ? "bg-yellowLight text-gray900 border-2 border-yellowLight"
                        : errors.time
                          ? "bg-gray700 text-gray300 border border-red-400 hover:border-yellowLight hover:text-yellowLight"
                          : "bg-gray700 text-gray300 border border-gray600 hover:border-yellowLight hover:text-yellowLight"
                    }
                  `}
                >
                  {slot}
                </button>
              )
            })}
          </div>
        </div>

        {/* Noite */}
        <div className="flex flex-col gap-2">
          <span className="text-gray400 text-xs">Noite</span>
          <div className="grid grid-cols-4 gap-2">
            {TIME_SLOTS.night.map((slot) => {
              const isBooked = bookedTimes.includes(slot)
              const isSelected = selectedTime === slot
              return (
                <button
                  key={slot}
                  type="button"
                  disabled={isBooked}
                  onClick={() => {
                    setSelectedTime(slot)
                    clearError("time")
                  }}
                  className={`
                    py-2 rounded-lg text-sm font-bold transition-colors
                    ${isBooked
                      ? "bg-gray700 text-gray500 cursor-not-allowed opacity-40"
                      : isSelected
                        ? "bg-yellowLight text-gray900 border-2 border-yellowLight"
                        : errors.time
                          ? "bg-gray700 text-gray300 border border-red-400 hover:border-yellowLight hover:text-yellowLight"
                          : "bg-gray700 text-gray300 border border-gray600 hover:border-yellowLight hover:text-yellowLight"
                    }
                  `}
                >
                  {slot}
                </button>
              )
            })}
          </div>
        </div>

        {/* Mensagem de erro dos time slots */}
        {errors.time && (
          <span className="text-red-400 text-xs">{errors.time}</span>
        )}
      </div>

      {/* Campo de Nome */}
      <div className="flex flex-col gap-2">
        <label className="text-gray100 text-sm font-bold">Cliente</label>
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray400 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256">
              <path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z"/>
            </svg>
          </div>
          <input
            type="text"
            placeholder="Nome do cliente"
            value={name}
            onChange={(e) => {
              setName(e.target.value)
              clearError("name")
            }}
            className={`
              w-full bg-gray700 border text-gray100 text-sm rounded-lg
              pl-10 pr-4 py-3 placeholder:text-gray500 focus:outline-none transition-colors
              ${errors.name ? "border-red-400" : "border-gray600 focus:border-yellowLight"}
            `}
          />
        </div>
        {/* Mensagem de erro do campo nome */}
        {errors.name && (
          <span className="text-red-400 text-xs">{errors.name}</span>
        )}
      </div>

      {/* Botão Agendar */}
      <button
        type="button"
        onClick={handleAdd}
        className="w-full bg-yellowLight hover:bg-yellow text-gray900 font-bold text-sm py-4 rounded-lg transition-colors uppercase tracking-widest mt-2"
      >
        Agendar
      </button>

    </div>
  )
}