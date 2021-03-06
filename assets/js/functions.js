var tAnimation = 400;
loadMainImg();

function main(){
	smoothScroll(tAnimation);
  thumbnails();
	workBelt();
	workLoad();
	clientStuff();
  fullscreenImage();
  parallax();

	$("h1").fitText(1, { minFontSize: '20px', maxFontSize: '72px' });
	$(".biglink").fitText(1, { maxFontSize: '66px'});
	$('textarea').autosize();

}

function loadMainImg(){
  $('html').css('background', 'black');
  $('body').hide();
  loadSprite('assets/img/hero-bg.jpg', function(){
      $('body').fadeIn(800, function(){
        $('html').css('background', 'none');
      });
      main();
  })
}

function parallax(){
  if($(window).width() > 1024){
    var lastPositionPercent = 0;
    var lastPositionPx = 0;

    var wScroll = 0;
    var scrollPercent = 0;
    var scrollPx = 0;

    var lastPosLogo = 0;
    var currentPosLogo = 0;
    var lastPosNav = 0;
    var currentPosNav = 0;

    var lastBlur = 0;
    var currentBlur = 0;

    var parallaxBg = $('header .background-wrapper');
    var parallaxLogo = $('header .content');
    var parallaxNav = $('header nav');

    parallaxBg.css('position', 'fixed');
    $('footer').addClass('parallax-footer');
    $('.spacer').css('display', 'block');

    $(window).scroll(function(){
      wScroll = $(this).scrollTop();
      scrollPercent = Math.floor(wScroll / $(window).height() * 100);
      scrollPx = Math.floor(wScroll);

      if(scrollPercent!=lastPositionPercent){
        if(scrollPercent<120){
          if(lastPositionPercent>=120){
            parallaxBg.show()
          }

          currentBlur = Math.floor(scrollPercent/3);

          if(currentBlur!=lastBlur){
            parallaxBg.css('filter', 'blur('+ currentBlur +'px)');
            parallaxBg.css('-webkit-filter', 'blur('+ currentBlur +'px)');
            lastBlur = currentBlur;
          }
        }
        else {
          if(lastPositionPercent<120) {
            parallaxBg.hide();
          }
        }
        lastPositionPercent = scrollPercent;
      }

      if(scrollPx!=lastPositionPx){

        if(scrollPercent<120){

          currentPosNav = Math.floor(wScroll/1.2);
          currentPosLogo = Math.floor(wScroll/2);

          if(currentPosNav!=lastPosNav){
            parallaxNav.css('transform', 'translate(0, '+ currentPosNav +'px)');
            parallaxNav.css('-webkit-transform', 'translate(0, '+ currentPosNav +'px)');
            lastPosNav = currentPosNav;
          }
          if(currentPosLogo!=lastPosLogo){
            parallaxLogo.css('transform', 'translate(0, '+ currentPosLogo +'px)');
            parallaxLogo.css('-webkit-transform', 'translate(0, '+ currentPosLogo +'px)');
            lastPosLogo = currentPosLogo;
          }
        }
        lastPositionPx = scrollPx;
      }
    });
  }
}

// smoothScroll function is applied from the document ready function
function smoothScroll (duration) {
	$('a[href^="#"]').on('click', function(event) {

	    var target = $( $(this).attr('href') );

	    if( target.length ) {
	        event.preventDefault();
	        $('html, body').animate({
	            scrollTop: target.offset().top
	        }, duration);
	    }
	});
}


function thumbnails(){
  $('.section-work .thumb-container label').hover(
    function(){
      $('.section-work .thumb-container label .thumb-unit:not(".focus")').addClass('grey');
    },
    function(){
      $('.section-work .thumb-container label .thumb-unit').removeClass('grey');
    });
}

function  workLoad() {

  $.ajaxSetup({ cache: true });

  $('.thumb-container label').unbind('click');
  $('.thumb-container label').click(function() {
    var $this = $(this),
        newTitle = $this.find('strong').text(),
        newFolder = $this.find('.thumb-unit').data('folder'),
        spinner = '<div class="loader">Loading...</div>',
        newHTML = 'work/'+ newFolder;

    $('.project-load').html(spinner).load(newHTML);
    $('.project-title').text(newTitle);

    var imgs = $('.project-load img');
    var loaders = [];

    for (img of imgs){
      loaders.push( loadAllSprites( $(img).attr() ));
    }

    $.when.apply(null, loaders).done(function() {
      workBeltShiftLeft();
    });
  });

}

function workBeltShiftLeft(){
  $('.work-belt').addClass("slided");
  showWorkContainer();
  $('html, body').animate({
    scrollTop: $("#work").offset().top
  }, tAnimation);
}

function showWorkContainer(){
  $('.work-container').show(function(){
    hideThumbnails();
  });
}

function hideThumbnails(){
  $('.thumb-container').hide(tAnimation, function(){
    buttonReturn();
  });
}

function buttonReturn() {
  if( $('.project-load').height() >= ($(window).height()*0,9) ){
    $('.work-return-end').show();
    $('.work-return-end').css('display', 'flex');
    $('.work-return-end').css('justify-content', 'flex-start');
    $('.work-return-end').css('align-items', 'center');
  }
  fullscreenImage();
}

function workBelt() {
  $(".trigger").remove();
  $(".return").remove();

  $('.work-return').click(workBeltShiftRight);
}

function workBeltShiftRight(){
  $('.work-belt').removeClass("slided");
  $('.thumb-container').show(tAnimation, hideProject);
  $('html, body').animate({
    scrollTop: $("#work").offset().top
  }, tAnimation);
}

function hideProject(){
  $('.work-container').hide(tAnimation);
  $('.work-return-end').hide();
}

function clientStuff() {

  $('.client-logo, .client-button').click(function() {
    var $this = $(this),
        position = $this.parent().children().index($this);

    $('.client-unit').removeClass('active-client').eq(position).addClass('active-client');
    $('.client-logo').removeClass('active-client').eq(position).addClass('active-client');
    $('.client-button').removeClass('active-client').eq(position).addClass('active-client');
  });


  $('.client-control-next, .client-control-prev').click(function() {

    var $this = $(this),
        curActiveClient = $('.clients-belt').find('.active-client'),
        position = $('.clients-belt').children().index(curActiveClient),
        clientNum = $('.client-unit').length;

      if($this.hasClass('client-control-next')) {

        if(position < clientNum -1){
          $('.active-client').removeClass('active-client').next().addClass('active-client');
        } else {
          $('.client-unit').removeClass('active-client').first().addClass('active-client');
          $('.client-logo').removeClass('active-client').first().addClass('active-client');
          $('.client-button').removeClass('active-client').first().addClass('active-client');
        }

      } else {

        if (position === 0) {
          $('.client-unit').removeClass('active-client').last().addClass('active-client');
          $('.client-logo').removeClass('active-client').last().addClass('active-client');
          $('.client-button').removeClass('active-client').last().addClass('active-client');
        } else {
          $('.active-client').removeClass('active-client').prev().addClass('active-client');
        }

      }


  });

}

(function( $ ){

  $.fn.fitText = function( kompressor, options ) {

    // Setup options
    var compressor = kompressor || 1,
        settings = $.extend({
          'minFontSize' : Number.NEGATIVE_INFINITY,
          'maxFontSize' : Number.POSITIVE_INFINITY
        }, options);

    return this.each(function(){

      // Store the object
      var $this = $(this);

      // Resizer() resizes items based on the object width divided by the compressor * 10
      var resizer = function () {
        $this.css('font-size', Math.max(Math.min($this.width() / (compressor*10), parseFloat(settings.maxFontSize)), parseFloat(settings.minFontSize)));
      };

      // Call once to set.
      resizer();

      // Call on resize. Opera debounces their resize by default.
      $(window).on('resize.fittext orientationchange.fittext', resizer);

    });

  };

})( jQuery );

function fullscreenImage(){
  $(".project-load img").unbind('click');
  $('.project-load img').click(function(){
    var currentImgObj = $(this),
        imgSrc = currentImgObj.attr('src');
    currentImgObj.addClass('active-view');
    $('section.image-view-box img').attr('src', imgSrc);
    $('html').addClass('overlayed');
    $('section.image-view-box').fadeIn();
    document.ontouchmove = function(event){
      event.preventDefault();
    }
    setNavButtonState();
  });

  $("section.image-view-box .icon-cross").unbind('click');
  $('section.image-view-box .icon-cross').click(function(){
    $('section.image-view-box').fadeOut();
    $('html').removeClass('overlayed');
    $('.project-load img.active-view').removeClass('active-view');
    document.ontouchmove = function(event){
      event.default();
    }
  });

  function setNavButtonState(){
    var currentImgObj = $('.project-load img.active-view');
    var prevImgObj = fetchPrev(currentImgObj);
    var nextImgObj = fetchNext(currentImgObj);

    if (prevImgObj === currentImgObj){
      $("section.image-view-box .icon-prev").addClass('button-inactive');
    }
    else {
      $("section.image-view-box .icon-prev").removeClass('button-inactive');
    }

    if (nextImgObj === currentImgObj){
      $("section.image-view-box .icon-next").addClass('button-inactive');
    }
    else {
      $("section.image-view-box .icon-next").removeClass('button-inactive');
    }
  }

  $("section.image-view-box .icon-prev").unbind('click');
  $('section.image-view-box .icon-prev').click(prevImage);

  function prevImage(){
    var currentImgObj = $('.project-load img.active-view');
    var newImgObj = fetchPrev(currentImgObj);
    if ( newImgObj != currentImgObj ) {
      $('#viewbox-large').fadeOut({queue: false, duration: 'fast'}).animate({
        left: '+150%'
      }, tAnimation, function(){
        $('#viewbox-large').attr('src', newImgObj.attr('src'));
        currentImgObj.removeClass('active-view');
        newImgObj.addClass('active-view');
        setNavButtonState();
        $('#viewbox-large').css('left', '-50%');
        $('#viewbox-large').fadeIn({queue: false, duration: tAnimation}).animate({
          left: '50%'
        }, tAnimation);
      });
    }
  }

  function fetchPrev(currentImgObj){
    var allImgObj = $('.project-load p>img:only-child');
    var indexCurrentImg = allImgObj.index(currentImgObj);
    var indexPrevImg = indexCurrentImg-1;

    if(indexPrevImg<0){
      return currentImgObj;
    }
    else {
      var prevImgObj = $(allImgObj[indexPrevImg]);
      console.log(prevImgObj);
      return prevImgObj;
    }
  }

  $("section.image-view-box .icon-next").unbind('click');
  $('section.image-view-box .icon-next').click(nextImage);

  function nextImage(){
    var currentImgObj = $('.project-load img.active-view');
    var newImgObj = fetchNext(currentImgObj);
    if ( newImgObj != currentImgObj ) {
      $('#viewbox-large').fadeOut({queue: false, duration: 'fast'}).animate({
        left: '-50%'
      }, tAnimation, function(){
        $('#viewbox-large').attr('src', newImgObj.attr('src'));
        currentImgObj.removeClass('active-view');
        newImgObj.addClass('active-view');
        setNavButtonState();
        $('#viewbox-large').css('left', '150%');
        $('#viewbox-large').fadeIn({queue: false, duration: tAnimation}).animate({
          left: '50%'
        }, tAnimation);
      });
    }
  }
}

function fetchNext(currentImgObj){
  var allImgObj = $('.project-load p>img:only-child');
  var indexCurrentImg = allImgObj.index(currentImgObj);
  var indexNextImg = indexCurrentImg+1;

  if(indexNextImg>=allImgObj.length){
    return currentImgObj;
  }
  else {
    var nextImgObj = $(allImgObj[indexNextImg]);
    return nextImgObj;
  }
}

function loadSprite(src, callback) {
    var sprite = new Image();
    sprite.onload = callback;
    sprite.src = src;
}


function loadAllSprites(src) {
    var deferred = $.Deferred();
    var sprite = new Image();
    sprite.onload = function() {
        deferred.resolve();
    };
    sprite.src = src;
    return deferred.promise();
}

/*!
	Autosize 1.18.12
	license: MIT
	http://www.jacklmoore.com/autosize
*/
(function ($) {
	var
	defaults = {
		className: 'autosizejs',
		id: 'autosizejs',
		append: '\n',
		callback: false,
		resizeDelay: 10,
		placeholder: true
	},

	// border:0 is unnecessary, but avoids a bug in Firefox on OSX
	copy = '<textarea tabindex="-1" style="position:absolute; top:-999px; left:0; right:auto; bottom:auto; border:0; padding: 0; -moz-box-sizing:content-box; -webkit-box-sizing:content-box; box-sizing:content-box; word-wrap:break-word; height:0 !important; min-height:0 !important; overflow:hidden; transition:none; -webkit-transition:none; -moz-transition:none;"/>',

	// line-height is conditionally included because IE7/IE8/old Opera do not return the correct value.
	typographyStyles = [
		'fontFamily',
		'fontSize',
		'fontWeight',
		'fontStyle',
		'letterSpacing',
		'textTransform',
		'wordSpacing',
		'textIndent',
		'whiteSpace'
	],

	// to keep track which textarea is being mirrored when adjust() is called.
	mirrored,

	// the mirror element, which is used to calculate what size the mirrored element should be.
	mirror = $(copy).data('autosize', true)[0];

	// test that line-height can be accurately copied.
	mirror.style.lineHeight = '99px';
	if ($(mirror).css('lineHeight') === '99px') {
		typographyStyles.push('lineHeight');
	}
	mirror.style.lineHeight = '';

	$.fn.autosize = function (options) {
		if (!this.length) {
			return this;
		}

		options = $.extend({}, defaults, options || {});

		if (mirror.parentNode !== document.body) {
			$(document.body).append(mirror);
		}

		return this.each(function () {
			var
			ta = this,
			$ta = $(ta),
			maxHeight,
			minHeight,
			boxOffset = 0,
			callback = $.isFunction(options.callback),
			originalStyles = {
				height: ta.style.height,
				overflow: ta.style.overflow,
				overflowY: ta.style.overflowY,
				wordWrap: ta.style.wordWrap,
				resize: ta.style.resize
			},
			timeout,
			width = $ta.width(),
			taResize = $ta.css('resize');

			if ($ta.data('autosize')) {
				// exit if autosize has already been applied, or if the textarea is the mirror element.
				return;
			}
			$ta.data('autosize', true);

			if ($ta.css('box-sizing') === 'border-box' || $ta.css('-moz-box-sizing') === 'border-box' || $ta.css('-webkit-box-sizing') === 'border-box'){
				boxOffset = $ta.outerHeight() - $ta.height();
			}

			// IE8 and lower return 'auto', which parses to NaN, if no min-height is set.
			minHeight = Math.max(parseInt($ta.css('minHeight'), 10) - boxOffset || 0, $ta.height());

			$ta.css({
				overflow: 'hidden',
				overflowY: 'hidden',
				wordWrap: 'break-word' // horizontal overflow is hidden, so break-word is necessary for handling words longer than the textarea width
			});

			if (taResize === 'vertical') {
				$ta.css('resize','none');
			} else if (taResize === 'both') {
				$ta.css('resize', 'horizontal');
			}

			// The mirror width must exactly match the textarea width, so using getBoundingClientRect because it doesn't round the sub-pixel value.
			// window.getComputedStyle, getBoundingClientRect returning a width are unsupported, but also unneeded in IE8 and lower.
			function setWidth() {
				var width;
				var style = window.getComputedStyle ? window.getComputedStyle(ta, null) : false;

				if (style) {

					width = ta.getBoundingClientRect().width;

					if (width === 0 || typeof width !== 'number') {
						width = parseInt(style.width,10);
					}

					$.each(['paddingLeft', 'paddingRight', 'borderLeftWidth', 'borderRightWidth'], function(i,val){
						width -= parseInt(style[val],10);
					});
				} else {
					width = $ta.width();
				}

				mirror.style.width = Math.max(width,0) + 'px';
			}

			function initMirror() {
				var styles = {};

				mirrored = ta;
				mirror.className = options.className;
				mirror.id = options.id;
				maxHeight = parseInt($ta.css('maxHeight'), 10);

				// mirror is a duplicate textarea located off-screen that
				// is automatically updated to contain the same text as the
				// original textarea.  mirror always has a height of 0.
				// This gives a cross-browser supported way getting the actual
				// height of the text, through the scrollTop property.
				$.each(typographyStyles, function(i,val){
					styles[val] = $ta.css(val);
				});

				$(mirror).css(styles).attr('wrap', $ta.attr('wrap'));

				setWidth();

				// Chrome-specific fix:
				// When the textarea y-overflow is hidden, Chrome doesn't reflow the text to account for the space
				// made available by removing the scrollbar. This workaround triggers the reflow for Chrome.
				if (window.chrome) {
					var width = ta.style.width;
					ta.style.width = '0px';
					var ignore = ta.offsetWidth;
					ta.style.width = width;
				}
			}

			// Using mainly bare JS in this function because it is going
			// to fire very often while typing, and needs to very efficient.
			function adjust() {
				var height, original;

				if (mirrored !== ta) {
					initMirror();
				} else {
					setWidth();
				}

				if (!ta.value && options.placeholder) {
					// If the textarea is empty, copy the placeholder text into
					// the mirror control and use that for sizing so that we
					// don't end up with placeholder getting trimmed.
					mirror.value = ($ta.attr("placeholder") || '') + options.append;
				} else {
					mirror.value = ta.value + options.append;
				}

				mirror.style.overflowY = ta.style.overflowY;
				original = parseInt(ta.style.height,10);

				// Setting scrollTop to zero is needed in IE8 and lower for the next step to be accurately applied
				mirror.scrollTop = 0;

				mirror.scrollTop = 9e4;

				// Using scrollTop rather than scrollHeight because scrollHeight is non-standard and includes padding.
				height = mirror.scrollTop;

				if (maxHeight && height > maxHeight) {
					ta.style.overflowY = 'scroll';
					height = maxHeight;
				} else {
					ta.style.overflowY = 'hidden';
					if (height < minHeight) {
						height = minHeight;
					}
				}

				height += boxOffset;

				if (original !== height) {
					ta.style.height = height + 'px';
					if (callback) {
						options.callback.call(ta,ta);
					}
					$ta.trigger('autosize.resized');
				}
			}

			function resize () {
				clearTimeout(timeout);
				timeout = setTimeout(function(){
					var newWidth = $ta.width();

					if (newWidth !== width) {
						width = newWidth;
						adjust();
					}
				}, parseInt(options.resizeDelay,10));
			}

			if ('onpropertychange' in ta) {
				if ('oninput' in ta) {
					// Detects IE9.  IE9 does not fire onpropertychange or oninput for deletions,
					// so binding to onkeyup to catch most of those occasions.  There is no way that I
					// know of to detect something like 'cut' in IE9.
					$ta.on('input.autosize keyup.autosize', adjust);
				} else {
					// IE7 / IE8
					$ta.on('propertychange.autosize', function(){
						if(event.propertyName === 'value'){
							adjust();
						}
					});
				}
			} else {
				// Modern Browsers
				$ta.on('input.autosize', adjust);
			}

			// Set options.resizeDelay to false if using fixed-width textarea elements.
			// Uses a timeout and width check to reduce the amount of times adjust needs to be called after window resize.

			if (options.resizeDelay !== false) {
				$(window).on('resize.autosize', resize);
			}

			// Event for manual triggering if needed.
			// Should only be needed when the value of the textarea is changed through JavaScript rather than user input.
			$ta.on('autosize.resize', adjust);

			// Event for manual triggering that also forces the styles to update as well.
			// Should only be needed if one of typography styles of the textarea change, and the textarea is already the target of the adjust method.
			$ta.on('autosize.resizeIncludeStyle', function() {
				mirrored = null;
				adjust();
			});

			$ta.on('autosize.destroy', function(){
				mirrored = null;
				clearTimeout(timeout);
				$(window).off('resize', resize);
				$ta
					.off('autosize')
					.off('.autosize')
					.css(originalStyles)
					.removeData('autosize');
			});

			// Call adjust in case the textarea already contains text.
			adjust();
		});
	};
}(jQuery || $)); // jQuery or jQuery-like library, such as Zepto
