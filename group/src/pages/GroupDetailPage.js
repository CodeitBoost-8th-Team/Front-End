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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
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
          `http://3.39.56.63:3000/api/groups/${groupId}`
        );
        setGroup(response.data);
        setLoading(false);
      } catch (error) {
        if (error.response) {
          const status = error.response.status;
          if (status === 403) {
            // 비공개 그룹 처리
            setError("비공개 그룹입니다. 접근 권한이 필요합니다.");
            try {
              const privateResponse = await axios.post(
                `http://3.39.56.63:3000/api/groups/${groupId}/private`
              );
              setGroup(privateResponse.data);
            } catch (privateError) {
              setError(
                privateError.response?.data?.message ||
                  "비공개 그룹에 접근할 수 없습니다."
              );
            }
          } else if (status === 404) {
            setError("그룹을 찾을 수 없습니다.");
          } else if (status === 400) {
            setError("잘못된 요청입니다.");
          } else {
            setError("그룹 정보를 가져오는 데 실패했습니다.");
          }
        } else {
          setError("네트워크 오류가 발생했습니다.");
        }
        setLoading(false);
      }
    };

    fetchGroupDetails();
  }, [groupId]);

  // if (loading) return <p>로딩 중...</p>;
  // if (error) return <p>{error}</p>;

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async (password) => {
    // 비밀번호 인자로 받음
    try {
      await axios.delete(`http://3.39.56.63:3000/api/groups/${groupId}`, {
        data: { groupPassword: password }, // 비밀번호를 요청 본문에 포함시켜 전송
      });
      navigate("/"); // 그룹 삭제 후 메인 페이지로 이동
    } catch (error) {
      console.error("그룹 삭제 중 오류 발생:", error);
    } finally {
      setIsDeleteModalOpen(false);
    }
  };

  const handleDeleteClose = () => {
    setIsDeleteModalOpen(false);
  };

  const handleEditSuccess = (updatedGroup) => {
    setGroup(updatedGroup);
    setIsEditModalOpen(false);
  };

  const handleEditFailure = (message) => {
    alert(message);
    setIsEditModalOpen(false);
  };

  // 추억 만들기 버튼 -> 페이지 이동 (폴더 정리/수정 필요)
  // const handleCreatePost = () => {
  //   navigate("/groups/groupId/posts");
  // };

  return (
    <div className="groupDetailGD">
      <div className="headerGD">
        <div className="headerLogoGD">
          <img id="logo" src={logo} alt="로고" />
        </div>
      </div>
      <div className="groupGD">
        <span className="groupImgGD">
          {/* <img src={group.imageUrl} alt={group.name} /> */}
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
          추억 <span classNameName="postCountGD">8</span>
        </div>
        <div className="postCountNLikeCountGD">|</div>
        <div className="LikeGD">
          그룹 공감 <span classNameName="LikeCountGD">1.5K</span>
        </div>
        {/* <div className="groupIntroductionGD">{group.introduction}</div> */}
        <div className="groupIntroductionGD">모시기모시기한 가족입니다.</div>
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
            className="GroupDeleteModal"
            onDeleteConfirm={handleDeleteConfirm} // 비밀번호를 받아 삭제를 진행
            onClose={handleDeleteClose}
          />
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
      <div className="GroupPostsGD" onChange={handleIsPublic}>
        {isPublic ? <PublicGroupsList /> : <PrivateGroupsList />}
      </div>
      <div className="moreGD">
        <div className="addButtonGD">더보기</div>
      </div>
    </div>
  );
};

export default GroupDetailPage;
