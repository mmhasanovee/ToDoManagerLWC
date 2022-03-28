import { LightningElement, track } from 'lwc';
import addTodo from "@salesforce/apex/ToDosController.addTodo";
//53.27 bLyAsIeDZtw
export default class ToDoLWC extends LightningElement {
    @track time = "6.45 PM";
    @track greeting = "Good Evening";

    @track todos = [];
    //gets called as soon as the component is initialized
    connectedCallback() {
        this.getTime();
        this.sampleTodos();
        setInterval(() => {
            this.getTime();
        }, 1000 * 60);
    }

    getTime() {
        const date = new Date();
        const hour = date.getHours();
        const min = date.getMinutes();

        this.time = `${this.getHour(hour)}:${this.getDoubleDigit(min)} ${this.getMidDay(hour)}`
        this.setGreeting(hour);
    }

    getHour(hour) {
        return hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    }

    getMidDay(hour) {
        return hour >= 12 ? "PM" : "AM";
    }

    getDoubleDigit(digit) {
        return digit < 10 ? "0" + digit : digit;
    }

    setGreeting(hour) {
        if (hour < 12) {
            this.greeting = "Good morning";
        } else if (hour >= 12 && hour < 17) {
            this.greeting = "Good Afternoon";
        } else {
            this.greeting = "Good Evening";
        }
    }

    addToDoHandler() {
        const inputBox = this.template.querySelector("lightning-input");
        
        const todo = {
            todoName: inputBox.value,
            done: false,
        }

        addTodo({payload: JSON.stringify(todo)}).then(response =>{
            console.log('Item Inserted Sucessfuly');
        }).catch(error =>{
            console.log('Error while insertion');
        });
        this.todos.push(todo);
        inputBox.value = "";
    }

    //needs to return a value
    get upcomingTasks() {
        return this.todos && this.todos.length
        ? this.todos.filter(todo => !todo.done)
        : [];
    }
    
    //needs to return a value
    get completedTasks() {
        return this.todos && this.todos.length
        ? this.todos.filter(todo => todo.done)
        : [];
    }
    
    sampleTodos(){
        const todos = [{
            todoId: 0,
            todoName: "Life is Boring",
            done: false,
            todoDate: new Date()
        },
        {
            todoId: 1,
            todoName: "Life is Upside",
            done: false,
            todoDate: new Date()
        },
        {
            todoId: 2,
            todoName: "Life is Down",
            done: true,
            todoDate: new Date()
        },
    ];
    this.todos = todos;
    }
}