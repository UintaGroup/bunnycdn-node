//@format
import {Bunny} from './clients/bunny.client';
import {PullZone} from './models/pullzone';

const bunny = new Bunny();

let pz = new PullZone('anotherpullzoneuinta', 'https://uintatesturl.com');
//bunny.pullZone.create(pz);

bunny.pullZone.get().then(res => console.log('PULLZONES', res));

//bunny.pullZone.get(46805).then(res => console.log('PULLZONE', res));
