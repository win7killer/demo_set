import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.less';
import backImg from '../../images/timg.png';
import canTool from '../../utils/canvas_tools';
export default class Tarot extends Component {
    constructor() {
        super();
        this.data = {};
        this.can = {};
        this.ctx = {};
        this.imgRes = [];
        this.tarotCount = 78;
        this.tarots = [];
        this.refCan = React.createRef();
        this.methods();
    }
    componentDidMount() {
        this.can = this.refCan.current;
        this.ctx = this.can.getContext('2d');
        this.initCan();
        this.initImg();
    }
    loadImg(item) {
        return new Promise((resolve, reject) => {
            let img = new Image();
            img.crossOrigin = '*';
            img.onload = () => {
                item.source = img;
                resolve(item);
            }
            img.src = item.src;
        })

    }
    initImg() {
        let imgList = [{
            src: backImg,
            source: null
        }];

        Promise.all([this.loadImg(imgList[0])]).then(res => {
            this.imgRes = res;
            this.initTarots();
            this.initAnimate();
            this.drawLineMark();
        });
    }
    drawLineMark() { // 参考线
        let {can, ctx, imgRes, tarots} = this;
        ctx.save();
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#f90';
        ctx.beginPath();
        ctx.moveTo(0, can.height / 2);
        ctx.lineTo(can.width, can.height / 2);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(can.width / 2, 0);
        ctx.lineTo(can.width / 2, can.height );
        ctx.stroke();
    }
    initTarots() {
        let {tarotCount, tarots} = this;
        for (let i = 0; i < tarotCount; i++) {
            tarots.push({
                index: i,
                speedX: Math.round(Math.random() * 100),
                speedY: Math.round(Math.random() * 200),
                rotate: Math.round(Math.random() * 360)
            })
        }
    }
    initAnimate() {
        let {can, ctx, imgRes, tarots} = this;
        let imgObj = imgRes[0].source || {};

        // ctx.drawImage(...drawParam);

        // for (let i = 0; i < tarots.length; i++) {
        //     let {speedX, speedY, rotate} = tarots[i];
        //     let drawParam = [imgObj, 0, 0, imgObj.width, imgObj.height, 0, 100 , imgObj.width / 2, imgObj.height / 2];
        //     canTool.rotate({
        //         ctx,
        //         deg: rotate / 180 * Math.PI,
        //         callback: () => {
        //             ctx.translate(0, 0);
        //             ctx.drawImage(...drawParam);
        //         }
        //     })
        // }

        canTool.translate(ctx).then(() => {
            ctx.save();
            // canTool.rotate({
            //     ctx,
            //     deg: 0 / 180 * Math.PI,
            //     callback: () => {
            //         ctx.translate(0, -200)
            //         ctx.drawImage(imgObj, 0, 0, imgObj.width, imgObj.height, 0, 100 , imgObj.width / 2, imgObj.height / 2);
            //     }
            // })


            ctx.translate(0, 0)
            // ctx.rotate(30 / 180 * Math.PI)
            canTool.rotate({
                ctx,
                deg: 0 / 180 * Math.PI,
                callback: () => {
                    // ctx.translate(0, -200)
                    ctx.drawImage(imgObj, 0, 0, imgObj.width, imgObj.height, 0, 0 , imgObj.width / 2, imgObj.height / 2);
                }
            })
            // ctx.drawImage(imgObj, 0, 0, imgObj.width, imgObj.height, 0, 100 , imgObj.width , imgObj.height);


            ctx.restore();
        })
    }
    initCan() {
        this.can.width = 2000;
        this.can.height = 1600;
        this.can.style.width = '1000px';
        this.can.style.height = '800px';

        this.ctx.fillStyle = '#eee';
        this.ctx.fillRect(0, 0, this.can.width, this.can.height);

    }
    methods() {
    }
    render() {
        return <div className="tarot-box">
            <canvas ref={this.refCan} id="can"></canvas>
        </div>
    }
};
