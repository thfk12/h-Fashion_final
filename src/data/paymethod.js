export const paymethodsCard = [
  {
    id: 1,
    paymethod: 'card',
    title: "카드선택",
    payDepth: [
      {
        id: 1,
        label: "삼성카드",
      },
      {
        id: 2,
        label: "현대카드",
      },
      {
        id: 3,
        label: "롯데카드",
      },
      {
        id: 4,
        label: "신한카드",
      },
    ],
  },
  {
    id: 2,
    paymethod: 'card',
    title: "할부선택",
    payDepth: [
      {
        id: 1,
        label: "일시불",
      },
      {
        id: 2,
        label: "2개월",
      },
      {
        id: 3,
        label: "3개월(무이자)",
      },
      {
        id: 1,
        label: "4개월",
      },
    ],
  },
];

export const paymethodsPay = [
  { id: 1, paymethod: 'pay', label: "카카오페이" },
  { id: 2, paymethod: 'pay', label: "토스페이" },
  { id: 3, paymethod: 'pay', label: "네이버페이" },
];

export const paymethodsBank = [
  {
    id: 1,
    paymethod: 'bank',
    label: "입금은행 선택",
    payDepth: [
      {
        id: 1,
        label: "국민은행",
      },
      {
        id: 2,
        label: "신한은행",
      },
      {
        id: 3,
        label: "하나은행",
      },
      {
        id: 4,
        label: "기업은행",
      },
      {
        id: 5,
        label: "농협은행",
      },
    ],
  },
  {
    id:2,
    paymethod: 'bank',
    label: '입금자명'
  }
];
