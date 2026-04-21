function User({fName, lName, height, weight}) {
  this.fName = fName;
  this.lName = lName;
  this.height = height;
  this.weight = weight;
  this.role = 'user';
}

User.prototype.calculateBmi = function() {
  console.log((this.weight/this.height ** 2).toFixed(2));
}

User.prototype.sayHello = function() {
  console.log(`Hello from ${this.fName}!`);
}

const user1 = new User({fName: 'Paul', lName: 'Negoescu', height: 1.85, weight: 100});
const user2 = new User({fName: 'Andreea', lName: 'Postelnicu', height: 1.68, weight: 68});

console.log(user1);
user1.calculateBmi();
user2.calculateBmi();

class Admin extends User {
  role = 'admin';
  #privateProperty = 'test';

  static thisIsAnotherStaticProperty = '142';

  // constructor(params) {
  //   super(params);

  //   this.role = 'admin';
  // }

  sayHello() {
    super.sayHello();
    console.log('Who is an admin!')
  }

  getPrivateProperty() {
    return this.#privateProperty;
  }

  get myPrivateProperty() {
    return 'from magic getter ->>>>> ' + this.#privateProperty;
  }

  set myPrivateProperty(value) {
    this.#privateProperty = value;
  }
}

const user3 = new Admin({fName: 'Ioana', lName: 'Soare', height: 1.63, weight: 65});

user3.myPrivateProperty = 'Paul\'s test';

console.log(user3);
// console.dir(Admin)

user3.calculateBmi();
user1.sayHello();
user3.sayHello();

User.staticProperty = '42';


console.log(Admin.staticProperty);


// !!! Don't Use This !!!
// const newFunc = new Function('console.log("this is quite insecure");');

// newFunc();

for(const key in user2) {
  console.log(user2[key]);
}

console.log(user3 instanceof Admin);
console.log(Object.entries(user3));

