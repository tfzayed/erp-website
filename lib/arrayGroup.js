export const arrayGroup = (array, groupBy) => {
  const grouping = array.reduce(function (r, a) {
    r[a[groupBy]] = r[a[groupBy]] || [];
    r[a[groupBy]].push(a);
    return r;
  }, Object.create(null));
  const obj2arr = Object.entries(grouping).map((e) => ({
    name: e[0],
    users: e[1],
  }));
  return obj2arr;
};
