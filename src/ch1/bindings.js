const log = console.log;

/**
 * 1 scope != object
 * 2 global scope != global object (window, global)
 * 3 var declarations add attributes to global object
 */

/**
 * Program Structure
 *  - File / Module
 *    - Function / Class
 *    - if / switch / for / while
 *    - //
 *
 *  Scope
 *  - non-block scope
 *  - block scope
 *  arr = [1, 1, 1]
 *         ^
 *         |
 *     arr[0] = 3
 */

function f1(arg) {
    let a = 9;
    if (arg) {
        let a = 1;
    }

    log(`a is ${a}`);
    return a;
}

function f2() {
    log(name);
}

{
    // block scope
    // scope hoisting
    // global scope, function scope
    var name = 'xuyuan';
    // overwrite - ok
    // redeclare - NOT ok!
    name = 'xuxiang';
}

function test_const() {
    const age = 10;
    age += 1;  // TypeError: Assignment to constant variable.
    log(age);
}

function test_unreached_var() {
    // var age = undefined;
    log(age); // undefined. NOT ReferenceError
    var age = 10;

    log(name);  // ReferenceError
    let name = 'xux';
}

/**
 * On each iteration, the loop creates a new variable
 * and initializes it to the value of the variable
 * with the same name from the previous iteration.
 */
function test_loop_bindings() {
    for (const x of [1, 2]) {  // It's OK.
        log(x);
    }
    return;

    for (var i=0; i < 3; ++i) {
        log(i);
    }
    log(i);

    for (const j=0; j < 3; ++j) {  // ++j -> TypeError
        log(j);
    }
    /**
     * const j = 0;
     * while (j < 3) {
     *   log(j);
     *   ++j;  // TypeError, cannot modify a const.
     * }
     */

    for (let j=0; j < 3; ++j) {
        log(j);
    }
    log(j);  // ReferenceError
}
// test_loop_bindings();


function test_loop_bindings_2() {
    let fruits = 'apple banana carrot'.split(' ');
    let funcs = [];

    for(var fruit of fruits) {
        funcs.push(function() {
            log(`I love ${fruit}`);
        });
    }
    funcs.forEach(fn => fn());  // carrot x 3

    funcs = [];
    for(var fruit of fruits) {
        funcs.push(function(fruit) {
            return () => log(`I love ${fruit}`);
        }(fruit));
    }
    funcs.forEach(fn => fn());  // a b c
    return;

    funcs = [];
    for(const f of fruits) {
        funcs.push(function() {
            log(`I love ${f}`);
        });
    }
    funcs.forEach(fn => fn());  // a b c
}
test_loop_bindings_2();
