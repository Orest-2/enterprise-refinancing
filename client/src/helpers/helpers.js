export const dc = (d) => JSON.parse(JSON.stringify(d));

export const chuncs = (arr, size) => {
  const carr = dc(arr);
  const newArr = [];
  while (carr.length) newArr.push(carr.splice(0, size));
  return newArr;
};
