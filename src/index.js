"use strict";

/**
 * Add a module/component by listing it here
 * * Create an issue if you need other files to be available
 * TODO: read everything in a modules folder automatically
 *
 * @var components.example   Example lists every option available for the module; copy this
 */
const components = {
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
      script: "js/example.js",
    },
  },
  todo: {
    path: "/src/template/module/todo/",
    file: "todo.htm",
    target: document.getElementsByTagName("main"),
    insertAt: "beforeend",
    optional: {
      img: "img/",
      css: "css/todo.css",
      script: "js/todo.js",
    },
  },
  gallery: {
    path: "/src/template/module/gallery/",
    file: "gallery.htm",
    target: document.getElementsByTagName("main"),
    insertAt: "beforeend",
    optional: {
      img: "img/",
      css: "css/gallery.css",
      script: "js/gallery.js",
    },
  },
  base: {
    navigation: {
      path: "/src/template/base/",
      file: "navigation.htm",
      target: document.getElementsByTagName("body"),
      insertAt: "beforeend",
    },
    main: {
      path: "/src/template/base/",
      file: "main.htm",
      target: document.getElementsByTagName("body"),
      insertAt: "beforeend",
    },
    footer: {
      path: "/src/template/base/",
      file: "footer.htm",
      target: document.getElementsByTagName("body"),
      insertAt: "beforeend",
    },
  },

  digital_pet: {
    path: "/src/template/module/digital_pet.htm",
    css: "/src/css/digital_pet.css",
    //script: "/src/js/form/example.js",
    target: document.getElementsByTagName("main"),
    insertAt: "beforeend",
  },



};

// Compile everything and run
// compileComponents();
compileComponents();

/**
 * Compiles the site
 * @function addBaseComponents() Constructs the base immediately and synchronously
 * @function addComponents() Constructs the additional modules and implements them asynchronously, sequentially
 */
async function compileComponents() {
  await addBaseComponents();
  await addComponents();
}

async function addBaseComponents() {
  await addHTML({
    path: components.base.navigation.path,
    file: components.base.navigation.file,
    target: components.base.navigation.target,
    insertAt: components.base.navigation.insertAt,
  });
  await addHTML({
    path: components.base.main.path,
    file: components.base.main.file,
    target: components.base.main.target,
    insertAt: components.base.main.insertAt,
  });
  await addHTML({
    path: components.base.footer.path,
    file: components.base.footer.file,
    target: components.base.footer.target,
    insertAt: components.base.footer.insertAt,
  });
}

/* Site structure functions */
async function addComponents() {
  for (const name of Object.keys(components)) {
    if (name === "example") continue;
    if (name === "base") continue;

    await addHTML({
      path: components[name].path,
      file: components[name].file,
      target: components[name].target,
      insertAt: components[name].insertAt,
      optional: {
        img: components[name].optional.img,
        css: components[name].optional.css,
        script: components[name].optional.script,
      },
    });
  }
}

/**
 * @insertAt set a target to attach components to
 */
async function addHTML({ path, file, target, insertAt, optional }) {
  const resp = await fetch(path + file);
  const html = await resp.text();

  if (
    (insertAt === "beforebegin") |
    (insertAt === "afterbegin") |
    (insertAt === "beforeend") |
    (insertAt === "afterend")
  ) {

    // Add css to head
    if (optional && optional.css && typeof optional.css !== "undefined" ) {
      const head = document.getElementsByTagName("head")[0];
      const element = document.createElement("link");
      element.setAttribute("rel", "stylesheet");
      element.setAttribute("href", path + optional.css);
      element.setAttribute("type", "text/css");
      element.setAttribute("media", "all");
      head.appendChild(element);
    }

    /**
     * Add script beneath module
     * TODO: place before body end
     * TODO2: send to script handler
     */
    if (optional && optional.script && typeof optional.script !== "undefined" ) {
      const element = document.createElement("script");
      element.setAttribute("src", path + optional.script);
      element.setAttribute("defer", true);
      document.body.appendChild(element);
    }
    // Add module to site
    target[0].insertAdjacentHTML(insertAt, html);
  }
}
