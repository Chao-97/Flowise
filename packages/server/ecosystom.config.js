module.exports = {
    apps: [
        {
            name: 'Tensify',
            interpreter: './node_modules/.bin/ts-node',
            interpreter_args: '-r tsconfig-paths/register',
            instance_var: 'INSTANCE_ID',
            instances: 4,
            exec_mode: 'cluster',
            cwd: './',
            script: '/Users/lichaowei/Jobs/vms/Flowise/packages/server/start.ts'
        }
    ]
}
