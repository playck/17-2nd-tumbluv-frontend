import React, { useEffect, useState } from 'react';
import ProjectInfo from './ProjectInfo';
import ProjectStory from './ProjectStory';
import ProjectSupport from './ProjectSupport';
import SupportCard from './SupportCard';
import styled from 'styled-components';
import ProjectCommunity from './ProjectCommunity';
import { useParams } from 'react-router';
import { detailAPI } from '../../config';
import axios from 'axios';

const Detail = () => {
  const [projectData, setProjectData] = useState();
  const [currentMenuId, setCurrentMenuId] = useState(1);

  const menuList = {
    1: <ProjectStory data={projectData?.tab.story} />,
    2: <ProjectCommunity data={projectData?.tab.communities[0]} />,
  };

  const onMenuTabmove = id => {
    setCurrentMenuId(id);
  };
  const params = useParams();
  const getProjectData = () => {
    axios.get(`${detailAPI}/${params.id}`).then(function (res) {
      setProjectData(res.data);
      console.log(res);
    });
  };

  useEffect(() => {
    getProjectData();
  }, []);

  return (
    <div>
      {projectData && (
        <div>
          <ProjectInfo data={projectData.project_info} />
          <ProjectNavbar>
            {menuTap.map((menu, idx) => {
              return (
                <li key={menu} onClick={() => onMenuTabmove(idx + 1)}>
                  {menu}
                </li>
              );
            })}
          </ProjectNavbar>
          <Main>
            {menuList[currentMenuId]}
            <div>
              <ProjectSupport data={projectData.creator_info} />
              <SupportCard data={projectData.project_info.option} />
            </div>
          </Main>
        </div>
      )}
    </div>
  );
};
const ProjectNavbar = styled.div`
  display: flex;
  flex-direction: flex-start;
  width: 1000px;
  margin: 0 auto;
  height: 51px;
  margin-top: 48px;
  line-height: 38px;

  li {
    padding: 7px 14px 4px;
    list-style: none;
    cursor: pointer;
  }
`;
const Main = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 20px;
  background-color: rgb(246, 245, 245);
`;
export default Detail;

const menuTap = ['스토리', '커뮤니티'];
