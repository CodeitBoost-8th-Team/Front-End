import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import GroupEditModal from '../components/GroupEditModal';
import GroupDeleteModal from '../components/GroupDeleteModal';
import './GroupDetailPage.css';

const GroupDetailPage = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    const fetchGroupDetails = async () => {
      try {
        const response = await axios.get(`http://3.39.56.63/api/groups/${groupId}`);
        console.log('Group Details Response:', response.data);
        setGroup(response.data);
      } catch (error) {
        setError("그룹 정보를 가져오는 데 실패했습니다.");
        console.error('그룹 상세 정보 불러오기 실패:', error);
      } finally {
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

  const handleDeleteConfirm = async (password) => { 
    try {
      await axios.delete(`http://3.39.56.63/api/groups/${groupId}`, {
        data: { groupPassword: password },
      });
      navigate('/'); 
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

  return (
    <div className="group-detail-page">
      {group && (
        <>
          <div className="group-header">
            <div className="group-info">
              {/* 이미지 경로가 백엔드의 API 경로와 일치하는지 확인 */}
              <img src={`http://3.39.56.63${group.imageUrl}`} alt={group.name} className="group-image" />
              
              <div className="group-text">
              <p className="group-since">
                  <span className="group-date">since {new Date(group.createdAt).toLocaleDateString()}</span>
                  <span className="group-separator"> | </span>
                  <span className="group-visibility">{group.isPublic ? '공개' : '비공개'}</span>
              </p>
                <h2>{group.name}</h2>
                <p>{group.introduction}</p>
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
            <GroupDeleteModal
              onDeleteConfirm={handleDeleteConfirm}
              onClose={handleDeleteClose}
            />
          )}
        </>
      )}
    </div>
  );
};

export default GroupDetailPage;
