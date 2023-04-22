import { codetable } from "./codetable";

export class Task{
    id?: number;
    taskName!: string;
    taskDescription!: string;
    statusId!: number;
    dateCreated?: Date;
    dateUpdated?: Date;
}