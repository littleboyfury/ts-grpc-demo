import * as path from 'path'
import * as grpc from '@grpc/grpc-js'
import * as protoLoader from '@grpc/proto-loader'

const packageDefinition = protoLoader.loadSync(
  path.join(__dirname, '../../proto/hello/test.proto'), {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  })
export const hello = grpc.loadPackageDefinition(packageDefinition) as any
