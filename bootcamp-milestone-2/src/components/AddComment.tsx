'use client';

import { useState } from 'react';
import {insertComment} from '@/src/database/database';

function AddComment(props: { blogName: string }) {

  const [text, setText] = useState('');
  const [username, setUsername] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      // POST to an API route or route handler
      //const res = await fetch('/api/comments', {
        //method: 'POST',
        //headers: { 'Content-Type': 'application/json' },
        //body: JSON.stringify({ text, username }),
      //const res = await insertComment(
        //{user: username, comment: text, time: new Date() }, 
        //props.blogName
      //);
    console.log("Adding comment to blog:", props.blogName, username, text);
    const res = await fetch(`/api/blog/${encodeURIComponent(props.blogName)}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user:username, comment: text, time: new Date().toISOString() }),
  });
      if (!res.ok) throw new Error('Failed to post');
      setText('');
      setUsername('');
    } catch (err: any) {
      setError(err.message ?? 'Something went wrong');
    } finally {
      setSubmitting(false);
      window.location.reload();
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <textarea
        className="username-textarea"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        placeholder="write your username..."
      />
      <span>
      <textarea
        className="comment-textarea"
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
        placeholder="Write a comment…"
      />
      <button type="submit" disabled={submitting}>
        {submitting ? 'Posting…' : 'Post'}
      </button>
      {error && <p role="alert">{error}</p>}
      </span>
    </form>
  );
}






export default AddComment;