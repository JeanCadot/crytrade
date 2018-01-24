$(function () {

    var inputCount = $('#ct-new-count');
    if (inputCount.length) {
        var selectSymbol = $('#ct-select-symbol');
        var inputStart = $('#ct-start-usd');
        var inputStop = $('#ct-stop-usd');
        var inputRisk = $('#ct-risk');
        var init = true;

        setTimeout(function () {
            init = false;
        }, 5000);

        function evalRisk() {
            var refreshBtn = $('#ct-refresh-btn');
            if (!init && refreshBtn.hasClass('btn-outline-danger')) {
                refreshBtn.click();
            }
            try {
                var count = parseFloat(inputCount.val());
                var start = parseFloat(inputStart.val());
                var stop = parseFloat(inputStop.val());
                var valid = true;
                if (isNaN(count) || isNaN(start) || isNaN(stop)) {
                    valid = false;
                }
                if (!valid) {
                    inputRisk.val("n.a.");
                } else {
                    inputRisk.val((start - stop) * count);
                }
            } catch
                (e) {
                inputRisk.val("n.a.");

            }
        }

        var sellStart = $('#ct-start-sell-usd');
        var sellSymbol = $('#ct-sell-select-symbol');

        function loadSellTicker() {
            sellStart.val(0);
            $.get("/application/ticker?symbol=" + sellSymbol.val(), function (result) {
                var price = result && result.price;
                if (price) {
                    sellStart.val(price);
                }
            });
        }

        loadSellTicker();
        sellSymbol.change(loadSellTicker);

        function loadTicker() {
            inputCount.val(0);
            $.get("/application/ticker?symbol=" + selectSymbol.val(), function (result) {
                var price = result && result.price;
                if (price) {
                    inputStart.val(price);
                    inputStop.val(price * .75);
                    evalRisk();
                }
            });
        }

        loadTicker();

        selectSymbol.change(loadTicker);
        inputCount.on('input', evalRisk);
        inputStart.on('input', evalRisk);
        inputStop.on('input', evalRisk);

        sellSymbol.select2({
            width: '100%'
        });

        selectSymbol.select2({
            width: '100%'
        });
    }
})
;