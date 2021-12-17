const STORAGE = 'tasks';

new Vue({
  el: '.app',
  data() {
    return {
      tasks: [],
      newTask: '',
      editingTask: null,
      editingContent: null,
    };
  },
  created() {
    this.tasks = JSON.parse(window.localStorage.getItem(STORAGE) || '[]');
  },
  methods: {
    addTask() {
      this.tasks.push({
        content: this.newTask,
      });
      this.newTask = '';
    },
    deleteTask(task) {
      this.tasks.splice(this.tasks.indexOf(task), 1);
    },
    editTask(task) {
      this.editingTask = task;
      this.editingContent = task.content;
    },
    updateTask(task) {
      if (!this.editingTask) return;
      this.editingTask = null;
      task.content = this.editingContent.trim();
    },
  },
  watch: {
    tasks: {
      handler() {
        localStorage.setItem(STORAGE, JSON.stringify(this.tasks));
      },
      deep: true,
    },
  },
});
