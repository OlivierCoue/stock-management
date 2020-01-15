// Hello
const a = 'a'

interface IMyInterface {
  num: number
  str: string
}

const helloObj: IMyInterface = {
  num: 1,
  str: 'ee',
}

class MyClass<T> {
  private readonly privateNum: number

  constructor(param: number) {
    this.privateNum = param
  }

  myFunction(param1: IMyInterface, param2: number, myType: T): number {
    console.log(this.privateNum)

    return 1
  }
}

const myClassObj = new MyClass<IMyInterface>(1)
myClassObj.myFunction({ str: 'qzd', num: 1 }, 1, { num: 1, str: '1' })

const myArray: number[] = []
myArray.forEach((value) => {})
const myArrayPlusOne = myArray.map((value) => value + 1)

function sleep(ms: number): Promise<void> {
  // eslint-disable-next-line promise/avoid-new
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}
