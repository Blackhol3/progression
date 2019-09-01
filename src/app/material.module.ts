import {NgModule} from '@angular/core';
import {
	MatListModule,
	MatProgressBarModule,
	MatSidenavModule,
	MatTabsModule,
	MatTableModule,
	MatToolbarModule,
} from '@angular/material';

@NgModule({
	imports: [
		MatListModule,
		MatProgressBarModule,
		MatSidenavModule,
		MatTabsModule,
		MatTableModule,
		MatToolbarModule,
	],
	exports: [
		MatListModule,
		MatProgressBarModule,
		MatSidenavModule,
		MatTabsModule,
		MatTableModule,
		MatToolbarModule,
	],
})
export class MaterialModule { }
