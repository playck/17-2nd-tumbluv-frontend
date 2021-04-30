const FormInputList = [
  {
    summary: [
      {
        id: 1,
        FormInput: '프로젝트 제목을 입력해주세요',
        name: 'name',
        type: 'text',
      },
      {
        id: 2,
        FormInput: '프로젝트 대표 이미지를 등록해주세요',
        name: 'thumbnailUrl',
        type: 'file',
      },
      {
        id: 3,
        FormInput: '프로젝트 요약을 입력해주세요',
        name: 'summary',
        type: 'text',
      },
      {
        id: 4,
        FormInput: '프로젝트 카테고리를 선택해주세요',
        name: 'category',
        type: 'radio',
      },
      {
        id: 5,
        FormInput: '프로젝트 스토리를 입력해주세요',
        name: 'story',
        type: 'text',
      },
      {
        id: 6,
        FormInput: '프로젝트 url 키워드를 입력해주세요 ( 예시: fashion )',
        name: 'url',
        type: 'text',
      },
    ],
    goal: [
      {
        id: 1,
        FormInput: '목표 금액을 입력해 주세요',
        name: 'goalAmount',
        type: 'number',
      },
      {
        id: 2,
        FormInput: '프로젝트 공개일시를 정해주세요',
        name: 'openingDate',
        type: 'date',
      },
      {
        id: 3,
        FormInput: '프로젝트 마감일을 입력해주세요',
        name: 'closingDate',
        type: 'date',
      },
    ],
    present: [
      {
        id: 10,
        FormInput: '후원자 분들에게 드릴 선물 내용을 입력해주세요',
        list: [
          {
            id: 1,
            text: '선물 이름',
            name: 'giftName',
            type: 'text',
          },
          {
            id: 2,
            text: '선물 가격',
            name: 'giftPrice',
            type: 'number',
          },
          {
            id: 3,
            text: '선물 갯수',
            name: 'giftStock',
            type: 'number',
          },
        ],
      },
    ],
  },
];

export default FormInputList;
