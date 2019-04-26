const Lab = require('lab')
const Code = require('code')
const lab = exports.lab = Lab.script()
const rolesFunction = require('../RolesFunction/index')

const context = {
  log: console.log,
  bindingData: {
    userId: 'user001'
  }
}

lab.experiment('MyHttpTrigger', () => {
  lab.test('returns name', async () => {
    await rolesFunction(context, { query: { name: 'Mark' } })
    Code.expect(context.res).to.exist()
    // Code.expect(context.res.body).to.equal('Hello Mark')
  })
})
