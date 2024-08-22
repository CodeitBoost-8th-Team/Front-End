import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import GroupEditModal from '../components/GroupEditModal';
import DeleteModal from '../components/DeleteModal';  // 삭제 모달 추가
import './GroupDetailPage.css';

const GroupDetailPage = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);  // 삭제 모달 상태 추가

  useEffect(() => {
    const fetchGroupDetails = async () => {
      try {
        const response = await axios.get(`/api/groups/${groupId}`);
        setGroup(response.data);
        setLoading(false);
      } catch (error) {
        setError("그룹 정보를 가져오는데 실패했습니다.");
        setLoading(false);
      }
    };

    fetchGroupDetails();
  }, [groupId]);

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>{error}</p>;

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async (password) => {  // 비밀번호 인자로 받음
    try {
      await axios.delete(`/api/groups/${groupId}`, {
        data: { password },  // 비밀번호를 요청 본문에 포함시켜 전송
      });
      navigate('/');  // 그룹 삭제 후 메인 페이지로 이동
    } catch (error) {
      console.error("그룹 삭제 중 오류 발생:", error);
    } finally {
      setIsDeleteModalOpen(false);
    }
  };

  const handleDeleteClose = () => {
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="group-detail-page">
      {group && (
        <>
          <div className="group-header">
            <div className="group-info">
              <img src={group.image} alt={group.name} className="group-image" />
              <div className="group-text">
                <p className="group-since">since {new Date(group.createdAt).toLocaleDateString()} | {group.isPublic ? '공개' : '비공개'}</p>
                <h2>{group.name}</h2>
                <p>{group.description}</p>
              </div>
            </div>
            <div className="group-actions">
                <button onClick={handleEditClick}>그룹 정보 수정하기</button>
                <button onClick={handleDeleteClick}>그룹 삭제하기</button>
            </div>
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
            <DeleteModal
              onDeleteConfirm={handleDeleteConfirm}  // 비밀번호를 받아 삭제를 진행
              onClose={handleDeleteClose}
            />
          )}
        </>
      )}
    </div>
  );
};

export default GroupDetailPage;


