export const checkOptions = [
  {
    label: '地球',
    value: 'earth',
  },
  {
    label: '银河',
    value: 'galaxy',
  },
];

export const selectOptions = [
  {
    label: '星系',
    options: [
      {
        label: '地球',
        value: 'earth',
      },
      {
        label: '银河',
        value: 'galaxy',
        disabled: true,
      },
    ],
  },
  {
    label: '水果',
    options: [
      {
        label: '香蕉',
        value: 'banana',
      },
      {
        label: '苹果',
        value: 'apple',
      },
    ],
  },
];

export const cascaderOptions = [
  {
    label: '蔬菜',
    value: 'vegetable',
    children: [
      {
        label: '土豆',
        value: 'potato',
      },
      {
        label: '白菜',
        value: 'cabbage',
      },
    ],
  },
  {
    label: '水果',
    value: 'fruit',
    children: [
      {
        label: '香蕉',
        value: 'banana',
      },
      {
        label: '苹果',
        value: 'apple',
      },
    ],
  },
];
