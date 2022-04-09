/* eslint-disable */
import assert from "assert";
import sget from "../sget.js";

const data = {
  key: { level: 0, index: [0], str: "0" },
  children: [
    {
      key: { level: 1, index: [0, 0], str: "0.0" },
      children: [
        { key: { level: 2, index: [0, 0, 0], str: "0.0.0" }, children: [] },
        { key: { level: 2, index: [0, 0, 1], str: "0.0.1" }, children: [] },
        { key: { level: 2, index: [0, 0, 2], str: "0.0.2" }, children: [] },
        { key: { level: 2, index: [0, 0, 3], str: "0.0.3" }, children: [] },
        { key: { level: 2, index: [0, 0, 4], str: "0.0.4" }, children: [] },
      ],
    },
    {
      key: { level: 1, index: [0, 1], str: "0.1" },
      children: [
        { key: { level: 2, index: [0, 1, 0], str: "0.1.0" }, children: [] },
        { key: { level: 2, index: [0, 1, 1], str: "0.1.1" }, children: [] },
        { key: { level: 2, index: [0, 1, 2], str: "0.1.2" }, children: [] },
        { key: { level: 2, index: [0, 1, 3], str: "0.1.3" }, children: [] },
        { key: { level: 2, index: [0, 1, 4], str: "0.1.4" }, children: [] },
      ],
    },
    {
      key: { level: 1, index: [0, 2], str: "0.2" },
      children: [
        { key: { level: 2, index: [0, 2, 0], str: "0.2.0" }, children: [] },
        { key: { level: 2, index: [0, 2, 1], str: "0.2.1" }, children: [] },
        { key: { level: 2, index: [0, 2, 2], str: "0.2.2" }, children: [] },
        { key: { level: 2, index: [0, 2, 3], str: "0.2.3" }, children: [] },
        { key: { level: 2, index: [0, 2, 4], str: "0.2.4" }, children: [] },
      ],
    },
    {
      key: { level: 1, index: [0, 3], str: "0.3" },
      children: [
        { key: { level: 2, index: [0, 3, 0], str: "0.3.0" }, children: [] },
        { key: { level: 2, index: [0, 3, 1], str: "0.3.1" }, children: [] },
        { key: { level: 2, index: [0, 3, 2], str: "0.3.2" }, children: [] },
        { key: { level: 2, index: [0, 3, 3], str: "0.3.3" }, children: [] },
        { key: { level: 2, index: [0, 3, 4], str: "0.3.4" }, children: [] },
      ],
    },
    {
      key: { level: 1, index: [0, 4], str: "0.4" },
      children: [
        { key: { level: 2, index: [0, 4, 0], str: "0.4.0" }, children: [] },
        { key: { level: 2, index: [0, 4, 1], str: "0.4.1" }, children: [] },
        { key: { level: 2, index: [0, 4, 2], str: "0.4.2" }, children: [] },
        { key: { level: 2, index: [0, 4, 3], str: "0.4.3" }, children: [] },
        { key: { level: 2, index: [0, 4, 4], str: "0.4.4" }, children: [] },
      ],
    },
  ],
};

describe("sget", function () {
  it("_.sget dot notation syntax", function () {
    assert.strictEqual(sget(data, "children.1.children.2.key.str"), "0.1.2");
  });

  it("_.sget dot braket notation syntax", function () {
    assert.strictEqual(sget(data, "children[3].children[4].key.str"), "0.3.4");
  });

  it("_.sget dot wildcard notation syntax", function () {
    assert.strictEqual(sget(data, "children..children..key.str"), "0.0.0");
  });

  it("_.sget braket wildcard notation syntax", function () {
    assert.strictEqual(sget(data, "children[].children[].key.str"), "0.0.0");
  });

  it("_.sget test condition", function () {
    assert.strictEqual(sget(data, "children[.key.str:0.2].key.str"), "0.2");
  });

  it("_.sget test complex condition", function () {
    assert.strictEqual(
      sget(
        data,
        "children[.children[].key.str:0.3.4].children[.key.index.2:2].key.str"
      ),
      "0.3.2"
    );
  });

  it("_.sget test > operator", function () {
    assert.strictEqual(sget(data, "children[.key.index.1>3].key.str"), "0.4");
  });

  it("_.sget test >= operator", function () {
    assert.strictEqual(sget(data, "children[.key.index.1>=3].key.str"), "0.3");
  });

  it("_.sget test < operator", function () {
    assert.strictEqual(
      sget(data, "children[.key.index.1>1][.key.index.1<3].key.str"),
      "0.2"
    );
  });
});
