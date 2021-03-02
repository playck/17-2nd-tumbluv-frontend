import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import theme from '../../Styles/theme';
import InputText from './Components/InputText';
import InputCheck from './Components/InputCheck';
import Button from './Components/Button';
import signupData from './SignUpData';
import { kakaoAPI } from '../../Config';
import { emailSendAPI } from '../../Config';
import { authNumAPI } from '../../Config';
import { signinAPI } from '../../Config';
import { kakaoIcon } from '../../Config';

const reg = {
  name: /^.{3,20}$/,
  email: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
  emailAuthNum: /^.{0,6}$/,
  password: /^.{6,20}$/,
};

export default function SignUp({ history }) {
  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    emailAuthNum: '',
    password: '',
  });

  const [isValids, setIsValid] = useState({
    name: true,
    email: true,
    emailAuthNum: true,
    password: true,
  });

  const [isChecks, setIsChecks] = useState({
    check1: false,
    check2: false,
    check3: false,
    check4: false,
  });

  const [isSendEmail, setIsSendEmail] = useState(false);
  const [isSendEmailAuthNum, setIsSendEmailAuthNum] = useState(false);

  const handleInputTextValue = e => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const handleInputCheckValue = e => {
    const { name, checked } = e.target;
    setIsChecks({
      ...isChecks,
      [name]: checked,
    });
  };

  const handleValidation = useCallback(() => {
    for (let key in inputs) {
      let isValid = reg[key].test(inputs[key]);

      if (inputs[key] === '') {
        setIsValid(preValid => ({ ...preValid, [key]: true }));
      } else {
        setIsValid(preValid => ({ ...preValid, [key]: isValid }));
      }
    }
  }, [inputs]);

  useEffect(() => {
    handleValidation();
  }, [handleValidation]);

  const handlesendEmail = () => {
    fetch(emailSendAPI, {
      method: 'POST',
      body: JSON.stringify({
        email: inputs.email,
      }),
    })
      .then(res => res.json())
      .then(res => {
        if (res.message === 'SUCCESS') {
          alert(
            '이메일 주소로 인증 코드를 전달했습니다. 인증 번호 확인 부탁드립니다.',
          );
          setIsSendEmail(true);
        } else {
          alert('이메일 주소를 확인해주세요');
        }
      });
  };

  const handleSendAuthNum = () => {
    fetch(authNumAPI, {
      method: 'POST',
      body: JSON.stringify({
        email: inputs.email,
        code: inputs.emailAuthNum,
      }),
    })
      .then(res => res.json())
      .then(res => {
        if (res.message === 'EMAIL_VALIDATE_SUCCESS') {
          alert('인증 완료!');
          setIsSendEmailAuthNum(true);
        } else if (res.message === 'TIME_OUT') {
          alert(
            '제한 시간이 만료되었습니다. 이메일 인증코드를 재전달 드립니다.',
          );
        } else if (res.message === 'INVALID_CODE') {
          alert('인증번호가 틀렸습니다. 다시 확인 바랍니다.');
        } else if (res.message === 'NEED_CODE') {
          alert('인증번호를 입력 바랍니다.');
        } else {
          alert('인증번호 확인 부탁드립니다.');
        }
      });
  };

  const handleSignUp = () => {
    const { name, email, password } = isValids;
    const { check1, check2, check3 } = isChecks;

    if (
      name &&
      email &&
      password &&
      isSendEmailAuthNum &&
      check1 &&
      check2 &&
      check3
    ) {
      history.push('/login');
      fetch(signinAPI, {
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
            alert('회원가입 완료!');
            history.push('/login');
          } else if (res.message === 'ALREADY_EXIST') {
            alert('이미 가입한 유저입니다.');
          }
        });
    } else if (!isSendEmail) {
      alert('이메일 인증이 필요합니다.');
    } else if (!isSendEmailAuthNum) {
      alert('이메일 인증번호 확인이 필요합니다.');
    } else {
      alert('필수 입력칸을 확인해주세요.');
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
            console.log(res);
            alert('카카오 로그인 완료!');
            localStorage.setItem('access_token', res.token);
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
        <Title>이메일로 가입하기</Title>
        {signupData.inputTextData.map((data, idx) => {
          return (
            <FormGroup key={idx}>
              <FormTitle>{data.inputTitle}</FormTitle>
              {data.inputData.map((input, idx) => {
                return (
                  <>
                    <InputText
                      key={idx}
                      name={input.name}
                      type={input.type}
                      placeholder={input.placeholder}
                      onChange={handleInputTextValue}
                    />
                    {isSendEmail &&
                      !isSendEmailAuthNum &&
                      isValids.email &&
                      input.name === 'email' && (
                        <InputText
                          name="emailAuthNum"
                          type="text"
                          placeholder="이메일 인증 번호를 입력해주세요."
                          onChange={handleInputTextValue}
                        />
                      )}
                    {!isValids[input.name] && (
                      <InvalidInfo>{input.invalidText}</InvalidInfo>
                    )}
                    {!isSendEmail &&
                      !isSendEmailAuthNum &&
                      input.name === 'email' && (
                        <SendEmailBtn
                          color="#FFFFFF"
                          fontColor={theme.fontPointColor}
                          clicked={handlesendEmail}
                        >
                          이메일 인증하기
                        </SendEmailBtn>
                      )}
                    {isSendEmail &&
                      isValids.email &&
                      !isSendEmailAuthNum &&
                      input.name === 'email' && (
                        <SendAuthNumBtn
                          color="#FFFFFF"
                          fontColor={theme.fontPointColor}
                          clicked={handleSendAuthNum}
                        >
                          인증 번호 확인하기
                        </SendAuthNumBtn>
                      )}
                  </>
                );
              })}
            </FormGroup>
          );
        })}
        <FormGroup>
          {signupData.inputCheckData.map((data, idx) => {
            return (
              <InputCheck
                key={idx}
                name={data.name}
                type={data.type}
                label={data.label}
                onChange={handleInputCheckValue}
              />
            );
          })}
        </FormGroup>
        <SignUpBtn
          clicked={handleSignUp}
          color={theme.fontPointColor}
          fontColor="#FFFFFF"
        >
          가입하기
        </SignUpBtn>
        <KakaoLoginBtn
          clicked={handleKakaoLogin}
          color="#FFFFFF"
          fontColor="#3D3D3D"
        >
          <img alt="kakao-icon" src={kakaoIcon} />
          카카오 아이디로 로그인하기
        </KakaoLoginBtn>
        <GoToLogin>
          이미 텀블럽 계정이 있으신가요?
          <br />
          <a href="/login">기존 계정으로 로그인하기</a>
        </GoToLogin>
      </Card>
      <Footer>© 2021 Tumbluv Inc.</Footer>
    </Main>
  );
}

export const Main = styled.div`
  width: 400px;
  padding: 120px 0px;
  margin: 0px auto;
`;

export const Card = styled.div`
  padding: 32px;
  margin-bottom: 12px;
  border-radius: 5px;
  border: 1px solid #e4e4e4;
  color: #757575;
  font-size: 11px;
  line-height: 24px;
`;

export const Title = styled.h1`
  margin-bottom: 32px;
  color: black;
  text-align: left;
  font-size: 24px;
  font-weight: 700;
  line-height: 36px;
`;

export const FormGroup = styled.div`
  margin-bottom: 17px;
`;

export const FormTitle = styled.p`
  margin: 0px 0px 10px;
  color: #3d3d3d;
  font-size: 14px;
  line-height: 24px;
`;

export const InvalidInfo = styled.p`
  margin-bottom: 12px;
  color: ${props => props.theme.fontPointColor};
  font-size: 13px;
  line-height: 20px;
`;

export const SendEmailBtn = styled(Button)``;

export const SignUpBtn = styled(Button)``;

export const KakaoLoginBtn = styled(Button)``;

export const SendAuthNumBtn = styled(Button)``;

export const GoToLogin = styled.div`
  margin: 15px;
  text-align: center;
  font-size: 13px;
  line-height: 20px;

  a {
    color: rgb(39, 163, 255);
  }
`;

export const Footer = styled.footer`
  color: #757575;
  font-size: 11px;
  text-align: center;
  line-height: 24px;
`;
