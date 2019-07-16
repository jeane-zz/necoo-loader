const injectTpl = `
<div id="necoo-boxWrap" style="display: none;">
    <div id="necoo-allCodeBox">
        <div id="necoo-allCodePos">
            <textarea id="necoo-allCode" style="display: none;"></textarea>
        </div>
    </div>
    <div class="tree-box"></div>
    <div 
        id="preCode"
        style="
            max-width: 50em;
            margin-bottom: 1em;
            ">
        JavaScript:
        <br>
        <textarea id="code" name="code"></textarea>
        <p>Select a theme: 
            <select onchange="selectTheme()" id=select>
                <option selected>default</option>
                <option>3024-day</option>
                <option>3024-night</option>
                <option>abcdef</option>
                <option>ambiance</option>
                <option>base16-dark</option>
                <option>base16-light</option>
                <option>bespin</option>
                <option>blackboard</option>
                <option>cobalt</option>
                <option>colorforth</option>
                <option>darcula</option>
                <option>dracula</option>
                <option>duotone-dark</option>
                <option>duotone-light</option>
                <option>eclipse</option>
                <option>elegant</option>
                <option>erlang-dark</option>
                <option>gruvbox-dark</option>
                <option>hopscotch</option>
                <option>icecoder</option>
                <option>idea</option>
                <option>isotope</option>
                <option>lesser-dark</option>
                <option>liquibyte</option>
                <option>lucario</option>
                <option>material</option>
                <option>mbo</option>
                <option>mdn-like</option>
                <option>midnight</option>
                <option>monokai</option>
                <option>neat</option>
                <option>neo</option>
                <option>night</option>
                <option>nord</option>
                <option>oceanic-next</option>
                <option>panda-syntax</option>
                <option>paraiso-dark</option>
                <option>paraiso-light</option>
                <option>pastel-on-dark</option>
                <option>railscasts</option>
                <option>rubyblue</option>
                <option>seti</option>
                <option>shadowfox</option>
                <option>solarized dark</option>
                <option>solarized light</option>
                <option>the-matrix</option>
                <option>tomorrow-night-bright</option>
                <option>tomorrow-night-eighties</option>
                <option>ttcn</option>
                <option>twilight</option>
                <option>vibrant-ink</option>
                <option>xq-dark</option>
                <option>xq-light</option>
                <option>yeti</option>
                <option>zenburn</option>
            </select>
        </p>
        <button id="formatBtn">格式化代码</button>
    </div>
</div>
`;

export {
    injectTpl
};