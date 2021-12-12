class Object {
    constructor(pos, dim, texture, offset = { x: 0, y: 0 }) {
        this.pos = pos;
        this.dim = dim;
        this.texture = texture;
        this.offset = offset;

        this.base = pos;
        this.vel = { x: 0, y: 0 };
        this.box = {};
        this.player = null;

        this.npos = { ...this.pos };
        this.cpos = { ...this.pos };
        this.nvel = { ...this.vel };
        this.cvel = { ...this.vel };

        this.dead = false;
        this.waiting = false;
    }

    init() {
        this.pos = { ...this.base };
        this.vel = { x: 0, y: 0 };
        this.dead = this.waiting;
    }

    update() {
        this.npos = {
            x: this.pos.x + this.nvel.x,
            y: this.pos.y + this.nvel.y
        }

        this.cpos = { ...this.npos };
        this.cvel = { ...this.nvel };

        this.box = {
            top: this.pos.y - this.dim.h / 2 + (this.nvel.y < 0 ? this.nvel.y : 0),
            bottom: this.pos.y + this.dim.h / 2 + (this.nvel.y > 0 ? this.nvel.y : 0),
            left: this.pos.x - this.dim.w / 2 + (this.nvel.x < 0 ? this.nvel.x : 0),
            right: this.pos.x + this.dim.w / 2 + (this.nvel.x > 0 ? this.nvel.x : 0)
        }

        this.player = null;
    }

    move() {
        this.pos = { ...this.cpos };
        this.vel = { ...this.cvel };
    }

    die(state = true) {
        this.dead = state;
    }

    wait() {
        this.waiting = true;
        this.dead = true;
    }
}

export { Object };