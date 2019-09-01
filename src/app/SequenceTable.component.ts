import {Component, Input} from '@angular/core';

@Component({
	selector: 'sequence-table',
	templateUrl: './SequenceTable.component.html',
	styleUrls: ['./SequenceTable.component.less']
})
export class SequenceTableComponent {
	@Input() getSemesters: (object: object) => number[] = (_ => []);
	@Input() getSequence: (object: object) => number|null = (_ => null);
	@Input() setSequence: (object: object, idSequence: number) => void = function() {};
	@Input() getSubSequences: (object: object) => number[] = (_ => []);
	@Input() columnWidths: number[] = [];
	@Input() columnName: string|undefined;
	@Input() columnNames: string[] = [];

	numberOfNestedLevel = 0;
	numberOfSequences = 9;
	highlightedRowId: number|null = null;
	sortOrder: string = 'program';

	protected _data: {name: string}[][] = [];
	protected initialData: {name: string}[][] = [];

	@Input()
	set data(data: {name: string}[][]) {
		this.initialData = data;
		this.numberOfNestedLevel = Math.max(...data.map(x => x.length)) || 0;
		this.sort();
	}

	get data() {
		return this._data;
	}

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

	sort(): void {
		if (this.sortOrder === 'program') {
			this._data = [];
			this._data.push(...this.initialData);
		}
		else {
			this._data.sort((a: any[], b: any[]): number => {
				let sequenceA = a.last().sequence;
				let sequenceB = b.last().sequence;

				if (sequenceA === null) { sequenceA = this.numberOfSequences + 1; }
				else if (sequenceA === 0) { sequenceA = this.numberOfSequences + 2; }

				if (sequenceB === null) { sequenceB = this.numberOfSequences + 1; }
				else if (sequenceB === 0) { sequenceB = this.numberOfSequences + 2; }

				return sequenceA - sequenceB;
			});
		}
	}
}
