const unitTestingTask = require("../unitTestingTask.js");

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
    var date;

    beforeEach(function () {
        date = new Date("2023-05-04T13:45:00Z");
    });

    describe("for different Timezones", function () {
        test("should correctly format the date in Los Angeles (GMT-7)", function () {
            var losAngelesDate = new Date(
                date.toLocaleString("en-US", { timeZone: "America/Los_Angeles" })
            );
            expect(unitTestingTask("YYYY-MM-dd HH:mm:ss ZZ", losAngelesDate)).toEqual(
                "2023-05-04 06:45:00 -07:00"
            );
        });

        test("should correctly format the date in New York (GMT-4)", function () {
            var newYorkDate = new Date(
                date.toLocaleString("en-US", { timeZone: "America/New_York" })
            );
            expect(unitTestingTask("YYYY-MM-dd HH:mm:ss Z", newYorkDate)).toEqual(
                "2023-05-04 09:45:00 -04:00"
            );
        });

        test("should correctly format the date in London (GMT+1)", function () {
            var londonDate = new Date(
                date.toLocaleString("en-US", { timeZone: "Europe/London" })
            );
            expect(unitTestingTask( "YYYY-MM-dd HH:mm:ss Z", londonDate)).toEqual(
                "2023-05-04 14:45:00 +01:00"
            );
        });

        test("should correctly format the date in Berlin (GMT+2)", function () {
            var berlinDate = new Date(
                date.toLocaleString("en-US", { timeZone: "Europe/Berlin" })
            );
            expect(unitTestingTask("YYYY-MM-dd HH:mm:ss Z", berlinDate)).toEqual(
                "2023-05-04 15:45:00 +02:00"
            );
        });
    });
});
