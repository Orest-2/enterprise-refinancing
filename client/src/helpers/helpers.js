const dc = (d) => JSON.parse(JSON.stringify(d));

const chuncs = (arr, size) => {
  const carr = dc(arr);
  const newArr = [];
  while (carr.length) newArr.push(carr.splice(0, size));
  return newArr;
};

const rangeArr = (start, stop, step = 1) => Array(Math.ceil((stop - start + 1) / step))
  .fill(start)
  .map((x, y) => `${x + y * step}`);

export {
  dc, chuncs, rangeArr,
};

export const csvContent = (rows) => `data:text/csv;charset=utf-8,\uFEFF${
  rows.map((e) => e.join(',')).join('\n')}`;
