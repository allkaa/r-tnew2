'use strict';

// CLOSURES.

//*
// This does not create closure (only empty temporary one to hold possible outer variables references).
function TestFunc(x,y){
  return x + y;
}
var tf = TestFunc(3,4);
console.log(tf);
//*/

// This construction create globally seen closure keeping outer reference to outer variable testvar=3.
///*
let testvar = 3;
function TestFunc2(x,y){
  return x + y + testvar;
}
var tf2 = TestFunc2(1,1);
console.log(tf2);
//*/

/*
// nested function forms closure.
function outside(x) {
  function inside(y) {
    return x + y;
  }
  return inside; // // Return the inner function, thereby exposing it to outer scopes.
}
var fn_inside = outside(3); // Create closure. Think of it like: create a function expression that adds 3 to whatever you give it.
var result = fn_inside(5); //  Use closure fn_inside - returns 8.
console.log(result);
var result1 = outside(3)(5); // 3 for outside, 5 for insice - returns 8 and new closure is created for each call to outside.
console.log(result1);
var result2 = outside(1)(5); // 1 for outside, 5 for inside - returns 6 and new closure is created for each call to outside/
console.log(result2);

// Counter nested function forms closure.
function cnt(x) {
  function counter() {
    x = x + 1;
    return x;
  }
  return counter; // // Return the inner function, thereby exposing it to outer scopes.
}
// A closure is created when the inner function is somehow made available to any scope outside the outer function e.g.
var closure_counter = cnt(0); // Create closure a function expression that adds 1 to perserved x value starting from 0.
var result3 = closure_counter(); //  Use closure closure_counter - returns 1.
console.log(result3);
var result3 = closure_counter(); //  Use closure closure_counter - returns 2.
console.log(result3);



// Difference between Function constructor and function declaration.
/*
  Functions created with the Function constructor do not create closures to their creation contexts;
  they always are created in the global scope. When running them, they will only be able to access their own local variables
  and global ones, NOT the ones from the scope in which the Function constructor was created.
  This is different from using eval with code for a function expression.
*/
/*
aaa1 = new Function(); // empty Function object - function anonymous(), methods used thru Function.prototype, closure created.
// or aaa1 = Function(); // same result as above.
let x = 10;
function createFunction1() {
    let x = 20
    // Nested Constructor does not create closure, at this point `this` is undefined,
    let f = new Function('return x;'); // but inside f() 'this` will be global and |x| refers global |x| - Reference Error x is not defined.
    return f();  // inside f() 'this` will be global and |x| refers global |x| - Reference Error x is not defined.
    // But can work thru parameter:
    //let f = new Function('x','return x;'); // 20 works thru parameter.
    //return f(x);
}
function createFunction2() {
    let x = 30;
    // Nested Declaration creates closure that will be  kept.
    function f() {
        return x; // this |x| refers local |x| above
    }
    return f();
}
//aaa2 = createFunction1(); // Reference Error x is not defined or 20.
aaa2 = createFunction2(); // 30 and closure will be created and saved.

// Nested functions and closures.
// An important detail of nested functions in JavaScript is that they can access variables in their parent function's scope:
function parentFunc(x) {
  var a = x;
  function nestedFunc() {
    var b = 4; // parentFunc can't use this
    return a + b; 
  }
  return nestedFunc();
}
parentFunc(1); // closure will be garbished.
let aaax = parentFunc(1); // closure will be garbished.
let aaay = parentFunc(2); // closure will be garbished.

function makeFuncM() {
  var name = 'Mozilla';
  function displayName() {
    var aaaTest = name;
  }
  return displayName;
}

aaax = makeFuncM(); // return function displayName() and it's closures.
aaa3 = aaax();

// Closures.
// Whenever JavaScript executes a function, a 'scope' object is created to hold the local variables
// created within that function. It is initialized with any variables passed in as function parameters.
// A brand new scope object is created every time a function starts executing, and , unlike the global object
// (which is accessible as `this` and in browsers as window) these scope objects cannot be directly accessed from
// your JavaScript code. There is no mechanism for iterating over the properties of the current scope object, for example.
function makeAdder(a) {
  return function(b) {
    return a + b;
  };
}
aaax = makeAdder(5); // return ref to function (b) with a=5 in closure.
aaay = makeAdder(20); // return ref to function (b) with a=20 in closure.
aaa = aaax(6); // 5(in closure) + 6
aaa = aaay(7); // 20(in closure) + 7

/*
So when makeAdder() is called, a scope object is created with one property: a, which is the argument passed
to the makeAdder() function. makeAdder() then returns a newly created function.
Normally JavaScript's garbage collector would clean up the scope object created for makeAdder() at this point,
but the returned function maintains a reference back to that scope object.
As a result, the scope object will not be garbage-collected until there are no more references to the function object
that makeAdder() returned.
In essence, makeAdder is a function factory — it creates functions which can add a specific value to their argument.

Scope objects form a chain called the scope chain, similar to the prototype chain used by JavaScript's object system.

A closure is the combination of a function and the scope object in which it was created.
Closures let you save state — as such, they can often be used in place of objects. 
*/

/*
// Module pattern using closures:
// Creating object counter having "private" var privateCouter and changeBy(val) method in closure and
// three "public" methods increment(), decrement() and value().
var counter = (function() { // IIFE anonymous function creats closure with pirvateCountere and changeBy(val), returning Object.
  var privateCounter = 0; // "private" variable property in closure.
  function changeBy(val) { // "private" method in closure.
    privateCounter += val;
  }
  return { // returns Object with three properties - increment, decrement and value.
    increment: function() { // "public" method.
      changeBy(1);
    },
    decrement: function() { // "public" method.
      changeBy(-1);
    },
    value: function() { // "public" method.
      return privateCounter;
    }
  };   
})(); // Immediately Invoked Function Expression see 'IIFE'.

aaa = counter.value(); // logs 0
counter.increment();
counter.increment();
aaa = counter.value(); // logs 2
counter.decrement();
aaa = counter.value(); // logs 1
/*
Above shared lexical environment is created in the body of an anonymous function, which is executed as soon
as it has been defined.
The lexical environment contains two private items: a variable called privateCounter and a function called changeBy.
Neither of these private items can be accessed directly from outside the anonymous function.
Instead, they must be accessed by the three public functions that are returned from the anonymous wrapper.
Those three public functions are closures that share the same environment.
Thanks to JavaScript's lexical scoping, they each have access to the privateCounter variable and changeBy function.
*/
/*
Using closures in this way provides a number of benefits that are normally associated with object-oriented programming --
 in particular, data hiding and encapsulation.
*/


/*
Closure Scope ChainSection
For every closure we have three scopes:-
    Local Scope ( Own scope)
    Outer Functions Scope
    Global Scope
*/
/*
// NB! All closures have access to all outer function scopes within which they were declared.
// global scope
let e = 10;
function sumA(a){
  // outer functions scope
  return function(b){
    // outer functions scope
    return function(c){
      // outer functions scope
      return function(d){
        // local scope
        return a + b + c + d + e;
      }
    }
  }
}

aaa = sumA(1)(2)(3)(4); // log 20

// We can also write with named functions:
// global scope
e = 30;
function sumN(a){
  // outer functions scope
  return function sum2(b){
    // outer functions scope
    return function sum3(c){
      // outer functions scope
      return function sum4(d){
        // local scope
        return a + b + c + d + e;
      }
    }
  }
}
var s = sumN(1); // return sum2(b) with closure 1
var s1 = s(2); // return sum3(c) with closure 2
var s2 = s1(3); // return sum4(d) with closure 3
var s3 = s2(4); // return 40 = 1 + 2 + 3 + 4 + 40 (global scope e)
aaa = s3; //log 40
aaa = sumA(1)(2)(3)(4); //log 40

// Closures in loop.
aaa = "";
function setupHelp() {
  var helpText = [
      {'id': 'email', 'help': 'Your e-mail address'},
      {'id': 'name', 'help': 'Your full name'},
      {'id': 'age', 'help': 'Your age (you must be over 16)'}
    ];

  for (var i = 0; i < helpText.length; i++) {
    let item = helpText[i];
    //aaa = aaa + function() {return item.help;}() + "; "; // with decalred anonymous function  IIFE.
    aaa = aaa + (() => item.help)() + "; "; // with arrow function  IIFE.
  }
}
setupHelp();
*/