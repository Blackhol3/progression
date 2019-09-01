import {NgModule} from '@angular/core';
import {
	MatListModule,
	MatProgressBarModule,
	MatSidenavModule,
	MatTableModule,
	MatToolbarModule,
} from '@angular/material';

@NgModule({
	imports: [
		MatListModule,
		MatProgressBarModule,
		MatSidenavModule,
		MatTableModule,
		MatToolbarModule,
	],
	exports: [
		MatListModule,
		MatProgressBarModule,
		MatSidenavModule,
		MatTableModule,
		MatToolbarModule,
	],
})
export class MaterialModule { }
