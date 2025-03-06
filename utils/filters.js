const { DateTime } = require('luxon');

const seen = new WeakSet(); // Prevents circular references

module.exports = {
  // Convert date to HTML valid string format
  htmlDateString: (dateObj) => {
    return DateTime.fromJSDate(dateObj, {
      zone: 'utc',
    }).toFormat('yyyy-LL-dd');
  },

  // Safe JSON dump to prevent circular structure errors
  dumpSafe: (obj) => {
    return JSON.stringify(
      obj,
      (key, value) => {
        if (typeof value === 'object' && value !== null) {
          if (seen.has(value)) return '[Circular]';
          seen.add(value);
        }
        return value;
      },
      2
    );
  },
};
