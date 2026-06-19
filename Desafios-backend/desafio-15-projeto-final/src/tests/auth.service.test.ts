import bcrypt from "bcrypt";

describe("Auth business rules", () => {
  it("should hash password correctly", async () => {
    const password = "123456";

    const hashedPassword = await bcrypt.hash(password, 10);

    expect(hashedPassword).not.toBe(password);
  });

  it("should compare password correctly", async () => {
    const password = "123456";

    const hashedPassword = await bcrypt.hash(password, 10);

    const isValid = await bcrypt.compare(password, hashedPassword);

    expect(isValid).toBe(true);
  });
});