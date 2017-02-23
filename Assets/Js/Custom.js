/**
 * Created by user on 26.01.2017.
 */
$(document).ready(function(){
    function htmlEntities(str) {
        return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    $(function(){

        var menu = $('.menu-navigation-dark');

        menu.slicknav();

        menu.on('click', 'a', function(){
            var a = $(this);
            var aid = $(this).attr('id');
            $('.signup-form-container .page').fadeOut(100);

            a.siblings().removeClass('selected');
            a.addClass('selected');

            $('.signup-form-container div#'+aid+'-page').fadeIn(100);
        });
    });

    $("#CrytoButton").on("click", function(){
        var txt = $("textarea[name='CryptoData']").val();
        if(txt){
            $.post("Controller/Post/Post.php", {suggest: txt, crypto:'crypto'}, function(result){
                var obj = jQuery.parseJSON( result );
                $("input[name='password']").val(obj.password);
                $("textarea[name='DeCryptoData']").val(obj.CrytoData);

                $('.menu-navigation-dark a').removeClass('selected');
                $('#DeCrypto').addClass('selected');

                $('#Crypto-page').fadeOut(100);
                $('#DeCrypto-page').fadeIn(100);

            });
        }else{
            alert('Boş bırakma!!!');
        }
    });

    $("#DeCrytoButton").on("click", function(){

        var txt = $("textarea[name='DeCryptoData']").val();
        if(txt){
            $.post("Controller/Post/Post.php", {crypto:'decrypto', suggest: txt}, function(result){
                $("textarea[name='FinallCryptoData']").val(result);
            });

            $('.menu-navigation-dark a').removeClass('selected');
            $('#Finall').addClass('selected');

            $('#DeCrypto-page').fadeOut(100);
            $('#Finall-page').fadeIn(100);
        }else{
            alert('Boş bırakma!!!');
        }
    });

    $("#DeCrytoButtonJs").on("click", function() {
        var txt = $("textarea[name='DeCryptoData']").val();

        $.post("Controller/Post/Post.php", {crypto:'password'}, function(result){
            var password=result;
            if (txt && password) {
                var Encrypt=JSON.parse(
                    CryptoJS.AES.decrypt(
                        $("textarea[name='DeCryptoData']").val(),
                        password, {
                            format: CryptoJSAesJson
                        }).toString(CryptoJS.enc.Utf8)
                );

                $("textarea[name='FinallCryptoData']").val(Encrypt);

                $('.menu-navigation-dark a').removeClass('selected');
                $('#Finall').addClass('selected');

                $('#DeCrypto-page').fadeOut(100);
                $('#Finall-page').fadeIn(100);


            } else {
                alert('Boş bırakma!!!');
            }
        });

    });

});