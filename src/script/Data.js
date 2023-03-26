"use strict";
class Data {
  // #statusCode;
  // #message;
  // #error;
  // #cors;
  // #content_type;

  constructor(path) {
    console.log("Data class loaded");
    this.path = path
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
        console.table("Response received");
        return await response.json();
      })
      .then(async (data) => {
        console.table("Data received");
        return await data;
      })
      .catch(async (error) => {
        console.error("There was a problem with the fetch request:", error);
        return await error
      });
  }

  /**
   * Post data using fetch
   * @path path to data
   */
  post(path) {}

  /**
   * Update data with a post request using fetch
   */
  put(path) {}

  /**
   * Delete data with a post request using fetch
   */
  delete(path) {}
}
