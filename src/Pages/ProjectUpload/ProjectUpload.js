import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import UploadForm from './UploadForm/UploadForm';
import FormMenu from './FormMenu';
import { FaEye } from 'react-icons/fa';
import { FaBullhorn } from 'react-icons/fa';
import { address } from '../../config';
import { greyCircle } from '../../config';
import { blueCircle } from '../../config';

const ProjectUpload = () => {
  const [textValue, setTextValue] = useState('');
  const [presentValue, setPresentValue] = useState('');
  const [imgurlValue, setImgUrlValue] = useState('');

  const onhandleTextData = value => {
    setTextValue(value);
  };

  const onhandlePresentData = value => {
    setPresentValue(value);
  };

  const onSendImgData = img => {
    const formData = new FormData();
    formData.append('filename', img);

    return axios.post(`${address}project/file`, formData).then(res => {
      setImgUrlValue(res.data.thumbnail_url);
      alert('사진이 업로드 되었습니다.');
    });
  };

  const onSendAllData = () => {
    axios({
      method: 'post',
      url: `${address}project/register`,
      headers: {
        Authorization: localStorage.getItem('access_token'),
      },
      data: {
        summary: textValue.summary,
        category: textValue.category,
        goal_amount: textValue.goalAmount,
        opening_date: textValue.openingDate,
        closing_date: textValue.closingDate,
        thumbnail_url: imgurlValue,
        name: textValue.name,
        project_uri: textValue.url,
        gifts: presentValue[0],
        total_gifts: presentValue[0].length,
        story: textValue.story,
        total_amount: 0,
      },
    });
  };

  return (
    <>
      <UploadContainer>
        <ProjectTitle>
          <span>준비 중</span>
          {textValue?.name ? (
            <div className="title">{textValue.name}</div>
          ) : (
            '귀여운 제목'
          )}
        </ProjectTitle>
        <UploadInfo>
          프로젝트를 개설하려면 세 개의 섹션을 완성해야 합니다. 완성된 섹션은
          <img alt="회색원" src={greyCircle} />
          탭 아이콘에
          <img alt="파랑원" src={blueCircle} />
          파랑게 불이 들어옵니다.
        </UploadInfo>
        <UPloadMenu>
          <ul>
            {FormMenu.map(menu => {
              return (
                <li key={menu.id}>
                  {Object.keys(textValue).length !== 0 &&
                  Object.keys(presentValue).length !== 0 &&
                  imgurlValue ? (
                    <img alt="파랑원" src={blueCircle} />
                  ) : (
                    <img alt="회색원" src={greyCircle} />
                  )}
                  <span>{menu.title}</span>
                </li>
              );
            })}
          </ul>
          <div>
            <button>
              <i>
                <FaEye size="14" />
              </i>
              <span>미리보기</span>
            </button>
            <button onClick={onSendAllData}>
              <i>
                <FaBullhorn size="14" />
              </i>
              <span>검토 요청하기</span>
            </button>
          </div>
        </UPloadMenu>
      </UploadContainer>
      <UploadForm
        onhandleTextData={onhandleTextData}
        onhandlePresentData={onhandlePresentData}
        onSendImgData={onSendImgData}
      />
    </>
  );
};

const UploadContainer = styled.section`
  width: 1000px;
  margin: 0 auto;
  margin-top: 50px;
`;

const ProjectTitle = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1000px;
  height: 175px;
  text-align: center;
  font-size: 28px;
  color: #dcddde;
  span {
    height: 30px;
    margin: -3px 10px 0 0;
    padding: 10px;
    border: 1px solid black;
    border-radius: 5px;
    font-size: 10px;
    color: #424242;
  }
  .title {
    color: black;
  }
`;

const UploadInfo = styled.div`
  height: 48px;
  padding: 13px;
  line-height: 28px;
  background-color: #cce2ff;
  text-align: center;
  border-radius: 5px;
  color: #3a6ff2;
  font-weight: 700;
  img {
    position: relative;
    top: 2px;
    margin: 0 5px;
    width: 15px;
    height: 15px;
  }
`;

const UPloadMenu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 14px 0;
  ul {
    display: flex;
    li {
      display: flex;
      align-items: center;
      height: 29px;
      margin-right: 10px;
      padding: 2px;
      text-align: center;
      font-size: 13px;
      cursor: pointer;
      img {
        position: relative;
        top: -1px;
        width: 20px;
        height: 20px;
        margin-right: 10px;
      }
    }
  }
  div {
    button {
      width: 104px;
      height: 34px;
      background-color: transparent;
      border: 2px solid #424242;
      border-radius: 5px;
      font-size: 14px;
      cursor: pointer;
      &:last-child {
        width: 120px;
        border: 2px solid ${props => props.theme.fontPointColor};
        margin-left: 10px;
        color: ${props => props.theme.fontPointColor};
      }
      i {
        position: relative;
        top: 2px;
        margin-right: 5px;
      }
    }
  }
`;

export default ProjectUpload;
