
module.exports = app => {
  app.get('/api/article/list', app.controller.app.list);
  app.get('/api/article/:id', app.controller.app.detail);
  app.get('/api/act/create', app.controller.app.create);
  app.get('/api/act/findInfo', app.controller.app.find);
  app.get('/*', app.controller.app.index);

};
