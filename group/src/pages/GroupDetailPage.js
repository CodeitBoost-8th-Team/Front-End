import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import GroupEditModal from "../components/GroupEditModal";
import GroupDeleteModal from "../components/GroupDeleteModal";
import PublicGroupsList from "./PublicGroupsList";
import PrivateGroupsList from "./PrivateGroupsList";
import "./GroupDetailPage.css";
import flower from "../img/flower.png";
import logo from "../img/logo.jpg";
import img1 from "../img/Img1.png";
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
  const [likeCount, setLikeCount] = useState(0);
  const [isPublic, setIsPublic] = useState(true);

  const handleIsPublic = (e) => {
    setIsPublic(e.target.data);
  };

  const handleLikeClick = () => {
    setLikeCount(likeCount + 1);
    // 추가적인 로직 (예: 서버에 공감 보내기)
  };

  useEffect(() => {
    const fetchGroupDetails = async () => {
      try {
        const response = await axios.get(
          `http://3.39.56.63/api/groups/${groupId}`
        );
        console.log("Group Details Response:", response.data);
        setGroup(response.data);
      } catch (error) {
        setError("그룹 정보를 가져오는 데 실패했습니다.");
        console.error("그룹 상세 정보 불러오기 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGroupDetails();
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
  //   navigate("/groups/groupId/posts");
  // };

  return (
    <div className="group-detail-page">
      {group && (
        <>
          <div className="groupDetailGD">
            <div className="headerGD">
              <div className="headerLogoGD">
                <img id="logo" src={logo} alt="로고" />
              </div>
            </div>

            <div className="groupGD">
              <span className="groupImgGD">
                {/* <img src={`http://3.39.56.63${group.imageUrl}`} alt={group.name} /> */}
                <img src={img1} alt="이미지" />
              </span>

              <div className="groupCreatedAtGD">
                {/* since {new Date(group.createdAt).toLocaleDateString()} */}
                since 2023.12.29
              </div>

              <div className="sinceNIsGroupPublicGD">|</div>

              <div className="isGroupPublicGD">
                {/* {group.isPublic ? "공개" : "비공개"} */}
                공개
              </div>

              {/* <div className="groupNameGD">{group.name}</div> */}
              <div className="groupNameGD">달봉이네 가족</div>

              <div className="postGD">
                {/* 추억 <span classNameName="postCountGD">{group.postCount}</span>  */}
                추억 <span classNameName="postCountGD">8</span>
              </div>

              <div className="postCountNLikeCountGD">|</div>

              <div className="LikeGD">
                {/* 그룹 공감 <span classNameName="LikeCountGD">{group.groupLikeCount}</span> */}
                그룹 공감 <span classNameName="LikeCountGD">1.5K</span>
              </div>

              {/* <div className="groupIntroductionGD">{group.introduction}</div> */}
              <div className="groupIntroductionGD">
                모시기모시기한 가족입니다.
              </div>
              <div className="modifyGroupButtonGD" onClick={handleEditClick}>
                그룹 정보 수정하기
              </div>
              <div className="deleteGroupButtonGD" onClick={handleDeleteClick}>
                그룹 삭제하기
              </div>

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
                    >
                      공개
                    </span>
                    <span
                      className="privateGD ${!isPublic ? 'active' : ''}"
                      id="privateLetterGD"
                    >
                      비공개
                    </span>
                  </span>

                  <span className="searchGD">
                    <img id="searchImgGD" src={searchImg} alt="돋보기" />
                    <input
                      className="searchBoxGD"
                      placeholder="그룹명을 검색해주세요"
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

            <div className="GroupPostsGD" onChange={handleIsPublic}>
              {isPublic ? <PublicGroupsList /> : <PrivateGroupsList />}
            </div>
            <div className="moreGD">
              <div className="addButtonGD">더보기</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default GroupDetailPage;
