import { useState, useEffect } from "react"

import { Sidebar } from "./components/Sidebar/Sidebar"
import { Header } from "./components/Header/Header"
import { ScheduleList } from "./components/ScheduleList/ScheduleList"
import { ConfirmModal } from "./components/ConfirmModal/ConfirmModal"

import type { Appointment } from "./types/Appointment"

const STORAGE_KEY = "hairday:appointments"

// Descreve o alvo da remoção — pode ser um agendamento específico ou "todos"
type ConfirmTarget = {
  id: string | "all"
  label: string  // texto exibido no modal: nome do cliente ou "todos os clientes"
}

export default function App() {
  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  })

   const [selectedDate, setSelectedDate] = useState("")

  // null = modal fechado | objeto = modal aberto com os dados do alvo
  const [confirmTarget, setConfirmTarget] = useState<ConfirmTarget | null>(null)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appointments))
  }, [appointments])

  const addAppointment = (appointment: Appointment) => {
    setAppointments((prev) => [...prev, appointment])
  }

  const removeAppointment = (id: string) => {
    setAppointments((prev) => prev.filter((a) => a.id !== id))
  }

  // Chamada pelo Header quando o usuário escolhe uma opção no dropdown
  // Monta o ConfirmTarget e abre o modal
  function handleRequestRemove(id: string | "all") {
    if (id === "all") {
      setConfirmTarget({
        id: "all",
        label: "todos os clientes",
      })
    } else {
      // Busca o nome do cliente pelo id para exibir no modal
      const appointment = appointments.find((a) => a.id === id)
      if (!appointment) return

      setConfirmTarget({
        id: appointment.id,
        label: appointment.name,
      })
    }
  }

  // Chamada quando o usuário confirma no modal
  function handleConfirmRemove() {
    if (!confirmTarget) return

    if (confirmTarget.id === "all") {
      setAppointments([])
    } else {
      removeAppointment(confirmTarget.id)
    }

    // Fecha o modal limpando o alvo
    setConfirmTarget(null)
  }

  // Chamada quando o usuário cancela ou clica fora do modal
  function handleCancelRemove() {
    setConfirmTarget(null)
  }

  return (
    <div className="flex min-h-screen bg-gray800">

      <Sidebar appointments={appointments} onAdd={addAppointment} />

      <main className="flex-1 p-8 bg-gray700 min-h-screen">
        <Header
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
          appointments={appointments}
          onRequestRemove={handleRequestRemove}
        />
        <ScheduleList
          appointments={appointments}
          selectedDate={selectedDate}
          onRemove={(id) => handleRequestRemove(id)}
        />
      </main>

      {/* O modal só é renderizado quando confirmTarget não é null */}
      {confirmTarget && (
        <ConfirmModal
          clientLabel={confirmTarget.label}
          onConfirm={handleConfirmRemove}
          onCancel={handleCancelRemove}
        />
      )}

    </div>
  )
}