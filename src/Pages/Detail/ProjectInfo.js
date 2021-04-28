import React from 'react';
import styled from 'styled-components';
import { FaHeart } from 'react-icons/fa';
import { FaShareAlt } from 'react-icons/fa';

const ProjectInfo = ({ data }) => {
  const yyyy = data.payment_date.substr(0, 4);
  const mm = data.payment_date.substr(5, 2);
  const dd = data.payment_date.substr(8, 2);
  const fundingDate = `${yyyy}년 ${mm}월 ${dd}일`;

  return (
    <>
      <ProjectIntroduction>
        <IntroductionHeader>
          <span>{data.category}</span>
          <h1>{data.name}</h1>
          <div>{data.creator}</div>
        </IntroductionHeader>
        <IntroductionMain>
          <div className="projectImg">
            <img alt={data.name + 'image'} src={data.thumbnail_url} />
            <MainRight>
              <div className="projectInfo">
                <div className="supportValue">
                  <div>모인 금액</div>
                  <div className="statusValue">
                    <span>{Number(data.total_amount).toLocaleString()}</span>
                    <span>원</span>
                    <span className="supportStatus">
                      {Math.round(data.achieved_rate)}%
                    </span>
                  </div>
                </div>
                <div className="supportValue">
                  <div>남은 시간</div>
                  <div className="statusValue">
                    <span>{Math.abs(data.rest_date)}</span>
                    <span>일</span>
                  </div>
                </div>
                <div className="supportValue">
                  <div>후원자</div>
                  <div className="statusValue">
                    <span>
                      {Number(data.total_supporters).toLocaleString() || 0}
                    </span>
                    <span>명</span>
                  </div>
                </div>
              </div>
              <SupportCard>
                <div>펀딩 진행중</div>
                <p>
                  목표 금액인 {Number(data.goal_amount).toLocaleString()}원이
                  모여야만 결제됩니다. <br />
                  결제는 {fundingDate}에 다함께 진행됩니다.
                </p>
              </SupportCard>
              <SupportButton>
                <button className="supportBtn">프로젝트 밀어주기</button>
                <button>
                  <FaHeart />
                </button>
                <button>
                  <FaShareAlt />
                </button>
              </SupportButton>
            </MainRight>
          </div>
        </IntroductionMain>
      </ProjectIntroduction>
    </>
  );
};

const ProjectIntroduction = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
`;

const IntroductionHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 14px;
  margin: 0 auto;
  span {
    padding: 8.4px;
    border: 1px solid lightgray;
    border-radius: 5px;
  }
  h1 {
    margin: 21px 0 14px;
    font-size: 40px;
  }
`;

const IntroductionMain = styled.section`
  width: 1000px;
  margin: 0 auto;
  .projectImg {
    display: flex;
    width: 650px;
    height: 486px;
    margin-top: 20px;
    img {
      width: 100%;
      height: 100%;
    }
  }
`;

const MainRight = styled.div`
  margin-left: 10px;

  .projectInfo {
    width: 300px;
    margin-left: 14px;
    .supportValue {
      margin-top: 30px;
      :nth-child(1) {
        margin-top: 10px;
      }
    }
    .statusValue {
      width: 350px;
      margin-top: 15px;
      span {
        font-size: 16px;
        :nth-child(1) {
          margin-right: 5px;
          font-size: 38.5px;
        }
      }
      .supportStatus {
        margin-left: 10px;
        font-size: 18px;
        font-weight: 800;
      }
    }
  }
`;

const SupportCard = styled.div`
  width: 340px;
  height: 94px;
  margin: 30px 0 0 7px;
  padding: 14px 14px;
  background-color: rgb(245, 245, 245);
  border: 1px solid rgb(239, 239, 239);
  border-radius: 5px;
  font-size: 14px;
  p {
    margin-top: 7px;
    line-height: 20px;
  }
`;

const SupportButton = styled.div`
  width: 340px;
  margin: 20px 0 0 7px;
  button {
    width: 54px;
    height: 62px;
    margin-right: 10px;
    border: 1px solid rgb(239, 239, 239);
    border-radius: 5px;
    cursor: pointer;
    :last-child {
      margin-right: 0;
    }
    svg {
      width: 20px;
      height: 20px;
    }
  }
  .supportBtn {
    position: relative;
    top: -4px;
    width: 210px;
    background-color: ${props => props.theme.fontPointColor};
    border: none;
    border-radius: 5px;
    color: white;
    font-size: 16px;
    font-weight: 700;
    z-index: 1;
    :hover {
      background-color: #ff6464;
    }
  }
`;

export default ProjectInfo;
