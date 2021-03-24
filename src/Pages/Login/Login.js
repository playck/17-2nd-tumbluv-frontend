import React, { useState } from 'react';
import styled from 'styled-components';
import theme from '../../Styles/theme';
import InputText from '../SignUp/Components/InputText';
import Button from '../SignUp/Components/Button';
import { Main, Card, Title, FormGroup, Footer } from '../SignUp/SignUp';
import { kakaoAPI } from '../../config';
import { loginAPI } from '../../config';
import loginData from './LoginData';
export default function Login({ history }) {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });
  const handleInputTextValue = e => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  const handleLogin = () => {
    const { email, password } = inputs;
    if (email.includes('@', '.') && password.length >= 6) {
      fetch(loginAPI, {
        method: 'POST',
        body: JSON.stringify({
          fullname: inputs.name,
          email: inputs.email,
          password: inputs.password,
        }),
      })
        .then(res => res.json())
        .then(res => {
          if (res.message === 'SUCCESS') {
            alert('로그인 완료!');
            localStorage.setItem('access_token', res.access_token);
            history.push('/');
          }
        });
    } else {
      alert('이메일 주소나 비밀번호 확인 바랍니다.');
    }
  };

  const handleKakaoLogin = () => {
    window.Kakao.Auth.login({
      success: auth => {
        fetch(kakaoAPI, {
          method: 'GET',
          headers: { Authorization: auth.access_token },
        })
          .then(res => res.json())
          .then(res => {
            alert('카카오 로그인 완료!');
            localStorage.setItem('access_token', res.access_token);
            history.push('/');
          });
      },
      fail: error => {
        alert(JSON.stringify(error));
      },
    });
  };
  return (
    <Main>
      <Card>
        <Title>로그인</Title>
        <FormGroup>
          {loginData.map((input, idx) => {
            return (
              <InputText
                key={idx}
                name={input.name}
                type={input.type}
                placeholder={input.placeholder}
                onChange={handleInputTextValue}
              />
            );
          })}
        </FormGroup>
        <LoginBtn
          clicked={handleLogin}
          color={theme.fontPointColor}
          fontColor="#FFFFFF"
        >
          로그인
        </LoginBtn>
        <KakapSignUpBtn
          clicked={handleKakaoLogin}
          color="#FFFFFF"
          fontColor="#3D3D3D"
        >
          <img
            alt="kakao-icon"
            src="data:image/svg+xml;base64,PHN2ZyBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCAyNCAyNCIgaGVpZ2h0PSI1MTIiIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjUxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJtMTIgMWMtNi42MjcgMC0xMiA0LjIwOC0xMiA5LjM5OSAwIDMuMzU2IDIuMjQ2IDYuMzAxIDUuNjI1IDcuOTYzLTEuNjc4IDUuNzQ5LTIuNjY0IDYuMTIzIDQuMjQ0IDEuMjg3LjY5Mi4wOTcgMS40MDQuMTQ4IDIuMTMxLjE0OCA2LjYyNyAwIDEyLTQuMjA4IDEyLTkuMzk5IDAtNS4xOS01LjM3My05LjM5OC0xMi05LjM5OHoiIGZpbGw9IiMzZTI3MjMiLz48ZyBmaWxsPSIjZmZlYjNiIj48cGF0aCBkPSJtMTAuMzg0IDguMjdjLS4zMTctLjg5My0xLjUyOS0uODk0LTEuODQ1LS4wMDEtLjk4NCAzLjA1Mi0yLjMwMiA0LjkzNS0xLjQ5MiA1LjMwNiAxLjA3OC40ODkgMS4xMDEtLjYxMSAxLjM1OS0xLjFoMi4xMTFjLjI1Ny40ODcuMjgyIDEuNTg4IDEuMzU5IDEuMS44MTMtLjM3MS0uNDg5LTIuMTk1LTEuNDkyLTUuMzA1em0tMS42MTQgMi45ODcuNjkyLTEuOTUxLjY5MSAxLjk1MXoiLz48cGF0aCBkPSJtNS4zNjUgMTMuNjhjLTEuMTk4IDAtLjQ5LTEuNjU3LS42OTItNC43NDItLjQyOS0uMDc0LTEuNzYuMjk3LTEuNzYtLjY3MyAwLS4zNzEuMzA1LS42NzMuNjc5LS42NzMgMi41MTguMTggNC4yMjQtLjQ3IDQuMjI0LjY3MyAwIC45ODctMS4yNzUuNTktMS43Ni42NzMtLjIgMy4wNzUuNTA1IDQuNzQyLS42OTEgNC43NDJ6Ii8+PHBhdGggZD0ibTEzLjE1NCAxMy41NzljLTEuMTU5IDAtLjQ1NC0xLjU2NS0uNjYzLTUuMzAxIDAtLjkxIDEuNDEzLS45MDkgMS40MTMgMHY0LjA0Yy42NjkuMDg5IDIuMTM1LS4zMyAyLjEzNS42My0uMDAxIDEuMDA3LTEuNTc2LjUwMy0yLjg4NS42MzF6Ii8+PHBhdGggZD0ibTE5LjU1NiAxMy4zOC0xLjYyNC0yLjEzNy0uMjQuMjM5djEuNWMwIC4zOC0uMzEuNjg4LS42OTMuNjg4LTEuMjAzIDAtLjQ4Mi0xLjczMi0uNjkyLTUuMzkyIDAtLjM3OS4zMS0uNjg4LjY5Mi0uNjg4IDEuMDQ1IDAgLjU5NCAxLjQ3OC42OTIgMi4xNjYgMS45Ni0xLjg3MyAxLjkxMy0yLjA3MiAyLjMxNi0yLjA3Mi41NTYgMCAuODk3LjY5MS41MjcgMS4wNThsLTEuNTc4IDEuNTY3IDEuNzA0IDIuMjQzYy41NTYuNzI1LS41NTUgMS41NTYtMS4xMDQuODI4eiIvPjwvZz48L3N2Zz4="
          />
          카카오 아이디로 로그인하기
        </KakapSignUpBtn>
        <GoToSignUp>
          아직 텀블벅 계정이 없으신가요? &nbsp;
          <a href="/signup">가입하기</a>
        </GoToSignUp>
      </Card>
      <Footer>© 2021 Tumbluv Inc.</Footer>
    </Main>
  );
}
const LoginBtn = styled(Button)``;
const KakapSignUpBtn = styled(Button)``;
const GoToSignUp = styled.div`
  margin: 15px;
  text-align: center;
  font-size: 13px;
  line-height: 20px;
  a {
    color: rgb(39, 163, 255);
  }
`;
