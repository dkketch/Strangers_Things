import React, { useState, useEffect } from "react";

const { REACT_APP_BASE_URL } =
  "https://strangers-things.herokuapp.com/api/2110-VPI-WEB-PT/";

const CallApi = async ({ url, method, token, body }) => {
  console.log({ url, method, token, body });
  try {
    const options = {
      method: method ? method.toUpperCase() : "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };

    if (token) {
      options.headers["Authorization"] = `Bearer ${token}`;
    }
    // console.log('request url: ', REACT_APP_BASE_URL + url)
    // console.log('options: ', options);
    const response = await fetch(REACT_APP_BASE_URL + url, options);
    const data = await response.json();
    // console.log('data: ', data);
    // if (data.error) throw data.error;
    return data;
  } catch (error) {
    console.error("ERROR: ", error);
  }
};

export default CallApi;
