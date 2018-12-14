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
            this.initAnimate();
        });
    }
    initAnimate() {
        let {can, ctx, imgRes} = this;
        let imgObj = imgRes[0].source || {};
        let drawParam = [imgObj, 0, 0, imgObj.width, imgObj.height, 0, 0 , imgObj.width / 2, imgObj.height / 2];
        // ctx.drawImage(...drawParam);
        for (let i = 0; i < 360; i+= Math.floor(360 / 78)) {
            canTool.rotate({
                ctx,
                deg: i / 180 * Math.PI,
                callback: () => {
                    ctx.translate(100, 0);
                    ctx.drawImage(...drawParam);
                }
            })
        }
    }
    initCan() {
        this.can.width = 750;
        this.can.height = 1334;
        this.can.style.width = '375px';
        this.can.style.height = '667px';

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
