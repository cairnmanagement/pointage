<template>
    <div>
        <nav class="navbar navbar-light mb-2" style="background-color: #e3f2fd;">
			<div class="text-center w-100 text-capitalize">
				{{pointageDay}}
			</div>
		</nav>

        <InformationsGeneralesForm 
            :data="pointage" 
            :list-projets="listProjets" 
            :list-postes="listPostes" 

            @step="stepAction"
            
            v-if="pointageCurrentStep == pointageListSteps[0] || id == 0"
        />

        <WorkDateForm 
            :data="pointage" 
            
            @step="stepAction"

            v-else-if="pointageCurrentStep == pointageListSteps[1]"
        />

        <WorkBreakChoice 				
            @step="stepAction"
            
            v-else-if="pointageCurrentStep == pointageListSteps[2]"
        />

        <WorkBreakForm 
            :data="pointage" 
            
            @step="stepAction"
            
            v-else-if="pointageCurrentStep == pointageListSteps[3]"
        />


        <OtherChoice 
            @step="stepAction"

            v-else-if="pointageCurrentStep == pointageListSteps[4]"
        />

        <OtherChoiceList 
            :list-other-choice="listOtherChoice" 
            :data="pointage"
            
            @step="stepAction"
            
            v-else-if="pointageCurrentStep == pointageListSteps[5]"
        />

        <Information 
            :data="pointage" 
            :selectedOtherChoice="selectedOtherChoice" 
            
            icon="1" 
            
            @step="stepAction"

            v-else-if="pointageCurrentStep == pointageListSteps[6]"
        />
        
        <CommentaireForm 
            :data="pointage" 
            
            @step="stepAction"
            
            v-else-if="pointageCurrentStep == pointageListSteps[7]"
        />

        <Summary 
            :data="pointage" 
            
            @step="stepAction"
            
            v-else-if="pointageCurrentStep == pointageListSteps[8]"
        />

        <GoodBye 
        
        @new-pointage="newPointage"

        v-else/>
    </div>
</template>

<script>

import InformationsGeneralesForm from "@/components/InformationsGeneralesForm.vue"
import WorkDateForm from "@/components/WorkDateForm.vue"
import WorkBreakChoice from "@/components/WorkBreakChoice.vue"
import WorkBreakForm from "@/components/WorkBreakForm.vue"
import CommentaireForm from "@/components/CommentaireForm.vue"
import OtherChoice from "@/components/OtherChoice.vue"
import OtherChoiceList from "@/components/OtherChoiceList.vue"
import Information from "@/components/Information.vue"
import Summary from "@/components/Summary.vue"
import GoodBye from "@/components/GoodBye.vue"

export default {
    props : {
        id : String,
    },

    data() {
        return {
            pointage : {
				'projet' : null, // String
				'poste' : null, // string
				'commentaire' : null, //string
				'dd' : null, // datetime
				'df' : null, // datetime
				'dpd' : null, // dateTime
				'duree' : null,
				'dfp' : null, // dateTime
				'information' : null, // object
				'valider' : null
			},
            listProjets : [
				{
					'id' : 31,
					'intitule' : '19_177 - Mur écran "anti-bruit"',
					'ddp' : "2020-01-06",
					'dfp' : "2022-06-30"
				},
				{
					'id' : 330,
					'intitule' : 'Convocation / Déplacement au siège',
					'ddp' : "2021-01-01",
					'dfp' : "2024-09-20"
				},
				{
					'id' : 328,
					'intitule' : 'Formations BRUZ',
					'ddp' : "2021-01-01",
					'dfp' : "2024-09-20"
				},
				{
					'id' : 429,
					'intitule' : '21_114 - Régénération caténaire RER B',
					'ddp' : "2022-01-03",
					'dfp' : "2022-07-31"
				},
				{
					'id' : 689,
					'intitule' : 'Pointage',
					'ddp' : "2022-01-03",
					'dfp' : "2022-07-31"
				}
			],
			listPostes : [
				{
					'id' : 1,
					'abreviation' : 'ASP',
					'nom' : 'TES M - Agent de Sécurité du Personnel'
				},
				{
					'id' : 2,
					'abreviation': 'Ann',
					'nom' : 'TES M - Annonceur/Sentinelle'
				},
				{
					'id' : 3,
					'abreviation' : 'RTO',
					'nom' : 'RTO - Référent Technique Opérationnel'
				},
				{
					'id' : 4,
					'abreviation' : 'RSO',
					'nom' : 'RSO - Représentant Sécurité Opérationnel'
				},
				{
					'id' : 5,
					'abreviation' : 'APS9',
					'nom' : 'APS9 - Agent Prestataire S9'
				},
				{
					'id' : 888,
					'abreviation' : '',
					'nom' : 'Dev Frontend'
				},
				{
					'id' : 888,
					'abreviation' : '',
					'nom' : 'dev Backend'
				}
			],
			listOtherChoice : [
				{
					'id' : 5,
					'nom' : 'Covoiturage',
					'textInformation' : 'Zombie ipsum reversus ab viral inferno, nam rick grimes malum cerebro.'
				},
				{
					'id': 7,
					'nom' : 'Prime',
					'textInformation': 'Les primes sont calculées automatiquement.'
				},
				{
					'id': 8,
					'nom': 'Autre déclaration',
					'textInformation': 'Zombie ipsum reversus ab viral inferno, nam rick grimes malum cerebro. De carne lumbering animata corpora quaeritis'
				}
			],
			selectedOtherChoice : null,
			pointageDay : null,
            pointageCurrentStep : null,
            pointageListSteps : [
				'InformationsGeneralesForm',
				'WorkDateForm',
				'WorkBreakChoice',
				'WorkBreakForm',
				'OtherChoice',
				'OtherChoiceList',
				'Information',
				'CommentaireForm',
				'Summary',
				'GoodBye'
			],
        }
    },
    
    components : {
		InformationsGeneralesForm,
		WorkDateForm,
		WorkBreakChoice,
		WorkBreakForm,
		CommentaireForm,
		OtherChoice,
		OtherChoiceList,
		Information,
		Summary,
		GoodBye
    },

    methods : {
		/**
		 * S'occupe de la navigation entre les differents components
		 * @param {String} payload 
		 */
		stepAction(payload) {
			let indexFind = this.pointageListSteps.indexOf(this.pointageCurrentStep);
			let next;

			if(payload == "submit") {
				if(indexFind != -1) {
					
					switch (indexFind) {
						case 6:
							this.pointageCurrentStep = this.pointageListSteps[4];
							break;
					
						default:
							next = indexFind + 1;
							this.pointageCurrentStep = this.pointageListSteps[next];
							break;
					}
				} else {
					this.pointageCurrentStep = this.pointageListSteps[1];
					
				}
			}

			if(payload == "cancel") {
				if(indexFind != -1) {
					switch (indexFind) {
						case 4:
							this.pointageCurrentStep = this.pointageListSteps[7];
							break;

						case 7:
							this.pointageCurrentStep = this.pointageListSteps[4];
							break;

						case 2:
							this.pointageCurrentStep = this.pointageListSteps[4];
							break;
					
						default:
							next = indexFind - 1;
							this.pointageCurrentStep = this.pointageListSteps[next];
							break;
					}
				} else {
					this.currentStep = this.pointageListSteps[0];
					
				}
			}
		},




		/**
		 * Permet de revenir sur la page calendar
		 */
		newPointage() {
			this.pointageCurrentStep = null;
		}
	},
    beforeMount() {
		if(this.id != 0) {
			console.log("edit pointge");
		}

    },
}
</script>