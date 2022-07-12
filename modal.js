$(document).ready(function () {
  var data = [];
  $.getJSON("js/Data.json", function (items) {
    // console.log(items);
    data = items;
    displayImages(data);

    console.log(data);
  });

  // Modal Content
  $(document).on("click", ".product-item__btn", function () {
    let id = $(this).data("id");
    let product = data.filter((ele) => ele.id == id);
    setModal(product[0]);
    $("#myModal").modal("show");
  });

  //Show more detail when Click on a product
  $("input[type=checkbox]").click(function () {
    let cats = $("#Check-Handi:checked")
      .map(function () {
        return $(this).val();
      })
      .toArray()
      .toString();
    let subdata =
      cats.length == 0
        ? data
        : data.filter((item) => cats.search(item.cat) >= 0);
    displayImages(subdata);
  });
});

//Dislay product image and detail
function displayImages(items) {
  let s = ``;
  $.each(items, function (k, v) {
    s += `<div class="product-item1">
    <figure><img src="./image/${v.pic}" alt="" class="product-image"></figure>
          <p class="product-item__name">Product name: ${v.name}</p>
          <p class="product-item__name">Product price: ${v.price} $</p>
          <p class="product-item__name">Category: ${v.cat}</p>
  
          <span class="product-item__btn" data-id="${v.id}">More</span>
    </div>`;
  });
  $("#products").html(s);

  // search keywords
  $("#search").keyup(function () {
    $("#products").html("");
    var searchField = $("#search").val();
    var expression = new RegExp(searchField, "i");
    $.getJSON("js/Data.json", function (data) {
      $.each(data, function (key, value) {
        if (value.name.search(expression) != -1) {
          $("#products").append(`
          <div class="product-item1">
    <figure><img src="./image/${value.pic}" alt="" class="product-image"></figure>
          <p class="product-item__name">Product name: ${value.name}</p>
          <p class="product-item__name">Product price: ${value.price} $</p>
          <p class="product-item__name">Category: ${value.cat}</p>
          
          <span class="product-item__btn" data-id="${value.id}">More</span>
    </div>`);
        }
      });
    });
  });
}

// Modal Content
function setModal(product) {
  let x = `
  <div class="product-item1">
  <img src="./image/${product.pic}" alt="" class="product-img"/>
    </div>
          <div class="">
            <h3 class="modal_product-name"><span class="text_main-color">Product name</span>: ${
              product.name
            }</h3>
            <h5 class="modal_product-price"><span class="text_main-color">Product price: </span> ${
              product.price
            } R</h5>
            <h5 class="modal_product-id"><span class="text_main-color">Product ID: </span> ${product.id.toUpperCase()}</h5>
            <div role="tabpanel" class="tab-pane active" id="description">
              <h5 class="modal_product-desc"> <span class="text_main-color">Description: </span> ${
                product.description
              }</h5>
            </div>
          </div> 
`;
  $(".modal-body").html(x);
}
