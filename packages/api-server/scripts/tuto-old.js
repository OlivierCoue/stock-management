var simpleVariable = 'a';
var obj = { num: 1, str: 'hello' };
console.log(obj); // { num: 1, str: 'hello' }
var num = obj.num, str = obj.str;
console.log(num); // 1
console.log(str); // hello
function testFunction(param) {
    console.log(param);
    return 1;
}
testFunction(obj);
function runFUnction(anyFunction) {
    anyFunction();
}
runFUnction(function () {
    console.log('Running arrow function');
});
