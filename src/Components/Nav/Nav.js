import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import theme from '../../Styles/theme';
import { FaSistrix } from 'react-icons/fa';
import { FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <ThemeProvider theme={theme}>
      <Navbar>
        <NavWrap>
          <Link to="/projectupload">
            <UploadBtn>프로젝트 올리기 시작하기</UploadBtn>
          </Link>
          <Link to="/">
            <LogoImg>
              <img
                alt="logo"
                src="https://media.vlpt.us/images/jenny87879/post/fe705740-9304-4201-b373-00cdcb61f4ab/tumbluv.png"
              />
            </LogoImg>
          </Link>
          <RightMenu>
            <FaSistrix size="25" />
            <div>
              <Link to="/login">
                <span>로그인 / </span>
              </Link>
              <Link to="/signup">
                <span>회원가입</span>
              </Link>
            </div>
            <FaUserCircle size="32" />
          </RightMenu>
        </NavWrap>
      </Navbar>
    </ThemeProvider>
  );
};

const Navbar = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  background-color: white;
  box-shadow: 0 6px 6px -4px lightgray;
`;

const NavWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1000px;
  margin: 0 auto;
`;

const UploadBtn = styled.div`
  width: 200px;
  height: 45px;
  background-color: ${props => props.theme.fontPointColor};
  border-radius: 5px;
  line-height: 45px;
  text-align: center;
  color: white;
  font-weight: bold;
  cursor: pointer;
`;

const LogoImg = styled.div`
  img {
    width: 200px;
    height: 55px;
    margin-top: 10px;
  }
`;

const RightMenu = styled.div`
  display: flex;
  align-items: center;
  div {
    margin: 0 10px;
    span {
      cursor: pointer;
    }
  }
`;

export default Nav;
