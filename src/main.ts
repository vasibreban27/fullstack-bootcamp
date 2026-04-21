console.log("Hello from the bootcamp");

let myNumber:number | string = 42; //union type
let myName:string = "Jose";

myNumber = "42string";

type MyType = string | number;
let myVariable: MyType = 42;
myVariable = "42string";
console.log(myVariable);

console.log(myName);
console.log(myNumber);

//array type
type MyArray = (number | string)[];
const arr:MyArray=[1,2,3,'Paul'];

//tuples
const myTuple:[number,string] = [1,'test'];
console.log(arr, myTuple);

//object types
type MyObj={
    fName:string;
    lName:string;
    weight:number;
    height:number;
    age?:number;
    calculateBmi():string;
}

interface MyObj2{
    fName:string;
    lName:string;
    weight:number;
    height:number;
    age?:number;
    calculateBmi():string;
}
const obj: MyObj={
    fName:'Jose',
    lName:'Perez',
    weight:100,
    height:1.80,
    age:14,
    calculateBmi(){
        return (this.weight/this.height**2).toFixed(2);
    }
}

console.log(obj.calculateBmi());

class User implements MyObj2{
    public fName:string;
    public lName:string;
    public weight:number;
    public height:number;
    public age?:number;
    public calculateBmi():string{
        return (this.weight/this.height**2).toFixed(2);
    }
    constructor(fName:string, lName:string, weight:number, height:number, age?:number){
        this.fName=fName;
        this.lName=lName;
        this.weight=weight;
        this.height=height;
        this.age=age;
    }
}

console.log(User);
console.dir(User);

const user1: User = new User('Jose', 'Perez', 100, 1.80, 14);
console.log(user1);

function myFunc(param: MyObj){
    return param;
}
myFunc(obj);

function add(n1:number, n2:number):number{
    return n1+n2;
}
console.log(add(22,31));


function addOrConcat(n1:number,n2:number):number
function addOrConcat(s1:string,s2:string):string
function addOrConcat(p1:string|number, p2:string|number){
   if(typeof p1!==typeof p2) throw new Error('Parameters must be of the same type');

   //type guard
   if(typeof p1 ==='string' && typeof p2==='string')
       return p1+p2;
   if(typeof p1==='number' && typeof p2==='number')
       return p1+p2;
}
console.log(addOrConcat(22,31));

const errorCodes = { //bun pt enum, nu folosim enum din ts ca nu e ok
    404:'Not Found',
    500:'Internal Server Error',
}as const;

errorCodes[404];


type AnotherType = typeof errorCodes;
type AnotherType2 = keyof AnotherType;

type SpecificTypes = 'Paul' | 'Ioana';
const name:SpecificTypes = 'Paul';
console.log(name);

const something: any = 'something'; //typescript is not going to type check this variable
console.log(something);

function prod(n1:number,n2:number) {
    return n1*n2;
}
console.log(prod(2,3));

let code = 404;
errorCodes[code as AnotherType2] //destul de nasol si as, ca si any

const body = document.querySelector('body')!;
if(body === null){}

function myFunc2(param: unknown):void {
    if(typeof param === 'number')
        param.toFixed(2);
    if(typeof param === 'string')
        param.charAt(3);

}
 type ExcludedType<T> = T extends number ? never : T; //orice tip inafara de number




