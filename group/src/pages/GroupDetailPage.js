import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import GroupEditModal from "../components/GroupEditModal";
import GroupDeleteModal from "../components/GroupDeleteModal";
import PublicPostsList from "./PublicPostsList";
import PrivatePostsList from "./PrivatePostsList";
import "./GroupDetailPage.css";
import flower from "../img/flower.png";
import logo from "../img/logo.jpg";
import searchImg from "../img/searchImg.png";

const GroupDetailPage = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const [group, setGroup] = useState(null);
  const [groups, setGroups] = useState([]); // 그룹 목록 상태 추가
  const [currentPage, setCurrentPage] = useState(1); // 페이지네이션 상태 추가
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isFailureModalOpen, setIsFailureModalOpen] = useState(false);
  const [failureMessage, setFailureMessage] = useState("");
  const [grouplikeCount, setGroupLikeCount] = useState(0);
  const [isPublic, setIsPublic] = useState(true);
  const [search, setSearch] = useState("");

  // 검색 핸들러
  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1); // 검색어가 바뀔 때 페이지를 처음으로 리셋
  };

  const handleIsPublic = (e) => {
    const isPublicSelected = e.target.id === "publicLetterGD";
    setIsPublic(isPublicSelected);
  };

  const handleLikeClick = async () => {
    try {
      const response = await axios.post(
        `http://3.39.56.63/api/groups/${groupId}/like`
      );
      if (response.status === 200) {
        setGroup((prevGroup) => ({
          ...prevGroup,
          groupLikeCount: response.data.updatedLikeCount, // 서버에서 반환된 공감 수로 업데이트
        }));
      }
    } catch (error) {
      console.error("공감 수 업데이트 실패:", error);
    }
  };

  useEffect(() => {
    const fetchGroupDetails = async () => {
      try {
        const response = await axios.get(
          `http://3.39.56.63/api/groups/${groupId}`
        );
        console.log("Group Details Response:", response.data);
        setGroup(response.data);
        setError(null); // 오류 상태 초기화
      } catch (error) {
        setError("그룹 정보를 가져오는 데 실패했습니다.");
        console.error("그룹 상세 정보 불러오기 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    if (groupId) {
      fetchGroupDetails(); // groupId가 존재할 경우 그룹 정보 가져오기
    }
  }, [groupId]);

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>{error}</p>;

  const handleEditClick = () => {
    setIsDeleteModalOpen(false); // 다른 모달을 닫음
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = () => {
    setIsEditModalOpen(false); // 다른 모달을 닫음
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async (password) => {
    try {
      const response = await axios.delete(
        `http://3.39.56.63/api/groups/${groupId}`,
        {
          data: { groupPassword: password },
        }
      );

      if (response.status === 200) {
        setIsDeleteModalOpen(false);
        setIsSuccessModalOpen(true);
      }
    } catch (error) {
      console.error("그룹 삭제 중 오류 발생:", error);

      setFailureMessage(
        error.response?.data?.message || "그룹 삭제에 실패했습니다."
      );
      setIsDeleteModalOpen(false);
      setIsFailureModalOpen(true);
    }
  };

  const handleDeleteClose = () => {
    setIsDeleteModalOpen(false);
  };

  const handleSuccessModalClose = () => {
    setIsSuccessModalOpen(false);
    navigate("/");
  };

  const handleFailureModalClose = () => {
    setIsFailureModalOpen(false);
  };

  const handleEditSuccess = (updatedGroup) => {
    setGroup(updatedGroup);
    setIsEditModalOpen(false);
  };

  const handleEditFailure = (message) => {
    alert(message);
    setIsEditModalOpen(false);
  };

  // 추억 만들기 버튼 -> 페이지 이동 (import - 폴더 정리/수정 필요)
  // const handleCreatePost = () => {
  //   navigate("/groups/{groupId}/posts");
  // };

  return (
    <div className="group-detail-page">
      <div className="headerGD">
        <div className="headerLogoGD">
          <img id="logo" src={logo} alt="로고" />
        </div>
      </div>
      {group && (
        <>
          <div className="groupDetailGD">
            <div className="groupGD">
              <span className="groupImgGD">
                <img
                  src={`http://3.39.56.63/${group.imageUrl}`}
                  alt={group.name}
                />
              </span>
              <span className="groupDetail">
                <span className="groupCreatedAtGD">
                  since {new Date(group.createdAt).toLocaleDateString()}
                </span>

                <span className="sinceNIsGroupPublicGD">|</span>

                <span className="isGroupPublicGD">
                  {group.isPublic ? "공개" : "비공개"}
                </span>

                <span className="modifyGroupButtonGD" onClick={handleEditClick}>
                  그룹 정보 수정하기
                </span>
                <span
                  className="deleteGroupButtonGD"
                  onClick={handleDeleteClick}
                >
                  그룹 삭제하기
                </span>

                <div className="aboutGroup">
                  <span className="groupNameGD">{group.name}</span>

                  <span className="postGD">
                    추억 <span className="postCountGD"> {group.postCount}</span>
                  </span>

                  <span className="postCountNLikeCountGD">|</span>

                  <span className="LikeGD">
                    그룹 공감{" "}
                    <span className="LikeCountGD">{group.groupLikeCount}</span>
                  </span>
                </div>
                <div className="groupIntroductionGD">{group.introduction}</div>
              </span>

              {isEditModalOpen && (
                <GroupEditModal
                  groupId={groupId}
                  initialData={group}
                  onClose={() => setIsEditModalOpen(false)}
                  onSuccess={handleEditSuccess}
                  onFailure={handleEditFailure}
                />
              )}
              {isDeleteModalOpen && (
                <GroupDeleteModal
                  onDeleteConfirm={handleDeleteConfirm} // 비밀번호를 받아 삭제를 진행
                  onClose={handleDeleteClose}
                />
              )}

              {isFailureModalOpen && (
                <div className="modal">
                  <div className="modal-content">
                    <h3>그룹 삭제 실패</h3>
                    <p>{failureMessage}</p>
                    <button onClick={handleFailureModalClose}>확인</button>
                  </div>
                </div>
              )}

              <div className="sendLikeGD" onClick={handleLikeClick}>
                <img src={flower} alt="공감" />
                <span id="sendLikeGD">공감 보내기</span>
              </div>
            </div>

            <hr />

            <div className="groupPostsListGD">
              <div className="groupPostListHeaderGD">
                <div className="titleGD">추억 목록</div>

                <div className="makeGroupGD">
                  <button id="makeGroupGD" className="makeGroupButtonGD">
                    <span className="makeGroupLabelGD">추억 올리기</span>
                  </button>
                </div>

                <div className="menuGD">
                  <span className="isPublicGD">
                    <span
                      className="publicGD ${isPublic ? 'active' : ''}"
                      id="publicLetterGD"
                      onClick={handleIsPublic}
                    >
                      공개
                    </span>
                    <span
                      className="privateGD ${!isPublic ? 'active' : ''}"
                      id="privateLetterGD"
                      onClick={handleIsPublic}
                    >
                      비공개
                    </span>
                  </span>

                  <span className="searchGD">
                    <img id="searchImgGD" src={searchImg} alt="돋보기" />
                    <input
                      className="searchBoxGD"
                      placeholder="그룹명을 검색해주세요"
                      value={search}
                      onChange={handleSearch}
                    />
                  </span>

                  <div>
                    <select className="selectButtonGD">
                      <option>최신순</option>
                      <option>게시글 많은 순</option>
                      <option>공감순</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="GroupPostsGD">
              {isPublic ? <PublicPostsList /> : <PrivatePostsList />}
            </div>
            {/* <div className="moreGD">
              <div className="addButtonGD">더보기</div>
            </div> */}
          </div>
        </>
      )}
    </div>
  );
};

export default GroupDetailPage;
