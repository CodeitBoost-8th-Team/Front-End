import React from 'react';
import './GroupPage.css';

function GroupPage() {
  const memories = Array(12).fill({
    title: '잊지못할 추억',
    description: '여행지에서 찍은 소중한 추억사진! 잊지못할 모멘트를 이 곳에 남겼어요.',
    imageUrl: 'path-to-image', // 각 이미지의 경로로 교체 필요
    views: 120,
    date: '24/01/19 18:00',
    comments: 8,
    likes: 100,
  });

  return (
    <div className="group-page">
      <header className="group-header">
        <img src="path-to-group-image" alt="Group" className="group-image" />
        <div className="group-info">
          <h2>달팽이네 가족</h2>
          <p>서로 좀 더 아낌없이 위로하고 아끼는 달팽이네 가족입니다.</p>
          <div className="group-stats">
            <span>추억: 8</span> | <span>그룹 공감: 1.5K</span>
          </div>
          <button className="group-button">공감 표시하기</button>
        </div>
      </header>

      <section className="memories-section">
        <h3>추억 목록</h3>
        <button className="upload-button">추억 올리기</button>
        <div className="memories-grid">
          {memories.map((memory, index) => (
            <div key={index} className="memory-card">
              <img src={memory.imageUrl} alt={memory.title} className="memory-image" />
              <div className="memory-info">
                <h4>{memory.title}</h4>
                <p>{memory.description}</p>
                <div className="memory-meta">
                  <span>{memory.views} 조회수</span>
                  <span>{memory.date}</span>
                  <span>{memory.comments} 댓글</span>
                  <span>{memory.likes} 좋아요</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <button className="load-more-button">더보기</button>
    </div>
  );
}

export default GroupPage;
