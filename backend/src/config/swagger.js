//src/config/swagger.js

const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Remote Team Collaboration API",
            version: "1.0.0",
            description: "API documentation for the remote team collaboration platform",
        },
        servers: [
            {
                url: "http://localhost:5001/api",
                description: "Local server",
            },
        ],
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
    },
    apis: [require("path").join(__dirname, "../routes/*.js")],
};

const swaggerDocs = swaggerJsdoc(options);

const setupSwagger = (app) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
    console.log("📄 Swagger documentation available at: http://localhost:5001/api-docs");
};

module.exports = setupSwagger;
