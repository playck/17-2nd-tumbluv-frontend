import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import UploadForm from './UploadForm/UploadForm';
import FormMenu from './FormMenu';
import { FaEye } from 'react-icons/fa';
import { FaBullhorn } from 'react-icons/fa';

const ProjectUpload = ({ history }) => {
  const [imageValue, setimageValue] = useState('');
  const [textValue, setTextValue] = useState('');
  const [presentValue, setPresentValue] = useState('');
  const [imgurlValue, setImgUrlValue] = useState('');

  const onhandleTextData = value => {
    setTextValue(value);
  };

  const onhandlePresentData = value => {
    setPresentValue(value);
  };

  const onSendImgData = () => {
    const formData = new FormData();
    formData.append('filename', imageValue);

    return axios
      .post('http://172.20.10.5:8000/project/file', formData)
      .then(res => {
        console.log(res);
        setImgUrlValue(res.data.thumbnail_url);
      });
  };

  const onSendAllData = () => {
    axios({
      method: 'post',
      url: 'http://172.20.10.5:8000/project/register',
      headers: {
        Authorization: localStorage.getItem('access_token'),
      },
      data: {
        summary: textValue[0].summary,
        category: textValue[0].category,
        goal_amount: textValue[0].goalAmount,
        opening_date: textValue[0].openingDate,
        closing_date: textValue[0].closingDate,
        thumbnail_url: imgurlValue,
        name: textValue[0].name,
        project_uri: textValue[0].url,
        gifts: presentValue[0],
        total_gifts: presentValue[0].length,
        story: textValue[0].story,
        total_amount: 0,
      },
    }).then(res => {
      console.log(res);
    });
  };

  const addImgFile = e => {
    setimageValue(e.target.files[0]);
  };

  useEffect(() => {
    if (!localStorage.getItem('access_token')) {
      alert('로그인이 필요합니다.');
      history.push('/login');
    }
  }, []);

  return (
    <>
      <UploadContainer>
        <ProjectTitle>
          <span>준비 중</span>
          {textValue[0]?.name ? (
            <div className="title">{textValue[0].name}</div>
          ) : (
            '귀여운 제목'
          )}
        </ProjectTitle>
        <UploadInfo>
          프로젝트를 개설하려면 세 개의 섹션을 완성해야 합니다. 완성된 섹션은
          <img
            alt="회색원"
            src="https://media.vlpt.us/images/playck/post/2bba80cf-a966-47dd-bd70-bacf9c91bc65/CF230510-940F-4F37-86CE-B5A83B109C41.png"
          />
          탭 아이콘에
          <img
            alt="파랑원"
            src="https://media.vlpt.us/images/playck/post/d09d60c6-210b-4092-a2df-f727d0b30354/7BC376DA-2AEA-4C71-923D-6307C137DD1E.png"
          />
          파랑게 불이 들어옵니다.
        </UploadInfo>
        <UPloadMenu>
          <ul>
            {FormMenu.map(menu => {
              return (
                <li key={menu.id}>
                  <img alt="회색원" src={menu.img} />
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
        addImgFile={addImgFile}
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
