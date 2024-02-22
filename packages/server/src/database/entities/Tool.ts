/* eslint-disable */
import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm'
import { ITool } from '../../Interface'
import { User } from './User'

@Entity()
export class Tool implements ITool {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @Column({ type: 'text' })
    description: string

    @Column()
    color: string

    @Column({ nullable: true })
    user_id?: string;

    @Column({ nullable: true })
    iconSrc?: string

    @Column({ nullable: true, type: 'text' })
    schema?: string

    @Column({ nullable: true, type: 'text' })
    func?: string

    @CreateDateColumn()
    createdDate: Date

    @UpdateDateColumn()
    updatedDate: Date

    @ManyToOne(() => User, (User) => User.tools)
    @JoinColumn({ name: 'user_id' })
    user: User
}
