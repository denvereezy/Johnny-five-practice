var socket = io();
$(document).ready(function() {
    socket.on('news', function(data) {
        console.log(data);
    });

    $('#4wrd').click(function(e) {
        socket.emit('click');
        e.preventDefault();
    });

    $('#back').click(function(e) {
        socket.emit('click1');
        e.preventDefault();
    });

    $('#left').click(function(e) {
        socket.emit('click2');
        e.preventDefault();
    });

    $('#right').click(function(e) {
        socket.emit('click3');
        e.preventDefault();
    });

    $('#stop').click(function(e) {
        socket.emit('click4');
        e.preventDefault();
    });

    $('#frontLights').click(function(e) {
        socket.emit('click5');
        e.preventDefault();
    });

    $('#stopDelay').click(function(e) {
        socket.emit('click6');
        e.preventDefault();
    });

    $('#neon').click(function(e) {
        socket.emit('click7');
        e.preventDefault();
    });

    $('#musicToggle').click(function(e) {
        socket.emit('click8');
        e.preventDefault();
    });

    $('body').animate({marginLeft: '0%'});

    $('body').css('transform', 'scale(1)');

    $('body').scrollLeft(-2000)
    var off = true;
    $('#frontLights').click(function() {
        off = !off;

        if (off) {
            $(this).attr('src', 'off.png')
            $(this).css({webkitFilter: 'drop-shadow(1px 1px 5px red)'})
        } else {
            $(this).attr('src', 'on.png')
            $(this).css({webkitFilter: 'drop-shadow(1px 1px 5px green)'})
        }
    });

    $('#frontLights').mouseenter(function() {
        if ($(this).attr('src') == 'on.png') {
            $(this).css({webkitFilter: 'drop-shadow(1px 1px 5px green)'})
        } else {
            $(this).css({webkitFilter: 'drop-shadow(1px 1px 5px red)'})
        }
    });

    $('#frontLights').mouseleave(function() {
        $(this).css({webkitFilter: 'drop-shadow(0px 0px 0px)'})
    });

    var on = false;
    $('#neon').click(function() {
        on = !on;

        if (on) {
            $(this).attr('src', 'on.png')
            $(this).css({webkitFilter: 'drop-shadow(1px 1px 5px green)'})
        } else {
            $(this).attr('src', 'off.png')
            $(this).css({webkitFilter: 'drop-shadow(1px 1px 5px red)'})
        }
    });

    $('#neon').mouseenter(function() {
        if ($(this).attr('src') == 'on.png') {
            $(this).css({webkitFilter: 'drop-shadow(1px 1px 5px green)'})
        } else {
            $(this).css({webkitFilter: 'drop-shadow(1px 1px 5px red)'})
        }
    });

    $('#neon').mouseleave(function() {
        $(this).css({webkitFilter: 'drop-shadow(0px 0px 0px)'})
    });

    var _musicOn = false;
    $('#musicToggle').click(function() {
        _musicOn = !_musicOn;

        if (_musicOn) {
            $(this).attr('src', 'on.png')
            $(this).css({webkitFilter: 'drop-shadow(1px 1px 5px green)'})
        } else {
            $(this).attr('src', 'off.png')
            $(this).css({webkitFilter: 'drop-shadow(1px 1px 5px red)'})
        }
    });

    $('#musicToggle').mouseenter(function() {
        if ($(this).attr('src') == 'on.png') {
            $(this).css({webkitFilter: 'drop-shadow(1px 1px 5px green)'})
        } else {
            $(this).css({webkitFilter: 'drop-shadow(1px 1px 5px red)'})
        }
    });

    $('#musicToggle').mouseleave(function() {
        $(this).css({webkitFilter: 'drop-shadow(0px 0px 0px)'})
    });

    var partyOn = false;
    $('#stopDelay').click(function() {
        partyOn = !partyOn;

        if (partyOn) {
            $(this).attr('src', 'on.png')
            $(this).css({webkitFilter: 'drop-shadow(1px 1px 5px green)'})
        } else {
            $(this).attr('src', 'off.png')
            $(this).css({webkitFilter: 'drop-shadow(1px 1px 5px red)'})
        }
    });

    $('#stopDelay').mouseenter(function() {
        if ($(this).attr('src') == 'on.png') {
            $(this).css({webkitFilter: 'drop-shadow(1px 1px 5px green)'})
        } else {
            $(this).css({webkitFilter: 'drop-shadow(1px 1px 5px red)'})
        }
    });

    $('#stopDelay').mouseleave(function() {
        $(this).css({webkitFilter: 'drop-shadow(0px 0px 0px)'})
    });
});
