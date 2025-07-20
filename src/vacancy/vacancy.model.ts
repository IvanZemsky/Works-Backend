import { Employer } from "src/employer/emloyer.model"
import { User } from "src/user/user.model"
import {
   Column,
   Entity,
   JoinColumn,
   ManyToOne,
   OneToOne,
   PrimaryGeneratedColumn,
} from "typeorm"

class VacancyAddress {
   @Column({ type: "text", nullable: true })
   street: string | null

   @Column({ type: "text", nullable: true })
   city: string | null

   @Column({ type: "text", nullable: true })
   country: string | null

   @Column({ type: "text", nullable: true })
   building: string | null
}

class VacancySalary {
   @Column({ type: "int", nullable: true })
   min: number | null

   @Column({ type: "int", nullable: true })
   max: number | null

   @Column()
   period: VacancySalaryPeriod
}

class VacancyContacts {
   @Column({ type: "text", nullable: true })
   email: string | null

   @Column({ type: "text", nullable: true })
   phone: string | null

   @Column({ type: "text", nullable: true })
   name: string | null
}

@Entity({ name: "vacancies" })
export class Vacancy {
   @PrimaryGeneratedColumn("uuid")
   id: string

   @ManyToOne(() => Employer, (employer) => employer.id)
   @JoinColumn()
   employer: Employer

   @ManyToOne(() => User, (user) => user.id)
   @JoinColumn()
   user: User

   @Column()
   status: VacancyStatus

   @Column()
   title: string

   @Column()
   description: string

   @Column()
   location: VacancyLocation

   @Column()
   date: Date

   @Column({ type: "text", nullable: true })
   schedule: string | null

   @Column()
   hoursPerDay: number

   @Column(() => VacancyAddress)
   address: VacancyAddress

   @Column(() => VacancySalary)
   salary: VacancySalary

   @Column({ type: "text", nullable: true })
   skills: string | null

   @Column({ type: "enum", enum: ["none", "1-3", "3-6", "6+"], default: "none" })
   experience: VacancyExperience

   @Column(() => VacancyContacts)
   contacts: VacancyContacts

   @Column({ type: "enum", enum: ["none", "secondary", "high"], default: "none" })
   education: VacancyEducation
}

export enum VacancyLocation {
   REMOTE = "remote",
   ON_SITE = "on-site",
}

export enum VacancyStatus {
   OPEN = "open",
   CLOSED = "closed",
   ARCHIVED = "archived",
}

export enum VacancySalaryPeriod {
   YEAR = "year",
   MONTH = "month",
}

export type VacancyExperience = "none" | "1-3" | "3-6" | "6+"

export type VacancyApplicationStatus =
   | "applied"
   | "invited"
   | "rejected"
   | "archived"
   | "company_blocked"
   | "employer_blocked"

export type VacancyEducation = "none" | "secondary" | "high"
