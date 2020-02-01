import { testContext, testServices } from './test-context'

describe('Product', () => {
  it(`product - create - success`, async () => {
    testContext.product0 = await testServices.productService.create({
      name: 'product0',
      price: 20,
    })
    testContext.product1 = await testServices.productService.create({
      name: 'product1',
      price: 40,
    })
    testContext.product2 = await testServices.productService.create({
      name: 'product2',
      price: 60,
    })

    expect(testContext.product0).toBeTruthy()
    expect(testContext.product0.id).toBeTruthy()
    expect(testContext.product0.uuid).toBeTruthy()
    expect(testContext.product0.name).toEqual('product0')

    expect(testContext.product1).toBeTruthy()
    expect(testContext.product1.id).toBeTruthy()
    expect(testContext.product1.uuid).toBeTruthy()
    expect(testContext.product1.name).toEqual('product1')
  })

  it(`product - findOne - success`, async () => {
    const product0 = await testServices.productService.findOne({ where: { name: 'product0' } })

    expect(product0).toBeTruthy()
    if (product0) expect(product0.name).toEqual('product0')
  })

  it(`product - findMany - success`, async () => {
    const products = await testServices.productService.findMany({ take: 2 })

    expect(Array.isArray(products)).toBe(true)
    expect(products.length).toEqual(2)
  })

  it(`product - update - success`, async () => {
    if (!testContext.product0 || !testContext.product1) return
    await testServices.productService.update({ uuid: testContext.product0.uuid, name: 'product0-updated' })
    await testServices.productService.update({ uuid: testContext.product1.uuid, name: 'product1-updated' })

    const product0 = await testServices.productService.findOne({ where: { uuid: testContext.product0.uuid } })
    const product1 = await testServices.productService.findOne({ where: { uuid: testContext.product1.uuid } })

    expect(product0).toBeTruthy()
    if (product0) expect(product0.name).toEqual('product0-updated')

    expect(product1).toBeTruthy()
    if (product1) expect(product1.name).toEqual('product1-updated')
  })

  it(`product - delete - success`, async () => {
    if (!testContext.product2) return
    await testServices.productService.delete({ uuid: testContext.product2.uuid })
    const product2 = await testServices.productService.findOne({ where: { uuid: testContext.product2.uuid } })
    expect(product2).toBeFalsy()
  })
})
