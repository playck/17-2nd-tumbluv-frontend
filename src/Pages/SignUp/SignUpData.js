const signupData = {
  inputTextData: [
    {
      inputTitle: '이름',
      inputData: [
        {
          name: 'name',
          type: 'text',
          placeholder: '사용하실 이름을 입력해주세요.',
          invalidText: '이름은 3자 이상, 20자 이하로 입력하세요.',
        },
      ],
    },
    {
      inputTitle: '이메일 주소',
      inputData: [
        {
          name: 'email',
          type: 'email',
          placeholder: '이메일 주소를 입력해주세요.',
          invalidText: '유효하지 않은 이메일 형식입니다.',
        },
      ],
    },
    {
      inputTitle: '비밀번호',
      inputData: [
        {
          name: 'password',
          type: 'password',
          placeholder: '비밀번호를 입력해주세요.',
          invalidText: '비밀번호는 6자 이상, 20자 이하로 입력하세요.',
        },
      ],
    },
  ],
  inputCheckData: [
    {
      name: 'check1',
      type: 'checkbox',
      label: '텀블벅 이용 약관동의',
    },
    {
      name: 'check2',
      type: 'checkbox',
      label: '개인정보 수집,이용 동의',
    },
    {
      name: 'check3',
      type: 'checkbox',
      label: '만 14세 이상입니다.',
    },
    {
      name: 'check4',
      type: 'checkbox',
      label: '마케팅 정보 수신 동의(선택)',
    },
  ],
};
export default signupData;
