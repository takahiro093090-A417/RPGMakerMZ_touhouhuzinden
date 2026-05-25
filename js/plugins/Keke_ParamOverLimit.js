//=============================================================================
// Keke_ParamOverLimit - パラメータ限界突破
// バージョン: 1.1.2
//=============================================================================
// Copyright (c) 2023 ケケー
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @target MZ
 * @plugindesc レベルや能力値を限界突破&表示調整
 * @author ケケー
 * @url https://kekeelabo.com
 * 
 * @help
 * 【ver.1.1.2】
 * レベルや能力値を限界突破できる。レベル/能力値のレイアウト改造も兼任
 * 
 * ■能力値限界突破
 * ◎敵も味方もデータベースの最大値を突破可能
 * ◎レベル100以上でも能力値曲線を活かした自然な成長と必要経験値
 * ◎レベル100以上でもスキル習得
 * ◎ゲーム中に最大レベルを変更
 * ◎最大レベルをメニューに表示
 * ◎HPや能力値の桁が多い場合は丸める。100000000 → 1億 など
 * ◎HPMPTPを“無限”にできる(TPには『Keke_TpCustom』プラグインが必要)
 * ◎レベルと能力値欄のレイアウトを改造
 * ◎表示する能力値を自由に編集
 * 
 * ■表示調整
 * ◎レベルの表示調整
 * ◎HPMPTPの表示調整
 * ◎能力値の表示調整
 * 
 * ● 使い方 ●
 * 
 * ■【機能1】限界突破した能力値を設定
 * ◎アクター、職業、スキル、アイテム、装備、敵キャラ、ステート のメモ欄に
 *   <能力値: 0:  1:  2:  3:  4:  5:  6:  7:  >
 *   0: 最大HP
 *   1: 最大MP
 *   2: 攻撃力
 *   3: 防御力
 *   4: 魔法力
 *   5: 魔法防御
 *   6: 敏捷性
 *   7: 運
 *   もしくは
 *   <能力値: 最大HP:  最大MP:  攻撃力:  防御力:  魔法力:  魔法防御:  
 *     敏捷性:  運:  >
 * ※データベースで設定した用語も使用可能
 *   例えば攻撃力を「アタック」にしていたらそう書いても通る
 *  ※最大HPと最大MPは「無限」にできる
 * ★例)
 * <能力値: 0:10000000>
 *  最大HPを 1000万 にする
 * <能力値: 最大HP:無限>
 *  最大HPを 無限 にする
 * <能力値: 攻撃力:5000000>
 *  攻撃力を 500万 にする
 * <能力値: アタック:5000000>
 *  攻撃力を 500万 にする
 *  攻撃力を用語で「アタック」にしている場合はこのような書き方もできる
 * <能力値: 最大HP:10000000  攻撃力:5000000  防御力:5000000>
 * 　と、まとめて設定することも可能
 * 
 * 
 * ■【補足1】無限とは
 * 　HPとMPを無限にすることが可能。その特徴は
 * ◎ステータスには「無限」(変更可能)と表示される
 * ◎ダメージは受けるがHPは減らない
 * ◎MPコストは消費されない
 * ◎ダメージはいくら受けても死なないが戦闘不能ステートでは死ぬ
 * ◎無限が解除されると元の最大HP(MP)の全快状態になる
 * 
 * 
 * ■【機能2】キャラごとに最大レベル等を設定
 * ◎アクター、職業、スキル、アイテム、装備、敵キャラ、ステート のメモ欄に
 * 　<レベル: max:  init:  grow:>
 * ★例)
 * <レベル: max:200>
 * 　最大レベルを 200 にする
 * <レベル: init:120>
 * 　初期レベルを 120 にする
 * <レベル: grow:平均>
 * 　超過成長タイプを 平均 にする
 * 　超過成長タイプは「繰り返し」「平均」「最後」の三種
 * 　詳しくは後述
 * <レベル: max:200  init:120  grow:最後>
 *  と、まとめて設定することも可能
 * 
 * 
 * ■【補足2】超過成長タイプとは
 * 　レベル100以降の能力値成長方式
 * ◎繰り返し
 * 　データベースで設定したレベル1～99の成長曲線を繰り返す
 * 　レベル110 → 111 ならレベル10 → 11 と同じに、
 * 　レベル255 → 256 ならレベル55 → 56 と同じだけ成長するということ
 * 　レベル100以降も晩成型で尻上がりに伸びるといった、
 * 　成長曲線の形を活かせるのが長所
 * ◎平均
 * 　レベル1～99の平均成長値で成長する
 * 　レベル1～99で1レベルあたり平均 5 成長するなら、
 * 　レペル100以降も 5ずつ成長するということ
 * 　成長曲線の形は無意味になる
  * ◎最後
 * 　レベル94～99の間の平均成長値で成長する
 * 　レベル94 → 99 で平均 10 成長するなら、
 * 　レペル100以降も 10 ずつ成長するということ
 * 　成長曲線の形は無意味になる
 * 　性質上、晩成型の場合はレベル100以降の成長率が非常に高く、
 * 　早熟型の場合は低くなるのでそのへんは注意
 * 
 * 
 * ■【補足3】成長インフレ率とは
 * 　高レベルになるほど成長率が上がるようになる。その上昇度合
 * ◎1レベルアップで能力が 10 上がるとして、成長インフレ率が 50% なら、
 * 　レペル100～199の成長率が 15(150%)
 * 　レベル200～299の成長率が 20(200%)
 * 　レベル300～399の成長率が 25(250%)
 * 成長インフレ率が 100% なら、
 * 　レペル100～199の成長率が 20(200%)
 * 　レベル200～299の成長率が 30(300%)
 * 　レベル300～399の成長率が 40(400%)
 * 
 * 
 * ■【機能3】レベル100以降のスキル習得レベルを設定
 * ◎職業 → 習得するスキルのメモ欄に
 *  <レベル: ***>
 * ★例)
 * <レベル: 120>
 * 　そのスキルをレベル 120　で習得
 *
 * 
 * ■【機能4】ゲーム中に最大レベルを変更
 * 　プラグインコマンド → 最大レベル変更
 * ◎対象アクターを決めて、変更値を入力する
 * 
 * 
 * ■【機能5】メニュー画面に最大レベルを表示
 * 　プラグインパラメータ → 最大レベル表示
 * ◎「最大レベル表示」を true にする
 * ◎表示位置も調整可能
 *
 *
 * ● 利用規約 ●
 * MITライセンスのもと、自由に使ってくれて大丈夫です
 *
 *
 * 
 * You can exceed the limits of levels and ability values.
 * Also functions as a layout modifier for levels/ability values.
 * 
 * ◎ Enemies and actors can break through the maximum value of the database
 * ◎ Natural growth and necessary experience points using the param curve 
 *   even at level 100 or higher
 * ◎ Skill acquisition even at level 100 or higher
 * ◎ maxLevel change during the game
 * ◎ HP and ability values ​​with many digits are rounded.
 *   100000000 → 100 million, etc.
 * ◎ HP, MP, and TP can be made "infinite"
 *   (TP requires the "Keke_TpCustom" plugin)
 * ◎ Change the layout of the level and ability value columns
 * ◎ Freely edit the ability values ​​to be displayed
 *
 * ● How to use ●
 *
 * ■ [Function 1] Set the param that exceeded the limit
 * ◎ In the memo column of 
 *   Actor, Class, Skill, Item, Equipment, Enemy Character, and State
 *   <param: 0: 1: 2: 3: 4: 5: 6: 7: >
 *   0: maxHp
 *   1: maxMp
 *   2: atk
 *   3: def
 *   4: mat
 *   5: mdf
 *   6: agi
 *   7: luc
 *   or
 *   <param: mhp:  mmp:  atk:  def:  mat:  mdf:
 *   agi:  luc: >
 * ※ Terms set in the database can also be used
 *     For example, if you set atk to "attack", you can write it like that
 * ※ maxHp and maxMp can be "infinite"
 * ★example)
 * <param: 0:10000000>
 *   Makes maxHp his 10,000,000
  * <param: mhp:Infinity>
  * Make max HP infinite
 * <param: atk:5000000>
 *   Makes atk to his 5,000,000
 * <param: attack:5000000>
 *  Makes atk to his 5,000,000
 *   If you use the term "attack" for atk, you can also write like this
 * <param: maxHp:10000000  atk:5000000  def:5000000>
 *   It is also possible to set all together
 * 
 * 
 * ■ [Supplement 1] What is infinity?
 * It is possible to make HP and MP infinite. Its characteristics are
 * ◎ The status is displayed as "Infinite" (can be changed)
 * ◎ Damage is received but HP does not decrease
 * ◎ MP cost is not consumed
 * ◎ You will not die no matter how much damage you receive, 
 *   but you will die in the deathState.
 * ◎ When infinity is canceled, the original maximum HP (MP) will be full.
 * 
 * 
 * ■ [Function 2] Set the maxLevel etc. for each character
 * ◎ In the memo column of 
 *   Actor, Class, Skill, Item, Equipment, Enemy Character, and State
 *   <level: max: init: grow:>
 * ★example)
 * <level: max:200>
 *   Set maxLevel to 200
 * <level: init:120>
 *   Set the initial level to 120
 * <level: grow:average>
 *   Set the overgrowth type to average
 *   There are three types of overgrowth: "repeat", "average", and "last"
 *   See below for details
 * <level: max:200  init:120  grow:last>
 *   can also be set together
 *
 *
 * ■ [Supplement 2] What is overgrowth type?
 *   param growth method after level 100
 * ◎ repeat
 *   Repeat the growth curve of levels 1 to 99 set in the database
 *   Level 110 → 111 is the same as level 10 → 11,
 *   It means that level 255 → 256 will grow by the same amount as 55 → 56
 *   Even after level 100, it grows late and rises,
 *   The advantage is that the shape of the growth curve can be utilized
 * ◎ average
 *   Grow with average growth value from level 1 to 99
 *   If you grow an average of 5 per level from 1 to 99,
 *   He grows by 5 even after level 100
 *   The shape of the growth curve becomes meaningless
 * ◎Last
 *   Grow with an average growth value between levels 94 and 99
 *   If you grow by an average of 10 at level 94 → 99,
 *   It means that even after level 100, it will grow by 10
 *   The shape of the growth curve becomes meaningless
 *   Due to its nature, 
 *   the growth rate after level 100 is very high in the case of late maturing,
 *   Please note that it will be lower in the case of precocious type.
 * 
 * 
 * ■ [Supplement 3] What is the growth inflation rate?
  *   The higher the level, the higher the growth rate. degree of increase
  * ◎Assuming that param grow by 10 with each level up, 
  *   if the growth inflation rate is 50%, then
  *   Growth rate of level 100 to 199 is 15 (150%)
  *   Growth rate for levels 200 to 299 is 20 (200%)
  *   Growth rate for levels 300 to 399 is 25 (250%)
  * If the growth inflation rate is 100%, then
  *   Growth rate of level 100 to 199 is 20 (200%)
  *   Growth rate for levels 200 to 299 is 30 (300%)
  *   Growth rate for levels 300 to 399 is 40 (400%)
 *
 *
 * ■ [Function 3] Set skill acquisition level after level 100
 * ◎ Occupation → In the memo column of the skill to be acquired
 * <level: ***>
 * ★example)
 * <level: 120>
 *   Learn the skill at level 120
 *
 *
 * ■ [Function 4] Change the maxLevel during the game
 *   Plugin command → changeMaxLevel
 * ◎ Determine the target actor and enter the change value
 *
 *
 * ■ [Function 5] Display the maxLevel on the menu screen
 *   Plugin parameter → showMaxLevel
 * ◎ Set "showMaxLevel" to true
 * ◎ The display position can also be adjusted.
 * 
 * 
 * ● Terms of Use ●
 * Feel free to use it under the MIT license.
 * 
 * 
 * 
 * @param レベルの設定
 * 
 * @param 超過成長タイプ
 * @parent レベルの設定
 * @desc overGrowthType レベル99を超えた先の能力値の成長タイプ。繰り返しはレベル99までの成長曲線を繰り返す
 * @type select
 * @option 繰り返し
 * @option 平均
 * @option 最後
 * @default 繰り返し
 * 
 * @param …成長インフレ率
 * @parent レベルの設定
 * @desc  growthInflationRate 100レベルごとに成長率が上がっていく。50 なら +50, +100, +150 と増加
 * @default 50
 * 
 * @param 最大レベルを表示
 * @parent レベルの設定
 * @desc showMaxLevel メニュー画面等で最大レベルを表示する
 * @type boolean
 * @default true
 * 
 * @param レベル表示の調整
 * 
 * @param レベル全体の横幅
 * @parent レベル表示の調整
 * @desc labelTotalW レベル表示全体の横幅。50 なら 50ピクセル。基本 140
 * @default 140
 * 
 * @param レベルのX位置
 * @parent レベル表示の調整
 * @desc labelX ステータス画面でのレベル表示のX位置ずらし。5 なら 5ピクセル 右へ、-5 なら 5ピクセル 左へ。基本 0
 * @default 0
 * 
 * @param レベルラベルの横幅
 * @parent レベル表示の調整
 * @desc labelWidth レベルラベルの横幅。50 なら 50ピクセル。基本 48
 * @default 48
 * 
 * @param レベルラベルの文字サイズ
 * @parent レベル表示の調整
 * @desc labelFontSize レベルラベルの文字サイズ。26 なら 26、-2 なら 標準サイズ -2、空欄 なら基本サイズ。基本 空欄
 * 
 * @param レベルの文字サイズ
 * @parent レベル表示の調整
 * @desc lavelFontSize レベル値の文字サイズ。26 なら 26、-2 なら 標準サイズ -2、空欄 なら基本サイズ。基本 -1
 * @default -1
 * 
 * @param 最大レベルの文字サイズ
 * @parent レベル表示の調整
 * @desc maxLevelFontSize 最大レベル値の文字サイズ。26 なら 26、-2 なら 標準サイズ -2、0 なら基本サイズ。基本 -3
 * @default -3
 * 
 * @param 能力値表示の調整
 * 
 * @param ステータス能力値欄の横幅
 * @parent 能力値表示の調整
 * @desc statusParamWindow_Width ステータス画面の能力値ウインドウの横幅。50 なら 50ピクセル。基本 300
 * @default 300
 * 
 * @param ステータス能力値の横幅
 * @parent 能力値表示の調整
 * @desc statusParam_Width ステータス画面の能力値の数値部分の横幅。50 なら 50ピクセル。空欄なら自動調整。基本 空欄
 * 
 * @param 装備能力値欄の横幅
 * @parent 能力値表示の調整
 * @desc equipParam_width 装備画面の能力値ウインドウの横幅。50 なら 50ピクセル。基本 312
 * @default 312
 * 
 * @param 装備能力値の横幅
 * @parent 能力値表示の調整
 * @desc equipParam_width 装備画面の能力値欄の数値部分の横幅。50 なら 50ピクセル。空欄なら自動調整。基本 空欄
 * 
 * @param 装備能力値の顔グラ消去
 * @parent 能力値表示の調整
 * @desc equipParam_noFace 装備画面の能力値欄の顔グラを表示しないようにする。基本 空欄
 * @type boolean
 * 
 * @param 表示能力値リスト
 * @parent 能力値表示の調整
 * @desc showParamList 能力値欄に表示する能力値のリスト
 * @type struct<showParam>[]
 * @default []
 * 
 * @param その他設定
 * 
 * @param HPを丸める
 * @parent その他設定
 * @desc hpAbbreviation HPやMPの桁が多い場合は丸める。100000000 → 1億 など。基本 true
 * @type boolean
 * @default true
 * 
 * @param 能力値を丸める
 * @parent その他設定
 * @desc paramAbbreviation 能力値の桁が多い場合は丸める。100000000 → 1億 など。基本 true
 * @type boolean
 * @default true
 * 
 * @param 無限ワード
 * @parent その他設定
 * @desc infinityWord HPやMPが無限の場合に表示する文字列。基本 無限
 * @default 無限
 *
 *
 *
 * @command 最大レベル変更
 * @desc changeMaxLevel アクターの最大レベルを変更する
 *
 * @arg 対象アクター
 * @desc actor 最大レベルの変更するアクター
 * @type actor
 * 
 * @arg 最大レベル
 * @desc maxLevel 最大レベルの変更値。50 なら最大レベルが 50 になり、+5 なら元の値の +5、-5 なら -5 になる
 */



//==================================================
/*~struct~showParam:
//==================================================
 * @param 表示する能力値
 * @desc param 能力値欄に表示する能力値
 * @type select
 * @option 最大HP
 * @option 最大MP
 * @option 最大TP
 * @option 攻撃力
 * @option 防御力
 * @option 魔法力
 * @option 魔法防御
 * @option 敏捷性
 * @option 運
 * @option 命中率
 * @option 回避率
 * @option 会心率
 * @option 会心回避率
 * @option 魔法回避率
 * @option 魔法反射率
 * @option 反撃率
 * @option HP再生率
 * @option MP再生率
 * @option TP再生率
 * @option 狙われ率
 * @option 防御効果率
 * @option 回復効果率
 * @option 薬の知識
 * @option MP消費率
 * @option TPチャージ率
 * @option 物理ダメージ率
 * @option 魔法ダメージ率
 * @option 床ダメージ率
 * @option 経験獲得率
 * @option 空欄
 * 
 * @param 表示名
 * @desc showName 表示する能力値名。空欄なら標準の名前を表示
 * 
 * @param 条件
 * @desc condition 表示する条件。javaScript式で記述。sceneName:シーン名 windowName:ウインドウ名
 */
 
 
 
(() => {
    //- プラグイン名
    const pluginName = document.currentScript.src.match(/^.*\/(.*).js$/)[1];



    //==================================================
    //--  公開メソッド
    //==================================================

    //- ゲームテンプ/初期化(処理追加)
    const _Game_Temp_initialize = Game_Temp.prototype.initialize;
    Game_Temp.prototype.initialize = function() {
        _Game_Temp_initialize.apply(this);

        // 無限とする値
        this._infinityValueKe = InfinityValue;
        // 無限ワード
        this._infinityWordKe = keke_infinityWord;
    };

    //- 最大レペルの取得(公開)
    Game_Temp.prototype.getMaxLevelKe = function(actor) {
        return getLevelCfgByMemo(actor, "最大レベル")
    };

    //- 無限TPの取得(公開)
    Game_Temp.prototype.getTpInfinityKe = function(value) {
        return getInfinity(value, "tp");
    };

    //- 無限状態か(公開)
    Game_Temp.prototype.isInfinityKe = function(battler, hpType) {
        return isInfinity(battler, hpType);
    };



    //==================================================
    //--  ファイル変数
    //==================================================

    // 無限とする値
    const InfinityValue = 77777777777777777777;



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

    //- レペルの設定
    const keke_overGrouthType = parameters["超過成長タイプ"];
    const keke_growthInflationRate = parameters["…成長インフレ率"];
    const keke_showMaxLevel = toBoolean(parameters["最大レベルを表示"]);

    //- レベル表示の調整
    const keke_levelTotalW = Number(parameters["レベル全体の横幅"]);
    const keke_levelX = Number(parameters["レベルのX位置"]);
    const keke_labelW = Number(parameters["レベルラベルの横幅"]);
    const keke_labelSize = parameters["レベルラベルの文字サイズ"];
    const keke_levelSize = parameters["レベルの文字サイズ"];
    const keke_maxLevelSize = parameters["最大レベルの文字サイズ"];

    //- 能力値表示の調整
    const keke_statusParamWindowW = Number(parameters["ステータス能力値欄の横幅"]);
    const keke_statusParamW = Number(parameters["ステータス能力値の横幅"]);
    const keke_equipParamWindowW = Number(parameters["装備能力値欄の横幅"]);
    const keke_equipParamW = Number(parameters["装備能力値の横幅"]);
    const keke_equipParamNoFace = toBoolean(parameters["装備能力値の顔グラ消去"]);
    const keke_showParamList = strToList(parameters["表示能力値リスト"]);
    
    //- その他設定
    const keke_hpAbbreviation = toBoolean(parameters["HPを丸める"]);
    const keke_paramAbbreviation = toBoolean(parameters["能力値を丸める"]);
    const keke_infinityWord = parameters["無限ワード"];

    parameters = null;
    
    
    
    //==================================================
    //--  プラグインコマンド
    //==================================================
    
    //- 最大レベル変更
    PluginManager.registerCommand(pluginName, "最大レベル変更", args => {
        const actorId = Number(args["対象アクター"]);
        if (!actorId) { return; }
        const actor = $gameParty.allMembers().find(actor => actor._actorId == actorId);
        if (!actor) { return; }
        const maxLevel = args["最大レベル"];
        if (!maxLevel) { return; }
        // 最大レベルの変更
        changeMaxLevel(actor, maxLevel)
    });


    //- 最大レベルの変更
    function changeMaxLevel(actor, maxLevel) {
        // 値を取得
        const match = maxLevel.match(/\d+/)
        const val = match ? Number(match[0]) : null;
        if (!val) { return; }
        if (maxLevel.includes("+")) {
            actor._maxLevelKe += val;
        } else if (maxLevel.includes("-")) {
            actor._maxLevelKe -= val;
        } else {
            actor._maxLevelKe = val;
        }
    };
    
    
    
    //==================================================
    //--  能力値限界突破
    //==================================================

    //- ゲーム・バトラーベース/基礎能力値プラス(処理追加)
    const _Game_BattlerBase_paramBasePlus = Game_BattlerBase.prototype.paramBasePlus;
    Game_BattlerBase.prototype.paramBasePlus = function(paramId) {
        // 通常能力値をメモ欄から取得
        const val = getParam(this, paramId);
        if (val != null) { return val; }
        
        return _Game_BattlerBase_paramBasePlus.apply(this, arguments);
    };

    //- 能力値の取得
    function getParam(battler, paramId) {
        const metas = bundleAllMeta_array(battler, ["能力値", "param"], null, true);
        if (!metas || !metas.length) { return; }
        // 全てメタを検索
        for (const meta of metas.reverse()) {
            // 数字マッチ
            let matches = meta.match(/\d+\s*:\s*([^\s,]+)/ig) || [];
            for (const match of matches) {
                const strs = match.split(":");
                const id = Number(strs[0]);
                if (id == paramId) {
                    return getInfinity(strs[1], paramId) || Number(strs[1]);
                }
            };
            // 名前マッチ
            matches = meta.match(/[^\s,:]+\s*:\s*([^\s,]+)/ig) || [];
            for (const match of matches) {
                const strs = match.split(":");
                const name = strs[0].replace(/\s/g, "");
                // 名前とパラムIDの照合
                if (meetsNameAndparamId(name, paramId)) {
                    return getInfinity(strs[1], paramId) || Number(strs[1]);
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
                    return getInfinity(strs[1], paramId) || Number(strs[1]);
                }
            };
        }
    };
    
    //- 名前とパラムIDの照合
    function meetsNameAndparamId(name, paramId) {
        if (!name) { return false; }
        let id = null;
        if (name.match(/最大HP|maxHp|mhp/i)) { id = 0; } else
        if (name.match(/最大MP|maxMp|mmp/i)) { id = 1; } else
        if (name.match(/最大TP|maxTp|mtp/i)) { id = "tp"; } else
        if (name.match(/攻撃力|attack|atk/i)) { id = 2; } else
        if (name.match(/防御力|defence|def/i)) { id = 3; } else
        if (name.match(/魔法力|magicAttack|mat/i)) { id = 4; } else
        if (name.match(/魔法防御|magicDefence|mdf/i)) { id = 5; } else
        if (name.match(/敏捷性|agility|agi/i)) { id = 6; } else
        if (name.match(/運|luck|luk/i)) { id = 7; }
        return id == paramId;
    };

    //- 無限の取得
    function getInfinity(str, paramId) {
        if (!(paramId == 0 || paramId == 1 || paramId == "tp")) { return; }
        if (str.match(/無限|infinity/i)) {
            return InfinityValue;
        }
        return false;
    };


    //- ゲーム・バトラーベース/リフレッシュ(処理追加)
    const _Game_BattlerBase_refresh = Game_BattlerBase.prototype.refresh;
    Game_BattlerBase.prototype.refresh = function() {
        // 無限時はリフレッシュで全回復
        if (isInfinity(this, "hp")) { this._hp = this.mhp; }
        if (isInfinity(this, "mp")) { this._mp = this.mmp; }
        if (isInfinity(this, "tp")) { this._tp = this.maxTp(); }

        _Game_BattlerBase_refresh.apply(this);
    };
    


    //==================================================
    //--  最大レベル限界突破
    //==================================================

    //- ゲームアクター/セットアップ(処理追加)
    const _Game_Actor_setup = Game_Actor.prototype.setup;
    Game_Actor.prototype.setup = function(actorId) {
        _Game_Actor_setup.apply(this, arguments);

        // 最大レベルの初期化
        initMaxLevel(this);
        // メモ欄からの初期レベル取得
        getInitLevelByMemo(this);
    };

    //- 最大レベルの初期化
    function initMaxLevel(actor) {
        let maxLevel = actor.actor().maxLevel;
        // メモ欄からの最大レベル取得
        const memoMax = getLevelCfgByMemo(actor, "最大レベル");
        if (memoMax) {
            maxLevel = memoMax;
        }
        actor._maxLevelKe = maxLevel;
    };

    //- メモ欄からの初期化レベル取得
    function getInitLevelByMemo(actor) {
        const initLevel = getLevelCfgByMemo(actor, "初期レベル");
        if (initLevel) {
            actor._level = initLevel.clamp(0, actor._maxLevelKe);
            actor.initExp();
            actor.initSkills();
            actor.recoverAll();
        }
    };

    //- メモ欄からのレベル設定の取得
    function getLevelCfgByMemo(battler, tage) {
        const metas = bundleAllMeta_array(battler, ["レベル", "level"], null, true);
        if (!metas || !metas.length) { return; }
        // 全てメタを検索
        for (const meta of metas.reverse()) {
            // 最大レベル
            if (tage == "最大レベル") {
                let match = meta.match(/(max|limit|最大|限界)\s*:\s*(\d+)/i);
                if (match) {
                    return Number(match[2]);
                }
            }
            // 初期レベル
            if (tage == "初期レベル") {
                let match = meta.match(/(init|start|初期|開始)\s*:\s*(\d+)/i);
                if (match) {
                    return Number(match[2]);
                }
            }
            // 成長タイプ
            if (tage == "成長タイプ") {
                let match = meta.match(/(grow|growType|成長|成長タイプ)\s*:\s*([^\s,]+)/i);
                if (match) {
                    return match[2];
                }
            }
        }
        return null;
    };


    //- ゲームアクター/最大レベル(処理追加)
    const _Game_Actor_maxLevel = Game_Actor.prototype.maxLevel;
    Game_Actor.prototype.maxLevel = function() {
        // 独自の最大レベルを適用
        if (this._maxLevelKe) {
            return this._maxLevelKe;
        }

        _Game_Actor_maxLevel.apply(this);
    };


    //- ゲームアクター/基礎能力値(処理追加)
    const _Game_Actor_paramBase = Game_Actor.prototype.paramBase;
    Game_Actor.prototype.paramBase = function(paramId) {
        // 超過レベルでのパラメータの取得
        const newParam = getExceedLevelParam(this, paramId);
        if (newParam) {
            return newParam;
        }

        return _Game_Actor_paramBase.apply(this, arguments);
    };

    //- 超過レベルでのパラメータの取得
    function getExceedLevelParam(actor, paramId) {
        if (actor._level < 100) { return null; }
        const params = actor.currentClass().params[paramId];
        const level = actor._level;
        const maxParam = params[99];
        const minParam = params[1];
        const lastUp = maxParam - params[98];
        const totalUp = (maxParam - minParam) + lastUp * 2;
        const growType = getOverGrouthType(actor);
        const hundred = Math.floor(level / 100);
        let param = params[99];
        // 成長タイプ「繰り返し」
        if (growType.match(/repeat|繰り返し/i)) {
            // 百の位の数だけ繰り返す
            for (let i = 1; i <= hundred; i++) {
                // レベル帯インフレ率の取得
                const leveZoneInfrationRate = getLevelZoneInflationRate(i);
                // 途中の位は全て加算
                if (i < hundred) {
                    param += Math.floor(totalUp * leveZoneInfrationRate);
                // 現在の位は能力値曲線から取得
                } else {
                    param += Math.floor(getParamCurve(actor, level, params, lastUp, minParam) * leveZoneInfrationRate);
                }
            }
        // 成長タイプ「平均」
        } else if (growType.match(/averate|平均/i)) {
            const averageUp = Math.floor((params[99] - params[1]) / 98);
            // 百の位の数だけ繰り返す
            for (let i = 1; i <= hundred; i++) {
                // レベル帯インフレ率の取得
                const leveZoneInfrationRate = getLevelZoneInflationRate(i);
                const rest = level % 100 + 1;
                // 途中の位は全て加算
                if (i < hundred) {
                    param += Math.floor(averageUp * 100 * leveZoneInfrationRate);
                // 現在の位は能力値曲線から取得
                } else {
                    param += Math.floor(averageUp * rest * leveZoneInfrationRate);
                }
            };
        // 成長タイプ「最後」
        } else if (growType.match(/last|最後/i)) {
            // 百の位の数だけ繰り返す
            for (let i = 1; i <= hundred; i++) {
                // レベル帯インフレ率の取得
                const leveZoneInfrationRate = getLevelZoneInflationRate(i);
                const rest = level % 100 + 1;
                // 途中の位は全て加算
                if (i < hundred) {
                    param += Math.floor(lastUp * 100 *  leveZoneInfrationRate);
                // 現在の位は能力値曲線から取得
                } else {
                    param += Math.floor(lastUp * rest *  leveZoneInfrationRate);
                }
            };
        }
        return param;
    };

    //- レベル帯インフレ率を取得
    function getLevelZoneInflationRate(levelZone) {
        const inflationRate = keke_growthInflationRate;
        if (!inflationRate) { return 1;}
        return 1 + (inflationRate * levelZone) / 100;
    };

    //- 能力値曲線の取得
    function getParamCurve(actor, level, params, lastUp, minParam) {
        const rest = level % 100;
        let param = lastUp;
        // 十の位以下の残りを計算
        if (rest >= 1) {
            param += lastUp;
            param += params[rest] - minParam;
        }
        return param;
    };

    //- 超過成長タイプの取得
    function getOverGrouthType(actor) {
        // メモ欄からの成長タイプ取得
        const growType = getLevelCfgByMemo(actor, "成長タイプ");
        if (growType) {
            return growType;
        }
        return keke_overGrouthType;
    };



    //==================================================
    //--  最大レベル限界突破 /経験値
    //==================================================

    //- ゲームアクター/レベルアップのための経験値(処理追加)
    const _Game_Actor_expForLevel = Game_Actor.prototype.expForLevel;
    Game_Actor.prototype.expForLevel = function(level) {
        // 超過レベル経験値の取得
        const newExp = getExceedLevelExp(this, level);
        if (newExp) {
            return newExp;
        }

        return _Game_Actor_expForLevel.apply(this, arguments);
    };

    //- 超過レベル経験値の取得
    function getExceedLevelExp(actor, level) {
        if (level < 100) { return null; }
        const maxExp = expForLevel(actor, 99);
        const minExp = expForLevel(actor, 1);
        const lastUp = maxExp - expForLevel(actor, 98);
        const totalUp = (maxExp - minExp) + lastUp * 2;
        let exp = maxExp;
        let increase = 0;
        const increaseType = "repeat";
        // 増加タイプ「繰り返し」
        if (increaseType.match(/repeat|繰り返し/i)) {
            const hundred = Math.floor(level / 100);
            const rest = level % 100;
            // 百の位の数だけ繰り返す
            for (let i = 1; i <= hundred; i++) {
                // 突破した位は全て加算
                if (i < hundred) {
                    exp += totalUp;
                    exp += increase * 100;
                    increase += lastUp;
                // 現在の位は経験値曲線から取得
                } else {
                    exp += getExpCurve(actor, level, lastUp, minExp);
                    exp += increase * rest;
                }
            }
        }
        // 基本の増加
        exp += (level - 99) * lastUp;
        return exp;
    };

    //- 経験値曲線の取得
    function getExpCurve(actor, level, lastUp, minExp) {
        const rest = level % 100;
        let exp = 0;
        // 十の位以下の残りを計算
        exp += lastUp;
        if (rest >= 1) {
            exp += lastUp;
            exp += expForLevel(actor, rest) - minExp;
        }
        return exp;
    };

    //- そのレベルに必要な経験値
    function expForLevel(actor, level) {
        const c = actor.currentClass();
        const basis = c.expParams[0];
        const extra = c.expParams[1];
        const acc_a = c.expParams[2];
        const acc_b = c.expParams[3];
        return Math.round(
            (basis * Math.pow(level - 1, 0.9 + acc_a / 250) * level * (level + 1)) /
                (6 + Math.pow(level, 2) / 50 / acc_b) +
                (level - 1) * extra
        );
    };



    //==================================================
    //--  最大レベル限界突破 /スキル習得
    //==================================================

    //- ゲームアクター/スキルの初期化(処理追加)
    const _Game_Actor_initSkills = Game_Actor.prototype.initSkills;
    Game_Actor.prototype.initSkills = function() {
        _Game_Actor_initSkills.apply(this);

        // スキルの超過レペルの習得
        learnSkillExceedLevel(this);
    };

    //- ゲームアクター/レベルアップ(処理追加)
    const _Game_Actor_levelUp = Game_Actor.prototype.levelUp;
    Game_Actor.prototype.levelUp = function() {
        _Game_Actor_levelUp.apply(this);

        // スキルの超過レペルの習得
        learnSkillExceedLevel(this);
    };

    //- スキルの超過レベルの習得
    function learnSkillExceedLevel(actor) {
        for (const learning of actor.currentClass().learnings) {
            // メモから習得レベルを取得
            let learnLevel = null;
            const match = learning.note.match(/<(レベル|level)\s*:\s*(\d+)\s*>/i)
            if (match) {
                learnLevel = Number(match[2]);
            }
            if (!learnLevel) { continue; }
            const skillId = learning.skillId;
            // 習得レベルに達したら習得
            if (actor.level == learnLevel) {
                actor.learnSkill(skillId)
            // 達していなかったら忘れる
            } else if (actor.isLearnedSkill(skillId) && actor.level < learnLevel) {
                actor.forgetSkill(skillId);

            }
        };
    };



    //==================================================
    //--  レベル表示の調整
    //==================================================

    //- ウインドウ・ステータスベース/アクターレベルの描画(処理追加)
    const _Window_StatusBase_drawActorLevel = Window_StatusBase.prototype.drawActorLevel;
    Window_StatusBase.prototype.drawActorLevel = function(actor, x, y) {
        // レベル表示を改造
        if (keke_showMaxLevel) {
            if (this.constructor.name == "Window_Status") { x += keke_levelX; }
            const mainSize = this.contents.fontSize;
            const valueW = keke_levelTotalW - keke_labelW - 2;
            // ラベル
            this.changeTextColor(ColorManager.systemColor());
            this.contents.fontSize = getFontSize(keke_labelSize, mainSize);
            const labelW = keke_labelW;
            this.drawText(TextManager.levelA, x, y, labelW);
            // スペース
            x += labelW;
            this.resetTextColor();
            this.contents.fontSize = getFontSize(keke_maxLevelSize, mainSize);
            const spaceW = this.contents.measureTextWidth(" ");
            x += spaceW;
            // 最大レベル
            const maxLevelStr = " /" + actor.maxLevel();
            const maxLevelW = Math.min(valueW / 2 + 5, this.textWidth(maxLevelStr));
            const levelW = valueW - maxLevelW - spaceW;
            this.drawText(maxLevelStr, x + levelW, y, maxLevelW, "right");
            // レベル
            this.contents.fontSize = getFontSize(keke_levelSize, mainSize);
            this.drawText(actor.level, x, y, levelW, "right");
            // 文字サイズを戻す
            this.contents.fontSize = mainSize;
            return;
        }

        _Window_StatusBase_drawActorLevel.apply(this, arguments);
    };

    //- 文字サイズの取得
    function getFontSize(size, mainSize) {
        mainSize = mainSize || $gameSystem.mainFontSize();
        if (!Number(size)) { return mainSize; }
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
    //--  能力値表示の調整
    //==================================================

    //- スブライトゲージ/数値の描画(再定義)
    Sprite_Gauge.prototype.drawValue = function() {
        const currentValue = this.currentValue();
        const currentValueAbb = processParam(currentValue, this._battler, this._statusType);
        const width = this.bitmapWidth();
        const height = this.textHeight();
        this.setupValueFont();
        this.bitmap.drawText(currentValueAbb, 0, 0, width, height, "right");
    };


    //- シーンステータス/ステータス能力値の横幅(処理追加)
    const _Scene_Status_statusParamsWidth = Scene_Status.prototype.statusParamsWidth;
    Scene_Status.prototype.statusParamsWidth = function() {
        return keke_statusParamWindowW || _Scene_Status_statusParamsWidth.apply(this);
    };

    //- ウインドウ・ステータスベース/項目の描画(再定義)
    const _Window_StatusParams_drawItem  = Window_StatusParams.prototype.drawItem ;
    Window_StatusParams.prototype.drawItem = function(index) {
        // 能力値の横幅・数値丸めに対応した描画
        if (keke_statusParamW || keke_paramAbbreviation) {
            const rect = this.itemLineRect(index);
            const paramId = index + 2;
            const param = this._actor.param(paramId);
            const value = processParam(param);
            // ウインドウの大きさに応じて横幅を変更
            const paramW = statusParamW;
            // 描画
            this.changeTextColor(ColorManager.systemColor());
            this.drawText(TextManager.param(paramId), rect.x, rect.y, 160);
            this.resetTextColor();
            this.drawText(value, 160, rect.y, paramW, "right");
            return;
        }

        _Window_StatusParams_drawItem.apply(this, arguments);
    };

    //- ステータス能力値横幅
    function statusParamW() {
        return keke_statusParamW || 60 + ((keke_statusParamWindowW || 300) - 300);
    };


    //- ウインドウ・エクイップステータス/現在の能力値の描画(処理追加)
    const _Window_EquipStatus_drawCurrentParam = Window_EquipStatus.prototype.drawCurrentParam;
    Window_EquipStatus.prototype.drawCurrentParam = function(x, y, paramId) {
        // 数値丸めに対応した描画
        if (keke_paramAbbreviation) {
            const value = this._actor.param(paramId);
            const valueAbb = processParam(value, keke_paramAbbreviation);
            const paramWidth = this.paramWidth();
            this.resetTextColor();
            this.drawText(valueAbb, x, y, paramWidth, "right");
            return;
        }

        _Window_EquipStatus_drawCurrentParam.apply(this, arguments);
    };

    //- ウインドウ・エクイップステータス/新しい能力値の描画(処理追加)
    const _Window_EquipStatus_drawNewParam = Window_EquipStatus.prototype.drawNewParam;
    Window_EquipStatus.prototype.drawNewParam = function(x, y, paramId) {
        // 数値丸めに対応した描画
        if (keke_paramAbbreviation) {
            const paramW = this.paramWidth();
            const newValue = this._tempActor.param(paramId);
            const diffvalue = newValue - this._actor.param(paramId);
            this.changeTextColor(ColorManager.paramchangeTextColor(diffvalue));
            this.drawText(processParam(newValue), x, y, paramW, "right");
            return
        }

        _Window_EquipStatus_drawNewParam.apply(this, arguments);
    };

    //- シーンエクイップ/ステータス横幅(処理追加)
    const _Scene_Equip_statusWidth = Scene_Equip.prototype.statusWidth;
    Scene_Equip.prototype.statusWidth = function() {
        return keke_equipParamWindowW || _Scene_Equip_statusWidth.apply(this);
    };

    //- ウインドウ・エクイップステータス/能力値の横幅(処理追加)
    const _Window_EquipStatus_paramWidth = Window_EquipStatus.prototype.paramWidth;
    Window_EquipStatus.prototype.paramWidth = function() {
        // ウインドウの大きさに応じて横幅を変更
        return keke_equipParamW || (_Window_EquipStatus_paramWidth.apply(this) + (((keke_equipParamWindowW || 312) - 312) * 0.5));
    };



    //==================================================
    //--  装備能力値欄の顔グラ消去
    //==================================================

    //- ウインドウ・エクイップステータス/顔グラの描画(処理追加)
    const _Window_EquipStatus_drawActorFace = Window_EquipStatus.prototype.drawActorFace;
    Window_EquipStatus.prototype.drawActorFace = function(actor, x, y, width, height) {
        // 装備能力値の顔グラ消去の場合は描画しない
        if (keke_equipParamNoFace) {
            return;
        }
    
        _Window_EquipStatus_drawActorFace.apply(this, arguments);
    };


    //- ウインドウ・エクイップステータス/能力値Y(処理追加)
    const _Window_EquipStatus_paramY = Window_EquipStatus.prototype.paramY;
    Window_EquipStatus.prototype.paramY = function(index) {
        let y = _Window_EquipStatus_paramY.apply(this, arguments);

        // 装備能力値の顔グラ消去の場合は顔グラのサイズ分を引く
        if (keke_equipParamNoFace) {
            y -= ImageManager.standardFaceHeight;
        }
        return y;
    };



    //==================================================
    //--  能力値欄の表示能力値を変更
    //==================================================

    //- ウインドウ・ステータスパラム/最大項目数(処理追加)
    const _Window_StatusParams_maxItems = Window_StatusParams.prototype.maxItems;
    Window_StatusParams.prototype.maxItems = function() {
        let result = _Window_StatusParams_maxItems.apply(this);

        // 表示能力値を設定する場合はその数に合わせる
        const showParamNum = getShowParamNum(this);
        if (showParamNum) {
            result = showParamNum;
        }
        return result;
    };

    //- 表示能力値数の取得
    function getShowParamNum(windo) {
        const sceneName = SceneManager._scene.constructor.name;
        const windowName = windo.constructor.name;
        let num = 0;
        for (let data of keke_showParamList) {
            if (!data["表示する能力値"]) { continue; }
            // 条件判定。満たさないなら次へ
            const condition = data["条件"];
            if (condition && !newFunc_param(condition, sceneName, windowName)) { continue; }
            num++;
        };
    };


    //- ウインドウ・ステータスパラム/全ての能力値の描画(処理追加)
    const _Window_StatusParams_drawAllItems = Window_StatusParams.prototype.drawAllItems;
    Window_StatusParams.prototype.drawAllItems = function() {
        // 全ての能力値の描画-拡張
        if (drawAllParamsEx(this, this._actor)) { return; }
        
        _Window_StatusParams_drawAllItems.apply(this);
    };

    //- ウインドウ・エクイップステータス/全ての能力値の描画(処理追加)
    const _Window_EquipStatus_drawAllParams = Window_EquipStatus.prototype.drawAllParams;
    Window_EquipStatus.prototype.drawAllParams = function() {
        // 全ての能力値の描画-拡張
        if (drawAllParamsEx(this, this._actor)) { return; }

        _Window_EquipStatus_drawAllParams.apply(this);
    };


    //- 全ての能力値の描画-拡張
    function drawAllParamsEx(windo, actor) {
        if (!keke_showParamList || !keke_showParamList.length) { return false; }
        const sceneName = SceneManager._scene.constructor.name;
        const windowName = windo.constructor.name;
        // 全ての表示能力値を処理
        i = -1;
        for (let data of keke_showParamList) {
            // 条件判定。満たさないなら次へ
            if (!data["表示する能力値"]) { continue; }
            const condition = data["条件"];
            if (condition && !newFunc_param(condition, sceneName, windowName)) { continue; }
            i++;
            // Y位置を取得
            const y = windo.paramY ? windo.paramY(i) : windo.itemLineRect(i).y;
            // 能力値ラインの描画
            drawParamLine(windo, actor, data, y);

        };
        // aaa
        return true;
    };

    //- 能力値ラインの描画
    function drawParamLine(windo, actor, data, y) {
        const nameX = windo.itemPadding();
        const nameW = windo.paramWidth ? windo.itemLineRect(0).width : 160;
        const paramX = windo.paramX ? windo.paramX() : windo.itemLineRect(i).x + nameW;
        const paramW = windo.paramWidth ? windo.paramWidth() : statusParamW();
        // 能力値名の描画
        drawParamName(windo, actor, data, nameX, y);
        // 空欄なら能力値は描画しない
        if (data["表示する能力値"] == "空欄") { return; };
        // 能力値の描画
        drawParamVal(windo, actor, data, paramX, y);
        // これ以降は装備シーンでのみ描画
        if (windo.constructor.name != "Window_EquipStatus") { return; }
        const arrowX = paramX + paramW;
        // 矢印を描画
        windo.drawRightArrow(arrowX, y);
        // 装備変更時のみ描画
        if (windo._tempActor) {
            const arrowW = windo.rightArrowWidth();
            const changeX = arrowX + arrowW;
            // 新しい能力値の描画
            drawNewParamVal(windo, actor, data, changeX, y,);
        }
    };
    
    //- 能力値名の描画
    function drawParamName(windo, actor, data, x, y) {
        const nameW = windo.paramWidth ? windo.itemLineRect(0).width : 160;
        const isSpace = data["表示する能力値"] == "空欄";
        windo.changeTextColor(isSpace ? ColorManager.textColor(0) : ColorManager.systemColor());
        windo.drawText(getParamName(actor, data), x, y, nameW);
    };

    //- 能力値の描画
    function drawParamVal(windo, actor, data, x, y) {
        const paramW = windo.paramWidth ? windo.paramWidth() : statusParamW();
        windo.resetTextColor();
        windo.drawText(getParamVal(actor, data,true), x, y, paramW, "right");
    };

    //- 新しい能力値の描画
    function drawNewParamVal(windo, actor, data, x, y) {
        const paramW = windo.paramWidth ? windo.paramWidth() : statusParamW();
        windo.changeTextColor(ColorManager.paramchangeTextColor(getParamDiff(windo, actor, data)));
        windo.drawText(getParamVal(windo._tempActor, data, true), x, y, paramW, "right");
    };

    //- 能力値変動量の取得
    function getParamDiff(windo, actor, data) {
        const newValue = getParamVal(windo._tempActor, data);
        return diffvalue = newValue - getParamVal(actor, data);
    };


    //- 能力値名の取得
    function getParamName(actor, data) {
        // 能力値データの取得
        return getParamData(actor, data).name || "" 
    };

    //- 能力値の取得
    function getParamVal(actor, data, isShow) {
        // 能力値データの取得
        return getParamData(actor, data, isShow).val || 0;
    };

    //- 能力値データの取得
    function getParamData(actor, data, isShow) {
        const paramName = data["表示する能力値"];
        if (!paramName) { return null; }
        let param = 0;
        let baseName = "";
        let isPer = false;
        let hpType = "";
        // 能力値名からデータを取得
        switch (paramName) {
            case "最大HP":
                param = actor.mhp;
                baseName = TextManager.param(0);
                hpType = "hp";
                break;
            case "最大MP":
                param = actor.mmp;
                baseName = TextManager.param(1);
                hpType = "mp";
                break;
            case "最大TP":
                param = actor.maxTp();
                baseName = TextManager.tp;
                hpType = "tp";
                break;
            case "攻撃力":
                param = actor.atk;
                baseName = TextManager.param(2);
                break;
            case "防御力":
                param = actor.def;
                baseName = TextManager.param(3);
                break;
            case "魔法力":
                param = actor.mat;
                baseName = TextManager.param(4); 
                break;
            case "魔法防御":
                param = actor.mdf;
                baseName = TextManager.param(5);
                break;
            case "敏捷性":
                param = actor.agi;
                baseName = TextManager.param(6);
                break;
            case "運":
                param = actor.luk;
                baseName = TextManager.param(7);
                break;
            case "命中率":
                param = actor.hit;
                isPer = true;
                break;
            case "回避率":
                param = actor.eva;
                isPer = true;
                break;
            case "会心率":
                param = actor.cri;
                isPer = true;
                break;
            case "会心回避率":
                param = actor.cev;
                isPer = true;
                break;
            case "魔法回避率":
                param = actor.mev;
                isPer = true;
                break;
            case "魔法反射率":
                param = actor.mrf;
                isPer = true;
                break;
            case "反撃率":
                param = actor.cnt;
                isPer = true;
                break;
            case "HP再生率":
                param = actor.hrg;
                isPer = true;
                break;
            case "MP再生率":
                param = actor.mrg;
                isPer = true;
                break;
            case "TP再生率":
                param = actor.trg;
                isPer = true;
                break;
            case "狙われ率":
                param = actor.tgr;
                isPer = true;
                break;
            case "防御効果率":
                param = actor.grd;
                isPer = true;
                break;
            case "回復効果率":
                param = actor.rec;
                isPer = true;
                break;
            case "薬の知識":
                param = actor.pha;
                isPer = true;
                break;
            case "MP消費率":
                param = actor.mcr;
                isPer = true;
                break;
            case "TPチャージ率":
                param = actor.tcr;
                isPer = true;
                break;
            case "物理ダメージ率":
                param = actor.pdr;
                isPer = true;
                break;
            case "魔法ダメージ率":
                param = actor.mdr;
                isPer = true;
                break;
            case "床ダメージ率":
                param = actor.fdr;
                isPer = true;
                break;
            case "経験獲得率":
                param = actor.exr;
                isPer = true;
                break;
        }
        // 表示する能力値名と能力値を取得
        let name = data["表示名"] || baseName || paramName;
        name = name == "空欄" ? "" : name;
        const val = isPer ? Math.round(param * 100) + "%" : processParam(param, actor, hpType, isShow);
        return { name:name, val:val }
    };



    //==================================================
    //--  計算基本 /ベーシック
    //==================================================

    //- 能力値の処理
    function processParam(value, battler, hpType, isShow) {
        // 無限とする値か判定
        if (battler && hpType) {
            const infinity = checkInfinityValue(battler, hpType, isShow);
            if (infinity) { return infinity; }
        }
        // 数値を丸める
        const abbreviation = hpType ? keke_hpAbbreviation : keke_paramAbbreviation;
        if (abbreviation) {
            return abbreviationValue(value);
        }
        return Number(value);
    };

    //- 数値を丸める
    function abbreviationValue(value) {
        if (!value) { return value; }
        const str = value.toString();
        const length = str.length;
        // 桁数に応じた判定
        if (length >= 13) {
            const cutEnd = length - 12;
            let head = str.slice(0, cutEnd);
            const restTop = str.slice(cutEnd, cutEnd + 1);
            if (Number(restTop) >= 5) { head = Number(head) + 1; }
            return `${head}兆`
        } else if (length >= 9) {
            const cutEnd = length - 8;
            let head = str.slice(0, cutEnd);
            const restTop = str.slice(cutEnd, cutEnd + 1);
            if (Number(restTop) >= 5) { head = Number(head) + 1; }
            return `${head}億`
        } else if (length >= 7) {
            const cutEnd = length - 4;
            let head = str.slice(0, cutEnd);
            const restTop = str.slice(cutEnd, cutEnd + 1);
            if (Number(restTop) >= 5) { head = Number(head) + 1; }
            return `${head}万`
        }
        return `${value}`
    };

    //- 無限とする値か判定
    function checkInfinityValue(battler, hpType, isShow) {
        const gt = $gameTemp;
        // 無限に関する設定がなければリターン
        if (!gt._infinityValueKe || !gt._infinityWordKe) { return null; }
        // 無限にする値か判定
        if (getBaseParam(battler, hpType) == gt._infinityValueKe) {
            return isShow ? gt._infinityWordKe : InfinityValue;
        }
        return null;
    };

    //- ベースパラムの取得
    function getBaseParam(battler, hpType) {
        if (hpType.match(/hp|mp/i)) {
            return battler.paramBasePlus(getParamId(hpType));
        } else {
            return battler.maxTp();
        }
    };

    //- パラムIDの取得
    function getParamId(hpType) {
        if (hpType.match(/hp/i)) { return 0; } else
        if (hpType.match(/mp/i)) { return 1; } else
        if (hpType.match(/tp/i)) { return "tp"; } else
        { return null; }
    };


    //- 無限状態か
    function isInfinity(battler, hpType) {
        const paramId = getParamId(hpType);
        if (paramId == null) { return false; }
        const paramBase = hpType == "tp" ? battler.maxTp() : battler.paramBasePlus(paramId);
        return paramBase == $gameTemp._infinityValueKe;
    };



    //==================================================
    //--  動的関数
    //==================================================

    let Funcs = {};

    //- ニューファンク - 能力値
    function newFunc_param(str, sceneName, windowName) {
        if (!Funcs[str]) {
            Funcs[str] = new Function("sceneName", "windowName", "return " + str);
        }
        return Funcs[str](sceneName, windowName);
    };



    //==================================================
    //--  メタ取得 /ベーシック
    //==================================================
    
    //- 全てのメタ配列の合算
    function bundleAllMeta_array(battler, words, action, noDelSpace) {
        let data = null
        let array = [];
        // バトラー値
        data = battler._actorId ? battler.actor() : battler.enemy();
        if (data) { metaAll(data.note, words).forEach(e => array.push(e)); }
        if (battler._actorId) {
            // 職業値
            data = battler.currentClass();
            if (data) { metaAll(data.note, words).forEach(e => array.push(e)); }
            // 装備値
            battler._equips.forEach(equip => {
                data = equip.object();
                if (data) { metaAll(data.note, words).forEach(e => array.push(e)); }
            });
        }
        // ステート値
        battler._states.forEach(stateId => {
            data = $dataStates[stateId];
            if (data) { metaAll(data.note, words).forEach(e => array.push(e)); }
        });
        // アクション値
        if (action) {
            data = action.item();
            if (data) { metaAll(data.note, words).forEach(e => array.push(e)); }
        }
        // スペースを削除
        if (!noDelSpace) { array = array.map(e => e.replace(/\s/g, "")); }
        // 空の要素は削除
        array = array.filter(e => e);
        return array;
    };

    //- 全取得メタ
    function metaAll(note, words) {
        var result = [];
        words.forEach(word => {
            var regText = '\<' + word + ':([^\>]*)\>';
            var regExp_g = new RegExp(regText, 'gi');
            var regExp = new RegExp(regText, 'i');
            var matches = note.match(regExp_g);
            if (matches) {
                matches.forEach(function(line) {
                    const match = line.match(regExp);
                    result.push(match[1]);
                });
            }
        });
        return result;
    };
    
})();