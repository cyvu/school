"use strict";

/**
 * ! DO NOT EDIT 
 * */ 

/**
 * Compile base components
 */
export const base = {
  navigation: {
    path: "base/",
    file: "navigation.htm",
    target: document.getElementsByTagName("body"),
    pos: "beforeend",
  },
  main: {
    path: "base/",
    file: "main.htm",
    target: document.getElementsByTagName("body"),
    pos: "beforeend",
  },
  footer: {
    path: "base/",
    file: "footer.htm",
    target: document.getElementsByTagName("body"),
    pos: "beforeend",
  },

  scripts: {
    path: "base/",
    script: { data: "js/Data.js", users: "js/Users.js" },
  },
};

console.log(base)

/**
 * Compiles the site
 * @function addBase() Constructs the base immediately and synchronously
 * @function addScripts()
 */
async function compileBase() {
  await addBaseModules(); // Takes priority over the other modules
  await addScripts();
}

async function addBase() {
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
