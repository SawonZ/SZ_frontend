import { useState, useMemo } from 'react';

const useSearchPagination = (data, itemsPerPage = 8) => {
    const [searchText, setSearchText] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    // 검색 적용
    const filteredData = useMemo(() => {
        return data.filter(item => {
        if (searchQuery && !item.userName.includes(searchQuery)) return false;
        return true;
        });
    }, [data, searchQuery]);

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const paginatedData = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        return filteredData.slice(start, end);
    }, [filteredData, currentPage, itemsPerPage]);

    const reset = () => {
        setSearchText("");
        setSearchQuery("");
        setCurrentPage(1);
    };

    return {
        searchText,
        setSearchText,
        searchQuery,
        setSearchQuery,
        currentPage,
        setCurrentPage,
        totalPages,
        paginatedData,
        reset
    };
};

export default useSearchPagination;