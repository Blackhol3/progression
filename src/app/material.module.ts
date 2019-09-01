import {NgModule} from '@angular/core';
import {
	MatListModule,
	MatSidenavModule,
	MatTableModule,
	MatToolbarModule,
} from '@angular/material';

@NgModule({
	imports: [
		MatListModule,
		MatSidenavModule,
		MatTableModule,
		MatToolbarModule,
	],
	exports: [
		MatListModule,
		MatSidenavModule,
		MatTableModule,
		MatToolbarModule,
	],
})
export class MaterialModule { }
