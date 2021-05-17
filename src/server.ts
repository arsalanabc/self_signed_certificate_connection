import * as WebSocket from 'ws'
import * as https from 'https'
import * as fs from 'fs'
import * as path from 'path'
import * as express from 'express';

const app = express()
app.use('/', function (req, res) {
  res.writeHead(200);
  res.end("hello world 2\n");
})

export const server = https.createServer({
  cert: fs.readFileSync(path.resolve(__dirname, 'cert.pem'), 'utf-8'),
  key: fs.readFileSync(path.resolve(__dirname, 'server.key'), 'utf-8')
}, app)

const wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws) {
  console.log("connected");
  
  ws.on('message', function incoming(message) {

      console.log('received: %s', message);

      ws.send('hello from server!, the time is: ' + timestamp());
    });
});

function timestamp() {
  return (new Date)
    .toISOString()
    .replace(/z|t/gi, ' ')
    .trim()
};
