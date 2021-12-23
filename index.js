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
    updateData(data) {
      localStorage.setItem(STORAGE, JSON.stringify(data));
    },
    addTask() {
      this.tasks.push({
        content: this.newTask,
      });
      this.newTask = '';
      this.updateData(this.tasks);
    },
    deleteTask(task) {
      this.tasks.splice(this.tasks.indexOf(task), 1);
      this.updateData(this.tasks);
    },
    editTask(task) {
      this.editingTask = task;
      this.editingContent = task.content;
    },
    updateTask(task) {
      if (!this.editingTask) return;
      this.editingTask = null;
      task.content = this.editingContent.trim();
      this.updateData(this.tasks);
    },
  },
});
