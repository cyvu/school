"use strict";

/* Component: name: source */
const components = {
  example: {
    // Create path file (if needed)
    path: "/src/template/module/admin.htm",
    // Create css file (if needed)
    css: "/src/css/example.css",
    // Create script file (if needed)
    script: "/src/js/form/example.js",
    // Target the element you want to inject the code into
    target: document.getElementsByTagName("main"),
    // Position to inject at ("beginstart", "beginend", "afterstart", "afterend")
    insertAt: "afterbegin",
  },
  todo: {
    path: "/src/template/module/todo.htm",
    script: "/src/js/form/todo-list.js",
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

/* Add components */
async function compileComponents() {
  // Build the base first
  await addComponent({
    path: components.base.navigation.path,
    target: components.base.navigation.target,
    insertAt: components.base.navigation.insertAt,
  });
  await addComponent({
    path: components.base.main.path,
    target: components.base.main.target,
    insertAt: components.base.main.insertAt,
  });
  await addComponent({
    path: components.base.footer.path,
    target: components.base.footer.target,
    insertAt: components.base.footer.insertAt,
  });

  // Add the rest
  for (const name of Object.keys(components)) {
    if (name === "base") continue;
    await addComponent({
      path: components[name].path,
      script: components[name].script,
      target: components[name].target,
      insertAt: components[name].insertAt,
    });
  }
}

/* Site structure functions */
async function addComponent({ path, script, target, insertAt }) {
  await addHTML({ path, script, target, insertAt });
}

/**
 * addHTML
 * @attach set a target to attach components to
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
