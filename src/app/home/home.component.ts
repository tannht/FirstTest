import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TasksService } from '../services/tasks.service';
import { DataForm } from '../share/dataform/dataform';
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
  
  contentNew : string = ''
  userId : number = 0;
  prioId : number = 1;
  dataForm : DataForm = new DataForm();
  selectedPrioId : number = 0;
  selectedUserId : number = 0;
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
      
     this.getTask();
    })
  }
  stickDone(taskId: string, status: boolean) {
    let index = this.taskList.findIndex( (task: any) => task.id === taskId);
   
    // toggle status of task
    this.taskList[index].status = !status;
    // update task
    let task = this.taskList.find( (task: any) => task.id === taskId);
    task.status = !status;
    this.tasksService.updateTask(taskId, this.taskList[index]).subscribe(data => {
     
      this.getTask();
      console.log("update task----", this.taskList);
    })
  }
  handleEdit(task : any, content : any) : void {

    this.open(content);
    this.dataForm = {...task};
    this.dataForm.contentNew = task.contentNew;
    this.dataForm.userId = task.userId;
    this.dataForm.prioId = task.prioId;
    this.selectedPrioId = task.prioId;
    this.selectedUserId = task.userId;
    console.log(task.prioId);
    // this.updateTask.emit();
  }
  
  
  onSubmit() : void {
    console.log("handel submit---", this.dataForm);
    this.tasksService.addTask(this.dataForm).subscribe(data => {
    // this.taskList = data;
    // console.log("data----", data);
    this.getTask();
    console.log("task----", this.taskList);
    })
  }

  onChangeUserId (event: any) : void {
    this.dataForm.userId = Number(event.target.value);
    console.log("userId----", this.dataForm.prioId);

  }

  onChangePrio(event: any) : void {
    this.dataForm.prioId = Number(event.target.value)
    console.log("PrioId----", this.dataForm.prioId);

  }
  
  onChangeContent(event: any) : void {
    this.dataForm.contentNew = event.target.value;
    console.log("dataForm----", this.dataForm.contentNew);

  }

  getTask () : void {
    this.tasksService.getTasks().subscribe(data => {
      this.taskList = data;
      console.log("task----", this.taskList);
    })
  }

  ngOnInit(): void {
    this.getTask();
    // this.tasksService.getTasks().subscribe(data => {
    //   this.taskList = data;
    //   console.log("task----", this.taskList);
    // })
    this.tasksService.getUsers().subscribe(users => {
      this.users = users;

    })
    this.tasksService.getPrio().subscribe(priorities => {
      this.priorities = priorities;

    })
    
    
  }

}
