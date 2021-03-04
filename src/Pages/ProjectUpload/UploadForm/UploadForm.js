import React, { useState } from 'react';
import FormInputList from './FormInputList';
import styled from 'styled-components';
import { FaCube } from 'react-icons/fa';

const UploadForm = ({
  onSendImgData,
  onhandleTextData,
  onhandlePresentData,
  addImgFile,
}) => {
  const [text, setText] = useState({});
  const [img, setImg] = useState('');
  const [presentList, setPresentList] = useState([]);
  const [present, setPresent] = useState([]);

  const onTextAdd = () => {
    const inputTextValue = [text];
    const inputPresentList = [presentList];
    onhandleTextData(inputTextValue);
    onhandlePresentData(inputPresentList);
  };

  const onImgAdd = () => {
    const inputImgValue = [img];
    onSendImgData(inputImgValue);
  };

  const onPresentAdd = e => {
    e.preventDefault();
    setPresentList([...presentList, present]);
  };

  const onInputValueChange = e => {
    const { name, value } = e.target;
    setText({
      ...text,
      [name]: value,
    });
    setImg({
      [name]: value,
    });
  };

  const onInputPresentChange = e => {
    const { name, value } = e.target;
    setPresent({
      ...present,
      [name]: value,
      quantity_sold: 0,
    });
  };

  return (
    <>
      <Form>
        {FormInputList.map(category => {
          return (
            <FormList key={category.id}>
              <div>
                <FormTitle>{category.FormTitle}</FormTitle>
                <button onClick={() => onTextAdd()}>저장</button>
              </div>
              <FormBody>
                {category.item.map(list => {
                  return (
                    <div className="formContent" key={list.id}>
                      <div className="inputContent">
                        <p>
                          <FaCube size="14" />
                          &nbsp;&nbsp;
                          {list.FormInput}
                        </p>
                        <span className="uploadImgBtn">
                          {list.type === 'file' && (
                            <button onClick={() => onImgAdd()}>
                              사진 업로드하기
                            </button>
                          )}
                        </span>
                      </div>
                      {list.FormTitle === '선물 추가하기' ? (
                        <form onSubmit={onPresentAdd}>
                          <div>
                            <button className="presentAddBtn" type="submit">
                              추가
                            </button>
                          </div>
                          <input
                            type="text"
                            name="gift_name"
                            onChange={onInputPresentChange}
                            placeholder="선물 이름"
                            autoComplete="off"
                          />
                          <input
                            type="number"
                            name="gift_price"
                            onChange={onInputPresentChange}
                            placeholder="선물 가격"
                            autoComplete="off"
                          />
                          <input
                            type="number"
                            name="gift_stock"
                            onChange={onInputPresentChange}
                            placeholder="선물 갯수"
                            autoComplete="off"
                          />
                        </form>
                      ) : list.FormTitle === '프로젝트 대표 이미지' ? (
                        <input
                          className="imgUploadInput"
                          type={list.type}
                          onChange={addImgFile}
                          name={list.name}
                          autoComplete="off"
                        />
                      ) : list.type === 'date' ? (
                        <input
                          className="dateInput"
                          type={list.type}
                          onChange={onInputValueChange}
                          name={list.name}
                          autoComplete="off"
                        />
                      ) : (
                        <input
                          type={list.type}
                          onChange={onInputValueChange}
                          name={list.name}
                          autoComplete="off"
                        />
                      )}
                    </div>
                  );
                })}
              </FormBody>
            </FormList>
          );
        })}
      </Form>
    </>
  );
};

const Form = styled.section`
  padding: 20px 0;
  background-color: #f6f5f5;
`;

const FormTitle = styled.div`
  width: 100%;
  margin-bottom: 20px;
  font-size: 14px;
`;

const FormList = styled.ul`
  width: 1000px;
  margin: 14px auto;

  div {
    display: flex;

    button {
      width: 100px;
      height: 30px;
    }
  }
`;

const FormBody = styled.li`
  margin-bottom: 30px;
  background-color: white;
  border: 1px solid lightgray;
  border-radius: 5px;

  .formContent {
    display: flex;
    flex-direction: column;
    padding: 14px 21px;
    border-bottom: 1px solid lightgray;

    label {
      padding: 7px 14px;
      font-size: 14px;
    }

    .inputContent {
      display: flex;
      align-items: center;
      height: 35px;

      p {
        width: 840px;
        padding: 15px 10px;
        font-size: 15px;
        color: ${props => props.theme.fontPointColor};
      }

      span {
        font-size: 15px;
        color: ${props => props.theme.fontPointColor};
        cursor: pointer;
      }
    }

    input {
      width: 930px;
      margin-left: 10px;
      padding: 15px 0;
      padding-left: 15px;
      border: none;
      border-bottom: 1px solid black;
    }

    .uploadImgBtn {
      margin-top: 80px;
      padding: 10px;
      border-radius: 5px;
    }

    .imgUploadInput {
      width: 820px;
    }

    .dateInput {
      width: 300px;
    }

    form {
      input {
        width: 300px;
      }
      div {
        background-color: white;
        .presentAddBtn {
          width: 90px;
          margin-left: 840px;
          background-color: rgb(235, 235, 235);
          border-radius: 5px;
        }
      }
    }
  }
`;

export default UploadForm;
