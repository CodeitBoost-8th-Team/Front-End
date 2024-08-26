import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api.js";
import "./PostForm.css";
import whiteX from "../img/X_white.png";
import calender from "../img/calender.png";

function PostForm({ onSuccess, onFailure }) {
  const navigate = useNavigate();

  const [postNickname, setPostNickname] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [postImage, setPostImage] = useState(null);
  const [postContent, setPostContent] = useState("");
  const [postTag, setPostTag] = useState([]);
  const [tagInput, setTagInput] = useState(""); // 태그 입력을 위한 필드 별도 생성
  const [postLocation, setPostLocation] = useState("");
  const [postMoment, setPostMoment] = useState("");
  const [postPassword, setPostPassword] = useState(""); // 글 수정 시 입력해야 하는 password

  // 태그 핸들러
  const handleTagInput = (e) => {
    const value = e.target.value;
    if (value.includes(" ")) return; // 띄어쓰기 방지
    setTagInput(value); // 태그 입력 값 설정
  };
  const handleTagKeyDown = (e) => {
    if (e.key === "Enter" && tagInput.trim() !== "") {
      if (postTag.length >= 10) {
        alert("태그는 최대 10개까지 추가할 수 있습니다.");
        return;
      }
      setPostTag([...postTag, tagInput.trim()]); // 태그 추가
      setTagInput(""); // 입력 값 초기화
    }
  };
  const removeTag = (indexToRemove) => {
    setPostTag(postTag.filter((_, index) => index !== indexToRemove)); // 태그 삭제
  };

  // moment 핸들러
  const dateInputRef = useRef(null);
  const openDatePicker = () => {
    if (dateInputRef.current) {
      dateInputRef.current.showPicker();
    }
  };

  // submit 핸들러
  const handleSubmit = async (e) => {
    // e.preventDefault();

    // try {
    // 1. 이미지 파일을 서버로 업로드
    const imageData = new FormData();
    imageData.append("image", postImage);

    const imageUploadResponse = await api.post("/api/image", imageData); // 명세서에 따른 올바른 경로 사용
    const imageUrl = imageUploadResponse.data.imageUrl;

    // 2. 업로드된 이미지의 URL과 나머지 데이터를 서버로 전송
    const formData = new FormData();

    formData.append("nickname", postNickname);
    formData.append("title", postTitle);
    formData.append("imageUrl", imageUrl); // 이미지 URL 필드에 업로드된 이미지 URL 추가
    formData.append("content", postContent);
    formData.append("tags", JSON.stringify(postTag)); // 태그 배열을 JSON 문자열로 변환하여 추가
    formData.append("location", postLocation);
    formData.append("moment", postMoment);
    formData.append("postPassword", postPassword);
    // formData.append("groupPassword", groupPassword);

    try {
      // 서버에 데이터 전송
      const response = await api.post("/api/groups/{groupId}/posts", formData);
      if (response.status === 200) {
        onSuccess(response.data.id); // 생성된 그룹 ID 전달
        // 등록한 게시글 상세 페이지(임시 = /)로 이동
        navigate("/"); //  -> /를 등록한 게시글 상세 페이지로 이동하게끔 수정 필요
      } else if (response.status === 400) {
        onFailure("잘못된 요청입니다.");
      } else if (response.status === 401) {
        onFailure("비밀번호가 틀렸습니다.");
      }
    } catch (error) {
      onFailure("게시글 생성 중 오류가 발생했습니다. 다시 시도해주세요.");
      console.error("게시글 생성 중 오류 발생:", error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  return (
    <form className="formC" onSubmit={handleSubmit}>
      <div className="leftFormC">
        <div className="noEnterC" onKeyDown={handleKeyDown}>
          <div className="nicknameC">
            <div className="labelFirstC">
              <label id="nicknameLabelC" htmlFor="nickname">
                닉네임
              </label>
            </div>
            <input
              className="inputC"
              id="nicknameC"
              name="nickname"
              value={postNickname}
              placeholder="닉네임을 입력해주세요"
              onChange={(e) => setPostNickname(e.target.value)}
              required
            />
          </div>

          <div className="titleC">
            <div className="labelC">
              <label htmlFor="title">제목</label>
            </div>
            <input
              className="inputC"
              id="titleC"
              name="title"
              value={postTitle}
              placeholder="제목을 입력해주세요"
              onChange={(e) => setPostTitle(e.target.value)}
              required
            />
          </div>

          <div className="imageC">
            <div className="labelC">
              <label htmlFor="imageUrl">이미지</label>
            </div>
            <div className="buttonMadeC">
              <input
                className="inputC inputFileC"
                id="imageUrl"
                name="imageUrl"
                placeholder="파일을 선택해주세요"
                readOnly
              />
              <label htmlFor="fileInputC" className="fileButtonLabelC">
                파일 선택
              </label>
              <input
                type="file"
                id="fileInputC"
                name="imageUrl"
                className="fileButtonC"
                onChange={(e) => {
                  setPostImage(e.target.files[0]);
                  document.getElementById("imageUrl").value =
                    e.target.files[0].name;
                }} // 파일명을 input에 설정}
                required
              />
            </div>
          </div>
        </div>

        <div className="contentC">
          <div className="labelC">
            <label htmlFor="content">본문</label>
          </div>
          <textarea
            className="textareaC"
            id="contentC"
            name="content"
            value={postContent}
            rows="5"
            wrap="hard"
            placeholder="본문 내용을 입력해주세요"
            onChange={(e) => setPostContent(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="lineC"></div>

      <div className="rightFormC" onKeyDown={handleKeyDown}>
        <div className="tagC">
          <div className="labelFirstC">
            <label htmlFor="tag">태그</label>
          </div>
          <input
            className="inputC"
            id="tagC"
            name="tag"
            value={tagInput}
            placeholder="태그를 입력해주세요"
            onChange={handleTagInput}
            onKeyDown={handleTagKeyDown}
          />
          <div className="tagListC">
            {postTag.map(
              (
                tag,
                index // 태그 목록 렌더링
              ) => (
                <div key={index} className="tagItemC">
                  #{tag}{" "}
                  <span className="removeTagC" onClick={() => removeTag(index)}>
                    <img src={whiteX} alt="X" />
                  </span>
                </div>
              )
            )}
          </div>
        </div>

        <div className="locationC">
          <div className="labelC">
            <label htmlFor="location">장소</label>
          </div>
          <input
            className="inputC"
            id="locationC"
            name="location"
            value={postLocation}
            placeholder="장소를 입력해주세요"
            onChange={(e) => setPostLocation(e.target.value)}
            required
          />
        </div>

        <div className="momentC">
          <div className="labelC">
            <label htmlFor="moment">추억의 순간</label>
          </div>
          <div className="dateWrapperC">
            <input
              className="inputC"
              id="momentC"
              name="moment"
              value={postMoment}
              type="datetime-local"
              onChange={(e) => setPostMoment(e.target.value)}
              ref={dateInputRef}
              required
            />
            <img
              src={calender}
              alt="calenderIcon"
              className="calenderIconC"
              onClick={openDatePicker}
            />
          </div>
        </div>

        <div id="protectedFormC">
          <div className="passwordC">
            <div className="labelC">
              <label htmlFor="passwordInput">비밀번호</label>
            </div>
            <input
              className="inputC"
              id="passwordInputC"
              name="postPassword"
              value={postPassword}
              type="password"
              placeholder="비밀번호를 입력해주세요"
              onChange={(e) => setPostPassword(e.target.value)}
              required
            />
          </div>
        </div>
      </div>

      <button className="postButtonC" type="submit">
        올리기
      </button>
    </form>
  );
}

export default PostForm;
