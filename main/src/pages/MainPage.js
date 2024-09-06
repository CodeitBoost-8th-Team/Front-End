import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PrivateGroupsList from "./group/PrivateGroupsList.js";
import PublicGroupsList from "./group/PublicGroupsList.js";
import "./MainPage.css";
import logo from "../img/logo.jpg";
import searchImg from "../img/searchImg.png";

const MainPage = () => {
  const navigate = useNavigate();
  const [groups, setGroups] = useState([]);
  const [isPublic, setIsPublic] = useState(true);
  const [selectIsPublic, setSelectIsPublic] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedOption, setSelectedOption] = useState("최신순");
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const handleCreateGroup = () => {
    navigate("/create-group");
  };

  // 검색 핸들러
  // const handleSearch = (e) => {
  //   setSearch(e.target.value);
  //   setCurrentPage(1); // 검색어가 바뀔 때 페이지를 처음으로 리셋
  // };

  // 정렬 핸들러
  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
    setCurrentPage(1); // 정렬이 바뀔 때 페이지를 처음으로 리셋
  };

  // 더보기 버튼 핸들러
  // const handleIsExpanded = () => {
  //   if (currentPage < totalPages) {
  //     setCurrentPage(currentPage + 1);
  //   }
  // };

  const handleIsPublic = (e) => {
    setSelectIsPublic(!selectIsPublic);
    setIsPublic(!isPublic);
    setCurrentPage(1); // 공개/비공개 변경 시 페이지를 처음으로 리셋
  };

  useEffect(() => {
    // 그룹 목록 가져오기
    const fetchGroups = async () => {
      try {
        const sortByMapping = {
          최신순: "latest",
          "게시글 많은 순": "mostPosted",
          공감순: "MostLike",
        };
        const response = await axios.get("http://3.39.56.63/api/groups", {
          params: {
            page: currentPage,
            pageSize: pageSize,
            sortBy: sortByMapping[selectedOption],
            keyword: search,
            isPublic: isPublic,
          },
        });
        setGroups((prevGroups) =>
          currentPage === 1
            ? response.data.data
            : [...prevGroups, ...response.data.data]
        );
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("그룹 목록 조회 실패: ", error);
      }
    };

    fetchGroups();
  }, [isPublic, search, selectedOption, currentPage, pageSize]);

  return (
    <div>
      <div className="groupsListGL">
        <div className="headerGL">
          <div className="headerLogoGL">
            <img id="logoGL" src={logo} alt="로고" />
          </div>
          <div className="makeGroupGL">
            <button
              id="makeGroupGL"
              className="makeGroupButtonGL"
              onClick={handleCreateGroup}
            >
              <span className="makeGroupLabelGL">그룹 만들기</span>
            </button>
          </div>
        </div>

        <div className="menuGL">
          <span className="isPublicGL">
            <span
              className={`publicGL ${isPublic ? "active" : ""}`}
              onClick={handleIsPublic}
            >
              <span id="publicLetterGL">공개</span>
            </span>
            <span
              className={`privateGL ${!isPublic ? "active" : ""}`}
              onClick={handleIsPublic}
            >
              <span id="privateLetterGL">비공개</span>
            </span>
          </span>

          <span className="searchGL">
            <img id="searchImgGL" src={searchImg} alt="돋보기" />
            <input
              className="searchBoxGL"
              placeholder="그룹명을 검색해주세요"
              value={search}
              // onChange={handleSearch}
            />
          </span>

          <div>
            <select
              className="selectButtonGL"
              value={selectedOption}
              onChange={handleSelectChange}
            >
              <option>최신순</option>
              <option>게시글 많은 순</option>
              <option>공감순</option>
            </select>
          </div>
        </div>

        <div className="groupListGL">
          {isPublic ? (
            <PublicGroupsList groups={groups} />
          ) : (
            <PrivateGroupsList groups={groups} />
          )}
        </div>

        {/* {currentPage < totalPages && (
          <div className="moreGL">
            <div className="addButtonGL" onClick={handleIsExpanded}>
              더보기
            </div>
          </div>
        )} */}
        {/* {isExpanded && (
          <div className="additionalContentGL">
           
            여기에 추가 콘텐츠가 표시됩니다.
          </div>
        )} */}
      </div>
    </div>
  );
};

export default MainPage;
