import React from 'react';
import styled from 'styled-components';

const ProjectStory = ({ data }) => {
  return (
    <>
      <StoryContent dangerouslySetInnerHTML={{ __html: data }}></StoryContent>
    </>
  );
};

const StoryContent = styled.div`
  width: 648px;
  background-color: white;
  img {
    width: 300px;
    height: 300px;
  }

  h1 {
    margin-bottom: 20px;
    font-size: 32px;
    text-align: center;
  }

  div {
    margin: 20px 0;
    padding: 0 15px;
    line-height: 25px;
  }
`;

export default ProjectStory;
