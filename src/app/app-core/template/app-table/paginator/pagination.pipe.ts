import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'pagination',
    standalone: true
})
export class PaginationPipe implements PipeTransform {
    transform(data: any[], hasPagination: boolean, pageNumber: number, itemsPerPage: number): any[] {
        if (!data) {
            return [];
        }
        if (hasPagination) {
            let pageIndex = pageNumber - 1
            const startIndex = pageIndex * itemsPerPage;
            return data.slice(startIndex, startIndex + itemsPerPage);
        } else {
            return data;
        }

    } 
}