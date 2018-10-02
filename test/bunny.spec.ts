// @format
import 'reflect-metadata';
import axios from 'axios';
import { Bunny } from '../src/bunny';
import { Resource } from '../src/enums';
import { Statistic, Billing } from '../src/models';

describe('Bunny', () => {
  let classUnderTest: Bunny;

  let validateConfig = expect.objectContaining({
    baseURL: jasmine.any(String),
    headers: jasmine.any(Object),
  });

  beforeEach(() => (classUnderTest = new Bunny(axios)));

  it('should initialize', () => {
    expect(classUnderTest).toBeDefined();
  });

  it('should default to axios as HttpClient', () => {
    const bunny = new Bunny();
    expect(bunny['httpClient']).toEqual(axios);
  });

  it('should use injected HttpClient', () => {
    const someHttpClient = {};
    const bunny = new Bunny(someHttpClient);
    expect(bunny['httpClient']).toEqual(someHttpClient);
  });

  it('should pass httpClient to Child Clients', () => {
    const bunny = new Bunny();
    expect(bunny.storage['httpClient']).toEqual(axios);
    expect(bunny.pullZone['httpClient']).toEqual(axios);
  });

  it('should use injected HttpClient', () => {
    const someHttpClient = {};
    const bunny = new Bunny(someHttpClient);
    expect(bunny.storage['httpClient']).toEqual(someHttpClient);
    expect(bunny.pullZone['httpClient']).toEqual(someHttpClient);
  });

  describe('statistics', () => {
    beforeEach(() =>
      jest
        .spyOn(axios, 'get')
        .mockReturnValueOnce(Promise.resolve({ data: {} })));

    it('should GET resource with client', done => {
      classUnderTest.statistics().then(() => {
        expect(axios.get).toHaveBeenCalledWith(
          Resource.Statistic,
          validateConfig,
        );
        done();
      });
    });

    it('should return instance of Statistic', done => {
      classUnderTest.statistics().then(val => {
        expect(val instanceof Statistic).toEqual(true);
        done();
      });
    });
  });

  describe('billing', () => {
    beforeEach(() =>
      jest
        .spyOn(axios, 'get')
        .mockReturnValueOnce(Promise.resolve({ data: {} })));

    it('should GET resource with client', done => {
      classUnderTest.billing().then(() => {
        expect(axios.get).toHaveBeenCalledWith(
          Resource.Billing,
          validateConfig,
        );
        done();
      });
    });

    it('should return instance of Billing', done => {
      classUnderTest.billing().then(val => {
        expect(val instanceof Billing).toEqual(true);
        done();
      });
    });
  });

  describe('applyCode', () => {
    beforeEach(() => {
      jest
        .spyOn(axios, 'get')
        .mockReturnValueOnce(Promise.resolve({ data: {} }));
    });

    it('should GET resource with couponCode', done => {
      const code = 'abcdefg';
      classUnderTest.applyCode(code).then(() => {
        expect(axios.get).toHaveBeenCalledWith(
          `billing/applyCode?couponCode=${code}`,
          validateConfig,
        );
        done();
      });
    });
  });

  describe('purge', () => {
    beforeEach(() =>
      jest.spyOn(axios, 'post').mockReturnValueOnce(Promise.resolve({})));

    it('should POST url', done => {
      const url = 'https://www.google.com';
      classUnderTest
        .purge(url)
        .then(() => {
          expect(axios.post).toHaveBeenCalledWith(
            `pullzone/purge?url=${url}`,
            null,
            validateConfig,
          );
          done();
        })
        .catch(err => console.error('ERROR', err));
    });
  });
});
