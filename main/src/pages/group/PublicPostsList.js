import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PublicPostsList.css";
import imageUrl from "../../img/flower.png";

const BASE_URL = "http://3.39.56.63";

function PublicPostsList({ posts }) {
  const navigate = useNavigate();

  const handleGroupClick = (postId) => {
    navigate(`/posts/${postId}`);
  };

  if (!posts) {
    return <div>Loading...</div>; // 데이터가 로드되지 않았을 때 로딩 표시
  }

  return (
    <div className="publicPostPGL">
      {posts.map((post) => (
        <div
          key={post.postId}
          className="postCardPGL"
          onClick={() => handleGroupClick(post.postId)}
        >
          <div className="postImagePGL">
            <img src={post.imageUrl || imageUrl} alt="Post Image" />
          </div>

          <div className="postInfoPGL">
            <span className="postNicknameP">{post.nickname}</span>
            <span className="postNicknameNisPublicP">|</span>
            <span className="postIsPublicP">{post.isPublic}</span>

            <div className="postTitleP">{post.content}</div>
            <div className="postTagsP">
              <span className="postTagP">{post.tagId}</span>
            </div>

            <div className="postCardFooterP">
              <span className="postLocationP">{post.location}</span>
              <span className="postMomentP">· {post.moment}</span>

              <span className="postLikeNCommentP">
                <span className="postLikeP">
                  <img src="./flower.png" />
                  <span className="postLikeCountP">{post.likeCount}</span>
                </span>

                <span className="postCommentP">
                  <img src="./commentImg.png" />
                  <span className="postCommentCountP">{post.commentCount}</span>
                </span>
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PublicPostsList;
