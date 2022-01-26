import * as grpc from '@grpc/grpc-js'
import { hello } from './proto'

const deadline = new Date()
deadline.setSeconds(deadline.getSeconds() + 50)

function main() {
  const client = new hello.hello.Greeter('127.0.0.1:56789', grpc.credentials.createInsecure())

  client.waitForReady(deadline, err => {
    console.log(err, 'err')
    console.log('client start ......')
  })

  client.SayHello({
    message: 'Hello',
    updated_time: { seconds: 199999, nanos: 100000 },
  }, function (err, res) {
    if (err) {
      console.error('Error: ', err)
    } else {
      console.log(res, 'response')
    }
  })
}

main()
