import React, { useState } from 'react';
import { inputFieldStyle, inputFieldStyleActive, labelStyle, labelStyleActive } from '../../features/styles/authFormTailwind';

const InputField = ({ label, type, onChange, value }) => {
    const [isInputFocus, setisInputFocus] = useState(false);

    const onFocus = () => {
        setisInputFocus(true);
    };

    return (
        <div className={isInputFocus ? inputFieldStyleActive : inputFieldStyle}>
            <label className={isInputFocus ?  labelStyleActive : labelStyle}>{label}</label>
            <input 
                className='w-[calc(100%-20px)] h-[35px] outline-none border-0 block absolute bottom-[0] text-[16px] text-[#1F2937]'
                type={type}
                onChange={onChange}
                value={value}
                onFocus={onFocus}
                onBlur={() => setisInputFocus(false)}
            />
        </div>
    );
};

export default InputField;