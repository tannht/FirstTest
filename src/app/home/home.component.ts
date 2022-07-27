import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TasksService } from '../services/tasks.service';
// import { FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @Input() content:any; 
  @Output() openModal = new EventEmitter(); updateTask = new EventEmitter();

  taskList : any = [];
  users: any = [];
  priorities : any = [];
  closeResult = '';
  // dataForm : any = this.formBuilder.group({
  //   content: '',
  //   prioId: '',
  //   userId: ''
  // });
  contentTask : string = ''
  userId : number = 0;
  priority : number = 0;
  constructor(
    private tasksService: TasksService,
    // private formBuilder: FormBuilder,
  ) { }
  open(conten:any) : void {
    this.openModal.emit(conten);
  }
  usrTask(userId: number) {
    const user:any = this.users.find((usr : any) => Number(usr.id) === userId);
    return user;
  }
  taskPrio(prioId:number) {
    let className : string = ''
    let prio:any = this.priorities.find((pri : any) => Number(pri.id) === prioId);

    return prio
  }
  checkStyle(prioId:number) {
    let className : string = ''
    
    if(prioId === 3) {
      className = 'badge bg-success'
    } else if(prioId === 2) {
      className = 'badge bg-warning'
    } else if(prioId === 1) {
      className = 'badge bg-danger'
    }

    return className
  }
  removeTask(taskId: string) {
    this.tasksService.deleteTask(taskId).subscribe(data => {
      this.taskList = data;
      this.updateTask.emit();
      console.log("delete task----", this.taskList);
    })
  }
  stickDone(taskId: string, status: boolean) {
    let index = this.taskList.findIndex( (task: any) => task.id === taskId);
    console.log("index", index);
    console.log("task", this.taskList[index]);
    console.log("status", status);
    // toggle status of task
    this.taskList[index].status = !status;
    // update task
    this.tasksService.updateTask(taskId, this.taskList[index]).subscribe(data => {
      this.taskList = data;
      this.updateTask.emit();
      console.log("update task----", this.taskList);
    })
  }
  handelAddTask(dataForm : any) : void {
    
    this.taskList.push(dataForm);
    this.tasksService.addTask(dataForm).subscribe(data => {
      this.taskList = data;
      console.log("task----", this.taskList);
    })
    this.updateTask.emit();
  }
  ngOnInit(): void {
    this.tasksService.getTasks().subscribe(data => {
      this.taskList = data;
      console.log("task----", this.taskList);
    })
    this.tasksService.getUsers().subscribe(users => {
      this.users = users;

    })
    this.tasksService.getPrio().subscribe(priorities => {
      this.priorities = priorities;

    })
    
  }

}
