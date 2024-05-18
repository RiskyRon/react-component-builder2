import React from 'react';

interface UserCardProps {
  name: string;
  bio: string;
  profilePicture: string;
}

const UserCard: React.FC<UserCardProps> = ({ name, bio, profilePicture }) => {
  const cardStyle: React.CSSProperties = {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '16px',
    maxWidth: '300px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#fff',
  };

  const profilePictureStyle: React.CSSProperties = {
    borderRadius: '50%',
    width: '100px',
    height: '100px',
    objectFit: 'cover',
    marginBottom: '16px',
  };

  const nameStyle: React.CSSProperties = {
    fontSize: '1.5em',
    margin: '0 0 8px 0',
    color: '#333',
  };

  const bioStyle: React.CSSProperties = {
    fontSize: '1em',
    margin: '0',
    color: '#666',
  };

  return (
    <div style={cardStyle}>
      <img src={profilePicture} alt={`${name}'s profile`} style={profilePictureStyle} />
      <h2 style={nameStyle}>{name}</h2>
      <p style={bioStyle}>{bio}</p>
    </div>
  );
};

export default UserCard;