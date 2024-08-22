import React, { useState } from 'react';
import axios from 'axios';
import './GroupForm.css';

const GroupForm = ({ onSuccess, onFailure }) => {
  const [groupName, setGroupName] = useState('');
  const [groupImage, setGroupImage] = useState(null);
  const [groupDescription, setGroupDescription] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [isPrivate, setIsPrivate] = useState(false);
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', groupName);
    formData.append('image', groupImage); 
    formData.append('description', groupDescription);
    formData.append('isPublic', isPublic && !isPrivate);
    formData.append('password', password);

    try {
      const response = await axios.post('/api/groups', formData);
      if (response.status === 201) {
        onSuccess(response.data.id); // 생성된 그룹 ID 전달
      } else {
        onFailure("그룹 생성에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      onFailure("그룹 생성 중 오류가 발생했습니다. 다시 시도해주세요.");
      console.error('그룹 생성 중 오류 발생:', error);
    }
  };

  // 공개, 비공개 버튼 배타적으로 작동
  const handlePublicChange = () => {
    setIsPublic(true);
    setIsPrivate(false);
  };

  const handlePrivateChange = () => {
    setIsPrivate(true);
    setIsPublic(false);
  };

  return (
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
      <div className="file-input-container">
        <label>대표 이미지:</label>
        <input
          type="file"
          onChange={(e) => setGroupImage(e.target.files[0])}
          required
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

      <div>
        <label className="group-visibility-label">그룹 공개 여부:</label>
      </div>

      <div className="switch-container">
        <label>
          <input
            type="checkbox"
            checked={isPublic}
            onChange={handlePublicChange}
          />
          공개
        </label>
        <label>
          <input
            type="checkbox"
            checked={isPrivate}
            onChange={handlePrivateChange}
          />
          비공개
        </label>
      </div>
      <div>
        <label>비밀번호:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">만들기</button>
    </form>
  );
};

export default GroupForm;
