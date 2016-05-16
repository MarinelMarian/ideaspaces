
function IdeasController() {
}

function get(req, res, next) {
  res.status(200).json({ hello: 'idea ' + req.params.ideaid });
}

IdeasController.prototype = {
  get: get
};

var ideasController = new IdeasController();

module.exports = ideasController;
