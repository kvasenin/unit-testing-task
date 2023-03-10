const unitTestingTask = require('../unitTestingTask.js');

describe('test', () => {
    test('exports a function', () => {
        expect(typeof unitTestingTask).toBe('function');
    });
});

describe('tokens', () => {
    const date = new Date('March 3, 2023 03:24:00');

    test('should return "2023" for YYYY token', () => {
        expect(unitTestingTask('YYYY', date)).toBe('2023');
    });

    test('should return "23" for YY token', () => {
        expect(unitTestingTask('YY', date)).toBe('23');
    });

    test('should return "March" for MMMM token', () => {
        expect(unitTestingTask('MMMM', date)).toBe('March');
    });

    test('should return "Mar" for MMM token', () => {
        expect(unitTestingTask('MMM', date)).toBe('Mar');
    });

    test('should return "03" for MM token', () => {
        expect(unitTestingTask('MM', date)).toBe('03');
    });

    test('should return "3" for M token', () => {
        expect(unitTestingTask('M', date)).toBe('3');
    });

    test('should return "Friday" for DDD token', () => {
        expect(unitTestingTask('DDD', date)).toBe('Friday');
    });

    test('should return "Fri" for DD token', () => {
        expect(unitTestingTask('DD',date)).toBe('Fri');
    });

    test('should return "Fr" for D token', () => {
        expect(unitTestingTask('D', date)).toBe('Fr');
    });

    test('should return "03" for dd token', () => {
        expect(unitTestingTask('dd', date)).toBe('03');
    });

    test('should return 3 for d token', () => {
        expect(unitTestingTask('d', date)).toBe('3');
    });

    test('should return "03" for HH token', () => {
        expect(unitTestingTask('HH', date)).toBe('03');
    });

    test('should return 3 for H token', () => {
        expect(unitTestingTask('H', date)).toBe('3');
    });

    test('should return "03" for hh token', () => {
        expect(unitTestingTask('hh', date)).toBe('03');
    });

    test('should return 3 for h token', () => {
        expect(unitTestingTask('h', date)).toBe('3');
    });

    test('should return "24" for mm token', () => {
        expect(unitTestingTask('mm', date)).toBe('24');
    });

    test('should return 24 for m token', () => {
        expect(unitTestingTask('m', date)).toBe('24');
    });

    test('should return "00" for ss token', () => {
        expect(unitTestingTask('ss', date)).toBe('00');
    });

    test('should return 0 for s token', () => {
        expect(unitTestingTask('s', date)).toBe('0');
    })
});
