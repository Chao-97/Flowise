/* eslint-disable */
import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { IUser } from '../../Interface'
import { ChatFlow } from './ChatFlow'
import { Tool } from './Tool'

@Entity()
export class User implements IUser {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ comment: '用户名' })
    name: string

    @Column({ comment: '密码' })
    password: string

    @Column({ comment: '盐值' })
    psalt: string

    @Column({ comment: '用户注册手机号' })
    phone: string

    @CreateDateColumn()
    createdDate: Date

    @UpdateDateColumn()
    updatedDate: Date

    // 关联Chatflow, 用户保存自己的chatflow
    @OneToMany(() => ChatFlow, (ChatFlow) => ChatFlow.user)
    chatflows: ChatFlow[]

    // tools
    @OneToMany(() => Tool, (Tool) => Tool.user)
    tools: Tool[]
}
