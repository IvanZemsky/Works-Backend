import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

export type UserRole = "applicant" | "manager" | "employer"
export type UserStatus = "active" | "blocked"

@Entity({ name: "users" })
export class User {
   @PrimaryGeneratedColumn("uuid")
   id: string

   @Column({ type: "text", unique: true })
   login: string

   @Column({ type: "text" })
   firstName: string

   @Column({ type: "text" })
   lastName: string

   @Column({ type: "text" })
   patronymic: string

   @Column({ type: "text" })
   passwordHash: string

   @Column({ type: "text" })
   salt: string

   @Column({ type: "text", unique: true })
   email: string

   @Column({ type: "text" })
   phone: string

   @Column({ type: "enum", enum: ["applicant", "manager", "employer"] })
   role: UserRole
}
