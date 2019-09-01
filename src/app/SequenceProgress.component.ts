import {Component} from '@angular/core';
import {ProgramService} from './program.service';
import {KnowHow} from './KnowHow';
import {Knowledge} from './Knowledge';

@Component({
	selector: 'sequence-progress',
	templateUrl: './SequenceProgress.component.html',
	styleUrls: ['./SequenceProgress.component.less']
})
export class SequenceProgressComponent {
	protected knowHows: KnowHow[] = [];
	protected knowledges: Knowledge[] = [];

	constructor(program: ProgramService) {
		this.knowHows = program.knowHows;
		this.knowledges = program.knowledges.filter(x => x.children.length === 0);
	}

	getProgress() {
		let progress = 0;
		progress += this.knowHows.filter(x => x.sequence !== null).length;
		progress += this.knowledges.filter(x => x.sequence !== null).length;

		return 100 * progress / (this.knowHows.length + this.knowledges.length);
	}
}
