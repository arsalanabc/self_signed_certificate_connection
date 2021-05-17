import * as express from 'express'
import { server } from "./server";
const SERVER_PORT = 8443;

const HOST = 'localhost'

server.listen(SERVER_PORT)

import { createProxyMiddleware } from 'http-proxy-middleware';

function onProxyReq(proxyReq, req, res) {
    // add custom header to request
    proxyReq.setHeader('x-added', 'foobar');
}

const wsProxy = createProxyMiddleware('/', {
    target: `https://${HOST}:${SERVER_PORT}`,
    changeOrigin: true,
    secure: true,
    ws: true,
    onProxyReq,
});

const app = express();

app.use(wsProxy);

const proxy = app.listen(9443)

proxy.on('upgrade', wsProxy.upgrade); // <-- subscribe to http 'upgrade'