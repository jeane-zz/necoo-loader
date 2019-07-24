var result = riot.tag2('each-tag', '<ul> <li each="{items}" class="{completed: done}"> <input type="checkbox" checked="{done}"> {title} </li> </ul>', '', '', function(opts) {
    this.hook = function hooooooook(){
        window.necooPush(arguments);
    };
    this.items = [
        { title: 'First item', done: true },
        { title: 'Second item' },
        { title: 'Third item' }
    ];
});
console.log('result', result);