import {Component, Input} from '@angular/core';

@Component({
	selector: 'main-table',
	templateUrl: './MainTable.component.html',
	styleUrls: ['./MainTable.component.less']
})
export class MainTableComponent {
	@Input() getSemesters: (object: object) => number[] = (_ => []);
	@Input() toggleSequence: (object: object, idSequence: number) => void = function() {};
	@Input() columnWidths: number[] = [];
	@Input() columnName: string|undefined;
	@Input() columnNames: string[] = [];
	@Input() numberOfNestedLevel: number = 0;
	@Input() numberOfSequences: number = 0;
	@Input() data: {name: string}[][] = [];

	highlightedRowId: number|null = null;

	isShown(idRow: number, idColumn: number): boolean {
		return idRow === 0 || this.data[idRow][idColumn] !== this.data[idRow - 1][idColumn];
	}

	getRowSpan(idRow: number, idColumn: number): number {
		let rowSpan = 1;
		while (idRow + rowSpan < this.data.length && this.data[idRow][idColumn] === this.data[idRow + rowSpan][idColumn]) {
			++rowSpan;
		}

		return rowSpan;
	}

	getColSpan(idRow: number, idColumn: number): number {
		if (this.data[idRow][idColumn + 1] !== undefined) {
			return 1;
		}

		return this.numberOfNestedLevel - idColumn;
	}

	fillArray(size: number): number[] {
		let array = Array(size);
		for (let i = 0; i < size; ++i) {
			array[i] = i;
		}

		return array;
	}
}
