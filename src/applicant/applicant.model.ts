import { User } from "src/user/user.model"
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity({ name: "applicants" })
export class Applicant {
   @PrimaryGeneratedColumn("uuid")
   id: string

   @OneToOne(() => User, (user) => user.id)
   @JoinColumn()
   user: User

   @Column({ type: "json", default: [] })
   resumeIds: string[]

   @Column({ type: "enum", enum: ["active", "blocked"] })
   status: string
}
