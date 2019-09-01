import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AppComponent} from './app.component';
import {MaterialModule} from './material.module';
import {KnowHowsTableComponent} from './KnowHowsTable.component';
import {KnowledgesTableComponent} from './KnowledgesTable.component';
import {SequenceTableComponent} from './SequenceTable.component';

declare global {
	interface Array<T> {
		first(): T;
		last(): T;
		unique(): Array<T>;
	}
}

Array.prototype.first = Array.prototype.first || function (this: any[]) {
	return this[0];
};

Array.prototype.last = Array.prototype.last || function (this: any[]) {
	return this[this.length - 1];
};

Array.prototype.unique = Array.prototype.unique || function (this: any[]) {
	return this.filter((value: number, index: number) => this.indexOf(value) === index);
};

const appRoutes: Routes = [
	{path: 'know-hows', component: KnowHowsTableComponent},
	{path: 'knowledges', component: KnowledgesTableComponent},
	{path: '**', redirectTo: '/know-hows', pathMatch: 'full'},
];

@NgModule({
	declarations: [
		AppComponent,
		KnowHowsTableComponent,
		KnowledgesTableComponent,
		SequenceTableComponent,
	],
	imports: [
		RouterModule.forRoot(appRoutes),
		BrowserModule,
		BrowserAnimationsModule,
		MaterialModule,
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
