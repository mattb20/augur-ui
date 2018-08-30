import testState from "test/testState";
import { UPDATE_BLOCKCHAIN } from "modules/app/actions/update-blockchain";
import reducer from "modules/app/reducers/blockchain";

describe(`modules/app/reducers/blockchain.js`, () => {
  const thisTestState = Object.assign({}, testState);

  test(`should update the blockchain in state`, () => {
    const action = {
      type: UPDATE_BLOCKCHAIN,
      data: {
        currentBlockNumber: 833340
      }
    };
    const expectedOutput = Object.assign(
      {},
      thisTestState.blockchain,
      action.data
    );
    expect(reducer(thisTestState.blockchain, action)).toEqual(expectedOutput);
  });
});
