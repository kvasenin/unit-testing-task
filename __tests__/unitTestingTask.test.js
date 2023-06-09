const unitTestingTask = require("../unitTestingTask.js");
const timezonedDate = require('timezoned-date');

describe("Test", () => {
  test("it should export unitTestingTask function", () => {
    expect(typeof unitTestingTask).toBe("function");
  });
});

describe("UnitTestingTask Function", () => {

  describe("Tokens", function () {
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
      ["Z", "+02:00"]
    ];

    test.each(testCases)(
      `it should replace "%s" token with "%s" value from date`,
      (token, expectedOutput) => {
        expect(unitTestingTask(token, date)).toBe(expectedOutput);
      }
    );
});

  describe("LeadingZeroes", () => {
    const testCases = [
      { args: ["dd", "1"], expected: "01" },
      { args: ["ff","0"], expected: "000" },
      { args: ["d","01"], expected: "1" }
    ];

    testCases.forEach(({ args, expected }) => {
      test(`it should convert '${args[1]}' string and pad it with leading zeroes until resulting string reaches '${args[0]}' token value`, () => {
        expect(unitTestingTask(...args)).toEqual(expected);
      });
    });
  });

  describe("Date Formatting", function () {
    let originalDate;
  
    beforeEach(() => {
      originalDate = new Date("2023-05-04T13:45:00Z");;
    });
  
    describe("for different Timezones", function () {
      test("it should correctly format the date in Los Angeles (GMT-7)", function () {
        const TimezonedDate = timezonedDate.makeConstructor(-420);
        const losAngelesDate = new TimezonedDate(originalDate);
          expect(unitTestingTask("YYYY-MM-dd HH:mm:ss Z", losAngelesDate)).toEqual(
              "2023-05-04 06:45:00 -07:00"
          );
      });
  
      test("it should correctly format the date in New York (GMT-4)", function () {
        const TimezonedDate = timezonedDate.makeConstructor(-240);
        const newYorkDate = new TimezonedDate(originalDate);
        expect(unitTestingTask("YYYY-MM-dd HH:mm:ss Z", newYorkDate)).toEqual(
            "2023-05-04 09:45:00 -04:00"
        );
      });
  
      test("it should correctly format the date in London (GMT+1)", function () {
        const TimezonedDate = timezonedDate.makeConstructor(60);
        const londonDate = new TimezonedDate(originalDate);
          expect(unitTestingTask( "YYYY-MM-dd HH:mm:ss Z", londonDate)).toEqual(
              "2023-05-04 14:45:00 +01:00"
          );
      });
  
      test("it should correctly format the date in Berlin (GMT+2)", function () {
        const TimezonedDate = timezonedDate.makeConstructor(120);
        const berlinDate = new TimezonedDate(originalDate);
          expect(unitTestingTask("YYYY-MM-dd HH:mm:ss Z", berlinDate)).toEqual(
              "2023-05-04 15:45:00 +02:00"
          );
      });
    });
  });

  describe('Work With Formats', () => {

    describe('Register function', () => {
      test('it should register a new formatter', () => {
        const format = 'YYYY/MM/dd';
        const formatter = unitTestingTask.register('customFormat', format);
    
        expect(formatter).toBeInstanceOf(Function);
        expect(unitTestingTask.formatters()).toContain('customFormat');
      });
    });

    describe('Formatters function', () => {
      test('it should return an array of registered format names', () => {
        expect(unitTestingTask.formatters()).toEqual(['ISODate', 'ISOTime', 'ISODateTime', 'ISODateTimeTZ', 'customFormat']);
      });
    });
});

  describe('Lang function', () => {
    test('it should return current language if no arguments provided', () => {
      const languages = { current: 'en' };
      const result = unitTestingTask.lang();
  
      expect(result).toBe(languages.current);
    });
  
    test('it should set current language if provided language exists in languages', () => {
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
  
      const result = unitTestingTask.lang('en');
  
      expect(result).toBe('en');
      expect(languages.current).toBe('en');
    });
  
    test('it should return current language if provided language is not valid module', () => {
      const result = unitTestingTask.lang('invalid', undefined);
  
      expect(result).toBe('en');
    });
  });
});
