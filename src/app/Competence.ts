import { KnowHow } from './KnowHow';
import { Knowledge } from './Knowledge';

export class Competence {
	readonly children: Competence[] = [];
	private _knowHows: KnowHow[] = [];
	
	constructor(
		readonly id: number,
		readonly parent: Competence|null,
		readonly name: string|null,
		readonly knowledges: Knowledge[],
	) {
		if (this.parent !== null) {
			this.parent.children.push(this);
		}
	}
	
	public addKnowHow(knowHow: KnowHow) {
		this._knowHows.push(knowHow);
	}
	
	public get knowHows(): KnowHow[] {
		return this._knowHows;
	}
	
	public getSemesters(): number[] {
		let semesters: number[] = [];
		return semesters.concat(...this.knowledges.map(x => x.getSemesters())).unique().sort();
	}
}

