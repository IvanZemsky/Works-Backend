import { Employer } from "src/employer/emloyer.model"
import { User } from "src/user/user.model"
import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm"

@Entity({ name: "managers" })
export class Manager {
   @PrimaryGeneratedColumn("uuid")
   id: string

   @OneToOne(() => User, (user) => user.id)
   @JoinColumn()
   user: User

   @OneToOne(() => Employer, (employer) => employer.id)
   @JoinColumn()
   employer: Employer
}
