/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

"use strict";

const binarySearchBounds = require("../util/binarySearchBounds");

/**
 * 并发系数计算
 * 用于计算factory、build、integration、storing、restoring时并发处理的模块数
 */
class ParallelismFactorCalculator {
	constructor() {
		this._rangePoints = [];
		this._rangeCallbacks = [];
	}

	range(start, end, callback) {
		if (start === end) return callback(1);
		this._rangePoints.push(start);
		this._rangePoints.push(end);
		this._rangeCallbacks.push(callback);
	}

	/**
	 * 计算并发系数
	 * @returns {*}
	 */	
	calculate() {
		// 将_rangePoints排序，所有排序时间段
		const segments = Array.from(new Set(this._rangePoints)).sort((a, b) =>
			a < b ? -1 : 1
		);
		// 所有排序时间段的并发数
		const parallelism = segments.map(() => 0);
		// 所有开始时间在segments中的索引
		const rangeStartIndices = [];

		// 遍历_rangePoints原始数据
		for (let i = 0; i < this._rangePoints.length; i += 2) {
			const start = this._rangePoints[i];
			const end = this._rangePoints[i + 1];
			// 二分查找：找到segments中对应的start 的索引
			let idx = binarySearchBounds.eq(segments, start);
			rangeStartIndices.push(idx);

			// 如果下个时间也小于当前结束时间
			do {
				// 增加并发量
				parallelism[idx]++;
				idx++;
			} while (segments[idx] < end);
		}

		// 以上代码计算出了：segments(所有排序时间段)、parallelism(时间段的并发量)
		// _rangePoints(所有原始时间)、rangeStartIndices(所有开始时间在segments中的索引)
		// _rangeCallbacks(所有开始时间对应的回调)

		// 遍历_rangeCallbacks 所有callback
		for (let i = 0; i < this._rangeCallbacks.length; i++) {
			const start = this._rangePoints[i * 2];
			const end = this._rangePoints[i * 2 + 1];
			let idx = rangeStartIndices[i];
			// 当前build开始时间 => 结束时间所有并发操作的总耗时
			let sum = 0;
			// 当前开始时间 => 并发中最后一时间段 总间隔
			let totalDuration = 0;
			// 当前开始时间
			let current = start;
			do {
				// 当前时间的并发量
				const p = parallelism[idx];
				idx++;
				// 当前start => end时间段内，segments内各个前后时间段的间隔
				// 当前时间 => 下一时间的 间隔
				const duration = segments[idx] - current;
				totalDuration += duration;
				current = segments[idx];
				sum += p * duration;
			} while (current < end);
			// 调用回调，设置build/factory等阶段的并发系数 (即：sum / totalDuration，每ms的平均并发量 => 该时间段内的平均并发量)
			this._rangeCallbacks[i](sum / totalDuration);
		}
	}
}

module.exports = ParallelismFactorCalculator;
