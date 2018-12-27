import React from 'react';
import style from "./StatusInfo.css";

const STATUS_DISPLAY_TIME = 0;    

class StatusInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visibility: this.props.display.visibility,
            opacity: this.props.display.opacity,
            tranistion: this.props.display.tranistion,
            message: this.props.display.message
        }

        this.handleOnClick = this.handleOnClick.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if(this.state.visibility !== nextProps.display.visibility) {
            this.setState(nextProps.display);
        }
    }
    
    componentDidUpdate() {
        if(this.state.opacity === '1') {
            setTimeout( () => {
                this.setState({
                    visibility: 'hidden',
                    opacity: 0,
                    tranistion: 'visibility 0s .5s, opacity 0.5s linear',
                    cursor: "default"
                })
            }, STATUS_DISPLAY_TIME || 750);
        }
    }

    handleOnClick = () => {
        this.setState({
            visibility: 'hidden',
            opacity: 0,
            tranistion: 'visibility 0s .5s, opacity 0.5s linear'
        });
    }

    render = () => {
        return (
            <div onClick = {this.handleOnClick}
                className = {style.status }  
                style = {{
                    visibility: this.state.visibility, 
                    opacity: this.state.opacity,
                    transition: this.state.tranistion,
                    cursor: "progress"
                }
            }>
                <div>
                    {this.state.message}
                </div>
            </div>
        );
    }
}

export default StatusInfo;