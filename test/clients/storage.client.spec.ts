// @format
import 'reflect-metadata';
import axios from 'axios';
import { classToPlain } from 'class-transformer';
import { Resource } from '../../src/enums';
import { Statistic, Billing, PullZone } from '../../src/models';
import { StorageClient, PullZoneClient } from '../../src/clients';

describe('StorageClient', () => {
  let classUnderTest: StorageClient;

  const validateConfig = (additionalConfig?: Object) => {
    const baseConfig = {
      headers: expect.any(Object),
      baseURL: 'https://storage.bunnycdn.com',
    };
    return expect.objectContaining({ ...baseConfig, ...additionalConfig });
  };

  beforeEach(() => (classUnderTest = new StorageClient(axios)));

  it('should initialize', () => {
    expect(classUnderTest).toBeDefined();
  });

  describe('get', () => {
    beforeEach(() =>
      jest
        .spyOn(axios, 'get')
        .mockReturnValueOnce(Promise.resolve({ data: {} })));

    it('should GET resource with client at path', done => {
      const fullPath = 'myzone/somepath';

      classUnderTest.get(fullPath).then(() => {
        expect(axios.get).toHaveBeenCalledWith(
          `${fullPath}/`,
          validateConfig(),
        );
        done();
      });
    });
  });

  describe('getFile', () => {
    beforeEach(() =>
      jest
        .spyOn(axios, 'get')
        .mockReturnValueOnce(Promise.resolve('file contents')));

    it('should GET resource with client at path', done => {
      const fullPath = 'myzone/somepath/afile.js';

      classUnderTest.getFile(fullPath).then(() => {
        expect(axios.get).toHaveBeenCalledWith(`${fullPath}`, validateConfig());
        done();
      });
    });
  });

  describe('update', () => {
    beforeEach(() =>
      jest.spyOn(axios, 'put').mockReturnValueOnce(Promise.resolve({})));

    it('should PUT resource contents with client', done => {
      const fullPath = 'myzone/somepath/afile.js';
      const fileContents = 'some contents';
      classUnderTest.update(fullPath, fileContents).then(() => {
        expect(axios.put).toHaveBeenCalledWith(
          fullPath,
          fileContents,
          validateConfig({}),
        );
        done();
      });
    });
  });

  describe('delete', () => {
    beforeEach(() =>
      jest.spyOn(axios, 'delete').mockReturnValueOnce(Promise.resolve({})));

    it('should DELETE resource', done => {
      const fullPath = 'myzone/somepath/afile.js';
      classUnderTest.del(fullPath).then(() => {
        expect(axios.delete).toHaveBeenCalledWith(fullPath, validateConfig());
        done();
      });
    });
  });
});
