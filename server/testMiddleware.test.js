const {middleware} = require('./testMiddleware');

describe('auth test', () => {
    const res = {
        status: jest.fn(() => res),
        send: jest.fn(),
    }
    const next = jest.fn();
    
    test('true', () => {
        const req = {
            auth: jest.fn(() => true),
        };
        middleware(req, res, next);
        expect(next);   
    })
    
    test('false', () => {
        const req = {
            auth: jest.fn(() => false),
        };
        middleware(req, res, next);
        expect(res.status);
        expect(res.send);   
    })

})
