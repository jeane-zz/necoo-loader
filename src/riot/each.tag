<each-tag>
    <ul>
        <li each={ items } class={ completed: done }>
            <input type="checkbox" checked={ done }> { title }
        </li>
    </ul>
    this.hook = function hooooooook(){
        window.necooPush(arguments);
    };
    this.items = [
        { title: 'First item', done: true },
        { title: 'Second item' },
        { title: 'Third item' }
    ];
</each-tag>