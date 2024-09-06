import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PublicPostsList.css";
import flower from "../../img/flower.png";

const BASE_URL = "http://3.39.56.63";

function PublicPostsList({ posts }) {
  const navigate = useNavigate();

  const handleGroupClick = (postId) => {
    navigate(`/posts/${postId}/private`);
  };

  if (!posts) {
    return <div> 게시글이 없습니다</div>;
  }

  return (
    <div className="privatePostPGL">
      {posts.map((post) => (
        <div
          key={post.postId}
          className="postCardNPGL"
          onClick={() => handleGroupClick(post.postId)}
        >
          <div className="postInfoNPGL">
            <span className="postNicknameNP">{post.nickname}</span>
            <span className="postNicknameNisPublicNP">|</span>
            <span className="postIsPublicNP">{post.isPublic}</span>

            <div className="postTitleNP">{post.content}</div>
            <div className="postTagsNP">
              <span className="postTagNP">{post.tagId}</span>
            </div>

            <div className="postCardFooterNP">
              <span className="postLocationNP">{post.location}</span>
              <span className="postMomentNP">· {post.moment}</span>

              <span className="postLikeNCommentNP">
                <span className="postLikeNP">
                  <img src="./flower.png" />
                  <span className="postLikeCountNP">{post.likeCount}</span>
                </span>

                <span className="postCommentNP">
                  <img src="./commentImg.png" />
                  <span className="postCommentCountNP">
                    {post.commentCount}
                  </span>
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
