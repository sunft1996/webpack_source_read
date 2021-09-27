/*
 * Step_2: 运行webpack-cli
 */
const WebpackCLI = require('./webpack-cli');
const utils = require('./utils');

/**
 * 传入args，运行webpack-cli
 */
const runCLI = async (args, originalModuleCompile) => {
    try {
        // Create a new instance of the CLI object
        // 新建webpack-cli实例
        const cli = new WebpackCLI();

        cli._originalModuleCompile = originalModuleCompile;
        // 传入args参数，运行webpack-cli.run()
        await cli.run(args);
    } catch (error) {
        utils.logger.error(error);
        process.exit(2);
    }
};

module.exports = runCLI;
