import React, { useState } from 'react';

const useModalShow = () => {
    const [modalShow, setModalShow] = useState(false);
    const [modalText, setModalText] = useState('');

    return {modalShow, setModalShow, modalText, setModalText};
};

export default useModalShow;