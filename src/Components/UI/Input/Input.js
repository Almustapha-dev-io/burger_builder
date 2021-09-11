import React from 'react';
import cssClasses from './Input.css';

const Input = props => {
    
    const inputEl = getInputType(props);

    return (
        <div className={cssClasses.Input}>
            <label className={cssClasses.Label}>{props.label}</label>
            {inputEl} 
        </div>
    );
};

const getInputType = props => {
    const {elementType, elementConfig, value, changed, isValid, shouldValidate, touched} = props;
    const options = elementType === 'select' ? elementConfig.options : [];
    const inputClasses = [cssClasses.InputElement];

    if (!isValid && shouldValidate && touched) {
        inputClasses.push(cssClasses.Invalid);
    }

    const opts = {
        input: <input 
            className={inputClasses.join(' ')} 
            {...elementConfig} 
            value={value}
            onChange={changed}/>,

        textarea: <textarea 
            row={7} 
            className={inputClasses.join(' ')}  
            {...elementConfig} value={value}
            onChange={changed}/>,

        select: <select 
                className={inputClasses.join(' ')}
                value={value}
                onChange={changed}>
                {options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.displayValue}
                    </option>
                ))}
            </select>
    };

    return opts[elementType] ? opts[elementType] : <input onChange={changed} className={inputClasses.join(' ')}  {...elementConfig} value={value}/>
}

export default Input;