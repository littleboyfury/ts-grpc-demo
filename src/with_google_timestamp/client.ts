import * as grpc from '@grpc/grpc-js'
import { load } from './proto'

const deadline = new Date()
deadline.setSeconds(deadline.getSeconds() + 50)

async function main() {
  const hello = await load()
  const client = new hello.hello.Greeter('127.0.0.1:56789', grpc.credentials.createInsecure())

  client.waitForReady(deadline, err => {
    console.log(err, 'err')
    console.log('client start ......')
  })

  client.SayHello({
    message: 'Hello',
    updated_time: new Date(),
  }, function (err, res) {
    if (err) {
      console.error('Error: ', err)
    } else {
      console.log(res, 'response')
    }
  })
}

main().then(res => console.log(res,'res'))
