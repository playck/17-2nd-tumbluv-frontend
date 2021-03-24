import React, { useState } from 'react';
import styled from 'styled-components';
import { FaCheck } from 'react-icons/fa';
import { FaTimesCircle } from 'react-icons/fa';

const SupportCard = ({ data }) => {
  const [cardIdx, setCardIdx] = useState(0);
  const [money, setMoney] = useState(0);

  const openAdditionalSupport = id => {
    setCardIdx(id);
    setMoney(0);
  };

  const selectPlusSupport = e => {
    setMoney(money + Number(e.target.value));
  };

  const changeSupportValue = e => {
    setMoney(Number(e.target.value));
  };

  const deleteSupportValue = () => {
    setMoney(0);
  };

  const alertSupportRequest = () => {
    alert(`${money.toLocaleString()}원 후원 신청이 완료되었습니다.`);
    setCardIdx(0);
  };

  return (
    <>
      <CardList>
        <div>선물 선택</div>
        {data.map(support => {
          return (
            <SupportAmount key={support.id} value={support.id}>
              <div onClick={() => openAdditionalSupport(support.id)}>
                <div className="people">
                  <FaCheck size="10" />
                  <span>{support.people}</span>명이 선택
                </div>
                <div className="amount">
                  <span>{Number(support.money).toLocaleString()}</span>+
                </div>
                <div className="description">{support.description}</div>
              </div>
              {cardIdx === support.id && (
                <SupportApply>
                  <div className="midLine"></div>
                  <div>추가 후원금(선택)</div>
                  <input
                    type="text"
                    placeholder="0"
                    value={money}
                    onChange={changeSupportValue}
                  />
                  <DelBtn onClick={deleteSupportValue}>
                    <FaTimesCircle size="18" />
                  </DelBtn>
                  <div className="applyInfo">
                    * 더 후원해주시면 프로젝트가 성사가 앞당겨집니다.
                  </div>
                  <BtnList>
                    <li>
                      <button value={5000} onClick={e => selectPlusSupport(e)}>
                        + 5천 원
                      </button>
                    </li>
                    <li>
                      <button value={10000} onClick={e => selectPlusSupport(e)}>
                        + 1만 원
                      </button>
                    </li>
                    <li>
                      <button value={50000} onClick={e => selectPlusSupport(e)}>
                        + 5만 원
                      </button>
                    </li>
                    <li>
                      <button
                        value={100000}
                        onClick={e => selectPlusSupport(e)}
                      >
                        + 10만 원
                      </button>
                    </li>
                  </BtnList>
                  <ApplyBtn onClick={alertSupportRequest}>
                    <span>
                      {money
                        ? money.toLocaleString()
                        : Number(support.money).toLocaleString()}
                    </span>
                    원 밀어주기
                  </ApplyBtn>
                </SupportApply>
              )}
            </SupportAmount>
          );
        })}
      </CardList>
    </>
  );
};

const CardList = styled.div`
  width: 330px;
  margin: 18px 0 0 20px;
`;

const SupportAmount = styled.div`
  width: 330px;
  margin-top: 10px;
  padding: 20px;
  background-color: white;
  border-radius: 5px;
  cursor: pointer;
  :hover {
    border: 1px solid black;
  }
  .people {
    margin-bottom: 15px;
    font-size: 14px;
    color: rgb(109, 109, 109);
    span {
      margin-left: 8px;
    }
  }
  .amount {
    margin-bottom: 10px;
    font-size: 24px;
    span {
      margin-right: 4px;
    }
  }
  .description {
    color: rgb(109, 109, 109);
  }
`;

const SupportApply = styled.div`
  width: 310px;
  .midLine {
    height: 1px;
    margin: 20px 0 20px -20px;
    border-top: 6px solid rgb(230, 230, 230);
  }
  div {
    margin-bottom: 10px;
    font-size: 14px;
  }
  .applyInfo {
    font-size: 12px;
    color: lightgray;
  }

  input {
    width: 290px;
    margin-bottom: 10px;
    padding: 10px 0;
    padding-left: 10px;
    border: 1px solid rgb(230, 230, 230);
    border-radius: 5px;
  }
`;

const DelBtn = styled.button`
  position: relative;
  top: 5px;
  left: -30px;
  padding: 1px;
  background-color: transparent;
  border: none;
  color: lightgray;
  cursor: pointer;
`;

const BtnList = styled.ul`
  display: flex;
  margin-bottom: 10px;
  li {
    margin-right: 6px;
    button {
      width: 68px;
      height: 36px;
      background-color: transparent;
      border: 1px solid rgb(230, 230, 230);
      border-radius: 5px;
      cursor: pointer;
      :hover {
        background-color: rgb(235, 235, 235);
      }
    }
  }
`;

const ApplyBtn = styled.button`
  width: 290px;
  height: 44px;
  background-color: ${props => props.theme.fontPointColor};
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  :hover {
    background-color: #ff6464;
  }
`;

export default SupportCard;
