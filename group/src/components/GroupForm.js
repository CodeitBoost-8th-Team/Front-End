import React, { useState } from 'react';
import axios from 'axios';
import './GroupForm.css';

const GroupForm = ({ onSuccess, onFailure }) => {
  const [groupName, setGroupName] = useState('');
  const [groupPassword, setGroupPassword] = useState(''); 
  const [groupImage, setGroupImage] = useState(null);
  const [groupDescription, setGroupDescription] = useState('');
  const [isPublic, setIsPublic] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // 1. 이미지 파일을 서버로 업로드
      const imageData = new FormData();
      imageData.append('image', groupImage);
  
      const imageUploadResponse = await axios.post('http://3.39.56.63/api/image', imageData);
      console.log('Image Upload Response:', imageUploadResponse.data);
      const imageUrl = imageUploadResponse.data.imageUrl;
  
      // 2. 업로드된 이미지의 URL을 그룹 생성 요청에 포함
      const formData = {
        name: groupName,
        groupPassword: groupPassword,
        imageUrl: imageUrl,
        introduction: groupDescription,
        isPublic: isPublic,
      };
  
      const response = await axios.post('http://3.39.56.63/api/groups', formData);
      console.log('Group Creation Response:', response.data);
  
      // 백엔드에서 반환된 groupId가 response.data.groupId로 접근 가능한지 확인
      if (response.status === 201) {
        onSuccess(response.data.groupId);  // groupId에 접근해서 전달
      } else {
        onFailure("그룹 생성에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      onFailure("그룹 생성 중 오류가 발생했습니다. 다시 시도해주세요.");
      console.error('그룹 생성 중 오류 발생:', error);
    }
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
      <button type="submit">만들기</button>
    </form>
  );
};

export default GroupForm;
