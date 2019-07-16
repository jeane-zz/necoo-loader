import {configure, autorun, observable, computed, action, runInAction, get, set, values} from "mobx";
window.necooIndex = 0;
let t = {
    d: {
        e: {
            f: 2
        }
    }
};
let b = observable(t);
// autorun(() => {
//     console.log('b', b.d);
// });
