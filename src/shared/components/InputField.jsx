import React, { useState } from 'react';
import { inputFieldStyle, inputFieldStyleActive, labelStyle, labelStyleActive } from '../../features/styles/authFormTailwind';
import inputClear from '../../assets/images/input_clear.svg';

const InputField = ({ label, type, onChange, value, htmlFor, inputReset }) => {
    const [isInputFocus, setisInputFocus] = useState(false);
        
    const onBlur = () => {
        if(value.trim() !== '') {
            setisInputFocus(true);
        } else {
            setisInputFocus(false);
        }
    };

    return (
        <div className={isInputFocus ? inputFieldStyleActive : inputFieldStyle}>
            <label className={isInputFocus ?  labelStyleActive : labelStyle} htmlFor={htmlFor}>{label}</label>
            <input 
                id={htmlFor}
                className='w-[calc(100%-20px)] h-[35px] outline-none border-0 block absolute bottom-[0] text-[16px] text-[#1F2937]'
                type={type}
                onChange={onChange}
                value={value}
                onFocus={() => setisInputFocus(true)}
                onBlur={onBlur}
            />
            <button 
                className='absolute top-[50%] right-[20px] translate-y-[-50%]'
                type='button'
                onClick={inputReset}
            >
                {isInputFocus && <img src={inputClear} alt='모두 지우기' />}
            </button>
        </div>
    );
};

export default InputField;