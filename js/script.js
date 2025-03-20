$(document).ready(function () {

    function limpa_formulário_cep() {
        $("#inputAddress").val("");
        $("#inputDistrict").val("");
        $("#inputCity").val("");
        $("#inputState").val("");
    }
    $("#inputCep").blur(function () {
        var cep = $(this).val().replace(/\D/g, '');

        if (cep != "") {
            var validacep = /^[0-9]{8}$/;

            if (validacep.test(cep)) {
                $("#inputAddress").val("...");
                $("#inputDistrict").val("...");
                $("#inputCity").val("...");
                $("#inputState").val("...");
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
