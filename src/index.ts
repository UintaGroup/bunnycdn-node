import { MyLibrary } from './MyLibrary';
import { Bunny } from './clients/bunny';

console.log('See this in your browser console: Typescript Webpack Starter Launched');

const myLibrary = new MyLibrary();
const result = myLibrary.executeDependency();
const bunny = new Bunny();


bunny.pullzones()
    .then(res => console.log('PULLZONES', res));

console.log(`A random number ${result}`);
