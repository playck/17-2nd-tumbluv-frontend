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
`;

export default ProjectStory;
