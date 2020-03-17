var query = require('../common/mysqlPool')

var Products = {
	getList(id, callback) {
		if (id) {
			if (id.length > 1) {   //取多个
				sql = `SELECT * from vue_goods_list where id in (${id})`
			} else {   //取1个
				sql = `SELECT * from vue_goods_list where id=${id}`
			}
		} else {   //取全部
			sql = 'SELECT * from vue_goods_list'
		}
		query(sql, function (qerr, vals, fields) {
			if (vals) {
				let valsString = JSON.stringify(vals);
				vals = JSON.parse(valsString);
				vals.forEach(element => {
					element.img_url = "http://127.0.0.1:3000/public/" + element.img_url;
				});
				console.log(vals)
			}
			callback(qerr, vals, fields)
		})
	}
}

module.exports = Products