import { formatEther } from "utils/format-number";

describe("modules/trade/helpers/has-user-enough-funds.js", () => {
  const hasUserEnoughFunds = require("../../../src/modules/trade/helpers/has-user-enough-funds")
    .default;

  test(`should return false if user doesn't have enough money`, () => {
    expect(
      hasUserEnoughFunds([], { address: "address", ether: undefined })
    ).toBeFalsy();
    expect(
      hasUserEnoughFunds([], { address: "address", ether: null })
    ).toBeFalsy();
    expect(
      hasUserEnoughFunds([{ side: "buy", totalCost: formatEther("11") }], {
        address: "address",
        ether: "10"
      })
    ).toBeFalsy();
    expect(
      hasUserEnoughFunds([], { address: "address", ether: undefined })
    ).toBeFalsy();
    expect(
      hasUserEnoughFunds([{ side: "buy", totalCost: formatEther("10") }], {
        address: "address",
        ether: "0"
      })
    ).toBeFalsy();
  });

  test(`should return false if user has no id defined`, () => {
    expect(
      hasUserEnoughFunds([], { address: null, ether: undefined })
    ).toBeFalsy();
    expect(
      hasUserEnoughFunds([], { address: undefined, ether: undefined })
    ).toBeFalsy();
    expect(
      hasUserEnoughFunds([{ side: "buy", totalCost: formatEther("10") }], {
        address: null,
        ether: "10"
      })
    ).toBeFalsy();
    expect(
      hasUserEnoughFunds([{ side: "buy", totalCost: formatEther("10") }], {
        address: undefined,
        ether: "10"
      })
    ).toBeFalsy();
  });

  test(`should return false if there is no logged in user`, () => {
    expect(hasUserEnoughFunds([], undefined)).toBeFalsy();
    expect(hasUserEnoughFunds([], null)).toBeFalsy();
    expect(hasUserEnoughFunds([], {})).toBeFalsy();
    expect(
      hasUserEnoughFunds([{ side: "buy", totalCost: formatEther("10") }], null)
    ).toBeFalsy();
    expect(
      hasUserEnoughFunds(
        [{ side: "buy", totalCost: formatEther("10") }],
        undefined
      )
    ).toBeFalsy();
    expect(
      hasUserEnoughFunds([{ side: "buy", totalCost: formatEther("10") }], {})
    ).toBeFalsy();
  });

  test("should return true if user has enough money", () => {
    expect(
      hasUserEnoughFunds([{ side: "buy", totalCost: formatEther("10") }], {
        address: "address",
        ether: "10"
      })
    ).toBeTruthy();
    expect(
      hasUserEnoughFunds([{ side: "buy", totalCost: formatEther("9") }], {
        address: "address",
        ether: "10"
      })
    ).toBeTruthy();
  });
});
