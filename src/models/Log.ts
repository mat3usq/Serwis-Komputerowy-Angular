import { Status } from "./Status";

export class Log{
    private id: number;
    private reportId: number;
    private status: Status;
    private price: number;
    private logDate: Date;
    constructor(id:number, reportId: number, status: Status, price: number, logDate: Date){
        this.id = id;
        this.reportId = reportId;
        this.status = status;
        this.price = price;
        this.logDate = logDate;
    }
}