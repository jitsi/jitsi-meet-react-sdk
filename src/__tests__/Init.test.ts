import { fetchExternalApi } from '../init';

const SUCCESS_DOMAIN = 'meet.jit.si';
const ERROR_DOMAIN = 'error';

/* eslint-disable no-undef */

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
