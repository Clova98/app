const formatDate = (date: string): string => {
  if (!date) {
    return 'Invalid date';
  }
  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) {
    return 'Invalid date';
  }
  return parsedDate.toLocaleDateString();
};

export default formatDate;
