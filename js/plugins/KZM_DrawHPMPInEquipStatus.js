/*
 * ----------------------------------------------------
 * Copyright (c) 有栖かずみ / Arisu Kazumi
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * ----------------------------------------------------
 */

/*:
 * @plugindesc 装備画面で最大HPと最大MPの表示も行う
 * @target MZ
 * @author 有栖かずみ / Arisu Kazumi
 * @url https://a-kazumi.com/plugins
 * @help 装備画面で最大HPと最大MPの表示も行う。
 * ただし、画面サイズによっては下の方に表示されるパラメータは見切れてしまう。
 *
 * 一番下に表示される「運」のステータスだけ表示/非表示を設定可能にしている。
 *
 * 2024/02/24 ver1.0.0 作成
 *
 * @param drawLuk
 * @text 運パラメータの表示
 * @desc 運パラメータの数値を表示するかどうか。
 * @on 表示する
 * @off 表示しない
 * @default true
 * @type boolean
 */

(() => {
    "use strict";

    const pluginName = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
    const params = PluginManager.parameters(pluginName);

    Window_EquipStatus.prototype.drawAllParams = function () {
        for (let i = 0; i < 8 - 1; i++) {
            const x = this.itemPadding();
            const y = this.paramY(i);
            this.drawItem(x, y, i);
        }
        if (params.drawLuk == "true") {
            const x = this.itemPadding();
            const y = this.paramY(7);
            this.drawItem(x, y, 7);
        }
    };
})();
