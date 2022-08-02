import { Component } from '@angular/core';

import { TasksService } from './services/tasks.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // closeResult = '';
  // content = '';
  title = 'FirstTest';
  taskList : any = [];
  constructor(
    // private modalService: NgbModal, 
    private tasksService : TasksService) {}
  // private getDismissReason(reason: any): string {
  //   if (reason === ModalDismissReasons.ESC) {
  //     return 'by pressing ESC';
  //   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
  //     return 'by clicking on a backdrop';
  //   } else {
  //     return `with: ${reason}`;
  //   }
  }
  // openModal(content: any) {
  //   this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
  //     this.closeResult = `Closed with: ${result}`;
  //   }, (reason) => {
  //     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //   });
  // }
  // updateTask(): void {
  //   this.tasksService.getTasks().subscribe(data => {
  //     this.taskList = data;
  //     console.log("task----", this.taskList);
  //   })
  // }

