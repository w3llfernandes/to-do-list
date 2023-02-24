import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Task {
  id: number;
  title: string;
  done: boolean;
}

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
})
export class TasksComponent implements OnInit {
  constructor(private httpClient: HttpClient) {}

  public tasks: Task[] = [];
  public newTask: string = '';

  public ngOnInit(): void {
    this.loadTasks ()
  }

  public loadTasks(): void {
    const url = "http://localhost:3000/tasks"
    this.httpClient.get<Task[]>(url).toPromise().then(data => {
      this.tasks = data!;
    })
  }

  public save(): void {
    const url = "http://localhost:3000/tasks"
    this.httpClient.post(url, {title: this.newTask}).toPromise().then( _ => {
      this.newTask = '';
      this.loadTasks()
    })
  }

  public deleteTask(id: number): void {
    const url = `http://localhost:3000/tasks/${id}`
    this.httpClient.delete(url).toPromise().then( _=>{
      this.loadTasks();
    })
  }

  public toggleTasks(task: Task): void {
    task.done = !task.done;
    const url = `http://localhost:3000/task/${task.id}`
    this.httpClient.patch(url, { done: task.done}).toPromise()
  }
  
  }
