import React from 'react';
import style from "./Todo.css";

import 'font-awesome/css/font-awesome.css'; 

import FontAwesome from "react-fontawesome";

class Todo extends React.Component {
    constructor(props)  {
        super(props);
        this.state = {
            description: this.props.item.text,
            showMe: false
        }
        //store the description's value to revert the future changes 
        this.beforeChangeDescription = this.state.description;
    }
 
    onChangeHandler = (event) => {
        this.setState({description:  event.target.value});
    }
    
    onKeyUpHandler = (event) => {
        if(event.keyCode === 13 || event.keyCode === 10) {
            this.textInput.blur();
            this.props.item.text = this.state.description
            this.props.update(this.props.item);
        }
    }

    onBlurHandler = (event) => {
        this.setState({
            description: this.beforeChangeDescription,
            showMe: false
        });
        this.textInput.blur()
    }

    //Handling mouse click on the paragraph to edit description
    onChangeDescriptionHandler = () => {
        return new Promise (
             (resolve, reject) => {
                this.setState({
                    showMe: true
                });
            resolve();
        });
    }

    //Editing item (makes input filed) when mouse cliks on it. 
    //When mouse click out of it retunr to paragraph field
    onEditingHandler = () => {
        if(!this.state.showMe) {
            return (
                <div className = {style.itemText}> 
                    <p onClick = { 
                        () => { 
                            this.onChangeDescriptionHandler()
                            .then( () => {
                                this.textInput.focus();
                                //set description's text selected form start to end
                                //multiple by 2 to ensure the cursor always ends up at the end
                                //OPERA somethimes sees a cariage return as 2 chars
                                this.textInput.setSelectionRange(0, this.textInput.value.length * 2);       
                            })
                        }
                    }>
                        {this.props.item.text} 
                    </p>
                </div>
            )
        } else {
            return (
                <div className = {style.itemText}> 
                    <input  className = { style.Description}
                        type = "text" 
                        value = { this.state.description } 
                        onChange = {this.onChangeHandler } 
                        onKeyUp = {this.onKeyUpHandler }
                        onBlur = {this.onBlurHandler}
                        ref = { input => this.textInput = input }                  
                    />
                </div>
            )
        }
    }

    render = () => {
        return(
            <li className = {style.Todo + ' ' + (this.props.item.isDone ? style.done : '')}>

                {this.onEditingHandler()}

                <div className = {style.button} 
                    onClick = {this.props.delete}
                >
                    <div className = {style.circle + ' ' + style.delete}>
                        <FontAwesome name = 'times' />
                    </div>
                </div>

                <div className = {style.button }
                    onClick = {this.props.done}
                    //style = {{pointerEvents: this.props.item.isDone ? 'none' : '' }}
                >
                    <div className = {style.circle + ' ' + (this.props.item.isDone ? style.disabled : style.add)  } 
                        //{/* disabled= {this.props.item.isDone}  */}
                    >
                        <FontAwesome name = 'check' />
                    </div>
                </div>
            </li>
        );
    }
}
 
export default Todo;    