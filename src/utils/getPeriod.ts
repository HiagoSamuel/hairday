export type Period = "morning" | "afternoon" | "night"

export function getPeriod(time: string): Period {
  const hour = Number(time.split(":")[0])

  if (hour >= 9 && hour <= 12) {
    return "morning"
  }

  if (hour >= 13 && hour <= 18) {
    return "afternoon"
  }

  return "night"
}