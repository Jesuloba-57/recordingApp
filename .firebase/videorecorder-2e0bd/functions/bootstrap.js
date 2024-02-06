const app = import(`./dist/recorder-app/server/server.mjs`).then(server => server.app());
exports.handle = (req,res) => app.then(it => it(req,res));
