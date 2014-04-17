define([
    'jquery',
    'foundation'
    ], function ($) {
        $(function() {
            $(document).foundation({});

            $('.fotorama').each(function() {
                var f = $(this);
                require(['fotorama'], function() {
                    f.fotorama({});
                });
            });
        });
    }
);
