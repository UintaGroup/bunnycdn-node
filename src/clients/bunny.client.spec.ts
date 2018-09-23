//@format
import {Bunny} from './bunny.client';
import {Resource} from '../config/resource.enum';
import {Statistic} from '../models/statistic';
import {Billing} from '../models/billing';

describe('Bunny', () => {
  let classUnderTest: Bunny;
  let httpClient = jasmine.createSpyObj('HttpClient', ['get', 'post', 'delete']);

  let validateConfig = jasmine.objectContaining({
    baseURL: jasmine.any(String),
    headers: jasmine.any(Object),
  });

  beforeEach(() => {
    classUnderTest = new Bunny(httpClient);
  });

  it('should initialize', () => {
    expect(classUnderTest).toBeDefined();
  });

  describe('statistics', () => {
    beforeEach(() => {
      httpClient.get.and.returnValue(Promise.resolve({data: {}}));
    });

    it('should GET resource with client', done => {
      classUnderTest.statistics().then(() => {
        expect(httpClient.get).toHaveBeenCalledWith(Resource.Statistic, validateConfig);
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
    beforeEach(() => {
      httpClient.get.and.returnValue(Promise.resolve({data: {}}));
    });

    it('should GET resource with client', done => {
      classUnderTest.billing().then(() => {
        expect(httpClient.get).toHaveBeenCalledWith(Resource.Billing, validateConfig);
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
      httpClient.get.and.returnValue(Promise.resolve({data: {}}));
    });

    it('should GET resource with couponCode', done => {
      const code = 'abcdefg';
      classUnderTest.applyCode(code).then(() => {
        expect(httpClient.get).toHaveBeenCalledWith(`billing/applyCode?couponCode=${code}`, validateConfig);
        done();
      });
    });
  });

  describe('purge', () => {
    beforeEach(() => {
      httpClient.post.and.returnValue(Promise.resolve({}));
    });

    it('should POST url', done => {
      httpClient.post.and.returnValue(Promise.resolve({}));

      const url = 'https://www.google.com';
      classUnderTest
        .purge(url)
        .then(() => {
          expect(httpClient.post).toHaveBeenCalledWith(`pullzone/purge?url=${url}`, null, validateConfig);
          done();
        })
        .catch(err => console.error('ERROR', err));
    });
  });
});
