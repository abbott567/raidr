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
                out.w("<h1>Enter Gamertag</h1><form method=\"post\"><label for=\"gamertag\">Gamertag</label><input type=\"text\" name=\"gamertag\"><fieldset><legend>Choose a platform</legend><label for=\"playstation\">Playstation</label><input type=\"radio\" id=\"playstation\" name=\"platform\" value=\"2\"><label for=\"xbox\">Xbox</label><input type=\"radio\" id=\"xbox\" name=\"platform\" value=\"1\"></fieldset><button type=\"submit\">Submit</button></form>");
              }
            }, out);
        }
      }, out);
  };
}

(module.exports = require("marko").c(__filename)).c(create);
