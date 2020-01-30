import { testContext, testServices } from './test-context'

describe('Store', () => {
  it(`store - create - success`, async () => {
    testContext.store0 = await testServices.storeService.create({ name: 'test-store-0' })
    testContext.store1 = await testServices.storeService.create({ name: 'test-store-1' })

    expect(testContext.store0).toBeTruthy()
    expect(testContext.store0.id).toBeTruthy()
    expect(testContext.store0.uuid).toBeTruthy()
    expect(testContext.store0.name).toEqual('test-store-0')

    expect(testContext.store1).toBeTruthy()
    expect(testContext.store1.id).toBeTruthy()
    expect(testContext.store1.uuid).toBeTruthy()
    expect(testContext.store1.name).toEqual('test-store-1')
  })

  it(`store - findOne - success`, async () => {
    const store0 = await testServices.storeService.findOne({ where: { name: 'test-store-0' } })
    const store1 = await testServices.storeService.findOne({ where: { name: 'test-store-1' } })

    expect(store0).toBeTruthy()
    if (store0) expect(store0.name).toEqual('test-store-0')

    expect(store1).toBeTruthy()
    if (store1) expect(store1.name).toEqual('test-store-1')
  })

  it(`store - findMany - success`, async () => {
    const stores = await testServices.storeService.findMany({ take: 2 })

    expect(Array.isArray(stores)).toBe(true)
    expect(stores.length).toEqual(2)
  })

  it(`store - update - success`, async () => {
    if (!testContext.store0 || !testContext.store1) return
    await testServices.storeService.update({ uuid: testContext.store0.uuid, name: 'test-store-0-updated' })
    await testServices.storeService.update({ uuid: testContext.store1.uuid, name: 'test-store-1-updated' })

    const store0 = await testServices.storeService.findOne({ where: { uuid: testContext.store0.uuid } })
    const store1 = await testServices.storeService.findOne({ where: { uuid: testContext.store1.uuid } })

    expect(store0).toBeTruthy()
    if (store0) expect(store0.name).toEqual('test-store-0-updated')

    expect(store1).toBeTruthy()
    if (store1) expect(store1.name).toEqual('test-store-1-updated')
  })

  it(`store - delete - success`, async () => {
    if (!testContext.store1) return
    await testServices.storeService.delete({ uuid: testContext.store1.uuid })
    const store1 = await testServices.storeService.findOne({ where: { uuid: testContext.store1.uuid } })
    expect(store1).toBeFalsy()
  })
})
