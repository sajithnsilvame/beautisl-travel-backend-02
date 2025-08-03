import swaggerJsdoc from "swagger-jsdoc";
import appConfig from "@/config/app.config";

const { app } = appConfig;

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: app.name,
      version: app.version,
      description: `${app.name} documentation`,
    },
    servers: [
      {
        url: `http://localhost:${app.port}/api/v1`,
        description: "Local development server",
      },
      {
        url: `https://localhost:${app.port}/api/v1`,
        description: "production server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    // security: [
    //   {
    //     bearerAuth: [],
    //   },
    // ],
  },
  apis: ["./src/routes/*.ts"], // Adjust the path to your route files
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
