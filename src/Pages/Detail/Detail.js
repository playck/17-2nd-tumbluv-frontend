import React from 'react';
import ProjectInfo from './ProjectInfo';
import ProjectStory from './ProjectStory';
import ProjectSupport from './ProjectSupport';
import SupportCard from './SupportCard';
import styled from 'styled-components';

const Detail = () => {
  return (
    <div>
      <ProjectInfo />
      <ProjectNavbar>
        <ul>
          <li>스토리</li>
          <li>커뮤니티</li>
          <li>펀딩 안내</li>
        </ul>
      </ProjectNavbar>
      <Main>
        <ProjectStory />
        <div>
          <ProjectSupport />
          <SupportCard />
        </div>
      </Main>
    </div>
  );
};

const ProjectNavbar = styled.div`
  height: 51px;
  margin: 0 auto;
  margin-top: 48px;
  line-height: 38px;
  border-top: 1px solid lightgray;
  border-bottom: 1px solid lightgray;
  ul {
    display: flex;
    flex-direction: flex-start;
    width: 1000px;
    margin: 0 auto;
    li {
      padding: 7px 14px 4px;
    }
  }
`;

const Main = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 20px;
  background-color: rgb(246, 245, 245);
`;

export default Detail;
