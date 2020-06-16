(function (Window) {
	//ES6的模块自动采用严格模式
	'use strict';
	

	// Your starting point. Enjoy the ride!
	new Vue({
		el: '.todoapp',
		data: {
			todoList: [
				{id: 1, value: 'aaa', completed: false, editing: false},
				{id: 2, value: 'bbb', completed: false, editing: false}
			],
			newTodo: '',
			filterStatus: 'all',
			editingText: ''
		},
		methods: {
			//点击添加todo
			addTodo(){
				const value = this.newTodo && this.newTodo.trim()
				if(!value) return
				let id = 0
				if(this.todoList.length != 0){
					id = this.todoList.length + 1
				}
				const aNewTodo = {
					id,
					value,
					completed: false,
					editing: false
				}
				this.todoList.push(aNewTodo)
				this.newTodo = ''
			},
			// 完成所有todo
			completedAll(){
				for(let len in this.todoList){
					this.todoList[len].completed = true
				}
			},
			// 一键改变所有todo的状态
			allDoneOrActive(event){
				if(event.checked){
					for(let len in this.todoList){
						this.todoList[len].completed = true
					}
				}else{
					for(let len in this.todoList){
						this.todoList[len].completed = false
					}
				}
			},
			// 双击事件开启编辑框,并将todo的内容赋值给editingText，文本框通过双向绑定editingText展示或修改内容
			// 这里使用 this.nextTick 解决展示文本框后无法立即让他获得焦点
			openEdit(value, index){
				const liL = document.querySelectorAll('.todo-list li')[index]
				const input = liL.querySelector('.edit')
				this.$set(this.todoList[index], 'editing', true)
				this.editingText = value
				this.$nextTick(()=>{
					input.focus()
				})
			},
			//	失去焦点或者按下回车，关闭编辑框，并保存修改后的todo内容
			exitEdit(index){
				this.$set(this.todoList[index], 'value', this.editingText)
				this.$set(this.todoList[index], 'editing', false)

			},
			// 删除被选中的那个todo
			destroyTodo(id){
				for(let index in this.todoList){
					if(this.todoList[index].id == id){
						this.todoList.splice(index,1)
					}
				}
			},
			// 删除所有已完成todo
			removeCompletedTodo(){
				this.todoList = this.todoList.filter(todo => !todo.completed)
			},
			// 根据点点击的标签更改filterStatus状态
			changeStatus(status){
				this.filterStatus = status
			}

			// completed 或 active 单个 todo
			// 使用v-model对chexkbox进行绑定 completed 更简单，虽然还不知道后面会不会有问题
			// doneOrActive(event, id){
			// 	for(let todo of this.todoList){
			// 		if(todo.id == id){
			// 			if(event.checked){
			// 				todo.completed = true
			// 			}else{
			// 				todo.completed = false
			// 			}
			// 		}
			// 	}
			// }
		},
		computed: {
			//   统计未完成 todo
			leftCounter(){
				return this.todoList.filter(todo => !todo.completed).length
			},
			completedCounter(){
				let count
				this.todoList.forEach(todo => {
					if(todo.completed == true){
						count++
					}
				});
				return count
			},
			// 根据 filterStatus 返回相应的 todoList 内容到页面展示
			showTodoS(){
				switch(this.filterStatus){
					case 'all':
						return this.todoList
						break
					case 'active':
						return this.todoList.filter(todo => !todo.completed)
						break
					case 'completed':
						return this.todoList.filter(todo => todo.completed)
						break
					default:
						break
				}
			}
		}
 	})

})(Window);
