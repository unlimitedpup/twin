$(document).ready( function() {
   slider();   
   itinerary();
   imgLightbox();
   autoSlide();
   showHidden();
   sendQuote();
   
   setTimeout( function() {
      $('.slider, .site-header').removeClass('preload');      
   }, 180);   
})

$(document).scroll( function() {
   animate();
})

function showHidden() {
   $('.activity .show-hidden, .what .show-hidden').click( function() {
      var $this = $(this);
      
      $this.siblings().removeClass('hidden');
      $this.css('display', 'none');
   });
}

function imgLightbox() {
   $('.gallery img').click( function() {
      var $this = $(this),
          imgUrl = $this.attr('src'),
          dataLoc = $this.attr('data-loc'),
          imgLb = "<div class='img-lb animate'><div class='img-lb-container'><span class='close-lb'></span><figure class='img'><img src='"+imgUrl+"' alt='Twin Travel Bohol'></figure><strong class='text'>- Located in <span class='alt-color'>"+dataLoc+"</span> -</strong></div></div>";   
            
      $('body').append(imgLb); 
      $('body').on('click', '.close-lb', function() {
         $('.img-lb').remove();
      })
   });
   
   $('.gallery-wrapper img').click( function() {
      var $this = $(this),
          imgUrl = $this.attr('src'),
          imgLb = "<div class='img-lb animate'><div class='img-lb-container'><span class='close-lb'></span><figure class='img'><img src='"+imgUrl+"' alt='Twin Travel Bohol'></figure></div></div>";
      
      $('body').append(imgLb);
      $('body').on('click', '.close-lb', function() {
         $('.img-lb').remove();
      })
   })
}

function animate() {
   var trigAnimate = $(window).scrollTop() + ( $(window).height() * .5 );
   
   if ( trigAnimate > $('.tour-packages').offset().top ) {
      $('.tour-packages').removeClass('animate');
   }
   
   if ( trigAnimate > $('.site-desc').offset().top ) {
      $('.site-desc').removeClass('animate');
   }
   
   if ( trigAnimate > $('.cool-facts').offset().top ){
      $('.cool-facts').removeClass('animate');
   }
}

function itinerary() {
   $('.itinerary-wrapper').on('click', '.itinerary-item', function() {
      var $this = $(this);
      
      $($this).siblings().removeClass('active-itinerary');
      $($this).siblings().find('.show').addClass('hidden');
      $($this).siblings().find('.show-hidden').css('display', 'block');
      $($this).addClass('active-itinerary');
   });
}

function slider() {   
   $('.thumb-item').click( function() {
      var $this = $(this),
          position = $(this).parent().children().index($this);
      
      $('.thumb-container .thumb-item').removeClass('active-thumb').eq(position).addClass('active-thumb');
      $('.slide-container .slide-item').removeClass('active-slide').eq(position).addClass('active-slide');
   });
   
   $('.slider .ctrl-prev, .slider .ctrl-next').click( function() {
      var $this = $(this),
          curSlide = $('.slide-container').find('.active-slide'),
          position = $('.slide-container').children().index(curSlide),
          slideNum = $('.slide-container .slide-item').length;
      
      if( $this.hasClass('ctrl-next') ) {
         if ( position < slideNum -1 ) {
            $('.slide-container .active-slide').removeClass('active-slide').next().addClass('active-slide');
            $('.thumb-container .active-thumb').removeClass('active-thumb').next().addClass('active-thumb');
         } else {
            $('.slide-container .slide-item').removeClass('active-slide').first().addClass('active-slide');
            $('.thumb-container .thumb-item').removeClass('active-thumb').first().addClass('active-thumb');
         }
      } else {
         if ( position === 0 ) {
            $('.slide-container .slide-item').removeClass('active-slide').last().addClass('active-slide');
            $('.thumb-container .thumb-item').removeClass('active-thumb').last().addClass('active-thumb');
         } else {
            $('.slide-container .active-slide').removeClass('active-slide').prev().addClass('active-slide');
            $('.thumb-container .active-thumb').removeClass('active-thumb').prev().addClass('active-thumb');
         }
      }
   });
}

function autoSlide() {
   var auto = function() {
      interval = setInterval(
         function() {
            var $this = $('.slide-container .active-slide'),
                slideNum = $('.slide-container .slide-item').length,
                position = $this.parent().children().index($this);
            
            if ( position < slideNum - 1 ){
               $this.removeClass('active-slide').next().addClass('active-slide');
               $('.thumb-container .active-thumb').removeClass('active-thumb').next().addClass('active-thumb');
            } else {
               $('.slide-container .slide-item').removeClass('active-slide').first().addClass('active-slide');
               $('.thumb-container .thumb-item').removeClass('active-thumb').first().addClass('active-thumb');
            }            
         }, 3000);
      }
      
   $('.slider').hover( function() {
      clearInterval(interval);
   });
      
   $('#slider').mouseleave( function() {
      auto();
   });      
   
   auto();
}

function sendQuote() {
   $('.form').submit( function() {
      event.preventDefault();
      
      $.ajax({
         url: 'https://formspree.io/'+siteEmail,
         method: 'POST',
         data: {
            name: $("[name='name']").val(),
            email: $("[name='email']").val(),
            phone: $("[name='phone']").val(),
            message: $("[name='message']").val(),
         },
         dataType: 'json'
      }).done( function() {
         alert('Message Submitted, Thank you and God Bless');
      }).fail( function() {
         alert('Message not Submitted, try use our contact information in the left, thank you');
      })
   })
}