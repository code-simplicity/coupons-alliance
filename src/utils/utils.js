export default {
	// 数值格式化，保留几位小数
	twoNumber(num, i) {
		if (!num) {
			return;
		}
		let res = Number(num.toFixed(i))
		return res;

	}
}
