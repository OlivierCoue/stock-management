import { testContext, testServices } from './test-context'

describe('Stock', () => {
  it(`stock - create - success`, async () => {
    if (!testContext.aisle0 || !testContext.product0 || !testContext.product1) throw new Error('no aisle or product')
    // eslint-disable-next-line require-atomic-updates
    testContext.stock0 = await testServices.stockService.create({
      productUuid: testContext.product0.uuid,
      aisleUuid: testContext.aisle0.uuid,
      count: 10,
    })
    // eslint-disable-next-line require-atomic-updates
    testContext.stock1 = await testServices.stockService.create({
      productUuid: testContext.product1.uuid,
      aisleUuid: testContext.aisle0.uuid,
      count: 20,
    })

    expect(testContext.stock0).toBeTruthy()
    expect(testContext.stock0.id).toBeTruthy()
    expect(testContext.stock0.uuid).toBeTruthy()
    expect(testContext.stock0.count).toEqual(10)

    expect(testContext.stock1).toBeTruthy()
    expect(testContext.stock1.id).toBeTruthy()
    expect(testContext.stock1.uuid).toBeTruthy()
    expect(testContext.stock1.count).toEqual(20)
  })

  it(`stock - findOne - success`, async () => {
    const stock0 = await testServices.stockService.findOne({ where: { name: 'stock0' } })

    expect(stock0).toBeTruthy()
    if (stock0) expect(stock0.count).toEqual(10)
  })

  it(`stock - findMany - success`, async () => {
    const stocks = await testServices.stockService.findMany({ take: 2 })

    expect(Array.isArray(stocks)).toBe(true)
    expect(stocks.length).toEqual(2)
  })

  it(`stock - update - success`, async () => {
    if (!testContext.stock0 || !testContext.stock1) return
    await testServices.stockService.update({ uuid: testContext.stock0.uuid, count: 11 })
    await testServices.stockService.update({ uuid: testContext.stock1.uuid, count: 21 })

    const stock0 = await testServices.stockService.findOne({ where: { uuid: testContext.stock0.uuid } })
    const stock1 = await testServices.stockService.findOne({ where: { uuid: testContext.stock1.uuid } })

    expect(stock0).toBeTruthy()
    if (stock0) expect(stock0.count).toEqual(11)

    expect(stock1).toBeTruthy()
    if (stock1) expect(stock1.count).toEqual(21)
  })

  it(`stock - delete - success`, async () => {
    if (!testContext.stock1) return
    await testServices.stockService.delete({ uuid: testContext.stock1.uuid })
    const stock1 = await testServices.stockService.findOne({ where: { uuid: testContext.stock1.uuid } })
    expect(stock1).toBeFalsy()
  })
})
