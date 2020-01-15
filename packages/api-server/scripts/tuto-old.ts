const simpleVariable = 'a'

interface IMyInterface {
  str: string
  num: number
}

const obj: IMyInterface = { num: 1, str: 'hello' }

console.log(obj) // { num: 1, str: 'hello' }

const { num, str } = obj

console.log(num) // 1
console.log(str) // hello

function testFunction(param: IMyInterface): number {
  console.log(param)

  return 1
}

testFunction(obj)

function runFUnction(anyFunction: () => void) {
  anyFunction()
}

runFUnction(() => {
  console.log('Running arrow function')
})
