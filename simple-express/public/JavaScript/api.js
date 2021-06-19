// function showMsg() {
//   $.ajax({
//     url: "/api",
//     type: "GET",
//     dataType: "json",
//   })
//     .done(function (data) {
//       console.log(data);
//     })
//     .fail(function () {
//       console.log("error");
//     })
//     .always(function () {
//       console.log("complete jquery ajax");
//     });
// }
// showMsg();
// axios
// axios
//   .get("/api")
//   .then(function (response) {
//     // handle success
//     console.log(response.request.responseText);
//   })
//   .catch(function (error) {
//     // handle error
//     console.log(error);
//   })
//   .then(function () {
//     // always executed
//   });
//fetch
fetch("/api")
  .then(function (response) {
    return response.json();
  })
  .then(function (myJson) {
    console.log(myJson);
  });
