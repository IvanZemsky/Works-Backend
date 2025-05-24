import { User } from "src/user/user.model"
import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm"

@Entity({ name: "employers" })
export class Employer {
   @PrimaryGeneratedColumn("uuid")
   id: string

   @OneToOne(() => User, (user) => user.id)
   @JoinColumn()
   user: User
}
