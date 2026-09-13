// Static-assets worker with a hostname branch:
// - www.depletion.org  -> serves the site (falls through to the static assets)
// - depletion.org      -> 301 to www (path + query preserved)
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.hostname === "depletion.org") {
      return Response.redirect(`https://www.depletion.org${url.pathname}${url.search}`, 301);
    }
    return env.ASSETS.fetch(request);
  },
};
