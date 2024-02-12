import { Pipe, PipeTransform } from '@angular/core';
import { Event } from '../../reservations/interfaces/event';
import { Session } from '../../reservations/interfaces/session';

@Pipe({
    name: 'orderByDate'
})
export class OrderByDatePipe implements PipeTransform {
    transform(array: any[]): any[] {
        // Check if array is defined, and if it is not null
        if (!Array.isArray(array) || array.length === 0) {
            return [];
        }

        // Check if the first element of the array is an object with a property called 'date'
        if (array[0].hasOwnProperty('date')) {
            array.sort((a, b) => this.compareSessionsByDate(a, b));
            return array;
        }

        // Check if the first element of the array is an object with a property called 'endDate'
        if (array[0].hasOwnProperty('endDate')) {
            array.sort((a, b) => this.compareEventsByEndDate(a, b));
            return array;
        }

        return array;
    }

    private compareSessionsByDate(a: Session, b: Session): number {
        // We already have a string with the number of milliseconds since the Unix Epoch
        // We can convert it to a number by using the unary plus operator
        // If a.endDate is null, it will be converted to 0
        // If b.endDate is null, it will be converted to 0
        const dateA = +(a.date ?? '');
        const dateB = +(b.date ?? '');

        // The comparison function returns a negative value if dateA is less than dateB,
        // zero if they are equal, and a positive value if dateA is greater than dateB
        return dateA - dateB;
    }

    private compareEventsByEndDate(a: Event, b: Event): number {
        // We already have a string with the number of milliseconds since the Unix Epoch
        // We can convert it to a number by using the unary plus operator
        // If a.endDate is null, it will be converted to 0
        // If b.endDate is null, it will be converted to 0
        const dateA = +(a.endDate ?? '');
        const dateB = +(b.endDate ?? '');

        // The comparison function returns a negative value if dateA is less than dateB,
        // zero if they are equal, and a positive value if dateA is greater than dateB
        return dateA - dateB;
    }

}