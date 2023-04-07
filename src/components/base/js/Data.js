"use strict";
class Data {
  // #statusCode;
  // #message;
  // #error;
  // #cors;
  // #content_type;

  constructor(path) {
    this.path = path;
  }

  /**
   * Get data using fetch
   */
  async get() {
    return await fetch(this.path, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      credentials: "same-origin", // include, *same-origin, omit
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(
            `Network response was not ok: ${response.status} ${response.statusText}`
          );
        }
        return await response.json();
      })
      .then(async (data) => {
        return await data;
      })
      .catch(async (error) => {
        return await error;
      });
  }

  /**
   * Post data using fetch
   * @path path to data
   */
  async post(args) {
    return await fetch(this.path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      credentials: "same-origin",
      body: JSON.stringify({
        firstname: args.firstname,
        lastname: args.lastname,
        email: args.email,
      }),
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(
            `Network response was not ok: ${response.status} ${response.statusText}`
          );
        }
        return await response.json();
      })
      .then(async (data) => {
        return await data;
      })
      .catch(async (error) => {
        return await error;
      });
  }

  /**
   * Update data with a post request using fetch
   */
  async put(args) {
    return await fetch(this.path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      credentials: "same-origin",
      body: JSON.stringify({
        id: args.id,
        firstname: args.firstname,
        lastname: args.lastname,
        email: args.email,
      }),
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(
            `Network response was not ok: ${response.status} ${response.statusText}`
          );
        }
        return await response.json();
      })
      .then(async (data) => {
        return await data;
      })
      .catch(async (error) => {
        return await error;
      });
  }

  /**
   * Delete data with a post request using fetch
   */
  delete(path) {}
}
