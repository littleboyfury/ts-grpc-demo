<div align="center">

[![node](https://img.shields.io/badge/node->_v14-green.svg)](https://nodejs.org/en/)
[![Typescript](https://img.shields.io/badge/Typescript-4.0.0-green.svg)](https://www.typescriptlang.org/)
[![Ecmascript](https://img.shields.io/badge/Ecmascript-2020+-green.svg)](https://www.ecma-international.org/publications-and-standards/standards/ecma-262/)

  <h1>Typescript GRPC Demo</h1>
</div>

## install

```bash
npm install

# 使用 Date 类型，new Date()
npm run serverGT
npm run clientGT

# 使用对象类型 { seconds: 199999, nanos: 100000 }
npm run server
npm run client

# 生成类型文件
npm run proto
# 替换 Timestamp 为 Date
npm run timestampToDate
# 删除 类型文件
npm run clean
```

## 修改说明

1. 根据 [protobufjs PR](https://github.com/protobufjs/protobuf.js/pull/1076) 
把修改后的 [converter.js](src/with_google_timestamp/lib/converter.js)
复制到自己的项目中，在 [proto.ts](src/with_google_timestamp/proto.ts)
中进行导入原有的包进行覆盖，使用 `import()` 函数对 `@grpc/proto-loader` 包进行延迟导入，
这样 `converter` 就是被自定义的函数。

2. 类型文件生成，`npm run proto && npm run timestampToDate` 生成类型文件，
通过 sed 替换掉 原有的 Timestamp 类型

3. 修改原因，社区中没有针对 google 的包做处理，如果独立维护 protobufjs 是有成本的，间接性修改源码，以减少维护成本

## 示例

- [使用 Timestamp 类型](src/normal)  
`npm run server`  
`npm run client`

- [使用 使用生成的 types](src/useTypes)  
`npm run proto && npm run timestampToDate`  
`npm run serverType`  
`npm run clientType`

- [使用 Date 类型](src/with_google_timestamp)  
`npm run serverGT`  
`npm run clientGT`


