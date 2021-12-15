import app from "../src/app";

const addHook = jest.fn();

describe("/health", () => {
  beforeAll(async () => {
    app.addHook = addHook;
    await app.listen(8081);
    await app.ready();
  })

  afterAll(async () => {
    await app.close();
  })

  test("should return 200", async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/health'
    });

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual("up and running");
  });

  test("should return 404", async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/health'
    });

    expect(response.statusCode).toEqual(404);
    expect(response.body).toEqual("{\"message\":\"Route POST:/health not found\",\"error\":\"Not Found\",\"statusCode\":404}");
  });
});
