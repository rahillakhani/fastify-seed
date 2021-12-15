import app from "../src/app";

const addHook = jest.fn();

describe("/event", () => {
  beforeAll(async () => {
    app.addHook = addHook;
    await app.listen(8080);
    await app.ready();
    //start server
    //fastify inject
  })

  afterAll(async () => {
    await app.close();
    //close server
  })

  test("POST should return 200", async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/event'
    });

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual("{\"message\":\"Event POST\",\"statusCode\":200}");
  });
});
