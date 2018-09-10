$(document).ready(function () {
	
	var iduser = "";

	function getUsers(){
		$.get('/getusers',function(data){ //гет запит на на базу даних
	    createTable(data,$("#table"));
});

}

//вивід юзера в вигляді таблиці
function createTable(mas,element){
	$(element).empty();
	$("<table>").addClass("table").addClass("table-dark").addClass("table-bordered").appendTo(element);
	for (var i = 0; i< mas.length; i++){
		$("<tr>").addClass("tr").appendTo(".table")
		for (var key in mas[i]){
			$("<td>").addClass("td").appendTo(".tr:last")
			.text(mas[i][key]);
			$(".tr:last .td:first").hide();


		}

		$("<td>").addClass("td").css({
			"width":"50px"
		}).appendTo("tr:last");
		$("<button>").addClass("btn").addClass("btn-danger").appendTo(".td:last").text("Delete")
		.click(function(){
			var id = $(this).parent().parent().children().filter(":first").text();
		    deletUser(id);
			
		});

		$("<td>").addClass("td").css({
			"width":"50px"
		}).appendTo("tr:last");
		$("<button>").addClass("btn").addClass("btn-primary").appendTo(".td:last").text("UpData")
		.click(function(){
			var id = $(this).parent().parent().children().filter(":first").text();
			iduser = id;
			var name = $(this).parent().parent().children().filter(":eq(1)").text();
			$(".name").val(name);
			var age = $(this).parent().parent().children().filter(":eq(2)").text();
			$(".age").val(age);

		    
			
		});


	}

}


//добавлення юзера в базу даних

function addUser(name,age){
var obj = {
	name: name,
	age: age
		 }
    if (!iduser) {
			if (!name  || !age) return;
			$.post('/adduser',obj,function(data){
				console.log(data);
				getUsers();
			});
}
else {
	obj.id = iduser;
	$.post('/updateuser',obj,function(data){
		iduser = "";
		console.log(data);
		getUsers();

});
}

}

//Видалення юзера з базу даних

function deletUser(id){
	var obj = {id:id};
	$.post("/deletuser",obj,function(data){
		console.log(data);
		getUsers();

	});
}




$(".adduser").click(function(){
	addUser($(".name").val(),$(".age").val());
	$(".name").val("");
	$(".age").val("");

})









getUsers();

});