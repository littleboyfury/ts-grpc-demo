<div align="center">

[![node](https://img.shields.io/badge/node->_v14-green.svg)](https://nodejs.org/en/)
[![Typescript](https://img.shields.io/badge/Typescript-4.0.0-green.svg)](https://www.typescriptlang.org/)
[![Ecmascript](https://img.shields.io/badge/Ecmascript-2020+-green.svg)](https://www.ecma-international.org/publications-and-standards/standards/ecma-262/)

  <h1>Typescript GRPC demo</h1>
</div>


```bash
npm install

# 使用 Date 类型，new Date()
npm run serverGT
npm run clientGT

# 使用对象类型 { seconds: 199999, nanos: 100000 }
npm run server
npm run client
```

# 修改说明

根据 [protobufjs PR](https://github.com/protobufjs/protobuf.js/pull/1076) 
把修改后的 [converter.js](src/with_google_timestamp/lib/converter.js)
复制到自己的项目中，在 [proto.ts](src/with_google_timestamp/proto.ts)
中进行导入原有的包进行覆盖，使用 `import()` 函数对 `@grpc/proto-loader` 包进行延迟导入，
这样 `converter` 就是被自定义的函数。


