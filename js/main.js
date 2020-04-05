/**
 * Created by Radu Anastase on 9/20/2015.
 */
$(window).on('load', function() {

    var $window = $(window),
        $loader = $('#loader'),
        $directions = $('#directions'),
        $symbol = $('#symbol'),
        $pictureContainers = $('.picture-container'),
        $pictures = $('.picture'),
        $labels = $('.label'),
        $switch = $('.switch'),
        $languageSwitch = $('#language-switch'),
        $langRo = $('.lang-ro'),
        $langEn = $('.lang-en'),
        $info = $('#info'),
        $picturesContainer = $('#pictures-container'),
        lastChar = null,
        isRo = !$languageSwitch.is(':checked'),
        lang = isRo ? 'ro' : 'en';

    init();

    function init() {
        $loader.fadeOut('slow');

        $pictureContainers.hide();
        $pictures.hide();
        $labels.hide();
        $langEn.hide();
        $langRo.show();

        $window.on('keydown', onKeyPressed);
        $languageSwitch.on('change', onLanguageSwitchChange);
    }

    function onLanguageSwitchChange() {
        isRo = !isRo;
        lang = isRo ? 'ro' : 'en';
        if (isRo) {
            $langEn.hide();
            $langRo.show();
        } else {
            $langRo.hide();
            $langEn.show();
        }
        $directions.show();
        $symbol.hide();
        $picturesContainer.hide();
    }

    function onKeyPressed(e) {
        var key = e.keyCode,
            char,
            $currentImagesForLang,
            $currentLabelsForLang,
            $currentPicture,
            $currentLabel,
            $currentImagesContainer;

        if ((key >= 48 && key <= 90) || (key >= 96 && key <= 105)) {

            // $switch.hide();
            // $info.hide();
            $directions.hide();
            $symbol.show();
            $picturesContainer.show();

            if (lastChar && SoundMap[lang + '-' + lastChar]) SoundMap[lang + '-' + lastChar].stop();

            char = String.fromCharCode((96 <= key && key <= 105) ? key - 48 : key);

            if (SoundMap[lang + '-' + char]) SoundMap[lang + '-' + char].play();

            lastChar = char;
            $pictureContainers.hide();
            $pictures.hide();
            $labels.hide();
            $currentImagesContainer = $('#picture-container' + char);
            $currentImagesForLang = $currentImagesContainer.find('.lang-' + lang+' .picture');
            $currentLabelsForLang = $currentImagesContainer.find('.lang-' + lang+' .label');
            const imageIndex = randomBetween(0, $currentImagesForLang.length - 1);
            $currentPicture = $currentImagesForLang.eq(imageIndex);
            $currentLabel = $currentLabelsForLang.eq(imageIndex);
            $currentPicture.show();
            $currentLabel.show();
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
