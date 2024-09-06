import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import GroupEditModal from "../../components/group/GroupEditModal"; // 그룹 수정 모달
import GroupDeleteModal from "../../components/group/GroupDeleteModal"; // 그룹 삭제 모달
import PublicPostsList from "./PublicPostsList"; // 공개 게시글 목록 컴포넌트
import PrivatePostsList from "./PrivatePostsList"; // 비공개 게시글 목록 컴포넌트
import "./GroupDetailPage.css"; // 스타일링 파일
import flower from "../../img/flower.png"; // 이미지 파일
import logo from "../../img/logo.jpg"; // 이미지 파일
import searchImg from "../../img/searchImg.png"; // 검색 아이콘

const GroupDetailPage = () => {
  // URL에서 그룹 ID를 가져옴
  const { groupId } = useParams();
  const location = useLocation(); // 다른 페이지에서 넘어온 그룹 데이터를 받을 때 사용
  const navigate = useNavigate(); // 페이지 이동에 사용

  // 상태 관리
  const [group, setGroup] = useState(location.state?.groupDetails || null); // 그룹 데이터 저장
  const [groups, setGroups] = useState([]); // 그룹 목록 저장 (추가 기능용)
  const [currentPage, setCurrentPage] = useState(1); // 페이지네이션 상태 (추가 기능용)
  const [loading, setLoading] = useState(!group); // 로딩 상태 (데이터가 없으면 true)
  const [error, setError] = useState(null); // 에러 메시지
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // 그룹 수정 모달 상태
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // 그룹 삭제 모달 상태
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false); // 성공 모달 상태
  const [isFailureModalOpen, setIsFailureModalOpen] = useState(false); // 실패 모달 상태
  const [failureMessage, setFailureMessage] = useState(""); // 실패 메시지
  const [grouplikeCount, setGroupLikeCount] = useState(0); // 그룹 공감 수
  const [isPublic, setIsPublic] = useState(true); // 공개/비공개 상태
  const [search, setSearch] = useState(""); // 검색어 상태

  // 그룹 상세 정보를 가져오는 함수
  useEffect(() => {
    const fetchGroupDetails = async () => {
      if (!group) {
        try {
          const response = await axios.get(
            `http://3.39.56.63/api/groups/${groupId}`
          );
          setGroup(response.data); // 그룹 데이터를 설정
        } catch (error) {
          if (error.response?.status === 403) {
            // 비공개 그룹일 경우 비밀번호 입력 페이지로 이동
            navigate(`/groups/${groupId}/private`);
          } else {
            setError("그룹 정보를 가져오는 데 실패했습니다.");
          }
        } finally {
          setLoading(false); // 로딩 종료
        }
      }
    };

    fetchGroupDetails();
  }, [groupId, group, navigate]);

  // 게시글 목록을 가져오는 함수
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `http://3.39.56.63/api/groups/${groupId}/posts`
        );
        setGroup((prevGroup) => ({
          ...prevGroup,
          posts: response.data.posts, // 게시글 목록 설정
        }));
      } catch (error) {
        console.error("게시글 데이터를 가져오는 데 실패했습니다.", error);
      }
    };

    if (groupId) {
      fetchPosts();
    }
  }, [groupId]);

  // 공개/비공개 상태 전환
  const handleIsPublic = (e) => {
    const isPublicSelected = e.target.id === "publicLetterGD";
    setIsPublic(isPublicSelected);
  };

  // 공감 보내기 핸들러
  const handleLikeClick = async () => {
    try {
      const response = await axios.post(
        `http://3.39.56.63/api/groups/${groupId}/like`
      );
      if (response.status === 200) {
        setGroup((prevGroup) => {
          const updatedGroup = {
            ...prevGroup,
            groupLikeCount: Number(prevGroup.groupLikeCount) + 1,
          };
          return updatedGroup;
        });
      }
    } catch (error) {
      console.error("공감 수 업데이트 실패:", error);
    }
  };

  // 그룹 수정 버튼 클릭
  const handleEditClick = () => {
    setIsDeleteModalOpen(false); // 다른 모달 닫기
    setIsEditModalOpen(true); // 수정 모달 열기
  };

  // 그룹 삭제 버튼 클릭
  const handleDeleteClick = () => {
    setIsEditModalOpen(false); // 다른 모달 닫기
    setIsDeleteModalOpen(true); // 삭제 모달 열기
  };

  // 그룹 삭제 확정 핸들러
  const handleDeleteConfirm = async (password) => {
    try {
      const response = await axios.delete(
        `http://3.39.56.63/api/groups/${groupId}`,
        {
          data: { groupPassword: password },
        }
      );

      if (response.status === 200) {
        setIsDeleteModalOpen(false); // 모달 닫기
        setIsSuccessModalOpen(true); // 성공 모달 열기
      }
    } catch (error) {
      console.error("그룹 삭제 중 오류 발생:", error);

      setFailureMessage(
        error.response?.data?.message || "그룹 삭제에 실패했습니다."
      );
      setIsDeleteModalOpen(false);
      setIsFailureModalOpen(true); // 실패 모달 열기
    }
  };

  const handleDeleteClose = () => {
    setIsDeleteModalOpen(false);
  };

  const handleSuccessModalClose = () => {
    setIsSuccessModalOpen(false);
    navigate("/"); // 메인 페이지로 이동
  };

  const handleFailureModalClose = () => {
    setIsFailureModalOpen(false);
  };

  const handleEditSuccess = (updatedGroup) => {
    setGroup(updatedGroup); // 수정된 그룹 정보 설정
    setIsEditModalOpen(false); // 수정 모달 닫기
  };

  const handleEditFailure = (message) => {
    alert(message);
    setIsEditModalOpen(false);
  };

  const handleCreatePost = () => {
    navigate("/groups/{groupId}/posts");
  };

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
                  onDeleteConfirm={handleDeleteConfirm}
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
                  <button
                    id="makeGroupGD"
                    className="makeGroupButtonGD"
                    onClick={handleCreatePost}
                  >
                    <span className="makeGroupLabelGD">추억 올리기</span>
                  </button>
                </div>

                <div className="menuGD">
                  <span className="isPublicGD">
                    <span
                      className={`publicGD ${isPublic ? 'active' : ''}`}
                      id="publicLetterGD"
                      onClick={handleIsPublic}
                    >
                      공개
                    </span>
                    <span
                      className={`privateGD ${!isPublic ? 'active' : ''}`}
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
                      // onChange={handleSearch} // 검색 기능 구현 필요시
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
              {isPublic ? (
                <PublicPostsList posts={group.posts} />
              ) : (
                <PrivatePostsList posts={group.posts} />
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default GroupDetailPage;
