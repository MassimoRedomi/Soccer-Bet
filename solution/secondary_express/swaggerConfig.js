const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Express JFT Soccer Secondary Server',
            version: '1.0.0',
            description: 'Secondary Express JFT Soccer Server documentation',
        },
    },
    apis: ['./routes/*.js', './models/*.js'], // Path to the API docs
};

const specs = swaggerJsdoc(options);

module.exports = specs;
