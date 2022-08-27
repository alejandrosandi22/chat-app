const dateFormat = (date: string) => {
  const dateObj = new Date(date);
  return `${dateObj.getDate()}/${dateObj.getMonth() + 1 < 10 ? 0 : ''}${
    dateObj.getMonth() + 1
  }/${dateObj.getFullYear()}`;
};

export default dateFormat;
