'use strict';
//var d;
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

//console.log(c);
let c = 'Paul';
c = 42;
//c = true;
window.c = 'Test'

console.log({d}); //this is hoisting
var d = 'this is also global'; //var e foarte permisiv



/* scope-uri
* 1.global scope
*   -implicit atunci cand declaram o denumire DIRECT intr-un fisier inclus in html in mod standard
*   -explicit creeand o proprietate pe obiectul global (globalThis) in browser: window, in node : global
*  2.function scope(local)
*       - orice denumire creata in interiorul unei functii
*  3.block scope
*     -orice denumire declarata cu const si let sau class intre orice set de acolade
*  4. module scope
*     -orice denumire declarata intr-un fisier care e inclus in html ca si modul
*
*
* */
testScope();
function testScope(){
    const result = 1; //globala implicitA
    //debugger;
    //console.log(result);
}



if(true){
    const blockScope = 'Vasi';
    console.log(blockScope);
}


for(let i=0; i<10; i++){
    console.log(i);
}
//console.log(i);

let deffered;
console.log(deffered);
deffered = 10;

//function declaration
function add(num1,num2){ //declarate cu let
    return num1 + num2;
}
console.clear();
const rez = add(200,500);
console.log(rez);


//function expresion
const add2 = function (num1,num2,num3){
    return num1 + num2+num3;
};

console.log(add2(1,2,3));
const add3 = add;

console.log(add3(30,50));


function exp(base,exp){
    return base ** exp;
}

console.log(exp(2,8));

//callback
function printMathOp(callback){
    console.log(callback(5,2,3));
}

printMathOp(add);
printMathOp(exp);
printMathOp((num1,num2) => num1/num2); //arow function
printMathOp(function(num1,num2) {
    return num1/num2;
});

function isEven(num){
    return num % 2 === 0;
}

console.log(isEven(4));