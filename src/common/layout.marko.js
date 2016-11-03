function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne,
      escapeXml = __helpers.x,
      __loadTag = __helpers.t,
      layout_placeholder_tag = __loadTag(require("marko/taglibs/layout/placeholder-tag"));

  return function render(data, out) {
    out.w("<!DOCTYPE html><html lang=\"en\"><head><meta charset=\"utf-8\"><title></title></head><body>");

    layout_placeholder_tag({
        name: "content",
        content: data.layoutContent
      }, out);

    out.w("</body></html>");
  };
}

(module.exports = require("marko").c(__filename)).c(create);
