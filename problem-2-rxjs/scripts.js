document.addEventListener("DOMContentLoaded", function () {
    const { timer, fromEvent } = rxjs;
    const { map, takeWhile, tap } = rxjs.operators;

    const hoursElement = document.getElementById("hours");
    const minutesElement = document.getElementById("minutes");
    const secondsElement = document.getElementById("seconds");

    const startTimerBtn = document.getElementById("start-timer");
    const expiredElement = document.getElementById("timer-expired");

    const timer$ = timer(0, 1000).pipe(
        map((val) => getTotalSeconds() - val),
        takeWhile((val) => val >= 0),
        tap((val) => {
            const hours = Math.floor(val / 3600);
            const minutes = Math.floor((val % 3600) / 60);
            const seconds = val % 60;

            hoursElement.textContent = formatTime(hours);
            minutesElement.textContent = formatTime(minutes);
            secondsElement.textContent = formatTime(seconds);

            if(val == 0) {
                expiredElement.style.display = 'block';
            }
        })
    );

    fromEvent(startTimerBtn, "click").subscribe(() => {
        expiredElement.style.display = 'none';
        timer$.subscribe();
    });
});

function getTotalSeconds() {
    const inputHours = parseInt(document.getElementById("input-hours").value) || 0;
    const inputMinutes = parseInt(document.getElementById("input-minutes").value) || 0;
    const inputSeconds = parseInt(document.getElementById("input-seconds").value) || 0;

    return inputHours * 3600 + inputMinutes * 60 + inputSeconds;
}

function formatTime(time) {
    return time < 10 ? `0${time}` : `${time}`;
}