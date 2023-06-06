import { GameState, Log, Redis, hashUserId } from '@corsaircoalition/common'
import EventEmitter from 'node:events'

// TODO: receive game updates from Redis and update the game map
// this will enable analysis of recommendations
// import GameMap from './gameMap.js'

export class App {
	public static botId: string
	// private gameMap: GameMap
	private static gameState: GameState
	public recommendationEmitter: EventEmitter = new EventEmitter()

	public static initialize(gameConfig: Config.Game, redisConfig: Config.Redis) {
		Redis.initilize(redisConfig)
		App.botId = gameConfig.BOT_ID_PREFIX + '-' + hashUserId(gameConfig.userId)
		App.gameState = new GameState(App.botId)
		Redis.subscribe(App.botId, RedisData.CHANNEL.RECOMMENDATION, App.handleRecommendations)
	}

	// receive recommendations and relay them to ACTION channel
	private static handleRecommendations = (data: RedisData.Recommendation) => {
		if (App.gameState.gamePhase !== Game.Phase.PLAYING) {
			Log.stderr(`[recommendation] not in game`)
			return
		}

		Log.debug("[recommendation]", JSON.stringify(data))

		data.date = new Date()
		App.gameState.emit('recommendation', data)

		// TODO: be selective about what recommendations become actions
		// for now, blindly publish all recommendations
		Redis.publish(App.botId, RedisData.CHANNEL.ACTION, data)
		App.gameState.emit('action', data)
	}

	public static quit = async () => {
		Log.stdout('Closing Redis connection...')
		return Redis.quit()
	}
}
