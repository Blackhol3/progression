import {Injectable} from '@angular/core';
import {Competence} from './Competence';
import {KnowHow} from './KnowHow';
import {Knowledge} from './Knowledge';

import DataCompetence from '../assets/program/tsi/Competence.json';
import DataKnowHow from '../assets/program/tsi/KnowHow.json';
import DataKnowledge from '../assets/program/tsi/Knowledge.json';
import DataKnowledgeByCompetence from '../assets/program/tsi/KnowledgeByCompetence.json';

@Injectable({
	providedIn: 'root'
})
export class ProgramService {
	readonly competences: Competence[] = [];
	readonly knowHows: KnowHow[] = [];
	readonly knowledges: Knowledge[] = [];
	
	constructor() {
		for (let knowledge of DataKnowledge) {
			this.knowledges.push(new Knowledge(
				knowledge.id,
				knowledge.idParent ? this.knowledges[knowledge.idParent - 1] : null,
				knowledge.name,
				knowledge.semester,
			));
			
			let storedValue = localStorage.getItem('Knowledge-' + knowledge.id);
			if (storedValue != null) {
				this.knowledges.last().sequence = Number.parseInt(storedValue);
			}
		}
		
		for (let competence of DataCompetence) {
			this.competences.push(new Competence(
				competence.id,
				competence.idParent ? this.competences[competence.idParent - 1] : null,
				competence.name,
				DataKnowledgeByCompetence.filter(x => x.idCompetence == competence.id).map(x => this.knowledges[x.idKnowledge - 1]),
			));
		}
		
		for (let knowHow of DataKnowHow) {
			this.knowHows.push(new KnowHow(
				knowHow.id,
				this.competences[knowHow.idCompetence - 1],
				knowHow.name,
			));
			
			let storedValue = localStorage.getItem('KnowHow-' + knowHow.id);
			if (storedValue != null) {
				this.knowHows.last().sequence = Number.parseInt(storedValue);
			}
		}
		
		this.updateSubSequences();
	}
	
	public save(object: {id: number, sequence: number|null}) {
		if (object.sequence === null) {
			localStorage.removeItem(object.constructor.name + '-' + object.id);
		}
		else {
			localStorage.setItem(object.constructor.name + '-' + object.id, object.sequence.toString());
		}
	}
	
	public updateSubSequences(): void {
		this.knowHows.forEach(x => this.updateKnowHowSubSequences(x));
		this.knowledges.forEach(x => this.updateKnowledgeSubSequences(x));
	}
	
	public updateKnowHowSubSequences(knowHow: KnowHow): void {
		// When a know-how is modified, all the knowledges associated
		// with the competence linked to this know-how need to be updated
		for (let knowledge of knowHow.competence.knowledges)
		{
			// When a knowledge need to be updated, all its descendants should be updated as well
			let descendantKnowledges = [knowledge, ...knowledge.descendants];
			
			for (let descendantKnowledge of descendantKnowledges) {
				descendantKnowledge.subSequences = [];
			}
			
			for (let descendantKnowledge of descendantKnowledges)
			{
				// The subsequences of a knowledge is the union of all the know-hows linked to all
				// the competences associated with this knowledge
				let subSequences: number[] = [];
				let competences = this.competences.filter(x => x.knowledges.includes(descendantKnowledge));
				
				for (let competence of competences)
				{
					for (let knowHow of competence.knowHows) {
						if (knowHow.sequence !== null) {
							subSequences.push(knowHow.sequence);
						}
					}
				}
				
				subSequences = subSequences.unique();
				for (let descendantDescendantKnowledge of descendantKnowledge.descendants) {
					descendantDescendantKnowledge.subSequences.push(...subSequences);
				}
			}
			
			for (let descendantKnowledge of descendantKnowledges) {
				descendantKnowledge.subSequences = descendantKnowledge.subSequences.unique();
			}
		}
	}
	
	public updateKnowledgeSubSequences(knowledge: Knowledge): void {
		// When a knowledge is modified, all the know-hows linked to
		// all the competences associated with this knowledge and all its ancestors
		let competences = [];
		for (let ancestorKnowledge of [knowledge, ...knowledge.ancestors]) {
			competences.push(...this.competences.filter(x => x.knowledges.includes(ancestorKnowledge)));
		}
		
		let knowHows = [];
		for (let competence of competences) {
			knowHows.push(...competence.knowHows);
		}
		
		knowHows = knowHows.unique();
		for (let knowHow of knowHows)
		{
			// The subsequence of a know-how is the union of the latest descendant of the knowledges
			// which are associated to the competence linked with this know-how
			let associatedKnowledges = this.knowledges.filter(x => knowHow.competence.knowledges.includes(x));
			let descendantAssociatedKnowledges = [];
			for (let associatedKnowledge of associatedKnowledges) {
				descendantAssociatedKnowledges.push(associatedKnowledge, ...associatedKnowledge.descendants);
			}
			descendantAssociatedKnowledges = descendantAssociatedKnowledges.unique();
			
			let finalAssociatedKnowledges = descendantAssociatedKnowledges.filter(x => x.children.length === 0);
			let subSequences: number[] = [];
			for (let finalAssociatedKnowledge of finalAssociatedKnowledges)
			{
				if (finalAssociatedKnowledge.sequence !== null) {
					subSequences.push(finalAssociatedKnowledge.sequence);
				}
			}
			
			knowHow.subSequences = subSequences.unique();
		}
	}
}
