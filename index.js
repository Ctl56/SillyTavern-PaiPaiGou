jQuery(async () => {
    const modalHtml = `
    <div id="paipai-modal" style="display:none; position:fixed; top:50%; left:50%; transform:translate(-50%, -50%); width:85vw; height:90vh; background:var(--smartThemeMenuBg, #1e1e1e); border:1px solid var(--smartThemeBorderColor, #444); border-radius:12px; z-index:99999; flex-direction:column; box-shadow: 0 10px 40px rgba(0,0,0,0.6);">
        <div style="display:flex; justify-content:space-between; align-items:center; padding:10px 15px; border-bottom:1px solid var(--smartThemeBorderColor, #444); background:var(--smartThemeBlurTintColor, rgba(0,0,0,0.2)); border-radius:12px 12px 0 0;">
            <h3 style="margin:0; font-size:16px; color:var(--smartThemeDefaultText, #fff);">排排狗</h3>
            <div id="paipai-close" style="cursor:pointer; font-size:18px; font-weight:bold; color:#a69c9d; transition:0.2s;">✕</div>
        </div>
        <div style="flex:1; width:100%; height:100%; position:relative;">
            <iframe id="paipai-iframe" src="https://ppaipaiggo56.netlify.app" style="width:100%; height:100%; border:none; border-radius:0 0 12px 12px;"></iframe>
        </div>
    </div>
    <div id="paipai-backdrop" style="display:none; position:fixed; inset:0; background:rgba(0,0,0,0.6); backdrop-filter:blur(3px); z-index:99998;"></div>
    `;

    const floatBtnHtml = `<div id="paipai-selection-btn" style="display:none; position:absolute; z-index:999999; background:#d8cdd0; color:#333; padding:6px 12px; border-radius:8px; cursor:pointer; font-weight:bold; font-size:13px; box-shadow:0 4px 12px rgba(0,0,0,0.3); transition:transform 0.1s;">🐶 送去排版</div>`;

    \$('body').append(modalHtml).append(floatBtnHtml);

    const modal = \$('#paipai-modal'), backdrop = $('#paipai-backdrop'), iframe = document.getElementById('paipai-iframe'), selBtn = $('#paipai-selection-btn');

    const openPaipai = (text = '') => {
        modal.css('display', 'flex').hide().fadeIn(200); backdrop.fadeIn(200);
        if(text) setTimeout(() => iframe.contentWindow.postMessage({ type: 'PaiPai_FillText', text: text }, '*'), 300);
    };

    \$('#paipai-close, #paipai-backdrop').on('click', () => { modal.fadeOut(200); backdrop.fadeOut(200); });

    const menuBtn = \$(`
    <div class="list-group-item flex-container flexGapSm" title="打开排排狗">
        <div class="menu_button_icon fa-solid fa-paw" style="color:#d8cdd0;"></div>
        <div class="menu_button_text">排排狗</div>
    </div>`);
    menuBtn.on('click', () => openPaipai());
    \$('#extensions_menu').append(menuBtn);

    \$(document).on('mouseup', '.mes_text', function(e) {
        let selectedText = window.getSelection().toString().trim();
        if (selectedText.length > 0) {
            selBtn.css({ top: e.pageY - 40 + 'px', left: e.pageX + 10 + 'px' }).fadeIn(150);
            selBtn.off('click').on('click', function() {
                openPaipai(selectedText); selBtn.fadeOut(100); window.getSelection().removeAllRanges();
            });
        } else { selBtn.fadeOut(100); }
    });

    $(document).on('mousedown', function(e) { if (!$(e.target).closest('#paipai-selection-btn').length) selBtn.fadeOut(100); });
    selBtn.on('mousedown', () => selBtn.css('transform', 'scale(0.95)')).on('mouseup', () => selBtn.css('transform', 'scale(1)'));
});
