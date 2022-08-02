// test add tasks

import { TasksService } from "../services/tasks.service";

describe('addTask', function () {
    it('should add task', function () {
        const tasksService = TasksService;
        const task = {
        id: '1',
        content: 'test',
        status: false,
        userId: 1,
        prioId: 1
        };
        tasksService.addTask(task).subscribe(data => {
        expect(data).toEqual(task);
        });
    }
    );
})
describe('removeTask', function () {
    it('should remove task', function () {
        const tasksService = TasksService;
        const task = {
        id: '1',
        content: 'test',
        status: false,
        userId: 1,
        prioId: 1
        };
        tasksService.deleteTask(task.id).subscribe(data => {
        expect(data).toEqual(task);
        });
    }
    );
})
describe('updateTask', function () {
    it('should update task', function () {
        const tasksService = TasksService;
        const task = {
        id: '1',
        content: 'test',
        status: false,
        userId: 1,
        prioId: 1
        };
        tasksService.updateTask(task.id, task).subscribe(data => {
        expect(data).toEqual(task);
        });
    }
    );
})