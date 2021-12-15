// @ts-ignore
import cors from "cors";
import Fastify from "fastify";
import { getCorsOptions } from "./cors";
import { validateFlexToken } from "./middleware/incomingRequestAuthentication";

const app = Fastify({
    logger: {
        level: 'info',
        prettyPrint: true
    },
});

app.register(require('fastify-cors'), getCorsOptions());

const healthCheck = (req, reply) => {
    reply.send("up and running");
}

const registerAuthenticatedRoutes = (instance, opts, done) => {
    instance.addHook('preHandler', validateFlexToken);

    // Routes that require flex token validation
    instance.post("/event", (request, reply) => {
        reply.status(200).send({message: "Event POST", statusCode: 200});
    });

    done();
};

app.get("/health", healthCheck);

app.register(registerAuthenticatedRoutes);

export default app;
export {app as App};
