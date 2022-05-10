

var engine_html ="<select name='engines' id='engines' class='short_list'>";

async function completions(){
  var apiKey = document.getElementById("apiKey").value;
  var engine = document.getElementById("engine_options").value

  const data = {
    prompt: "Write a poem about a dog wearing skis",
    temperature: 0.5,
    max_tokens: 64,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
   };

    await fetch("https://api.openai.com/v1/engines/"+engine+"/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + apiKey,
        },
        body: JSON.stringify(data),
       }).then(response => response.json())
       .then(data => console.log(data));
}

async function getEngines(){ //Get list of engines from API and display as select options
  var apiKey = document.getElementById("apiKey").value;
  console.log(apiKey)
  await fetch("https://api.openai.com/v1/engines", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + apiKey,
    },
   }).then(response => response.json())
   .then(data => {
     console.log(data)
     var EngineKeys = Object.keys(data["data"])
     EngineKeys.forEach(element => {
      engine_html += "<option value='"+data["data"][element]["id"]+"'>"+data["data"][element]["id"]+"</option>"
    });
   });
   engine_html += "</select>"
   document.getElementById('engine_options').innerHTML = engine_html;


   
}

function change_prompt_height(){

}

window.onload = function(){
  getEngines()
 }

/*
Note: For HTTP errors we can check the response. ok property to see if the request failed and reject the promise ourselves by calling return Promise
*/