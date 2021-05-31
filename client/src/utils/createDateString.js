//get date in a formatted string for db usage
export const createDateString = date => {
  const dateObj = new Date(date.slice(0, 10));
  return `${dateObj.getUTCFullYear()}-${
    dateObj.getUTCMonth() + 1 < 10
      ? "0" + (dateObj.getUTCMonth() + 1)
      : dateObj.getUTCMonth() + 1
  }-${
    dateObj.getUTCDate() < 10
      ? "0" + dateObj.getUTCDate()
      : dateObj.getUTCDate()
  }`;
};

//get date in a formatted string for putting on the vacation card
export const createCardDateString = date => {
  const dateObj = new Date(date.slice(0, 10));

  return `${dateObj.getUTCDate()}/${
    dateObj.getUTCMonth() + 1
  }/${dateObj.getUTCFullYear()}`;
};
