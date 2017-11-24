global.Promise = require('bluebird')
const pThrottle = require('./p-throttle')
const PCancelable = require('./p-cancelable')
const got = url => new PCancelable((onCancel, resolve, reject) => resolve({ headers: { date: new Date() }}))

const throttled = pThrottle(got, 1, 1000)

async function main1() {
  console.log('Start 1')
  const { headers } = await throttled('http://httpbin.org/response-headers')
  console.log(1, headers.date)
  console.log('End 1')
  return 'Returned 1'
}

async function main2() {
  console.log('Start 2')
  const { headers } = await got('http://httpbin.org/response-headers')
  console.log(2, headers.date)
  console.log('End 2')
  return 'Returned 2'
}

main1().then(console.log).catch(console.error)
main2().then(console.log).catch(console.error)
