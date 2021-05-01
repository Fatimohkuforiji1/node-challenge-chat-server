const express = require("express");
const cors = require("cors");
const { static } = require("express");

const PORT = process.env.PORT || 4001
const app = express();

app.use(express.json());
app.use(ex)

app.use(cors());

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = [welcomeMessage];


app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
  response.json(messages);
});

app.post("/message", function (request, response) {
const pushedMessage = request.body;
  if(!(pushedMessage.hasOwnProperty('from')) ||
     (!(pushedMessage.hasOwnProperty('text'))))
     {
       response.status(400)
       response.send("Please complete the form")
     } else {
    messages.push(pushedMessage);
    response.json(messages);
     }
});


//delete
app.delete("/message/:id", (request, respond)=>{
const messageId = request.params.id; 

const messageIndex = messages.findIndex((element)=>{
  return element.id === parseInt(messageId);
})
  messages.splice(messageIndex, 1)
  respond.send("Ready");
});



//allow client read text 
app.get("/message/search", (request, response) => {
  const messageId = request.query.term;
  const messageFiltered = messages.find((message) => {
    if (message.text.toLowerCase().includes(messageId.toLowerCase())) {
      return message;
    }
  });
  response.json(messageFiltered);
});

 
//Read only the most recent 10 messages: `/messages/latest`
app.get("/message/read", (request, response) => {
   let readMessages;
   if (messages.length <= 10){
     readMessages = messages
   } else {
     readMessages = messages.slice(messages.length -10);
   }  response.json(readMessages);
  
});

//searching by ID
app.get("/message/:id", (request, response) => {
  const messageId = parseInt(request.params.id);
  const messageFiltered = messages.find((message) => {
    if (message.id === messageId) {
      return message;
    }
  });
  response.json(messageFiltered);
});

app.listen(PORT, () => {
  console.log(`Fatimoh is coding on ${PORT}`);
});

