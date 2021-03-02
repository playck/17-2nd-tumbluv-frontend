import React from 'react';
import styled from 'styled-components';

export default function InputText(props) {
  return <InputStyled {...props} autoComplete="off" />;
}

export const InputStyled = styled.input.attrs(props => ({
  type: props.type,
  placeholder: props.placeholder,
}))`
  width: 100%;
  padding: 13px 12px;
  margin-bottom: 12px;
  border: 1px solid #e6e6e6;
  border-radius: 4px;
  font-size: 14px;
  line-height: 24px;
  align-items: center;

  &::placeholder {
    font-size: 14px;
    font-weight: 400;
    color: #e4e4e4;
  }
`;
