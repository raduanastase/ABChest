/**
 * Created by Radu Anastase on 9/20/2015.
 */
$(function () {

    var $window = $(window),
        $loader = $('#loader'),
        $directions = $('#directions'),
        $symbol = $('#symbol'),
        $pictureContainers = $('.picture-container'),
        $pictures = $('.picture'),
        $switch = $('.switch'),
        $languageSwitch = $('#language-switch'),
        $langRo = $('.lang-ro'),
        $langEn = $('.lang-en'),
        lastChar = null,
        isRo = !$languageSwitch.is(':checked'),
        lang = isRo ? 'ro' : 'en';

    init();

    function init() {
        arrangeElements();

        $loader.fadeOut('slow');

        $pictureContainers.hide();
        $pictures.hide();
        $langEn.hide();

        $window.on('keydown', onKeyPressed);
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
        isRo = !isRo;
        lang = isRo ? 'ro' : 'en';
        if (isRo) {
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
            $currentImagesForLang,
            $currentPicture,
            $currentImagesContainer;

        if ((key >= 48 && key <= 90) || (key >= 96 && key <= 105)) {

            $switch.hide();
            $directions.hide();

            if (lastChar && SoundMap[lang + '-' + lastChar]) SoundMap[lang + '-' + lastChar].stop();

            char = String.fromCharCode((96 <= key && key <= 105) ? key - 48 : key);

            if (SoundMap[lang + '-' + char]) SoundMap[lang + '-' + char].play();

            lastChar = char;
            $pictureContainers.hide();
            $pictures.hide();
            $currentImagesContainer = $('#picture-container' + char);
            $currentImagesForLang = $currentImagesContainer.find('.lang-' + lang);
            $currentPicture = $currentImagesForLang.eq(randomBetween(0, $currentImagesForLang.length - 1));
            $currentPicture.show();
            $currentImagesContainer.show();
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
