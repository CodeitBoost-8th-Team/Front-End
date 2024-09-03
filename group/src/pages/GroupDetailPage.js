import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../img/logo.jpg'; 
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
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isFailureModalOpen, setIsFailureModalOpen] = useState(false);
  const [failureMessage, setFailureMessage] = useState('');

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
    setIsDeleteModalOpen(false); // 다른 모달을 닫음
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = () => {
    setIsEditModalOpen(false); // 다른 모달을 닫음
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async (password) => { 
    try {
      const response = await axios.delete(`http://3.39.56.63/api/groups/${groupId}`, {
        data: { groupPassword: password },
      });

      if (response.status === 200) {
        setIsDeleteModalOpen(false);
        setIsSuccessModalOpen(true);
      }
    } catch (error) {
      console.error("그룹 삭제 중 오류 발생:", error);

      setFailureMessage(error.response?.data?.message || "그룹 삭제에 실패했습니다.");
      setIsDeleteModalOpen(false);
      setIsFailureModalOpen(true);
    }
  };

  const handleDeleteClose = () => {
    setIsDeleteModalOpen(false);
  };

  const handleSuccessModalClose = () => {
    setIsSuccessModalOpen(false);
    navigate('/'); 
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

  return (
    <div className="group-detail-page">
      <div className="logo-container">
        <img src={logo} alt="Logo" />
      </div>
      {group && (
        <>
          <div className="group-header">
            <div className="group-info">
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

          {isSuccessModalOpen && (
            <div className="modal">
              <div className="modal-content">
                <h3>그룹 삭제 성공!</h3>
                <p>그룹이 삭제되었습니다.</p>
                <button onClick={handleSuccessModalClose}>확인</button>
              </div>
            </div>
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
        </>
      )}
    </div>
  );
};

export default GroupDetailPage;
