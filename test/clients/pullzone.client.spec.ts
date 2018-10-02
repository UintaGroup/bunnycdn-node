// @format
import 'reflect-metadata';
import axios from 'axios';
import { classToPlain } from 'class-transformer';
import { Resource } from '../../src/enums';
import { Statistic, Billing, PullZone } from '../../src/models';

import { PullZoneClient } from '../../src/clients/pullzone.client';

describe('PullzoneClient', () => {
  let classUnderTest: PullZoneClient;

  let validateConfig = expect.objectContaining({
    headers: jasmine.any(Object),
    baseURL: 'https://bunnycdn.com/api/',
  });

  beforeEach(() => {
    jest.clearAllMocks();
    classUnderTest = new PullZoneClient(axios);
  });

  it('should initialize', () => {
    expect(classUnderTest).toBeDefined();
  });

  describe('loadFreeCertificate', () => {
    beforeEach(() =>
      jest
        .spyOn(axios, 'get')
        .mockReturnValueOnce(Promise.resolve({ data: {} })));

    it('should GET all pullzones', done => {
      classUnderTest.get().then(() => {
        expect(axios.get).toHaveBeenCalledWith(
          Resource.PullZone,
          validateConfig,
        );
        done();
      });
    });

    it('should GET pullzones by Id', done => {
      const pullZoneId = 1234;
      classUnderTest.get(pullZoneId).then(() => {
        expect(axios.get).toHaveBeenCalledWith(
          `${Resource.PullZone}/${pullZoneId}`,
          validateConfig,
        );
        done();
      });
    });

    it('should return PullZone', done => {
      classUnderTest.get().then(result => {
        expect(result instanceof PullZone).toBe(true);
        done();
      });
    });
  });

  describe('create', () => {
    beforeEach(() =>
      jest.spyOn(axios, 'post').mockReturnValueOnce(Promise.resolve({})));

    it('should POST resource with client', done => {
      const pullZone = new PullZone('', '');
      classUnderTest.create(pullZone).then(() => {
        expect(axios.post).toHaveBeenCalledWith(
          Resource.PullZone,
          classToPlain(pullZone),
          validateConfig,
        );
        done();
      });
    });
  });

  describe('update', () => {
    beforeEach(() =>
      jest.spyOn(axios, 'post').mockReturnValueOnce(Promise.resolve({})));

    it('should POST resource with client', done => {
      const pullZoneId = 1;
      const pullZone = new PullZone('', '');
      classUnderTest.update(pullZoneId, pullZone).then(() => {
        expect(axios.post).toHaveBeenCalledWith(
          `${Resource.PullZone}/${pullZoneId}`,
          classToPlain(pullZone),
          validateConfig,
        );
        done();
      });
    });
  });

  describe('addHostname', () => {
    beforeEach(() =>
      jest.spyOn(axios, 'post').mockReturnValueOnce(Promise.resolve({})));

    it('should POST resource with client', done => {
      const pullZoneId = 1;
      const hostName = 'www.google.com';
      classUnderTest.addHostname(pullZoneId, hostName).then(() => {
        expect(axios.post).toHaveBeenCalledWith(
          `${Resource.PullZone}/addhostname`,
          expect.objectContaining({
            pullZoneId,
            hostName,
          }),
          validateConfig,
        );
        done();
      });
    });
  });

  describe('setForceSSL', () => {
    beforeEach(() =>
      jest.spyOn(axios, 'post').mockReturnValueOnce(Promise.resolve({})));

    it('should POST resource with forceSSL true by default', done => {
      const pullZoneId = 1;
      const hostName = 'www.google.com';
      classUnderTest.setForceSSL(pullZoneId, hostName).then(() => {
        expect(axios.post).toHaveBeenCalledWith(
          `${Resource.PullZone}/setforcessl`,
          {
            pullZoneId,
            hostName,
            forceSSL: true,
          },
          validateConfig,
        );
        done();
      });
    });

    it('should POST resource with forceSSL', done => {
      const pullZoneId = 1;
      const hostName = 'www.google.com';
      classUnderTest.setForceSSL(pullZoneId, hostName, false).then(() => {
        expect(axios.post).toHaveBeenCalledWith(
          `${Resource.PullZone}/setforcessl`,
          {
            pullZoneId,
            hostName,
            forceSSL: false,
          },
          validateConfig,
        );
        done();
      });
    });
  });

  describe('addCertificate', () => {
    beforeEach(() =>
      jest.spyOn(axios, 'post').mockReturnValueOnce(Promise.resolve({})));

    it('should POST resource', done => {
      const pullZoneId = 1;
      const hostName = 'www.google.com';
      const certificate = 'adfasdfasf';
      const certificateKey = 'sdf232sdf';
      classUnderTest
        .addCertificate(pullZoneId, hostName, certificate, certificateKey)
        .then(() => {
          expect(axios.post).toHaveBeenCalledWith(
            `${Resource.PullZone}/addcertificate`,
            {
              pullZoneId,
              hostName,
              certificate,
              certificateKey,
            },
            validateConfig,
          );
          done();
        });
    });
  });

  describe('addBlockedIP', () => {
    beforeEach(() =>
      jest.spyOn(axios, 'post').mockReturnValueOnce(Promise.resolve({})));

    it('should POST resource', done => {
      const pullZoneId = 1;
      const blockedIp = '1.1.1.1';
      classUnderTest.addBlockedIP(pullZoneId, blockedIp).then(() => {
        expect(axios.post).toHaveBeenCalledWith(
          `${Resource.PullZone}/addblockedip`,
          {
            pullZoneId,
            blockedIp,
          },
          validateConfig,
        );
        done();
      });
    });
  });

  describe('removeBlockedIP', () => {
    beforeEach(() =>
      jest.spyOn(axios, 'post').mockReturnValueOnce(Promise.resolve({})));

    it('should POST resource', done => {
      const pullZoneId = 1;
      const blockedIp = '1.1.1.1';
      classUnderTest.removeBlockedIP(pullZoneId, blockedIp).then(() => {
        expect(axios.post).toHaveBeenCalledWith(
          `${Resource.PullZone}/removeblockedip`,
          {
            pullZoneId,
            blockedIp,
          },
          validateConfig,
        );
        done();
      });
    });
  });

  describe('loadFreeCertificate', () => {
    beforeEach(() =>
      jest
        .spyOn(axios, 'get')
        .mockReturnValueOnce(Promise.resolve({ data: {} })));

    it('should GET resource with client', done => {
      const hostName = 'www.google.com';
      classUnderTest.loadFreeCertificate(hostName).then(() => {
        expect(axios.get).toHaveBeenCalledWith(
          `${Resource.PullZone}/loadfreecertificate?hostname=${hostName}`,
          validateConfig,
        );
        done();
      });
    });
  });

  describe('deleteHostname', () => {
    beforeEach(() =>
      jest.spyOn(axios, 'delete').mockReturnValueOnce(Promise.resolve({})));

    it('should DELETE resource with client', done => {
      const pullZoneId = 1;
      const hostName = 'www.google.com';
      classUnderTest.deleteHostname(pullZoneId, hostName).then(() => {
        expect(axios.delete).toHaveBeenCalledWith(
          `${
            Resource.PullZone
          }/deleteHostname?id=${pullZoneId}&hostname=${hostName}`,
          validateConfig,
        );
        done();
      });
    });
  });

  describe('purge', () => {
    beforeEach(() =>
      jest.spyOn(axios, 'post').mockReturnValueOnce(Promise.resolve({})));

    it('should POST resource with client', done => {
      const pullZoneId = 1;
      classUnderTest.purge(pullZoneId).then(() => {
        expect(axios.post).toHaveBeenCalledWith(
          `${Resource.PullZone}/${pullZoneId}/purgeCache`,
          null,
          validateConfig,
        );
        done();
      });
    });
  });
});
