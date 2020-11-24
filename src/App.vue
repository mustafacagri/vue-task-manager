<template>
  <div id="app">
    <Header />
    <div class="alert alert-danger mx-3 mt-3" v-if="getError">{{getError}}</div>
    <div class="alert alert-success mx-3 my-3" v-if="getIsSuccess">{{getIsSuccess}}</div>
    <div id="TaskLists" v-if="getTasks">
        <!-- <TaskList state="1" ></TaskList> -->
        <TaskList state="1" :taskList="getTaskListByState(1)"></TaskList>
        <TaskList state="0" :taskList="getTaskListByState(0)"></TaskList>
    </div>
    <div class="mx-3" v-else>
        <div class="mainbox mt-3">
            <div class="title"><i class="fas fa-flag"></i> It's time to start now!</div>
            <div class="content">
                There is no tasks right now! You may start with to create a new one!
            </div>
        </div>
    </div>
    <CreateSubtaskModal />
    <CreateTaskModal />
    <!-- <UpdateTaskModal id="" name="" state="" description="" levelId="" @task="taskFromChild($event)" /> -->
    <UpdateTaskModal :task="getSelectedTask" />
    <UpdateSubtaskModal :subtask="getSelectedSubtask" />
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import TaskList from '@/components/TaskList.vue'
import CreateSubtaskModal from '@/components/Modals/CreateSubtask.vue'
import CreateTaskModal from '@/components/Modals/CreateTask.vue'
import UpdateTaskModal from '@/components/Modals/UpdateTask.vue'
import UpdateSubtaskModal from '@/components/Modals/UpdateSubtask.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'App',
  components: {
    Header, TaskList, CreateSubtaskModal, CreateTaskModal, UpdateTaskModal, UpdateSubtaskModal
  },
  beforeCreate(){
    this.$store.commit("all/init")
  },
  computed:{
    ...mapGetters('task', ['getTaskListByState', 'getTasks', 'getSelectedTask']),
    ...mapGetters('subtask', ['getSelectedSubtask']),
    ...mapGetters('messages', ['getError', 'getIsSuccess', 'getMaxSubtaskLength']),
  }
}
</script>

<style>
    #app {max-width:1600px; margin:0 auto;}
    #TaskLists {display: flex; align-items: stretch; flex-direction: row;} 
    #TaskLists .taskList {flex:1; margin:15px;}
    #TaskLists .taskList.important {flex:1!important;}
    
    @media screen and (max-width: 1199px) {
    #TaskLists .taskList.important {flex:2!important;}
    }
    @media screen and (max-width: 1023px) {
    #TaskLists .taskList.important {flex:1!important;}
    }
    @media screen and (max-width: 767px) {
    #TaskLists {flex-direction: column;} 
    .mainbox>.title>.right{display:block; clear:both; flex:none;}
    #Header .mainbox>.title{display:block; text-align: center;}
        #Header .mainbox >.title > .right .btn {margin-top:10px;}
    .noMobile {display: none;}
}
</style>
