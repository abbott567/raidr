function create(__helpers) {
  var loadTemplate = __helpers.l,
      default_template = loadTemplate(require.resolve("../../common/layouts/default.marko")),
      str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne,
      escapeXml = __helpers.x,
      __loadTag = __helpers.t,
      layout_use_tag = __loadTag(require("marko/taglibs/layout/use-tag")),
      layout_put_tag = __loadTag(require("marko/taglibs/layout/put-tag"));

  return function render(data, out) {
    layout_use_tag({
        __template: default_template,
        getContent: function getContent(__layoutHelper) {
          layout_put_tag({
              into: "content",
              layout: __layoutHelper,
              renderBody: function renderBody(out) {
                out.w("<h1>Enter Gamertag</h1>");
              }
            }, out);
        }
      }, out);
  };
}

(module.exports = require("marko").c(__filename)).c(create);
