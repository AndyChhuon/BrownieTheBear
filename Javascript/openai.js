

var engine_html ="<select name='engines' id='engines' class='short_list'  onchange = 'engine=this.value'>";
var job = "completions"
var engine = "text-curie-001"
var submitted_text = ""; //Most recent prompt by user

function check_job(){
  job = document.getElementById("jobs").value;
  console.log(job)
  if(job == "completions"){
    document.getElementById("prompt").placeholder = "Type prompt...";
    document.getElementById("engines").value = "text-curie-001"; //default
    engine = "text-curie-001";

  }else if(job == "edits"){
    document.getElementById("prompt").placeholder = `Input: What day of the wek is it? 
Instruction: Fix the spelling mistakes.`;
    document.getElementById("prompt").value = `Input: What day of the wek is it? 
Instruction: Fix the spelling mistakes.`;
    document.getElementById("engines").value = "text-davinci-edit-001"; //default
    engine = "text-davinci-edit-001";



  }else if(job == "search"){
    document.getElementById("prompt").placeholder = `Text: Mickey Mouse is an American animated cartoon character co-created in 1928 by Walt Disney. 
LookFor: cartoon`;
    document.getElementById("prompt").value = `Input: What day of the wek is it? 
Instruction: Fix the spelling mistakes.`;
    document.getElementById("engines").value = "text-davinci-edit-001"; //default
    engine = "text-davinci-edit-001";



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


    console.log(input)
    console.log(instruction)
    edits(input,instruction);

  }else if(job == "search"){
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


    console.log(input)
    console.log(instruction)
    edits(input,instruction);

  }



}

async function completions(){
  var apiKey = document.getElementById("apiKey").value;


  const data = {
    prompt: submitted_text,
    temperature: 0.5,
    max_tokens: 64,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
   };
  
   document.getElementById("Beartyping").style.display = "table";
   console.log()

    await fetch("https://api.openai.com/v1/engines/"+engine+"/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + apiKey,
        },
        body: JSON.stringify(data),
       }).then(response => response.json())
       .then(data => {bearText(data["choices"][0].text + "<br>("+engine+","+job+")"); document.getElementById("Beartyping").style.display = "none";})
       .catch((error) => {
        bearText("I was unable to find my brain. Please ask OpenAi where it went. (Api Key?)");
        bearText("Make sure you use the proper engine for corresponding jobs - ex ada will not works for edits but code-davinci-edit-001 will");
        bearText("My intuition says its has something to do with " + error)
        document.getElementById("Beartyping").style.display = "none";

      });
}

async function edits(Inputs,Instructions){
  var apiKey = document.getElementById("apiKey").value;
  console.log(apiKey)
  console.log(engine)



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

function userText(){
  var promptValue = document.getElementById("prompt").value;

  document.getElementById("new_txt_msg").innerHTML += ` <div class='right-align'>
  <div class='msg_user'>` 
  +promptValue +
  ` </div>
  </div>`

  submitted_text = promptValue;
  document.getElementById("prompt").value = "";
}

function bearText(msg){

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
   document.getElementById('engine_options').innerHTML = engine_html;


   
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