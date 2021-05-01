import React, { useEffect, useState } from 'react';
import FormInputList from './FormInputList';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { FaCube } from 'react-icons/fa';

const UploadForm = ({
  onSendImgData,
  onhandleTextData,
  onhandlePresentData,
}) => {
  const [text, setText] = useState({});
  const [img, setImg] = useState('');
  const [presentList, setPresentList] = useState([]);
  const [present, setPresent] = useState([]);

  const { register, handleSubmit } = useForm();

  const onSubmit = data => {
    setText({ data });
    setImg(data.thumbnailUrl);
  };

  const onDataAdd = () => {
    const inputImgValue = [img];
    const inputPresentList = [presentList];

    onhandleTextData(text);
    onSendImgData(inputImgValue[0]);
    onhandlePresentData(inputPresentList);
  };

  const onPresentAdd = () => {
    setPresentList([...presentList, present]);
  };

  const onInputPresentChange = e => {
    const { name, value } = e.target;
    setPresent({
      ...present,
      [name]: value,
    });
  };

  useEffect(() => {
    onDataAdd();
  }, [text]);

  return (
    <Form>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormTitle>
          <div>프로젝트 개요</div>
          <button onClick={() => onDataAdd()}> 저장 </button>
        </FormTitle>
        <FormList>
          {FormInputList[0].summary.map(category => {
            return (
              <div className="inputContent">
                <p>
                  <FaCube size="14" /> &nbsp;&nbsp;
                  {category.FormInput}
                </p>

                {category.type === 'radio' ? (
                  <div className="radioOpiotns">
                    <input
                      type="radio"
                      name="category"
                      value="푸드"
                      ref={register}
                    />
                    푸드
                    <input
                      type="radio"
                      name="category"
                      value="패션"
                      ref={register}
                    />
                    패션
                    <input
                      type="radio"
                      name="category"
                      value="사진"
                      ref={register}
                    />
                    사진
                  </div>
                ) : (
                  <input
                    name={category.name}
                    type={category.type}
                    ref={register}
                  />
                )}
              </div>
            );
          })}
        </FormList>

        <FormTitle>
          <div>펀딩 목표 및 구성</div>
          <button onClick={() => onDataAdd()}> 저장 </button>
        </FormTitle>
        <FormList>
          {FormInputList[0].goal.map(category => {
            return (
              <div className="inputContent">
                <p>
                  <FaCube size="14" /> &nbsp;&nbsp;
                  {category.FormInput}
                </p>
                <input
                  className="fundingGoal"
                  name={category.name}
                  type={category.type}
                  ref={register}
                />
              </div>
            );
          })}
        </FormList>

        <FormTitle>
          <div>선물 구성</div>
          <button onClick={() => onDataAdd()}> 저장 </button>
        </FormTitle>
        <FormList>
          {FormInputList[0].present.map(category => {
            return (
              <div className="inputContent">
                <p>
                  <FaCube size="14" /> &nbsp;&nbsp;
                  {category.FormInput}
                  <button
                    className="presentAddBtn"
                    type="button"
                    onClick={onPresentAdd}
                  >
                    추가
                  </button>
                </p>
                <div className="presentInfo">
                  {FormInputList[0].present[0].list.map(gift => {
                    return (
                      <div className="giftInputBox">
                        <span>{gift.text}</span>
                        <input
                          className="gift"
                          name={gift.name}
                          type={gift.type}
                          onChange={onInputPresentChange}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </FormList>
      </form>
    </Form>
  );
};

const Form = styled.section`
  padding: 20px 0;
  background-color: #f6f5f5;
`;

const FormTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1000px;
  margin: 0 auto;
  font-size: 15px;

  button {
    width: 60px;
    height: 30px;
  }
`;

const FormList = styled.div`
  display: flex;
  flex-direction: column;
  width: 1000px;
  margin: 14px auto;
  margin-bottom: 20px;
  background-color: white;
  border: 1px solid lightgray;
  border-radius: 5px;

  .inputContent {
    width: 1000px;
    padding: 15px 10px;
    font-size: 15px;
    color: ${props => props.theme.fontPointColor};
    border-bottom: 1px solid lightgray;

    p {
      padding: 15px 0 0 10px;
      font-size: 15px;
      color: ${props => props.theme.fontPointColor};

      .presentAddBtn {
        float: right;
        margin-right: 30px;
        width: 90px;
        background-color: rgb(235, 235, 235);
        border-radius: 5px;
      }
    }

    .radioOpiotns {
      display: flex;
      padding: 25px 0 0 15px;

      input {
        width: 20px;
      }
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

  div {
    button {
      width: 100px;
      height: 30px;
    }
  }

  .fundingGoal {
    width: 300px;
    margin: 15px 0 0 10px;
    padding: 10px 15px;
    border: 1px solid lightgray;
    border-radius: 5px;
  }

  .presentInfo {
    display: flex;
    margin-top: 10px;

    .giftInputBox {
      display: flex;
      flex-direction: column;
      margin: 10px;

      span {
        margin: 0 0 10px 5px;
        color: black;
      }
    }
  }

  .gift {
    width: 300px;
    margin: 0;
    padding: 10px 15px;
    border: 1px solid lightgray;
    border-radius: 5px;
  }
`;

export default UploadForm;
