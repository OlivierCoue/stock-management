import { testContext, testServices } from './test-context'

describe('Aisle', () => {
  it(`aisle - create - success`, async () => {
    if (!testContext.store0 || !testContext.seller0 || !testContext.seller1) throw new Error('no store or seller')
    // eslint-disable-next-line require-atomic-updates
    testContext.aisle0 = await testServices.aisleService.create({
      storeUuid: testContext.store0.uuid,
      sellerUuid: testContext.seller0.uuid,
      name: 'aisle0',
    })
    // eslint-disable-next-line require-atomic-updates
    testContext.aisle1 = await testServices.aisleService.create({
      storeUuid: testContext.store0.uuid,
      sellerUuid: testContext.seller1.uuid,
      name: 'aisle1',
    })

    expect(testContext.aisle0).toBeTruthy()
    expect(testContext.aisle0.id).toBeTruthy()
    expect(testContext.aisle0.uuid).toBeTruthy()
    expect(testContext.aisle0.name).toEqual('aisle0')

    expect(testContext.aisle1).toBeTruthy()
    expect(testContext.aisle1.id).toBeTruthy()
    expect(testContext.aisle1.uuid).toBeTruthy()
    expect(testContext.aisle1.name).toEqual('aisle1')
  })

  it(`aisle - findOne - success`, async () => {
    const aisle0 = await testServices.aisleService.findOne({ where: { name: 'aisle0' } })

    expect(aisle0).toBeTruthy()
    if (aisle0) expect(aisle0.name).toEqual('aisle0')
  })

  it(`aisle - findMany - success`, async () => {
    const aisles = await testServices.aisleService.findMany({ take: 2 })

    expect(Array.isArray(aisles)).toBe(true)
    expect(aisles.length).toEqual(2)
  })

  it(`aisle - update - success`, async () => {
    if (!testContext.aisle0 || !testContext.aisle1) return
    await testServices.aisleService.update({ uuid: testContext.aisle0.uuid, name: 'aisle0-updated' })
    await testServices.aisleService.update({ uuid: testContext.aisle1.uuid, name: 'aisle1-updated' })

    const aisle0 = await testServices.aisleService.findOne({ where: { uuid: testContext.aisle0.uuid } })
    const aisle1 = await testServices.aisleService.findOne({ where: { uuid: testContext.aisle1.uuid } })

    expect(aisle0).toBeTruthy()
    if (aisle0) expect(aisle0.name).toEqual('aisle0-updated')

    expect(aisle1).toBeTruthy()
    if (aisle1) expect(aisle1.name).toEqual('aisle1-updated')
  })

  it(`aisle - delete - success`, async () => {
    if (!testContext.aisle1) return
    await testServices.aisleService.delete({ uuid: testContext.aisle1.uuid })
    const aisle1 = await testServices.aisleService.findOne({ where: { uuid: testContext.aisle1.uuid } })
    expect(aisle1).toBeFalsy()
  })
})
