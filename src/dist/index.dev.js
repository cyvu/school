"use strict";
/**
 * Add a module/component by listing it here
 * * Create an issue if you need other files to be available
 * TODO: read everything in a modules folder automatically
 *
 * @var components.example   Example lists every option available for the module; copy this
 */

var components = {
  /**
   * This module is an example which should be copied and used for your own module
   *
   * @var path      Relative path to this modules root
   * @var file      Main file
   * @var target    Target the element you want this module attach to
   * @var insertAt  Where this module should reside, in relation to the target
   * @var optional.img    Img path (optional)
   * @var optional.css    Style file (optional)
   * @var optional.script Javascript file(s) (optional) (multiple not implemented atm)
   */
  example: {
    path: "/src/template/module/example/",
    file: "example.htm",
    target: document.getElementsByTagName("body"),
    insertAt: "afterbegin",
    optional: {
      img: "img/",
      css: "css/example.css",
      script: "js/example.js"
    }
  },
  todo: {
    path: "/src/template/module/todo/",
    file: "todo.htm",
    target: document.getElementsByTagName("main"),
    insertAt: "beforeend",
    optional: {
      img: "img/",
      css: "css/todo.css",
      script: "js/todo.js"
    }
  },
  gallery: {
    path: "/src/template/module/",
    file: "gallery.htm",
    target: document.getElementsByTagName("main"),
    insertAt: "beforeend",
    optional: {
      img: "img/",
      css: "css/gallery.css",
      script: "js/gallery.js"
    }
  },
  base: {
    navigation: {
      path: "/src/template/base/",
      file: "navigation.htm",
      target: document.getElementsByTagName("body"),
      insertAt: "beforeend"
    },
    main: {
      path: "/src/template/base/",
      file: "main.htm",
      target: document.getElementsByTagName("body"),
      insertAt: "beforeend"
    },
    footer: {
      path: "/src/template/base/",
      file: "footer.htm",
      target: document.getElementsByTagName("body"),
      insertAt: "beforeend"
    }
  }
}; // Compile everything and run
// compileComponents();

addBaseComponents();
/**
 * Compiles the site
 * @function addBaseComponents() Constructs the base immediately and synchronously
 * @function addComponents() Constructs the additional modules and implements them asynchronously, sequentially
 */

function compileComponents() {
  return regeneratorRuntime.async(function compileComponents$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          addBaseComponents();
          addComponents();

        case 2:
        case "end":
          return _context.stop();
      }
    }
  });
}

function addBaseComponents() {
  return regeneratorRuntime.async(function addBaseComponents$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(addHTML({
            path: components.base.navigation.path,
            file: components.base.navigation.file,
            target: components.base.navigation.target,
            insertAt: components.base.navigation.insertAt
          }));

        case 2:
          _context2.next = 4;
          return regeneratorRuntime.awrap(addHTML({
            path: components.base.main.path,
            file: components.base.main.file,
            target: components.base.main.target,
            insertAt: components.base.main.insertAt
          }));

        case 4:
          _context2.next = 6;
          return regeneratorRuntime.awrap(addHTML({
            path: components.base.footer.path,
            file: components.base.footer.file,
            target: components.base.footer.target,
            insertAt: components.base.footer.insertAt
          }));

        case 6:
        case "end":
          return _context2.stop();
      }
    }
  });
}
/* Site structure functions */


function addComponents() {
  var _i, _Object$keys, name;

  return regeneratorRuntime.async(function addComponents$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _i = 0, _Object$keys = Object.keys(components);

        case 1:
          if (!(_i < _Object$keys.length)) {
            _context3.next = 12;
            break;
          }

          name = _Object$keys[_i];

          if (!(name === "example")) {
            _context3.next = 5;
            break;
          }

          return _context3.abrupt("continue", 9);

        case 5:
          if (!(name === "base")) {
            _context3.next = 7;
            break;
          }

          return _context3.abrupt("continue", 9);

        case 7:
          _context3.next = 9;
          return regeneratorRuntime.awrap(addHTML({
            path: components[name].path,
            file: components[name].file,
            target: components[name].target,
            insertAt: components[name].insertAt,
            optional: {
              img: components[name].optional.img,
              css: components[name].optional.css,
              script: components[name].optional.script
            }
          }));

        case 9:
          _i++;
          _context3.next = 1;
          break;

        case 12:
        case "end":
          return _context3.stop();
      }
    }
  });
}
/**
 * @insertAt set a target to attach components to
 */


function addHTML(_ref) {
  var base,
      path,
      target,
      insertAt,
      _ref$optional,
      img,
      css,
      script,
      resp,
      html,
      head,
      element,
      a,
      _element,
      _args4 = arguments;

  return regeneratorRuntime.async(function addHTML$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          base = _ref.base, path = _ref.path, target = _ref.target, insertAt = _ref.insertAt, _ref$optional = _ref.optional, img = _ref$optional.img, css = _ref$optional.css, script = _ref$optional.script;
          console.log(_args4);
          _context4.next = 4;
          return regeneratorRuntime.awrap(fetch(base + path));

        case 4:
          resp = _context4.sent;
          _context4.next = 7;
          return regeneratorRuntime.awrap(resp.text());

        case 7:
          html = _context4.sent;

          if (insertAt === "beforebegin" | insertAt === "afterbegin" | insertAt === "beforeend" | insertAt === "afterend") {
            // Add module to site
            target[0].insertAdjacentHTML(insertAt, html); // Add css to head

            if (css && typeof css !== "undefined") {
              head = document.getElementsByTagName("head")[0];
              element = document.createElement("link");
              element.setAttribute("rel", "stylesheet");
              element.setAttribute("href", base + css);
              element.setAttribute("medial", "all");
              document.body.appendChild(element);
            }
            /**
             * Add script beneath module
             * TODO: place before body end
             * TODO2: send to script handler
             */


            if (script && typeof script !== "undefined") {
              a = document.getElementsByTagName("head")[0];
              _element = document.createElement("script");

              _element.setAttribute("src", base + script);

              _element.setAttribute("defer", true);

              document.body.appendChild(_element);
            }
          }

        case 9:
        case "end":
          return _context4.stop();
      }
    }
  });
}