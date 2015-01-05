 define(["converseWeb"], function() {
 	require(['converse'], function (converse) {
        var template = '<nav class="navbar navbar-custom navbar-fixed-top" role="navigation"><div class="container"></div></nav>';
        $('body').append(template);
        (function () {
            /* XXX: This function initializes jquery.easing for the https://conversejs.org
            * website. This code is only useful in the context of the converse.js
            * website and converse.js itself is NOT dependent on it.
            */
            var $ = converse.env.jQuery;
            $(window).scroll(function() {
                if ($(".navbar").offset().top > 50) {
                    $(".navbar-fixed-top").addClass("top-nav-collapse");
                } else {
                    $(".navbar-fixed-top").removeClass("top-nav-collapse");
                }
            });
        })();

        converse.initialize({
            auto_subscribe: true,
            bosh_service_url: 'http://im.lxpt.cn:5280/http-bind/', // Please use this connection manager only for testing purposes
            i18n: locales['zh'], // Refer to ./locale/locales.js to see which locales are supported
            keepalive: true,
            message_carbons: true,
            play_sounds: true,
            roster_groups: true,
            show_controlbox_by_default: true,
            xhr_user_search: false
        });
    });
 });