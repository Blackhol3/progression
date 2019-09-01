import { Competence } from './Competence';

export class KnowHow {
	public sequence: number|null = null;
	public subSequences: number[] = [];
	
	constructor(
		readonly id: number,
		readonly competence: Competence,
		readonly name: string,
	) {
		competence.addKnowHow(this);
	}
}
