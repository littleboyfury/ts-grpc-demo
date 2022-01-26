import * as grpc from '@grpc/grpc-js'
import { hello } from './proto'

function SayHello(call, callback) {
  console.log(call.request, 'call')
  callback(null, {
    message: 'hhh',
    updated_time: { seconds: 1123123, nanos: 1123120 },
    time3: { seconds: 1123123, nanos: 1123120 },
    a: {
      time1: { seconds: 1123123, nanos: 1123120 },
      b: {
        time2: { seconds: 1123123, nanos: 1123120 },
      },
    },
  })
}

function main() {
  const server = new grpc.Server()

  server.addService(hello.hello.Greeter.service, { SayHello })

  server.bindAsync('127.0.0.1:56789', grpc.ServerCredentials.createInsecure(), () => {
    server.start()
    console.log('grpc server started')
  })
}

main()
