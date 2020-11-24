<template>
    <div v-if="task">
        <b-modal hide-footer id="UpdateTaskModal" :title="'Updating: ' + task.name" header-bg-variant="primary" header-text-variant="white" @hidden="onHidden" @shown="init">
            <div class="alert alert-danger my-3" v-if="getError">{{getError}}</div>
			<div class="row mb-3">
				<label for="task" class="col-md-12 col-form-label">Task Name:</label>
				<div class="col-md-12"><input type="text" class="form-control" disabled :value="task.name" /></div>
			</div>
			<div class="row mb-4">
				<label class="col-md-12 mb-2">State:</label>
				<div class="col-md-3" v-for="state in getStatesReversed" :key="state.id"><button class="btn btn-block" :class="[{selected : selectedState == state.id}, 'btn-'+state.name, {'btn-disabled' : selectedState != null && selectedState != state.id}]" @click="selectState(state.id)">{{state.name}}</button></div>
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
			
            <div class="row mt-4">
                <div class="col-md-8">
                    <button class="btn btn-success btn-block" :disabled="$v.$invalid" @click="save">
                        <template v-if="$v.$invalid">Control the form before update</template>
                        <template v-else>Update Task</template>
                    </button>
                </div>
                <div class="col-md-4">
                    <button class="btn btn-danger btn-block" @click="delTask()">Delete Task</button>
                </div>
            </div>
        </b-modal>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { required, maxLength, integer } from "vuelidate/lib/validators"
import _find from 'lodash/find'
export default {
    name: 'UpdateTask',
    data(){
        return{
            selectedLevel: null,
            getLevelsReversed: null,

            selectedState: null,
            getStatesReversed: null,

            description: null
        }
    },
    props: {
        task: {type: Object, default: null}
    },
	validations: {
		selectedState: {required, integer},
		selectedLevel: {required, integer},
		description: {maxLength: maxLength(100)},
	},
	computed:{
		...mapGetters('all', ['getLevels', 'getDefinedValues', 'getStates']),
		...mapGetters('messages', ['getError']),
	},
    methods: {
        ...mapActions('task', ['updateTask', 'deleteTask']),
        ...mapActions('messages', ['setError','setIsSuccess']),
        onHidden(){

        },
        init(){
            this.selectedState = this.task.state
            this.selectedLevel = this.task.levelId
            this.description = this.task.description
        },
        save(){
            if(this.selectedState==this.task.state && this.selectedLevel==this.task.levelId && this.description==this.task.description){
                this.setError({error:'You did not make any changes to the task information.'})
            }
            else{
                this.updateTask({id: this.task.id, state: this.selectedState, levelId: this.selectedLevel, description: this.description})
                    .then(() => {
                        this.$bvModal.hide('UpdateTaskModal')
                        this.reset()
                    })
            }
        },
		reset(){
			this.id=null, this.name = null, this.levelId = null, this.selectedLevel = null, this.selectedState = null, this.description = null
		},
		selectLevel(id){
			this.selectedLevel = id
		},
		selectState(id){
            let success = null
            if(id == 0) // before the task is closed, we should check its subtasks.
            {
                let found = _find(this.task.subTasks, { 'state': 1 })
                if(!found){ // if there is at least one open subtask for the task, so we can not close it
                    success = true
                }
            }
            else{success = true}
			if(success){
                this.selectedState = id
                // getIsSuccess
            }
            else{
                this.setError({error:'You can not close this task before all subtasks are closed.'})
            }
		},
        delTask(){
            let payload = {id: this.task.id}
            this.deleteTask(payload)
                .then(() => {
                    this.$bvModal.hide('UpdateTaskModal')
                    this.reset()
                })
        }
    },
	created(){
        this.getLevelsReversed = this.getLevels.reverse()
        this.getStatesReversed = this.getStates.reverse()
    },
    watch:{
        task(){
            this.init()
        }
    }
}
</script>