var Toast = function(options) {
    this.dft = {
        clas: "toast-wrap",
        text: "",
        outTime: 1500,
        fadeTime: 600,
        type: 'toast',
        btn: '好的',
        callback: null,
    };
    this.dft = Object.assign(this.dft, options);
};

Toast.prototype = {
    create: function() {
        if (this.dft.type == 'toast') {
            var adTxt = document.createElement('div'),
                adcont = document.createElement('div');
            adTxt.className = this.dft.clas;
            adcont.className = 'toast-content';
            adcont.innerHTML = this.dft.text;
            document.body.appendChild(adTxt);
            adTxt.appendChild(adcont);
            var _this = this;
            setTimeout(function() {
                var node = document.querySelector('.' + _this.dft.clas);
                fadeOut(node)
                node.parentNode.removeChild(node);
            }, _this.dft.outTime)
        } else {
            var adTxt = document.createElement('div'),
                adcont = document.createElement('div'),
                adbtn = document.createElement('div');
            adTxt.className = this.dft.clas;

            adcont.className = 'toast-content';
            adcont.innerHTML = this.dft.text;

            adbtn.className = 'toast-btn';
            adbtn.innerHTML = this.dft.btn;

            document.body.appendChild(adTxt);
            adTxt.appendChild(adcont);
            adTxt.appendChild(adbtn);

            adbtn.addEventListener('click', this.close.bind(this), false)
        }
    },
    close: function() {
        var node = document.querySelector('.' + this.dft.clas);
        fadeOut(node)
        node.parentNode.removeChild(node);
        if (this.dft.callback) {
            this.dft.callback.call(null);
        }
    },
}

var Confirm = function(options) {
    this.dft = {
        clas: 'confirm-wrap',
        cover: true,
        title: '标题',
        content: '正文',
        cancel: 'cancel',
        sub: 'ok',
        html: '',
        wrap: 'modal-cover',
        cancelCall: null,
        subCall: null,
    };
    this.dft = Object.assign(this.dft, options);
};
Confirm.prototype = {
    create: function() {
        var amodal = document.createElement('div'),
            awrap = document.createElement('div'),
            atitle = document.createElement('div');
        adcont = document.createElement('div'),
            adbtn = document.createElement('div');
        ableft = document.createElement('div'),
            abright = document.createElement('div');
        amodal.className = this.dft.wrap;

        awrap.className = this.dft.clas;

        atitle.className = 'confirm-title';
        atitle.innerHTML = this.dft.title;

        adcont.className = 'confirm-content';
        adcont.innerHTML = this.dft.content;

        adbtn.className = 'confirm-foot';

        ableft.className = 'confirm-cancel';
        ableft.innerHTML = this.dft.cancel;

        abright.className = 'confirm-sub';
        abright.innerHTML = this.dft.sub;

        if (this.dft.cover == true) {
            document.body.appendChild(amodal);
            amodal.appendChild(awrap);
        } else {
            document.body.appendChild(awrap);
        }
        awrap.appendChild(atitle);
        awrap.appendChild(adcont);
        awrap.appendChild(adbtn);
        adbtn.appendChild(ableft);
        adbtn.appendChild(abright);

        ableft.addEventListener('click', this.cancel.bind(this), false)
        abright.addEventListener('click', this.submit.bind(this), false)
    },
    submit: function() {
        this.destroy()
        if (this.dft.subCall) {
            this.dft.subCall.call(null);
        }
    },
    cancel: function() {
        this.destroy()
        if (this.dft.cancelCall) {
            this.dft.cancelCall.call(null);
        }
    },
    destroy: function() {
        if (this.dft.cover == true) {
            var node = document.querySelector('.' + this.dft.wrap);
            fadeOut(node)
            node.parentNode.removeChild(node);
        } else {
            var node = document.querySelector('.' + this.dft.clas);
            fadeOut(node)
            node.parentNode.removeChild(node);
        }
    }
}

if (typeof Object.assign != 'function') {
    Object.assign = function(target) {
        'use strict';
        if (target == null) {
            throw new TypeError('Cannot convert undefined or null to object');
        }

        target = Object(target);
        for (var index = 1; index < arguments.length; index++) {
            var source = arguments[index];
            if (source != null) {
                for (var key in source) {
                    if (Object.prototype.hasOwnProperty.call(source, key)) {
                        target[key] = source[key];
                    }
                }
            }
        }
        return target;
    };
}


function fadeOut(el) {
    el.style.opacity = 1;

    (function fade() {
        if ((el.style.opacity -= .1) < 0) {
            el.style.display = "none";
        } else {
            requestAnimationFrame(fade);
        }
    })();
}


function fadeIn(el, display) {
    el.style.opacity = 0;
    el.style.display = display || "block";

    (function fade() {
        var val = parseFloat(el.style.opacity);
        if (!((val += .1) > 1)) {
            el.style.opacity = val;
            requestAnimationFrame(fade);
        }
    })();
}

if (!window.requestAnimationFrame) {
    var lastTime = 0;
    window.requestAnimationFrame = function(callback) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
        var id = window.setTimeout(function() {
            callback(currTime + timeToCall);
        }, timeToCall);
        lastTime = currTime + timeToCall;
        return id;
    }
}

if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = function(id) {
        clearTimeout(id);
    };
}