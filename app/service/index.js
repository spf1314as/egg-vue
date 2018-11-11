
const Service = require('egg').Service;

class ActService extends Service {

    async create(obj){

        // 多个数据源时 this.app.mysql.get("source").query / 单个时直接使用 this.app.mysql.query
        // 判断说那个那个数据库
        let source = obj.source ===1 ? 'pc': 'mac';
        // const DATASOURCE = this.app.mysql.get(source);
        const DATASOURCE = this.app.mysql;
        const result = await DATASOURCE.query("CREATE TABLE IF not EXISTS actInfo (id INT NOT NULL AUTO_INCREMENT,act_name VARCHAR(100) NOT NULL,deadTime BIGINT(13) NOT NULL,createTime BIGINT(13) not null" +
            ", PRIMARY KEY (id)) ENGINE=InnoDB DEFAULT CHARSET=utf8");

        if(result.affectedRows === 0 && result.insertId === 0){
            let addColumns = await DATASOURCE.query("select count(*) as has from information_schema.columns where table_name='actInfo' and column_name='createTime'");
            console.log(addColumns)
            console.log( typeof addColumns[0].has)
            if(addColumns[0].has === 0){
              let addResult =  await DATASOURCE.query("ALTER TABLE actInfo ADD createTime BIGINT(13)");
            }
            let insertResult = await this.insert(obj);
            return insertResult
        }
    }

    async insert ({actName,deadTime,source}){
        console.log("--------insert into------------")
        let source = obj.source ===1 ? 'pc': 'mac';
        // const DATASOURCE = this.app.mysql.get(source);
        const DATASOURCE = this.app.mysql;
        const result = await DATASOURCE.insert('actinfo',{'act_name':actName,deadtime:deadTime,createTime:DATASOURCE.literals.now});
        return result
    }

    //查找


    async find (id){
        const {ctx} = this;
        let source = obj.source ===1 ? 'pc': 'mac';
        // const DATASOURCE = this.app.mysql.get(source);
        const DATASOURCE = this.app.mysql;
        const result = await DATASOURCE.get('actinfo',{id});
        console.log("________find data________")
        return result
    }


}

module.exports = ActService;