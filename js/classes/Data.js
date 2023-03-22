"use strict";
class Data {
  // #statusCode;
  // #message;
  // #error;
  // #cors;
  // #content_type;

  constructor() {
    console.log("Data")
  }

  /**
   * Get data using fetch
   */
  async get(path) {
    await fetch(path, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      mode: "no-cors",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Network response was not ok: ${response.status} ${response.statusText}`
          );
        }
        return response.json();
      })
      .then((data) => {
        console.log("Data received:", data);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch request:", error);
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
