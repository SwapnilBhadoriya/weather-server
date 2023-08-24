console.log("Client side javascript file is loaded!");

const weatherForm = document.querySelector("form");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchValue = document.querySelector("input").value;
  messageOne.textContent = "Loading ..";
  messageTwo.textContent = "";
  fetch(
    "http://localhost:3000/weather?address=" + encodeURIComponent(searchValue)
  )
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
        messageTwo.textContent = "";
        console.log(data.error);
      } else {
        messageOne.textContent = data.location;
        messageTwo.textContent = data.foreCastdata;
        console.log(data.location);
        console.log(data.foreCastdata);
      }
    });
});
