/// <reference types="@fastly/js-compute" />

import { CacheOverride } from "fastly:cache-override";
import indexPage from "./index.html";

// The entry point for your application.
//
// Use this fetch event listener to define your main request handling logic. It
// could be used to route based on the request properties (such as method or
// path), send the request to a backend, make completely new requests, and/or
// generate synthetic responses.

addEventListener("fetch", (event) => event.respondWith(handleRequest(event)));

async function handleRequest(event: FetchEvent): Promise<Response> {
  const reqUrl = new URL(event.request.url)
  if (reqUrl.pathname === "/") {
    return new Response(indexPage, {
      status: 200,
      headers: new Headers({ "Content-Type": "text/html; charset=utf-8" }),
    });
  }

  const response = await fetch('/f81728fa-f120-4f14-8a50-759ef1c073d7', {
    method: 'GET',
    backend: `example`,
    cacheOverride: new CacheOverride("override", { ttl: 31557600 /* 1 year */ })
  });
  return new Response(JSON.stringify({ backendId: response.headers.get('x-request-id') }));
}