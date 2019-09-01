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
	
	protected _data: {name: string}[][] = [];
	protected numberOfNestedLevel = 0;
	protected numberOfSequences = 9;
	protected highlightedRowId: number|null = null;
	
	@Input()
	protected set data(data: {name: string}[][]) {
		this._data = data;
		this.numberOfNestedLevel = Math.max(...data.map(x => x.length)) || 0;
	}
	
	protected get data() {
		return this._data;
	}
	
	protected isShown(idRow: number, idColumn: number): boolean {
		return idRow === 0 || this.data[idRow][idColumn] !== this.data[idRow - 1][idColumn];
	}
	
	protected getRowSpan(idRow: number, idColumn: number): number {
		let rowSpan = 1;
		while (idRow + rowSpan < this.data.length && this.data[idRow][idColumn] === this.data[idRow + rowSpan][idColumn]) {
			++rowSpan;
		}
		
		return rowSpan;
	}
	
	protected getColSpan(idRow: number, idColumn: number): number {
		if (this.data[idRow][idColumn + 1] !== undefined) {
			return 1;
		}
		
		return this.numberOfNestedLevel - idColumn;
	}
	
	protected fillArray(size: number): number[] {
		let array = Array(size);
		for (let i = 0; i < size; ++i) {
			array[i] = i;
		}
		
		return array;
	}
}
