import * as grpc from '@grpc/grpc-js'
import { load } from './proto'

function SayHello(call, callback) {
  console.log(call.request, 'call')
  callback(null, {
    message: 'hhh',
    updated_time: new Date(),
    time3: new Date(),
    a: {
      time1: new Date(),
      b: {
        time2: new Date(),
      },
    },
  })
}

async function main() {
  const server = new grpc.Server()
  const hello = await load()

  server.addService(hello.hello.Greeter.service, { SayHello })

  server.bindAsync('127.0.0.1:56789', grpc.ServerCredentials.createInsecure(), () => {
    server.start()
    console.log('grpc server started')
  })
}

main().then(res => console.log(res, 'res'))
