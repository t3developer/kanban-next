'use client';
import React, { useState } from 'react';
import { useKanbanStore } from '@/lib/stores/kanban/store';
import { Comment } from '@/lib/stores/kanban/types';
import { FiEdit2, FiSend } from 'react-icons/fi';
import { useShallow } from 'zustand/shallow';
import { ImBin } from 'react-icons/im';

interface KanbanCommentsProps {
  taskId: string;
  comments: Comment[];
}

const KanbanComments = React.memo(
  function KanbanComments({ taskId, comments }: KanbanCommentsProps) {
    const [user, addComment, removeComment, updateComment] = useKanbanStore(
        useShallow((state) => [
          state.user,
          state.addComment,
          state.removeComment,
          state.updateComment
        ])
      );
    
    const currentUser = useKanbanStore(state => state.user?.name || 'User');

    const [newComment, setNewComment] = useState('');
    const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
    const [editingValue, setEditingValue] = useState('');

    // Add new comment
    const handleAdd = (e: React.FormEvent) => {
      e.preventDefault();
      if (newComment.trim()) {
        addComment(taskId, newComment.trim(), user.name);
        setNewComment('');
      }
    };

    // Start editing
    const handleEditStart = (comment: Comment) => {
      setEditingCommentId(comment.id);
      setEditingValue(comment.comment);
    };

    // Save edit
    const handleEditSave = (comment: Comment) => {
      if (editingValue.trim()) {
        updateComment(taskId, {
          ...comment,
          comment: editingValue.trim(),
        });
        setEditingCommentId(null);
        setEditingValue('');
      }
    };

    // Cancel edit
    const handleEditCancel = () => {
      setEditingCommentId(null);
      setEditingValue('');
    };

    // Remove comment
    const handleRemove = (commentId: string) => {
      removeComment(taskId, commentId);
    };

    return (
      <div className="mt-8">
        <h3 className="text-md font-semibold mb-2">Comments</h3>
        <div className="mb-3 space-y-2">
          {comments.length === 0 && (
            <div className="text-gray-400 text-xs py-2">No comments yet.</div>
          )}
          {comments.map(c => (
            <div key={c.id} className="bg-zinc-100 rounded p-2 mb-1 flex items-start gap-2">
              <div className="flex-1">
                <div className="text-xs text-gray-500 mb-1">
                  {c.createdBy ? (
                    <span className="font-semibold text-gray-700">{c.createdBy}</span>
                  ) : (
                    <span className="font-semibold text-gray-400">User</span>
                  )}
                  {' '}
                  <span className="text-[10px] text-gray-400">
                    {new Date(c.createdAt).toLocaleString()}
                    {c.updatedAt && c.updatedAt > c.createdAt && ' (edited)'}
                  </span>
                </div>
                {editingCommentId === c.id ? (
                  <div className="flex flex-col gap-1">
                    <textarea
                      className="kanban-input"
                      value={editingValue}
                      onChange={e => setEditingValue(e.target.value)}
                      rows={2}
                    />
                    <div className="flex gap-2 mt-1">
                      <button className="kanban-button px-2 text-[10px]" onClick={() => handleEditSave(c)}>Save</button>
                      <button className="kanban-button-alert px-2 text-[10px]" onClick={handleEditCancel}>Cancel</button>
                    </div>
                  </div>
                ) : (
                  <div className="text-sm">{c.comment}</div>
                )}
              </div>
              {editingCommentId !== c.id && (
                <div className="flex gap-2 ml-2">
                  {c.createdBy === currentUser && (
                    <>
                      <button title="Edit" className="text-cyan-500 hover:text-cyan-700 cursor-pointer" onClick={() => handleEditStart(c)}>
                        <FiEdit2 size={12} />
                      </button>
                      <button title="Delete" className="text-red-400 hover:text-red-700 cursor-pointer" onClick={() => handleRemove(c.id)}>
                        <ImBin size={12} />
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="flex gap-2 mt-3">
          <textarea
            className="kanban-input flex-1"
            placeholder="Add a comment..."
            value={newComment}
            onChange={e => setNewComment(e.target.value)}
            rows={2}
          />
          <button
            type="button"
            className="kanban-button-secondary flex items-center"
            disabled={!newComment.trim()}
            onClick={handleAdd}
          >
            <FiSend size={16} className="mr-1" />
          </button>
        </div>
      </div>
    );
  });

export default KanbanComments;