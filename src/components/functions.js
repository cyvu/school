"use strict"

async function addScripts({ scripts }) {}

// ---
async function constructScriptElement({
  path,
  file,
  async: { type = "defer", value = true },
}) {
  const element = document.createElement("script")
  element.setAttribute("src", path + file)
  element.setAttribute(type, value)
  document.body.appendChild(element)
}

/**
 * @insertAt set a target to attach modules to
 */
async function constructHtmlElement({ path, file, target, at, optional }) {
  const resp = await fetch(path + file)
  const html = await resp.text()

  if (
    (at === "beforebegin") |
    (at === "afterbegin") |
    (at === "beforeend") |
    (at === "afterend")
  )
    throw new Error(
      "Invalid insert location. User either of the following: beforebegin, afterbegin, beforeend, afterend"
    )

  // Add css to head
  if (optional && optional.css && typeof optional.css !== undefined) {
    const head = document.getElementsByTagName("head")[0]
    const element = document.createElement("link")
    element.setAttribute("rel", "stylesheet")
    element.setAttribute("href", path + optional.css)
    element.setAttribute("type", "text/css")
    element.setAttribute("media", "all")
    head.appendChild(element)
  }

  /**
   * Add script beneath module
   * TODO: place before body end
   * TODO2: send to script handler
   */
  if (optional && optional.script && typeof optional.script !== undefined) {
    constructScriptElement(path, file, )
  }

  // Add module to site
  target[0].insertAdjacentHTML(at, html)
}

/* Site structure functions */
async function addModules() {
  for (const name of Object.keys(modules)) {
    if (name === "example") continue
    if (name === "base") continue
    if (name === "scripts") {
      for (const _script of Object.keys(modules.scripts.script)) {
        await addScript({
          path: modules[name].path,
          script: modules[name].script[_script],
        })
      }
      continue
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
    })
  }
}
