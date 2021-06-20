var selectedElement;
var table;
$(document).ready(function(){
    table = $('#addressBook')
        .DataTable({
            searching: false,
            bInfo : false,
            paging: false,
            select: true,
            destroy: true,
            "bSort" : false,
            ajax: {
                "url": "/dev/API/addressBook/all",
                "type":"GET",
                "dataSrc": ""
            },
            columns: [
                { data: "ID" },
                { data: "Name" },
                { data: "Company" },
                { data: "Address" },
                { data: "PhoneNumber" },
                { data: "EmailAddress" },
                { data: "Notes" }
            ]
        });
    

    $('#addressBook tbody').on( 'click', 'tr', function () {
        if ( $(this).hasClass('selected') ) {
            $(this).removeClass('selected');
        }
        else {
            table.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
            var selectedItem = $('tr.selected').children();
            selectedElement = {
                "ID": selectedItem[0].innerHTML,
                "Name": selectedItem[1].innerHTML,
                "Company": selectedItem[2].innerHTML,
                "Address": selectedItem[3].innerHTML,
                "PhoneNumber": selectedItem[4].innerHTML,
                "Email": selectedItem[5].innerHTML,
                "Notes": selectedItem[6].innerHTML 
            }
        }
    } );

    $("#submitAdd").on("click", function(){
        $.ajax({
            type: "POST",
            url: "/dev/API/addressBook/add",
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({
                Name: $("input[name='addName']").val(),
                Company: $("input[name='addCompany']").val(),
                Address: $("input[name='addAddress']").val(),
                PhoneNumber: $("input[name='addPhoneNumber']").val(),
                Email: $("input[name='addEmailAddress']").val(),
                Notes: $("input[name='addNotes']").val()
            }),
            success: function(){
                reloadTable();
            },
            error: function(jqXHR, textStatus, errorThrown) {
                var errmsg = JSON.parse(jqXHR.responseText);
                handleError(errmsg["err"]);
            }
        });
        $("#addPopup").modal("hide");
    });

    $("#closeAdd").on("click", function(){
        $("#addPopup").css("display", "none");
    });

    $(".editBtn").on("click", function(){
        if(selectedElement == undefined){
            selectContact();
        } else {
            $("#editPopup input[name='editName']").val(selectedElement["Name"]);
            $("#editPopup input[name='editCompany']").val(selectedElement["Company"]);
            $("#editPopup input[name='editAddress']").val(selectedElement["Address"]);
            $("#editPopup input[name='editPhoneNumber']").val(selectedElement["PhoneNumber"]);
            $("#editPopup input[name='editEmailAddress']").val(selectedElement["Email"]);
            $("#editPopup input[name='editNotes']").val(selectedElement["Notes"]);
            $("#editPopup").modal("show")
        }
    });

    $("#closeEdit").on("click", function(){
        $("#editPopup").css("display", "none");
    });

    $("#submitEdit").on("click", function(){
        $.ajax({
            type: "PUT",
            url: `/dev/API/addressBook/edit?id=${selectedElement["ID"]}`,
            datatype: "json",
            contentType: 'application/json',
            data: JSON.stringify({
                Name: $("input[name='editName']").val(),
                Company: $("input[name='editCompany']").val(),
                Address: $("input[name='editAddress']").val(),
                PhoneNumber: $("input[name='editPhoneNumber']").val(),
                Email: $("input[name='editEmailAddress']").val(),
                Notes: $("input[name='editNotes']").val()
            }),
            success: function(){
                reloadTable();
            },
            error: function(jqXHR, textStatus, errorThrown) {
                var errmsg = JSON.parse(jqXHR.responseText);
                handleError(errmsg["err"]);
            }
        });
        $("#editPopup").modal("hide");
    });

    $(".deleteBtn").on("click", function(){
        if(selectedElement == undefined){
            selectContact();
        } else {
            $("#deletePopup").modal("show")
        }
    });

    $(".searchBtn").on("click", function(){
        $(".popup-search").show();
    });

    $("#submitDelete").on("click", function(){
        $.ajax({
            type: "DELETE",
            url: `/dev/API/addressBook/delete?id=${selectedElement["ID"]}`,
            success: function(){
                reloadTable();
            },
            error: function(jqXHR, textStatus, errorThrown) {
                var errmsg = JSON.parse(jqXHR.responseText);
                handleError(errmsg["err"]);
            }
        });
        $("#deletePopup").modal("hide")
    });

    function selectContact(){
        $(".errorMsg").text("*Please select a contact");
        $(".errorMsg").css("display", "block");
        setTimeout(function(){
            $(".errorMsg").css("display", "none");
        }, 5000);
    }

    function reloadTable(){
        selectedElement = undefined;
        table.ajax.reload();
    }

    function handleError(msg) {
        $(".errorMsg").text("*" + msg);
        $(".errorMsg").css("display", "block");
        setTimeout(function(){
            $(".errorMsg").css("display", "none");
        }, 10000);
    }

    // add red * to every required label
    $("input:required").each(function(){ 
        var inputName = $(this).attr("name");
        var label = $(this).parent().find("label[for=" + inputName + "]");
        label.html("<span style='color: red'>*</span>" + label.html());
    })
});

$(document).mouseup(function(e){
    var container = $(".popup-search");
    if (!container.is(e.target) && container.has(e.target).length === 0){
        container.hide();
    }
});

function search(){
    var keyword = $("#searchBar").val();
    table.ajax.url(`/dev/API/addressBook/contact?search=${keyword}`).load();
}