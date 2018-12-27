import React from 'react';
import style from "./TodoForm.css";

import 'font-awesome/css/font-awesome.css'; 

import FontAwesome from "react-fontawesome";

const ERROR_TEXT = 'Empty task description!',
    SUCCESS_TEXT = 'Succesful added to list!',
    SUCCESS_TEXT_COLOR = '#00c853',
    ERROR_TEXT_COLOR = 'red'; 

class TodoForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: '',
            helper: '',
            // arrow: true,
            sortOrderAsc: this.props.isSortAsc
        };
        
        this.helperColor = ERROR_TEXT_COLOR;
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (event) => {
        this.setState({inputValue: event.target.value,
                       helper: '' }) ;
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const data = this.state.inputValue.trim();
        if ( data !== '') { 
            this.props.addItem(this.state.inputValue);
            this.helperColor = SUCCESS_TEXT_COLOR;
            this.setState({inputValue: '',
                           helper: SUCCESS_TEXT });
            setTimeout( () => {
                this.setState({helper: ''})
            }, 1500);
        }
        else {
            this.helperColor = ERROR_TEXT_COLOR;
            this.setState({helper: ERROR_TEXT});
            setTimeout( () => {
                this.setState({helper: ''})
            }, 1500);
        }
    }

    render = () => {
        return (
            <form className = {style.TodoForm} onSubmit = {this.handleSubmit} >
                <input name = 'task' type="text" 
                    onChange = {this.handleChange} 
                    value = {this.state.inputValue} 
                    placeholder = "Task description" 
                />
                <p className = {style.helper} 
                    style = {{color: this.helperColor}} 
                >
                    {this.state.helper}
                </p>
                <input type = 'submit' value = "Add new item" />
            </form>
        );
    }
}




export default TodoForm;