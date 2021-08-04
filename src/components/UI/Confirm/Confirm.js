import React, { Component } from 'react';


//import  './Confirm.css';
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
                    <div className={this.props.className} >
                    
                        <div>
                            <button className="button primary save" onClick={this.onOkButtonClickedHandler} >Save</button>
                            <button className="button primary cancel" onClick={this.onCancelButtonClickedHandler} >Cancel</button>
                        </div>
                    </div>
                )
            : null
    }
}



export default Confirm;