#!/usr/bin/env node

/*
 * Step_1: 判断webpack包是否存在，下载 or 运行webpack
 */

'use strict';

const Module = require('module');

const originalModuleCompile = Module.prototype._compile;

require('v8-compile-cache');

const importLocal = require('import-local');
const runCLI = require('../lib/bootstrap');
const utils = require('../lib/utils');

if (!process.env.WEBPACK_CLI_SKIP_IMPORT_LOCAL) {
    // Prefer the local installation of `webpack-cli`
    if (importLocal(__filename)) {
        return;
    }
}

process.title = 'webpack';

// 判断webpack包是否存在
if (utils.packageExists('webpack')) {
    // 运行webpack-cli.js中的run()
    runCLI(process.argv, originalModuleCompile);
} else {
    const { promptInstallation, logger, colors } = utils;
    // 询问是否下载webpack包
    promptInstallation('webpack', () => {
        utils.logger.error(`It looks like ${colors.bold('webpack')} is not installed.`);
    })
        .then(() => {
            logger.success(`${colors.bold('webpack')} was installed successfully.`);

            runCLI(process.argv, originalModuleCompile);
        })
        .catch(() => {
            logger.error(`Action Interrupted, Please try once again or install ${colors.bold('webpack')} manually.`);

            process.exit(2);
        });
}
