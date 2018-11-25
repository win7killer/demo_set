export default class MergeImg {
    constructor(
        opt = {
            width: 750,
            height: 1334,
            bgImg: '',
            eleList: []
        }
    ) {
        this.fontOpt = (() => ({
            fontFamily: 'Helvetica Neue For Number, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Helvetica Neue, Helvetica, Arial, sans-serif',
            fontSize: 12,
            fontVariant: 'normal',
            fontWeight: 'normal',
            fontStyle: 'normal',
            lineHeight: 1.5
        }))();
        this.opt = opt;
        this.bgImg = opt.bgImg;
        this.eleList = opt.eleList || [];
        // console.log(this);
        this.init();
    }
    init() {
        this.initCan();
        this.showCan();
        this.drawBg();
        this.drawEleList();
    }
    initCan() {
        let can = this.can = document.createElement('canvas');
        let ctx = this.ctx = can.getContext('2d');
        can.width = this.opt.width * this.opt.ratio;
        can.height = this.opt.height * this.opt.ratio;
        can.style.width = this.opt.width + 'px';
        can.style.height = this.opt.height + 'px';
        ctx.textAlign = 'start';
        ctx.textBaseline = 'hanging';
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, can.width, can.height);
        ctx.save();
    }
    drawBg() {
        let {
            ctx,
            bgImg
        } = this;
        ctx.drawImage(bgImg, 0, 0, bgImg.width, bgImg.height);
    }
    drawEleList() {
        let {
            eleList
        } = this;
        let arr = ['CANVAS', 'IMG', 'SVG'];
        eleList.forEach(item => {
            if (item.source && arr.includes(item.source.tagName.toUpperCase())) {
                this.drawImgItem(item);
            } else {
                this.drawTextItem(item);
            }
        });
    }
    drawImgItem(item) {
        let ctx = this.ctx;
        ctx.save();

        if (item.bgColor) {
            ctx.fillStyle = item.bgColor;
            ctx.fillRect(item.x, item.y, item.w, item.h);
        }

        ctx.drawImage(item.source, item.x, item.y, item.w, item.h);
        ctx.restore();
    }
    drawTextItem(item) {
        let fontData = Object.assign({}, this.fontOpt, item);
        let ctx = this.ctx;
        ctx.save();
        ctx.fillStyle = item.color || ctx.fillStyle;
        ctx.font = `${fontData.fontStyle} ${fontData.fontVariant} ${fontData.fontWeight} ${fontData.fontSize}px / ${fontData.lineHeight} ${fontData.fontFamily} `;
        // ctx.font = '30px Arial'
        ctx.fillText(item.text, item.x, item.y);
        ctx.restore();
    }
    showCan() {
        document.body.append(this.can);
    }
}
