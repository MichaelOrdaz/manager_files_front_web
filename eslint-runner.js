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
        'npx eslint --ext .js,.vue --ignore-path .eslintignore . --fix --color',
        puts,
    )
} else {
    exec(
        './node_modules/.bin/eslint --ext .js,.vue --ignore-path .eslintignore . --fix --color',
        puts,
    )
}
