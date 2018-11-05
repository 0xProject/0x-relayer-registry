export const relayerSchema = {
    id: '/Relayer',
    type: 'object',
    properties: {
        name: {
            type: 'string',
        },
        homepage_url: {
            type: 'string',
            format: 'uri',
            description: 'url that points to the marketing / informational website',
        },
        app_url: {
            type: 'string',
            format: 'uri',
            description: 'url that points to the trading interface',
        },
        header_img: {
            type: 'string',
        },
        logo_img: {
            type: 'string',
        },
        networks: {
            type: 'array',
            minItems: 1,
            items: {
                type: 'object',
                properties: {
                    networkId: {
                        type: 'integer',
                    },
                    sra_http_endpoint: {
                        type: 'string',
                        format: 'uri',
                        description: 'HTTP Endpoint that conforms to Standard Relayer API',
                    },
                    sra_ws_endpoint: {
                        type: 'string',
                        format: 'uri',
                        description: 'WebSockets Endpoint that conforms to Standard Relayer API',
                    },
                    static_order_fields: {
                        type: 'object',
                        properties: {
                            fee_recipient_addresses: {
                                type: 'array',
                                items: {
                                    $ref: '/Address',
                                },
                            },
                            maker_addresses: {
                                type: 'array',
                                items: {
                                    $ref: '/Address',
                                },
                            },
                            taker_addresses: {
                                type: 'array',
                                items: {
                                    $ref: '/Address',
                                },
                            },
                        },
                    },
                },
            },
        },
    },
    required: ['name', 'homepage_url', 'networks'],
};

export const relayersSchema = {
    id: '/Relayers',
    title: 'Relayers',
    type: 'object',
    additionalProperties: {
        $ref: '/Relayer',
    },
};
