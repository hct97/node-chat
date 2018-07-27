module.exports = function(io){

    var usernames =[];

    io.on('connection', function(socket){

        socket.on("adduser", function(username){
            socket.username = username;
            usernames.push(username);

            var data = {
                sender: "SERVER",
                message: "You have join chat room"
            };
    
            socket.emit("update_message",data);
    
            var data = {
                sender: "SERVER",
                message: username + "have join to chat room"
            };

            socket.broadcast.emit("update_message",data);
        });

        
        socket.on('chat message', function(message){
            
            var data = {
                sender: "YOU",
                message : message
            };

            socket.emit('update_message',data);

            var data = {
                sender : socket.username,
                message : message
            };

            socket.broadcast.emit("update_message",data);


            // io.emit('chat message', msg);
          });
        socket.on('disconnect', function(){
            for(var i =0; i < usernames.length; i++){
                if(usernames[i] == socket.username)
                    usernames.splice(i,1);
            }
            var data = {
                sender: "SERVER",
                message: socket.username + " left chat room"
            };

            socket.broadcast.emit("update_message",data);
        });
    });
}