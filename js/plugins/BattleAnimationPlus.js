// BattleAnimationPlus.js Ver.1.0.0
// MIT License (C) 2024 あわやまたな
// http://opensource.org/licenses/mit-license.php

/*:
* @target MZ
* @orderAfter PluginCommonBase
* @plugindesc Expand "Show Battle Animation".
* @author あわやまたな (Awaya_Matana)
* @url https://awaya3ji.seesaa.net/article/502980330.html
* @help Ver.1.0.0
*
* @command showToActor
* @text Show to Actor
* @desc 
* @arg actorId
* @text Actor ID
* @desc Multiple inputs separated by commas.
* 0：Entire Party
* @type actor
* @default 0
* @arg condition
* @text Condition
* @desc Not entered：None
* @type combo
* @default isAlive
* @option isAlive
* @option isDead
* @option isAppeared
* @option isHidden
* @arg animationId
* @text Animation ID
* @type animation
* @default 1
*
* @command showToEnemy
* @text Show to Enemy
* @desc 
* @arg enemyIndex
* @text Enemy Index
* @desc Multiple inputs separated by commas.
* 0：Entire Troop
* @default 0
* @arg condition
* @text Condition
* @desc Not entered：None
* @type combo
* @default isAlive
* @option isAlive
* @option isDead
* @option isAppeared
* @option isHidden
* @arg animationId
* @text Animation ID
* @type animation
* @default 1
*
* @command showToBattler
* @text Show to Battler
* @desc 
* @arg battlerId
* @text Battler ID
* @desc Multiple inputs separated by commas.
* 0：Entire　Positive：Actor　Negative：Enemy
* @default 0
* @arg condition
* @text Condition
* @desc Not entered：None
* @type combo
* @default isAlive
* @option isAlive
* @option isDead
* @option isAppeared
* @option isHidden
* @arg animationId
* @text Animation ID
* @type animation
* @default 1
*
* @command disableWait
* @text Disable Wait
* @desc Prevents battle progress from waiting for the battle animation to end.
*
* @command enableWait
* @text Enable Wait
* @desc Makes the battle progress wait for the battle animation to end.
*
*/

/*:ja
* @target MZ
* @orderAfter PluginCommonBase
* @plugindesc 「戦闘アニメーションの表示」を拡張します。
* @author あわやまたな (Awaya_Matana)
* @url https://awaya3ji.seesaa.net/article/502980330.html
* @help 
* [更新履歴]
* 2024/04/12：Ver.1.0.0　公開。
*
* @command showToActor
* @text アクターに表示
* @desc 
* @arg actorId
* @text アクターID
* @desc コンマ区切りで複数指定可能。
* 0：パーティ全体
* @type actor
* @default 0
* @arg condition
* @text 条件
* @desc 空白：なし
* @type combo
* @default isAlive
* @option isAlive
* @option isDead
* @option isAppeared
* @option isHidden
* @arg animationId
* @text アニメーションID
* @type animation
* @default 1
*
* @command showToEnemy
* @text 敵キャラに表示
* @desc 
* @arg enemyIndex
* @text 敵インデックス
* @desc コンマ区切りで複数指定可能。
* 0：敵グループ全体
* @default 0
* @arg condition
* @text 条件
* @desc 空白：なし
* @type combo
* @default isAlive
* @option isAlive
* @option isDead
* @option isAppeared
* @option isHidden
* @arg animationId
* @text アニメーションID
* @type animation
* @default 1
*
* @command showToBattler
* @text 戦闘キャラに表示
* @desc 
* @arg battlerId
* @text 戦闘キャラID
* @desc コンマ区切りで複数指定可能。
* 0：全体　正の整数：アクター　負の整数：敵キャラ
* @default 0
* @arg condition
* @text 条件
* @desc 空白：なし
* @type combo
* @default isAlive
* @option isAlive
* @option isDead
* @option isAppeared
* @option isHidden
* @arg animationId
* @text アニメーションID
* @type animation
* @default 1
*
* @command disableWait
* @text ウェイトを無効化
* @desc 戦闘の進行が戦闘アニメーションの終了を待たないようにします。
*
* @command enableWait
* @text ウェイトを有効化
* @desc 戦闘の進行が戦闘アニメーションの終了を待つようにします。
*
*/

'use strict';
{
	const pluginName = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
	const parameters = PluginManager.parameters(pluginName);

	//-----------------------------------------------------------------------------
	// PluginManager

	PluginManager.registerCommand(pluginName, "showToActor", showToActor);
	PluginManager.registerCommand(pluginName, "showToEnemy", showToEnemy);
	PluginManager.registerCommand(pluginName, "showToBattler", showToBattler);

	PluginManager.registerCommand(pluginName, "enableWait", function(args) {
		$gameSystem.enableBattleAnimationWait();
	});

	PluginManager.registerCommand(pluginName, "disableWait", function(args) {
		$gameSystem.disableBattleAnimationWait();
	});

	if (typeof PluginManagerEx === "function") {
		PluginManagerEx.registerCommand(document.currentScript, "showToActor", showToActor);
		PluginManagerEx.registerCommand(document.currentScript, "showToEnemy", showToEnemy);
		PluginManagerEx.registerCommand(document.currentScript, "showToBattler", showToBattler);
	}

	function showToActor(args) {
		const actorId = String(args.actorId).split(",").map(Number);
		const targets = [];
		const methodName = args.condition;
		for (const i of actorId) {
			this.iterateActorId(i, actor => {
				if (typeof actor[methodName] !== "function" || actor[methodName]()) {
					targets.push(actor);
				}
			});
		}
		$gameTemp.requestAnimation(targets, +args.animationId);
	}

	function showToEnemy(args) {
		const enemyIndex = String(args.enemyIndex).split(",").map(n => n - 1);
		const targets = [];
		const methodName = args.condition;
		for (const i of enemyIndex) {
			this.iterateEnemyIndex(i, enemy => {
				if (typeof enemy[methodName] !== "function" || enemy[methodName]()) {
					targets.push(enemy);
				}
			});
		}
		$gameTemp.requestAnimation(targets, +args.animationId);
	}

	function showToBattler(args) {
		const battlerId = String(args.battlerId).split(",").map(Number);
		const targets = [];
		const methodName = args.condition;
		for (const i of battlerId) {
			if (i >= 0) {
				this.iterateActorId(i, actor => {
					if (typeof actor[methodName] !== "function" || actor[methodName]()) {
						targets.push(actor);
					}
				});
			}
			if (i <= 0) {
				this.iterateEnemyIndex(Math.abs(i) - 1, enemy => {
					if (typeof enemy[methodName] !== "function" || enemy[methodName]()) {
						targets.push(enemy);
					}
				});
			}
		}
		$gameTemp.requestAnimation(targets, +args.animationId);
	}

	//-----------------------------------------------------------------------------
	// Game_System

	Game_System.prototype.isBattleAnimationWaitEnabled = function() {
		return !this._battleAnimationWaitDisabled;
	};

	Game_System.prototype.enableBattleAnimationWait = function() {
		this._battleAnimationWaitDisabled = false;
	};

	Game_System.prototype.disableBattleAnimationWait = function() {
		this._battleAnimationWaitDisabled = true;
	};

	//-----------------------------------------------------------------------------
	// Spriteset_Battle

	const _Spriteset_Battle_isAnimationPlaying = Spriteset_Battle.prototype.isAnimationPlaying;
	Spriteset_Battle.prototype.isAnimationPlaying = function() {
		return $gameSystem.isBattleAnimationWaitEnabled() && _Spriteset_Battle_isAnimationPlaying.call(this);
	};

}