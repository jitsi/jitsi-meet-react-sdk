import { initExternalApi, fetchExternalApi } from '..';
import { IJitsiMeetExternalApi } from '../types';

const SUCCESS_DOMAIN = 'meet.jit.si';
const ERROR_DOMAIN = 'error';

describe('fetchExternalApi module', () => {

    it('should return the external api instance', async () => {
        const fetchExternalApiMock = jest.fn(fetchExternalApi);

        return fetchExternalApiMock(SUCCESS_DOMAIN).then(value => {
            expect(value).toBeTruthy();
        });
    });

    it('should throw an error when the external api file cannot be retrieved from the provided domain', async () => {
        const fetchExternalApiMock = jest.fn(fetchExternalApi);

        return fetchExternalApiMock(ERROR_DOMAIN).catch((e: Error) => {
            expect(e.message).toEqual(`Script load error: https://${ERROR_DOMAIN}/external_api.js`);
        });
    });
});

describe('initExternalApi module', () => {

    it('should return the external api instance', done => {
        const initExternalApiMock = jest.fn(initExternalApi);
        const callback = (err: Error | null, result?: new () => IJitsiMeetExternalApi) => {
            try {
                expect(result).toBeTruthy();
                done();
            } catch (e) {
                done(e);
            }
        };

        initExternalApiMock(SUCCESS_DOMAIN, callback);
    });
});
