<template>
  <div id="Header" class="container-fluid mt-3">
    <div class="mainbox">
      <div class="title withoutline">
        <i class="fas fa-tasks"></i> Vue Task Manager
        <div class="right">
          <button class="btn btn-primary btn-sm mr-2" v-if="getTasks && getTasks.length>0" @click="$bvModal.show('CreateSubtaskModal')"><i class="fas fa-plus mr-2"></i> Create a Subtask</button>
          <button class="btn btn-success" @click="$bvModal.show('CreateTaskModal')"><i class="fas fa-plus mr-2"></i> Create a Task</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Header',
  computed: {
    ...mapGetters('task', ['getTasks'])
  }
}
</script>
<style scoped>

</style>