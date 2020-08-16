import nats from 'node-nats-streaming';

console.clear();

const stan = nats.connect('ticketing', '123', {
  url: 'http://localhost:4222',
});

stan.on('connect', () => {
  console.log('Listening on port 4222');

  const subscription = stan.subscribe('ticket:created');

  subscription.on('message', (msg) => {
    console.log('message received');
  });
});
