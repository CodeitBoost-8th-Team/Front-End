import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PostDeleteModal.css";
import blackX from "../../img/X_black.png";

function PostDeleteModal({ postId, onDeleteConfirm, onClose }) {
  const navigate = useNavigate();
  const [postPassword, setPostPassword] = useState("");

  const handleDelete = (e) => {
    e.preventDefault(); // 폼 제출 시 페이지 리로드 방지
    onDeleteConfirm(postPassword);
  };

  return (
    <div className="postDeleteModalD">
      <div className="headerD">
        <img className="XD" src={blackX} alt="X" onClick={onClose} />
        <div id="contentHeaderD">추억 삭제</div>
      </div>

      <form>
        <div className="deleteContentD">
          <div className="contentHeaderD">삭제 권한 인증</div>
          <input
            className="passwordD"
            type="password"
            value={postPassword}
            onChange={(e) => setPostPassword(e.target.value)}
            placeholder="비밀번호를 입력해주세요"
            required
          />
        </div>
        <div>
          <button
            className="deleteButtonD"
            type="submit"
            onClick={handleDelete}
          >
            삭제하기
          </button>
        </div>
      </form>
    </div>
  );
}
export default PostDeleteModal;
