import { Component } from '@angular/core';
import LocalStorageService from 'src/services/local.storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent {
  title = 'firstapp';
  newTodo:string='';
  todos:Todo[]=[]; // array of todo (type) //all todos that we have
  todospreview :Todo[]=[]; //contains only the todos that we filterd
  localStorageService :LocalStorageService;
  readonly STORAGE_KEY: string = 'TODO';

  constructor(){ //execute first
    this.localStorageService = new LocalStorageService(); 
    this.todos = this.localStorageService.getElement(this.STORAGE_KEY); 
    this.todospreview = [... this.todos];

  }

  onNewTodoInput(newTodo:string){ 
    this.newTodo= newTodo; //store the new todo 
  
  } 

  addNewTodo(){
    this.todos.push( {
      title: this.newTodo,
      isDone:false
      });

    this.newTodo= ''; //clear the input filed 
    this.localStorageService.updateElement(this.STORAGE_KEY,this.todos);
    this.todospreview = [... this.todos]; 
  }

  deleteTodo(index:number){
    this.todos.splice(index,1);
    this.todospreview = [... this.todos]; //remove all todos that we deleted from todos array from todospreview array
    this.localStorageService.updateElement(this.STORAGE_KEY,this.todos);
   
  }

  onSearchInput(searchText:string){ //searchtext is the same of searchinput.value 
    
    this.todospreview = this.todos.filter((value,index)=> {
      return value.title.indexOf(searchText)!= -1;
  
    });
  
  }

  deleteAllTodos(){
    this.todos=[];
    this.todospreview = [];
    this.localStorageService.updateElement(this.STORAGE_KEY,this.todos);

  }
  checkBoxChange(){
    this.localStorageService.updateElement(this.STORAGE_KEY,this.todos);
  }
 

 
}

  interface Todo{ //create interface to declare the object values
    title:string;
    isDone:boolean;
  }


