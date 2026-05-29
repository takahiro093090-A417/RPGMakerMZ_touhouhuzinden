//=============================================================================
// Plugin for RPG Maker MZ
// DamagePopupColor.js
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Change damage popup color by specified weak element
 * @author Sasuke KANNAZUKI
 *
 * @command set
 * @text Set Element Color
 * @desc Set color when specified element is one's weak point.
 *
 * @arg Element And Color
 * @text Element And Color
 * @desc Set color for the element.
 * @type struct<ElementAndColor>[]
 * @default []
 *
 * @help
 * This plugin runs under RPG Maker MZ.
 * This plugin enables to change damage color according to the target's
 * weak point.
 *
 * [Summary]
 * Generally, damage popup number's color is white.
 * This plugin changes the setting.
 * When target take damage by weak point element, popup color changes
 * to the specified color.
 *
 * [How to Set]
 * Call Plugin Command 'Set Element Color',
 * Then set element ID and its color.
 * Element ID is set 'Type' in the database.
 *
 * [License]
 * this plugin is released under MIT license.
 * http://opensource.org/licenses/mit-license.php
 */

/*:ja
 * @target MZ
 * @plugindesc 弱点属性を受けた際、その属性によりダメージ色を変更
 * @author 神無月サスケ
 *
 * @command set
 * @text 弱点属性色設定
 * @desc 属性IDに対して色をシステムカラーから割り当てます。
 *
 * @arg Element And Color
 * @text 属性対応色
 * @desc 各属性ごとに、表示する色を設定します。
 * @type struct<ElementAndColorJpn>[]
 * @default []
 *
 * @help
 * このプラグインは、RPGツクールMZに対応しています。
 *
 * ■概要
 * このプラグインは、アクターや敵キャラが弱点属性でダメージを受けた際、
 * その属性に応じて、ポップアップダメージ色を変更します。
 *
 * ■設定方法
 * 設定は、プラグインコマンド「弱点属性色設定」にて行います。
 * 
 * ■ライセンス表記
 * このプラグインは MIT ライセンスで配布されます。
 * ご自由にお使いください。
 * http://opensource.org/licenses/mit-license.php
 */

/*~struct~ElementAndColor:
 * @param ElementId
 * @text Element Id
 * @desc Element to set color
 * @type number
 * @default 1
 *
 * @param ColorId
 * @text Color Id
 * @desc Ex: 0=normal(white), 17=system color
 * @type color
 * @default 0
 */

/*~struct~ElementAndColorJpn:
 * @param ElementId
 * @text 属性ID
 * @desc 弱点の際のダメージポップアップ色を設定する属性ID
 * @type number
 * @default 1
 *
 * @param ColorId
 * @text 色番号
 * @desc ポップアップ色。例：0=通常(白)、17=システム色
 * @type color
 * @default 0
 */

(() => {
  const pluginName = 'DamagePopupColor';

  //
  // process plugin commands
  //
  PluginManager.registerCommand(pluginName, 'set', args => {
    $gameSystem.weakElementColor = $gameSystem.weakElementColor || [];
    const elements = eval(args["Element And Color"]);
    for (elementStr of elements) {
      const element = JsonEx.parse(elementStr);
      const elementId = +element.ElementId;
      const colorId = +element.ColorId || 0;
      $gameSystem.weakElementColor[elementId] = colorId;
    }
  });

  //
  // Change Damage Color
  //
  const _ColorManager_damageColor = ColorManager.damageColor;
  ColorManager.damageColor = function(colorType) {
    if (colorType === 0 && $gameSystem.weakElementColor) {
      const colorId = $gameSystem.weakElementColor[$gameTemp.weakElementId];
      if (colorId != null) {
        return this.textColor(colorId);
      }
    }
    return _ColorManager_damageColor.call(this, colorType);
  };

  //
  // Get weakest element ID
  //
  const modifyMaxElementId = (rate, elementId) => {
    const maxRate = $gameTemp.maxElementRate || 1;
    if (rate > maxRate) {
      $gameTemp.weakElementId = elementId;
      $gameTemp.maxElementRate = rate;
    }
  };

  const _Game_Battler_elementRate = Game_BattlerBase.prototype.elementRate;
  Game_BattlerBase.prototype.elementRate = function(elementId) {
    const rate = _Game_Battler_elementRate.call(this, elementId);
    modifyMaxElementId(rate, elementId);
    return rate;
  };

  //
  // Reset temporal variables
  //
  const resetMaxElementId = () => {
    $gameTemp.weakElementId = null;
    $gameTemp.maxElementRate = null;
  };

  Window_BattleLog.prototype.resetMaxElementId = function() {
    resetMaxElementId();
  };

  const _Window_BattleLog_displayActionResults =
   Window_BattleLog.prototype.displayActionResults;
  Window_BattleLog.prototype.displayActionResults = function(subject, target) {
    _Window_BattleLog_displayActionResults.call(this, subject, target);
    this.push('resetMaxElementId');
  };

})();
