

var engine_html ="<select name='engines' id='engines' class='short_list'  onchange = 'engine=this.value'>";
var job = "completions"
var engine = "text-curie-001"
var submitted_text = ""; //Most recent prompt by user
var engine_id_html = `<select name='engines' id='engines' class='short_list'  onchange = 'engine=this.value'>
<option value= 'ada' selected='selected'>ada</option>
<option value= 'babbage'>babbage</option>
<option value= 'curie'>curie</option>
<option value= 'davinci'>davinci</option>
</select>
`

function check_job(){
  job = document.getElementById("jobs").value;
  console.log(job)
  if(job == "completions"){
    document.getElementById('engine_options').innerHTML = engine_html;
    document.getElementById("prompt").placeholder = "Type prompt...";
    document.getElementById("engines").value = "text-curie-001"; //default
    document.getElementById("prompt").value = "";
    engine = "text-curie-001";


  }else if(job == "edits"){
    document.getElementById('engine_options').innerHTML = engine_html;
    document.getElementById("prompt").placeholder = `Input: What day of the wek is it? 
Instruction: Fix the spelling mistakes.`;
    document.getElementById("prompt").value = `Input: What day of the wek is it? 
Instruction: Fix the spelling mistakes.`;
    document.getElementById("engines").value = "text-davinci-edit-001"; //default
    engine = "text-davinci-edit-001";




  }else if(job == "search"){
    document.getElementById('engine_options').innerHTML=engine_id_html;
    document.getElementById("prompt").placeholder = `Text: Mickey Mouse is an American animated cartoon character co-created in 1928 by Walt Disney. 
Look For: cartoon`;
    document.getElementById("prompt").value = `Text: Mickey Mouse is an American animated cartoon character co-created in 1928 by Walt Disney. 
Look For: cartoon`;



  }else if(job == "parse_data"){
    job = "completions";
    document.getElementById('engine_options').innerHTML = engine_html;
    document.getElementById("prompt").placeholder = "Type prompt...";
    document.getElementById("engines").value = "text-curie-001"; //default
    document.getElementById("prompt").value = `A table summarizing the fruits from Goocrux:

There are many fruits that were found on the recently discovered planet Goocrux. There are neoskizzles that grow there, which are purple and taste like candy. There are also loheckles, which are a grayish blue fruit and are very tart, a little bit like a lemon. Pounits are a bright green color and are more savory than sweet. There are also plenty of loopnovas which are a neon pink flavor and taste like cotton candy. Finally, there are fruits called glowls, which have a very sour and bitter taste which is acidic and caustic, and a pale orange tinge to them.

| Fruit | Color | Flavor |`;
    engine = "text-curie-001";
  }else if(job == "classification"){
    job = "completions";
    document.getElementById('engine_options').innerHTML = engine_html;
    document.getElementById("prompt").placeholder = "Type prompt...";
    document.getElementById("engines").value = "text-curie-001"; //default
    document.getElementById("prompt").value = `The following is a list of companies and the categories they fall into:

Apple, Facebook, Fedex
    
Apple
Category:`;
    engine = "text-curie-001";
  }else if(job == "Q&A"){
    job = "completions";
    document.getElementById('engine_options').innerHTML = engine_html;
    document.getElementById("prompt").placeholder = "Type prompt...";
    document.getElementById("engines").value = "text-curie-001"; //default
    document.getElementById("prompt").value = `How does a telescope work?`;
    engine = "text-curie-001";
  }else if(job == "chat"){
    job = "completions";
    document.getElementById('engine_options').innerHTML = engine_html;
    document.getElementById("prompt").placeholder = "Type prompt...";
    document.getElementById("engines").value = "text-curie-001"; //default
    document.getElementById("prompt").value = `Hello, who are you?`;
    engine = "text-curie-001";
  }else if(job == "essay_outline"){
    job = "completions";
    document.getElementById('engine_options').innerHTML = engine_html;
    document.getElementById("prompt").placeholder = "Type prompt...";
    document.getElementById("engines").value = "text-curie-001"; //default
    document.getElementById("prompt").value = `Create an outline for an essay about Nikola Tesla and his contributions to technology:`;
    engine = "text-curie-001";
  }else if(job == "restaurant_review"){
    job = "completions";
    document.getElementById('engine_options').innerHTML = engine_html;
    document.getElementById("prompt").placeholder = "Type prompt...";
    document.getElementById("engines").value = "text-curie-001"; //default
    document.getElementById("prompt").value = `Write a restaurant review based on these notes:

Name: The Blue Wharf
Lobster great, noisy, service polite, prices good.

Review:`;
    engine = "text-curie-001";
  }else if(job == "sarcastic_marv"){
    job = "completions";
    document.getElementById('engine_options').innerHTML = engine_html;
    document.getElementById("prompt").placeholder = "Type prompt...";
    document.getElementById("engines").value = "text-curie-001"; //default
    document.getElementById("prompt").value = `hello, who are you?`;
    engine = "text-curie-001";
  }else if(job == "time_complexity"){
    job = "completions";
    document.getElementById('engine_options').innerHTML = engine_html;
    document.getElementById("prompt").placeholder = "Type prompt...";
    document.getElementById("engines").value = "text-curie-001"; //default
    document.getElementById("prompt").value = `def foo(n, k):
accum = 0
for i in range(n):
    for l in range(k):
        accum += i
return accum
"""
The time complexity of this function is`;
    engine = "text-curie-001";
  }
}

function submit(){
  if(submitted_text == ""){
    bearText("Please input a prompt.");
    return;
  }else if(job == "completions"){
    completions();

  }else if(job == "edits"){
    var index = submitted_text.search(/input:/i);
    var index2 = submitted_text.search(/instruction:/i);
    if(index < 0 || index2 < 0){
      bearText("Must provide input and instruction in the box, like the following.");
      bearText("Input: What day of the week is it?");
      bearText("Instruction: Fix the spelling mistakes.");
      return;
    }
    if(index < index2){ //Input before instruction
      var input = submitted_text.substring((index+6),index2);
      var instruction = submitted_text.substring((index2+12));

    }else{
      var instruction = submitted_text.substring((index2+12),index);
      var input = submitted_text.substring((index+6));
    }


    edits(input,instruction);

  }else if(job == "search"){
    var index = submitted_text.search(/Text:/i);
    var index2 = submitted_text.search(/Look For:/i);
    if(index < 0 || index2 < 0){
      bearText("Must provide text and instruction in the box, like the following.");
      bearText("Text: Mickey Mouse is an American animated cartoon character co-created in 1928 by Walt Disney.");
      bearText("Look For: cartoon");
      return;
    }
    if(index < index2){ //Input before instruction
      var input = submitted_text.substring((index+5),index2);
      var instruction = submitted_text.substring((index2+9));

    }else{
      var instruction = submitted_text.substring((index2+9),index);
      var input = submitted_text.substring((index+5));
    }


    console.log(input)
    console.log(instruction)
    search(input,instruction);

  }



}

async function completions(){
  var apiKey = document.getElementById("apiKey").value;
  
  if(document.getElementById("jobs").value == "Q&A"){
    submitted_text = `I am a highly intelligent question answering bot. If you ask me a question that is rooted in truth, I will give you the answer. If you ask me a question that is nonsense, trickery, or has no clear answer, I will respond with "Unknown".

Q: What is human life expectancy in the United States?
A: Human life expectancy in the United States is 78 years.

Q: Who was president of the United States in 1955?
A: Dwight D. Eisenhower was president of the United States in 1955.

Q: Which party did he belong to?
A: He belonged to the Republican Party.

Q: What is the square root of banana?
A: Unknown

Q: How does a telescope work?
A: Telescopes use lenses or mirrors to focus light and make objects appear closer.

Q: Where were the 1992 Olympics held?
A: The 1992 Olympics were held in Barcelona, Spain.

Q: How many squigs are in a bonk?
A: Unknown

Q: `+submitted_text+`
A:`
  }else if(document.getElementById("jobs").value == "chat"){
    submitted_text = `The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly.

Human: Hello, who are you?
AI: I am an AI created by OpenAI. How can I help you today?
Human: `+submitted_text+`
AI: `
  }else if(document.getElementById("jobs").value == "sarcastic_marv"){
    submitted_text = `Marv is a chatbot that reluctantly answers questions with sarcastic responses:

You: `+submitted_text+`
Marv: `
  }

  const data = {
    prompt: submitted_text,
    temperature: 0.5,
    max_tokens: 100,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
   };
  
   document.getElementById("Beartyping").style.display = "table";

    await fetch("https://api.openai.com/v1/engines/"+engine+"/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + apiKey,
        },
        body: JSON.stringify(data),
       }).then(response => response.json())
       .then(data => {
        if(document.getElementById("jobs").value == "sarcastic_marv"){
          if(data["choices"][0].text.lastIndexOf("Marv:") >= 0){
            console.log(data["choices"][0].text.lastIndexOf("Marv:"))
            console.log(data["choices"][0].text)
            data["choices"][0].text = data["choices"][0].text.substring(data["choices"][0].text.lastIndexOf("Marv:")+5);
            console.log(data["choices"][0].text)
          }
        }
         bearText(data["choices"][0].text.replace(/\n\n/g, "<br>") + "<br>("+engine+","+document.getElementById("jobs").value+")");
         document.getElementById("Beartyping").style.display = "none";
        })
       .catch((error) => {
        bearText("I was unable to find my brain. Please ask OpenAi where it went. (Api Key?)");
        bearText("Make sure you use the proper engine for corresponding jobs - ex ada will not works for edits but code-davinci-edit-001 will");
        bearText("My intuition says its has something to do with " + error)
        document.getElementById("Beartyping").style.display = "none";

      });
}

async function edits(Inputs,Instructions){
  var apiKey = document.getElementById("apiKey").value;




  const data = {
    input: Inputs,
    instruction:Instructions,

   };

  document.getElementById("Beartyping").style.display = "table";
    await fetch("https://api.openai.com/v1/engines/"+engine+"/edits", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + apiKey,
        },
        body: JSON.stringify(data),
       }).then(response => response.json())
       .then(data => {bearText(data["choices"][0].text + "<br>("+engine+","+job+")");document.getElementById("Beartyping").style.display = "none";})
       .catch((error) => {
        bearText("I was unable to find my brain. Please ask OpenAi where it went. (Api Key?)");
        bearText("My intuition says its has something to do with " + error)
        bearText("Make sure you use the proper engine for corresponding jobs - ex: ada will not work for edits but code-davinci-edit-001 will");
        document.getElementById("Beartyping").style.display = "none";
      });
}

async function search(Inputs,Instructions){
  var apiKey = document.getElementById("apiKey").value;
  const instr = [Instructions]


  const data = {
    documents: instr,
    query:Inputs,

   };

  document.getElementById("Beartyping").style.display = "table";
    await fetch("https://api.openai.com/v1/engines/"+engine+"/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + apiKey,
        },
        body: JSON.stringify(data),
       }).then(response => response.json())
       .then(data => {bearText("Similarity Score [0-300] was found to be "+data["data"][0].score + "<br>("+engine+","+job+")");document.getElementById("Beartyping").style.display = "none";})
       .catch((error) => {
        bearText("I was unable to find my brain. Please ask OpenAi where it went. (Api Key?)");
        bearText("My intuition says its has something to do with " + error)
        bearText("Make sure you use the proper engine for corresponding jobs - ex: ada will not work for edits but code-davinci-edit-001 will");
        document.getElementById("Beartyping").style.display = "none";
      });
}

function userText(){
  var promptValue = document.getElementById("prompt").value.replace(/(?:\r\n|\r|\n)/g, '<br>');

  document.getElementById("new_txt_msg").innerHTML += ` <div class='right-align'>
  <div class='msg_user'>` 
  +promptValue +
  `</div>
  </div>`

  submitted_text = promptValue;
  document.getElementById("prompt").value = "";
}

function bearText(msg){
  console.log(msg);
  if(msg.indexOf("<br>") == 0){
    msg = msg.substring(4);
  }
  document.getElementById("new_txt_msg").innerHTML += `<div class="msg_bear">` 
  +msg +
  ` </div>`

}

async function getEngines(){ //Get list of engines from API and display as select options
  var apiKey = document.getElementById("apiKey").value;
  await fetch("https://api.openai.com/v1/engines", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + apiKey,
    },
   }).then(response => response.json())
   .then(data => {
     try{
      console.log(data.error.message)

     }catch{

     }

     
     var EngineKeys = Object.keys(data["data"])
     EngineKeys.forEach(element => {
       if( data["data"][element]["id"] == "text-curie-001"){
        engine_html += "<option value= 'text-curie-001' selected='selected'>text-curie-001</option>"

       }else{
        engine_html += "<option value='"+data["data"][element]["id"]+"'>"+data["data"][element]["id"]+"</option>"

       }
    });
   });
   engine_html += "</select>"
   check_job()


   
}


window.onload = function(){


  $.ajax({ //Get api key from server (to avoid OpenAi from detecting and changing api key)
    type: 'GET',
    url: 'https://users.encs.concordia.ca/~a_chhuon/openai.php',  

    })
    .done( function( data ) {

      document.getElementById("apiKey").value = data;
      getEngines()


    })
 }

/*
Note: For HTTP errors we can check the response. ok property to see if the request failed and reject the promise ourselves by calling return Promise
*/