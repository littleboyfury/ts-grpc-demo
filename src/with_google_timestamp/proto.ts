import * as path from 'path'
import * as grpc from '@grpc/grpc-js'
// 先加载 converter 文件
import * as converter from 'protobufjs/src/converter'
import * as  converterLib from './lib/converter'

// 重写 converter 文件
converter.toObject = converterLib.toObject
converter.fromObject = converterLib.fromObject

export async function load() {
  // 通过 import() 导入 @grpc/proto-loader 包
  // 这时里面的 converter 已经被重写，即使用的修改后的文件
  const protoLoader = await import('@grpc/proto-loader')
  const packageDefinition = protoLoader.loadSync(
    path.join(__dirname, '../../proto/hello/test.proto'), {
      keepCase: true,
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true,
    })
  return grpc.loadPackageDefinition(packageDefinition) as any
}
