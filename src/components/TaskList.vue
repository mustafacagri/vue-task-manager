<template>
	<div class="taskList" :class="{'important' : state==1}">
		<div class="mainbox bottomredborder">
			<div class="title" :class="{'withoutline' : taskList && taskList.length>0}">
				<i class="fas" :class="state==1 ? 'fa-folder-open' : 'fa-folder'"></i> {{stateName}} Tasks
				<div class="right">
					<select class="form-control" v-model="paginationSize">
						<option v-for="size in getDefinedValues.pagingSizes" :key="size.id">{{size}}</option>
					</select>
				</div>
			</div>
			<div class="content" v-if="!taskList || !taskList.length>0">There is no task tagged with <strong>{{stateName}}</strong></div>
		</div>
		
        <template v-if="taskList">
            <div class="mainbox" :class="state == 0 ? 'dark' : task.level" v-for="task in taskList.slice( (paginationCurrent-1)*paginationSize,paginationCurrent*paginationSize)" :key="task.id">
                <div class="title">
                    <span class="clickable" :class="state==0 ? 'text-dark' : task.level" @click="editTask(task)"><i class="fas fa-clipboard mr-2" :class="{'text-dark' : state==0}"></i> {{task.name}}</span>
                    <div class="right">
                        <span class="badge badge-dark mr-1 clickable" @click="editTask(task)"><i class="fas fa-edit"></i></span>
                        <label class="badge badge-dark mr-1" v-if="state==0">{{stateName}}</label>
                        <label class="badge badge-primary mr-2 createSubTask" v-if="state!=0 && getMaxSubtaskLength>task.subTasks.length" @click="createSubTask(task.id)"><i class="fas fa-plus"></i> Subtask</label>
                        <span class="badge badge-primary" :class="task.level">{{task.level}}</span>
                    </div>
                </div>
                <div class="content">
                    {{task.description}}
                    <div class="subTasks" v-if="task.subTasks && task.subTasks.length>0">
                        <div class="subTask" :class="[subTask.level, {'closedSubtask' : subTask.state == 0}]" v-for="subTask in task.subTasks" :key="subTask.id">
                            <div class="title">
                                <span class="clickable" :class="subTask.level" @click="editSubtask(task.id,task.name,subTask)">{{subTask.name}}</span>
                                <label class="float-right badge badge-primary" :class="subTask.level">{{subTask.level}}</label>
                                <label class="float-right badge badge-dark mr-1" v-if="state==0">{{stateName}}</label>
                                <span class="float-right badge badge-dark mr-1 clickable" @click="editSubtask(task.id,task.name,subTask)"><i class="fas fa-edit"></i></span>
                            </div>
                            <div class="content">{{subTask.description}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </template>

        <div class="pagination" v-if="totalPage>1">
            <button class="btn btn-sm btn-primary" v-show="paginationCurrent>1" @click="paginationCurrent=1"><i class="fas fa-angle-double-left"></i> First</button>
            <button class="btn btn-sm btn-primary" :class="{'btn-success' : page==paginationCurrent}" v-for="page in totalPage" :key="page.id" @click="paginationCurrent=page">{{page}}</button>
            <button class="btn btn-sm btn-primary" v-show="totalPage>paginationCurrent" @click="paginationCurrent=totalPage">Last <i class="fas fa-angle-double-right"></i></button>
        </div>
        
	</div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
	name: "TaskList",
	props: {
		state: {type: String, default: "0"},
		taskList: {type: Array, default:null}
	},
	data(){
		return{
			stateName: null,
            paginationCurrent: 1,
            paginationSize: null
		}
	},
	mounted(){
		this.stateName = this.getStateNameById(this.state)
	},
	created(){
        this.paginationSize = this.getDefinedValues.pagingSizes[0]
	},
	methods:{
		...mapMutations('task', ['setSelectedTaskId','setSelectedTask']),
		...mapMutations('subtask', ['setSelectedSubtask']),
		createSubTask(id){
			this.setSelectedTaskId(id)
			this.$bvModal.show('CreateSubtaskModal')
        },
        async editTask(task){
            //this.$emit("task",task)
            await this.setSelectedTask(task)
            await this.$bvModal.show('UpdateTaskModal')
        },
        async editSubtask(parentId,parentName,subtask){
            let payload = subtask
            payload.parentId = parentId
            payload.parentName = parentName
            console.log(subtask)
            await this.setSelectedSubtask(payload)
            await this.$bvModal.show('UpdateSubtaskModal')
        }
	},
	computed:{
        ...mapGetters('all', ['getStateNameById', 'getMaxSubtaskLength', 'getDefinedValues']),
        totalPage: function(){
            return Math.ceil(this.taskList.length/this.paginationSize)
        }
    },
    watch:{
        paginationSize(){
            this.paginationCurrent=1
        }
    }
}
</script>