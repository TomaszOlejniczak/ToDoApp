import React from 'react';
import uuid from "uuid";
import style from "./App.css";
import Title from '../components/Title';
import TodoList from '../components/TodoList';
import TodoForm from '../components/TodoForm';
import StatusInfo from '../components/StatusInfo';

const   CONST_API_URL = 'http://59e51458f99ad90012268248.mockapi.io/api/v1/todo',

        CONST_UPDATE_TODO_MESSAGE = 'Updated!',
        CONST_ADD_TODO_MESSAGE = 'Added!',
        CONST_REMOVE_TODO_MESSAGE = 'Deleted!';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            doneCounter: '',
            isError: false,
            isSortAsc: true
        } 
        this.statusInfo = { 
            visibility: "hidden",
            opacity: '0',
            tranistion: 'visibility 0s .5s, opacity 0.5s linear',
            message: '' 
        };
    }

    componentWillMount() {
        this.sortTodoItems(this.state.isSortAsc);
    }

    addTodo = (description) => {
        fetch(
            CONST_API_URL,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body : JSON.stringify({

                    text: description,
                    isDone: false
                })
            }
        )
        .then((response) => handleErrors(response))
        .then(() => { 
            this.sortTodoItems(this.state.isSortAsc)
            this.displayInfo(CONST_ADD_TODO_MESSAGE);  
        })
        .catch((error) => { 
            this.showErrorInfo(error);
        });
        
    }

    removeTodo = (id) => {
        fetch(
            CONST_API_URL + '/' + id, 
            {
                method: 'DELETE'
            }
        )
        .then((response) => handleErrors(response))
        .then((response) => {
            const remainder = this.state.data.filter(todo => todo.id !== id);
            this.displayInfo(CONST_REMOVE_TODO_MESSAGE);
            this.setState({
                data: remainder,
                doneCounter: this.doneCount(remainder)
            })
        })
        .catch((error) => { 
            this.showErrorInfo(error);
        });
    }

    updateTodo = (item) => {
        fetch(
            CONST_API_URL + '/' + item.id,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body : JSON.stringify({
                   text: item.text,
                   isDone: item.isDone
                })
            }
        )
        .then((response) => handleErrors(response))
        .then( (response) => {
            const doneItem = this.state.data.map((todo) => {
                if(todo.id === item.id) {
                    todo: response;
                }
                return todo;
            });
            this.displayInfo(CONST_UPDATE_TODO_MESSAGE);
            this.setState({
                data: doneItem,
                doneCounter: this.doneCount(this.state.data)
            });
        })
        .catch((error) => { 
            this.showErrorInfo(error);
        });

    }

    //displays message info after action like UPDATE, ADD, DELETE
    displayInfo = (message) => {
        this.statusInfo = {
            visibility: 'visible',
            opacity: '1',
            tranistion: 'visibility 0s, opacity 0.5s linear',
            message: message
        };
    }

    
    changeSortOrder = () => {
        const sort = !this.state.isSortAsc
        this.sortTodoItems(sort);
        this.displayInfo( sort ? "Ascending" : "Descending" + " sort");
        this.setState({ isSortAsc: sort});
    }


    sortTodoItems = (isOrderAsc) => {
        fetch(
            CONST_API_URL + '?sortBy=id&order=' + (isOrderAsc ? 'asc' : 'desc'), 
        )
        .then(response => response.json())
        .then(responseJson => this.setState({data:responseJson}))
        .then( () => {
            const counter = this.doneCount(this.state.data);
            this.setState({doneCounter: counter});
        });
    }

    //handle and display error
    showErrorInfo = (error) => {
        this.setState({isError: true});
        this.displayInfo(`Error: ${error.message}`);
        console.log(error); 
        this.setState({isError: false});
    }
    
    //counts item whit status doned
    doneCount = (data) => {
        const doned = data.filter( todo => todo.isDone);
        return doned.length;
    }

    render = () => {
        return (
            <div className = {style.TodoApp}>
                <Title title = 'ToDo List' 
                        count = {this.state.data.length} 
                        doned = {this.state.doneCounter}
                />
                <TodoForm addItem = {this.addTodo} 
                         sortOrder = {this.changeSortOrder} 
                         isSortAsc = {this.state.isSortAsc}     
                />
                <TodoList list = {this.state.data}  
                        removeItem = {this.removeTodo} 
                        confirmItem = {this.updateTodo}
                        update = { this.updateTodo}
                />
                <StatusInfo display = {this.statusInfo}/>
            </div>
        )
    }
}

function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

export default App;
