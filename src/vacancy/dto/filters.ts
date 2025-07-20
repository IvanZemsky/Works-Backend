import { VacancyExperience } from "../vacancy.model"

export type FindVacanciesFilters = {
   textSearch: string
   salaryFrom: number | null
   experience: VacancyExperience | undefined
   education: string | undefined
   isIncome: "yes" | undefined
}