const Lab = require('lab')
const Code = require('code')
const lab = exports.lab = Lab.script()
const RoleService = require('../../lib/services/role-service')

lab.experiment('role service', () => {
  let service

  // Create server before each test
  lab.before(async () => {
    service = new RoleService()
  })

  lab.test('get elm user credentials for no plans gives plan.create permission', async () => {
    const credentials = service.getCredentials('user01')
    Code.expect(credentials).to.exist()
    Code.expect(credentials.roles).to.exist()
    Code.expect(credentials.roles.length).to.equal(1)
    Code.expect(credentials.roles[0].name).to.equal('ElmUser')
    Code.expect(credentials.permissions).to.exist()
    Code.expect(credentials.permissions.length).to.equal(1)
    Code.expect(credentials.permissions[0].name).to.equal('plan.create')
    console.log(JSON.stringify(credentials, undefined, 2))
  })

  lab.test('get landowner credentials for plan ID gives update, and submit permissions', async () => {
    const credentials = service.getCredentials('user01', 'plan01')
    Code.expect(credentials).to.exist()
    Code.expect(credentials.roles).to.exist()
    Code.expect(credentials.roles.length).to.equal(2)
    Code.expect(credentials.roles[0].name).to.equal('ElmUser')
    Code.expect(credentials.roles[1].name).to.equal('LandManager')
    Code.expect(credentials.permissions).to.exist()
    Code.expect(credentials.permissions.length).to.equal(5)
    Code.expect(credentials.permissions[0].name).to.equal('plan.create')
    Code.expect(credentials.permissions[1].name).to.equal('plan.update')
    Code.expect(credentials.permissions[2].name).to.equal('plan.submitforapproval')
    Code.expect(credentials.permissions[3].name).to.equal('plan.submit')
    Code.expect(credentials.permissions[4].name).to.equal('plan.review')
    console.log(JSON.stringify(credentials, undefined, 2))
  })

  lab.test('get user credentials for unknown plan ID returns only create', async () => {
    const credentials = service.getCredentials('user01', 'nosuchplan')
    Code.expect(credentials).to.exist()
    Code.expect(credentials.roles).to.exist()
    Code.expect(credentials.roles.length).to.equal(1)
    Code.expect(credentials.roles[0].name).to.equal('ElmUser')
    Code.expect(credentials.permissions[0].name).to.equal('plan.create')
  })

  lab.test('get adviser credentials for plan ID', async () => {
    const credentials = service.getCredentials('user02', 'plan01')
    Code.expect(credentials).to.exist()
    Code.expect(credentials.roles).to.exist()
    Code.expect(credentials.roles.length).to.equal(2)
    Code.expect(credentials.roles[0].name).to.equal('ElmUser')
    Code.expect(credentials.roles[1].name).to.equal('Adviser')
    Code.expect(credentials.permissions).to.exist()
    Code.expect(credentials.permissions.length).to.equal(3)
    Code.expect(credentials.permissions[0].name).to.equal('plan.create')
    Code.expect(credentials.permissions[1].name).to.equal('plan.approve')
    Code.expect(credentials.permissions[2].name).to.equal('plan.review')
    console.log(JSON.stringify(credentials, undefined, 2))
  })

  lab.test('get credentials for public user with no plan', async () => {
    const credentials = service.getCredentials('user04')
    Code.expect(credentials).to.exist()
    Code.expect(credentials.roles).to.exist()
    Code.expect(credentials.roles.length).to.equal(1)
    Code.expect(credentials.roles[0].name).to.equal('PublicUser')
    Code.expect(credentials.permissions.length).to.equal(1)
    Code.expect(credentials.permissions[0].name).to.equal('plan.public')
    console.log(JSON.stringify(credentials, undefined, 2))
  })

  lab.test('get credentials for public user with plan', async () => {
    const credentials = service.getCredentials('user04', 'plan01')
    Code.expect(credentials).to.exist()
    Code.expect(credentials.roles).to.exist()
    Code.expect(credentials.roles.length).to.equal(1)
    Code.expect(credentials.roles[0].name).to.equal('PublicUser')
    Code.expect(credentials.permissions.length).to.equal(1)
    Code.expect(credentials.permissions[0].name).to.equal('plan.public')
    console.log(JSON.stringify(credentials, undefined, 2))
  })
})
