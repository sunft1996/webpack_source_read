/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

"use strict";

const EntryDependency = require("./dependencies/EntryDependency");

/** @typedef {import("./Compiler")} Compiler */
/** @typedef {import("./Entrypoint").EntryOptions} EntryOptions */

class EntryPlugin {
	/**
	 * An entry plugin which will handle
	 * creation of the EntryDependency
	 *
	 * @param {string} context context path
	 * @param {string} entry entry path
	 * @param {EntryOptions | string=} options entry options (passing a string is deprecated)
	 */
	constructor(context, entry, options) {
		this.context = context;
		this.entry = entry; // entry path
		this.options = options || ""; // entry options
	}

	/**
	 * Apply the plugin，新建compiler时执行
	 * @param {Compiler} compiler the compiler instance
	 * @returns {void}
	 */
	apply(compiler) {
		// EntryPlugin订阅 compilation hook
		compiler.hooks.compilation.tap(
			"EntryPlugin",
			(compilation, { normalModuleFactory }) => {
				// 设置EntryDependency对应的factory
				compilation.dependencyFactories.set(
					EntryDependency,
					normalModuleFactory
				);
			}
		);
		// 配置文件中的入口文件路径、入口配置、上下文
		const { entry, options, context } = this;
		// entry模块对应的dependencys对象
		const dep = EntryPlugin.createDependency(entry, options);
		/*
		 * EntryPlugin订阅 make hook
		 * Step_6: compilation调用addEntry方法
		 */
		compiler.hooks.make.tapAsync("EntryPlugin", (compilation, callback) => {
			compilation.addEntry(context, dep, options, err => {
				callback(err);
			});
		});
	}

	/**
	 * @param {string} entry entry request
	 * @param {EntryOptions | string} options entry options (passing string is deprecated)
	 * @returns {EntryDependency} the dependency
	 */
	static createDependency(entry, options) {
		const dep = new EntryDependency(entry);
		// TODO webpack 6 remove string option
		dep.loc = { name: typeof options === "object" ? options.name : options };
		return dep;
	}
}

module.exports = EntryPlugin;
