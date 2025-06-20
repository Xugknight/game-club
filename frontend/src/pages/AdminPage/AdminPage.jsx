import { useEffect, useState } from 'react';
import * as admin from '../../services/adminService';

export default function AdminPage() {
  const [flags, setFlags] = useState([]);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    async function loadFlags() {
      setFlags(await admin.getAllFlags());
    }
    loadFlags();
  }, []);

  async function handleDeleteAndResolve(flag) {
    if (flag.contentType === 'game') {
      await admin.deleteGame(flag.contentId);
    } else {
      await admin.deleteReview(flag.contentId);
    }
    await admin.resolveFlag(flag._id);
    setFeedback(`${flag.contentType} #${flag.contentId} deleted.`);
    setFlags(await admin.getAllFlags());
    setTimeout(() => setFeedback(''), 5000);
  };

  async function handleDismiss(flagId) {
    await admin.resolveFlag(flagId);
    setFlags(await admin.getAllFlags());
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Admin Dashboard</h1>
      {feedback && <p style={{ color: 'green' }}>{feedback}</p>}

      <h2>Pending Delete Requests</h2>
      {flags.length === 0 && <p>No pending requests.</p>}
      {flags.map((flag) => (
        <div key={flag._id} style={{ borderBottom: '1px solid #ccc', margin: '1rem 0' }}>
          <p>
            <strong>{flag.user.username}</strong> requested deletion of{' '}
            <em>{flag.contentType}</em> {''}
            <strong>"{flag.contentPreview}"</strong>
            {flag.reason && ` — “${flag.reason}”`}
          </p>
          <button className="btn btn-danger" onClick={() => handleDeleteAndResolve(flag)}>
            Approve & Delete
          </button>
          <button className="btn btn-secondary" onClick={() => handleDismiss(flag._id)} style={{ marginLeft:'0.5rem' }}>
            Dismiss
          </button>
        </div>
      ))}
    </div>
  )
};