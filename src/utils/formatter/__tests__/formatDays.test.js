import formatDays from "../formatDays";

describe("formatDays", () => {
  test("should format value 1 with singular unit", () => {
    const formattedValue = formatDays(1);
    expect(formattedValue).toBe("1 Day");
  });

  test("should format value other than 1 with plural unit", () => {
    const formattedValue = formatDays(3);
    expect(formattedValue).toBe("3 Days");
  });
});
