import React from 'react';
import { tableStyle, tdRadio, tdSearchInput, tdSearchInputIco, tdStyleOne, tdStyleTwo, tdTitle, trStyle } from '../styles/tableTailwind';
import searchIco from '../../assets/images/search.png';
import { useLocation } from 'react-router-dom';

const DetailedSearchTable = ({ 
        filterStatus,
        setFilterStatus,
        searchText,
        setSearchText,
        setSearchQuery,
        onReset
    }) => {
    const location = useLocation();

    return (
        <div className='mb-[32px]'>
            <table className={tableStyle}>
                <colgroup>
                    <col width={140}/>
                    <col width={1500}/>
                </colgroup>
                <tbody>
                    <tr className={trStyle}>
                        <td className={tdStyleOne}>검색어</td>
                        <td className={tdStyleTwo}>
                            <div className='flex gap-[8px]'>
                                <p className={tdTitle}>이름</p>
                                <div className='relative'>
                                    <img 
                                        src={searchIco} 
                                        alt="검색버튼 이미지" 
                                        className={tdSearchInputIco}
                                    />
                                    <input 
                                        className={tdSearchInput}
                                        type="text" 
                                        placeholder='검색어를 입력하세요.'
                                        value={searchText}
                                        onChange={(e) => setSearchText(e.target.value)}
                                    />
                                </div>
                            </div>
                        </td>
                    </tr>
                    {
                        location.pathname === '/new-signup-lists' && 
                        <tr className={trStyle}>
                            <td className={tdStyleOne}>활동 상태</td>
                            <td className={tdStyleTwo}>
                                <ul className='flex gap-[8px]'>
                                    <li className='flex items-center gap-[8px]'>
                                        <input 
                                            className={tdRadio}
                                            type="radio" 
                                            name='state'
                                            value="ALL"
                                            checked={filterStatus === "ALL"}
                                            onChange={() => setFilterStatus("ALL")}
                                        />
                                        <label className='text-[0.875rem] text-[#1F2937]'>전체</label>
                                    </li>
                                    <li className='flex items-center gap-[8px]'>
                                        <input 
                                            className={tdRadio}
                                            type="radio" 
                                            name='state'
                                            value="PENDING"
                                            checked={filterStatus === "PENDING"}
                                            onChange={() => setFilterStatus("PENDING")}
                                        />
                                        <label className='text-[0.875rem] text-[#1F2937]'>대기</label>
                                    </li>
                                    <li className='flex items-center gap-[8px]'>
                                        <input 
                                            className={tdRadio}
                                            type="radio" 
                                            name='state'
                                            value="APPROVED"
                                            checked={filterStatus === "APPROVED"}
                                            onChange={() => setFilterStatus("APPROVED")}
                                        />
                                        <label className='text-[0.875rem] text-[#1F2937]'>승인</label>
                                    </li>
                                    <li className='flex items-center gap-[8px]'>
                                        <input 
                                            className={tdRadio}
                                            type="radio" 
                                            name='state'
                                            value="REJECTED"
                                            checked={filterStatus === "REJECTED"}
                                            onChange={() => setFilterStatus("REJECTED")}
                                        />
                                        <label className='text-[0.875rem] text-[#1F2937]'>반려</label>
                                    </li>
                                </ul>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>

            <div className='flex w-[fit-content] mx-auto mt-[12px] gap-[12px]'>
                <button 
                    className='p-[24px] pt-[6px] pb-[6px] border border-[#E6E8EB] rounded-[0.5rem]'
                    onClick={() => {
                        setSearchText("");
                        setSearchQuery("");
                        setFilterStatus("ALL");
                        onReset()
                    }}
                >
                        초기화
                </button>
                <button 
                    className='p-[24px] pt-[6px] pb-[6px] bg-[#62CCD0] text-[#fff] rounded-[0.5rem]'
                    onClick={() => setSearchQuery(searchText)}
                >
                        검색
                </button>
            </div>
        </div>
    );
};

export default DetailedSearchTable;