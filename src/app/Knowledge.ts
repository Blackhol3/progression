export class Knowledge {
	readonly children: Knowledge[] = [];
	readonly ancestors: Knowledge[] = [];
	public sequence: number|null = null;
	public subSequences: number[] = [];
	
	public constructor(
		readonly id: number,
		readonly parent: Knowledge|null,
		readonly name: string,
		readonly semester: number|null,
	) {
		if (this.parent !== null) {
			this.parent.children.push(this);
			this.ancestors = [this.parent, ...this.parent.ancestors];
		}
	}
	
	public getSemesters(): number[] {
		if (this.semester !== null) {
			return [this.semester];
		}
		
		let semesters: number[] = [];
		return semesters.concat(...this.children.map(x => x.getSemesters())).unique().sort();
	}
	
	public get descendants(): Knowledge[] {
		let descendants: Knowledge[] = [];
		for (let child of this.children) {
			descendants.push(child, ...child.descendants);
		}
		
		return descendants;
	}
}
