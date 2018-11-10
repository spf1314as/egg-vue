const Model = require('../mocks/article/list');
const Controller = require('egg').Controller;
class AppController extends Controller {
  async index() {
      let webps = false;
      (this.ctx.get("accept").indexOf('image/webp') >-1) && (webps = true)
    await this.ctx.render('app.js', { url: this.ctx.url,webps});
  }

  async list() {
    const pageIndex = this.ctx.query.pageIndex;
    const pageSize = this.ctx.query.pageSize;
    this.ctx.body = Model.getPage(pageIndex, pageSize);
  }

  async detail() {
    const id = Number(this.ctx.params.id);
    this.ctx.body = Model.getDetail(id);
  }

  // 创建表
  async create(){
    console.log("########################")
      console.log( this.ctx.url)
    let result = await this.service.index.create(this.ctx.query);
     console.log(result)
      console.log("###########################")
    if(result){
      this.ctx.body = {code:0,msg: 'create success'}
    }else{
      this.ctx.body = {code:0,msg: 'create fail'}
    }
  }

    // 获取活动信息
    async find(){
        if(this.ctx.query.id){
          let  result = await this.service.index.find(this.ctx.query.id);
          console.log("####################")
          console.log(result)
           console.log("%%%%%%%%%%%%%%%%%%%")
          this.ctx.body = {
            code: 0,
            data:{
              actName:result.act_name,
              deadTime: result.deadTime
            },
            msg: 'success'
          }
        }else{
            this.ctx.body = {code:-1,msg: 'params id is needed'}
        }

    }




}

module.exports = AppController;