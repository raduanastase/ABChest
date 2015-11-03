/**
 * Created by Radu Anastase on 9/20/2015.
 */
$(function () {

    var $loader = $("#loader");
    var $symbol = $("#symbol");
    var $pictureContainers = $(".pictureContainer");
    var $pictures = $(".picture");
	var lastChar = null;

    init();

    function init() {

        $loader.fadeOut("slow");

		$pictureContainers.hide();
        $pictures.hide();
        $(window).on("keydown", onKeyPressed);
    }

    function onKeyPressed(e) {
        var key = e.keyCode;
        var char;
		var $currentContainer;
		var $currentPicture;

        if((key >= 48 && key <=90) || (key >= 96 && key <=105)) {
			if(lastChar) SoundManager[lastChar].stop();

			char = String.fromCharCode((96 <= key && key <= 105)? key-48 : key);

            SoundManager[char].play();
			lastChar = char;
			$pictureContainers.hide();
            $pictures.hide();
			$currentContainer = $("#pictureContainer"+char);
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
        for (var i = 0; i < 6; i++ ) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

	function randomBetween(a, b) {
		return Math.floor(Math.random()*(b-a+1)+a);
	}
});
