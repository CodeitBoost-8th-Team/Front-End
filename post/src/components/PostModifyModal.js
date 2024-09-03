import React, { useState, useRef } from "react"; // + useEffect
import { useNavigate, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import "./PostModifyModal.css";
import calender from "../img/calender.png";
import whiteX from "../img/X_white.png";
import blackX from "../img/X_black.png";

function PostModifyModal({ onSuccess, onFailure }) {
  const { postId } = useParams();
  const location = useLocation();
  const initialData = location.state?.initialData || {};

  const navigate = useNavigate();

  // 상태 초기화 (initialData로부터 초기값 설정)
  const [postNickname, setPostNickname] = useState(initialData?.nickname || "");
  const [postTitle, setPostTitle] = useState(initialData?.title || "");
  const [postImage, setPostImage] = useState(null);
  const [postContent, setPostContent] = useState(initialData?.content || "");
  const [postTag, setPostTag] = useState(initialData?.tags || []);
  const [tagInput, setTagInput] = useState(""); // 태그 입력을 위한 필드 별도 생성
  const [postLocation, setPostLocation] = useState(initialData?.location || "");
  const [postMoment, setPostMoment] = useState(initialData?.moment || "");
  const [postPassword, setPostPassword] = useState(""); // 수정 시 입력해야 하는 password

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

  // enter로 폼 제출 방지 (textarea 제외)
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  // 수정 제출
  const handleSubmit = async (e) => {
    // e.preventDefault();

    // try {
    // // 1. 이미지 파일을 서버로 업로드 (파일이 선택된 경우)
    // let imageUrl = initialData.imageUrl; // 기본 이미지 URL

    // if (postImage) {
    //   const imageData = new FormData();
    //   imageData.append("image", postImage);

    //   const imageUploadResponse = await axios.post("http://3.39.56.63/api/image", imageData);
    //   imageUrl = imageUploadResponse.data.imageUrl;
    // }

    // 2. 업로드된 이미지의 URL과 나머지 데이터를 서버로 전송
    const formData = new FormData();
    formData.append("nickname", postNickname);
    formData.append("title", postTitle);
    formData.append("imageUrl", postImage); // 이미지 URL 필드에 업로드된 이미지 URL 추가
    formData.append("content", postContent);
    formData.append("tags", JSON.stringify(postTag)); // 태그 배열을 JSON 문자열로 변환하여 추가
    formData.append("location", postLocation);
    formData.append("moment", postMoment);
    formData.append("postPassword", postPassword);

    try {
      // 서버에 데이터 전송
      const response = await axios.put(
        `http://3.39.56.63/api/posts/${postId}`,
        formData
      );

      if (response.status === 200) {
        onSuccess(response.data);
      } else if (response.status === 400) {
        onFailure("잘못된 요청입니다.");
      } else if (response.status === 401) {
        onFailure("비밀번호가 틀렸습니다.");
      } else {
        // response.status===404
        onFailure("존재하지 않습니다.");
      }
    } catch (error) {
      onFailure("게시글 수정 중 오류가 발생했습니다. 다시 시도해주세요.");
      console.error("게시글 수정 중 오류 발생:", error);
    }
  };

  const onClose = () => {
    navigate("/");
  };

  return (
    <div className="containerM">
      <div className="contentHeaderM">
        <img className="blackXM" src={blackX} alt="X" onClick={onClose} />
        <div id="contentHeaderM">추억 수정</div>
      </div>

      <form className="formM" onSubmit={handleSubmit}>
        <div className="leftFormM">
          <div className="noEnterM" onKeyDown={handleKeyDown}>
            <div className="nicknameM">
              <div className="labelFirstM">
                <label id="nicknameLabelM" htmlFor="nickname">
                  닉네임
                </label>
              </div>
              <input
                className="inputM"
                id="nickname"
                name="nickname"
                value={postNickname}
                placeholder="닉네임을 입력해주세요"
                onChange={(e) => setPostNickname(e.target.value)}
                required
              />
            </div>

            <div className="titleM">
              <div className="labelM">
                <label htmlFor="title">제목</label>
              </div>
              <input
                className="inputM"
                id="titleM"
                name="title"
                value={postTitle}
                placeholder="제목을 입력해주세요"
                onChange={(e) => setPostTitle(e.target.value)}
                required
              />
            </div>

            <div className="imageM">
              <div className="labelM">
                <label htmlFor="imageUrl">이미지</label>
              </div>
              <div className="buttonMadeM">
                <input
                  className="inputM inputFileM"
                  id="imageUrlM"
                  name="imageUrl"
                  placeholder="파일을 선택해주세요"
                  readOnly
                />
                <label htmlFor="fileInputM" className="fileButtonLabelM">
                  파일 선택
                </label>
                <input
                  type="file"
                  id="fileInputM"
                  name="imageUrl"
                  className="fileButtonM"
                  onChange={(e) => {
                    setPostImage(e.target.files[0]);
                    document.getElementById("imageUrlM").value =
                      e.target.files[0].name;
                  }}
                  required
                />
              </div>
            </div>
          </div>

          <div className="contentM">
            <div className="labelM">
              <label htmlFor="content">본문</label>
            </div>
            <textarea
              className="textareaM"
              id="contentM"
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

        <div className="lineM"></div>

        <div className="rightFormM" onKeyDown={handleKeyDown}>
          <div className="tagM">
            <div className="labelFirstM">
              <label htmlFor="tag">태그</label>
            </div>
            <input
              className="inputM"
              id="tagM"
              name="tag"
              value={tagInput}
              placeholder="태그를 입력해주세요"
              onChange={handleTagInput}
              onKeyDown={handleTagKeyDown}
            />
            <div className="tagListM">
              {postTag.map((tag, index) => (
                <div key={index} className="tagItemM">
                  #{tag}{" "}
                  <span className="removeTagM" onClick={() => removeTag(index)}>
                    <img src={whiteX} alt="X" />
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="locationM">
            <div className="labelM">
              <label htmlFor="locationM">장소</label>
            </div>
            <input
              className="inputM"
              id="locationM"
              name="location"
              value={postLocation}
              placeholder="장소를 입력해주세요"
              onChange={(e) => {
                setPostLocation(e.target.value);
              }}
              required
            />
          </div>

          <div className="momentM">
            <div className="labelM">
              <label htmlFor="momentM">추억의 순간</label>
            </div>
            <div className="dateWrapperM">
              <input
                className="inputM"
                id="momentM"
                name="moment"
                value={postMoment}
                type="datetime-local"
                onChange={(e) => setPostMoment(e.target.value)}
                ref={dateInputRef}
              />
              <img
                src={calender}
                alt="calenderIcon"
                className="calenderIconM"
                onClick={openDatePicker}
              />
            </div>
          </div>

          <div id="protectedFormM">
            <div className="passwordM">
              <div className="labelM">
                <label htmlFor="passwordInput">수정 권한 인증</label>
              </div>
              <input
                className="inputM"
                id="passwordInputM"
                value={postPassword}
                name="postPassword"
                type="password"
                placeholder="비밀번호를 입력해주세요"
                onChange={(e) => setPostPassword(e.target.value)}
                required
              />
            </div>
          </div>
        </div>

        <button className="modifyButtonM" type="submit">
          수정하기
        </button>
      </form>
    </div>
  );
}

export default PostModifyModal;
