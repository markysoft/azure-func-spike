const RoleService = require('../lib/services/role-service')
const service = new RoleService()

module.exports = async function (context, req) {
  const { userId, planId } = context.bindingData
  context.log(`getting credentials for ${userId} ${planId || ''}`)
  try {
    const perms = service.getCredentials(userId, planId)
    context.res = {
      status: 200,
      body: perms
    }
  } catch (ex) {
    context.res = {
      status: 500,
      body: ex
    }
  }
}
