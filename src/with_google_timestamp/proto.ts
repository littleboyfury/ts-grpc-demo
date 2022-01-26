import * as path from 'path'
import * as grpc from '@grpc/grpc-js'
import * as converter from 'protobufjs/src/converter'
import * as  converterLib from './lib/converter'

converter.toObject = converterLib.toObject
converter.fromObject = converterLib.fromObject

export async function load() {
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
