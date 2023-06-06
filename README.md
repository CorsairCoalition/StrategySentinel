# Strategy Sentinel

This strategy module receives action recommendations from [Armada Assault](https://github.com/CorsairCoalition/ArmadaAssault), selects the best sequence of actions based on the current state of the game, and relays those to the [Sergeant Socket](https://github.com/CorsairCoalition/SergeantSocket) to relay to the game server.

## Installation

Install and run the executable:

```sh
$ npm install -g @corsaircoalition/strategy-sentinel
$ strategy-sentinel ...
```

or run directly from npmjs library:

```
$ npx @corsaircoalition/strategy-sentinel
```

## Configuration

Copy [`config.json.example`](https://github.com/CorsairCoalition/docs/blob/main/config.json.example) to `config.json` and make desired changes.

## Usage

```
Usage: strategy-sentinel [options] <configFile>

bot component that analyzes game state and selects actions

Options:
  -V, --version        output the version number
  -d, --debug          enable debugging (default: false)
  -h, --help           display help for command
```

## Example

```
strategy-sentinel config.json
```
