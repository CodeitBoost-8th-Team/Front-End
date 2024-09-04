import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PublicGroupsList.css";
import flower from "../img/flower.png";

const BASE_URL = "http://3.39.56.63";

function PublicGroupsList({ groups }) {
  const navigate = useNavigate();

  const handleGroupClick = (groupId) => {
    navigate(`/groups/${groupId}`);
  };

  if (!groups) {
    return <div>Loading...</div>; // 데이터가 로드되지 않았을 때 로딩 표시
  }

  return (
    <div className="publicGroupPGL">
      {groups.map((group) => (
        <div
          key={group.id}
          className="groupCardPGL"
          onClick={() => handleGroupClick(group.groupId)}
        >
          <div className="groupImagePGL">
            <img src={`http://3.39.56.63/${group.imageUrl}`} alt={group.name} />
          </div>
          <div className="groupInfoPGL">
            <span className="createdAtPGL">
              since {new Date(group.createdAt).toLocaleDateString()}
            </span>
            <span className="sinceNpublicPGL">|</span>
            <span className="isPublicPGL">공개</span>
            <div className="namePGL">{group.name}</div>
            <div className="introductionPGL">{group.introduction}</div>
            <div className="containerPGL">
              <div className="postPGL">
                <div className="postCountLetterPGL">추억</div>
                <div className="postCountPGL">{group.postCount}</div>
              </div>
              <div className="likePGL">
                <div className="likeCountLetterPGL">그룹 공감</div>
                <div className="imgNcountPGL">
                  <img src={flower} alt="공감이미지" />
                  <div className="likeCountPGL">{group.groupLikeCount}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PublicGroupsList;
