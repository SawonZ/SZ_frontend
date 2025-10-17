import { useEffect, useState } from "react";
import { mainContentsTwo, mainLayout, title2 } from "../shared/styles/commonTailwind";
import { tableStyle, thStyle, trStyle, tdStyleThree } from "../features/styles/tableTailwind";
import { useUserInquiry } from "../store/useUserStore";
//import useLoading from "../features/hooks/useLoading";

const AttendanceTable = () => {
    const { users, userLists } = useUserInquiry();
    //const { userListLoading } = useLoading();

    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchName, setSearchName] = useState("");
    const [selectedState, setSelectedState] = useState("ALL");
    const [dateRange, setDateRange] = useState({ start: "", end: "" });
    const [rangeType, setRangeType] = useState("ALL");


    useEffect(() => {
        userLists();
    }, [userLists]);

    useEffect(() => {
        if (users && users.length > 0) {
            setFilteredUsers(users.filter(user => user.attendanceList?.length > 0));
        }
    }, [users]);

    // 이번 주, 이번 달, 전체 버튼 처리
    const handleRangeClick = (type) => {
        const today = new Date();
        let start = "", end = "";

        if (type === "WEEK") {
            const first = today.getDate() - today.getDay() + 1;
            const last = first + 6;
            const startDate = new Date(today.setDate(first));
            const endDate = new Date(today.setDate(last));
            start = startDate.toISOString().slice(0, 10);
            end = endDate.toISOString().slice(0, 10);
        } else if (type === "MONTH") {
            const y = today.getFullYear();
            const m = today.getMonth();
            start = new Date(y, m, 1).toISOString().slice(0, 10);
            end = new Date(y, m + 1, 0).toISOString().slice(0, 10);
        }

        setRangeType(type);
        setDateRange({ start, end });
    };

    // 검색 버튼 클릭 시 필터링
    const handleSearch = () => {
        let result = users.filter(user => user.attendanceList?.length > 0);

        // 이름 검색
        if (searchName.trim() !== "") {
            result = result.filter(user =>
                user.userName.toLowerCase().includes(searchName.toLowerCase())
            );
        }

        // 기간 필터
        if (dateRange.start && dateRange.end) {
            const startDate = new Date(dateRange.start);
            const endDate = new Date(dateRange.end);
            result = result.map(user => ({
                ...user,
                attendanceList: user.attendanceList.filter(a => {
                    const workDate = new Date(a.workDate);
                    return workDate >= startDate && workDate <= endDate;
                }),
            })).filter(user => user.attendanceList.length > 0);
        }

        // 근태 구분 필터
        if (selectedState !== "ALL") {
            result = result.map(user => ({
                ...user,
                attendanceList: user.attendanceList.filter(a => {
                    const checkIn = a.checkInAt ? a.checkInAt.slice(0, 5) : null;
                    const isLate = checkIn && checkIn > "09:00";
                    if (selectedState === "LATE") return isLate;
                    if (selectedState === "NORMAL") return !isLate;
                    return true;
                }),
            })).filter(user => user.attendanceList.length > 0);
        }

        // 이름순 정렬 (ㄱ~ㅎ 오름차순)
        result.sort((a, b) => a.userName.localeCompare(b.userName, "ko"));

        setFilteredUsers(result);
    };

    // 초기화 버튼
    const handleReset = () => {
        setSearchName("");
        setSelectedState("ALL");
        setDateRange({ start: "", end: "" });
        setRangeType("ALL");
        setFilteredUsers(users.filter(user => user.attendanceList?.length > 0));
    };

    return (
        <main className={mainLayout}>
            <div className={`${mainContentsTwo} !pb-[40px] overflow-auto`}>
                <h4 className={`${title2} text-left`}>출퇴근 기록조회</h4>

                <div className="mb-[32px]">
                    <table className="border border-[#E6E8EB] border-r-0 border-l-0 border-b-0 w-full">
                        <colgroup>
                            <col width="140" />
                            <col width="1500" />
                        </colgroup>
                        <tbody>
                            {/* 이름 검색 */}
                            <tr className="border-b border-[#E6E8EB] cursor-pointer first:cursor-auto">
                                <td className="p-[13px] bg-[#FAFAFC] h-[50px] box-border text-[#1F2937]">검색어</td>
                                <td className="p-[13px] bg-[#fff] h-[50px] box-border text-[#1F2937]">
                                    <div className="flex gap-[8px]">
                                        <p className="w-[120px] h-[32px] leading-[30px] border rounded-[4px] border-[#E6E8EB] pl-[13px] box-border">
                                            이름
                                        </p>
                                        <div className="relative">
                                            <img
                                                alt="검색버튼 이미지"
                                                className="absolute left-[12px] top-[50%] translate-y-[-50%]"
                                                src="/src/assets/images/search.png"
                                            />
                                            <input
                                                className="w-[320px] h-[32px] leading-[30px] border rounded-[4px] border-[#E6E8EB] pl-[44px] box-border outline-none"
                                                placeholder="검색어를 입력하세요."
                                                type="text"
                                                value={searchName}
                                                onChange={(e) => setSearchName(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </td>
                            </tr>

                            {/* 기간 검색 */}
                            <tr className="border-b border-[#E6E8EB] cursor-pointer first:cursor-auto">
                                <td className="p-[13px] bg-[#FAFAFC] h-[50px] box-border text-[#1F2937]">검색기간</td>
                                <td className="p-[13px] bg-[#fff] h-[50px] box-border text-[#1F2937]">
                                    <div className="flex gap-[8px]">
                                        <div className="w-[190px] h-[32px] border border-[#DEE0E4] box-border rounded-[4px] overflow-hidden">
                                            <button
                                                className={rangeType === "WEEK" ? "w-[69px] bg-[#62CCD0] h-full border-r border-[#DEE0E4] text-[#fff]" : "w-[69px] h-full border-r border-[#DEE0E4] text-[#1F2937]"}
                                                onClick={() => handleRangeClick("WEEK")}
                                            >
                                                이번 주
                                            </button>
                                            <button
                                                className={rangeType === "MONTH" ? "w-[69px] bg-[#62CCD0] h-full border-r border-[#DEE0E4] text-[#fff]" : "w-[69px] h-full border-r border-[#DEE0E4] text-[#1F2937]"}
                                                onClick={() => handleRangeClick("MONTH")}
                                            >
                                                이번 달
                                            </button>
                                            <button
                                                className={rangeType === "ALL" ? "w-[50px] bg-[#62CCD0] h-full text-[#fff]" : "w-[50px] h-full text-[#1F2937]"}
                                                onClick={() => handleRangeClick("ALL")}
                                            >
                                                전체
                                            </button>
                                        </div>
                                        <div className="relative flex items-center">
                                            <input
                                                className="w-[160px] h-[32px] border border-[#DEE0E4] rounded-[4px] pl-[12px] pr-[12px] box-border"
                                                type="date"
                                                value={dateRange.start}
                                                onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                                            />
                                            <span className="pl-[8px] pr-[8px]">~</span>
                                            <input
                                                className="w-[160px] h-[32px] border border-[#DEE0E4] rounded-[4px] pl-[12px] pr-[12px] box-border"
                                                type="date"
                                                value={dateRange.end}
                                                onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                </td>
                            </tr>

                            {/* 근태 구분 */}
                            <tr className="border-b border-[#E6E8EB] cursor-pointer first:cursor-auto">
                                <td className="p-[13px] bg-[#FAFAFC] h-[50px] box-border text-[#1F2937]">근태구분</td>
                                <td className="p-[13px] bg-[#fff] h-[50px] box-border text-[#1F2937]">
                                    <ul className="flex gap-[8px]">
                                        <li className="flex items-center gap-[8px]">
                                            <input
                                                className="w-[18px] h-[18px] rounded-full border-1 border-[gray]
                                                appearance-none checked:bg-[#fff] checked:border-[#62CCD0] relative
                                                before:content-[''] before:absolute before:inset-[4px]
                                                before:rounded-full before:bg-white
                                                checked:before:bg-[#62CCD0]"
                                                type="radio"
                                                value="ALL"
                                                checked={selectedState === "ALL"}
                                                onChange={() => setSelectedState("ALL")}
                                                name="state"
                                            />
                                            <label className="text-[14px] text-[#1F2937]">전체</label>
                                        </li>
                                        <li className="flex items-center gap-[8px]">
                                            <input
                                                className="w-[18px] h-[18px] rounded-full border-1 border-[gray]
                                                appearance-none checked:bg-[#fff] checked:border-[#62CCD0] relative
                                                before:content-[''] before:absolute before:inset-[4px]
                                                before:rounded-full before:bg-white
                                                checked:before:bg-[#62CCD0]"
                                                type="radio"
                                                value="NORMAL"
                                                checked={selectedState === "NORMAL"}
                                                onChange={() => setSelectedState("NORMAL")}
                                                name="state"
                                            />
                                            <label className="text-[14px] text-[#1F2937]">정상</label>
                                        </li>
                                        <li className="flex items-center gap-[8px]">
                                            <input
                                                className="w-[18px] h-[18px] rounded-full border-1 border-[gray]
                                                appearance-none checked:bg-[#fff] checked:border-[#62CCD0] relative
                                                before:content-[''] before:absolute before:inset-[4px]
                                                before:rounded-full before:bg-white
                                                checked:before:bg-[#62CCD0]"
                                                type="radio"
                                                value="LATE"
                                                checked={selectedState === "LATE"}
                                                onChange={() => setSelectedState("LATE")}
                                                name="state"
                                            />
                                            <label className="text-[14px] text-[#1F2937]">지각</label>
                                        </li>
                                    </ul>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div className="flex w-[fit-content] mx-auto mt-[12px] gap-[12px]">
                        <button
                            className="p-[24px] pt-[6px] pb-[6px] border border-[#E6E8EB] rounded-[0.5rem]"
                            onClick={handleReset}
                        >
                            초기화
                        </button>
                        <button
                            className="p-[24px] pt-[6px] pb-[6px] bg-[#62CCD0] text-[#fff] rounded-[0.5rem]"
                            onClick={handleSearch}
                        >
                            검색
                        </button>
                    </div>
                </div>

                {/* 근태 테이블 */}
                <table className={tableStyle}>
                    <colgroup>
                        <col width={240} />
                        <col width={240} />
                        <col width={240} />
                        {/* <col width={440} /> */}
                        <col width={240} />
                        {/* <col width={440} /> */}
                        <col width={240} />
                    </colgroup>
                    <tbody>
                        <tr className={trStyle}>
                            <th className={thStyle}>이름</th>
                            <th className={thStyle}>일자</th>
                            <th className={thStyle}>출근 시각</th>
                            {/* <th className={thStyle}>출근 등록 방식</th> */}
                            <th className={thStyle}>퇴근 시각</th>
                            {/* <th className={thStyle}>퇴근 등록 방식</th> */}
                            <th className={thStyle}>근태 구분</th>
                        </tr>

                        {filteredUsers.map((user) =>
                            user.attendanceList.map((att) => {
                                const checkInTime = att.checkInAt ? att.checkInAt.slice(0, 5) : "-";
                                const checkOutTime = att.checkOutAt ? att.checkOutAt.slice(0, 5) : "-";
                                //const state = checkInTime > "09:00" ? "지각" : "정상";

                                return (
                                    <tr className={trStyle} key={att.attendanceId}>
                                        <td className={tdStyleThree}>{user.userName}</td>
                                        <td className={tdStyleThree}>{att.workDate}</td>
                                        <td className={tdStyleThree}>{checkInTime}</td>
                                        {/* <td className={tdStyleThree}>{att.checkInIp || "-"}</td> */}
                                        <td className={tdStyleThree}>{checkOutTime}</td>
                                        {/* <td className={tdStyleThree}>{att.checkOutIp || "-"}</td> */}
                                        <td className={`${tdStyleThree} ${att.checkInAt && att.checkInAt.split(':')[0]*1 >= 9 ? 'text-[#FF4242]' : 'text-[#1F2937]'}`}>
                                            {att.checkInAt && att.checkInAt.split(':')[0]*1 >= 9 ? '지각' : '정상'}
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </main>
    );
};

export default AttendanceTable;
