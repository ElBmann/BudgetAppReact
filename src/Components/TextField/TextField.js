import React from 'react';
import TextFieldCSS from './TextField.css';


const TextField = (props) =>{ 
    let inputElement = null;
    switch ( props.elementType ) {
        case ( 'input' ):
            inputElement = <input
                className={TextFieldCSS.shape}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;
        case ( 'textarea' ):
            inputElement = <textarea
                className={TextFieldCSS.shape}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;
        default:
            inputElement = <input
                className={TextFieldCSS.shape}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
    }    
    return(
    <div className={TextFieldCSS.shape}>
        {inputElement}
    </div>
    );
}

export default TextField;