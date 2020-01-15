// Hello
var a = 'a';
var helloObj = {
    num: 1,
    str: 'ee'
};
var MyClass = /** @class */ (function () {
    function MyClass(param) {
        this.privateNum = param;
    }
    MyClass.prototype.myFunction = function (param1, param2, myType) {
        console.log(this.privateNum);
        return 1;
    };
    return MyClass;
}());
var myClassObj = new MyClass(1);
myClassObj.myFunction({ str: 'qzd', num: 1 }, 1, { num: 1, str: '1' });
var myArray = [];
myArray.forEach(function (value) { });
var myArrayPlusOne = myArray.map(function (value) { return value + 1; });
function sleep(ms) {
    // eslint-disable-next-line promise/avoid-new
    return new Promise(function (resolve) {
        setTimeout(resolve, ms);
    });
}
