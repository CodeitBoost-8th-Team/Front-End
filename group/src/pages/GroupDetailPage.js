import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './GroupDetailPage.css';

const GroupDetailPage = () => {
  const { groupId } = useParams();
  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGroupDetails = async () => {
      try {
        const response = await axios.get(`/api/groups/${groupId}`);
        setGroup(response.data);
      } catch (error) {
        setError("그룹 정보를 가져오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchGroupDetails();
  }, [groupId]);

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="group-detail-page">
      {group && (
        <>
          <h2>{group.name}</h2>
          <p>{group.introduction}</p>
          <img src={group.imageUrl} alt={group.name} />
          <p>{group.isPublic ? '공개' : '비공개'}</p>
        </>
      )}
    </div>
  );
};

export default GroupDetailPage;
