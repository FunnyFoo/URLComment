var ddp = new MeteorDdp("ws://127.0.0.1:3000/websocket");

ddp.connect().then(function() {
  ddp.subscribe('myBookPosts');
  console.log('Connected!');
  ddp.watch('myBookPosts', function(changeDoc, message) {

  });
});
