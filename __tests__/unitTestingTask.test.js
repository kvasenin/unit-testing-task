const unitTestingTask = require("../unitTestingTask.js");
const timezonedDate = require('timezoned-date');

describe("test", () => {
  test("exports a function", () => {
    expect(typeof unitTestingTask).toBe("function");
  });
});

describe("tokens", () => {
  const date = new Date("March 3, 2023 03:24:00");

  test('should return "2023" for YYYY token', () => {
    expect(unitTestingTask("YYYY", date)).toBe("2023");
  });

  test('should return "23" for YY token', () => {
    expect(unitTestingTask("YY", date)).toBe("23");
  });

  test('should return "March" for MMMM token', () => {
    expect(unitTestingTask("MMMM", date)).toBe("March");
  });

  test('should return "Mar" for MMM token', () => {
    expect(unitTestingTask("MMM", date)).toBe("Mar");
  });

  test('should return "03" for MM token', () => {
    expect(unitTestingTask("MM", date)).toBe("03");
  });

  test('should return "3" for M token', () => {
    expect(unitTestingTask("M", date)).toBe("3");
  });

  test('should return "Friday" for DDD token', () => {
    expect(unitTestingTask("DDD", date)).toBe("Friday");
  });

  test('should return "Fri" for DD token', () => {
    expect(unitTestingTask("DD", date)).toBe("Fri");
  });

  test('should return "Fr" for D token', () => {
    expect(unitTestingTask("D", date)).toBe("Fr");
  });

  test('should return "03" for dd token', () => {
    expect(unitTestingTask("dd", date)).toBe("03");
  });

  test("should return 3 for d token", () => {
    expect(unitTestingTask("d", date)).toBe("3");
  });

  test('should return "03" for HH token', () => {
    expect(unitTestingTask("HH", date)).toBe("03");
  });

  test("should return 3 for H token", () => {
    expect(unitTestingTask("H", date)).toBe("3");
  });

  test('should return "03" for hh token', () => {
    expect(unitTestingTask("hh", date)).toBe("03");
  });

  test("should return 3 for h token", () => {
    expect(unitTestingTask("h", date)).toBe("3");
  });

  test('should return "24" for mm token', () => {
    expect(unitTestingTask("mm", date)).toBe("24");
  });

  test("should return 24 for m token", () => {
    expect(unitTestingTask("m", date)).toBe("24");
  });

  test('should return "00" for ss token', () => {
    expect(unitTestingTask("ss", date)).toBe("00");
  });

  test("should return 0 for s token", () => {
    expect(unitTestingTask("s", date)).toBe("0");
  });
});

describe("tokens parameterized", () => {
  const date = new Date("March 3, 2023 03:24:00");

  const testCases = [
    ["YYYY", "2023"],
    ["YY", "23"],
    ["MMMM", "March"],
    ["MMM", "Mar"],
    ["MM", "03"],
    ["M", "3"],
    ["DDD", "Friday"],
    ["DD", "Fri"],
    ["D", "Fr"],
    ["dd", "03"],
    ["d", "3"],
    ["HH", "03"],
    ["H", "3"],
    ["hh", "03"],
    ["h", "3"],
    ["mm", "24"],
    ["m", "24"],
    ["ss", "00"],
    ["s", "0"],
    ["ff", "000"],
    ["f", "0"],
    ["A", "AM"],
    ["a", "am"],
    ["ZZ", "+0200"],
    ["Z", "+02:00"],
  ];

  test.each(testCases)(
    'should return "%s" for "%s" token',
    (token, expectedOutput) => {
      expect(unitTestingTask(token, date)).toBe(expectedOutput);
    }
  );
});

describe("leadingZeroes", () => {
  const testCases = [
    { args: ["2", "5"], expected: "05" },
    { args: ["25"], expected: "25" },
    { args: ["99"], expected: "99" },
    { args: ["100"], expected: "100" },
    { args: ["100", 4], expected: "0100" },
  ];

  testCases.forEach(({ args, expected }) => {
    test(`returns '${expected}' for args '${args.join(", ")}'`, () => {
      expect(unitTestingTask(...args)).toEqual(expected);
    });
  });
});

describe("date formatting", function () {
  let originalDate;

  beforeEach(() => {
    originalDate = new Date("2023-05-04T13:45:00Z");;
  });

  describe("for different Timezones", function () {
    test("should correctly format the date in Los Angeles (GMT-7)", function () {
      const TimezonedDate = timezonedDate.makeConstructor(-420);
      const losAngelesDate = new TimezonedDate(originalDate);
        expect(unitTestingTask("YYYY-MM-dd HH:mm:ss Z", losAngelesDate)).toEqual(
            "2023-05-04 06:45:00 -07:00"
        );
    });

    test("should correctly format the date in New York (GMT-4)", function () {
      const TimezonedDate = timezonedDate.makeConstructor(-240);
      const newYorkDate = new TimezonedDate(originalDate);
      expect(unitTestingTask("YYYY-MM-dd HH:mm:ss Z", newYorkDate)).toEqual(
          "2023-05-04 09:45:00 -04:00"
      );
    });

    test("should correctly format the date in London (GMT+1)", function () {
      const TimezonedDate = timezonedDate.makeConstructor(60);
      const londonDate = new TimezonedDate(originalDate);
        expect(unitTestingTask( "YYYY-MM-dd HH:mm:ss Z", londonDate)).toEqual(
            "2023-05-04 14:45:00 +01:00"
        );
    });

    test("should correctly format the date in Berlin (GMT+2)", function () {
      const TimezonedDate = timezonedDate.makeConstructor(120);
      const berlinDate = new TimezonedDate(originalDate);
        expect(unitTestingTask("YYYY-MM-dd HH:mm:ss Z", berlinDate)).toEqual(
            "2023-05-04 15:45:00 +02:00"
        );
    });
  });
});

describe('register', () => {
  test('should register a new formatter', () => {
    const format = 'YYYY/MM/dd';
    const formatter = unitTestingTask.register('customFormat', format);
    expect(formatter).toBeInstanceOf(Function);
  });
});

describe('lang', () => {
  test('returns current language if no arguments provided', () => {
    const languages = { current: 'en' };

    const result = unitTestingTask.lang(undefined, undefined, languages);

    expect(result).toBe(languages.current);
  });

  test('sets current language if provided language exists in languages', () => {
    const options = {
      _months: 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
      months: function (date) {
          return this._months[date.getMonth()];
      },
      _monthsShort: 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
      monthsShort: function (date) {
          return this._monthsShort[date.getMonth()];
      },
      weekdays: 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
      weekdaysShort: 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
      weekdaysMin: 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
      meridiem : function (hours, isLower) {
          if (hours > 11) {
              return isLower ? 'pm' : 'PM';
          } else {
              return isLower ? 'am' : 'AM';
          }
      }
    };
    const languages = { current: 'en', en: options };

    const result = unitTestingTask.lang('en', undefined, languages);

    expect(result).toBe('en');
    expect(languages.current).toBe('en');
  });

  test('returns current language if provided language is not valid module', () => {
    const languages = { current: 'en' };

    const result = unitTestingTask.lang('invalid', undefined, languages);

    expect(result).toBe('en');
  });
});

