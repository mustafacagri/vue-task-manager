<template>
	<div>
		<b-modal hide-footer id="CreateSubtaskModal" :title="getSelectedTaskId ? 'Create a Subtask for ' + getTaskById(getSelectedTaskId).name : 'Create a Subtask' " header-bg-variant="primary" header-text-variant="white" @hidden="onHidden">
			<!-- {{subtask}} -->
			<!-- <input v-model="selectedLevel"> -->
			<div class="row mb-3">
				<label for="task" class="col-md-12 col-form-label">Parent Task:</label>
				<div class="col-md-12">
					<v-select
						placeholder="Please choose parent task of this subtask"
						v-model="parentId"
						:options="getTasks"
						:reduce="task => task.id" label="name"
						:selectable="option => !(option.subTasks.length>=getDefinedValues.maxSubtaskLength || option.state==0)"
						:disabled="getSelectedTaskId != null ? true : false"
					> 
					</v-select>
					<!-- I will use map to show why option is disabled like below later -->

					<!-- <select class="form-control" :disabled="getSelectedTaskId" v-model="parentId">
						<option value="" disabled="disabled"></option>
						<option :value="task.id" v-for="task in getTasks" :key="task.id" :disabled="task.subTasks.length>=getDefinedValues.maxSubtaskLength || task.state==0">{{task.name}} {{task.state==0?' (Closed)': task.subTasks.length>=getDefinedValues.maxSubtaskLength ? ' (Max Subtasks)' : '' }}</option>
					</select> -->
				</div>
			</div>
			<div class="row mb-3">
				<label for="task" class="col-md-12 col-form-label">Subtask Name:</label>
				<div class="col-md-12"><input type="text" name="name" id="name" class="form-control" v-model="name" :maxlength="this.$v.name.$params.maxLength.max" placeholder="Type your subtask name here..." /></div>
			</div>
			<div class="row mb-4">
				<label class="col-md-12 mb-2">Level:</label>
				<div class="col-md-3" v-for="level in getLevelsReversed" :key="level.id"><button class="btn btn-block" :class="[{selected : selectedLevel == level.id}, 'btn-'+level.name, {'btn-disabled' : selectedLevel != null && selectedLevel != level.id}]" @click="selectLevel(level.id)">{{level.name}}</button></div>
			</div>
			<div class="row">
				<label for="task" class="col-md-8 col-sm-12">Description:</label>
				<small class="col-md-4 col-sm-12 text-right" v-if="description" :class="$v.description.$params.maxLength.max >= description.length ? 'text-success' : 'text-danger'">{{description.length}} / {{$v.description.$params.maxLength.max}}</small>
				<div class="col-md-12"><textarea v-model="description" class="form-control" rows="3" placeholder="Type your subtask's description here..."></textarea></div>
			</div>
			
			<button class="btn btn-success btn-block mt-4" :disabled="$v.$invalid" @click="save">
				<template v-if="$v.$invalid">Please control the form before submit</template>
				<template v-else>Create Subtask</template>
			</button>
			
		</b-modal>
	</div>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { required, maxLength, integer } from "vuelidate/lib/validators"
import guid from '@/mixins/guid'
export default {
	name: 'Modals',
	data(){
		return{
			title: "Create a Subtask",
			selectedLevel: null, parentId: "null", name: null, description: null,
			getLevelsReversed: null
		}
    },
    mixins: [guid],
	computed:{
		...mapGetters('all', ['getLevels', 'getDefinedValues']),
		...mapGetters('task', ['getTasks', 'getTaskById', 'getStates', 'getSelectedTaskId']),
	},
	validations: {
		parentId: {required},
		name: {required, maxLength: maxLength(25)},
		selectedLevel: {integer, required},
		description: {maxLength: maxLength(100)},
	},
	methods:{
        ...mapMutations('task', ['setSelectedTaskId']),
        ...mapActions('subtask', ['addSubtask']),
		onHidden() {
			this.setSelectedTaskId(null)
		},
		selectLevel(id){
			this.selectedLevel = id
		},
		save(){
			if(!this.$v.$invalid)
			{
                let data = {parentId:this.parentId, id: this.guidGenerator(), name:this.name, levelId:this.selectedLevel, description: this.description, state: 1}
				this.addSubtask(data)
					.then(this.$bvModal.hide('CreateSubtaskModal'))
					.then(this.reset())
			}
		},
		reset(){
			this.parentId = null, this.id=null, this.name = null, this.levelId = null, this.selectedLevel = null, this.description = null
		}
	},
	created(){
		this.getLevelsReversed = this.getLevels.reverse()
	},
	mounted(){
		this.parentId = this.getSelectedTaskId
	},
	watch:{
		getSelectedTaskId(newVal){
			this.parentId = newVal
        }
	}
}
</script>
<style scoped>
	#CreateSubtaskModal label {font-weight: bold;}
	#CreateSubtaskModal .btn-disabled {opacity: 0.2;}
</style>