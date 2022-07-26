import { Component, OnInit } from '@angular/core';
import { TasksService } from '../services/tasks.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  

  taskList : any = [];
  users: any = [];
  priorities : any = [];
  constructor(
    
    private tasksService: TasksService
  ) { }
   
  

  
  
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
