import React from 'react';
import styled from 'styled-components';

export default function FilterDropdown({ subTabData, addFilter }) {
  return (
    <FilterMenu>
      {subTabData.map((subTabData, idx) => {
        return (
          <FilterItem
            key={idx}
            id={idx}
            onClick={() => addFilter(subTabData.query, subTabData.data, idx)}
          >
            {subTabData.name}
          </FilterItem>
        );
      })}
    </FilterMenu>
  );
}

const FilterMenu = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  left: 0;
  width: auto;
  padding: 7px 15px;
  border-radius: 4px;
  box-shadow: 1px 1px 4px rgb(155, 155, 155);
  color: #555555;
  background-color: white;
  font-size: 15px;
  line-height: 34px;
  z-index: 5;
  white-space: nowrap;
`;

const FilterItem = styled.button`
  width: auto;
  height: 34px;
  border: 0px;
  background-color: transparent;
  :nth-child(1) {
    color: red;
  }
`;
