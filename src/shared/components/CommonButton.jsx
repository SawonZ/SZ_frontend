import React from 'react';
import { commonButton } from '../styles/commonTailwind';

const CommonButton = ({ text, onClick }) => {
    return (
        <button 
            className={commonButton}
            onClick={onClick}
        >
            {text}
        </button>
    );
};

export default CommonButton;