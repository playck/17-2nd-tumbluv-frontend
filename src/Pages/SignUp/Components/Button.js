import React from 'react';
import styled, { css } from 'styled-components';
import { darken, lighten } from 'polished';

export default function Button({ color, children, fontColor, clicked }) {
  return (
    <ButtonStyled color={color} fontColor={fontColor} onClick={clicked}>
      {children}
    </ButtonStyled>
  );
}

export const colorStyles = css`
  ${({ color }) => {
    const selected = color;
    return css`
      background: ${selected};
      &:hover {
        background: ${lighten(0.1, selected)};
      }
      &:active {
        background: ${darken(0.1, selected)};
      }
    `;
  }}
`;

export const ButtonStyled = styled.button`
  width: 100%;
  height: 52px;
  color: ${props => props.fontColor};
  padding: 0px 24px;
  margin-bottom: 10px;
  border: 1px solid rgb(230, 230, 230);
  border-radius: 4px;
  font-size: 16px;
  font-weight: 700;
  line-height: 27px;
  outline: none;
  cursor: pointer;

  ${colorStyles}
  img {
    width: 17px;
    margin-right: 10px;
  }
`;
