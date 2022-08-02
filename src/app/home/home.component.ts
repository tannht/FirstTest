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
  
  @Output() openModal = new EventEmitter(); updateTask = new EventEmitter();

  taskList : any = [];
  users: any = [];
  priorities : any = [];

  
  contentNew : string = ''
  userId : number = 0;
  prioId : number = 1;
  showPopup : boolean = false;

  constructor(
    private tasksService: TasksService,
    // private formBuilder: FormBuilder,
  ) { }
  // open(conten:any) : void {
  //   this.openModal.emit(conten);
  // }
  usrTask(userId: number) {
    const user:any = this.users.find((usr : any) => Number(usr.id) === userId);
    return user;
  }
  taskPrio(prioId:number) {
    let className : string = ''
    let prio:any = this.priorities.find((pri : any) => Number(pri.id) === prioId);

    return prio
  }
  getTask(): void {
    this.tasksService.getTasks().subscribe((data) => {
      this.taskList = data;
      console.log('task----', this.taskList);
    });
  }
  openPopup() : void {
    console.log('open popup', this.showPopup);
    this.showPopup = true;
  }
  
  removeTask(taskId: string) {
    this.tasksService.deleteTask(taskId).subscribe((data) => {
      this.taskList = data;
      this.updateTask.emit();
      console.log('delete task----', this.taskList);
      this.updateTask.emit();
    });
  }
  stickDone(taskId: string, status: boolean) {
    let index = this.taskList.findIndex((task: any) => task.id === taskId);

    // toggle status of task
    this.taskList[index].status = !status;
    // update task
    let task = this.taskList.find((task: any) => task.id === taskId);
    task.status = !status;
    this.tasksService
      .updateTask(taskId, this.taskList[index])
      .subscribe((data) => {
        console.log('dta----', data);
        this.taskList = data;
        this.updateTask.emit();
        console.log('update task----', this.taskList);
      });
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
