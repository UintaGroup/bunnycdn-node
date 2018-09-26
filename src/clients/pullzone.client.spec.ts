//@format
import {Bunny} from './bunny.client';
import {Resource} from '../config/resource.enum';
import {Statistic} from '../models/statistic';
import {Billing} from '../models/billing';
import {PullZoneClient} from './pullzone.client';
import {PullZone} from '../models/pullzone';
import {classToPlain} from 'class-transformer';

describe('PullzoneClient', () => {
  let classUnderTest: PullZoneClient;
  let httpClient = jasmine.createSpyObj('HttpClient', ['get', 'post', 'delete']);

  let validateConfig = jasmine.objectContaining({
    headers: jasmine.any(Object),
  });

  beforeEach(() => {
    classUnderTest = new PullZoneClient({}, httpClient);
  });

  it('should initialize', () => {
    expect(classUnderTest).toBeDefined();
  });

  describe('create', () => {
    beforeEach(() => {
      httpClient.post.and.returnValue(Promise.resolve({}));
    });

    it('should POST resource with client', done => {
      const pullZone = new PullZone('', '');
      classUnderTest.create(pullZone).then(() => {
        expect(httpClient.post).toHaveBeenCalledWith(Resource.PullZone, classToPlain(pullZone), validateConfig);
        done();
      });
    });
  });

  describe('update', () => {
    beforeEach(() => {
      httpClient.post.and.returnValue(Promise.resolve({data: {}}));
    });

    it('should POST resource with client', done => {
      const pullZoneId = 1;
      const pullZone = new PullZone('', '');
      classUnderTest.update(pullZoneId, pullZone).then(() => {
        expect(httpClient.post).toHaveBeenCalledWith(
          `${Resource.PullZone}/${pullZoneId}`,
          classToPlain(pullZone),
          validateConfig,
        );
        done();
      });
    });
  });

  describe('addHostname', () => {
    beforeEach(() => {
      httpClient.post.and.returnValue(Promise.resolve());
    });

    it('should POST resource with client', done => {
      const pullZoneId = 1;
      const hostName = 'www.google.com';
      classUnderTest.addHostname(pullZoneId, hostName).then(() => {
        expect(httpClient.post).toHaveBeenCalledWith(
          `${Resource.PullZone}/addHostname`,
          {
            pullZoneId,
            hostName,
          },
          validateConfig,
        );
        done();
      });
    });
  });

  describe('setForceSSL', () => {
    beforeEach(() => {
      httpClient.post.and.returnValue(Promise.resolve());
    });

    it('should POST resource with forceSSL true by default', done => {
      const pullZoneId = 1;
      const hostName = 'www.google.com';
      classUnderTest.setForceSSL(pullZoneId, hostName).then(() => {
        expect(httpClient.post).toHaveBeenCalledWith(
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
        expect(httpClient.post).toHaveBeenCalledWith(
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
    beforeEach(() => {
      httpClient.post.and.returnValue(Promise.resolve());
    });

    it('should POST resource', done => {
      const pullZoneId = 1;
      const hostName = 'www.google.com';
      const certificate = 'adfasdfasf';
      const certificateKey = 'sdf232sdf';
      classUnderTest.addCertificate(pullZoneId, hostName, certificate, certificateKey).then(() => {
        expect(httpClient.post).toHaveBeenCalledWith(
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
    beforeEach(() => {
      httpClient.post.and.returnValue(Promise.resolve());
    });

    it('should POST resource', done => {
      const pullZoneId = 1;
      const blockedIp = '1.1.1.1';
      classUnderTest.addBlockedIP(pullZoneId, blockedIp).then(() => {
        expect(httpClient.post).toHaveBeenCalledWith(
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
    beforeEach(() => {
      httpClient.post.and.returnValue(Promise.resolve());
    });

    it('should POST resource', done => {
      const pullZoneId = 1;
      const blockedIp = '1.1.1.1';
      classUnderTest.removeBlockedIP(pullZoneId, blockedIp).then(() => {
        expect(httpClient.post).toHaveBeenCalledWith(
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
    beforeEach(() => {
      httpClient.get.and.returnValue(Promise.resolve({data: {}}));
    });

    it('should GET resource with client', done => {
      const hostName = 'www.google.com';
      classUnderTest.loadFreeCertificate(hostName).then(() => {
        expect(httpClient.get).toHaveBeenCalledWith(
          `${Resource.PullZone}/loadfreecertificate?hostname=${hostName}`,
          validateConfig,
        );
        done();
      });
    });
  });

  describe('deleteHostname', () => {
    beforeEach(() => {
      httpClient.delete.and.returnValue(Promise.resolve());
    });

    it('should DELETE resource with client', done => {
      const pullZoneId = 1;
      const hostName = 'www.google.com';
      classUnderTest.deleteHostname(pullZoneId, hostName).then(() => {
        expect(httpClient.delete).toHaveBeenCalledWith(
          `${Resource.PullZone}/deleteHostname?id=${pullZoneId}&hostname=${hostName}`,
          validateConfig,
        );
        done();
      });
    });
  });

  describe('purge', () => {
    beforeEach(() => {
      httpClient.post.and.returnValue(Promise.resolve());
    });

    it('should POST resource with client', done => {
      const pullZoneId = 1;
      classUnderTest.purge(pullZoneId).then(() => {
        expect(httpClient.post).toHaveBeenCalledWith(
          `${Resource.PullZone}/${pullZoneId}/purgeCache`,
          null,
          validateConfig,
        );
        done();
      });
    });
  });
});
