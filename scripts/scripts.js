$(document).ready(function () {
    const $display = $("#display");
    const $startBtn = $("#start");
    const $stopBtn = $("#stop");
    const $resetBtn = $("#reset");

    let timerId = null;
    let startTime = 0;
    let elapsed = 0;

    function formatTime(ms) {
        const hours = Math.floor(ms / 3600000);
        const minutes = Math.floor(ms / 60000) % 60;
        const seconds = Math.floor(ms / 1000) % 60;
        const milliseconds = Math.floor((ms % 1000) / 100);
        return `${hours}:${minutes}:${seconds}:${milliseconds}`;
    }

    function update() {
        const now = Date.now();
        elapsed = now - startTime;
        $display.text(formatTime(elapsed));
    }

    function runningUI() {
    $startBtn.addClass("is-disabled");
    $stopBtn.removeClass("is-disabled");
    $resetBtn.removeClass("is-disabled");
    }

    function notRunningUI() {
    $startBtn.removeClass("is-disabled");
    $stopBtn.addClass("is-disabled");
    $resetBtn.removeClass("is-disabled");
    }

    function initialUI() {
    $startBtn.removeClass("is-disabled");
    $stopBtn.addClass("is-disabled");
    $resetBtn.addClass("is-disabled");
    }

    // クリックイベントの設定

    $startBtn.on("click", function () {
        if (timerId !== null) return;
        startTime = Date.now() - elapsed;
        timerId = setInterval(update, 100);
        runningUI();
    });

    $stopBtn.on("click", function () {
        if (timerId === null) return;
        clearInterval(timerId);
        timerId = null;
        notRunningUI();
    });

    $resetBtn.on("click", function () {
        clearInterval(timerId);
        timerId = null;
        elapsed = 0;
        $display.text("0:0:0:0");
        initialUI();
    });

});
