import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./PostDeleteModal.css";
import blackX from "../img/X_black.png";

function PostDeleteModal({ onSuccess, onFailure }) {
  const navigate = useNavigate();
  const [postPassword, setPostPassword] = useState("");

  const handleDelete = async (e) => {
    try {
      // 서버에 데이터 전송
      const response = await axios.delete(
        "http://3.39.56.63/posts/{postId}",
        postPassword
      );
      if (response.status === 200) {
        onSuccess(response.data);
        navigate("/");
      } else if (response.status === 400) {
        onFailure("잘못된 요청입니다.");
      } else if (response.status === 401) {
        onFailure("비밀번호가 틀렸습니다.");
      } else if (response.status === 404) {
        onFailure("존재하지 않습니다.");
      }
    } catch (error) {
      onFailure("게시글 삭제 중 오류 발생");
      console.error("게시글 삭제 중 오류 발생: ", error);
    }
  };

  const onClose = () => {
    navigate("/");
  };

  return (
    <div className="postDeleteModalD">
      <div className="headerD">
        <img className="XD" src={blackX} alt="X" onClick={onClose} />
        <div id="contentHeaderD">추억 삭제</div>
      </div>

      <form onSubmit={handleDelete}>
        <div className="deleteContentD">
          <div className="contentHeaderD">삭제 권한 인증</div>
          <input
            className="passwordD"
            type="password"
            value={postPassword}
            onChange={(e) => setPostPassword(e.target.value)}
            placeholder="비밀번호를 입력해주세요"
          />
        </div>
        <div>
          <button className="deleteButtonD" type="submit">
            삭제하기
          </button>
        </div>
      </form>
    </div>
  );
}
export default PostDeleteModal;