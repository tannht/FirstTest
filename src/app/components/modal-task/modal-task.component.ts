import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-modal-task',
  templateUrl: './modal-task.component.html',
  styleUrls: ['./modal-task.component.scss']
})
export class ModalTaskComponent implements OnInit {
  @Input() closeResult:any; 
  constructor() { }
  
 
  ngOnInit(): void {
    
  }

}
