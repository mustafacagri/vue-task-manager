<template>
	<div>
		<b-modal hide-footer id="CreateTaskModal" title="Create a Task" header-bg-variant="primary" header-text-variant="white">
			<div class="row mb-3">
				<label for="task" class="col-md-12 col-form-label">Task Name:</label>
				<div class="col-md-12"><input type="text" name="name" id="name" class="form-control" v-model="name" :maxlength="this.$v.name.$params.maxLength.max" placeholder="Type your task name here..." /></div>
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
				<template v-else>Create Task</template>
			</button>
			
		</b-modal>
	</div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import { required, maxLength, integer } from "vuelidate/lib/validators"
import guid from '@/mixins/guid'
export default {
	name: 'Modals',
	data(){
		return{
			selectedLevel: null, parentId: "null", name: null, description: null,
			getLevelsReversed: null
		}
    },
    mixins: [guid],
	computed:{
		...mapGetters('all', ['getLevels', 'getDefinedValues', 'getMaxSubtaskLength']),
	},
	validations: {
		name: {required, maxLength: maxLength(25)},
		selectedLevel: {required, integer},
		description: {maxLength: maxLength(100)},
	},
	methods:{
        ...mapActions('task', ['addTask']),
		selectLevel(id){
			this.selectedLevel = id
		},
		save(){
			if(!this.$v.$invalid)
			{
                let data = {id: this.guidGenerator(), name:this.name, levelId:this.selectedLevel, description: this.description, state: 1, subTasks: []}
				this.addTask(data)
					.then(this.$bvModal.hide('CreateTaskModal'))
					.then(this.reset())
			}
		},
		reset(){
			this.parentId = null, this.id=null, this.name = null, this.levelId = null, this.selectedLevel = null, this.description = null
		}
	},
	created(){
		this.getLevelsReversed = this.getLevels.reverse()
	}
}
</script>
<style scoped>
	#CreateTaskModal label {font-weight: bold;}
	#CreateTaskModal .btn-disabled {opacity: 0.2;}
</style>