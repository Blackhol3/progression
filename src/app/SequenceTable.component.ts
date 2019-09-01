import {Component, Input} from '@angular/core';

type Sequencable = {name: string, sequences: number[]};

@Component({
	selector: 'sequence-table',
	templateUrl: './SequenceTable.component.html',
	styleUrls: ['./SequenceTable.component.less']
})
export class SequenceTableComponent {
	@Input() getSemesters: (object: object) => number[] = (_ => []);
	@Input() toggleSequence: (object: object, idSequence: number) => void = function() {};
	@Input() columnWidths: number[] = [];
	@Input() columnName: string|undefined;
	@Input() columnNames: string[] = [];

	numberOfNestedLevel = 0;
	numberOfSequences = 9;
	dataBySequences: Sequencable[][][] = [];

	protected _data: Sequencable[][] = [];

	@Input()
	set data(data: Sequencable[][]) {
		this._data = data;
		this.numberOfNestedLevel = Math.max(...data.map(x => x.length)) || 0;
		this.updateDataBySequences();
	}

	get data() {
		return this._data;
	}

	updateDataBySequences(): void {
		for (let idSequence of this.fillArray(this.numberOfSequences + 1)) {
			this.dataBySequences[idSequence] = this.data.filter(row => row.last().sequences.includes(idSequence));
		}

		this.dataBySequences[-1] = this.data.filter(row => row.last().sequences.length === 0);
	}

	toggleSequenceAndUpdateDataBySequences(object: object, idSequence: number): void {
		this.toggleSequence(object, idSequence);
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
