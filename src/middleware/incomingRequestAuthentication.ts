import { validator as flexTokenValidator } from "twilio-flex-token-validator";
import { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN } from "../constants";

/**
 * Authenticates incoming requests to this application
 */
export const validateFlexToken = (req, reply, done) => {

  const flexToken = req.headers["flex-token"];
  // Return unauthenticated if no flex token present
  // More methods of authentication can be added to this method in the future
  if (flexToken) {
    flexTokenValidator(flexToken as string, TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)
      .then(() => done())
      .catch(error => {
        reply.status(401);
        reply.send({
          message: "Unauthenticated. Flex token is not valid.",
          error
        });
      });
  } else {
    reply.status(401);
    reply.send({
      message: "Unauthenticated. No flex-token header present on request."
    });
  }
};