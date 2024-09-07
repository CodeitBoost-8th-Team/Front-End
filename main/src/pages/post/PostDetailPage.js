// import React from "react";
// import axios from "axios";
// import { useNavigate, useParams } from "react-router-dom";
// import { useState, useEffect } from "react";
// import PostModifyModal from "../components/PostModifyModal";
// import PostDeleteModal from "../components/PostDeleteModal";

// const PostDetailPage = () => {
//   const navigate = useNavigate();
//   const { postId } = useParams(); // postId 파라미터 가져오기
//   const [post, setPost] = useState(null); // 게시글 데이터 상태 추가
//   const [loading, setLoading] = useState(true); // 로딩 상태 추가
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
//   const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
//   const [isFailureModalOpen, setIsFailureModalOpen] = useState(false);
//   const [failureMessage, setFailureMessage] = useState("");

//   // ex)
//   // const postId = `1e3ff649-b704-49bb-b7b8-d1961d45b548`;

//   useEffect(() => {
//     // 컴포넌트가 마운트될 때 API 호출
//     const fetchPost = async () => {
//       try {
//         const response = await axios.get(
//           `http://3.39.56.63/api/posts/${postId}`
//         );
//         setPost(response.data); // 서버로부터 받은 데이터로 상태 업데이트
//       } catch (error) {
//         console.error("게시글 불러오기 중 오류 발생:", error);
//       } finally {
//         setLoading(false); // 로딩 완료
//       }
//     };

//     fetchPost();
//   }, [postId]);

//   // 게시글 등록 페이지로 이동
//   const handleCreatePost = () => {
//     navigate("/create-post");
//   };

//   // 게시글 수정 모달 띄움
//   const handleEditClick = () => {
//     setIsDeleteModalOpen(false); // 다른 모달을 닫음
//     setIsEditModalOpen(true);
//   };

//   const handleEditSuccess = (updatedPost) => {
//     setPost(updatedPost);
//     setIsEditModalOpen(false);
//   };

//   const handleEditFailure = (message) => {
//     alert(message);
//   };

//   // 게시글 삭제 모달 띄움
//   const handleDeleteClick = () => {
//     setIsEditModalOpen(false); // 다른 모달을 닫음
//     setIsDeleteModalOpen(true);
//   };

//   const handleDeleteConfirm = async (postPassword) => {
//     try {
//       const response = await axios.delete(
//         `http://3.39.56.63/api/posts/${postId}`,
//         {
//           data: { postPassword: postPassword },
//         }
//       );

//       if (response.status === 200) {
//         setIsDeleteModalOpen(false);
//         setIsSuccessModalOpen(true);
//       }
//     } catch (error) {
//       console.error("게시글 삭제 중 오류 발생:", error);

//       setFailureMessage(
//         error.response?.data?.message || "게시글 삭제에 실패했습니다."
//       );
//     }
//   };

//   const handleDeleteClose = () => {
//     setIsDeleteModalOpen(false);
//   };

//   const handleSuccessModalClose = () => {
//     setIsSuccessModalOpen(false);
//     navigate("/");
//   };

//   const handleFailureModalClose = () => {
//     setIsFailureModalOpen(false);
//   };

//   // 로딩 중일 때 처리
//   if (loading) {
//     return <div>로딩 중...</div>;
//   }

//   return (
//     <div>
//       <h1>게시글 상세 페이지</h1>
//       <button onClick={handleEditClick}>추억 수정하기</button>
//       <button onClick={handleDeleteClick}>추억 삭제하기</button>
//       {/* 테스트용 */}
//       <button onClick={handleCreatePost}>추억 생성하기</button>

//   {isEditModalOpen && (
//     <PostModifyModal
//       postId={postId}
//       initialData={post}
//       onClose={() => setIsEditModalOpen(false)}
//       onSuccess={handleEditSuccess}
//       onFailure={handleEditFailure}
//     />
//   )}
//   {isDeleteModalOpen && (
//     <PostDeleteModal
//       onDeleteConfirm={handleDeleteConfirm} // 비밀번호를 받아 삭제를 진행
//       onClose={handleDeleteClose}
//     />
//   )}
//   {isFailureModalOpen && (
//     <div className="modal">
//       <div className="modal-content">
//         <h3>게시글 삭제 실패</h3>
//         <p>{failureMessage}</p>
//         <button onClick={handleFailureModalClose}>확인</button>
//       </div>
//     </div>
//   )}
//     </div>
//   );
// };

// export default PostDetailPage;
