import React from 'react';
import { mainContentsTwo, mainLayout, title2 } from '../shared/styles/commonTailwind';
import DetailedSearchTable from '../features/components/DetailedSearchTable';

const NewSignUpLists = () => {
    return (
        <main className={mainLayout}>
            <div className={mainContentsTwo}>
                <h4 className={`${title2} text-left`}>신규 가입 내역</h4>
                <DetailedSearchTable />

                <table>
                    
                </table>
            </div>
        </main>
    );
};

export default NewSignUpLists;