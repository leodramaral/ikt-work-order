import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable, ManyToOne } from "typeorm";
import Task from "./Task";
import Account from "./Account";

@Entity("work_orders")
export default class WorkOrder {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ type: "varchar", length: 255 })
    title!: string;

    @Column({ type: "text", nullable: true })
    description?: string;

    @ManyToOne(() => Account, { nullable: true })
    assignedTo?: Account;

    @ManyToMany(() => Task, { cascade: true })
    @JoinTable({
        name: "work_order_tasks",
        joinColumn: {
            name: "work_order_id",
            referencedColumnName: "id",
        },
        inverseJoinColumn: {
            name: "task_id",
            referencedColumnName: "id",
        },
    })
    tasks!: Task[];

    @CreateDateColumn({ name: "created_at" })
    createdAt!: Date;

    @UpdateDateColumn({ name: "updated_at" })
    updatedAt!: Date;

    static create(title: string, description?: string, dueDate?: Date): WorkOrder {
        const workOrder = new WorkOrder();
        workOrder.title = title;
        workOrder.description = description;
        workOrder.tasks = [];
        return workOrder;
    }

    addTask(task: Task): void {
        if (!this.tasks) {
            this.tasks = [];
        }
        this.tasks.push(task);
    }

    removeTask(taskId: string): void {
        this.tasks = this.tasks.filter(task => task.id !== taskId);
    }
}
