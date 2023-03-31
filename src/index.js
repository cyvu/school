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
  scripts: {
    path: "/src/",
    script: { data: "script/Data.js", users: "script/Users.js" },
  },
  example: {
    path: "/src/components/modules/example/",
    file: "index.htm",
    target: document.getElementsByTagName("main"),
    insertAt: "afterbegin",
    optional: {
      img: "img/",
      css: "css/style.css",
      script: "js/script.js",
    },
  },/*
  divider1: {
    path: "/src/components/modules/divider/",
    file: "index.htm",
    target: document.getElementsByTagName("main"),
    insertAt: "beforeend",
    optional: {},
  },*/
  admin: {
    path: "/src/components/modules/admin-panel/",
    file: "index.htm",
    target: document.getElementsByTagName("main"),
    insertAt: "beforeend",
    optional: {
      img: "img/",
      css: "css/style.css",
      script: "js/script.js",
    },
  },

  /*
  ! Insert modules below this line
  */

  divider1: {
    path: "/src/components/modules/divider/",
    file: "index.htm",
    target: document.getElementsByTagName("main"),
    insertAt: "beforeend",
    optional: {},
  },
  admin: {
    path: "/src/components/modules/admin-panel/",
    file: "index.htm",
    target: document.getElementsByTagName("main"),
    insertAt: "beforeend",
    optional: {
      img: "img/",
      css: "css/style.css",
      script: "js/script.js",
    },
  },
  divider2: {
    path: "/src/components/modules/divider/",
    file: "index.htm",
    target: document.getElementsByTagName("main"),
    insertAt: "beforeend",
    optional: {},
  },
  todo: {
    path: "/src/components/modules/todo/",
    file: "index.htm",
    target: document.getElementsByTagName("main"),
    insertAt: "beforeend",
    optional: {
      img: "img/",
      css: "css/style.css",
      script: "js/script.js",
    },
  },
  gallery: {
    path: "/src/components/modules/gallery/",
    file: "index.htm",
    target: document.getElementsByTagName("main"),
    insertAt: "beforeend",
    optional: {
      img: "img/",
      css: "css/style.css",
      script: "js/script.js",
    },
  },
  digital_pet: {
    path: "/src/components/modules/digital-pet/",
    file: "digital_pet.htm",
    target: document.getElementsByTagName("main"),
    insertAt: "beforeend",
    optional: {
      img: "img/",
      css: "css/digital_pet.css",
    },
  },

  /*
  ! Insert modules above this line
  */

  /* Base modules - do not touch */
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
  await addBaseModules(); // Takes priority over the other modules
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
    if (name === "scripts") {
      for (const _script of Object.keys(modules.scripts.script)) {
        await addScript({
          path: modules[name].path,
          script: modules[name].script[_script],
        });
      }
      continue;
    }

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

// Add additional scripts
async function addScript({ path, script }) {
  const element = document.createElement("script");
  element.setAttribute("src", path + script);
  element.setAttribute("defer", true);
  document.body.appendChild(element);
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
