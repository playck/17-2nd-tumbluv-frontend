import React, { useState } from 'react';
import FormInputList from './FormInputList';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
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

  const { register, handleSubmit } = useForm();
  const onSubmit = data => {
    console.log(data);
  };

  const onTextAdd = () => {
    const inputTextValue = [text];
    const inputPresentList = [presentList];
    onhandleTextData(inputTextValue);
    onhandlePresentData(inputPresentList);

    const inputImgValue = [img];
    onSendImgData(inputImgValue);
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
    <Form>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormTitle>
          <div>프로젝트 개요</div>
          <button onClick={() => onTextAdd()}> 저장 </button>
        </FormTitle>
        <FormList>
          {FormInputList.map(category => {
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
  background-color: white;
  border: 1px solid lightgray;
  border-radius: 5px;

  .inputContent {
    width: 1000px;
    height: 115px;
    padding: 15px 10px;
    font-size: 15px;
    color: ${props => props.theme.fontPointColor};
    border-bottom: 1px solid lightgray;

    p {
      padding: 15px 0 0 10px;
      font-size: 15px;
      color: ${props => props.theme.fontPointColor};
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
`;

export default UploadForm;
