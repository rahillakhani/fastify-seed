//TODO :disabled since fastify has cors, keeping this  for reference
import { CorsOptions } from "cors";

import { NODE_ENV, TARGET_ENV } from "./constants";

export const getCorsOptions = (): CorsOptions => {

  const corsOriginsWhitelist = [ "https://flex.twilio.com" ];

  // Add localhost to allowed cors origins if running locally OR if deployed to dev env (so we can hit the service when running plugins locally)
  if (
    NODE_ENV !== "production" // is running locally
    || TARGET_ENV === "DEV" // is deployed to DEV environment
  ) {
    // Allowed localhost ports
    // logger.warn("Adding localhost domains to CORS allowed origins");
    [8080, 8081, 8082, 8083, 8084, 8090, 8183, 8184, 3000].forEach(port => {
      corsOriginsWhitelist.push(`http://localhost:${port}`);
    });
  }

  return {
    credentials: true,
    origin: corsOriginsWhitelist
  };
};
