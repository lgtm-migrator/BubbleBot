//max = 33

class BubbleWrap {
    constructor(size, popchance) {
        this.size = size == undefined ? 10 : size;
        this.popchance = popchance == undefined ? 25 : popchance;
    }
    generate() {
        let wrap = [];
        for (var y = 0; y <= this.size; y++) {
            if (y == this.size) {
                return wrap.join("");
            }
            for (var x = 0; x < this.size; x++) {
                if (Math.floor(Math.random() * (100 / this.popchance)) == 1 && ((x != 0 && x != this.size - 1) && (y != 0 && y != this.size - 1))) {
                    wrap.push("pop");
                } else {
                    wrap.push("||pop||");
                }
            }
            wrap.push("\n");
        }
    }
}

module.exports = BubbleWrap;