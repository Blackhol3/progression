import { Competence } from './Competence';

export class KnowHow {
	public sequences: number[] = [];
	public subSequences: number[] = [];

	constructor(
		readonly id: number,
		readonly competence: Competence,
		readonly name: string,
	) {
		competence.addKnowHow(this);
	}
}
