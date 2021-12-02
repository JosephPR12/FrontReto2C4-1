function getUser(params) {
        $.ajax({
            //url:"http://168.138.247.22:80/api/user/all",
            url: "http://localhost:8081/api/user/all",
            type: "GET",
            datatype: "JSON",
            success: function (response) {
                console.log(response);
                printListUser(response);
        }
    });
}


function printListUser(response){
    let myTable="<table>"
        myTable+="<tr>";
        myTable+="<td>Identificación</td>";
        myTable+="<td>Nombre</td>";
        myTable+="<td>Dirección</td>";
        myTable+="<td>Teléfono</td>";
        myTable+="<td>Correo</td>";
        myTable+="<td>Contraseña</td>";
        myTable+="<td>Zona</td>";
        myTable+="<td>Tipo</td>";
    "</tr>";

    for(i=0;i<response.length;i++){
    myTable+="<tr>";
        myTable+="<td>" + response[i].identification + "</td>";
        myTable+="<td>" + response[i].name + "</td>";
        myTable+="<td>" + response[i].address + "</td>";
        myTable+="<td>" + response[i].cellPhone + "</td>";
        myTable+="<td>" + response[i].email + "</td>";
        myTable+="<td>" + response[i].password + "</td>";
        myTable+="<td>" + response[i].zone + "</td>";
        myTable+="<td>" + response[i].type + "</td>";
        myTable+='<td><button class = "" onclick="borrar(' + response[i].id + ')">Borrar user!</button></td>';
        myTable+='<td><button class = "" onclick="cargarDatosSkate(' + response[i].id + ')">Editar user!</button></td>';
        myTable+='<td><button class = "" onclick="actualizar(' + response[i].id + ')">Actualizar user!</button></td>';
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#miListaUser").html(myTable);
}

function borrar(idUser) {
    var element = {
        id: idUser
    }

    var dataToSend = JSON.stringify(element)

    $.ajax({
        //url:"http://168.138.247.22:80/api/user/all",
        url: "http://localhost:8081/api/user/" + idUser,
        type: "DELETE",
        datatype: "JSON",
        contentType: "application/JSON",
        data: dataToSend,
        success: function (response) {
            console.log(response);
            $("#miListaUser").empty();

            alert("se ha eliminado correctamente!")
        },

        error:function(jqXHR, textStatus, errorThrown){
            alert("No se elimino correctamente!")
        }
    });
}

function loadData(idUser){
    $.ajax({
        //url:"http://168.138.247.22:80/api/user/all",
        url: "http://localhost:8081/api/user/" + idUser,
        type: "GET",
        datatype: "JSON",
        success: function (response) {
            console.log(response);
            var item = response;

            $("#identificationUser").val(item.identification);
            $("#nameUser").val(item.name);
            $("#addressUser").val(item.address);
            $("#cellPhone").val(item.cellPhone);
            $("#emailUser").val(item.email);
            $("#passwordUser").val(item.password);
            $("#zoneUser").val(item.zone);
            $("#typeUser").val(item.type);
        },
        error: function(jqXHR, textStatus, errorThrown){

        }
    });
}

function updateData(idUser){
    
    if ($("#identificationUser").val().length == 0 || $("#nameUser").val().length == 0 || $("#addressUser").val().length == 0 ||
        $("#cellPhone").val().length == 0 || $("#emailUser").val().length == 0 || $("#passwordUser").val().length == 0 ||
        $("#zoneUser").val().length == 0 || $("#typeUser").val().length == 0) {
        alert("Todos los campos debe estar llenos")
    }else{
        let element = {
            id: idUser,
            identification: $("identificationUser").val(),
            name: $("#nameUser").val(),
            address: $("#addressUser").val(), 
            cellPhone: $("#cellPhone").val(),
            email: $("#emailUser").val(),
            password: $("#passwordUser").val(),
            zone: $("#zoneUser").val(),
            type: $("#typeUser").val()
        }

        console.log(element);
        let dataToSend = JSON.stringify(element);

        $.ajax({
            //url:"http://168.138.247.22:80/api/user/all",
            url: "http://localhost:8081/api/user/update",
            type: "PUT",
            datatype: "JSON",
            contentType: "application/JSON",
            data: datoToSend,

            success: function (response) {
                console.log(response);
                $("#miListaUser").empty();
                getUser();
                alert("Se ha actualizado correctamente")
            },
            error: function(jqHXR, textStatus, errorThrown){
                alert("No se actualizo correctamente!")
            }
        });
    }
}

