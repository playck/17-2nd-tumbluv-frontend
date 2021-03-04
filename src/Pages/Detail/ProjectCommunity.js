import React from 'react';
import styled from 'styled-components';
const ProjectCommunity = ({ data }) => {
  return (
    <Community>
      {/* <div className="title">커뮤니티</div> */}
      <CommunityCard>
        <CommunityAuthorInfo>
          <img
            alt="user_icon"
            src="https://tumblbug-upi.imgix.net/defaults/avatar_1.png?ixlib=rb-1.1.0&w=100&h=125&auto=format%2Ccompress&fit=facearea&facepad=2.0&ch=Save-Data&mask=ellipse&s=04ff38ed605d1b98dd97bed309eda58d"
          ></img>
          <AuthorContent>
            <p>{data.user}</p>
            <span>{data.past_date}일 전</span>
          </AuthorContent>
        </CommunityAuthorInfo>
        <TextContent>{data.comment}</TextContent>
        {data.recomment && (
          <CommentContent>
            <img
              alt="comment_user_icon"
              src="https://tumblbug-upi.imgix.net/defaults/avatar_6.png?ixlib=rb-1.1.0&w=100&h=125&auto=format%2Ccompress&fit=facearea&facepad=2.0&ch=Save-Data&mask=ellipse&s=a7f318cac057dee9ef2d9c2148e8dc89"
            ></img>
            <CommentInfo>
              <div>
                <p>{data.recomment[0].user}</p>
                <h5>{data.recomment[0].comment}</h5>
              </div>
              <span>{data.created_at.substr(0, 10)}</span>
            </CommentInfo>
          </CommentContent>
        )}
      </CommunityCard>
    </Community>
  );
};
const Community = styled.section`
  width: 648px;
  height: 1000px;
`;
const CommunityCard = styled.article`
  padding: 14px;
  margin-bottom: 14px;
  background-color: white;
`;
const CommunityAuthorInfo = styled.div`
  display: flex;
  padding: 20px;
  img {
    width: 40px;
    height: 50px;
  }
`;
const AuthorContent = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  p {
    margin-bottom: 5px;
    font-size: 15px;
    font-weight: 700;
    line-height: 24px;
  }
  span {
    color: rgb(117, 117, 117);
    font-size: 14px;
  }
`;

const TextContent = styled.div`
  margin: 28px 0;
  padding: 0 14px;
  font-size: 17px;
  line-height: 31px;
`;

const CommentContent = styled.div`
  display: flex;
  padding: 17.5px 7px;
  border-top: 1px solid rgb(239, 239, 239);
  img {
    width: 40px;
    height: 50px;
  }
`;

const CommentInfo = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  justify-content: space-between;

  div {
    margin-left: 12px;
    p {
      font-size: 15px;
      font-weight: 700;
      line-height: 24px;
    }
    h5 {
      font-size: 14px;
      line-height: 24px;
    }
  }
  span {
    position: absolute;
    right: 0px;
    font-size: 13px;
    line-height: 24px;
    color: #757575;
  }
`;
export default ProjectCommunity;
