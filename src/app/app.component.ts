import {Component, ViewChild} from '@angular/core';
import {Router, Event, NavigationStart, NavigationEnd} from '@angular/router';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.less']
})
export class AppComponent {
	@ViewChild('sidenavContent', {static: true}) protected child: any;
	protected currentUrl: string|null = null;
	protected scrollPositions: {[key: string]: number} = {};

	public constructor(router: Router) {
		router.events.subscribe(x => this.onRouterEvent(x));
	}

	protected onRouterEvent(event: Event): void {
		if (event instanceof NavigationStart && this.currentUrl !== null) {
			this.scrollPositions[this.currentUrl] = this.child.elementRef.nativeElement.scrollTop;
		}
		else if (event instanceof NavigationEnd) {
			this.child.elementRef.nativeElement.scrollTop = this.scrollPositions[event.url] || 0;
			this.currentUrl = event.url;
		}
	}
}
