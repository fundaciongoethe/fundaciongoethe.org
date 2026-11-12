function splitlines(input, maxCharLength) {
  if (!input) return [];
  const parts = String(input).split(' ');
  return parts.reduce(function (acc, cur) {
    if (!acc.length) {
      return [cur];
    }

    const lastOne = acc[acc.length - 1];
    if (lastOne.length + cur.length + 1 > maxCharLength) {
      return [...acc, cur];
    }

    acc[acc.length - 1] = lastOne + ' ' + cur;
    return acc;
  }, []);
}

module.exports = { splitlines };
