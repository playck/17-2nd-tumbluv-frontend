const FormInputList = [
  {
    id: 1,
    FormTitle: '프로젝트 개요',
    item: [
      {
        id: 1,
        FormTitle: '프로젝트 제목',
        FormInput: '프로젝트 제목을 입력해주세요',
        name: 'name',
        type: 'text',
      },
      {
        id: 2,
        FormTitle: '프로젝트 대표 이미지',
        FormInput: '프로젝트 대표 이미지를 등록해주세요',
        name: 'thumbnailUrl',
        type: 'file',
      },
      {
        id: 3,
        FormTitle: '프로젝트 요약',
        FormInput: '프로젝트 요약을 입력해주세요',
        name: 'summary',
        type: 'text',
      },
      {
        id: 4,
        FormTitle: '프로젝트 카테고리',
        FormInput:
          '프로젝트 카테고리를 입력해주세요 ( 푸드, 패션, 사진, 공예, 테크 )',
        name: 'category',
        type: 'text',
      },
      {
        id: 5,
        FormTitle: '프로젝트 스토리',
        FormInput: '프로젝트 스토리를 입력해주세요',
        name: 'story',
        type: 'text',
      },
      {
        id: 6,
        FormTitle: '프로젝트 url',
        FormInput: '프로젝트 url를 입력해주세요 ( 예시: fashion )',
        name: 'url',
        type: 'text',
      },
    ],
  },
  {
    id: 2,
    FormTitle: '펀딩 목표 및 구성',
    item: [
      {
        id: 1,
        FormTitle: '목표 금액',
        FormInput: '목표 금액을 입력해 주세요',
        name: 'goalAmount',
        type: 'number',
      },
      {
        id: 2,
        FormTitle: '프로젝트 오픈',
        FormInput: '프로젝트 공개일시를 정해주세요',
        name: 'openingDate',
        type: 'date',
      },
      {
        id: 3,
        FormTitle: '프로젝트 마감',
        FormInput: '프로젝트 마감일을 입력해주세요',
        name: 'closingDate',
        type: 'date',
      },
    ],
  },
  {
    id: 3,
    FormTitle: '선물 구성',
    item: [
      {
        id: 1,
        FormTitle: '선물 추가하기',
        FormInput: '후원자 분들에게 드릴 선물 내용을 입력해주세요',
      },
    ],
  },
];

export default FormInputList;
