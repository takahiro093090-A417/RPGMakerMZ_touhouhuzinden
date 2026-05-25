//=============================================================================
// Keke_EquipSlopCustom - 装備スロットカスタム
// バージョン: 1.0.5
//=============================================================================
// Copyright (c) 2025 ケケー
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @target MZ
 * @plugindesc 装備スロットをカスタムする
 * @author ケケー
 * @url https://kekeelabo.com
 * 
 * @help
 * 【ver.1.0.5】
 * 装備スロットをキャラごとに自由にカスタムできる
 * スロット性能の概念があるのが最大の特徴
 * 
 * ● 機能一覧 ●

 * ■スロットを自由に構成
 * ■スロット性能(そのスロットの装備品にかける倍率)
 * ■スロットに武器タイプと防具タイプを設定可能(弓しか装備できないスロットなど)
 * ■プラグインコマンドでスロット構成を変更
 * ■プラグインコマンドで装備変更・装備全解除
 * ■装備能力をメモ欄で設定
 * 
 * 
 * ● 使い方 ●
 * 
 * ■【最初にやってみて】
 * 
 * [1]好きなアクターのメモ欄に <スロット構成: サンプル> と記入
 * 
 * [2]テストプレイ。装備スロットが変わっている！
 * 
 * [3]プラグインパラメータ → スロット構成登録 → サンプルの中身を確認
 * 　色々いじってみて使い方を覚えよう
 * 
 * [4]サンプルのスロットリストに項目を追加してみよう。スロットが増えるよ
 * 　項目を削除するとスロットが減る
 * 
 * [5]サンプル以外のスロット構成を作ってみよう
 * 　作ったら、「呼び出し名」に好きな名前を入力
 * 　その名前をアクターのメモ欄に <スロット構成: 呼び出し名> と記入すると、
 * 　スロット構成を適用できるぞ
 * 
 * 
 * ■【アクターのスロット構成を変更】
 * 
 * 【最初にやってみて】でやった通りにやればよい
 * 
 * [1]プラグインパラメータ → スロット構成登録　でスロット構成を作成
 * 
 * [2]アクター、職業、装備、ステートのメモ欄に、
 * 
 * <スロット構成: 呼び出し名>
 * 
 * ★例)
 * <スロット構成: プリシア>
 * 呼び出し名が「プリシア」のスロット構成を適用する
 * 
 * 
 * ■【プラグインコマンド】
 * 
 * プラグインコマンドで以下のことが行える
 * 
 * ●スロット構成の変更
 * ●装備の変更
 * ●装備の全解除
 * 
 * 独自のスロット構成の場合、イベントコマンドの「装備の変更」では対応できない
 * なので装備変更はプラグインコマンドで行おう
 * 
 * 
 * ■【装備能力をメモ欄で設定】
 * 装備の能力値変化量が 500 までしか設定できない？
 * 装備のメモ欄にこう記入してみよう
 * 
 * <装備能力: 最大HP:xxx 最大MP:xxx 最大TP:xxx 攻撃力:xxx 防御力:xxx 魔法力:xxx
 *   魔法防御:xxx 敏捷性:xxx 運:xxx 最大HP:xxx 最大MP:xxx>
 * 
 * 能力値変化量を無制限に設定できるぞ。また最大HPMPTPも加算式で設定できる
 * 攻撃力 とかの部分はデータベースの用語欄で設定した用語でもよい
 * ※最大TPの設定には『keke_TpCustom』プラグインが必要
 * 
 * ★例)
 * <装備能力: 攻撃力:1000>
 * 攻撃力を 1000 上げる
 * <装備能力: 魔法力:1000 最大MP:800>
 * 魔法力を 1000、最大MPを 800 上げる
 * 
 * 
 * ● 利用規約 ●
 * MITライセンスのもと、自由に使ってくれて大丈夫です
 * 
 * 
 * 
 * You can freely customize equipment slot for each character.
 * The concept of slot performance is the key feature.
 * 
 * ● Features List ●
 * 
 * ■ Freely configure slots.
 * ■ Slot performance (the multiplier applied to the equipment in that slot).
 * ■ Set weapon and armor types for slots.
 *   (e.g., a slot that can only equip bows)
 * ■ Change slot configuration with plugin commands.
 * ■ Change equipment or unequip all with plugin commands.
 * ■ Set equipment params in the memo field.
 * 
 * 
 * ● How to Use ●
 * 
 * ■【Try this first】
 * 
 * [1] Write <slotForm: sample> in the memo field of your preferred actor.
 * 
 * [2] Test play. The equipment slots have changed!
 * 
 * [3] Go to Plugin Parameters → slotFormMaking
 *   → Check the contents of "sample"
 *   Try adjusting things and learn how it works
 * 
 * [4] Try adding items to the Sample slot list. The slots will increase
 *   Deleting items will decrease the slots.
 * 
 * [5] Try creating a slot form other than the sample ones
 * After creating it, enter any name you like in the “slotFormName”.
 * Then, in the actor's notes, write <slotForm: slotFormName>,
 * and the slot form will be applied.
 * 
 * 
 * ■【Changing the Actor's Slot Form】
 * You can do it the same way as in the 【Try this first】 section.
 * 
 * [1] Create a slot form in the plugin parameters → slotFormMaking.
 * 
 * [2] In the notes of the actor, class, equipment, state, write:
 * 
 * <slotForm: slotFormName>
 * 
 * ★Example) 
 * <slotForm: pricia>
 * This will apply the slot form named "pricia".
 * 
 * 
 * ■【Plugin Commands】
 * 
 * You can perform the following using plugin commands:
 * 
 * ● Change Slot Form
 * ● Change Equipment
 * ● Remove All Equipment
 * 
 * For custom slot form, the “Change Equipment” event command won’t work.
 * So, use the plugin command to change equipment.
 * 
 * 
 * ■【Set equipment params in the memo field】
 * 
 * Is the parameter value change limited to 500?
 * Try writing the following in the equipment’s notes:
 * 
 * <equipParam: maxHp:xxx maxMP:xxx maxTp:xxx atk:xxx def:xxx mat:xxx
 *   mdf:xxx age:xxx luk:xxx maxHP:xxx maxMp:xxx>
 * 
 * This allows you to set the parameter value changes without limit.
 * The maximum HPMPTP can also be set additively.
 * Terms like "atk" can also be set using the terms defined in the database.
 * ※ The "Keke_TpCustom" plug-in is required to set maximum TP.
 * 
 * ★Example)
 * <equipParam: atk:1000>
 * Increases atk by 1000.
 * <equipParam: mat:1000 maxMp:800>
 * Increases mat by 1000 and MaxMp by 800.
 * 
 * 
 * ● Terms of Use ●
 * You are free to use this under the MIT License.
 *
 *
 *
 * @param スロット構成登録
 * @desc slotFormMaking 装備スロットの構成を作成して登録する
 * @type struct<slotForm>[]
 * @default ["{\"呼び出し名\":\"サンプル\",\"スロットリスト\":\"[\\\"{\\\\\\\"タグ\\\\\\\":\\\\\\\"武器\\\\\\\",\\\\\\\"装備タイプID\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"表示名\\\\\\\":\\\\\\\"両手持ち\\\\\\\",\\\\\\\"武器タイプID\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"防具タイプID\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"スロット性能\\\\\\\":\\\\\\\"300\\\\\\\",\\\\\\\"装備固定\\\\\\\":\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"タグ\\\\\\\":\\\\\\\"頭\\\\\\\",\\\\\\\"装備タイプID\\\\\\\":\\\\\\\"3\\\\\\\",\\\\\\\"表示名\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"武器タイプID\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"防具タイプID\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"スロット性能\\\\\\\":\\\\\\\"100\\\\\\\",\\\\\\\"装備固定\\\\\\\":\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"タグ\\\\\\\":\\\\\\\"身体\\\\\\\",\\\\\\\"装備タイプID\\\\\\\":\\\\\\\"4\\\\\\\",\\\\\\\"表示名\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"武器タイプID\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"防具タイプID\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"スロット性能\\\\\\\":\\\\\\\"100\\\\\\\",\\\\\\\"装備固定\\\\\\\":\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"タグ\\\\\\\":\\\\\\\"装飾品\\\\\\\",\\\\\\\"装備タイプID\\\\\\\":\\\\\\\"5\\\\\\\",\\\\\\\"表示名\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"武器タイプID\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"防具タイプID\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"スロット性能\\\\\\\":\\\\\\\"150\\\\\\\",\\\\\\\"装備固定\\\\\\\":\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"タグ\\\\\\\":\\\\\\\"装飾品\\\\\\\",\\\\\\\"装備タイプID\\\\\\\":\\\\\\\"5\\\\\\\",\\\\\\\"表示名\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"武器タイプID\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"防具タイプID\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"スロット性能\\\\\\\":\\\\\\\"150\\\\\\\",\\\\\\\"装備固定\\\\\\\":\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"タグ\\\\\\\":\\\\\\\"装飾品\\\\\\\",\\\\\\\"装備タイプID\\\\\\\":\\\\\\\"5\\\\\\\",\\\\\\\"表示名\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"武器タイプID\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"防具タイプID\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"スロット性能\\\\\\\":\\\\\\\"150\\\\\\\",\\\\\\\"装備固定\\\\\\\":\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"タグ\\\\\\\":\\\\\\\"武器\\\\\\\",\\\\\\\"装備タイプID\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"表示名\\\\\\\":\\\\\\\"隠し刀\\\\\\\",\\\\\\\"武器タイプID\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"防具タイプID\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"スロット性能\\\\\\\":\\\\\\\"75\\\\\\\",\\\\\\\"装備固定\\\\\\\":\\\\\\\"\\\\\\\"}\\\"]\"}","{\"呼び出し名\":\"sample\",\"スロットリスト\":\"[\\\"{\\\\\\\"タグ\\\\\\\":\\\\\\\"武器\\\\\\\",\\\\\\\"装備タイプID\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"表示名\\\\\\\":\\\\\\\"両手持ち\\\\\\\",\\\\\\\"武器タイプID\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"防具タイプID\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"スロット性能\\\\\\\":\\\\\\\"300\\\\\\\",\\\\\\\"装備固定\\\\\\\":\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"タグ\\\\\\\":\\\\\\\"頭\\\\\\\",\\\\\\\"装備タイプID\\\\\\\":\\\\\\\"3\\\\\\\",\\\\\\\"表示名\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"武器タイプID\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"防具タイプID\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"スロット性能\\\\\\\":\\\\\\\"100\\\\\\\",\\\\\\\"装備固定\\\\\\\":\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"タグ\\\\\\\":\\\\\\\"身体\\\\\\\",\\\\\\\"装備タイプID\\\\\\\":\\\\\\\"4\\\\\\\",\\\\\\\"表示名\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"武器タイプID\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"防具タイプID\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"スロット性能\\\\\\\":\\\\\\\"100\\\\\\\",\\\\\\\"装備固定\\\\\\\":\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"タグ\\\\\\\":\\\\\\\"装飾品\\\\\\\",\\\\\\\"装備タイプID\\\\\\\":\\\\\\\"5\\\\\\\",\\\\\\\"表示名\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"武器タイプID\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"防具タイプID\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"スロット性能\\\\\\\":\\\\\\\"150\\\\\\\",\\\\\\\"装備固定\\\\\\\":\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"タグ\\\\\\\":\\\\\\\"装飾品\\\\\\\",\\\\\\\"装備タイプID\\\\\\\":\\\\\\\"5\\\\\\\",\\\\\\\"表示名\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"武器タイプID\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"防具タイプID\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"スロット性能\\\\\\\":\\\\\\\"150\\\\\\\",\\\\\\\"装備固定\\\\\\\":\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"タグ\\\\\\\":\\\\\\\"装飾品\\\\\\\",\\\\\\\"装備タイプID\\\\\\\":\\\\\\\"5\\\\\\\",\\\\\\\"表示名\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"武器タイプID\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"防具タイプID\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"スロット性能\\\\\\\":\\\\\\\"150\\\\\\\",\\\\\\\"装備固定\\\\\\\":\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"タグ\\\\\\\":\\\\\\\"武器\\\\\\\",\\\\\\\"装備タイプID\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"表示名\\\\\\\":\\\\\\\"隠し刀\\\\\\\",\\\\\\\"武器タイプID\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"防具タイプID\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"スロット性能\\\\\\\":\\\\\\\"75\\\\\\\",\\\\\\\"装備固定\\\\\\\":\\\\\\\"\\\\\\\"}\\\"]\"}"]
 * 
 * @param スロット性能表示
 * 
 * @param スロット性能を表示
 * @parent スロット性能表示
 * @desc showSlotPow スロット性能を表示する
 * @type boolean
 * @default true
 * 
 * @param スロット性能の文字サイズ
 * @parent スロット性能表示
 * @desc slotPowFontSize スロット性能の文字サイズ。空欄だと標準サイズ。+1 で標準サイズ + 1、-1 で標準サイズ - 1。気他 18
 * @default 18
 * 
 * @param スロット性能の文字色
 * @parent スロット性能表示
 * @desc slotPowTextColor スロット性能の文字色。5 なら 5番のテキストカラー。空欄ならシステムカラー。基本 24
 * @default 24
 * 
 * @param スロット性能の間隔
 * @parent スロット性能表示
 * @desc slotPowSpace スロット性能と装備の間の間隔。5 なら 5ピクセル。基本 0
 * @default 0
 *
 *
 *
 * @command スロット構成の変更
 * @desc アクターのスロット構成を変更する。ここで設定したスロット構成はデータベースのものより優先される
 *
 * @arg 対象アクター
 * @desc targetActor スロット構成を変更するアクター
 * @type actor
 * 
 * @arg スロット構成
 * @desc slotForm アクターに適用するスロット構成。スロット構成登録した呼び出し名を記入。空欄の場合はスロット構成を消去
 * 
 * 
 * 
 * @command 装備の変更
 * @desc アクターの装備を変更する。装備する武器も防具も指定しない場合は装備を外す
 *
 * @arg 対象アクター
 * @desc targetActor 装備を変更するアクター
 * @type actor
 * 
 * @arg スロットID
 * @desc slotId 装備を変更するスロットのID。1～
 * 
 * @arg 武器
 * @desc weapon 装備する武器
 * @type weapon
 * 
 * @arg 防具
 * @desc armor 装備する防具
 * @type armor
 * 
 * @arg 強制装備
 * @desc forceEquip 武器防具を所持していなくても強制的に装備する
 * @type boolean
 * 
 * 
 * 
 * @command 装備の全解除
 * @desc アクターの装備を全て外す
 *
 * @arg 対象アクター
 * @desc targetActor 装備を全解除するアクター
 * @type actor
 * 
 * 
 * 
 * @command 最強装備
 * @desc アクターに最強装備をさせる
 *
 * @arg 対象アクター
 * @desc targetActor 装備を全解除するアクター
 * @type actor
 */



//==================================================
/*~struct~slotForm:
//==================================================
 * @param 呼び出し名
 * @desc callName データベースのメモ欄や、プラグインコマンドからの呼び出しに使う名前
 * 
 * @param スロットリスト
 * @desc slotList 各装備スロットの設定
 * @type struct<equipSlot>[]
 */



//==================================================
/*~struct~equipSlot:
//==================================================
 * @param タグ
 * @desc tag 何を記入してもいい欄。見てわかりやすくする用に
 * 
 * @param 装備タイプID
 * @desc equipTypeId スロットの装備タイプID。1 は武器、2 以降は防具として扱われる
 * 
 * @param 表示名
 * @desc showName 実際に表示されるスロット名。空欄なら装備タイプ名
 * 
 * @param 武器タイプID
 * @desc weaponTypeID スロットに装備できる武器タイプID。, で複数、~ でまとめて指定。空欄なら全て装備可能
 * 
 * @param 防具タイプID
 * @desc armorTypeID スロットに装備できる防具タイプID。, で複数、~ でまとめて指定。空欄なら全て装備可能
 * 
 * @param スロット性能
 * @desc slotPower スロットの装備品にかける倍率。150 なら 150%。変数使用可能で、100 + \v[10] なら 100 + (変数[10]の値)%
 * @default 100
 * 
 * @param 装備固定
 * @desc equipLock スロットを装備変更できないようにする
 */
 
 
 
(() => {
    //- プラグイン名
    const pluginName = document.currentScript.src.match(/^.*\/(.*).js$/)[1];



    //==================================================
    //--  公開
    //==================================================

    //- 装備の最大TP
    Game_Temp.prototype.equipMaxTpKe = function(actor) {
        return SlotManager.equipMaxTp(actor);
    };
    


    //==================================================
    //--  文字列オート変換 /ベーシック
    //==================================================
    
    // 文字列のハッシュ化
    function strToHash(str) {
        if (!str || !str.length) { return {}; }
        let hash = {};
        const strs = JSON.parse(str);
        let val = null;
        let val2 = null;
        for (let key in strs) {
            val = strs[key];
            if (!key || !val) { continue; }
            val2 = strToAuto(val, key);
            hash[key] = val2;
        }
        return hash;
    };
    
    // 文字列のリスト化
    function strToList(str) {
        if (!str || !str.length) { return []; }
        let array = JSON.parse(str);
        return array.map((val, i) => {
            return strToAuto(val);
        });
    };
    
    // 文字列の自動処理
    function strToAuto(val, key = "") {
        let val2 = null;
        let match = null;
        let end = false;
        if (!end) {
            if (val[0] == "{") {
                val2 = strToHash(val);
                end = true;
            }
        }
        if (!end) {
            if (val[0] == "[") {
                val2 = strToList(val);
                end = true;
            }
        }
        if (!end) { val = val + ","; }
        if (!end) {
            match = val.match(/^\s*(-?\d+,\s*-?\d+,\s*-?\d+,?\s*-?\d*\.?\d*)\s*,$/);
            if (match && !val.match(/[^\d\.\-,\s]/)) {
                if (key.match(/カラー|色|塗り|color|paint/i) && !key.match(/トーン|tone/i) && !key.match(/ブレンド|blend/i) && !key.match(/配色|scheme/i) && !key.match(/着色|coloring/i) &&  !key.match(/フラッシュ|flash/i) && !key.match(/チェンジ|change/i) &&  !key.match(/選択|select/i)) {
                    val2 = "rgba(" +  match[1] + ")";
                } else {
                    val2 = JSON.parse("[" +  match[1] + "]");
                }
                end = true;
            }
        }
        if (!end) {
            match = val.match(/(-?\d+\.?\d*),\s*/g);
            if (match && match.length >= 2 && !val.match(/[^\d\.\-,\s]/)) {
                val2 = JSON.parse("[" + match.reduce((r, s) => r + s).replace(/,$/, "") + "]");
                end = true;
            }
        }
        if (!end) {
            match = val.match(/^(true|false)\s*,/);
            if (match) {
                val2 = match[1] == "true" ? true : false;
                end = true;
            }
        }
        if (!end) {
            match = val.match(/^(-?\d+\.?\d*)\s*,/);
            if (match && !val.match(/[^\d\.\-,\s]/)) {
                val2 = Number(match[1]); end = true;
                end = true;
            }
        }
        if (!end) {
            match = val.match(/^.+,\n?.+/);
            if (match) {
                val2 = val.replace(/\s/g, "").split(/,|\n/).filter(v => v);
                end = true;
            }
        }
        if (!end) {
            if (val[0] == "\"") { val = val.slice(1); }
            val2 = val.slice(0, -1);
        }
        if (key.match(/アニメ|anime/i)) {
            val2 = delLineBreak(val2);
        }
        return val2;
    };

    //- 改行の消去
    function delLineBreak(v) {
        if (typeof v == "string") { v = v.replace(/\n/g, "") }
        if (Array.isArray(v)) { v = v.map(e => (typeof e == "string") ? e.replace(/\n/g, "") : e); }
        return v;
    };



    //==================================================
    //--  パラメータ受け取り
    //==================================================
    
    //- 真偽化
    function toBoolean(str) {
        if (!str) { return false; }
        const str2 = str.toString().toLowerCase();
        if (str2 == "true" || str2 == "on") { return true; }
        if (str2 == "false" || str2 == "off") { return false; }
        return Number(str);
    };

    let parameters = PluginManager.parameters(pluginName);
    
    const keke_slotFormList = strToList(parameters["スロット構成登録"]);

    //- スロット性能表示
    const keke_showSlotPow = toBoolean(parameters["スロット性能を表示"]);
    const keke_slotPowFontSize = parameters["スロット性能の文字サイズ"];
    const keke_slotPowTextColor = Number(parameters["スロット性能の文字色"]);
    const keke_slotPowSpace = Number(parameters["スロット性能の間隔"]);

    parameters = null;
    
    
    
    //==================================================
    //--  プラグインコマンド
    //==================================================
    
    //- スロット構成の変更
    PluginManager.registerCommand(pluginName, "スロット構成の変更", args => {
        const actorId = Number(args["対象アクター"]);
        const actor = $gameParty.members().find(a => a._actorId == actorId);
        if (!actor) { return; }
        actor._slotFormNameKe = args["スロット構成"];
    });


    //- 装備の変更
    PluginManager.registerCommand(pluginName, "装備の変更", args => {
        const actorId = Number(args["対象アクター"]);
        const actor = $gameParty.members().find(a => a._actorId == actorId);
        if (!actor) { return; }
        // スロットマネージャー/装備の変更
        SlotManager.changeEquip(actor, Number(args["スロットID"]) - 1, Number(args["武器"]), Number(args["防具"]), toBoolean(args["強制装備"]));
    });


    //- 装備の全解除
    PluginManager.registerCommand(pluginName, "装備の全解除", args => {
        const actorId = Number(args["対象アクター"]);
        const actor = $gameParty.members().find(a => a._actorId == actorId);
        if (!actor) { return; }
        // 装備クリアの処理
        actor.clearEquipments();
    });


    //- 最強装備
    PluginManager.registerCommand(pluginName, "最強装備", args => {
        const actorId = Number(args["対象アクター"]);
        const actor = $gameParty.members().find(a => a._actorId == actorId);
        if (!actor) { return; }
        // 最強装備の処理
        actor.optimizeEquipments();
    });



    //==================================================
    //--  クラス /スロットマネージャー /開始
    //==================================================

    class Game_SlotManager {
        constructor() {
            // 変数の初期化
            this.initMembers();
        };

        //- 変数の初期化
        initMembers() {
            
        };


        //- 装備の初期化
        initEquips(actor, equips, slotForm) {
            // 装備スロット配列
            const slots = this.equipSlots(actor, slotForm);
            // スロット数
            const maxSlots = slots.length;
            actor._equips = [];
            // 各スロットを作成
            for (let i = 0; i < maxSlots; i++) {
                actor._equips[i] = new Game_Item();
            }
            // 各スロットに初期装備を適用
            for (let j = 0; j < maxSlots; j++) {
                actor._equips[j].setEquip(slots[j] === 1, equips[j]);
            }
            actor.releaseUnequippableItems(true);
            actor.refresh();
        };


        //- 装備スロット配列
        equipSlots(actor, slotForm) {
            // スロット数の取得
            const slotNum = this.getSlotNum(actor, slotForm);
            if (!slotNum) { return false; }
            // 各スロットIDを作成
            const slots = [];
            for (let i = 0; i < slotNum; i++) {
                // スロット装備タイプの取得
                const etypeId = this.getSlotEquipType(actor, i, slotForm);
                slots.push(etypeId);
            }
            return slots;
        };



    //==================================================
    //--  クラス /スロットマネージャー /取得
    //==================================================

        //- スロット構成の取得
        getSlotForm(actor) {
            // 呼び出し名を取得
            const slotFormName = actor._slotFormNameKe || this.getSlotFormName(actor);
            if (!slotFormName) { return; }
            // スロット構成を取得
            const slotForm = keke_slotFormList.find(d => d["呼び出し名"] == slotFormName);
            if (!slotForm) { return; }
            // スロットリストを返す
            return slotForm["スロットリスト"];
        };

        //- 呼び出し名の取得
        getSlotFormName(actor) {
            // 全てのメタの合算-配列
            const metas = bundleAllMeta_array(actor, ["スロット構成", "slotForm"]);
            if (!metas || !metas.length) { return; }
            // 呼び出し名を取得
            let slotFormName = "";
            metas.forEach((meta, i) => {
                const str = meta.replace(/\s/i, "");
                if (str) { slotFormName = str; }
            });
            return slotFormName;
        };

        //- スロット数の取得
        getSlotNum(actor, slotForm) {
            if (!actor) { return; }
            // スロット構成の取得
            slotForm = slotForm || this.getSlotForm(actor);
            if (!slotForm || !slotForm.length) { return; }
            // スロットリストの数を返す
            return slotForm.length;
        };

        //- スロットデータの取得
        getSlotData(actor, index, slotForm) {
            if (!actor) { return; }
            // スロット構成の取得
            slotForm = slotForm || this.getSlotForm(actor);
            if (!slotForm || !slotForm.length) { return; }
            // スロットデータを返す
            return slotForm[index];
        };

        //- スロット装備タイプの取得
        getSlotEquipType(actor, index, slotForm) {
            // スロットデータの取得
            const slotData = this.getSlotData(actor, index, slotForm);
            if (!slotData) { return; }
            // 装備タイプを返す
            return slotData["装備タイプID"];
        };

        //- スロット武器タイプの取得
        getSlotWeaponType(actor, index, slotForm) {
            // 装備タイプが武器か判定
            const etypeId = this.getSlotEquipType(actor, index, slotForm);
            if (etypeId != 1) { return []; }
            // スロットデータの取得
            const slotData = this.getSlotData(actor, index, slotForm);
            if (!slotData) { return []; }
            // 武器タイプを返す
            return strToNumList(slotData["武器タイプID"]);
        };

        //- スロット防具タイプの取得
        getSlotArmorType(actor, index, slotForm) {
            // 装備タイプが防具か判定
            const etypeId = this.getSlotEquipType(actor, index, slotForm);
            if (etypeId == 1) { return []; }
            // スロットデータの取得
            const slotData = this.getSlotData(actor, index, slotForm);
            if (!slotData) { return []; }
            // 防具タイプを返す
            return strToNumList(slotData["防具タイプID"]);
        };

        //- スロット名の取得
        getSlotName(actor, index, slotForm) {
            // スロットデータの取得
            const slotData = this.getSlotData(actor, index, slotForm);
            if (!slotData) { return ""; }
            // 装備タイプを取得
            const etypeId = this.getSlotEquipType(actor, index, slotForm) || 0;
            const etypeName = $dataSystem.equipTypes[etypeId];
            // 武器タイプか防具タイプの名前を取得
            let typeName = "";
            if (etypeId == 1) {
                const wtypeId = this.getSlotWeaponType(actor, index, slotForm)[0] || 0;
                typeName = $dataSystem.weaponTypes[wtypeId];
            } else {
                const atypeId = this.getSlotArmorType(actor, index, slotForm)[0] || 0;
                typeName = $dataSystem.armorTypes[atypeId];
            }
            // スロット名を返す
            return slotData["表示名"] || typeName || etypeName;
        };

        //- スロット性能の取得
        getSlotPow(actor, index, slotForm) {
            // スロットデータの取得
            const slotData = this.getSlotData(actor, index, slotForm);
            if (!slotData) { return; }
            // スロット性能を返す
            return newFunc_var(slotData["スロット性能"]) || 100;
        };



    //==================================================
    //--  クラス /スロットマネージャー /装備リスト
    //==================================================

        //- スロット構成があるか
        isSlotForm(actor) {
            return this.getSlotForm(actor);
        };


        //- リスト追加判定
        includes(item, actor, index, slotForm) {
            if (!item) { return true;}
            // スロットデータを取得
            const slotData = slotForm[index];
            if (!slotData) { return false; }
            // 装備可能判定
            if (!actor.canEquip(item)) { return false; }
            // 装備タイプの判定
            if (!this.checkEquipType(item, actor, index, slotForm)) { return false; }
            // 武器タイプの判定
            if (!this.checkWeaponType(item, actor, index, slotForm)) { return false; }
            // 防具タイプの判定
            if (!this.checkArmorType(item, actor, index, slotForm)) { return false; }
            return true;
        };

        //- 装備タイプの判定
        checkEquipType(item, actor, index, slotForm) {
            const etypeId = this.getSlotEquipType(actor, index, slotForm);
            if (!etypeId) { return false; }
            if (item.etypeId != etypeId) { return false; }
            return true;
        };

        //- 武器タイプの判定
        checkWeaponType(item, actor, index, slotForm) {
            // スロット武器タイプの取得
            const wtypeIds = this.getSlotWeaponType(actor, index, slotForm);
            if (!wtypeIds.length) { return true; }
            // 装備の武器タイプがスロットに含まれているか判定
            if (!wtypeIds.includes(item.wtypeId)) { return false; }
            return true;
        };

        //- 防具タイプの判定
        checkArmorType(item, actor, index, slotForm) {
            // スロット防具タイプの取得
            const atypeIds = this.getSlotArmorType(actor, index, slotForm);
            if (!atypeIds.length) { return true; }
            // 装備の防具タイプがスロットに含まれているか判定
            if (!atypeIds.includes(item.atypeId)) { return false; }
            return true;
        };



    //==================================================
    //--  クラス /スロットマネージャー /装備変更
    //==================================================

        //- ベストな装備アイテム
        bestEquipItem(actor, slotId, slotForm) {
            const items = $gameParty.equipItems().filter(item => this.includes(item, actor, slotId, slotForm));
            let bestItem = null;
            let bestPerformance = -1000;
            for (let i = 0; i < items.length; i++) {
                // 装備効果の計算
                const performance = this.calcEquipItemPerformance(items[i]);
                if (performance > bestPerformance) {
                    bestPerformance = performance;
                    bestItem = items[i];
                }
            }
            return bestItem;
        };

        //- 装備効果の計算
        calcEquipItemPerformance(item) {
            // データベースの能力値合計を取得
            const dataParam = item.params.reduce((a, b) => a + b);
            // メモ欄の能力値合計を取得
            const memoParam = this.getParamTotalByMemo(item);
            // 特徴の合計を取得
            const traitsParam = item.traits.reduce((r, trait) => r + trait.value, 0);
            // 合計
            return dataParam + memoParam + traitsParam;
        };


        //- 装備変更可能か
        isEquipChangeOk(actor, slotId) {
            // スロットデータの取得
            const slotData = this.getSlotData(actor, slotId);
            if (!slotData) { return true; }
            return !slotData["装備固定"];
        };


        //- 装備の変更
        changeEquip(actor, slotId, weaponId, armorId, force) {
            if (slotId < 0) { return; }
            // 武器と防具のデータを取得
            let item = null;
            if (weaponId) {
                item = $dataWeapons[weaponId];
            } else if (armorId) {
                item = $dataArmors[armorId];
            }
            // 装備を変更
            if (force) {
                actor.forceChangeEquip(slotId, item);
            } else {
                actor.changeEquip(slotId, item);
            }
        };



        //==================================================
        //--  クラス /スロットマネージャー /スロット性能の適用
        //==================================================

        //- 加算能力値
        paramPlus(actor, paramId, slotForm) {
            let value = Game_Battler.prototype.paramPlus.call(actor, paramId);

            // 全ての装備を処理
            actor.equips().forEach((item, i) => {
                if (!item) { return; }
                // スロット性能の取得
                const slotPow = this.getSlotPow(this, i, slotForm) / 100;
                // メモ欄からの装備性能の取得
                const paramMemo = this.getEquipParamByMemo(item, paramId);
                // 装備の能力値にスロット性能を乗算する
                value += Math.round((item.params[paramId] + paramMemo) * slotPow);
            });
            return value;
        };

        //- メモ欄からの装備能力の取得
        getEquipParamByMemo(item, paramId) {
            const metas = metaAll(item.note, ["装備能力", "equipParam"]);
            if (!metas || !metas.length) { return 0; }
            // 全てメタを検索
            for (const meta of metas.reverse()) {
                // 数字マッチ
                let matches = meta.match(/\d+\s*:\s*([^\s,]+)/ig) || [];
                for (const match of matches) {
                    const strs = match.split(":");
                    const id = Number(strs[0]);
                    if (id == paramId) {
                        return Number(strs[1]);
                    }
                };
                // 名前マッチ
                matches = meta.match(/[^\s,:]+\s*:\s*([^\s,]+)/ig) || [];
                for (const match of matches) {
                    const strs = match.split(":");
                    const name = strs[0].replace(/\s/g, "");
                    // 名前とパラムIDの照合
                    if (this.meetsNameAndparamId(name, paramId)) {
                        return Number(strs[1]);
                    }
                };
                // 用語マッチ
                matches = meta.match(/[^\s,:]+\s*:\s*([^\s,]+)/ig) || [];
                for (const match of matches) {
                    const strs = match.split(":");
                    const name = strs[0].replace(/\s/g, "");
                    // 用語とパラムIDの照合
                    const paramName = TextManager.param(paramId);
                    if (name == paramName) {
                        return Number(strs[1]);
                    }
                };
            }
            return 0;
        };

        //- メモ欄からの能力合計の取得
        getParamTotalByMemo(item) {
            // 全パラムID
            const paramIds = [0, 1, "tp", 2, 3, 4, 5, 6, 7];
            let memoParam = 0;
            // 全パラムIDのメモ欄能力を取得
            paramIds.forEach(paramId => {
                memoParam += this.getEquipParamByMemo(item, paramId);
            });
            return memoParam;
        };

        //- 名前とパラムIDの照合
        meetsNameAndparamId(name, paramId) {
            if (!name) { return false; }
            let id = null;
            if (name.match(/最大HP|maxHp|mhp|hp/i)) { id = 0; } else
            if (name.match(/最大MP|maxMp|mmp|mp/i)) { id = 1; } else
            if (name.match(/最大TP|maxTp|mtp|tp/i)) { id = "tp"; } else
            if (name.match(/攻撃力|attack|atk/i)) { id = 2; } else
            if (name.match(/防御力|defence|def/i)) { id = 3; } else
            if (name.match(/魔法力|magicAttack|mat/i)) { id = 4; } else
            if (name.match(/魔法防御|magicDefence|mdf/i)) { id = 5; } else
            if (name.match(/敏捷性|agility|agi/i)) { id = 6; } else
            if (name.match(/運|luck|luk/i)) { id = 7; }
            return id == paramId;
        };


        //- 装備の最大TP
        equipMaxTp(actor) {
            // スロット構成の取得
            const slotForm = SlotManager.getSlotForm(actor);
            if (!slotForm) { return 0; }
            let value = 0;
            // 全ての装備を処理
            actor.equips().forEach((item, i) => {
                if (!item) { return; }
                // スロット性能の取得
                const slotPow = this.getSlotPow(this, i, slotForm) / 100;
                // メモ欄からの装備性能の取得
                const paramMemo = this.getEquipParamByMemo(item, "tp");
                // 装備の能力値にスロット性能を乗算する
                value += Math.round(paramMemo * slotPow);
            });
            return value;
        };



        //==================================================
        //--  クラス /スロットマネージャー /スロット性能の描画
        //==================================================

        //- 性能付きスロットの描画
        drawSlotWidthPow(windo, index, slotForm) {
            if (!windo._actor) { return; }
            const slotName = windo.actorSlotName(windo._actor, index);
            const item = windo.itemAt(index);
            const slotNameWidth = windo.slotNameWidth();
            const rect = windo.itemLineRect(index);
            // スロット性能を取得
            const slotPow = this.getSlotPow(windo._actor, index, slotForm);
            const slotPowStr = slotPow + "% ";
            const powSpace = keke_slotPowSpace;
            // スロット名を描画
            windo.changeTextColor(ColorManager.systemColor());
            windo.changePaintOpacity(windo.isEnabled(index));
            windo.drawText(slotName, rect.x, rect.y, slotNameWidth);
            // スロット性能を描画
            const fontSizeOri = windo.contents.fontSize;
            windo.contents.fontSize = getFontSize(keke_slotPowFontSize, fontSizeOri);
            windo.contents.textColor = ColorManager.textColor(keke_slotPowTextColor);
            const slotPowWidth = windo.contents.measureTextWidth("100% "); //keke_slotPowWidth;
            windo.drawText(slotPowStr, rect.x + slotNameWidth, rect.y, slotPowWidth, "right");
            windo.contents.fontSize = fontSizeOri;
            // 装備を描画
            const itemWidth = rect.width - slotNameWidth - slotPowWidth - powSpace;
            windo.drawItemName(item, rect.x + slotNameWidth + slotPowWidth + powSpace, rect.y, itemWidth);
            windo.changePaintOpacity(true);
        };

        //- 性能付きスロットの描画-ステータス
        drawSlotWidthPow_status(windo, index, slotForm) {
            if (!windo._actor) { return; }
            const rect = windo.itemLineRect(index);
            const equips = windo._actor.equips();
            const item = equips[index];
            const slotName = windo.actorSlotName(windo._actor, index);
            const slotNameWidth = 138;
            // スロット性能を取得
            const slotPow = this.getSlotPow(windo._actor, index, slotForm);
            const slotPowStr = "" + slotPow + "% ";
            const powSpace = keke_slotPowSpace;
            // スロット名を描画
            windo.changeTextColor(ColorManager.systemColor());
            windo.drawText(slotName, rect.x, rect.y, slotNameWidth, rect.height);
            // スロット性能を描画
            const fontSizeOri = windo.contents.fontSize;
            windo.contents.fontSize = getFontSize(keke_slotPowFontSize, fontSizeOri);
            windo.contents.textColor = ColorManager.textColor(keke_slotPowTextColor);
            const slotPowWidth = windo.contents.measureTextWidth("100% "); //keke_slotPowWidth;
            windo.drawText(slotPowStr, rect.x + slotNameWidth, rect.y, slotPowWidth, rect.height);
            windo.contents.fontSize = fontSizeOri;
            // 装備を描画
            const itemWidth = rect.width - slotNameWidth - slotPowWidth - powSpace;
            windo.drawItemName(item, rect.x + slotNameWidth + slotPowWidth + powSpace, rect.y, itemWidth);
            windo.changePaintOpacity(true);
        };

    };

    // マネージャーを変数にセット
    const SlotManager = new Game_SlotManager();
    
    
    
    //==================================================
    //--  共通開始
    //==================================================

    //- ゲームアクター/装備の初期化(処理追加)
    const _Game_Actor_initEquips = Game_Actor.prototype.initEquips;
    Game_Actor.prototype.initEquips = function(equips) {
        // スロット構成があるなら
        const slotForm = SlotManager.getSlotForm(this);
        if (slotForm) {
            // スロットマネージャー/装備の初期化
            SlotManager.initEquips(this, equips, slotForm);
            return;
        }

        _Game_Actor_initEquips.apply(this, arguments);
    };

    //- ゲームアクター/装備スロット(処理追加)
    const _Game_Actor_equipSlots = Game_Actor.prototype.equipSlots;
    Game_Actor.prototype.equipSlots = function() {
        // スロット構成があるなら
        const slotForm = SlotManager.getSlotForm(this);
        if (slotForm) {
            // スロットマネージャー/装備スロット配列
            return SlotManager.equipSlots(this, slotForm);
        }

        return _Game_Actor_equipSlots.apply(this);
    };


    //- ウインドウ・エクイップスロット/最大項目数(処理追加)
    const _Window_EquipSlot_maxItems = Window_EquipSlot.prototype.maxItems;
    Window_EquipSlot.prototype.maxItems = function() {
        // スロットマネージャー/スロット数の取得
        const slotNum = SlotManager.getSlotNum(this._actor);
        if (slotNum) { return slotNum; }

        return _Window_EquipSlot_maxItems.apply(this);
    };

    //- ウインドウ・ステータスエクイップ/最大項目数(処理追加)
    const _Window_StatusEquip_maxItems = Window_StatusEquip.prototype.maxItems;
    Window_StatusEquip.prototype.maxItems = function() {
        // スロットマネージャー/スロット数の取得
        const slotNum = SlotManager.getSlotNum(this._actor);
        if (slotNum) { return slotNum; }

        return _Window_StatusEquip_maxItems.apply(this);
    };


    //- ウインドウ・ステータスベース/アクターのスロット名(処理追加)
    const _Window_StatusBase_actorSlotName = Window_StatusBase.prototype.actorSlotName;
    Window_StatusBase.prototype.actorSlotName = function(actor, index) {
        // スロットマネージャー/スロット名の取得
        const slotName = SlotManager.getSlotName(actor, index);
        if (slotName) { return slotName; }

        return _Window_StatusBase_actorSlotName.apply(this, arguments);
    };


    //- ウインドウ・エクイップスロット/項目の描画
    const _Window_EquipSlot_drawItem = Window_EquipSlot.prototype.drawItem;
    Window_EquipSlot.prototype.drawItem = function(index) {
        // スロット構成があるなら
        const slotForm = SlotManager.getSlotForm(this._actor);
        if (slotForm && keke_showSlotPow) {
            // スロットマネージャー/性能付きスロットの描画
            return SlotManager.drawSlotWidthPow(this, index, slotForm);
        }

        _Window_EquipSlot_drawItem.apply(this, arguments);
    };

    //- ウインドウ・ステータスエクイップ/項目の描画
    const _Window_StatusEquip_drawItem = Window_StatusEquip.prototype.drawItem;
    Window_StatusEquip.prototype.drawItem = function(index) {
        // スロット構成があるなら
        const slotForm = SlotManager.getSlotForm(this._actor);
        if (slotForm && keke_showSlotPow) {
            // スロットマネージャー/性能付きスロットの描画-ステータス
            return SlotManager.drawSlotWidthPow_status(this, index, slotForm);
        }

        _Window_StatusEquip_drawItem.apply(this, arguments);
    };



    //==================================================
    //--  共通処理
    //==================================================

    //- ウインドウ・エクイップアイテム/リスト追加判定(処理追加)
    const _Window_EquipItem_includes = Window_EquipItem.prototype.includes;
    Window_EquipItem.prototype.includes = function(item) {
        // スロット構成があるなら
        const slotForm = SlotManager.getSlotForm(this._actor);
        if (slotForm) {
            // スロットマネージャー/リスト追加判定
            return SlotManager.includes(item, this._actor, this._slotId, slotForm);
        }

        return _Window_EquipItem_includes.apply(this, arguments);
    };


    //- ゲームアクター/ベスト装備アイテム(処理追加)
    const _Game_Actor_bestEquipItem = Game_Actor.prototype.bestEquipItem;
    Game_Actor.prototype.bestEquipItem = function(slotId) {
        // スロット構成があるなら
        const slotForm = SlotManager.getSlotForm(this);
        if (slotForm) {
            // スロットマネージャー/ベストな装備アイテム
            return SlotManager.bestEquipItem(this, slotId, slotForm);
        }

        return _Game_Actor_bestEquipItem.apply(this, arguments);
    };


    //- ゲームアクター/加算能力値(処理追加)
    const _Game_Actor_paramPlus = Game_Actor.prototype.paramPlus;
    Game_Actor.prototype.paramPlus = function(paramId) {
        // スロット構成があるなら
        const slotForm = SlotManager.getSlotForm(this);
        if (slotForm) {
            // スロットマネージャー/加算能力値
            return SlotManager.paramPlus(this, paramId, slotForm);
        }

        return _Game_Actor_paramPlus.apply(this, arguments);
    };


    //- ゲームアクター/装備変更可能か(処理追加)
    const _Game_Actor_isEquipChangeOk = Game_Actor.prototype.isEquipChangeOk;
    Game_Actor.prototype.isEquipChangeOk = function(slotId) {
        let result = _Game_Actor_isEquipChangeOk.apply(this, arguments);
        
        result = result && SlotManager.isEquipChangeOk(this, slotId);
        return result;
    };



    //==================================================
    //--  テキスト基本 /ベーシック
    //==================================================
    
    //- 文字列の数字リスト化
    function strToNumList(str) {
        if (!str) { return []; }
        const strs = str.toString().replace(/\[/g, "").replace(/\]/g, "").split(",");
        const list = [];
        let s2 = null;
        for (let s of strs) {
            s2 = s.split("~");
            if (s2.length >= 2) {
                s2 = s2.map(s => Number(s));
                if (s2[1] >= s2[0]) {
                    for (let i = s2[0]; i <= s2[1]; i++) { list.push(i); }
                } else {
                    for (let i = s2[1]; i <= s2[0]; i++) { list.push(i); }
                }
            } else {
                list.push(Number(s));
            }
        };
        return list;
    };

    //- 文字サイズの取得
    function getFontSize(size, baseSize) {
        const mainSize = baseSize || $gameSystem.mainFontSize();
        if (!size) { return mainSize; }
        const sizeStr = size.toString();
        if (sizeStr.includes("+")) {
            const plus = Number(sizeStr.replace("+", ""));
            size = mainSize + plus;
        } else if (sizeStr.includes("-")) {
            const minus = Number(sizeStr.replace("-", ""));
            size = mainSize - minus;
        }
        return Number(size);
    };



    //==================================================
    //--  動的関数 /ベーシック
    //==================================================

    let Funcs = {};

    //- ニューファンク-変数
    function newFunc_var(str) {
        str = convertVariable(str);
        if (!Funcs[str]) {
            Funcs[str] = new Function("", "return " + str);
        }
        return Funcs[str]();
    };

    //- 変数の置換
    function convertVariable(str) {
        if (str == null) { return str; }
        str = str.toString();
        const matches = str.match(/[\x1b\\]v\[(\d+)\]/gi);
        if (!matches) { return str; }
        matches.forEach(parts => {
            const match = parts.match(/\\[vV]\[(\d+)\]/);
            const id = Number(match[1]);
            const val = $gameVariables._data[id] || "0";
            str = str.replace(match[0], val);
        });
        return str;
    };

    
    
    
    //==================================================
    //--  メタ取得 /ベーシック
    //==================================================
     
    //- 全てのメタの合算-配列
    function bundleAllMeta_array(battler, words, action, noDelSpace, ratioIndex) {
        let data = null
        let array = [];
        // バトラー値
        data = battler._actorId ? battler.actor() : battler.enemy();
        if (data) { metaAll(data.note, words, ratioIndex).forEach(e => array.push(e)); }
        if (battler._actorId) {
            // 職業値
            data = battler.currentClass();
            if (data) { metaAll(data.note, words, ratioIndex).forEach(e => array.push(e)); }
            // 装備値
            battler._equips.forEach(equip => {
                data = equip.object();
                if (data) { metaAll(data.note, words, ratioIndex).forEach(e => array.push(e)); }
            });
        }
        // ステート値
        battler._states.forEach(stateId => {
            data = $dataStates[stateId];
            if (data) { metaAll(data.note, words, ratioIndex).forEach(e => array.push(e)); }
        });
        // アクション値
        if (action) {
            data = action.item ? action.item() : action;
            if (data) { metaAll(data.note, words, ratioIndex).forEach(e => array.push(e)); }
        }
        // スペースを削除
        if (!noDelSpace) { array = array.map(e => e.replace(/\s/g, "")); }
        // 空の要素は削除
        array = array.filter(e => e);
        return array;
    };
    
    //- 全取得メタ
    function metaAll(note, words, ratioIndex) {
        var result = [];
        words.forEach(word => {
            // 複数用と単体用の正規表現を作成
            var regText = '\<' + word + ':([^\>]*)\>';
            var regExp_g = new RegExp(regText, 'gi');
            var regExp = new RegExp(regText, 'i');
            // マッチ判定
            var matches = note.match(regExp_g);
            if (matches) {
                // 全てのマッチを処理
                matches.forEach(function(line) {
                    const match = line.match(regExp);
                    const vals = match[1].replace(/\s/g, "").split(",");
                    // 成功率として扱う引数の処理
                    const ratioIndexEx = ratioIndex - 1;
                    if (ratioIndex && vals[ratioIndexEx] && Math.randomInt(100) >= Number(vals[ratioIndexEx])) {
                        return;
                    }
                    result.push(match[1]);
                });
            }
        });
        return result;
    };

})();