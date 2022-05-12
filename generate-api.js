/* eslint-disable */
const { exec } = require('child_process')
const os = require('os')

function puts(error, stdout, stderr) {
    if (error) {
        console.log(error)
    }
    if (stdout) {
        console.log(stdout)
    }
    if (stderr) {
        console.log(stderr)
    }
}

if (os.type() === 'Windows_NT') {
    exec(
        'rmdir src/services/api && java -jar swagger-codegen-cli.jar generate -i http://documentacion.qa-dixa.puller.mx/openapi.yaml -l typescript-axios -o src/services/api && cp src/services/cliente/base.ts src/services/api/base.ts',
        puts,
    )
} else {
    exec(
        'rm -R src/services/api && java -jar swagger-codegen-cli.jar generate -i http://documentacion.qa-dixa.puller.mx/ -l typescript-axios -o src/services/api && cp src/services/cliente/base.ts src/services/api/base.ts',
        puts,
    )
}
