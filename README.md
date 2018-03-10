# 0x Project Registry

A collection of relayers built on [0x](https://0xproject.com/) and their corresponding metadata. Al

All address keys follow the [EIP 55 address checksum format](https://github.com/ethereum/EIPs/issues/55).

Submit PRs to add a relayer. Relayers must be live on at lest one test network to be added.

## Usage

Clone this repo and import projects.json into your own project.

Entries that have values for `sra_http_endpoint` or `sra_ws_endpoint` comply with the [Standard Relayer API](https://github.com/0xProject/standard-relayer-api/blob/master/README.md). These endpoints can be easily queried using [0x Connect](https://github.com/0xProject/0x-monorepo/tree/development/packages/connect).

## Submission Process

1. Fork this repository.
2. Add your logo image in a web-safe format to the `images` folder.
3. Add an entry to `projects.json` that complies to the Project JSON Schema and passes validation.

Criteria:
- The icon should be small, square, but high resolution, ideally a vector/svg.
- Do not add your entry to the end of the JSON array, messing with the trailing comma. Your pull request should only be an addition of lines, and any line removals should be deliberate deprecations of those logos.

A sample submission:

```json
{
    "name"      : "Radical Relayer",
    "url"       : "https://asamplewebsite.com",
    "logo"      : "radicalrelayer.png",
    "networks"  : [
        {
            "networkId" : 1,
            "sra_http_endpoint" : "https://api.asamplewebsite.com/",
            "sra_ws_endpoint" : "ws://api.asamplewebsite.com",
            "static_order_fields" : {
                "fee_recipient_addresses": ["0x1111111111111111111111111111111111111111"],
            }
        }
    ]
}
```

A full list of permitted fields can be found in the [project-schema.json](./project-schema.json) file.
