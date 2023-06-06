#!/usr/bin/env node

import { Command } from 'commander'
import { App } from './app.js'
import fs from 'node:fs/promises'
import { Log } from '@corsaircoalition/common'

// read configuration
const packageJsonPath = new URL('../package.json', import.meta.url)
const pkg = JSON.parse(await fs.readFile(packageJsonPath, 'utf8'))

// command line parser
const program = new Command()
program
	.name(pkg.name)
	.version(pkg.version)
	.description(pkg.description)
	.option('-d, --debug', 'enable debugging', false)
	.arguments('<configFile>')
	.showHelpAfterError()
	.action(run)

async function run(configFile: string) {
	// read and process command line options
	const options = program.opts()
	const config = JSON.parse(await fs.readFile(configFile, 'utf8'))
	const gameConfig = config.gameConfig
	const redisConfig = config.redisConfig
	gameConfig.BOT_ID_PREFIX = gameConfig.BOT_ID_PREFIX || 'cortex'
	gameConfig.setUsername = options['setUsername']
	Log.enableDebugOutput(options['debug'])

	// debug output
	Log.debug("[debug] debugging enabled")
	Log.debugObject('Game configuration', gameConfig)
	Log.debugObject('Command Line Options', options)

	// start the application to initiate redis and socket connections
	App.initialize(gameConfig, redisConfig)
	Log.stdout(`[initilizing] botId: ${App.botId}`)
}

await program.parseAsync()

// gracefully exit on SIGINT and SIGTERM
process.once('SIGINT', async () => {
	Log.stderr('Interrupted. Exiting gracefully.')
	await App?.quit()
})

process.once('SIGTERM', async () => {
	Log.stderr('Terminated. Exiting gracefully.')
	await App?.quit()
})

process.on('exit', () => {
	Log.stderr('Exiting now.')
})
