import { Status } from './Status';
import { Priority } from './Priority';

export class Report {
    private static idCounter: number = 0;

    private reportId: number;
    private description: string;
    private priority: Priority;
    private status: Status;
    private price?: number;
    private startDate: Date;
    private endDate?: Date;
    private userId: number;

    constructor(description: string, priority: Priority, status: Status, startDate: Date, userId: number) {
        this.reportId = Report.idCounter++;
        this.description = description;
        this.priority = priority;
        this.status = status;
        this.startDate = startDate;
        this.userId = userId;
    }

    get ReportId(): number {
        return this.reportId;
    }
    get UserId(): number {
        return this.reportId;
    }


    get Description(): string {
        return this.description;
    }

    set Description(value: string) {
        this.description = value;
    }

    get Priority(): Priority {
        return this.priority;
    }

    set Priority(value: Priority) {
        this.priority = value;
    }

    get Status(): Status {
        return this.status;
    }

    set Status(value: Status) {
        this.status = value;
    }

    get Price(): number | undefined {
        return this.price;
    }

    set Price(value: number | undefined) {
        this.price = value;
    }

    get StartDate(): Date {
        return this.startDate;
    }

    set StartDate(value: Date) {
        this.startDate = value;
    }

    get EndDate(): Date | undefined {
        return this.endDate;
    }

    set EndDate(value: Date | undefined) {
        this.endDate = value;
    }
}
