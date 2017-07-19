let element = $("#body-input"),
    str = element.html(),
    progress = 0,
    timer = setInterval(() =>{
            let current = str.substr(progress, 1);
            if (current == '<') {
                progress = str.indexOf('>', progress) + 1;
            } else {
                progress++;
            }
            element.html(str.substring(0, progress) + (progress && 1 ? '_': ''));
        if (progress >= str.length) {
            clearInterval(timer);
            element.html(str.substring(0, progress));
            }
        },
150);

require('../../public/a.js')
$("#body-btn").click(() => {
    require.ensure(['../../public/b.js'],function (require) {
        require('../../public/c.js')
    },'bc')
})