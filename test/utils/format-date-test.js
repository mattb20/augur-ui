import {
  dateHasPassed,
  formatDate,
  getDaysRemaining,
  convertUnixToFormattedDate
} from "utils/format-date";

describe("utils/format-date", () => {
  const test = t => test(t.description, () => t.assertions());

  test({
    description: `should return false`,
    assertions: () => {
      const currenUtcOffset =
        (new Date(1521489481).getTimezoneOffset() / 60) * -1;
      const actual = formatDate(new Date(1521489481)).utcLocalOffset;

      expect(actual).toBe(currenUtcOffset);
    }
  });

  test({
    description: `should return false`,
    assertions: () => {
      const actual = dateHasPassed(1522798696889, 11111111);

      expect(actual).toBe(true);
    }
  });

  test({
    description: `should return a trimmed string`,
    assertions: () => {
      const actual = dateHasPassed(1522798696889, 999999999999999);

      expect(actual).toBe(false);
    }
  });

  test({
    description: `days remaining should be 0`,
    assertions: () => {
      const actual = getDaysRemaining(11111, 11111);

      expect(actual).toBe(0);
    }
  });

  test({
    description: `end before start should return 0`,
    assertions: () => {
      const actual = getDaysRemaining(11111, 99999);

      expect(actual).toBe(0);
    }
  });

  test({
    description: `start time null should return 0`,
    assertions: () => {
      const actual = getDaysRemaining(null, 99999);

      expect(actual).toBe(0);
    }
  });

  test({
    description: `end time null should return 0`,
    assertions: () => {
      const actual = getDaysRemaining(99999, null);

      expect(actual).toBe(0);
    }
  });

  test({
    description: `days should be floored`,
    assertions: () => {
      const actual = getDaysRemaining(1520300344, 1519849696);

      expect(actual).toBe(5);
    }
  });

  test({
    description: `days should be floored to fake today`,
    assertions: () => {
      const actual = getDaysRemaining(
        1520300344,
        formatDate(new Date(1519849696000)).timestamp
      );

      expect(actual).toBe(5);
    }
  });

  test({
    description: `current time after end time return 0`,
    assertions: () => {
      const actual = getDaysRemaining(1520300344, 1520300300);

      expect(actual).toBe(0);
    }
  });

  test({
    description: `given timestamp does format correct`,
    assertions: () => {
      const timestamp = 1520300344;
      const dateTime = "March 6, 2018 1:39 AM";
      const actual = convertUnixToFormattedDate(1520300344);

      expect(actual.formatted).toBe(dateTime);
      expect(actual.timestamp).toBe(timestamp);
    }
  });
});
