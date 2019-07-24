import riot from 'riot';
window.necooIndex = 0;

// riot.compile(callback)
riot.compile(function comileHook() {
});

// riot.compiler(url, true)
// let str = `<each-tag>
//     <ul>
//         <li each={ items } class={ completed: done }>
//             <input type="checkbox" checked={ done }> { title }
//         </li>
//     </ul>
//     this.hook = function hooooooook(){
//         window.necooPush(arguments);
//     };
//     this.items = [
//         { title: 'First item', done: true },
//         { title: 'Second item' },
//         { title: 'Third item' }
//     ];
// </each-tag>`;
// let res = riot.compile(str, true);
// console.log(res);
