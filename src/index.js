"use strict";

/**
 * Add a module/component by listing it here
 * * Create an issue if you need other files to be available
 * TODO: read everything in a modules folder automatically
 *
 * @var modules.example   Example lists every option available for the module; copy this
 */
const modules = {
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
    path: "/src/components/modules/example/",
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
    path: "/src/components/modules/todo/",
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
    path: "/src/components/modules/gallery/",
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
      path: "/src/components/base/",
      file: "navigation.htm",
      target: document.getElementsByTagName("body"),
      insertAt: "beforeend",
    },
    main: {
      path: "/src/components/base/",
      file: "main.htm",
      target: document.getElementsByTagName("body"),
      insertAt: "beforeend",
    },
    footer: {
      path: "/src/components/base/",
      file: "footer.htm",
      target: document.getElementsByTagName("body"),
      insertAt: "beforeend",
    },
  },
};

// Compile everything
compileModules();

/**
 * Compiles the site
 * @function addBaseModules() Constructs the base immediately and synchronously
 * @function addModules() Constructs the additional modules and implements them asynchronously, sequentially
 */
async function compileModules() {
  await addBaseModules();  // Takes priority over the other modules
  await addModules();
}

async function addBaseModules() {
  await addHTML({
    path: modules.base.navigation.path,
    file: modules.base.navigation.file,
    target: modules.base.navigation.target,
    insertAt: modules.base.navigation.insertAt,
  });
  await addHTML({
    path: modules.base.main.path,
    file: modules.base.main.file,
    target: modules.base.main.target,
    insertAt: modules.base.main.insertAt,
  });
  await addHTML({
    path: modules.base.footer.path,
    file: modules.base.footer.file,
    target: modules.base.footer.target,
    insertAt: modules.base.footer.insertAt,
  });
}

/* Site structure functions */
async function addModules() {
  for (const name of Object.keys(modules)) {
    if (name === "example") continue;
    if (name === "base") continue;

    await addHTML({
      path: modules[name].path,
      file: modules[name].file,
      target: modules[name].target,
      insertAt: modules[name].insertAt,
      optional: {
        img: modules[name].optional.img,
        css: modules[name].optional.css,
        script: modules[name].optional.script,
      },
    });
  }
}

/**
 * @insertAt set a target to attach modules to
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
    if (optional && optional.css && typeof optional.css !== undefined) {
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
    if (optional && optional.script && typeof optional.script !== undefined) {
      const element = document.createElement("script");
      element.setAttribute("src", path + optional.script);
      element.setAttribute("defer", true);
      document.body.appendChild(element);
    }
    // Add module to site
    target[0].insertAdjacentHTML(insertAt, html);
  }
}