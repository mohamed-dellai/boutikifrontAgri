import React from "react";
import styled from "styled-components";

const ThankYouMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f2f2f2;
  padding: 20px;
  border-radius: 8px;
  font-family: "Roboto", sans-serif;
  color: #333;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Subtitle = styled.p`
  font-size: 16px;
  margin-bottom: 20px;
`;

const ThankYouComponent = () => {
  return (
    <ThankYouMessage>
      <Title>Thank You for Purchasing</Title>
      <Subtitle>We appreciate your business!</Subtitle>
    </ThankYouMessage>
  );
};

export default ThankYouComponent;
