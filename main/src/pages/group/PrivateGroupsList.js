import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PrivateGroupsList.css";
import flower from "../../img/flower.png";

const BASE_URL = "http://3.39.56.63";

function PrivateGroupsList({ groups }) {
  const navigate = useNavigate();

  const handleGroupClick = (groupId) => {
    navigate(`/groups/${groupId}/private`);
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
          onClick={() => handleGroupClick(group.groupId)}
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
