export interface Foo {
    executeDependency: Function;
}
export declare class MyLibrary implements Foo {
    executeDependency(): number;
}
export default MyLibrary;
