import {NgModule} from '@angular/core';
import {
	MatButtonToggleModule,
	MatListModule,
	MatProgressBarModule,
	MatSidenavModule,
	MatTableModule,
	MatToolbarModule,
} from '@angular/material';

@NgModule({
	imports: [
		MatButtonToggleModule,
		MatListModule,
		MatProgressBarModule,
		MatSidenavModule,
		MatTableModule,
		MatToolbarModule,
	],
	exports: [
		MatButtonToggleModule,
		MatListModule,
		MatProgressBarModule,
		MatSidenavModule,
		MatTableModule,
		MatToolbarModule,
	],
})
export class MaterialModule { }
