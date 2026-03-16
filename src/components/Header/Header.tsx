import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import type { Appointment } from "../../types/Appointment"

type Props = {
  selectedDate: string
  onDateChange: (date: string) => void
  appointments: Appointment[]
  onRequestRemove: (id: string | "all") => void
}

export function Header({ selectedDate, onDateChange, appointments, onRequestRemove }: Props) {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // ✅ Adicionado para logout
  const { logout, user } = useAuth()
  const navigate = useNavigate()

  const visibleAppointments = selectedDate
    ? appointments.filter((a) => a.date === selectedDate)
    : appointments

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false)
      }
    }
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [dropdownOpen])

  function handleSelect(id: string | "all") {
    setDropdownOpen(false)
    onRequestRemove(id)
  }

  // ✅ Adicionado para logout
  function handleLogout() {
    logout()
    navigate("/login")
  }

  return (
    <div className="flex items-start justify-between mb-8">

      {/* Título */}
      <div>
        <h2 className="text-gray100 text-2xl font-bold">Sua agenda</h2>
        <p className="text-gray400 text-sm mt-1">
          Consulte os seus cortes de cabelo agendados por dia
        </p>
      </div>

      {/* Controles à direita */}
      <div className="flex items-center gap-3">

        {/* ✅ Botão de Logout — adicionado */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray600 text-gray400 text-sm hover:border-red-400 hover:text-red-400 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256">
            <path d="M120,216a8,8,0,0,1-8,8H48a16,16,0,0,1-16-16V48A16,16,0,0,1,48,32h64a8,8,0,0,1,0,16H48V208h64A8,8,0,0,1,120,216Zm109.66-93.66-40-40a8,8,0,0,0-11.32,11.32L204.69,120H112a8,8,0,0,0,0,16h92.69l-26.35,26.34a8,8,0,0,0,11.32,11.32l40-40A8,8,0,0,0,229.66,122.34Z"/>
          </svg>
          {user?.name ?? "Sair"}
        </button>

        {/* Botão Desmarcar + Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            disabled={appointments.length === 0}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray600 text-gray300 text-sm font-bold hover:border-red-400 hover:text-red-400 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256">
              <path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z"/>
            </svg>
            Desmarcar
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-64 bg-gray800 border border-gray600 rounded-xl shadow-xl z-40 overflow-hidden">
              <button
                onClick={() => handleSelect("all")}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 font-bold hover:bg-gray700 transition-colors border-b border-gray600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192Z"/>
                </svg>
                Todos os clientes
              </button>

              {visibleAppointments.length === 0 ? (
                <p className="px-4 py-3 text-gray500 text-sm text-center">
                  Nenhum agendamento nesta data.
                </p>
              ) : (
                visibleAppointments.map((appointment) => (
                  <button
                    key={appointment.id}
                    onClick={() => handleSelect(appointment.id)}
                    className="w-full flex items-center justify-between px-4 py-3 text-sm text-gray300 hover:bg-gray700 hover:text-gray100 transition-colors border-b border-gray600 last:border-0"
                  >
                    <span>{appointment.name}</span>
                    <span className="text-gray500 text-xs">{appointment.time}</span>
                  </button>
                ))
              )}
            </div>
          )}
        </div>

        {/* Seletor de data */}
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray400 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256">
              <path d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM72,48v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24V80H48V48ZM208,208H48V96H208V208Z"/>
            </svg>
          </div>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => onDateChange(e.target.value)}
            className="bg-gray700 border border-gray600 text-gray300 text-sm rounded-lg pl-10 pr-4 py-2 appearance-none cursor-pointer focus:outline-none focus:border-yellowLight transition-colors"
          />
        </div>

      </div>
    </div>
  )
}