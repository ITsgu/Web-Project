const btn = document.querySelectorAll("button.product")
// console.log(btn)
btn.forEach(function(button,CartPage){
    button.addEventListener("click", function(event){{
        var btnItem = event.target /* chọn đúng phần tử */ 
        var product = btnItem.parentElement /* click vào giỏ hàng nó sẽ hiện cái div và  chứa cái button đó(toàn bộ thông tin sản phẩm*/
        var productImg = product.querySelector("img").src /* Lấy link ảnh */
        var productName = product.querySelector("h1").innerText
        var productPrice = product.querySelector("span").innerText

        /*Thêm vào giỏ hàng*/
        addCart(productPrice, productImg, productName)
    }})
})

function addCart(productPrice, productImg, productName){
    //Tạo element, 1 thẻ tr
    var addtr = document.createElement("tr")
    var cartItem = document.querySelectorAll("tbody tr")
    for(var i=0; i<cartItem.length; i++){
        var productT = document.querySelectorAll(".title")
        if(productT[i].innerHTML == productName){
            alert("Sản phẩm của bạn đã có trong giỏ hàng")
            return
        }
    }
    var trcontent = '<tr><td><div class="cart_info"><img src="'+productImg+'"><div><strong><span class="title">'+productName+'</span></strong><br><span class="prices">'+productPrice+'</span><br><span class="cart-delete" style="color:red"> Xoá </span></div></div></td><td><input type="number" value="1" min="1"></td><td>'+productPrice+'</td></tr>'
    addtr.innerHTML = trcontent // Nội dung của nó là trcontent 
    var cartTable = document.querySelector("tbody")
    //console.log(cartTable)

    cartTable.append(addtr) // Thêm thẻ tr vào thẻ table dưới cùng 

    cartTotal()//Tạo 1 hàm, khi thêm sản phẩm thì giỏ hàng đó đồng thời cũng sẽ khởi tạo
    deleteCart()
}


//----------------------------Total Price-------------------------//
// Dùng vòng lặp (vd: có 3 sản phẩm thì có 3 vòng lặp, trong mỗi lần đó lấy giá*số lượng) Bao nhiêu sản phấm có bấy nhiêu vòng lặp
// Tổng tiềng = đơn giá*số lượng

//Tạo 1 hàm, khi thêm sản phẩm thì giỏ hàng đó đồng thời cũng sẽ khởi tạo
function cartTotal(){

    // đầu tiên phải select các thẻ tr trong tbody để tạo vòng lặp
    var cartItem = document.querySelectorAll("tbody tr")
    var totalC = 0   
    //console.log(cartItem.length)
    for(var i=0; i<cartItem.length; i++){
        // Lấy giá*số lượng
        var inputValue = cartItem[i].querySelector("input").value
        //console.log(inputValue)
        var productPrice = cartItem[i].querySelector(".prices").innerHTML
        //console.log(productPrice)
        totalA = inputValue*productPrice*1000
        totalC = totalC + totalA
        //totalD = totalC.toLocaleString('de-DE')
    }

    var cartTotalA = document.querySelector(".total-price span")
    cartTotalA.innerHTML = totalC.toLocaleString('de-DE')
    inputchange()
}

 
//-----------------------Delete Cart------------------------//
function deleteCart(){
    var cartItem = document.querySelectorAll("tbody tr")
    // đầu tiên chọn nút xoá
    for(var i=0; i<cartItem.length; i++){
        var productT = document.querySelectorAll(".cart-delete")
        productT[i].addEventListener("click", function(event){
             var cartDelete = event.target
             var cartitemR = cartDelete.parentElement.parentElement.parentElement.parentElement
             cartitemR.remove()
             cartTotal()
        })
    }
}


//------------------------Tăng hoặc giảm số lượng sản phẩm--------------------//
function inputchange(){
    var cartItem = document.querySelectorAll("tbody tr")
     for(var i=0; i<cartItem.length; i++){
        var inputValue = cartItem[i].querySelector("input")
        inputValue.addEventListener("change", function(){
            cartTotal()
        })
    }

}

//---------------------Nhấp vào icon giỏ hàng sẽ hiện ra trang giỏ hàng---------------------//
const cartSelect = document.querySelector(".fa-solid fa-cart-shopping fa-2sm")
const cartShow = document.querySelector(".fa-solid fa-cart-shopping fa-2sm")
cartShow.addEventListener("click", function(){
    document.querySelector(".header").style.right = "0"
})