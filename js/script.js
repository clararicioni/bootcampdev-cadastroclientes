$(document).ready(function () {
    $("#inputCep").mask("99999-999");

    function limpa_form() {
        $("#inputName").val("");
        $("#inputSurname").val("");
        $("#inputCep").val("");
        $("#inputAddress").val("");
        $("#inputDistrict").val("");
        $("#inputCity").val("");
        $("#inputState").val("");
        $("#inputNumber").val("");
    }
    function limpa_cep(){
        $("#inputCep").val("");
        $("#inputAddress").val("");
        $("#inputDistrict").val("");
        $("#inputCity").val("");
        $("#inputState").val("");
        $("#inputNumber").val("");
    }
    function block_number(){
        $("#inputNumber").prop("disabled", true);
    }

    $("#inputCep").blur(function () {
        var cep = $(this).val().replace(/\D/g, '');
        if (cep !== "") {
            var validacep = /^[0-9]{8}$/;
            if (validacep.test(cep)) {
                $("#inputAddress, #inputDistrict, #inputCity, #inputState").val("...");
                $.getJSON("https://viacep.com.br/ws/" + cep + "/json/?callback=?", function (dados) {
                    if (!("erro" in dados)) {
                        $("#inputAddress").val(dados.logradouro);
                        $("#inputDistrict").val(dados.bairro);
                        $("#inputCity").val(dados.localidade);
                        $("#inputState").val(dados.uf);
                        $("#inputNumber").prop("disabled", false);
                    } else {
                        limpa_cep();
                        alert("CEP não encontrado.");
                    }
                });
            }
        } else {
            limpa_form();
        }
    });

    var customers = [];

    function save() {
        var customer = {
            id: customers.length + 1,
            name: $("#inputName").val(),
            surname: $("#inputSurname").val(),
            cep: $("#inputCep").val(),
            address: $("#inputAddress").val(),
            number: $("#inputNumber").val(),
            district: $("#inputDistrict").val(),
            city: $("#inputCity").val(),
            state: $("#inputState").val()
        };

        customers.push(customer);
        addNewRow(customer);
        limpa_form();
        block_number();
    }

    function addNewRow(customer) {
        var table = document.getElementById("customersTable");
        var newRow = table.insertRow();

        newRow.insertCell(0).appendChild(document.createTextNode(customer.id));
        newRow.insertCell(1).appendChild(document.createTextNode(customer.name + " " + customer.surname));
        newRow.insertCell(2).appendChild(document.createTextNode(customer.address + ", " + customer.number));
        newRow.insertCell(3).appendChild(document.createTextNode(customer.cep));
        newRow.insertCell(4).appendChild(document.createTextNode(customer.district));
        newRow.insertCell(5).appendChild(document.createTextNode(customer.city));
        newRow.insertCell(6).appendChild(document.createTextNode(customer.state));
    }

    window.save = save;
});
