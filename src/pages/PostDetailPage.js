import React from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const PostDetailPage = () => {
  const navigate = useNavigate();
  const { postId } = useParams(); // postId 파라미터 가져오기
  const [post, setPost] = useState(null); // 게시글 데이터 상태 추가
  const [loading, setLoading] = useState(true); // 로딩 상태 추가

  useEffect(() => {
    // 컴포넌트가 마운트될 때 API 호출
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `http://3.39.56.63:3000/api/posts/${postId}`
        );
        setPost(response.data); // 서버로부터 받은 데이터로 상태 업데이트
      } catch (error) {
        console.error("게시글 불러오기 중 오류 발생:", error);
      } finally {
        setLoading(false); // 로딩 완료
      }
    };

    fetchPost();
  }, [postId]);

  const handleModifyPost = () => {
    navigate("/modify-post");
  };

  const handleDeletePost = () => {
    navigate("/delete-post");
  };

  // 테스트용
  const handleCreatePost = () => {
    navigate("/create-post");
  };

  return (
    <div>
      <h1>게시글 상세 페이지</h1>
      <button onClick={handleModifyPost}>추억 수정하기</button>
      <button onClick={handleDeletePost}>추억 삭제하기</button>
      {/* 테스트용 */}
      <button onClick={handleCreatePost}>추억 등록하기</button>
    </div>
  );
};

export default PostDetailPage;
