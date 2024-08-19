import React, { useState } from 'react';
import CommentForm from './CommentForm';
import './App.css';

function App() {
  const [comments, setComments] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const handleAddComment = (newComment) => {
    if (editingIndex !== null) {
      const updatedComments = comments.map((c, index) =>
        index === editingIndex ? newComment : c
      );
      setComments(updatedComments);
      setEditingIndex(null);
    } else {
      setComments([...comments, newComment]);
    }
  };

  const handleEditComment = (index) => {
    setEditingIndex(index);
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
  };

  const handleDeleteComment = (index) => {
    const updatedComments = comments.filter((_, i) => i !== index);
    setComments(updatedComments);
  };

  return (
    <div className="App">
      <CommentForm
        editingComment={comments[editingIndex]}
        onSubmit={handleAddComment}
        onCancel={handleCancelEdit}
      />
      <div className="comment-list">
        {comments.map((c, index) => (
          <div key={index} className="comment-item">
            <p><strong>{c.nickname}</strong></p>
            <p>{c.comment}</p>
            <button onClick={() => handleEditComment(index)}>수정</button>
            <button onClick={() => handleDeleteComment(index)}>삭제</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
