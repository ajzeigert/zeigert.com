import {
    DOMParser,
} from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";

export default function (domString) {
    const doc = new DOMParser().parseFromString(domString, "text/html")
    doc.querySelectorAll('.nofeed').forEach(node => node.remove());
    return doc.querySelector('body').innerHTML;
}