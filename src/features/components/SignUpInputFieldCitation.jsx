import React, { useState } from 'react';
import { citationButton, inputFieldCitationStyle, inputFieldCitationStyleActive, labelStyle, labelStyleActive } from '../styles/authFormTailwind';
import inputClear from '../../assets/images/input_clear.svg';

const SignUpInputFieldCitation = ({ label, type, onChange, value, htmlFor, inputReset, text, onClick }) => {
        const [isInputFocus, setisInputFocus] = useState(false);
        const [isInputFocusLabel, setisInputFocusLabel] = useState(false);
            
        const onBlurStyles = () => {
            setisInputFocus(false);
    
            if(value.trim() !== '') {
                setisInputFocusLabel(true);
            } else {
                setisInputFocusLabel(false);
            }
        };

    return (
        <div className='flex gap-[8px]'>
            <div className={isInputFocus ? inputFieldCitationStyleActive : inputFieldCitationStyle}>
                <label className={isInputFocusLabel ?  labelStyleActive : labelStyle} htmlFor={htmlFor}>{label}</label>
                <input 
                    id={htmlFor}
                    className='w-[calc(100%-20px)] h-[35px] outline-none border-0 block absolute bottom-[0] text-[16px] text-[#1F2937]'
                    type={type}
                    onChange={onChange}
                    value={value}
                    onFocus={() => {
                        setisInputFocus(true)
                        setisInputFocusLabel(true)
                    }}
                    onBlur={onBlurStyles}
                />
                <button 
                    className='absolute top-[50%] right-[20px] translate-y-[-50%]'
                    type='button'
                    onClick={() => {
                        inputReset()
                        setisInputFocus(false)
                        setisInputFocusLabel(false)
                    }}
                >
                    {isInputFocusLabel && <img src={inputClear} alt='모두 지우기' />}
                </button>
            </div>
            <button 
                onClick={onClick}
                className={citationButton}>
                {text}
            </button>
        </div>
    );
};

export default SignUpInputFieldCitation;