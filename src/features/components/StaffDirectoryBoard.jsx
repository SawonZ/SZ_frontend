import React from 'react';
import { board, boardTitle, boardTitleWrap } from '../styles/boardTailwind';
import { Link } from 'react-router-dom';

const StaffDirectoryBoard = ({ arrow }) => {
    return (
        <div className={board}>
            <div className={boardTitleWrap}>
                <h4 className={boardTitle}>직원조회</h4>
                <Link>
                    <img src={arrow} alt="페이지 이동 화살표" />
                </Link>
            </div>
            <div>
                <div>
                    <input 
                        type="text" 
                    />
                </div>
            </div>
        </div>
    );
};

export default StaffDirectoryBoard;