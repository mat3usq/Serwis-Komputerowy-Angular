import { Status } from "./Status";

export class Log{
    private reportId: number;
    private status: Status;
    private price: number;
    private logDate: Date;
    constructor(reportId: number, status: Status, price: number, logDate: Date){
        this.reportId = reportId;
        this.status = status;
        this.price = price;
        this.logDate = logDate;
    }

}