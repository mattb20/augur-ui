import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { formatNumber } from "utils/format-number";

describe(`modules/user-open-orders/selectors/user-open-orders-summary.js`, () => {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);

  test(`should return no summary if user is not logged in`, () => {
    const state = {
      loginAccount: {}
    };
    const store = mockStore(state);
    const selectUserOpenOrdersSummary = jest.mock(
      "../../../src/modules/user-open-orders/selectors/user-open-orders-summary",
      {
        "../../../store": store
      }
    ).default;

    expect(selectUserOpenOrdersSummary([])).toBeNull();
  });

  test(`should return summary for user`, () => {
    const state = {
      loginAccount: {
        address: "0x7c0d52faab596c08f484e3478aebc6205f3f5d8c"
      }
    };
    const store = mockStore(state);
    const selectUserOpenOrdersSummary = jest.mock(
      "../../../src/modules/user-open-orders/selectors/user-open-orders-summary",
      {
        "../../../store": store
      }
    ).default;
    const emptyUserOpenOrder = {};
    const outcomes = [
      {
        userOpenOrders: [
          emptyUserOpenOrder,
          emptyUserOpenOrder,
          emptyUserOpenOrder
        ]
      },
      {
        userOpenOrders: [emptyUserOpenOrder, emptyUserOpenOrder]
      },
      {
        userOpenOrders: [
          emptyUserOpenOrder,
          emptyUserOpenOrder,
          emptyUserOpenOrder,
          emptyUserOpenOrder
        ]
      }
    ];

    const expected = {
      openOrdersCount: formatNumber(9, { denomination: "Open Orders" })
    };
    expect(selectUserOpenOrdersSummary(outcomes)).toEqual(expected);
  });
});
