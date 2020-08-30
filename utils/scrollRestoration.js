// This utility add a scroll restoration functionnality by saving the scroll position in localstorage at each page change.
// Usage : call useScrollRestoration(router); in  _app.js

import { useEffect } from "react";
import Router from "next/router";

// Save the current scroll position in session storage
function saveScrollPos(url) {
    const scrollPos = { x: window.scrollX, y: window.scrollY };
    sessionStorage.setItem(url, JSON.stringify(scrollPos));
}

// Restore the scoll position from session storage if it exists
function restoreScrollPos(url) {
    const scrollPos = JSON.parse(sessionStorage.getItem(url));
    if (scrollPos) {
        window.scrollTo(scrollPos.x, scrollPos.y);
    }
}

export default function useScrollRestoration(router) {
    useEffect(() => {
        if ("scrollRestoration" in window.history) {
            window.history.scrollRestoration = "manual";
            restoreScrollPos(router.asPath);

            const onBeforeUnload = event => {
                saveScrollPos(router.asPath);
                delete event["returnValue"];
            };

            const onRouteChangeStart = () => {
                saveScrollPos(router.asPath);
            };

            const onRouteChangeComplete = url => {
                restoreScrollPos(url);
            };

            // Adding event listeners
            window.addEventListener("beforeunload", onBeforeUnload);
            Router.events.on("routeChangeStart", onRouteChangeStart);
            Router.events.on("routeChangeComplete", onRouteChangeComplete);

            // Removing event listeners
            return () => {
                window.removeEventListener("beforeunload", onBeforeUnload);
                Router.events.off("routeChangeStart", onRouteChangeStart);
                Router.events.off("routeChangeComplete", onRouteChangeComplete);
            };
        }
    }, [router]);
}