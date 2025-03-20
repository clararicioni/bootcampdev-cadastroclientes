$(document).ready(function() {

    function limpa_formulário_cep() {
        $("#inputAddress").val("");
        $("#inputDistrict").val("");
        $("#inputCity").val("");
        $("#inputState").val("");
    }
    $("#inputCep").blur(function() {
        var cep = $(this).val().replace(/\D/g, '');

        if (cep != "") {
            var validacep = /^[0-9]{8}$/;

            if(validacep.test(cep)) {
                $("#inputAddress").val("...");
                $("#inputDistrict").val("...");
                $("#inputCity").val("...");
                $("#inputState").val("...");

                $.getJSON("https://viacep.com.br/ws/"+ cep +"/json/?callback=?", function(dados) {
                    if (!("erro" in dados)) {
                        $("#inputAddress").val(dados.logradouro);
                        $("#inputDistrict").val(dados.bairro);
                        $("#inputCity").val(dados.localidade);
                        $("#inputState").val(dados.uf);

                        $("#inputNumber").prop("disabled", false).attr("required", true);
                    } 
                    else {
                        limpa_formulário_cep();
                        alert("CEP não encontrado.");
                    }
                });
            } 
            else {
                limpa_formulário_cep();
                alert("Formato de CEP inválido.");
            }
        } 
        else {
            limpa_formulário_cep();
        }
    });
});
