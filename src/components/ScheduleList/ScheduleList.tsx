import type { Appointment } from "../../types/Appointment"
import { getPeriod } from "../../utils/getPeriod"
import { PeriodSection } from "../PeriodSection/PeriodSection"

type Props = {
  appointments: Appointment[]
  selectedDate: string
  onRemove: (id: string) => void
}

const MorningIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256">
    <path d="M120,40V16a8,8,0,0,1,16,0V40a8,8,0,0,1-16,0Zm72,88a64,64,0,1,1-64-64A64.07,64.07,0,0,1,192,128Zm-16,0a48,48,0,1,0-48,48A48.05,48.05,0,0,0,176,128ZM58.34,69.66A8,8,0,0,0,69.66,58.34l-16-16A8,8,0,0,0,42.34,53.66Zm0,116.68-16,16a8,8,0,0,0,11.32,11.32l16-16a8,8,0,0,0-11.32-11.32ZM192,72a8,8,0,0,0,5.66-2.34l16-16a8,8,0,0,0-11.32-11.32l-16,16A8,8,0,0,0,192,72Zm5.66,114.34a8,8,0,0,0-11.32,11.32l16,16a8,8,0,0,0,11.32-11.32ZM48,128a8,8,0,0,0-8-8H16a8,8,0,0,0,0,16H40A8,8,0,0,0,48,128Zm80,80a8,8,0,0,0-8,8v24a8,8,0,0,0,16,0V216A8,8,0,0,0,128,208Zm112-88H216a8,8,0,0,0,0,16h24a8,8,0,0,0,0-16Z"/>
  </svg>
)

const AfternoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256">
    <path d="M136,32V16a8,8,0,0,0-16,0V32a8,8,0,0,0,16,0Zm37.25,58.75a8,8,0,0,0,5.66-2.34l11.31-11.32a8,8,0,0,0-11.31-11.31L167.6,77.09a8,8,0,0,0,5.65,13.66ZM240,120H224a8,8,0,0,0,0,16h16a8,8,0,0,0,0-16ZM173.25,190.6a8,8,0,0,0-11.31,11.31l11.31,11.32a8,8,0,0,0,11.31-11.32ZM128,184a56,56,0,1,1,56-56A56.06,56.06,0,0,1,128,184Zm0-96a40,40,0,1,0,40,40A40,40,0,0,0,128,88ZM82.75,190.6,71.43,201.91a8,8,0,0,0,11.32,11.32l11.31-11.32A8,8,0,0,0,82.75,190.6ZM32,128a8,8,0,0,0,0-16H16a8,8,0,0,0,0,16Zm39-52.91L59.72,63.78A8,8,0,1,0,48.41,75.09L59.72,86.41A8,8,0,0,0,71,75.09ZM128,224a8,8,0,0,0-8,8v16a8,8,0,0,0,16,0V232A8,8,0,0,0,128,224Z"/>
  </svg>
)

const NightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256">
    <path d="M235.54,150.21a104.84,104.84,0,0,1-37,52.91A104,104,0,0,1,32,120,103.09,103.09,0,0,1,52.48,57.48a104.84,104.84,0,0,1,52.91-37,8,8,0,0,1,9.61,9.61,88.08,88.08,0,0,0,121.89,121.89,8,8,0,0,1,9.65,9.63Z"/>
  </svg>
)

export function ScheduleList({ appointments, selectedDate, onRemove }: Props) {

  // 1. Filtra apenas os agendamentos da data selecionada
  const filtered = selectedDate
    ? appointments.filter((a) => a.date === selectedDate)
    : appointments

  // 2. Ordena por horário
  const sorted = [...filtered].sort((a, b) => a.time.localeCompare(b.time))

  // 3. Separa por período
  const morning = sorted.filter((a) => getPeriod(a.time) === "morning")
  const afternoon = sorted.filter((a) => getPeriod(a.time) === "afternoon")
  const night = sorted.filter((a) => getPeriod(a.time) === "night")

  return (
    <div className="flex flex-col gap-4">
      <PeriodSection
        title="Manhã"
        timeRange="09h–12h"
        icon={<MorningIcon />}
        appointments={morning}
        onRemove={onRemove}
      />
      <PeriodSection
        title="Tarde"
        timeRange="13h–18h"
        icon={<AfternoonIcon />}
        appointments={afternoon}
        onRemove={onRemove}
      />
      <PeriodSection
        title="Noite"
        timeRange="19h–21h"
        icon={<NightIcon />}
        appointments={night}
        onRemove={onRemove}
      />
    </div>
  )
}