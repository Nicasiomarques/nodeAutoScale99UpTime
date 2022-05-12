import http from 'http';
const processId = process.pid;

const server = http.createServer((_, response) => {
  for (let counter = 0; counter < 1e7; counter++);
  response.end(`handle by process ${processId}`);
});

server.listen(3000).once('listening', () => {
  console.log('server is running in process', processId);
});

setTimeout(() => {
  process.exit(1);
}, Math.random() * 1e4);

process.on('SIGINT', () => {
  console.log('server ending', Date.now())
  server.close(() => process.exit())
})
