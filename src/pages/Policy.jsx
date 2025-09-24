import React, { useEffect, useState } from 'react';
import { formStyle, policyFieldStyle, policyInfo, policyInfoActive, policyInputWrap, policyLabel } from '../features/styles/authFormTailwind';
import { buttonDisabled, commonButton, title2 } from '../shared/styles/commonTailwind';
import { useNavigate } from 'react-router-dom';
import customCheck from '../assets/images/custom_check.svg';
import customCheckOn from '../assets/images/custom_check_on.svg';
import '../features/styles/checkboxCustom.css';
import InputCheckboxField from '../features/components/InputCheckboxField';

const Policy = () => {
    const [isAllChecked, setIsAllChecked] = useState(false);
    const [isCheckedOne, setIsCheckedOne] = useState(false);
    const [isCheckedTwo, setIsCheckedTwo] = useState(false);
    const [isCheckedThree, setIsCheckedThree] = useState(false);
    const [isCheckedFoul, setIsCheckedFoul] = useState(false);

    const [panelopen, setPanelOpen] = useState(null);

    const navigate = useNavigate();

    //체크박스
    const handleAllCheck = () => {
        setIsAllChecked(prev => !prev);
        let isCheck = isAllChecked;

        setIsCheckedOne(!isCheck);
        setIsCheckedTwo(!isCheck);
        setIsCheckedThree(!isCheck);
        setIsCheckedFoul(!isCheck);
    };

    useEffect(() => {
        if(isCheckedOne && isCheckedTwo && isCheckedThree && isCheckedFoul) {
            setIsAllChecked(true);
        } else {
            setIsAllChecked(false);
        }
    }, [isCheckedOne, isCheckedTwo, isCheckedThree, isCheckedFoul]);

    //약관 내용
    const panelToggle = (id) => {
        setPanelOpen(prev => (prev === id ? null : id));
    };

    return (
        <main className='bg-[#f8f8f8] relative min-h-screen'>
            <form 
                className={formStyle}
            >
                <p className={title2}>약관동의</p>

                <div className={`${policyFieldStyle} border-b border-[#E6E8EB] h-[54px] !cursor-[default]`}>
                    <div className={policyInputWrap}>
                        <input 
                            id='policy-all'
                            className='custom-checkbox'
                            type="checkbox"
                            checked={isAllChecked}
                            onChange={handleAllCheck}
                        />
                        <label htmlFor="policy-all" className='custom-label'>
                            <img src={isAllChecked ? customCheckOn : customCheck} alt="커스텀 체크박스" />
                        </label>
                        <label className={policyLabel}>모두 동의</label>
                    </div>
                </div>

                <InputCheckboxField 
                    polcyId='policy1'
                    checked={isCheckedOne}
                    onChange={() => setIsCheckedOne(prev => !prev)}
                    onClick={() => panelToggle('policy1')}
                    panelopen={panelopen}
                />
                <div className={panelopen === 'policy1' ? policyInfoActive : policyInfo}>
                    <p className='text-[0.875rem] text-[#1F2937] leading-[1.5] mb-[8px]'>제목</p>
                    <div className='p-[20px] box-border border border-[#D1D5DB] rounded-[0.5rem] h-[247px] overflow-auto'>
                        <p className='text-[0.875rem] leading-[1.5] text-[#4B5563] break-keep'>
                            텍스트가 들어가요 텍스트가 들어가요 텍스트가 들어가요 
                            텍스트가 들어가요 텍스트가 들어가요 텍스트가 들어가요 
                            텍스트가 들어가요 텍스트가 들어가요 텍스트가 들어가요 
                            텍스트가 들어가요 텍스트가 들어가요 텍스트가 들어가요 
                            텍스트가 들어가요 텍스트가 들어가요 텍스트가 들어가요 
                            텍스트가 들어가요 텍스트가 들어가요 텍스트가 들어가요 
                        </p>
                    </div>
                </div>

                <InputCheckboxField 
                    polcyId='policy2'
                    checked={isCheckedTwo}
                    onChange={() => setIsCheckedTwo(prev => !prev)}
                    onClick={() => panelToggle('policy2')}
                    panelopen={panelopen}
                />
                <div className={panelopen === 'policy2' ? policyInfoActive : policyInfo}>
                    <p className='text-[0.875rem] text-[#1F2937] leading-[1.5] mb-[8px]'>제목</p>
                    <div className='p-[20px] box-border border border-[#D1D5DB] rounded-[0.5rem] h-[247px] overflow-auto'>
                        <p className='text-[0.875rem] leading-[1.5] text-[#4B5563] break-keep'>
                            텍스트가 들어가요 텍스트가 들어가요 텍스트가 들어가요 
                            텍스트가 들어가요 텍스트가 들어가요 텍스트가 들어가요 
                            텍스트가 들어가요 텍스트가 들어가요 텍스트가 들어가요 
                            텍스트가 들어가요 텍스트가 들어가요 텍스트가 들어가요 
                            텍스트가 들어가요 텍스트가 들어가요 텍스트가 들어가요 
                            텍스트가 들어가요 텍스트가 들어가요 텍스트가 들어가요 
                        </p>
                    </div>
                </div>

                <InputCheckboxField 
                    polcyId='policy3'
                    checked={isCheckedThree}
                    onChange={() => setIsCheckedThree(prev => !prev)}
                    onClick={() => panelToggle('policy3')}
                    panelopen={panelopen}
                />
                <div className={panelopen === 'policy3' ? policyInfoActive : policyInfo}>
                    <p className='text-[0.875rem] text-[#1F2937] leading-[1.5] mb-[8px]'>제목</p>
                    <div className='p-[20px] box-border border border-[#D1D5DB] rounded-[0.5rem] h-[247px] overflow-auto'>
                        <p className='text-[0.875rem] leading-[1.5] text-[#4B5563] break-keep'>
                            텍스트가 들어가요 텍스트가 들어가요 텍스트가 들어가요 
                            텍스트가 들어가요 텍스트가 들어가요 텍스트가 들어가요 
                            텍스트가 들어가요 텍스트가 들어가요 텍스트가 들어가요 
                            텍스트가 들어가요 텍스트가 들어가요 텍스트가 들어가요 
                            텍스트가 들어가요 텍스트가 들어가요 텍스트가 들어가요 
                            텍스트가 들어가요 텍스트가 들어가요 텍스트가 들어가요 
                        </p>
                    </div>
                </div>

                <InputCheckboxField 
                    polcyId='policy4'
                    checked={isCheckedFoul}
                    onChange={() => setIsCheckedFoul(prev => !prev)}
                    onClick={() => panelToggle('policy4')}
                    panelopen={panelopen}
                />
                <div className={panelopen === 'policy4' ? policyInfoActive : policyInfo}>
                    <p className='text-[0.875rem] text-[#1F2937] leading-[1.5] mb-[8px]'>제목</p>
                    <div className='p-[20px] box-border border border-[#D1D5DB] rounded-[0.5rem] h-[247px] overflow-auto'>
                        <p className='text-[0.875rem] leading-[1.5] text-[#4B5563] break-keep'>
                            텍스트가 들어가요 텍스트가 들어가요 텍스트가 들어가요 
                            텍스트가 들어가요 텍스트가 들어가요 텍스트가 들어가요 
                            텍스트가 들어가요 텍스트가 들어가요 텍스트가 들어가요 
                            텍스트가 들어가요 텍스트가 들어가요 텍스트가 들어가요 
                            텍스트가 들어가요 텍스트가 들어가요 텍스트가 들어가요 
                            텍스트가 들어가요 텍스트가 들어가요 텍스트가 들어가요 
                        </p>
                    </div>
                </div>

                <button 
                    className={isAllChecked ?  commonButton : buttonDisabled}
                    onClick={(e) => {
                        e.preventDefault()
                        sessionStorage.setItem('agreementsAccepted', '1')
                        navigate('/sign-up')
                    }}
                >
                    다음
                </button>
            </form>
        </main>
    );
};

export default Policy;