import { testContext, testServices } from './test-context'

describe('User', () => {
  it(`user - create - success`, async () => {
    testContext.seller0 = await testServices.userService.create({
      email: 'seller0@test.com',
      firstName: 'seller0-fn',
      lastName: 'seller0-ln',
      roleName: 'seller',
      password: 'test',
    })
    testContext.seller1 = await testServices.userService.create({
      email: 'seller1@test.com',
      firstName: 'seller1-fn',
      lastName: 'seller1-ln',
      roleName: 'seller',
      password: 'test',
    })

    expect(testContext.seller0).toBeTruthy()
    expect(testContext.seller0.id).toBeTruthy()
    expect(testContext.seller0.uuid).toBeTruthy()
    expect(testContext.seller0.email).toEqual('seller0@test.com')

    expect(testContext.seller1).toBeTruthy()
    expect(testContext.seller1.id).toBeTruthy()
    expect(testContext.seller1.uuid).toBeTruthy()
    expect(testContext.seller1.email).toEqual('seller1@test.com')
  })

  it(`user - findOne - success`, async () => {
    const seller0 = await testServices.userService.findOne({ where: { email: 'seller0@test.com' } })
    const seller1 = await testServices.userService.findOne({ where: { email: 'seller1@test.com' } })

    expect(seller0).toBeTruthy()
    if (seller0) expect(seller0.email).toEqual('seller0@test.com')

    expect(seller1).toBeTruthy()
    if (seller1) expect(seller1.email).toEqual('seller1@test.com')
  })

  it(`user - findMany - success`, async () => {
    const users = await testServices.userService.findMany({ take: 2 })

    expect(Array.isArray(users)).toBe(true)
    expect(users.length).toEqual(2)
  })

  it(`user - update - success`, async () => {
    if (!testContext.seller0 || !testContext.seller1) return
    await testServices.userService.update({ uuid: testContext.seller0.uuid, email: 'seller0.updated@test.com' })
    await testServices.userService.update({ uuid: testContext.seller1.uuid, email: 'seller1.updated@test.com' })

    const seller0 = await testServices.userService.findOne({ where: { uuid: testContext.seller0.uuid } })
    const seller1 = await testServices.userService.findOne({ where: { uuid: testContext.seller1.uuid } })

    expect(seller0).toBeTruthy()
    if (seller0) expect(seller0.email).toEqual('seller0.updated@test.com')

    expect(seller1).toBeTruthy()
    if (seller1) expect(seller1.email).toEqual('seller1.updated@test.com')
  })

  it(`user - delete - success`, async () => {
    if (!testContext.seller1) return
    await testServices.userService.delete({ uuid: testContext.seller1.uuid })
    const seller1 = await testServices.userService.findOne({ where: { uuid: testContext.seller1.uuid } })
    expect(seller1).toBeFalsy()
  })
})
