import React from 'react';
import { commonButton } from '../styles/commonTailwind';

const CommonButton = ({ text }) => {
    return (
        <button className={commonButton}>
            {text}
        </button>
    );
};

export default CommonButton;