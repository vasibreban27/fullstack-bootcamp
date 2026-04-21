// Type inference
let test = 'Paul';

// Union Type
type MyType = number | string;
let myNumber: MyType = 42;

myNumber = 'Paul';

// Array Types
type MyArray = (number | string)[];
const arr: MyArray = [1, 2, 3, 'Paul'];

// Tuples
const myTuple: [number, string] = [1, 'test'];

// Object Types
type MyObj = {
  fName: string;
  height: number;
  weight: number;
  age?: number;
  calculateBmi(): string;
}

interface MyObj2 {
  fName: string;
  height: number;
  weight: number;
  age?: number;
  calculateBmi(): string;
}

const obj: MyObj2 = {
  fName: 'Paul',
  height: 185,
  weight: 100,
  calculateBmi() {
    return (this.weight / this.height ** 2).toFixed(2);
  }
}

class User implements MyObj2 {
  public height: number = 12;
  public weight: number = 12;
  public fName: string = 'Paul';

  calculateBmi() {
    return 'test';
  }
}

const user1: User = new User();

console.log(test, myNumber, arr, myTuple, obj);


// Function Types

function myFunc(param: MyObj) {
  return param;
}

function add(n1: number, n2: number): number {
  return n1 + n2;
}

function addOrConcat(p1: number, p2: number): number
function addOrConcat(p1: string, p2: string): string
function addOrConcat(p1: string | number, p2: string | number) {
  if(typeof p1 !== typeof p2) {
    throw new Error('Type mismatch');
  }

  // Type Guard
  if(typeof p1 === 'string' && typeof p2 === 'string') {
    return p1 + p2;
  }

  if(typeof p1 === 'number' && typeof p2 === 'number') {
    return p1 + p2;
  }
}

console.log(addOrConcat('2', '3'));


myFunc(obj);

const config = {
  apiUrl: 'http://sadasd',
} as const;

const errorCodes = {
  404: 'Not Found',
  500: 'Internal Server Error',
  'Internal Server Error': 500,
  'Not Found': 404,
} as const;

type AnotherType = typeof errorCodes;
type AnotherTypesKeys = keyof AnotherType;


type SpecificType = 'Paul' | 'Ioana';

type ExcludedType<T> = T extends number ? never : T;


const name: SpecificType = 'Paul';

// const bla: ExcludedType<string> = 42;
let something: any = 'Paul';


function prod(n1: number, n2: number) {
  return n1 * n2;
}

let code = 404;
errorCodes[code as AnotherTypesKeys];

const body = document.querySelector('body')!;

function myFunc2(param: unknown): void {
  if(typeof param === 'number') {
    param.toFixed();
  }

  if(typeof param === 'string') {
    param.charAt(3);
  }

  param
}
