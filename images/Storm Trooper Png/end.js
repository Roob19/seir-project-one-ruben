$(function () {
    $("#k").autocomplete({
         minLength: 2,
         source: '/suggest.html',
         close: function(event, ui) {
        	 if($("#k").val() != ""){
        		search(document.keyForm);
        	 }
         }
    });

    $("#k").focus();
 

 
});

var showcategory = document.getElementById("showcategory");
var idcategory = document.getElementById("idcategory");

showcategory.onclick = function(e){
e = e || event; 
e.cancelBubble = true;
idcategory.style.display = "block";
}

var showcategory2 = document.getElementById("showcategory2");
var idcategory2 = document.getElementById("idcategory2");

showcategory2.onclick = function(e){
e = e || event; 
e.cancelBubble = true;
idcategory2.style.display = "block";
}

var showmobilesearchbox = document.getElementById("showmobilesearchbox");
var mobilesearchbox = document.getElementById("mobilesearchbox");

showmobilesearchbox.onclick = function(e){
 
e = e || event; 
e.cancelBubble = true;
mobilesearchbox.style.display = "block";
}
