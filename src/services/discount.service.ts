import { Injectable } from '@angular/core';
import { Priority } from 'src/models/Priority';
import { Report } from 'src/models/Report';
import { Status } from 'src/models/Status';

@Injectable({
    providedIn: 'root',
})
export class DiscountService {

    discountDue(report: Report, editedStatus: Status, editedPrice: number): number {
        if (editedStatus === Status.solved) {
            let leadTime;
            const discount: number = 0.1;

            if (report.Priority === Priority.high) {
                leadTime = 7;
            } else {
                leadTime = 14;
            }

            const currentDate = new Date();
            const reportDate = new Date(report['startDate']);

            const timeDifference = currentDate.getTime() - reportDate.getTime();
            const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

            if (daysDifference > leadTime) {
                return editedPrice - (editedPrice * discount);
            } else {
                return editedPrice;
            }
        }
        return editedPrice;
    }

}
