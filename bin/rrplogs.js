#!/usr/bin/env node

const path = require('path');
const logs = require(path.join(__dirname, '..', 'src', 'logs-command.js'));

logs.initialize('rrp');

const airnodeRequestOptions = {
    airnode: { describe: "Filter to Airnode ID" },
    request: { describe: "Filter to request ID" }
};

logs.addEvent({
    type: "MadeFullRequest",
    alias: "full",
    options: airnodeRequestOptions,
    abi: "event MadeFullRequest(address indexed airnode, bytes32 indexed requestId, uint256 requesterRequestCount, uint256 chainId, address requester, bytes32 endpointId, address sponsor, address sponsorWallet, address fulfillAddress, bytes4 fulfillFunctionId, bytes parameters)",
    filter: (args, f) => f.MadeFullRequest(args.airnode, args.request, null, null, null, null, null, null, null, null, null)
});

logs.addEvent({
    type: "MadeTemplateRequest",
    alias: "template",
    options: airnodeRequestOptions,
    abi: "event MadeTemplateRequest(address indexed airnode, bytes32 indexed requestId, uint256 requesterRequestCount, uint256 chainId, address requester, bytes32 templateId, address sponsor, address sponsorWallet, address fulfillAddress, bytes4 fulfillFunctionId, bytes parameters)",
    filter: (args, f) => f.MadeTemplateRequest(args.airnode, args.request, null, null, null, null, null, null, null, null, null)
});

logs.addEvent({
    type: "FulfilledRequest",
    alias: "fulfilled",
    options: airnodeRequestOptions,
    abi: "event FulfilledRequest(address indexed airnode, bytes32 indexed requestId, bytes data)",
    filter: (args, f) => f.FulfilledRequest(args.airnode, args.request, null)
});

logs.addEvent({
    type: "FailedRequest",
    alias: "failed",
    options: airnodeRequestOptions,
    abi: "event FailedRequest(address indexed airnode, bytes32 indexed requestId, string errorMessage)",
    filter: (args, f) => f.FailedRequest(args.airnode, args.request, null)
});

logs.addEvent({
    type: "SetSponsorshipStatus",
    alias: "sponsor",
    options: {
        sponsor: { describe: "Filter to sponsor address" },
        requester: { describe: "Filter to requester address" }
    },
    abi: "event SetSponsorshipStatus(address indexed sponsor, address indexed requester, bool sponsorshipStatus)",
    filter: (args, f) => f.SetSponsorshipStatus(args.sponsor, args.requester, null)
});

logs.runCommand();