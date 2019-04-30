module.exports = {
  init(app){
    const staticRoutes = require("../routes/static");
    const postRoutes = require("../routes/posts");
    const topicRoutes = require("../routes/topics");
    const flairRoutes = require('../routes/flair');

    app.use(staticRoutes);
    app.use(postRoutes);
    app.use(topicRoutes);
    app.use(flairRoutes);
  }
}
