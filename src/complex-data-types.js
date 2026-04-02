console.clear();

(function() {
    const user = {
        email: 'a@a.com',
        password: 'parola',
        weight: 100,
        height: 1.85,
        something: 'aaa',
        isAdmin: false,
        telephoneNumbers: {
            mobile: '1234',
            work: '4567',
        },
        //calculateBmi: function(){
        calculateBmi() {
            return (this.weight / this.height ** 2).toFixed(1);
        },
        calculateBmi2: () => {
            (this.weight / this.height ** 2).toFixed(1);
        }
    };

    const altObj = {
        weight: 80,
        height: 1.75,
        otherBmi: user.calculateBmi(),
    }
    const myExternalFunc = user.calculateBmi.bind(user);
    console.log(myExternalFunc);

    console.log(user.calculateBmi2(), altObj.otherBmi);
    console.log(user.calculateBmi2(), this);

//ground rules
    /*
    * 1  this -> dynamically determined at the moment of function invocation
    * wihout ., this will return something weird(wihout anything in the left) -> undefined
    *
    *
    * 2 this -> is determidned at the moment of func creation
    *   arrow functions use the value of this from the lexical scope they are created
    * this -> cane be programatically set by developer using "call" and "apply"
    *
    * 3 this is set to whatever the programmer wants inside the construction function
    *
    * */


    const obj = {
        email: 'a@a.com',
    };

    const prop = 'email'

    console.log(obj[prop]); //prop = proprietate

    console.log(prop + 'ail');

    console.log(obj);
    obj.firstName = 'Vasi'

    console.log((JSON.stringify(user)));

    function test(anyObj){
        //shallow clonening
        const clone = {...anyObj};

        //deep clone
        //const clone2 = structuredClone(anyObj); //nu merge cu metode in obiect(functii)
        clone.something = 'else0';
    }

    test(user)
    console.log(user.something)

    console.dir(document.body);

    const arr = [1,'arr',user];
    arr.push('aaa')
    console.log(arr);
    console.log(arr.length);
    console.log(arr.keys().forEach(key => console.log(typeof key)));

    let index = 0;
    while(index < arr.length){
        console.log(arr[index]);
        index++;
    }

    for(let i=0; i<arr.length; i++){
        console.log(arr[i])
    }

    for(const item of arr){
        console.log(item)
    }
    
})();
