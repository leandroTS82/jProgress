(function ($) {
    $.fn.progress = function (percent, options) {
        // Carrega as propriedades Default, ou as carregadas pelo usuário
        options = $.extend({}, $.fn.progress.defaults, options || {});

        // Executa a função de onStart, caso ela tenha sido definida
        if (typeof (options.onStart) == 'function') {
            options.onStart.call(this);
        }

        // Limita o tamanho da barra de progresso.
        var progressBarSize = percent > 100 ? 100 : percent < 0 ? 0 : percent;

        // Inclui os elementos básicos de HTML
        this.html("<div id='progressBar'><span id='progressCount'></span></div>");

        // Calcula o tamanho da da barra de Progresso
        var progressBarWidth = progressBarSize * this.width() / 100;

        // Armazena a Barra de Progresso
        var progressDiv = this.find('#progressBar');

        // Armazena o Contador de Progresso
        var progressSpan = this.find('#progressCount');

        // Se nenhuma classe de CSS for definida, utiliza o visual default
        if (!options.cssClass) {
            this.css({
                "border-radius": "10px",
                "background": "#e6e5e2",
                "box-shadow": "0 -1px 1px #c0bfbc inset",
                "font-family": "Verdana"
            });

            progressDiv.css({
                "border-radius": "9px",
                "box-shadow": "0 2px 2px #333",
                "background-color": options.color,
                "color": "white"
            });
        }
        else {
            this.addClass(options.cssClass);
        }

        // CSS necessário
        progressDiv.css({
            "text-align": "center",
            "width": (options.reverse ? "100%" : "0")
        });

        // Realiza a Contagem do Progresso
        progressSpan.countTo({
            from: options.reverse ? 100 : 0,
            to: percent,
            speed: options.timespan - 100,
            refreshInterval: 50,
            percentMode: options.percentResult
        });

        // Anima o Progresso
        progressDiv.animate(
            {
                width: progressBarWidth
            },
            options.timespan,
            options.easing,
            function () {
                if (typeof (options.onComplete) == 'function') {
                    options.onComplete.call(this, percent);
                }
            }
        );
    };
    $.fn.progress.defaults = {
        timespan: 1000, // Tempo de duração da Animação
        reverse: false, // A direção do Progresso é reversa?
        easing: "linear", // Modo de easing
        percentResult: false, // O resultado deve ter um sinal de %
        onComplete: null, // Função à ser chamada ao completar
        onStart: null, // Função à ser chamada ao Iniciar
        color: '#00d2ff', // Cor da Barra
        cssClass: null // Classe de CSS que será aplicada ao Div Principal
    };
    /*****************************************************************************************/

    /* Método de Contagem de Progresso */
    /* From: https://github.com/mhuggins/jquery-countTo */

    $.fn.countTo = function (options) {
        // merge the default plugin settings with the custom options
        options = $.extend({}, $.fn.countTo.defaults, options || {});

        // how many times to update the value, and how much to increment the value on each update
        var loops = Math.ceil(options.speed / options.refreshInterval),
            increment = (options.to - options.from) / loops;

        return $(this).each(function () {
            var _this = this,
                loopCount = 0,
                value = options.from,
                interval = setInterval(updateTimer, options.refreshInterval);

            function updateTimer() {
                value += increment;
                loopCount++;
                $(_this).html(value.toFixed(options.decimals) + (options.percentMode ? '%' : ''));

                if (typeof (options.onUpdate) == 'function') {
                    options.onUpdate.call(_this, value);
                }

                if (loopCount >= loops) {
                    clearInterval(interval);
                    value = options.to;

                    if (typeof (options.onComplete) == 'function') {
                        options.onComplete.call(_this, value);
                    }
                }
            }
        });
    };
    $.fn.countTo.defaults = {
        from: 0,  // the number the element should start at
        to: 100,  // the number the element should end at
        speed: 1000,  // how long it should take to count between the target numbers
        refreshInterval: 100,  // how often the element should be updated
        decimals: 0,  // the number of decimal places to show
        onUpdate: null,  // callback method for every time the element is updated,
        onComplete: null,  // callback method for when the element finishes updating
        percentMode: false // should the counter be in % mode ?
    };

    /* Fim do Método de Contagem do Progresso */
}(jQuery));