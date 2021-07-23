import React, { Component } from 'react';


import  './Confirm.css';
import CloseIcon from '../../../assets/close-icon.png';

import Button from '../Button/Button';


class Confirm extends Component {
    closeImageClickedHandler = () => {
        this.props.onHideConfirm();
    }

    childClickedHandler = (event) => {
        event.stopPropagation();
    }

    onOkButtonClickedHandler = () => {
        this.props.onOkClicked();
    }

    onCancelButtonClickedHandler = () => {
        this.props.onCancelClicked();
    }

    render() {
        return this.props.confirmMsg !== ''
            ? (
                    <div className="" >
                    
                        <div className="ButtonGroup">
                            <Button style={{ backgroundColor: '#ffffff', color: '#000'}} clicked={this.onOkButtonClickedHandler} >OK</Button>
                            <Button style={{ backgroundColor: '#d32f2f', color: '#fff'}} clicked={this.onCancelButtonClickedHandler} >Cancel</Button>
                        </div>
                    </div>
                )
            : null
    }
}



export default Confirm;