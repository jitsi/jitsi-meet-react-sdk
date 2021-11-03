import { init, initExternal } from "..";
import * as apiLoaders from "../init";

const SUCCESS_DOMAIN = "meet.jit.si";
const ERROR_DOMAIN = "error";

describe("initExternal module", () => {
  it("should return the external api instance", async () => {
    const initExternalMock = jest.fn(initExternal);
    return initExternalMock(SUCCESS_DOMAIN).then((value) => {
      expect(value).toHaveProperty("fn");
    });
  });

  it("should throw an error when the external api file cannot be retrieved from the provided domain", async () => {
    const initExternalMock = jest.fn(initExternal);
    return initExternalMock(ERROR_DOMAIN).catch((e: Error) => {
      expect(e.message).toEqual(
        `Script load error: https://${ERROR_DOMAIN}/external_api.js`
      );
    });
  });
});

describe("init module", () => {
  it("should return the external api instance", (done) => {
    const initMock = jest.fn(init);
    const callback = (err: any, result: any) => {
      try {
        expect(result).toHaveProperty("fn");
        done();
      } catch (e) {
        done(e);
      }
    };
    initMock(SUCCESS_DOMAIN, callback);
  });

  it("should throw an error when the external api file cannot be retrieved from the provided domain", (done) => {
    const initMock = jest.fn(init);
    const callback = (err: any) => {
      try {
        throw new Error(err);
      } catch (e: any) {
        expect(e.message).toBe(
          `Error: Script load error: https://${ERROR_DOMAIN}/external_api.js`
        );
      } finally {
        done();
      }
    };
    initMock(ERROR_DOMAIN, callback);
  });
});
