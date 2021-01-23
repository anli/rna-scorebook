export const getSummaryHeaders = (categories: any[]) => {
  const categoryHeaders = categories.map((category) => ({
    title: category.name,
    isNumeric: Boolean(category.isNumeric),
  }));

  return [
    {title: 'Player'},
    ...categoryHeaders,
    {title: 'Total', isNumeric: true},
  ];
};
