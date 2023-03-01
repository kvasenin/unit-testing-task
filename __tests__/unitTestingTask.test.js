import unitTestingTask from '../unitTestingTask';


describe('test', () => {
    test('exports a function', () => {
        expect(typeof unitTestingTask).toBe('function');
    });
});