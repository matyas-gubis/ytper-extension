import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/content/App.tsx.js");import __vite__cjsImport0_react_jsxDevRuntime from "/vendor/.vite-deps-react_jsx-dev-runtime.js__v--1567f77b.js"; const Fragment = __vite__cjsImport0_react_jsxDevRuntime["Fragment"]; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import RefreshRuntime from "/vendor/react-refresh.js";
const inWebWorker = typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope;
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot && !inWebWorker) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "C:/_Projects/ytper-extension/src/content/App.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _s = $RefreshSig$();
import __vite__cjsImport3_react from "/vendor/.vite-deps-react.js__v--1567f77b.js"; const useState = __vite__cjsImport3_react["useState"];
import reactLogo from "/assets/react.svg__import.js";
import viteLogo from "/vendor/fs-C:-_Projects-ytper-extension-public-vite.svg__import.js";
function App() {
  _s();
  const [count, setCount] = useState(0);
  return /* @__PURE__ */ jsxDEV(Fragment, { children: [
    /* @__PURE__ */ jsxDEV("div", { children: [
      /* @__PURE__ */ jsxDEV("a", { href: "https://vitejs.dev", target: "_blank", children: /* @__PURE__ */ jsxDEV("img", { src: chrome.runtime.getURL(viteLogo), className: "logo", alt: "Vite logo" }, void 0, false, {
        fileName: "C:/_Projects/ytper-extension/src/content/App.tsx",
        lineNumber: 12,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "C:/_Projects/ytper-extension/src/content/App.tsx",
        lineNumber: 11,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("a", { href: "https://react.dev", target: "_blank", children: /* @__PURE__ */ jsxDEV("img", { src: chrome.runtime.getURL(reactLogo), className: "logo react", alt: "React logo" }, void 0, false, {
        fileName: "C:/_Projects/ytper-extension/src/content/App.tsx",
        lineNumber: 15,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "C:/_Projects/ytper-extension/src/content/App.tsx",
        lineNumber: 14,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "C:/_Projects/ytper-extension/src/content/App.tsx",
      lineNumber: 10,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("h1", { children: "Vite + React" }, void 0, false, {
      fileName: "C:/_Projects/ytper-extension/src/content/App.tsx",
      lineNumber: 18,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "card", children: [
      /* @__PURE__ */ jsxDEV("button", { onClick: () => setCount((count2) => count2 + 1), children: [
        "count is ",
        count
      ] }, void 0, true, {
        fileName: "C:/_Projects/ytper-extension/src/content/App.tsx",
        lineNumber: 20,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("p", { children: [
        "Edit ",
        /* @__PURE__ */ jsxDEV("code", { children: "src/App.tsx" }, void 0, false, {
          fileName: "C:/_Projects/ytper-extension/src/content/App.tsx",
          lineNumber: 22,
          columnNumber: 16
        }, this),
        " and save to test HMR"
      ] }, void 0, true, {
        fileName: "C:/_Projects/ytper-extension/src/content/App.tsx",
        lineNumber: 21,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "C:/_Projects/ytper-extension/src/content/App.tsx",
      lineNumber: 19,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("p", { className: "read-the-docs", children: "Click on the Vite and React logos to learn more" }, void 0, false, {
      fileName: "C:/_Projects/ytper-extension/src/content/App.tsx",
      lineNumber: 25,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "C:/_Projects/ytper-extension/src/content/App.tsx",
    lineNumber: 9,
    columnNumber: 5
  }, this);
}
_s(App, "oDgYfYHkD9Wkv4hrAPCkI/ev3YU=");
_c = App;
export default App;
var _c;
$RefreshReg$(_c, "App");
if (import.meta.hot && !inWebWorker) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
  RefreshRuntime.__hmr_import(import.meta.url).then((currentExports) => {
    RefreshRuntime.registerExportsForReactRefresh("C:/_Projects/ytper-extension/src/content/App.tsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports)
        return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate(currentExports, nextExports);
      if (invalidateMessage)
        import.meta.hot.invalidate(invalidateMessage);
    });
  });
}
