import { GreeterHandlers } from '../../types/hello/Greeter'
import { sendUnaryData, ServerUnaryCall, UntypedHandleCall } from '@grpc/grpc-js'
import { HelloRequest__Output } from '../../types/hello/HelloRequest'
import { HelloResponse } from '../../types/hello/HelloResponse'
import * as grpc from '@grpc/grpc-js'
import { load } from '../with_google_timestamp/proto'

class Server implements GreeterHandlers {
  [name: string]: UntypedHandleCall

  // 可以使用类型
  SayHello(call: ServerUnaryCall<HelloRequest__Output, HelloResponse>, callback: sendUnaryData<HelloResponse>): void {
    console.log(call.request, 'call')
    callback(null, {
      message: 'hhh',

      // google.protobuf.Timestamp 类型可以直接通过 new Date() 进行赋值
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
}

// 需要执行 npm run proto && npm run timestampToDate
async function main() {
  const server = new grpc.Server()

  // 使用 with_google_timestamp 中的 proto 进行 proto 文件加载
  const hello = await load()

  server.addService(hello.hello.Greeter.service, new Server())

  server.bindAsync('127.0.0.1:56789', grpc.ServerCredentials.createInsecure(), () => {
    server.start()
    console.log('grpc server started')
  })
}

main().then(res => console.log(res, 'res'))
