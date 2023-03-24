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
   * @var base      Relative path to this modules root
   * @var path      Main file
   * @var img       Img path (optional)
   * @var css       Style file (optional)
   * @var script    Javascript file(s) (optional) (multiple not implemented atm)
   * @var target    Target the element you want this module attach to
   * @var insertAt  Where this module should reside, in relation to the target
   */
  example: {
    base: "/src/template/module/example/",
    path: "example.htm",
    img: "img/",
    css: "css/example.css",
    script: "js/example.js",
    target: document.getElementsByTagName("main"),
    insertAt: "afterbegin",
  },
  todo: {
    base: "/src/template/module/todo/",
    path: "todo.htm",
    css: "css/todo-list.js",
    script: "js/todo-list.js",
    target: document.getElementsByTagName("main"),
    insertAt: "beforeend",
  },
  gallery: {
    path: "/src/template/module/gallery.htm",
    script: "/src/js/gallery.js",
    target: document.getElementsByTagName("main"),
    insertAt: "beforeend",
  },
  base: {
    navigation: {
      path: "/src/template/base/navigation.htm",
      target: document.getElementsByTagName("body"),
      insertAt: "beforeend",
    },
    main: {
      path: "/src/template/base/main.htm",
      target: document.getElementsByTagName("body"),
      insertAt: "beforeend",
    },
    footer: {
      path: "/src/template/base/footer.htm",
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
compileComponents();

/**
 * Compiles the site
 * @function addBaseComponents() Constructs the base immediately and synchronously
 * @function addComponents() Constructs the additional modules and implements them asynchronously, sequentially
 */
async function compileComponents() {
  addBaseComponents()
  addComponents()
}

async function addBaseComponents() {
  await addHTML({
    path: components.base.navigation.path,
    target: components.base.navigation.target,
    insertAt: components.base.navigation.insertAt,
  });
  await addHTML({
    path: components.base.main.path,
    target: components.base.main.target,
    insertAt: components.base.main.insertAt,
  });
  await addHTML({
    path: components.base.footer.path,
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
      script: components[name].script,
      target: components[name].target,
      insertAt: components[name].insertAt,
    });
  }
}

/**
 * @insertAt set a target to attach components to
 */
async function addHTML({ path, script, target, insertAt }) {
  const resp = await fetch(path);
  const html = await resp.text();
  if (
    (insertAt === "beforebegin") |
    (insertAt === "afterbegin") |
    (insertAt === "beforeend") |
    (insertAt === "afterend")
  ) {
    target[0].insertAdjacentHTML(insertAt, html);
    if (script && typeof script !== "undefined") {
      // document.createElement("script").setAttribute("src", script)
      const element = document.createElement("script")
      element.setAttribute("src", script)
      element.setAttribute("defer", true)
      document.body.appendChild(element);
    }
  }
}
