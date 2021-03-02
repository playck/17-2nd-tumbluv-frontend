import React from 'react';
import styled from 'styled-components';

export default function InputCheck(props) {
  return (
    <Label>
      <InputStyled {...props} autoComplete="off" />
      {props.label}
    </Label>
  );
}

export const Label = styled.label`
  display: block;
  right: 10px;
  width: 100%;
  font-size: 14px;
  line-height: 24px;
  padding-bottom: 10px;
  cursor: pointer;
`;

export const InputStyled = styled.input.attrs(props => ({
  type: props.type,
}))`
  margin-right: 10px;
`;
