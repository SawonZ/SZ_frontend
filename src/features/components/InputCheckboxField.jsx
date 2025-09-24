import React from 'react';
import { policyFieldStyle, policyInputWrap, policyLabel } from '../styles/authFormTailwind';
import dropDownArrow from '../../assets/images/policy_arrow.png';
import customCheck from '../../assets/images/custom_check.svg';
import customCheckOn from '../../assets/images/custom_check_on.svg';

const InputCheckboxField = ({ polcyId, checked, onChange, onClick, panelopen }) => {
    return (
        <div className={policyFieldStyle} onClick={onClick} >
            <div className={policyInputWrap}>
                <input 
                    id={polcyId}
                    className='custom-checkbox'
                    type="checkbox"
                    checked={checked}
                    onChange={onChange}
                />
                <label htmlFor={polcyId} className='custom-label'>
                    <img src={checked ? customCheckOn : customCheck} alt="커스텀 체크박스" />
                </label>
                <label className={policyLabel}>[필수] 내용</label>
            </div>
            <img src={dropDownArrow} alt="열림/닫힘 화살표" className={
                panelopen === polcyId ? 'rotate-x-[180deg] transition-all duration-300 ease-in-out' 
                : 'rotate-x-[0deg] transition-all duration-300 ease-in-out'
            }/>
        </div>
    );
};

export default InputCheckboxField;