import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataForm } from 'src/app/share/dataform/dataform';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-modal-task',
  templateUrl: './modal-task.component.html',
  styleUrls: ['./modal-task.component.scss'],
})
export class ModalTaskComponent implements OnInit {
  @Input() isVisible: boolean = false;
  @Output() openModal = new EventEmitter<boolean>();
  updateTask = new EventEmitter();

  dataForm: DataForm = new DataForm();
  taskList: any = [];
  users: any = [];
  priorities: any = [];

  constructor(
    private tasksService: TasksService // private formBuilder: FormBuilder,
  ) {}

  confirmOpen(isConfirm: boolean): void {
    this.openModal.emit(isConfirm);
  }

  
  handleEdit(task: any, taskList: any): void {
    let index = taskList.findIndex((item: any) => item.id === Number(task.id));
    // this.open(content);
    task.contentNew = taskList[index].contentNew;
    task.userId = taskList[index].userId;
    task.prioId = taskList[index].prioId;
    // console.log('content----', content);
    console.log('index---', index);
    console.log('taskId---', Number(task.id));
    // this.updateTask.emit();
  }
  handleClose(): void {}
  onSubmit(): void {
    console.log('handel submit---', this.dataForm);
    this.tasksService.addTask(this.dataForm).subscribe((data) => {
      // this.taskList = data;
      // console.log("data----", data);
      this.getTask();
      this.handleClose();
      console.log('task----', this.taskList);
    });
  }
  getTask(): void {
    this.tasksService.getTasks().subscribe((data) => {
      this.taskList = data;
      console.log('task----', this.taskList);
    });
  }

  onChangeUserId(event: any): void {
    this.dataForm.userId = Number(event.target.value);
    console.log('userId----', this.dataForm.prioId);
  }

  onChangePrio(event: any): void {
    this.dataForm.prioId = Number(event.target.value);
    console.log('PrioId----', this.dataForm.prioId);
  }

  onChangeContent(event: any): void {
    this.dataForm.contentNew = event.target.value;
    console.log('dataForm----', this.dataForm.contentNew);
  }

  
  ngOnInit(): void {
    console.log(this.isVisible)
  }
}
