import { codetable } from "./codetable";

export class Task{
    id?: number;
    taskName!: string;
    taskDescription!: string;
    //test

    //relate statusId to codetable
    statusId!: number;
    //status!: codetable;
}