
  const STORAGE_KYE = 'todoList';
  export default {
    fetch: function () {
      //如果本地储存中还没有todoList 就parse一个空数组
      return JSON.parse(localStorage.getItem(STORAGE_KYE) || '[]');
    },
    save: function (todoList) {
      localStorage.setItem(STORAGE_KYE, JSON.stringify(todoList));
    }
  }
