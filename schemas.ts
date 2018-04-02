export const addressSchema = {
    id: '/Address',
    type: 'string',
    pattern: '^0x[0-9a-f]{40}$'
};

export const relayerSchema = {
    id: '/Relayer',
    type: 'object',
    properties: {
        name: {
            type: 'string'
        },
        url: {
            type: 'string',
            format: 'uri'
        },
        logo: {
            type: 'string'
        },
        networks: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    networkId: {
                        type: 'string'
                    },
                    sra_http_endpoint: {
                        type: 'string',
                        format: 'uri',
                        description:
                            'HTTP Endpoint that conforms to Standard Relayer API'
                    },
                    sra_ws_endpoint: {
                        type: 'string',
                        format: 'uri',
                        description:
                            'WebSockets Endpoint that conforms to Standard Relayer API'
                    },
                    static_order_fields: {
                        type: 'object',
                        properties: {
                            fee_recipient_addresses: {
                                type: 'array',
                                items: {
                                    $ref: '/Address'
                                }
                            },
                            maker_addresses: {
                                type: 'array',
                                items: {
                                    $ref: '/Address'
                                }
                            },
                            taker_addresses: {
                                type: 'array',
                                items: {
                                    $ref: '/Address'
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    required: ['name', 'url', 'logo', 'networks']
};

export const relayersSchema = {
    id: '/Relayers',
    title: 'Relayers',
    type: 'array',
    items: {
        $ref: '/Relayer'
    }
};
