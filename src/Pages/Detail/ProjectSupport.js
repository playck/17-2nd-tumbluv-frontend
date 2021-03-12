import React from 'react';
import styled from 'styled-components';
import { FaEnvelope } from 'react-icons/fa';

const ProjectSupport = ({ data }) => {
  return (
    <>
      <CreatorInfo>
        <span>창작자 소개</span>
        <CreatorProfile>
          <div>
            <img
              alt="logo"
              src="https://media.vlpt.us/images/playck/post/2bba80cf-a966-47dd-bd70-bacf9c91bc65/CF230510-940F-4F37-86CE-B5A83B109C41.png"
            />
            <span>{data.name}</span>
          </div>
          <p>{data.creator_description}</p>
        </CreatorProfile>
        <div className="midLine"></div>
        <CreatorStauts>
          <div>
            마지막 로그인 <span>재작년</span>
          </div>
          <div>
            진행한 프로젝트 <span>19</span>
          </div>
        </CreatorStauts>
        <ContactBtn>
          <FaEnvelope size="18" />
          <span>창작자에게 문의하기</span>
        </ContactBtn>
      </CreatorInfo>
    </>
  );
};

const CreatorInfo = styled.div`
  width: 335px;
  height: 300px;
  margin-left: 20px;
  padding: 21px;
  background-color: white;
  border-radius: 5px;
  .midLine {
    margin-top: 18px;
    height: 1px;
    border: 1px solid lightgray;
  }
`;

const CreatorProfile = styled.div`
  margin-top: 18px;
  div {
    display: flex;
    align-items: center;
    img {
      width: 50px;
      height: 50px;
      margin-right: 20px;
    }
  }
  p {
    margin-top: 14px;
  }
`;

const CreatorStauts = styled.div`
  margin-top: 18px;
  font-size: 12.6px;
  div {
    margin-top: 10px;
  }
  span {
    font-weight: bold;
  }
`;

const ContactBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 280px;
  margin-top: 18px;
  padding: 14px 21px;
  background-color: rgb(231, 231, 231);
  border-radius: 5px;
  cursor: pointer;
  :hover {
    background-color: lightgray;
  }
  span {
    margin-top: 4px;
    margin-left: 10px;
  }
`;

export default ProjectSupport;
