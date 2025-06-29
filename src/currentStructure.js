const currentStructure = {
  item: "currentStructure",
  content: {
    header: {
      item: "header",
      child: {},
    },
    nav: {
      item: "nav",
      child: {},
    },
  },
  flexibleContent: {},
  child: {},
};

function addStructure(struct, item) {
  struct["child"][item] = {
    item,
    child: {},
    parent: () => struct,
  };
}
function getParent(child, parent, arr = [], item = "item") {
  const max_len = arr.length - 1;
  if (child["parent"]) {
    arr.push(child[item]);
    parent = parent["content"][child["parent"]()["item" /* type */]]
      ? parent["content"][child["parent"]()["item" /* type */]]
      : parent["flexibleContent"][child["parent"]()["item" /* id */]]
      ? parent["flexibleContent"][child["parent"]()["item" /* id */]]
      : parent;
    return getParent(child["parent"](), parent, arr);
  }
  if (arr.length) {
    return getParent(
      child,
      parent["child"][arr[max_len]],
      arr.splice(0, max_len)
    );
  }
  return parent;
}

addStructure(currentStructure["content"]["header"], "block");
addStructure(currentStructure["content"]["nav"], "block");
addStructure(currentStructure["content"]["header"], "button");
addStructure(currentStructure["content"]["nav"], "button");
addStructure(currentStructure["flexibleContent"], "block");
addStructure(currentStructure["flexibleContent"], "button");
addStructure(currentStructure["content"]["header"]["child"]["block"], "white");
addStructure(currentStructure["content"]["nav"]["child"]["block"], "white");
addStructure(currentStructure["content"]["header"]["child"]["button"], "white");
addStructure(currentStructure["flexibleContent"]["block"], "black");
addStructure(currentStructure["flexibleContent"]["button"], "white");
addStructure(currentStructure["flexibleContent"]["button"], "brown");
addStructure(currentStructure["flexibleContent"]["button"], "black");
addStructure(currentStructure["content"]["button"], "green");
addStructure(
  currentStructure["content"]["header"]["child"]["button"]["child"]["white"],
  "left"
);
addStructure(
  currentStructure["flexibleContent"]["button"]["child"]["white"],
  "right"
);
addStructure(
  currentStructure["flexibleContent"]["button"]["child"]["brown"],
  "up"
);

addStructure(
  getParent(currentStructure["flexibleContent"]["button"]["parent"]()),
  "red"
);

console.log(currentStructure["child"]["button"]["child"]["white"]["child"]);
