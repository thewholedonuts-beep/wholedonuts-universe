(function (root, factory) {
  const protocol = factory();
  if (typeof module === "object" && module.exports) module.exports = protocol;
  if (root) root.WholeDonutsInviteProtocol = protocol;
})(typeof window !== "undefined" ? window : globalThis, function () {
  "use strict";

  const campaigns = [
    {
      expiresAt: "2026-09-06T14:11:44Z",
      entries: {
        whole: ["whole"],
        hole: ["hole"],
        donuts: ["donuts"],
        doughnuts: ["doughnuts"],
        positive: ["positive"],
        "1": ["1"],
        "2": ["2"],
        "3": ["3"],
        "4": ["4"],
        "5": ["5"],
        "6": ["6"],
        "7": ["7"],
        "8": ["8"],
        "9": ["9"]
      }
    },
    {
      expiresAt: "2026-09-11T14:34:45Z",
      entries: {
        remembrance: ["9/11", "9-11", "911", "9 11", "remembrance"],
        freedom: ["freedom"],
        "25-years": ["25 years", "25-years", "25years"],
        nyc: ["nyc", "new york city"],
        "back-to-school": ["back to school", "back-to-school"],
        "cool-new-trends": ["cool new trends", "cool-new-trends"],
        "create-ur-merch": ["create ur merch", "create-ur-merch"],
        hero: ["hero", "heroes"],
        fdny: ["fdny"],
        "freedom-tower": ["freedom tower", "freedom-tower"],
        "twin-towers": ["twin towers", "twin-towers"],
        "we-never-forget": ["we never forget", "we-never-forget", "never forget", "never-forget"]
      }
    }
  ];

  const context = {
    whole: {
      label: "Whole",
      message: "Bring one useful part of your experience to the whole.",
      route: "#the-table"
    },
    hole: {
      label: "A way through",
      message: "Start where the gap is, then choose one useful next step.",
      route: "course.html"
    },
    donuts: {
      label: "Whole Donuts",
      message: "Pull up a seat, choose a figure, and find a useful route.",
      route: "#gateway"
    },
    doughnuts: {
      label: "A different way in",
      message: "Different words can still lead to the same welcoming table.",
      route: "#gateway"
    },
    positive: {
      label: "Positive direction",
      message: "Choose one manageable action that can move today forward.",
      route: "templates/plus-u-next-step-template.md"
    },
    remembrance: {
      label: "9/11 remembrance",
      message: "A respectful route for remembrance, learning, service, and community care.",
      route: "course.html",
      sensitive: true
    },
    freedom: {
      label: "Freedom",
      message: "Use your freedom to choose a constructive next step in your own words.",
      route: "templates/plus-u-next-step-template.md"
    },
    "25-years": {
      label: "25 years of remembrance",
      message: "Reflect, learn, and carry one useful act of service forward.",
      route: "course.html",
      sensitive: true
    },
    nyc: {
      label: "New York City",
      message: "Bring resilience, creativity, and community care to the table.",
      route: "#the-table"
    },
    "back-to-school": {
      label: "Back to school",
      message: "Begin any learning situation by choosing what would help and one right-sized step.",
      route: "course.html"
    },
    "cool-new-trends": {
      label: "Cool new trends",
      message: "Explore what is new, keep what helps, and make the next idea your own.",
      route: "#template-library"
    },
    "create-ur-merch": {
      label: "Create ur merch",
      message: "Explore the Made By +U, 4 ALL Goods Window. Checkout remains unavailable until a verified store is connected.",
      route: "#the-counter"
    },
    hero: {
      label: "Honor a hero",
      message: "Honor service through remembrance, learning, and one practical act of care.",
      route: "templates/plus-u-share-a-crumb-template.md",
      sensitive: true
    },
    fdny: {
      label: "FDNY remembrance",
      message: "A respectful route honoring service and community courage. Whole Donuts is not affiliated with or endorsed by FDNY.",
      route: "course.html",
      sensitive: true
    },
    "freedom-tower": {
      label: "Freedom Tower remembrance",
      message: "Reflect on resilience, renewal, and the responsibility to carry community care forward.",
      route: "course.html",
      sensitive: true
    },
    "twin-towers": {
      label: "Twin Towers remembrance",
      message: "Remember those affected through reflection, learning, service, and care for one another.",
      route: "course.html",
      sensitive: true
    },
    "we-never-forget": {
      label: "We never forget",
      message: "Honor memory with compassion and one constructive act of service.",
      route: "templates/plus-u-share-a-crumb-template.md",
      sensitive: true
    }
  };

  for (let digit = 1; digit <= 9; digit += 1) {
    context[String(digit)] = {
      label: "Step " + digit,
      message: "Use this number as a prompt to choose one useful next step.",
      route: "templates/plus-u-next-step-template.md"
    };
  }

  function normalize(value) {
    if (typeof value !== "string" || value.length > 40) return "";
    const normalized = value
      .trim()
      .toLowerCase()
      .replace(/[_+]+/g, " ")
      .replace(/\s+/g, " ");
    return /^[a-z0-9 /-]+$/.test(normalized) ? normalized : "";
  }

  function resolve(value, now) {
    const normalized = normalize(value);
    if (!normalized) return null;
    const timestamp = now instanceof Date ? now.getTime() : new Date(now || Date.now()).getTime();
    for (const campaign of campaigns) {
      if (timestamp >= Date.parse(campaign.expiresAt)) continue;
      for (const [token, aliases] of Object.entries(campaign.entries)) {
        if (aliases.includes(normalized)) {
          return {
            token,
            expiresAt: campaign.expiresAt,
            ...context[token]
          };
        }
      }
    }
    return null;
  }

  function fromSearch(search, now) {
    const params = new URLSearchParams(search || "");
    for (const [key, value] of params.entries()) {
      const normalizedKey = key.trim().toLowerCase();
      if (normalizedKey === "u" || normalizedKey === "+u" || normalizedKey === "plusu") {
        return resolve(value, now);
      }
    }
    return null;
  }

  function invitationUrl(baseUrl, campaign, now) {
    const url = new URL(baseUrl);
    const active = campaign && resolve(campaign.token, now);
    url.pathname = "/";
    url.search = "";
    url.hash = "";
    if (active) url.searchParams.set("u", active.token);
    return url.toString();
  }

  return { campaigns, normalize, resolve, fromSearch, invitationUrl };
});
