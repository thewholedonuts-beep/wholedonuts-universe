const test = require("node:test");
const assert = require("node:assert/strict");
const protocol = require("../campaign-protocol.js");

test("accepts active 48-hour aliases and digits", () => {
  const now = new Date("2026-09-05T12:00:00Z");
  assert.equal(protocol.resolve("Doughnuts", now).token, "doughnuts");
  assert.equal(protocol.resolve("9", now).token, "9");
});

test("expires the 48-hour group without breaking the weekly group", () => {
  const now = new Date("2026-09-07T12:00:00Z");
  assert.equal(protocol.resolve("whole", now), null);
  assert.equal(protocol.resolve("hero", now).token, "hero");
});

test("accepts safe remembrance aliases", () => {
  const now = new Date("2026-09-10T12:00:00Z");
  assert.equal(protocol.resolve("9/11", now).token, "remembrance");
  assert.equal(protocol.resolve("FDNY", now).sensitive, true);
  assert.equal(protocol.resolve("Freedom Tower", now).token, "freedom-tower");
  assert.equal(protocol.resolve("Twin Towers", now).token, "twin-towers");
  assert.equal(protocol.resolve("We Never Forget", now).token, "we-never-forget");
});

test("rejects arbitrary expressions and all expired tokens", () => {
  assert.equal(protocol.resolve("<script>alert(1)</script>", new Date("2026-09-05T12:00:00Z")), null);
  assert.equal(protocol.resolve("tunnel to towers", new Date("2026-09-05T12:00:00Z")), null);
  assert.equal(protocol.resolve("hero", new Date("2026-09-12T12:00:00Z")), null);
});

test("reads only +U protocol query keys and emits a canonical invite", () => {
  const now = new Date("2026-09-05T12:00:00Z");
  const campaign = protocol.fromSearch("?redirect=https://evil.example&u=positive", now);
  assert.equal(campaign.token, "positive");
  assert.equal(
    protocol.invitationUrl("https://wenevergonnaclose.com/path?old=1#x", campaign, now),
    "https://wenevergonnaclose.com/?u=positive"
  );
});

test("never preserves an expired campaign in an invitation", () => {
  const url = protocol.invitationUrl(
    "https://wenevergonnaclose.com/",
    { token: "whole" },
    new Date("2026-09-07T12:00:00Z")
  );
  assert.equal(url, "https://wenevergonnaclose.com/");
});
