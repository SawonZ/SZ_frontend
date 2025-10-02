import React from 'react';
import loadingGif from '../../assets/images/loading.gif';

const LoadingUi = () => {
    return (
        <div className='fixed top-[0] left-[0] w-full h-full z-99 flex items-center justify-center'>
            <img  src={loadingGif} alt='로딩 화면' className='w-[100px] h-[100px]' />
        </div>
    );
};

export default LoadingUi;