import React, { useState } from 'react';
import axios from 'axios';
import './GroupEditModal.css';

const GroupEditModal = ({ groupId, initialData, onClose, onSuccess, onFailure }) => {
  const [groupName, setGroupName] = useState(initialData.name || '');
  const [groupPassword, setGroupPassword] = useState('');  // 비밀번호 추가
  const [groupImage, setGroupImage] = useState(null);
  const [groupDescription, setGroupDescription] = useState(initialData.introduction || '');
  const [isPublic, setIsPublic] = useState(initialData.isPublic || true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', groupName);
    formData.append('groupPassword', groupPassword); // 비밀번호 추가
    formData.append('imageUrl', groupImage);
    formData.append('introduction', groupDescription);
    formData.append('isPublic', isPublic);

    try {
      const response = await axios.put(`/api/groups/${groupId}`, formData);
      if (response.status === 200) {
        onSuccess(response.data);
      } else {
        onFailure("그룹 수정에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      onFailure("그룹 수정 중 오류가 발생했습니다. 다시 시도해주세요.");
      console.error('그룹 수정 중 오류 발생:', error);
    }
  };

  return (
    <div className="modal">
      <h3>그룹 정보 수정</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>그룹명:</label>
          <input
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>비밀번호:</label>
          <input
            type="password"
            value={groupPassword}
            onChange={(e) => setGroupPassword(e.target.value)}
            required
          />
        </div>
        <div className="file-input-container">
          <label>대표 이미지:</label>
          <input
            type="file"
            onChange={(e) => setGroupImage(e.target.files[0])}
          />
        </div>
        <div>
          <label>그룹 소개:</label>
          <textarea
            value={groupDescription}
            onChange={(e) => setGroupDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="switch-container">
          <label>
            <input
              type="checkbox"
              checked={isPublic}
              onChange={() => setIsPublic(true)}
            />
            공개
          </label>
          <label>
            <input
              type="checkbox"
              checked={!isPublic}
              onChange={() => setIsPublic(false)}
            />
            비공개
          </label>
        </div>
        <button type="submit">수정하기</button>
        <button type="button" onClick={onClose}>닫기</button>
      </form>
    </div>
  );
};

export default GroupEditModal;
