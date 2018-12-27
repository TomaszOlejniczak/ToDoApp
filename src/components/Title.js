import React from 'react';
import style from "./Title.css";

const Title = props => {
    return(
        <div className = {style.Title}>
            <h1 className = {style.Name}>
                {props.title}
            </h1>
            <p className = {style.Info}>
                All tasks on list: {props.count} 
                <br />
                <span className = {style.Finished} >
                    Finished tasks: {props.doned}
                </span>
            </p>
        </div>
    );
}

export default Title;