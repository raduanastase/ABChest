/**
 * Created by Radu Anastase on 9/20/2015.
 */
$(function () {

    var $window = $(window),
        $loader = $("#loader"),
        $directions = $("#directions"),
        $symbol = $("#symbol"),
        $pictureContainers = $(".picture-container"),
        $pictures = $(".picture"),
        $languageSwitch = $("#language-switch"),
        $langRo = $('.lang-ro'),
        $langEn = $('.lang-en'),
        lastChar = null;

    init();

    function init() {
        arrangeElements();

        $loader.fadeOut("slow");

        $pictureContainers.hide();
        $pictures.hide();
        $langEn.hide();

        $window.on("keydown", onKeyPressed);
        $window.on('resize', onWindowResize);
        $languageSwitch.on('change', onLanguageSwitchChange);
    }

    function arrangeElements() {
        $directions.css({
            top: $window.height() / 2 - $directions.outerHeight() / 2,
            left: $window.width() / 2 - $directions.outerWidth() / 2
        });
    }

    function onWindowResize() {
        arrangeElements();
    }

    function onLanguageSwitchChange() {
        var isRo = $languageSwitch.is(':checked');
        if(isRo) {
            $langRo.show();
            $langEn.hide();
        } else {
            $langRo.hide();
            $langEn.show();
        }
    }

    function onKeyPressed(e) {
        var key = e.keyCode,
            char,
            $currentContainer,
            $currentPicture;

        $directions.hide();

        if ((key >= 48 && key <= 90) || (key >= 96 && key <= 105)) {
            if (lastChar && SoundMap[lastChar]) SoundMap[lastChar].stop();

            char = String.fromCharCode((96 <= key && key <= 105) ? key - 48 : key);

            if(SoundMap[char]) SoundMap[char].play();

            lastChar = char;
            $pictureContainers.hide();
            $pictures.hide();
            $currentContainer = $("#picture-container" + char);
            $currentPicture = $($currentContainer.children()[randomBetween(0, $currentContainer.children().size() - 1)]);
            $currentPicture.show();
            $currentContainer.show();
            $symbol.css({color: getRandomColor()});
            $symbol.text(char);
        } else {
            e.preventDefault();
        }
    }

    function getRandomColor() {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    function randomBetween(a, b) {
        return Math.floor(Math.random() * (b - a + 1) + a);
    }
});
