import {Component} from '@angular/core';
import {ProgramService} from './program.service';
import {Competence} from './Competence';
import {KnowHow} from './KnowHow';

@Component({
	templateUrl: './KnowHowsTable.component.html',
})
export class KnowHowsTableComponent {
	data: (Competence | KnowHow)[][] = [];

	constructor(readonly program: ProgramService) {
		program.competences.filter(x => x.parent === null).forEach(x => this.addData(x));
	}

	getSemesters(knowHow: KnowHow): number[] {
		return knowHow.competence.getSemesters();
	}

	toggleSequence(knowHow: KnowHow, idSequence: number): void {
		let index = knowHow.sequences.indexOf(idSequence);
		index == -1 ? knowHow.sequences.push(idSequence) : knowHow.sequences.splice(index, 1);

		this.program.save(knowHow);
		this.program.updateKnowHowSubSequences(knowHow);
	}

	protected addData(competence: Competence): void
	{
		if (competence.children.length === 0) {
			for (let knowHow of competence.knowHows) {
				this.data.push([competence, knowHow]);
			}

			return;
		}

		let initialLength = this.data.length;
		for (let child of competence.children) {
			this.addData(child);
		}

		for (let i = initialLength; i < this.data.length; ++i) {
			this.data[i].unshift(competence);
		}
	}
}
