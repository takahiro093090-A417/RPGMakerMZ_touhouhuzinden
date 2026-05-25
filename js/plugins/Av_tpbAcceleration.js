/*============================================================================
 Av_tpbAcceleration.js
 ---------------------------------------------------------------------------
 (C)2020 アーヴェル
 This software is released under the MIT License.
 http://opensource.org/licenses/mit-license.php
 ---------------------------------------------------------------------------
  Version
  1.0.0 2020/10/05 初版
  1.0.1 2020/10/06 コメントアウトしている記述の参照値にミスがあったので修正
  1.0.2 2020/10/22 以下の機能を追加
                   速度補正は別に、チャージゲージをメモ欄で記述する機能
                   スキルタイプに対してメモ欄記述で速度補正を付ける機能
                   特定スキルに対してメモ欄記述で速度補正を付ける機能
                   トリアコンタン様の PluginCommonBase.js が前提プラグインに。
  1.0.3 2020/10/22 参照ミスの修正
  1.0.4 2020/10/22 プラグインパラメータを参照出来ていない問題を修正
                   及び不要と判断した為、プラグインパラメータを削除
  1.0.5 2020/10/22 変数名がサム君になっているミスを修正 sam→sum
 ---------------------------------------------------------------------------
 [Blog]   : URL
 [Twitter]: https://twitter.com/LF71_S
============================================================================*/
/*:
 * @target MZ
 * @base PluginCommonBase
 * @plugindesc タイムプログレスバトルで行動後のチャージゲージ加算を追加する
 * @author アーヴェル
 *
 * @help
 * タイムプログレスバトルで使われていない、速度補正の+側の処理を追加します。
 * このプラグインを導入後、速度補正の値が
 * そのまま行動後に溜まっているチャージゲージの％となります。
 *
 * 速度補正が50の技であれば、行動終了後既にゲージが50%溜まった状態から開始。
 * 仮に速度補正が100の技であれば、直ぐに再行動します。（ターンは経過します）
 *
 * 速度補正が-の場合は通常通りのキャストタイムとなり、
 * そちらには影響を及ぼしません。
 *
 *
 * 以後、行動後のチャージゲージの事を、再行動補正と呼びます。
 * メモ欄から呼べるのは以下の通りです
 *
 * スキル欄のメモ欄
 *  <speedAd:n>
 *
 * 特徴を有するデータベースのメモ欄
 *  <STspeedX:n>
 *  <SKspeedX:n>
 *
 * ------------------------------------------------------------------------
 * <speedAd:n>の設定
 * ------------------------------------------------------------------------
 * 効果を与えたいスキルのメモ欄に記述し、該当スキルにのみ影響を与えます。
 * nには1～100の数値が使えます。
 * チャージゲージが全て溜まった状態を100として計算します。
 *
 * 使用したスキルの速度補正が-の場合は独立して計算されます。
 * スキルの速度補正をに設定した場合、
 * キャストタイムが発生し、キャストタイム終了後に、
 * speedAdで設定した値でチャージゲージ初期値が設定されます。
 *
 * 例 スキルの速度補正が30。<speedAd:50> とメモ欄に記述した場合、
 * 両方が加算されてゲージ初期値は80となります。
 *
 * 同条件でスキルの速度補正が-100 の場合、通常通りのキャストタイムが発生し、
 * キャストタイムが終了し、行動後にゲージが50溜まった状態となります。
 *
 * ------------------------------------------------------------------------
 * <STspeedX:n>の設定
 * ------------------------------------------------------------------------
 * 特徴を有するデータベースのメモ欄に記述します。
 * Xの部分はスキルタイプのIDを。n部分に加算したい数値を記述します。
 *
 * 特徴を有するデータベースに<STspeed1:15>のように記述することで、
 * 指定したスキルタイプに対して再行動補正を付ける事が出来ます。
 * 上記の例ではスキルタイプ1の全てのスキルに対して、
 * チャージゲージに15の補正を加算します。
 *
 * スキルタイプ なし を選択している場合は <STspeed0:n> が参照されます。
 *
 * ------------------------------------------------------------------------
 * <SKspeedX:n>の設定
 * ------------------------------------------------------------------------
 * 特徴を有するデータベースのメモ欄に記述します。
 * Xの部分はスキルのIDを。n部分に加算したい数値を記述します。
 *
 * 特徴を有するデータベースに<SKspeed999:50>のように記述することで、
 * 指定したスキルタイプに対して再行動補正を付ける事が出来ます。
 * 上記の例ではスキルID999のスキルに対して、
 * チャージゲージに50の補正を加算します。
 *
 * ------------------------------------------------------------------------
 * Special Thanks
 * ------------------------------------------------------------------------
 * 蒼竜 様 / トリアコンタン 様
 */

(() => {
  'use strict';
  const _Game_Battler_clearTpbChargeTime_Av = Game_Battler.prototype.clearTpbChargeTime;

  Game_Battler.prototype.clearTpbChargeTime = function() {
    _Game_Battler_clearTpbChargeTime_Av.call();
    this._tpbState = "charging";
    let skilltypeTA = 0;
    let skillidSA = 0;
    let speedAd = 0;
    if (!BattleManager._action) {
      this._tpbChargeTime = 0;
    } else {
      this._tpbChargeTime = Math.max(0, Math.min(1, BattleManager._action._item.object().speed / 100)); //0とスキルデータの速度補正を比較し、高い値を取る
      //this._tpbChargeTime += (this.attackSpeed() / 100);
      skilltypeTA = BattleManager._action._item.object().stypeId;
      skillidSA = BattleManager._action._item.object().id;
      speedAd = BattleManager._action._item.object().meta['speedAd'] / 100; //スキルのメモタグから<speedAd:n>を検索
    }
    let typespeedAd = this.typeAcceleration_Av(skilltypeTA); //特徴を有するメモタグから、現在のスキルタイプに合致する<skilltypeTA(x):n>を全て検索し加算
    let skillspeedAd = this.skillAcceleration_Av(skillidSA); //特徴を有するメモタグから、現在のスキルＩＤに合致する<skillidSA(x):n>を全て検索し加算
    this._tpbChargeTime += typespeedAd;
    this._tpbChargeTime += skillspeedAd;
    //console.log(this._tpbChargeTime);
    if (speedAd) {
      this._tpbChargeTime += speedAd;
    }
    if (this._tpbChargeTime >= 1) {
      this._tpbChargeTime = 1;
    }
    if (this._tpbChargeTime <= 0) {
      this._tpbChargeTime = 0;
    }
  }

  Game_Battler.prototype.typeAcceleration_Av = function(skilltypeTA) {
    let sum = 0;
    return this.traitObjects().reduce((prev, trait) => {
      const value = PluginManagerEx.findMetaValue(trait, 'STspeed' + skilltypeTA);
      if (value) {
        sum += value;
      }
      return sum / 100;
    }, 0);
  };
  Game_Battler.prototype.skillAcceleration_Av = function(skillidSA) {
    let sum = 0;
    return this.traitObjects().reduce((prev, trait) => {
      const value = PluginManagerEx.findMetaValue(trait, 'SKspeed' + skillidSA);
      if (value) {
        sum += value;
      }
      return sum / 100;
    }, 0);
  };

})();
