import swaggerJsdoc from "swagger-jsdoc";
import dotenv from "dotenv";
dotenv.config();

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: process.env.APP_NAME || "API",
      version: "1.0.0",
      description: `${process.env.APP_NAME} documentation`,
    },
    servers: [
      {
        url: "http://localhost:8000/api/v1",
        description: "Local development server",
      },
      {
        url: "https://localhost:8000/api/v1",
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
