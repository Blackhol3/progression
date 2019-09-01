import {Component, ViewChild} from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.less']
})
export class AppComponent {
	@ViewChild('XXX', {static: true}) protected child: any;
	protected scrollPositions: {[key: string]: number} = {};
	
	protected onActivate($event: Event) {
		this.child.elementRef.nativeElement.scrollTop = this.scrollPositions[$event.constructor.name] || 0;
	}
	
	protected onDeactivate($event: Event) {
		this.scrollPositions[$event.constructor.name] = this.child.elementRef.nativeElement.scrollTop;
	}
}
