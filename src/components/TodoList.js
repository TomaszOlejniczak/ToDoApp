import React from 'react';
import style from "./TodoList.css";
import Todo from "./Todo";


const TodoList = (props) => {
    return (
        <ul className = {style.TodoList}>
            {
                props.list.map((item) => {
                    return (
                        <Todo key = { item.id } 
                            delete = { () => { props.removeItem(item.id) } } 
                            done = { () => { item.isDone = !item.isDone ; props.confirmItem(item) } }
                            update = { props.update }
                            item = { item }
                        />
                    )
                })
            }
        </ul>
    );
}



export default TodoList;