import { app } from "./app";
import { connectDB } from "./config/db";
import { env } from "./config/env";

async function bootstrap() {
  await connectDB(env.MONGODB_URI);
  app.listen(Number(env.PORT), () => {
    console.log(`API running on port ${env.PORT}`);
  });
}

bootstrap().catch((err) => {
  console.error(err);
  process.exit(1);
});
