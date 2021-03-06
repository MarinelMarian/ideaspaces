
describe('IdeasController Tests', function() {

  var ideasController;
  var req;
  var res;
  var next;

  beforeEach(function() {
    req = { params: {} };
    res = { status: function(code) { return { json: function(obj) {} }} };

    sinon.spy(res, "status");

    ideasController = require('../../../../../app/controllers/v1/ideas/ideas-controller');
  });

  describe('get()', function() {

    it('should be a function', function(done) {
      expect(ideasController.get).to.be.a('function');
      done();
    });

    it('should call res.status() one time', function(done) {
      ideasController.get(req, res, next);

      expect(res.status.callCount).to.equal(1);
      done();
    });

    it('should call res.status() with 200', function(done) {
        ideasController.get(req, res, next);

      expect(res.status.calledWith(200)).to.equal(true);
      done();
    });

  });
});
