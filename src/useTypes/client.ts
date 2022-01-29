import * as grpc from '@grpc/grpc-js'
import { load } from '../with_google_timestamp/proto'
import { HelloRequest__Output } from '../../types/hello/HelloRequest'
import { ServiceError } from '@grpc/grpc-js'

const deadline = new Date()
deadline.setSeconds(deadline.getSeconds() + 50)

// 需要执行 npm run proto && npm run timestampToDate
async function main() {

  // 使用 with_google_timestamp 中的 proto 进行 proto 文件加载
  const hello = await load()
  const client = new hello.hello.Greeter('127.0.0.1:56789', grpc.credentials.createInsecure())

  client.waitForReady(deadline, err => {
    console.log(err, 'err')
    console.log('client start ......')
  })

  client.SayHello({
    message: 'Hello',
    updated_time: new Date(),
  }, function (err: ServiceError | null, res?: HelloRequest__Output) {
    if (err) {
      console.error('Error: ', err)
    } else {
      console.log(res, 'response')
    }
  })
}

main().then(res => console.log(res,'res'))
