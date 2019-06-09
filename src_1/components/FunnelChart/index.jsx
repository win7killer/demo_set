/**
 * @file: 基于 G2 的漏斗图 React 组件封装
 * @author: win7killer@163.com
 * @description: 基于阿里 G2 封装，参考官网demo修改来的。
 * @relyOn: ['prop-types', '@antv/g2', '@antv/data-set']
 * @props: {
 *     data: PropTypes.array, [数组，要求每一项为 {action: '文案', pv: 12345}, 按照从上到下顺序] 【MUST】
 *     baseNum: PropTypes.number, [计算百分比的底数，理论上和 data[0].pv 相等，不传的话，默认取 data[0].pv]【CHOICE】
 *     percentStep: PropTypes.number, [百分比保留几位小数]【CHOICE】 [DEFAULT: 0]
 *     fixedType: PropTypes.oneOf(['floor', 'ceil', 'round']), [百分比进位方式]【CHOICE】[DEFAULT: 'round']
 *     noDataText： PropTypes.String, [没有数据时的提示，默认为“没有数据”，传 '' 时不展示对应 div] 【CHOICE】[DEFAULT: '没有数据']
 * }
 * @example: <FunnelChart data={mockData} percentStep={2} fixedType="floor" baseNum={undefined} noDataText="no data"></FunnelChart>
 * @version: 0.0.1 | win7killer@163.com | 2018-11-23 // init
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import G2 from '@antv/g2';
import { View } from '@antv/data-set';
import './index.css';

const render = function () {
    return <div className="chart-box" id="can_box">
        {!this.state.isShow && !!this.props.noDataText ?
            <div className="text-center">{this.props.noDataText}</div> : ''
        }
    </div>
};

export default class FunnelChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShow: true,
        };
        this.bindThis();
    }
    componentDidMount() {
        this.initChart();
    }
    bindThis() {
        // 绑定 actionMethods
        let map = this.actionMethods();
        let arr = Object.keys(map);
        arr.forEach(item => {
            this[item] = map[item].bind(this);
        });
    }
    actionMethods() {
        return {
            initChart() {
                let data = this.chartData(this.props.data || []);
                if (data.length === 0) {
                    this.setState({
                        isShow: false
                    });
                    return;
                }
                const reg = new RegExp(`(\\d{${this.props.percentStep}})$`);
                const chart = this.chart = new G2.Chart({
                    container: 'can_box',
                    width: 600,
                    height: 300
                });

                chart
                    .source(data, {
                        percent: {
                            nice: false
                        }
                    })
                    .axis(false);

                chart.tooltip({
                    showTitle: false,
                    itemTpl: (() => {
                        return `<li data-index={index} style="margin-bottom:4px;">
                        <span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}<br/>
                        <span style="padding-left: 16px">浏览人数：{pv}</span><br/>
                        <span style="padding-left: 16px">占比：{percent}</span><br/>
                    </li>`
                    })()
                });
                // 转转坐标
                chart
                    .coord('rect')
                    .transpose()
                    .scale(1, -1);
                // 对称柱状图，饼图关键
                chart
                    .intervalSymmetric()
                    .position('action*pv')
                    .shape('funnel')
                    .color('action')
                    .label('action*pv', (action, pv) => {
                            return action + ' ' + pv;
                        }, {
                            offset: 35,
                            labelLine: {
                                lineWidth: 1,
                                stroke: 'rgba(0, 0, 0, 0.15)'
                            }
                        })
                    .tooltip('action*pv*percent', (action, pv, percent) => {
                        let num = percent * 100;

                        switch (this.props.fixedType) {
                            case 'floor':
                                num = Math.floor(num * Math.pow(10, this.props.percentStep));
                                num = num.toString().replace(reg, '.$1');
                                break;
                            case 'ceil':
                                num = Math.ceil(num * Math.pow(10, this.props.percentStep));
                                num = num.toString().replace(reg, '.$1');
                                break;
                            default:
                                num = num.toFixed(this.props.percentStep);
                        }
                        return {
                            name: action,
                            percent: num + '%',
                            pv: pv
                        };
                    });
                data.forEach(function (obj) {
                    // 中间标签文本
                    chart
                        .guide()
                        .text({
                            top: true,
                            position: {
                                action: obj.action,
                                percent: 'median'
                            },
                            content: parseInt(obj.percent * 100) + '%', // 显示的文本内容
                            style: {
                                fill: '#fff',
                                fontSize: '12',
                                actionAlign: 'center',
                                shadowBlur: 2,
                                shadowColor: 'rgba(0, 0, 0, .45)'
                            }
                        });
                });
                chart.render();
            },
            // 数据处理
            chartData(data = []) {
                const dv = new View().source(data);
                dv.transform({
                    type: 'map',
                    callback: row => {
                        row.percent = row.pv / (this.props.baseNum || data[0].pv);
                        return row;
                    }
                });
                data = dv.rows;
                return data;
            }
        };
    }
    render() {
        return render.call(this);
    }
};

// 定义 props 类型
FunnelChart.propTypes = {
    data: PropTypes.array,
    baseNum: PropTypes.number,
    percentStep: PropTypes.number,
    fixedType: PropTypes.oneOf(['floor', 'ceil', 'round']),
    noDataText: PropTypes.string,
};

// 定义 props 默认值
FunnelChart.defaultProps = {
    data: [],
    baseNum: 0,
    percentStep: 0,
    fixedType: 'round',
    noDataText: '没有数据'
};
