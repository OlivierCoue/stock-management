export function sortFromOrder<T>(array: T[], order: any[], key: any): T[] {
  array.sort((a: any, b: any) => {
    const A = a[key]
    const B = b[key]

    if (order.indexOf(A) > order.indexOf(B)) return 1

    return -1
  })

  return array
}
