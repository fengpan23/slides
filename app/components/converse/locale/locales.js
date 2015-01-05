/*
 * This file specifies the language dependencies.
 *
 * Translations take up a lot of space and you are therefore advised to remove
 * from here any languages that you don't need.
 */

(function (root, factory) {
    define("locales", [
        'jed',
        'en',
        'zh_CN',
        'zh_TW'
        ], function (jed, en, zh_CN, zh_TW) {
            root.locales = {
                'en': en,
                'zh-cn':zh_CN,
                'zh-tw':zh_TW
            };
        });
})(this);
