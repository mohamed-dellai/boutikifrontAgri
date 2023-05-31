import React from "react";
import styled from "styled-components";

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const ProfileImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-bottom: 16px;
`;

const ProfileName = styled.h2`
  font-size: 24px;
  margin-bottom: 8px;
`;

const ProfileEmail = styled.p`
  font-size: 16px;
  color: #888888;
`;

const Profile = ({ name, email, image }) => {
  return (
    <ProfileContainer>
      <ProfileImage src={image} alt="Profile" />
      <ProfileName>{name}</ProfileName>
      <ProfileEmail>{email}</ProfileEmail>
    </ProfileContainer>
  );
};

export default Profile;
