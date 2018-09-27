//@format
import {Bunny} from './bunny.client';
import {Resource} from '../config/resource.enum';
import {Statistic} from '../models/statistic';
import {Billing} from '../models/billing';
import {PullZoneClient} from './pullzone.client';
import {PullZone} from '../models/pullzone';
import {classToPlain} from 'class-transformer';
import {StorageClient} from './storage.client';

describe('StorageClient', () => {
  let classUnderTest: StorageClient;
  let httpClient = jasmine.createSpyObj('HttpClient', ['get', 'put', 'delete']);

  let validateConfig = jasmine.objectContaining({
    headers: jasmine.any(Object),
  });

  beforeEach(() => {
    classUnderTest = new StorageClient(httpClient);
  });

  it('should initialize', () => {
    expect(classUnderTest).toBeDefined();
  });

  describe('get', () => {
    beforeEach(() => {
      httpClient.post.and.returnValue(Promise.resolve({}));
    });

    //it('should POST resource with client', done => {
    //  const pullZone = new PullZone('', '');
    //  classUnderTest.create(pullZone).then(() => {
    //    expect(httpClient.post).toHaveBeenCalledWith(Resource.PullZone, classToPlain(pullZone), validateConfig);
    //    done();
    //  });
    //});
  });

  describe('update', () => {
    beforeEach(() => {
      httpClient.put.and.returnValue(Promise.resolve({data: {}}));
    });

    //it('should POST resource with client', done => {
    //  const pullZoneId = 1;
    //  const pullZone = new PullZone('', '');
    //  classUnderTest.update(pullZoneId, pullZone).then(() => {
    //    expect(httpClient.post).toHaveBeenCalledWith(
    //      `${Resource.PullZone}/${pullZoneId}`,
    //      classToPlain(pullZone),
    //      validateConfig,
    //    );
    //    done();
    //  });
    //});
  });

  describe('remove', () => {
    beforeEach(() => {
      httpClient.delete.and.returnValue(Promise.resolve());
    });

    //it('should POST resource', done => {
    //  const pullZoneId = 1;
    //  const blockedIp = '1.1.1.1';
    //  classUnderTest.removeBlockedIP(pullZoneId, blockedIp).then(() => {
    //    expect(httpClient.post).toHaveBeenCalledWith(
    //      `${Resource.PullZone}/removeblockedip`,
    //      {
    //        pullZoneId,
    //        blockedIp,
    //      },
    //      validateConfig,
    //    );
    //    done();
    //  });
    //});
  });
});
