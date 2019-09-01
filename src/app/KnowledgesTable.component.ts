import {Component} from '@angular/core';
import {ProgramService} from './program.service';
import {Knowledge} from './Knowledge';

@Component({
	templateUrl: './KnowledgesTable.component.html',
})
export class KnowledgesTableComponent {
	data: Knowledge[][] = [];

	constructor(readonly program: ProgramService) {
		this.program.knowledges.filter(x => x.parent === null).forEach(x => this.addData(x));
	}

	getSemesters(knowledge: Knowledge): number[] {
		return [knowledge.semester as number];
	}

	getSequence(knowledge: Knowledge): number|null {
		return knowledge.sequence;
	}

	setSequence(knowledge: Knowledge, idSequence: number): void {
		knowledge.sequence = (knowledge.sequence === idSequence) ? null : idSequence;
		this.program.save(knowledge);
		this.program.updateKnowledgeSubSequences(knowledge);
	}

	protected addData(knowledge: Knowledge): void
	{
		if (knowledge.children.length === 0) {
			this.data.push([knowledge]);
			return;
		}

		let initialLength = this.data.length;
		for (let child of knowledge.children) {
			this.addData(child);
		}

		for (let i = initialLength; i < this.data.length; ++i) {
			this.data[i].unshift(knowledge);
		}
	}
}
