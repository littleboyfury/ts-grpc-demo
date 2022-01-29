import { spawnSync } from 'child_process'
import * as os from 'os'

function execute(cmd: string) {
  console.debug('Executing:', cmd)
  const ret = spawnSync(cmd, { stdio: 'inherit', shell: true })
  if (ret.status) {
    throw new Error(`Command failed: ${cmd}`)
  }
}

if (os.type() === 'Darwin') {

  // mac os
  execute('sed -i \'\' \'/import type { Timestamp as/d\' `find types -name \'*.ts\'`')
  execute('sed -i \'\' \'s/_google_protobuf_Timestamp__Output/Date/g\' `find types -name \'*.ts\'`')
  execute('sed -i \'\' \'s/_google_protobuf_Timestamp/Date/g\' `find types -name \'*.ts\'`')
} else {

  // linux
  execute('sed -i \'/import type { Timestamp as/d\' `find types -name \'*.ts\'`')
  execute('sed -i \'s/_google_protobuf_Timestamp__Output/Date/g\' `find types -name \'*.ts\'`')
  execute('sed -i \'s/_google_protobuf_Timestamp/Date/g\' `find types -name \'*.ts\'`')
}
