//=============================================================================
// Plugin for RPG Maker MZ
// AutoReviveState.js
//=============================================================================
// [Update History]
// 2021.Feb.06 Ver1.0.0 First Release

/*:
 * @target MZ
 * @plugindesc Enables to Make Auto Resurrection State
 * @author Sasuke KANNAZUKI
 *
 * @param animation
 * @text Auto Revive Animation
 * @desc Animation that invokes when the battler revives automatically
 * @type animation
 * @default 49
 *
 * @param message
 * @text Auto Revive Message
 * @desc Message when an battler revive automatically.
 * @type string
 * @default Invoke %1's auto revive!
 *
 * @help This plugin does not provide plugin commands.
 * This plugin runs under RPG Maker MZ.
 *
 * [Summary]
 * This plugin enables make stete that when a battler dead,
 * the battler immediate revive automatically.
 * 
 * You can configure the rate of revive suucces and recovering HP percentage.
 * 
 * [Usage]
 * Write a state's note following format, then the state functions auto revive.
 * <AutoRevive:100,50>
 * First parameter 100 is success percentage, and second parameter 50 is
 * the recovery HP percentage based on target's Max HP.
 * 
 * ex.
 * <AutoRevive:95,100> : When one die, immediate revives with 95% chance,
 * and when it suucesses, one's HP is the same as Max HP.
 * 
 * Parameters are omissible. if you write <AutoRevive>,
 * it is the same function as <AutoRevive:100,100>.
 * 
 * Note that the state is removed when one dead,
 * regardless of auto revive success or failure.
 *
 * [License]
 * this plugin is released under MIT license.
 * http://opensource.org/licenses/mit-license.php
 */

/*:ja
 * @target MZ
 * @plugindesc 戦闘不能時に一定確率でその場で蘇生するステート
 * @author 神無月サスケ
 *
 * @param animation
 * @text 自動蘇生時アニメーション
 * @desc バトラーが自動蘇生した際に再生されるアニメーション
 * @type animation
 * @default 49
 *
 * @param message
 * @text 自動蘇生メッセージ
 * @desc バトラーが自動蘇生した際にバトルログに表示される文字列
 * @type string
 * @default %1の自動蘇生が発動した！
 *
 * @help このプラグインには、プラグインコマンドはありません。
 * このプラグインは、RPGツクールMZに対応しています。
 *
 * ■概要
 * このプラグインは、戦闘不能になった時に即時に復活する、
 * 「オートリザレクト」ステートの作成を可能にします。
 * 
 * 以下の設定が可能です：
 * - 即死の際の復活の成功率
 * - 復活した際のHPの最大HPに対する割合（％で指定）
 * 
 * ■設定方法
 * ステートのメモ欄に以下のような形式で記述すると、
 * そのステートは、オートリザレクトステートになります。
 * <AutoRevive:100,50>
 * 最初の100は、成功確率の％です。100以上の場合必ず成功します。
 * 2番目の50は、蘇生時のHPの割合の％です。
 * この場合、最大HPの50％まで回復した状態で復活します。
 * 0を指定した場合、HP1の状態で復活します。
 * 
 * なお、2つのパラメータは省略可能です。
 * <AutoRevive> と記述した場合は、<AutoRevive:100,100>とみなされ、
 * 必ず成功し、なおかつHP満タンの状態で復活します。
 * 
 * ■注意
 * - １回発動したら、成否にかかわらずこのステートは解除されます。
 * - このステートは生存時に付与する必要があります。
 * 戦闘不能の仲間の蘇生は出来ません。
 *
 * ■ライセンス表記
 * このプラグインは MIT ライセンスで配布されます。
 * ご自由にお使いください。
 * http://opensource.org/licenses/mit-license.php
 */

(() => {
  const pluginName = 'AutoReviveState';
  //
  // process parameters
  //
  const parameters = PluginManager.parameters(pluginName);
  const animationId = Number(parameters['animation'] || 0);
  const message = parameters['message'] || "Invoke %1's auto revive!";

  //
  // judge actor or state is auto revive
  //
  const isAutoReviveState = stateId => {
    const state = $dataStates[stateId];
    if (state) {
      return !!state.meta.AutoRevive
    }
    return false;
  };

  Game_Actor.prototype.hasAutoReviveStates = function(states) {
    return states.some(sId => isAutoReviveState(sId));
  };

  const autoReviveParam = stateIds => stateIds.find(s => isAutoReviveState(s));

  //
  // determine revive success or failure
  //
  _Game_Temp_initialize = Game_Temp.prototype.initialize;
  Game_Temp.prototype.initialize = function() {
    _Game_Temp_initialize.call(this);
    this.reviveRate = 100;
    this.autoReviveActorIds = [];
  };

  const reg = /^([0-9]+)(?:\,([0-9]+))*$/i;

  // return value: whether to invoke auto revive or not.
  Game_Actor.prototype.setAutoRevive = function(stateIds) {
    $gameTemp.reviveRate = 100;
    const actorId = this.actorId();
    if (this.hasAutoReviveStates(stateIds)) {
      const paramId = autoReviveParam(stateIds);
      if (!$dataStates[paramId]) {
        return false;
      }
      const param = $dataStates[paramId].meta.AutoRevive;
      if (!param) {
        return false;
      } else if (param === true) {
        return true;
      } else {
        const re = reg.exec(param);
        if (!re || !re[1]) {
          return true;
        } else {
          $gameTemp.reviveRate = re[2] == null ? 100 : +re[2];
          return Math.randomInt(100) < +re[1];
        }
      }
    }
    return false;
  };

  //
  // reserve auto revive
  //
  const _Game_Actor_die = Game_Actor.prototype.die;
  Game_Actor.prototype.die = function() {
    // store current states (when actor dies, clear all states)
    const stateIds = this._states;
    _Game_Actor_die.call(this);
    if (this.setAutoRevive(stateIds)) {
      $gameTemp.autoReviveActorIds.push(this.actorId());
    }
  };

  const _Window_BattleLog_displayActionResults =
    Window_BattleLog.prototype.displayActionResults;
  Window_BattleLog.prototype.displayActionResults = function(subject, target) {
    _Window_BattleLog_displayActionResults.call(this, subject, target);
    prepareAutoRevive();
  };

  const prepareAutoRevive = () => {
    for (const actorId of $gameTemp.autoReviveActorIds) {
      const actor = $gameActors.actor(actorId);
      if (actor) {
        actor.prepareAutoRevive();
      }
    }
    $gameTemp.autoReviveActorIds = [];
  };

  //
  // perform auto revive
  //
  Game_Actor.prototype.prepareAutoRevive = function() {
    this.startReviveAnimation();
  };

  Window_BattleLog.prototype.performAutoRevive = function(subject) {
    displayMessageToBattleLog(subject);
    autoReviveActor(subject);
  };

  Game_Actor.prototype.startReviveAnimation = function() {
    if (animationId) {
      BattleManager._logWindow.push('showNormalAnimation', [this],
        animationId
      );
      $gameTroop._interpreter.setWaitMode("animation");
      BattleManager._logWindow.push('performAutoRevive', this);
    }
  };

  const displayMessageToBattleLog = actor => {
     BattleManager._logWindow.push('addText', message.format(actor.name()));
  };

  const autoReviveActor = actor => {
    actor.revive();
    const recoveryHp = Math.floor(actor.mhp * $gameTemp.reviveRate / 100.0);
    actor.setHp(actor.hp + recoveryHp);
  };

})();
