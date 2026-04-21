const arr = Array(10);
console.log(arr);

const obj = new Object();
console.log(obj);


//constructor pt obiect de tip user
function User({fName,lName,height,weight}){
    this.fName = fName;
    this.lName = lName;
    this.height = height;
    this.weight = weight;
    this.role = 'user';
    //
    // this.calculateBmi = function(){
    //     console.log((this.weight/(this.height**2)).toFixed(2));
    // }
}

User.prototype.calculateBmi = function(){
    console.log((this.weight/(this.height**2)).toFixed(2));
}//acum vor fi egale in memorie

User.prototype.sayHello = function(){
    console.log(`Hello ${this.fName} ${this.lName}`);
}

const user1 = new User({fName:"Paul",lName:"Popescu",height:1.85,weight:100});
const user2 = new User({fName:"George",lName:"Bush",height:1.75,weight:80});

// console.log(user1);
// //console.log(user1.hasOwnProperty('fName'));
//
// user1.calculateBmi();
// user2.calculateBmi();

//console.log(user1.calculateBmi === user2.calculateBmi) //nu vor fi egale, is 2 diferite in memorie

class Admin extends User{
    role = 'admin';
    #privateProperty = 'this is private';

    static thisIsAStaticProperty = 'another static property';
    // constructor(...params){
    //     super(...params);
    //     this.role = 'admin';
    // }

    sayHello(){
        super.sayHello();
        console.log('Who is an admin');
    }
    getPrivateProperty(){
        return this.#privateProperty;
    }

    get myPrivateProperty(){
        return this.#privateProperty;
    }
    set myPrivateProperty(value){
        this.#privateProperty = value;
    }

}

const user3 = new Admin({fName:"John",lName:"Doe",height:1.85,weight:100});
const user4 = new Admin({fName:"Jane",lName:"Doe",height:1.75,weight:80});

console.log(user3);
user3.calculateBmi();
user3.sayHello();
user1.sayHello();

console.log(typeof Admin);

console.log(user3.getPrivateProperty());
console.log(user3.myPrivateProperty);
user3.myPrivateProperty = 'something new';
console.log(user3.myPrivateProperty);

User.staticProp = 'this is a static property';
console.log(User.staticProp);//nu merge apelat pe user3 sau asa
console.log(Admin.staticProp);

//never use this!!
const newFunc = new Function('console.log("this is quite insecure");'); //do not use this
newFunc();

for(const key in user2){
    console.log(user2[key]);
}

console.log(user2 instanceof User);
console.log(user2 instanceof Admin);
console.log(user2 instanceof Object);
console.log(user3 instanceof User);
console.log(user3 instanceof Admin);
console.log(user3 instanceof Object);

console.log(Object.entries(user3)); //proprietate + valoare