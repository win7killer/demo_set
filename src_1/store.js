import { observable, autorun, computed, action } from 'mobx';

class IndexData {
    @observable text = 'some text';
    @observable list = ['1111', '22222', '33333', '4444'];
    @observable     addText = '';
    @computed get getList3rd() {
        return this.list.slice(0, 3);
    }
    @action upAction(args) {
        console.log(args, 'from actios');
        this.addText = args;
        this.list.push('1234567');
    }
}


// let indexData = new IndexData();
export let indexData = new IndexData();

// export let indexData = observable({
//     text: 'store text 测试',
//     list: ['1111', '22222', '33333', '4444'],
//     addText: '',
//     get getList3rd() {
//         return this.list.slice(0, 3);
//     },
//     upAction(args) {
//         console.log(args, 'from actios');
//         this.addText = args;
//         this.list.push('1234567');
//     }
// }, {
//     upAction: action
// });

export let userInfo = observable({
});

export let someData = observable({
    list: [],
})

export const store = observable({
    loding: false,
    commonStatus: 1,
    theme: 1,
    userInfo,
    someData,
    indexData,
});


// store.upAction = function(...args) {
//     console.log(args);
//     this.indexData.addText = args[0]
// }

autorun(function(...arg) {
    console.log('555', indexData.list[0], arg)
})

indexData.list.unshift('65432')
indexData.list.push('12121')


setTimeout(() => {
    // indexData.list[0] = 543
    // console.log(12345, indexData.list)
}, 1000)

export default store;
