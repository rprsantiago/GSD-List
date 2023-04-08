import { codetable } from "./codetable";

export class task{
    id?: number;
    taskName!: string;
    taskDescription!: string;
    //test

    //relate statusId to codetable
    statusId!: number;
    //status!: codetable;
}