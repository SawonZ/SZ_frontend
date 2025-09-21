import React from 'react';

const InputField = ({ label, type, placeholder, onChange, value }) => {
    return (
        <div>
            <label>{label}</label>
            <input 
                className='border'
                type={type}
                placeholder={placeholder}
                onChange={onChange}
                value={value}
            />
        </div>
    );
};

export default InputField;