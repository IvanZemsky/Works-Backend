import { User } from "src/user/user.model"
import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, Column } from "typeorm"

@Entity({ name: "employers" })
export class Employer {
   @PrimaryGeneratedColumn("uuid")
   id: string

   @OneToOne(() => User, (user) => user.id)
   @JoinColumn()
   user: User

   @Column()
   name: string

   @Column()
   description: string

   @Column()
   type: string

   @Column("decimal", { precision: 2, scale: 1 })
   rating: number

   @Column({ type: "text", nullable: true })
   website: string | null

   @Column({ type: "text", nullable: true })
   logo: string | null

   @Column({ type: "text", nullable: true })
   location: string | null
}
