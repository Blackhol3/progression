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
	dataBySequences: {name: string}[][][] = [];

	protected _data: {name: string}[][] = [];

	@Input()
	set data(data: {name: string}[][]) {
		this._data = data;
		this.numberOfNestedLevel = Math.max(...data.map(x => x.length)) || 0;
		this.updateDataBySequences();
	}

	get data() {
		return this._data;
	}

	updateDataBySequences(): void {
		for (let idSequence of this.fillSequenceArray()) {
			this.dataBySequences[idSequence === null ? -1 : idSequence] = this.data.filter(row => this.getSequence(row.last()) === idSequence);
		}
	}

	setSequenceAndUpdateDataBySequences(object: object, idSequence: number): void {
		this.setSequence(object, idSequence);
		this.updateDataBySequences();
	}

	fillArray(size: number, firstValue: number = 0): number[] {
		let array = Array(size);
		for (let i = 0; i < size; ++i) {
			array[i] = i + firstValue;
		}

		return array;
	}

	fillSequenceArray(): (number|null)[] {
		return [null, ...this.fillArray(this.numberOfSequences, 1), 0];
	}
}
