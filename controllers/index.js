const index = (ctx) => {
  if (!ctx.response.headersSent) {
    ctx.response.redirect("/datos");
  }
};

export default { index };
