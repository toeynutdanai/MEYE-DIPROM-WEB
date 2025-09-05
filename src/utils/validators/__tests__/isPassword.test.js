import isPassword from "../isPassword";

describe("isPassword", () => {
  test("Abcdefg1# is valid password", () => {
    expect(isPassword("Abcdefg1#")).toBeTruthy();
  });

  test("Pass1234$ is valid password", () => {
    expect(isPassword("Pass1234$")).toBeTruthy();
  });

  test("shortpss is too short", () => {
    expect(isPassword("shortpss")).toBeFalsy();
  });

  test("StrongPW! is missing digit", () => {
    expect(isPassword("StrongPW!")).toBeFalsy();
  });

  test("weakpass# is missing uppercase", () => {
    expect(isPassword("weakpass#")).toBeFalsy();
  });

  test("Abcd1234 is missing special character", () => {
    expect(isPassword("Abcd1234")).toBeFalsy();
  });
});
