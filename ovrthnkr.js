var userSelected = 0;
var userInput ="NA";
var form = document.getElementById("input_form");
var text = "NA";
var good = "NA";
var neutral = "NA";
var bad ="NA";
var inputMessage = "NA";

// apiEndPoint to connect with AWS Lamda
const apiEndpoint = 'https://8avnl9cb55.execute-api.us-east-1.amazonaws.com/default/OvrThnkr';


// IMPORTANT
//let user = "get molested";    // GET USER INPUT FROM TEXT BOX
let input1 = `I am about to ${userInput} \nGive 3 sentences in the 2nd person with 20 words or less on what may happen in this situation, list them in numerical order. The first one should be a positive outcome in a cheerful, helpful tone, the second should be neutral, and the last should be a negative outcome in an hostile, sarcastic tone. Only include the sentences and 3 lines`;
let input2 = `What if I ${userInput} \nGive 3 sentences in the 2nd person with 20 words or less on what may happen in this situation. The first one should be a positive outcome in a cheerful, helpful tone, the second should be neutral, and the last should be a negative outcome in an hostile, sarcastic tone. Only include the sentences and 3 lines`;
let input3 = `I feel ${userInput} \nGive 3 sentences in the 2nd person with 20 words or less on what may happen in this situation. The first one should be a positive outcome in a cheerful, helpful tone, the second should be neutral, and the last should be a negative outcome in an hostile, sarcastic tone. Only include the sentences and 3 lines`;

// Test Cases
//let message = "I am thinking about getting an unplanned pregnancy.\nGive 3 responses in the 2nd person with 20 words or less on what may happen in this situation. The first one should be a positive outcome in a cheerful, helpful tone, the second should be neutral, and the last should be a negative outcome in an hostile, sarcastic tone. Only include the sentences";
//let message2 = "I am about to ask out a stranger.\nGive 3 responses in the 2nd person with 20 words or less on what may happen in this situation. The first one should be a positive outcome in a cheerful, helpful tone, the second should be neutral, and the last should be a negative outcome in an hostile, sarcastic tone. Only include the sentences";
//let message3 = "I am about to embarrassed myself.\nGive 3 responses in the 2nd person with 20 words or less on what may happen in this situation. The first one should be a positive outcome in a cheerful, helpful tone, the second should be neutral, and the last should be a negative outcome in an hostile, sarcastic tone. Only include the sentences";
//let message4 = "I am about to ask out my crush.\nGive 3 responses in the 2nd person with 20 words or less on what may happen in this situation. The first one should be a positive outcome in a cheerful, helpful tone, the second should be neutral, and the last should be a negative outcome in an hostile, sarcastic tone. Only include the sentences"

// CALL THIS WITH INPUT
//fetchData(input);

async function fetchData(message) {
    try {
      userInput = message;
      if (userSelected == 1) {
        inputMessage = `I am about to ${userInput} \nGive 3 sentences in the 2nd person with 20 words or less on what may happen in this situation. The first one should be a positive outcome in a cheerful, helpful tone, the second should be neutral, and the last should be a negative outcome in an hostile, sarcastic tone. Only include the sentences and 3 lines`;
      } else if (userSelected == 2) {
        inputMessage = `What if I ${userInput} \nGive 3 sentences in the 2nd person with 20 words or less on what may happen in this situation. The first one should be a positive outcome in a cheerful, helpful tone, the second should be neutral, and the last should be a negative outcome in an hostile, sarcastic tone. Only include the sentences and 3 lines`;
      } else if (userSelected == 3) {
        inputMessage = `I am feeling ${userInput} \nGive 3 sentences in the 2nd person with 20 words or less on what may happen in this situation. The first one should be a positive outcome in a cheerful, helpful tone, the second should be neutral, and the last should be a negative outcome in an hostile, sarcastic tone. Only include the sentences and 3 lines`;
      }
        const response = await fetch(apiEndpoint, {
            method: "POST",
            //body: JSON.stringify({"Text": `I am about to ${message} \nGive 3 sentences in the 2nd person with 20 words or less on what may happen in this situation. The first one should be a positive outcome in a cheerful, helpful tone, the second should be neutral, and the last should be a negative outcome in an hostile, sarcastic tone. Only include the sentences and 3 lines` })
            body: JSON.stringify({"Text": inputMessage})
          });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.text();
        console.log(data);
        text = data.split("\n");
        console.log(text);

        good = text[2].split(". ")[1];
        neutral = text[3].split(". ")[1];
        bad = text[4].split(". ")[1];
        // document.getElementById("goodmessage").innerHTML = good;
        // document.getElementById("neutralmessage").innerHTML = neutral;
        // document.getElementById("badmessage").innerHTML = bad;

        // For visual, adjust label according to variables.
        // console.log(text);
        console.log(good);
        console.log(neutral);
        console.log(bad);
        return [good, neutral, bad];

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function setSelected(selection) {
  if (selection == 1) {
    document.getElementById("input_label").innerHTML = "I'm about to...";
    userSelected = 1;
  }
  else if (selection == 2) {
    document.getElementById("input_label").innerHTML = "What if I...";
    userSelected = 2;
  }
  else if (selection == 3) {
    document.getElementById("input_label").innerHTML = "I am feeling...";
    userSelected = 3;
  }

  document.getElementById("startingpage").style.display = "none";
  document.getElementById("input_form").style.opacity = "100%";

  document.getElementById("promptingpage").style.display = "block";
  document.getElementById("promptimages").style.display = "block";
  document.getElementById("homebutton").style.opacity = "100%";
}

async function setInput() {
  userInput = document.getElementById("input_field").value;
  // const result = await fetchData(userInput).then(
  //   (data) => {
  //     console.log(data);
  //   }
  // )
  const result = await fetchData(userInput);

  good = await result[0];
  neutral = await result[1];
  bad = await result[2];

  document.getElementById("promptingpage").style.display = "none";

  console.log("--------------");
  console.log(good);
  console.log(neutral);
  console.log(bad);



  document.getElementById("resultspage").style.display = "block";
  document.getElementById("goodmessage").innerHTML = result[0];
  document.getElementById("neutralmessage").innerHTML = result[1];
  document.getElementById("badmessage").innerHTML = result[2];
}


