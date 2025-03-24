$(document).ready(function () {
    $("#inputCep").mask("99999-999");

    function limpaCampos(campos) {
        campos.forEach(campo => $(campo).val(""));
    }

    function setCamposEndereco(dados = {}) {
        $("#inputAddress").val(dados.logradouro || "");
        $("#inputDistrict").val(dados.bairro || "");
        $("#inputCity").val(dados.localidade || "");
        $("#inputState").val(dados.uf || "");
        $("#inputNumber").prop("disabled", !dados.logradouro);
    }

    $("#inputCep").blur(function () {
        var cep = $(this).val().replace(/\D/g, "");
        $("#cepError").text("");
        
        if (!cep) return limpaCampos(["#inputAddress", "#inputDistrict", "#inputCity", "#inputState", "#inputNumber"]);
        
        if (!/^[0-9]{8}$/.test(cep)) {
            limpaCampos(["#inputCep", "#inputAddress", "#inputDistrict", "#inputCity", "#inputState", "#inputNumber"]);
            return $("#cepError").text("Formato de CEP inválido!");
        }
        
        setCamposEndereco({ logradouro: "...", bairro: "...", localidade: "...", uf: "..." });
        
        $.getJSON(`https://viacep.com.br/ws/${cep}/json/`)
            .done((dados) => {
                if (dados.erro) {
                    showError("CEP não encontrado.");
                    return showUserData({});
                }
                setCamposEndereco(dados);
                clearError();
            })
            .fail(() => {
                showError("Erro ao buscar o CEP. Verifique sua conexão.");
                showUserData({});
            });
    });

    var customers = [];

    function save(event) {
        if (event) event.preventDefault();
        
        if (!$("#inputAddress").val()) {
            return $("#cepError").text("Insira um CEP válido antes de salvar.");
        }
        
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
        limpaCampos(["#inputName", "#inputSurname", "#inputCep", "#inputAddress", "#inputDistrict", "#inputCity", "#inputState", "#inputNumber"]);
        $("#inputNumber").prop("disabled", true);
    }

    function addNewRow(customer) {
        var table = document.getElementById("customersTable");
        var newRow = table.insertRow();

        newRow.insertCell().appendChild(document.createTextNode(customer.id));

        var cellName = newRow.insertCell();
        cellName.appendChild(document.createTextNode(customer.name + " " + customer.surname));

        var cellAddress = newRow.insertCell();
        cellAddress.className = "d-none d-md-table-cell";
        cellAddress.appendChild(document.createTextNode(customer.address + ", " + customer.number));

        var cellCep = newRow.insertCell();
        cellCep.className = "d-none d-md-table-cell";
        cellCep.appendChild(document.createTextNode(customer.cep));

        var cellDistrict = newRow.insertCell();
        cellDistrict.className = "d-none d-md-table-cell";
        cellDistrict.appendChild(document.createTextNode(customer.district));

        var cellCity = newRow.insertCell();
        cellCity.className = "d-none d-md-table-cell";
        cellCity.appendChild(document.createTextNode(customer.city));

        var cellState = newRow.insertCell();
        cellState.className = "d-none d-md-table-cell";
        cellState.appendChild(document.createTextNode(customer.state));
    }

    function showUserData(data) {
        setCamposEndereco(data);
    }

    function showError(message) {
        $("#cepError").text(message);
    }

    function clearError() {
        $("#cepError").text("");
    }

    window.save = save;
});
