import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PrivateGroupsList.css";
import flower from "../img/flower.png";

const BASE_URL = "http://3.39.56.63:3000";

function PrivateGroupsList({ groupPassword }) {
  const [groups, setGroups] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // API 호출 시 필요한 groupPassword를 사용하여 데이터 가져오기
    const fetchGroups = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/groups/private`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ groupPassword }),
        });

        if (response.status === 200) {
          const data = await response.json();
          setGroups(data);
        } else if (response.status === 404) {
          setError("그룹을 찾을 수 없습니다.");
        } else if (response.status === 401) {
          setError("비밀번호가 틀렸습니다.");
        } else {
          setError("알 수 없는 오류가 발생했습니다.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("서버와의 통신에 실패했습니다.");
      }
    };

    fetchGroups();
  }, [groupPassword]);

  const handleGroupClick = (groupId) => {
    navigate(`/groups/:groupId`);
  };

  if (!groups) {
    return <div>Loading...</div>; // 데이터가 로드되지 않았을 때 로딩 표시
  }

  return (
    <div className="privateGroupNPGL">
      {groups.map((group) => (
        <div
          key={group.id}
          className="groupCardNPGL"
          onClick={() => handleGroupClick(group.id)}
        >
          <span className="createdAtNPGL">
            since {new Date(group.createdAt).toLocaleDateString()}
          </span>
          <span className="sinceNpublicNPGL">|</span>
          <span className="isPublicNPGL">비공개</span>
          <div className="nameNPGL">{group.name}</div>
          <div className="containerNPGL">
            <div className="postNPGL">
              <div className="postCountLetterNPGL">추억</div>
              <div className="postCountNPGL">{group.postCount}</div>
            </div>
            <div className="likeNPGL">
              <div className="likeCountLetterNPGL">그룹 공감</div>
              <div className="imgNcountNPGL">
                <img src={flower} alt="공감이미지" />
                <div className="likeCountNPGL">{group.groupLikeCount}</div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PrivateGroupsList;
