jest.mock("./src/constants", () => ({
  TWILIO_ACCOUNT_SID: "twilio-account-sid",
  TWILIO_AUTH_TOKEN: "twilio-auth-token",

  TARGET_ENV: "test",
}));

//Moving the mocks of the middleware here as each test will now run through
// app.ts and need to mock each middleware listed

jest.mock("./src/middleware/incomingRequestAuthentication", () => ({
  __esModule: true,
  default: jest.fn()
}));
