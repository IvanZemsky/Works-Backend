import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

export type UserRole = "applicant" | "manager" | "employer"
export type UserStatus = "active" | "blocked"

class UserContacts {
   @Column({ type: "text", unique: true, nullable: true })
   email: string | null

   @Column({ type: "text", unique: true, nullable: true })
   phone: string | null
}

@Entity({ name: "users" })
export class User {
   @PrimaryGeneratedColumn("uuid")
   id: string

   @Column({ type: "text", unique: true })
   login: string

   @Column({ type: "text", nullable: true })
   firstName: string | null

   @Column({ type: "text", nullable: true })
   lastName: string | null

   @Column({ type: "text", nullable: true })
   patronymic: string | null

   @Column({ type: "text" })
   passwordHash: string

   @Column({ type: "text" })
   salt: string

   @Column(() => UserContacts)
   contacts: UserContacts

   @Column({ type: "enum", enum: ["applicant", "manager", "employer"] })
   role: UserRole

   @Column({ type: "text", nullable: true })
   refreshToken: string | null
}
