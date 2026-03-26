//primitive data types
console.log('Paul'); //String
console.log(32); //number
console.log(true) //boolean
console.log(null) //null
console.log(undefined);
console.log(42n); //bigint
console.log(Symbol('foo')); //symbol

console.log(typeof 'Paul'); //String
console.log(typeof 42); //number
console.log(typeof true) //boolean
console.log(typeof null) //null apare ca object  dar nu e
console.log(typeof undefined);
console.log(typeof 42n); //bigint
console.log(typeof Symbol('foo')); //symbol

//null  vs undefined
//a = null; //this is correct, null is intentional
//a = undefined; //conceptually wrong, is side effect of language

//var - de uitat ca exista
//let - pt a schimba valoarea
//const - de folosit cel mai des!!
const a = null;
const b = undefined;

let c = 'Paul';
c = 42;
//c = true;
